import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validation
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match!')
      return
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters!')
      return
    }

    setLoading(true)
    const loadingToast = toast.loading('Creating your account...')

    try {
      console.log('Sending signup request:', { 
        name: formData.name, 
        email: formData.email 
      })

      const res = await axios.post('/api/signup', {
        name: formData.name,
        email: formData.email,
        password: formData.password
      })

      console.log('Signup response:', res.data)

      if (res.data.success) {
        toast.success('Account created successfully! 🎉', { id: loadingToast })
        
        // Auto login
        localStorage.setItem('user', JSON.stringify(res.data.user))
        
        setTimeout(() => {
          navigate('/dashboard')
        }, 1500)
      } else {
        toast.error(res.data.message || 'Signup failed', { id: loadingToast })
      }
    } catch (err) {
      console.error('Signup error:', err)
      console.error('Error response:', err.response?.data)
      
      const errorMsg = err.response?.data?.message || 'Signup failed. Please try again.'
      toast.error(errorMsg, { id: loadingToast })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex">
      
      {/* Left Side - Signup Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white dark:bg-gray-900">
        <div className="w-full max-w-md">
          
          {/* Logo */}
          <Link to="/" className="inline-block mb-8">
            <h1 className="text-3xl font-bold text-charity-primary">Go Fund</h1>
          </Link>

          {/* Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2">Create Account</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Join Go Fund and start making a difference today
            </p>
          </div>

          {/* Signup Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Name Input */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-charity-primary transition"
                required
              />
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-charity-primary transition"
                required
              />
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Min. 6 characters"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-charity-primary transition"
                required
                minLength={6}
              />
            </div>

            {/* Confirm Password Input */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Re-enter password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-charity-primary transition"
                required
              />
            </div>

            {/* Signup Button */}
            <button 
              type="submit" 
              className="btn-primary w-full text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>

          </form>

          {/* Footer Links */}
          <div className="mt-8 text-center">
            <p className="text-gray-600 dark:text-gray-400">
              Already have an account?{' '}
              <Link to="/login" className="text-charity-primary font-semibold hover:underline">
                Login
              </Link>
            </p>
            <Link to="/" className="text-sm text-gray-500 dark:text-gray-500 hover:text-charity-primary transition mt-2 inline-block">
              ← Back to Home
            </Link>
          </div>

        </div>
      </div>

      {/* Right Side - Benefits */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-charity-accent to-charity-primary p-12 text-white relative overflow-hidden">
        
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full translate-x-32 -translate-y-32"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-48 translate-y-48"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center max-w-xl">
          <h2 className="text-4xl font-bold mb-6">
            Join 500+ Impact Makers
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Create your free account and unlock powerful features to maximize your charitable impact.
          </p>

          {/* Benefits */}
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="text-4xl">🎯</div>
              <div>
                <h3 className="font-bold text-xl mb-1">Personalized Dashboard</h3>
                <p className="text-white/80">Track all your donations and see your total impact in real-time</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="text-4xl">📧</div>
              <div>
                <h3 className="font-bold text-xl mb-1">Email Receipts</h3>
                <p className="text-white/80">Automatic donation receipts and thank you emails</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="text-4xl">🏆</div>
              <div>
                <h3 className="font-bold text-xl mb-1">Leaderboard Status</h3>
                <p className="text-white/80">Compete with top donors and earn recognition</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="text-4xl">💌</div>
              <div>
                <h3 className="font-bold text-xl mb-1">Campaign Updates</h3>
                <p className="text-white/80">Get notified about campaigns you support</p>
              </div>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 pt-8 border-t border-white/20">
            <p className="text-white/80 mb-4">Trusted by donors worldwide</p>
            <div className="flex space-x-6">
              <div>
                <p className="text-3xl font-bold">100%</p>
                <p className="text-white/80 text-sm">Secure</p>
              </div>
              <div>
                <p className="text-3xl font-bold">24/7</p>
                <p className="text-white/80 text-sm">Support</p>
              </div>
              <div>
                <p className="text-3xl font-bold">₹10L+</p>
                <p className="text-white/80 text-sm">Raised</p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
