import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

export default function Navbar() {
  const { darkMode, toggleDarkMode } = useTheme()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [causesDropdown, setCausesDropdown] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const user = (() => {
    try {
      return JSON.parse(localStorage.getItem('user') || '{}')
    } catch {
      return {}
    }
  })()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('user')
    navigate('/')
    setMobileMenuOpen(false)
  }

  const isActive = (path) => {
    return location.pathname === path
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl shadow-xl border-b border-gray-200/50 dark:border-gray-800/50' 
        : 'bg-white dark:bg-gray-900 border-b border-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-charity-primary via-purple-600 to-charity-accent rounded-2xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
                <span className="text-2xl">💝</span>
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-900 animate-pulse"></div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-black bg-gradient-to-r from-charity-primary via-purple-600 to-charity-accent bg-clip-text text-transparent">
                  Go Fund
                </span>
                <span className="px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-bold rounded-full">
                  LIVE
                </span>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Making a Difference 🇮🇳</p>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-2">
            <Link 
              to="/" 
              className={`inline-flex items-center gap-2 h-11 px-4 rounded-xl font-semibold transition-all duration-200 ${
                isActive('/') 
                  ? 'bg-charity-primary text-white shadow-lg shadow-charity-primary/30' 
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              <span className="text-xl">🏠</span><span>Home</span>
            </Link>
            
            <Link 
              to="/campaigns" 
              className={`inline-flex items-center gap-2 h-11 px-4 rounded-xl font-semibold transition-all duration-200 ${
                isActive('/campaigns') 
                  ? 'bg-charity-primary text-white shadow-lg shadow-charity-primary/30' 
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              <span className="text-xl">🎯</span><span>Campaigns</span>
            </Link>
            
            {/* Causes Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setCausesDropdown(true)}
              onMouseLeave={() => setCausesDropdown(false)}
            >
              <button
                type="button"
                aria-expanded={causesDropdown}
                className="inline-flex items-center gap-2 h-11 px-4 rounded-xl font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
                onClick={() => setCausesDropdown((v) => !v)}
                onKeyDown={(e) => { if (e.key === 'Escape') setCausesDropdown(false) }}
              >
                <span className="text-xl">📂</span><span>Causes</span>
                <svg className={`w-4 h-4 transition-transform ${causesDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {causesDropdown && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden animate-fade-in">
                  <Link 
                    to="/education" 
                    className="block px-5 py-4 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200 border-b border-gray-100 dark:border-gray-700"
                    onClick={() => setCausesDropdown(false)}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center text-2xl">
                        📚
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-gray-900 dark:text-white">Education</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Support learning</p>
                      </div>
                    </div>
                  </Link>
                  <Link 
                    to="/food" 
                    className="block px-5 py-4 hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-all duration-200 border-b border-gray-100 dark:border-gray-700"
                    onClick={() => setCausesDropdown(false)}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-xl flex items-center justify-center text-2xl">
                        🍚
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-gray-900 dark:text-white">Food Relief</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Feed the hungry</p>
                      </div>
                    </div>
                  </Link>
                  <Link 
                    to="/medical" 
                    className="block px-5 py-4 hover:bg-green-50 dark:hover:bg-green-900/20 transition-all duration-200"
                    onClick={() => setCausesDropdown(false)}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center text-2xl">
                        🏥
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-gray-900 dark:text-white">Medical</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Save lives</p>
                      </div>
                    </div>
                  </Link>
                </div>
              )}
            </div>

            <Link 
              to="/success-stories" 
              className={`inline-flex items-center gap-2 h-11 px-4 rounded-xl font-semibold transition-all duration-200 ${
                isActive('/success-stories') 
                  ? 'bg-yellow-500 text-white shadow-lg shadow-yellow-500/30' 
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              <span className="text-xl">⭐</span><span>Success</span>
            </Link>

            {user.email && (
              <>
                <Link 
                  to="/favorites" 
                  className={`inline-flex items-center gap-2 h-11 px-4 rounded-xl font-semibold transition-all duration-200 ${
                    isActive('/favorites') 
                      ? 'bg-red-500 text-white shadow-lg shadow-red-500/30' 
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <span className="text-xl">❤️</span><span>Saved</span>
                </Link>
                <Link 
                  to="/dashboard" 
                  className={`inline-flex items-center gap-2 h-11 px-4 rounded-xl font-semibold transition-all duration-200 ${
                    isActive('/dashboard')
                      ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/30'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <span className="text-xl">📊</span><span>Dashboard</span>
                </Link>
              </>
            )}

            {(user.email === '123456789@gmail.com' || user.email === 'member@gofund.com') && (
              <Link 
                to="/admin" 
                className="inline-flex items-center gap-2 h-11 px-4 rounded-xl font-semibold bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:from-purple-700 hover:to-purple-800 transition-all duration-200 shadow-lg shadow-purple-500/30"
              >
                <span className="text-xl">👨‍💼</span><span>Admin</span>
              </Link>
            )}
          </div>

          {/* Right Side Actions */}
          <div className="hidden lg:flex items-center space-x-3">
            <button
              onClick={toggleDarkMode}
              className="inline-flex items-center justify-center h-11 w-11 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 text-2xl"
              aria-label="Toggle dark mode"
            >
              {darkMode ? '☀️' : '🌙'}
            </button>

            {user.email ? (
              <>
                <div className="flex items-center space-x-3 h-11 px-4 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-xl border border-gray-300 dark:border-gray-600">
                  <div className="w-10 h-10 bg-gradient-to-br from-charity-primary to-charity-accent rounded-xl flex items-center justify-center text-white font-bold shadow-lg">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                  <div className="leading-tight">
                    <p className="text-sm font-bold text-gray-900 dark:text-white">{user.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Active Donor</p>
                  </div>
                </div>
                <button 
                  onClick={handleLogout}
                  className="inline-flex items-center h-11 px-4 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all duration-200 font-semibold"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="inline-flex items-center h-11 px-5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-all duration-200 font-semibold">
                  Login
                </Link>
                <Link to="/signup" className="inline-flex items-center h-11 px-5 bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 rounded-xl transition-all duration-200 font-semibold">
                  Sign Up
                </Link>
              </>
            )}

            <Link 
              to="/create-campaign" 
              className="inline-flex items-center h-11 px-5 bg-gradient-to-r from-charity-primary via-purple-600 to-charity-accent text-white rounded-xl hover:shadow-2xl hover:shadow-charity-primary/50 transition-all duration-300 font-bold"
            >
              ✨ Start Campaign
            </Link>

            <Link 
              to="/choose" 
              className="inline-flex items-center h-11 px-5 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:shadow-2xl hover:shadow-green-500/50 transition-all duration-300 font-bold"
            >
              💝 Donate
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
          >
            {mobileMenuOpen ? (
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-6 space-y-3 border-t dark:border-gray-800">
            <Link to="/" className="block py-3 px-4 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl font-semibold transition-all" onClick={() => setMobileMenuOpen(false)}>
              🏠 Home
            </Link>
            <Link to="/campaigns" className="block py-3 px-4 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl font-semibold transition-all" onClick={() => setMobileMenuOpen(false)}>
              🎯 Campaigns
            </Link>
            <Link to="/success-stories" className="block py-3 px-4 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl font-semibold transition-all" onClick={() => setMobileMenuOpen(false)}>
              ⭐ Success Stories
            </Link>
            
            {user.email && (
              <>
                <Link to="/favorites" className="block py-3 px-4 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl font-semibold transition-all" onClick={() => setMobileMenuOpen(false)}>
                  ❤️ Favorites
                </Link>
                <Link to="/dashboard" className="block py-3 px-4 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl font-semibold transition-all" onClick={() => setMobileMenuOpen(false)}>
                  📊 Dashboard
                </Link>
              </>
            )}

            <div className="border-t dark:border-gray-800 pt-3 mt-3 space-y-3">
              <Link to="/create-campaign" className="block py-4 px-4 bg-gradient-to-r from-charity-primary to-charity-accent text-white rounded-xl font-bold text-center shadow-lg" onClick={() => setMobileMenuOpen(false)}>
                ✨ Start Campaign
              </Link>
              <Link to="/choose" className="block py-4 px-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-bold text-center shadow-lg" onClick={() => setMobileMenuOpen(false)}>
                💝 Donate Now
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
