import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    
    try {
      const res = await axios.post('/api/login', { email, password })
      localStorage.setItem('user', JSON.stringify(res.data.user))
      toast.success('Welcome back!')
      navigate('/dashboard')
    } catch (err) {
      setError('Invalid email or password')
      toast.error('Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex">
      
      {/* Left Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white dark:bg-gray-900">
        <div className="w-full max-w-md">
          
          {/* Logo */}
          <Link to="/" className="inline-block mb-8">
            <h1 className="text-3xl font-bold text-charity-primary">Go Fund</h1>
          </Link>

          {/* Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2">Welcome Back</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Login to track your donations and impact
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Email Input */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Email Address
              </label>
              <input
                type="email"
                placeholder="member@gofund.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-charity-primary transition"
                required
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Login Button */}
            <button 
              type="submit" 
              className="btn-primary w-full text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>

          </form>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <p className="text-sm font-semibold text-blue-900 dark:text-blue-300 mb-2">
              Demo Credentials:
            </p>
            <p className="text-sm text-blue-700 dark:text-blue-400">
              Email: <span className="font-mono">member@gofund.com</span>
            </p>
            <p className="text-sm text-blue-700 dark:text-blue-400">
              Password: <span className="font-mono">password123</span>
            </p>
          </div>

          {/* Footer Links */}
          <div className="mt-8 text-center">
            <p className="text-gray-600 dark:text-gray-400">
              Don't have an account?{' '}
              <Link to="/signup" className="text-charity-primary font-semibold hover:underline">
                Sign Up
              </Link>
            </p>
            <Link to="/" className="text-sm text-gray-500 dark:text-gray-500 hover:text-charity-primary transition mt-2 inline-block">
              ← Back to Home
            </Link>
          </div>

        </div>
      </div>

      {/* Right Side - Image & Info */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-charity-primary to-charity-secondary p-12 text-white relative overflow-hidden">
        
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-32 -translate-y-32"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-48 translate-y-48"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center max-w-xl">
          <h2 className="text-4xl font-bold mb-6">
            Your Impact Dashboard Awaits
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Login to access your personalized dashboard where you can track all your donations, see the real impact you're making, and discover new campaigns.
          </p>

          {/* Features */}
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <div className="text-3xl">📊</div>
              <div>
                <h3 className="font-bold text-lg mb-1">Track Your Impact</h3>
                <p className="text-white/80">See how your donations are making a difference</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="text-3xl">💰</div>
              <div>
                <h3 className="font-bold text-lg mb-1">Donation History</h3>
                <p className="text-white/80">Access all your past contributions in one place</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="text-3xl">🏆</div>
              <div>
                <h3 className="font-bold text-lg mb-1">Leaderboard Ranking</h3>
                <p className="text-white/80">See your position among top donors</p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-12 grid grid-cols-3 gap-6">
            <div>
              <p className="text-4xl font-bold">500+</p>
              <p className="text-white/80 text-sm">Active Members</p>
            </div>
            <div>
              <p className="text-4xl font-bold">₹10L+</p>
              <p className="text-white/80 text-sm">Funds Raised</p>
            </div>
            <div>
              <p className="text-4xl font-bold">1000+</p>
              <p className="text-white/80 text-sm">Lives Impacted</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
