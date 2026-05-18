const AUTH_KEY = 'retaceria-auth'

export function isAuthenticated(): boolean {
  return sessionStorage.getItem(AUTH_KEY) === 'true'
}

export function login(): void {
  sessionStorage.setItem(AUTH_KEY, 'true')
}

export function logout(): void {
  sessionStorage.removeItem(AUTH_KEY)
}
