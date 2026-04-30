import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { ModalBase } from "../../../components/shared/ModalBase";

describe("ModalBase", () => {
  const mockOnOpenChange = jest.fn();
  const mockOnConfirm = jest.fn();
  const mockOnCancel = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders ModalBase correctly when open", () => {
    render(
      <ModalBase
        open={true}
        onOpenChange={mockOnOpenChange}
        title="Test Title"
        description="Test Description"
      >
        <div>Test Content</div>
      </ModalBase>
    );
    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it("does not render when open is false", () => {
    render(
      <ModalBase
        open={false}
        onOpenChange={mockOnOpenChange}
        title="Test Title"
      >
        <div>Test Content</div>
      </ModalBase>
    );
    const modal = screen.queryByText("Test Title");
    expect(modal).not.toBeInTheDocument();
  });

  it("renders footer buttons when confirmText and cancelText are provided", () => {
    render(
      <ModalBase
        open={true}
        onOpenChange={mockOnOpenChange}
        title="Test Title"
        confirmText="Confirm"
        cancelText="Cancel"
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
      >
        <div>Content</div>
      </ModalBase>
    );
    expect(screen.getByText("Confirm")).toBeInTheDocument();
    expect(screen.getByText("Cancel")).toBeInTheDocument();
  });

  it("calls onConfirm when confirm button is clicked", () => {
    render(
      <ModalBase
        open={true}
        onOpenChange={mockOnOpenChange}
        title="Test Title"
        confirmText="Confirm"
        onConfirm={mockOnConfirm}
      >
        <div>Content</div>
      </ModalBase>
    );
    fireEvent.click(screen.getByText("Confirm"));
    expect(mockOnConfirm).toHaveBeenCalledTimes(1);
  });

  it("calls onCancel when cancel button is clicked", () => {
    render(
      <ModalBase
        open={true}
        onOpenChange={mockOnOpenChange}
        title="Test Title"
        cancelText="Cancel"
        onCancel={mockOnCancel}
      >
        <div>Content</div>
      </ModalBase>
    );
    fireEvent.click(screen.getByText("Cancel"));
    expect(mockOnCancel).toHaveBeenCalledTimes(1);
  });

  it("renders custom footer if provided", () => {
    render(
      <ModalBase
        open={true}
        onOpenChange={mockOnOpenChange}
        title="Test Title"
        footer={<div data-testid="custom-footer">Custom Footer</div>}
      >
        <div>Content</div>
      </ModalBase>
    );
    expect(screen.getByTestId("custom-footer")).toBeInTheDocument();
  });
});
