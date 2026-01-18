import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import DonorBadge from '../components/DonorBadge'

export default function DashboardPage() {
  const [stats, setStats] = useState(null)
  const [userDonations, setUserDonations] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  
  const user = JSON.parse(localStorage.getItem('user') || '{}')

  useEffect(() => {
    if (!user.email) {
      navigate('/login')
      return
    }

    // Fetch stats and user-specific donations
    Promise.all([
      axios.get('/api/stats'),
      axios.get('/api/history')
    ])
    .then(([statsRes, historyRes]) => {
      setStats(statsRes.data)
      
      // Filter donations for current user
      const myDonations = historyRes.data.filter(d => d.email === user.email)
      setUserDonations(myDonations)
      setLoading(false)
    })
    .catch(err => {
      console.error(err)
      setLoading(false)
    })
  }, [navigate, user.email])

  const handleLogout = () => {
    localStorage.removeItem('user')
    navigate('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-charity-primary mb-4"></div>
          <p>Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  // Calculate user's total donations
  const myTotalDonations = userDonations.reduce((sum, d) => sum + d.amount, 0)
  const myDonationCount = userDonations.length

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 bg-white dark:bg-gray-800 shadow-lg p-6 z-50">
        <Link to="/" className="block mb-8">
          <h2 className="text-2xl font-bold text-charity-primary">Go Fund</h2>
        </Link>
        
        <div className="mb-8">
          <div className="w-16 h-16 bg-charity-primary/20 rounded-full flex items-center justify-center text-2xl mb-3">
            {user.name?.charAt(0).toUpperCase() || '👤'}
          </div>
          <h3 className="font-bold">{user.name}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{user.email}</p>
          <DonorBadge totalDonated={myTotalDonations} />
        </div>

        <nav className="space-y-2">
          <a href="#overview" className="block py-3 px-4 bg-charity-primary text-white rounded-lg">
            📊 Overview
          </a>
          <a href="#history" className="block py-3 px-4 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition">
            📝 History
          </a>
          <Link to="/campaigns" className="block py-3 px-4 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition">
            🎯 Campaigns
          </Link>
          <Link to="/leaderboard" className="block py-3 px-4 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition">
            🏆 Leaderboard
          </Link>
          <button 
            onClick={handleLogout} 
            className="w-full text-left py-3 px-4 hover:bg-red-100 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg transition"
          >
            🚪 Logout
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        <div className="max-w-7xl mx-auto">
          
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Welcome back, {user.name}! 👋</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Here's your impact dashboard
            </p>
          </div>

          {/* Stats Cards */}
          <div id="overview" className="grid md:grid-cols-4 gap-6 mb-8">
            <div className="card bg-gradient-to-br from-blue-500 to-blue-600 text-white">
              <h3 className="text-sm font-semibold opacity-90 mb-2">Total Donated</h3>
              <p className="text-3xl font-bold">₹{myTotalDonations.toLocaleString()}</p>
            </div>
            <div className="card bg-gradient-to-br from-green-500 to-green-600 text-white">
              <h3 className="text-sm font-semibold opacity-90 mb-2">Donations Made</h3>
              <p className="text-3xl font-bold">{myDonationCount}</p>
            </div>
            <div className="card bg-gradient-to-br from-purple-500 to-purple-600 text-white">
              <h3 className="text-sm font-semibold opacity-90 mb-2">Lives Impacted</h3>
              <p className="text-3xl font-bold">{Math.floor(myTotalDonations / 50)}</p>
            </div>
            <div className="card bg-gradient-to-br from-orange-500 to-orange-600 text-white">
              <h3 className="text-sm font-semibold opacity-90 mb-2">Global Total</h3>
              <p className="text-3xl font-bold">₹{stats.totalFund.toLocaleString()}</p>
            </div>
          </div>

          {/* Impact Breakdown */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="card">
              <h3 className="text-2xl font-bold mb-6">Your Cause Distribution</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold">📚 Education</span>
                    <span className="text-blue-600 font-bold">33.3%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                    <div className="bg-blue-600 h-3 rounded-full" style={{width: '33.3%'}}></div>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">₹{(myTotalDonations / 3).toFixed(2)}</p>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold">🍚 Food Relief</span>
                    <span className="text-orange-600 font-bold">33.3%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                    <div className="bg-orange-600 h-3 rounded-full" style={{width: '33.3%'}}></div>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">₹{(myTotalDonations / 3).toFixed(2)}</p>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold">🏥 Medical</span>
                    <span className="text-green-600 font-bold">33.3%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                    <div className="bg-green-600 h-3 rounded-full" style={{width: '33.3%'}}></div>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">₹{(myTotalDonations / 3).toFixed(2)}</p>
                </div>
              </div>
            </div>

            <div className="card">
              <h3 className="text-2xl font-bold mb-6">Your Real Impact</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="text-4xl">🎓</div>
                  <div>
                    <p className="font-bold text-2xl text-blue-600">{Math.floor(myTotalDonations / 100)}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Students Educated</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                  <div className="text-4xl">🍽️</div>
                  <div>
                    <p className="font-bold text-2xl text-orange-600">{Math.floor(myTotalDonations / 50)}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Meals Provided</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="text-4xl">💊</div>
                  <div>
                    <p className="font-bold text-2xl text-green-600">{Math.floor(myTotalDonations / 150)}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Medical Treatments</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Donation History */}
          <div id="history" className="card">
            <h3 className="text-2xl font-bold mb-6">Donation History</h3>
            {userDonations.length > 0 ? (
              <div className="space-y-4">
                {userDonations.map((donation) => (
                  <div 
                    key={donation.id} 
                    className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:shadow-md transition"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-charity-primary/20 rounded-full flex items-center justify-center text-2xl">
                        {donation.cause === 'education' ? '📚' :
                         donation.cause === 'food' ? '🍚' :
                         donation.cause === 'medical' ? '🏥' : '💰'}
                      </div>
                      <div>
                        <p className="font-bold capitalize">
                          {donation.campaignTitle || `${donation.cause} Fund`}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {new Date(donation.timestamp).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-xl text-charity-primary">
                        ₹{donation.amount.toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        ID: {donation.id}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📭</div>
                <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">
                  No donations yet
                </p>
                <Link to="/campaigns" className="btn-primary">
                  Make Your First Donation
                </Link>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <Link to="/campaigns" className="card hover:shadow-xl transition text-center">
              <div className="text-5xl mb-4">🎯</div>
              <h3 className="font-bold text-lg mb-2">Browse Campaigns</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Discover new causes to support
              </p>
            </Link>
            <Link to="/create-campaign" className="card hover:shadow-xl transition text-center">
              <div className="text-5xl mb-4">🚀</div>
              <h3 className="font-bold text-lg mb-2">Start Campaign</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Create your own fundraiser
              </p>
            </Link>
            <Link to="/leaderboard" className="card hover:shadow-xl transition text-center">
              <div className="text-5xl mb-4">🏆</div>
              <h3 className="font-bold text-lg mb-2">View Leaderboard</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                See top donors ranking
              </p>
            </Link>
          </div>

        </div>
      </div>
    </div>
  )
}
