"use client"

import { useState, useEffect } from "react"
import { BACKEND_API_BASE_URL, additionalLogging } from "./constant"

const LoginForm = ({ onLogin, onSwitchToRegister }) => {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    console.log('Login form submitted with email:', formData.email)

    try {
      console.log('Making API call to login endpoint...')
      
      // Make API call to backend for authentication
      const response = await fetch(`${BACKEND_API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      })

      console.log('Login API response status:', response.status)
      
      const data = await response.json()
      console.log('Login API response data:', data)

      if (response.ok) {
        console.log('Login successful, storing auth data...')
        
        // Store only the JWT token securely (not the password)
        localStorage.setItem('authToken', data.token)
        localStorage.setItem('userInfo', JSON.stringify({
          id: data._id,
          name: data.name,
          email: data.email,
          role: data.role,
        }))

        // Clear form data for security
        setFormData({ email: "", password: "" })

        console.log('Calling onLogin callback...')
        
        // Call onLogin with user data (without password)
        if (onLogin && typeof onLogin === 'function') {
          onLogin({
            id: data._id,
            name: data.name,
            email: data.email,
            role: data.role,
            token: data.token,
          })
        } else {
          console.error('onLogin callback is not a function:', onLogin)
          setError('Login successful but navigation failed. Please refresh the page.')
        }
      } else {
        console.error('Login failed:', data)
        setError(data.message || 'Login failed. Please check your credentials.')
      }
    } catch (error) {
      console.error('Login error:', error)
      setError(`Network error: ${error.message}. Please check if the server is running.`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="logo-container">
            <div className="logo-large">⚡</div>
          </div>
          <h1>Admin Portal</h1>
          <p>Sign in to access your dashboard</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form" autoComplete="off">
          <div className="form-group">
            <label>
              Email <span className="required">*</span>
            </label>
            <input
              type="email"
              placeholder="admin@vishvaspower.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              autoComplete="username"
              required
            />
          </div>

          <div className="form-group">
            <label>
              Password <span className="required">*</span>
            </label>
            <div className="password-input">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                autoComplete="current-password"
                required
              />
              <button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="auth-btn primary"
            disabled={!formData.email || !formData.password || loading}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Don't have an account?{" "}
            <button type="button" className="link-btn" onClick={onSwitchToRegister}>
              Register here
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginForm
