// Authentication utility functions
import { BACKEND_API_BASE_URL, additionalLogging } from "../components/constant"

// Get auth token from localStorage
export const getAuthToken = () => {
  return localStorage.getItem('authToken')
}

// Get user info from localStorage
export const getUserInfo = () => {
  const userInfo = localStorage.getItem('userInfo')
  return userInfo ? JSON.parse(userInfo) : null
}

// Validate token with backend
export const validateTokenWithBackend = async () => {
  const token = getAuthToken()
  if (!token) return false

  try {
    const response = await fetch(`${BACKEND_API_BASE_URL}/api/auth/validate-token`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })

    if (response.ok) {
      return true
    } else {
      // Token is invalid, clear auth data
      logout()
      return false
    }
  } catch (error) {
    console.error('Token validation failed:', error)
    logout()
    return false
  }
}

// Check if user is authenticated
export const isAuthenticated = () => {
  const token = getAuthToken()
  const userInfo = getUserInfo()
  return !!(token && userInfo)
}

// Logout user (clear all auth data)
export const logout = () => {
  localStorage.removeItem('authToken')
  localStorage.removeItem('userInfo')
  // Clear any other sensitive data
  localStorage.removeItem('registeredUsers') // Remove old insecure data
}

// Make authenticated API calls
export const authenticatedFetch = async (url, options = {}) => {
  const token = getAuthToken()
  
  // If URL doesn't start with http, prepend the base URL
  const fullUrl = url.startsWith('http') ? url : `${BACKEND_API_BASE_URL}${url}`
  
  const defaultHeaders = {
    'Content-Type': 'application/json',
  }
  
  if (token) {
    defaultHeaders.Authorization = `Bearer ${token}`
  }
  
  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  }
  
  try {
    const response = await fetch(fullUrl, config)
    
    // If token is invalid/expired, logout user
    if (response.status === 401) {
      logout()
      window.location.href = '/login' // Redirect to login
      throw new Error('Authentication failed. Please login again.')
    }
    
    return response
  } catch (error) {
    console.error('API call failed:', error)
    throw error
  }
}

// Check if user has specific role
export const hasRole = (requiredRole) => {
  const userInfo = getUserInfo()
  return userInfo && userInfo.role === requiredRole
}

// Check if user is etcadmin
export const isETCAdmin = () => {
  return hasRole('etcadmin')
}

// Validate password strength
export const validatePassword = (password) => {
  const errors = []
  
  if (password.length < 6) {
    errors.push('Password must be at least 6 characters long')
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter')
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter')
  }
  
  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number')
  }
  
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    errors.push('Password must contain at least one special character')
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}

// Clean up old insecure localStorage data
export const cleanupOldData = () => {
  // Remove old insecure data that might exist
  const keysToRemove = [
    'registeredUsers',
    'departments',
    'userData',
    'userPassword',
    'currentUser',
    'user',
    'loginData',
    'authData',
    'isLoggedIn',
    'userCredentials'
  ]
  
  keysToRemove.forEach(key => {
    if (localStorage.getItem(key)) {
      localStorage.removeItem(key)
      console.log(`Removed insecure data: ${key}`)
    }
  })
}

// Initialize auth utilities (call this on app startup)
export const initAuth = () => {
  cleanupOldData()
  
  // Check if user is still authenticated on page load
  if (isAuthenticated()) {
    const userInfo = getUserInfo()
    console.log('User authenticated:', userInfo.name, '- Role:', userInfo.role)
  }
}
