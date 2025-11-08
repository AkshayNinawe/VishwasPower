"use client"

import { useState } from "react"
import { BACKEND_API_BASE_URL, additionalLogging } from "./constant"

const RegisterForm = ({ onRegister, onSwitchToLogin }) => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const roleOptions = [
    { value: "admin", label: "🛡️ Admin" },
    { value: "etcadmin", label: "🏢 ETC Admin" },
    { value: "site-engineer", label: "👥 Site Engineer" },
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    console.log('Registration form submitted with data:', {
      name: formData.name,
      email: formData.email,
      role: formData.role
    })

    // Client-side validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      setLoading(false)
      return
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long")
      setLoading(false)
      return
    }

    try {
      console.log('Making API call to register endpoint...')
      
      // Make API call to backend for registration
      const response = await fetch(`${BACKEND_API_BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: formData.role,
        }),
      })

      console.log('API response status:', response.status)
      
      const data = await response.json()
      console.log('API response data:', data)

      if (response.ok) {
        console.log('Registration successful, storing auth data...')
        
        // Store only the JWT token securely (not the password)
        localStorage.setItem('authToken', data.token)
        localStorage.setItem('userInfo', JSON.stringify({
          id: data._id,
          name: data.name,
          email: data.email,
          role: data.role,
        }))

        // Clear form data for security
        setFormData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          role: "",
        })

        console.log('Calling onRegister callback...')
        
        // Call onRegister with user data (without password)
        if (onRegister && typeof onRegister === 'function') {
          onRegister({
            id: data._id,
            name: data.name,
            email: data.email,
            role: data.role,
            token: data.token,
          })
        } else {
          console.error('onRegister callback is not a function:', onRegister)
          setError('Registration successful but navigation failed. Please try logging in.')
        }
      } else {
        console.error('Registration failed:', data)
        setError(data.message || 'Registration failed. Please try again.')
      }
    } catch (error) {
      console.error('Registration error:', error)
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
          <h1>Create Account</h1>
          <p>Register as a new admin</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form" autoComplete="off">
          <div className="form-group">
            <label>
              Full Name <span className="required">*</span>
            </label>
            <input
              type="text"
              placeholder="John Doe"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              autoComplete="name"
              required
            />
          </div>

          <div className="form-group">
            <label>
              Email <span className="required">*</span>
            </label>
            <input
              type="email"
              placeholder="admin@vishvaspower.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              autoComplete="email"
              required
            />
          </div>

          <div className="form-group">
            <label>
              Role <span className="required">*</span>
            </label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              required
            >
              <option value="">Select role</option>
              {roleOptions.map((option, index) => (
                <option key={index} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>
              Password <span className="required">*</span>
            </label>
            <div className="password-input">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Create a strong password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                autoComplete="new-password"
                required
              />
              <button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
          </div>

          <div className="form-group">
            <label>
              Confirm Password <span className="required">*</span>
            </label>
            <div className="password-input">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                autoComplete="new-password"
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="auth-btn primary"
            disabled={
              !formData.name ||
              !formData.email ||
              !formData.password ||
              !formData.confirmPassword ||
              !formData.role ||
              loading
            }
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Already have an account?{" "}
            <button type="button" className="link-btn" onClick={onSwitchToLogin}>
              Sign in here
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default RegisterForm
