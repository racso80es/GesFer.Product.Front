import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { OverlayFix } from '@/components/ui/overlay-fix';
import logger from '@/lib/logger';

jest.mock("@/lib/logger", () => ({
  __esModule: true,
  default: {
    warn: jest.fn(),
    error: jest.fn()
  }
}));

describe('OverlayFix', () => {
  let originalInnerWidth: number;
  let originalInnerHeight: number;
  let originalGetComputedStyle: typeof window.getComputedStyle;

  beforeAll(() => {
    originalInnerWidth = window.innerWidth;
    originalInnerHeight = window.innerHeight;
    Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 1000 });
    Object.defineProperty(window, 'innerHeight', { writable: true, configurable: true, value: 1000 });
    originalGetComputedStyle = window.getComputedStyle;
  });

  afterAll(() => {
    Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: originalInnerWidth });
    Object.defineProperty(window, 'innerHeight', { writable: true, configurable: true, value: originalInnerHeight });
    window.getComputedStyle = originalGetComputedStyle;
  });

  beforeEach(() => {
    jest.useFakeTimers();
    jest.spyOn(console, 'warn').mockImplementation(() => {});
    jest.spyOn(console, 'error').mockImplementation(() => {});
    document.body.innerHTML = '';
    document.body.style.overflow = '';
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  it('renders correctly invisibly', () => {
    render(<OverlayFix data-testid="overlay-fix" />);
    const el = screen.getByTestId('overlay-fix');
    expect(el).toBeInTheDocument();
    expect(el.style.display).toBe('none');
    expect(el.getAttribute('aria-hidden')).toBe('true');
  });

  it('restores body overflow on unmount', () => {
    const { unmount } = render(<OverlayFix />);
    document.body.style.overflow = 'hidden';
    unmount();
    expect(document.body.style.overflow).toBe('unset');
  });

  it('fixes body overflow when hidden but no visible dialogs exist', () => {
    document.body.style.overflow = 'hidden';

    // Mock getComputedStyle for elements
    window.getComputedStyle = jest.fn().mockImplementation((el: Element) => {
      return {
        display: 'none',
        visibility: 'hidden',
        opacity: '0',
      };
    }) as any;

    const dialog = document.createElement('div');
    dialog.setAttribute('role', 'dialog');
    dialog.setAttribute('aria-modal', 'true');
    document.body.appendChild(dialog);

    render(<OverlayFix />);

    expect(document.body.style.overflow).toBe('unset');
    expect(logger.warn).toHaveBeenCalledWith(expect.stringContaining("OverlayFix: Encontrado body.overflow='hidden' sin Dialog visible"));
  });

  it('does NOT fix body overflow when a visible dialog exists', () => {
    document.body.style.overflow = 'hidden';

    window.getComputedStyle = jest.fn().mockImplementation((el: Element) => {
      return {
        display: 'block',
        visibility: 'visible',
        opacity: '1',
      };
    }) as any;

    const dialog = document.createElement('div');
    dialog.setAttribute('role', 'dialog');
    dialog.setAttribute('aria-modal', 'true');
    document.body.appendChild(dialog);

    render(<OverlayFix />);

    expect(document.body.style.overflow).toBe('hidden');
  });

  it('hides orphan black full-screen overlays without dialog parent', () => {
    // Setup a blocking overlay
    const overlay = document.createElement('div');
    overlay.className = 'fixed inset-0 bg-black/50';
    overlay.style.position = 'fixed';
    overlay.style.zIndex = '50';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    overlay.style.display = 'block';

    // Mock getBoundingClientRect for fullscreen check
    overlay.getBoundingClientRect = jest.fn(() => ({
      width: 1000,
      height: 1000,
      top: 0,
      left: 0,
      bottom: 1000,
      right: 1000,
      x: 0,
      y: 0,
      toJSON: () => {}
    }));

    document.body.appendChild(overlay);

    window.getComputedStyle = jest.fn().mockImplementation((el: Element) => {
        if (el === overlay) {
             return {
                position: 'fixed',
                zIndex: '50',
                display: 'block',
                visibility: 'visible',
                opacity: '1',
                backgroundColor: 'rgba(0, 0, 0, 0.5)'
            };
        }
        return { display: 'none' };
    }) as any;

    render(<OverlayFix />);

    expect(overlay.style.display).toBe('none');
    expect(overlay.style.visibility).toBe('hidden');
    expect(overlay.style.opacity).toBe('0');
    expect(overlay.style.pointerEvents).toBe('none');
    expect(logger.error).toHaveBeenCalledWith(expect.objectContaining({ overlay }), expect.stringContaining("OVERLAY BLOQUEANTE DETECTADO"));
  });

  it('does NOT hide black full-screen overlays that are children of a dialog', () => {
    const dialog = document.createElement('div');
    dialog.setAttribute('role', 'dialog');

    const overlay = document.createElement('div');
    overlay.className = 'fixed inset-0 bg-black/50';

    overlay.getBoundingClientRect = jest.fn(() => ({
        width: 1000,
        height: 1000,
        top: 0,
        left: 0,
        bottom: 1000,
        right: 1000,
        x: 0,
        y: 0,
        toJSON: () => {}
    }));

    dialog.appendChild(overlay);
    document.body.appendChild(dialog);

    window.getComputedStyle = jest.fn().mockImplementation((el: Element) => {
        if (el === overlay) {
             return {
                position: 'fixed',
                zIndex: '50',
                display: 'block',
                visibility: 'visible',
                opacity: '1',
                backgroundColor: 'rgba(0, 0, 0, 0.5)'
            };
        }
        return { display: 'block' };
    }) as any;

    render(<OverlayFix />);

    // Should NOT be hidden
    expect(overlay.style.display).not.toBe('none');
  });

  it('runs interval checks', () => {
      document.body.style.overflow = 'hidden';

      window.getComputedStyle = jest.fn().mockImplementation(() => {
          return {
            display: 'none',
            visibility: 'hidden',
            opacity: '0',
          };
      }) as any;

      const dialog = document.createElement('div');
      dialog.setAttribute('role', 'dialog');
      dialog.setAttribute('aria-modal', 'true');
      document.body.appendChild(dialog);

      render(<OverlayFix />);

      expect(document.body.style.overflow).toBe('unset');

      // Someone messes up the body again
      document.body.style.overflow = 'hidden';

      act(() => {
          jest.advanceTimersByTime(2000);
      });

      // The interval should have fixed it
      expect(document.body.style.overflow).toBe('unset');
  });

  it('logs warning for unknown fullscreen fixed elements with z-index >= 50', () => {
    const el = document.createElement('div');
    el.style.position = 'fixed';
    el.style.zIndex = '50';
    el.style.display = 'block';

    el.getBoundingClientRect = jest.fn(() => ({
        width: 1000,
        height: 1000,
        top: 0, left: 0, bottom: 1000, right: 1000, x: 0, y: 0, toJSON: () => {}
    }));

    document.body.appendChild(el);

    window.getComputedStyle = jest.fn().mockImplementation((element: Element) => {
        if (element === el) {
            return {
                position: 'fixed',
                zIndex: '50',
                display: 'block'
            };
        }
        return { display: 'none' };
    }) as any;

    render(<OverlayFix />);
    expect(logger.warn).toHaveBeenCalledWith(expect.objectContaining({ el }), expect.stringContaining("Overlay de pantalla completa bloqueante detectado"));
  });
});
