import { render, screen, waitFor, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import LoginPage from '@/app/[locale]/login/page'
import { useAuth } from '@/contexts/auth-context'
// Valores por defecto del login (coinciden con .env.example / seed demo)
const DEFAULT_LOGIN_COMPANY = 'Empresa Demo'
const DEFAULT_LOGIN_PASSWORD = 'admin123'

// Mock the auth context
jest.mock('@/contexts/auth-context')
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}))
jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      'auth.login': 'Iniciar sesión',
      'auth.company': 'Company',
      'auth.username': 'Usuario',
      'auth.password': 'Contraseña',
      'auth.loginError': 'Error al iniciar sesión',
    };
    return translations[key] || key;
  },
  useLocale: () => 'es',
}))

const mockLogin = jest.fn()
const mockUseAuth = useAuth as jest.MockedFunction<typeof useAuth>

describe('LoginPage', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockUseAuth.mockReturnValue({
      user: null,
      isLoading: false,
      login: mockLogin,
      logout: jest.fn(),
      updateUser: jest.fn(),
      isAuthenticated: false,
    })
  })

  it('should render login form', () => {
    render(<LoginPage />)
    
    expect(screen.getByLabelText(/company|company/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/usuario|username/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/contraseña|password/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /iniciar sesión|login/i })).toBeInTheDocument()
  })

  it('should have default values in form', () => {
    render(<LoginPage />)
    
    const companyInput = screen.getByLabelText(/company|company/i) as HTMLInputElement
    const usuarioInput = screen.getByLabelText(/usuario|username/i) as HTMLInputElement
    const contraseñaInput = screen.getByLabelText(/contraseña|password/i) as HTMLInputElement
    
    expect(companyInput.value).toBe(DEFAULT_LOGIN_COMPANY)
    expect(usuarioInput.value).toBe('admin')
    expect(contraseñaInput.value).toBe(DEFAULT_LOGIN_PASSWORD)
  })

  it('should handle form submission', async () => {
    const user = userEvent.setup()
    let resolveLogin: any;
    const loginPromise = new Promise(resolve => { resolveLogin = resolve; });
    mockLogin.mockImplementation(() => loginPromise);
    
    render(<LoginPage />)
    
    const submitButton = screen.getByRole('button', { name: /iniciar sesión|login/i })
    
    await act(async () => {
      await user.click(submitButton)
    })
    
    await act(async () => {
      resolveLogin(undefined)
    })

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith({
        company: DEFAULT_LOGIN_COMPANY,
        username: 'admin',
        password: DEFAULT_LOGIN_PASSWORD,
      })
    })
  })

  it('should show error message on login failure', async () => {
    const user = userEvent.setup()
    const errorMessage = 'Credenciales inválidas'
    let rejectLogin: any;
    const loginPromise = new Promise((resolve, reject) => { rejectLogin = reject; });
    mockLogin.mockImplementation(() => loginPromise);
    
    render(<LoginPage />)
    
    const submitButton = screen.getByRole('button', { name: /iniciar sesión|login/i })
    
    await act(async () => {
      await user.click(submitButton)
    })
    
    await act(async () => {
      rejectLogin(new Error(errorMessage))
      // catch it locally to avoid unhandled rejection in the test scope
      loginPromise.catch(() => {});
    })

    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument()
    })
  })

  it('should disable submit button while loading', async () => {
    const user = userEvent.setup()
    // Envolvemos en act para asegurar actualización
    let resolveLogin: any;
    mockLogin.mockImplementation(() => new Promise((resolve) => { resolveLogin = resolve; })); // Never resolves
    
    render(<LoginPage />)
    
    const submitButton = screen.getByRole('button', { name: /iniciar sesión|login/i })
    
    await act(async () => {
      await user.click(submitButton)
    })
    
    await waitFor(() => {
      expect(submitButton).toBeDisabled()
    })

    // Cleanup the promise to avoid memory leaks or open handles
    if (resolveLogin) {
      await act(async () => {
        resolveLogin();
      });
    }
  })
})

