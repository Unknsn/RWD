import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'

export default function AdminPage() {
  const [stats, setStats] = useState(null)
  const [campaigns, setCampaigns] = useState([])
  const [users, setUsers] = useState([])
  const [donations, setDonations] = useState([])
  const [activeTab, setActiveTab] = useState('overview')
  const navigate = useNavigate()

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    // Update admin check to new email
    if (user.email !== '123456789@gmail.com' && user.email !== 'member@gofund.com') {
      toast.error('Admin access only')
      navigate('/')
      return
    }

    loadData()
  }, [navigate])

  const loadData = async () => {
    try {
      const [statsRes, campaignsRes, usersRes, donationsRes] = await Promise.all([
        axios.get('/api/stats'),
        axios.get('/api/campaigns'),
        axios.get('/api/admin/users'),
        axios.get('/api/history')
      ])
      setStats(statsRes.data)
      setCampaigns(campaignsRes.data)
      setUsers(usersRes.data)
      setDonations(donationsRes.data)
    } catch (err) {
      console.error(err)
    }
  }

  const deleteCampaign = async (id) => {
    if (!confirm('Delete this campaign?')) return
    try {
      await axios.delete(`/api/campaigns/${id}`)
      toast.success('Campaign deleted')
      loadData()
    } catch (err) {
      toast.error('Failed to delete')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('user')
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 bg-white dark:bg-gray-800 shadow-lg p-6 z-50">
        <h2 className="text-2xl font-bold text-charity-primary mb-8">Admin Panel</h2>
        
        <nav className="space-y-2">
          <button
            onClick={() => setActiveTab('overview')}
            className={`block w-full text-left py-3 px-4 rounded-lg transition ${
              activeTab === 'overview' ? 'bg-charity-primary text-white' : 'hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            📊 Overview
          </button>
          <button
            onClick={() => setActiveTab('campaigns')}
            className={`block w-full text-left py-3 px-4 rounded-lg transition ${
              activeTab === 'campaigns' ? 'bg-charity-primary text-white' : 'hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            🎯 Campaigns
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`block w-full text-left py-3 px-4 rounded-lg transition ${
              activeTab === 'users' ? 'bg-charity-primary text-white' : 'hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            👥 Users
          </button>
          <button
            onClick={() => setActiveTab('donations')}
            className={`block w-full text-left py-3 px-4 rounded-lg transition ${
              activeTab === 'donations' ? 'bg-charity-primary text-white' : 'hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            💰 Donations
          </button>
          <Link to="/" className="block py-3 px-4 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition">
            🏠 Back to Site
          </Link>
          <button onClick={handleLogout} className="block w-full text-left py-3 px-4 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-lg transition">
            🚪 Logout
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        {activeTab === 'overview' && stats && (
          <div>
            <h1 className="text-4xl font-bold mb-8">Dashboard Overview</h1>
            
            <div className="grid md:grid-cols-4 gap-6 mb-8">
              <div className="card bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                <p className="text-sm opacity-90 mb-2">Total Raised</p>
                <p className="text-3xl font-bold">₹{stats.totalFund.toLocaleString()}</p>
              </div>
              <div className="card bg-gradient-to-br from-green-500 to-green-600 text-white">
                <p className="text-sm opacity-90 mb-2">Total Campaigns</p>
                <p className="text-3xl font-bold">{campaigns.length}</p>
              </div>
              <div className="card bg-gradient-to-br from-purple-500 to-purple-600 text-white">
                <p className="text-sm opacity-90 mb-2">Total Users</p>
                <p className="text-3xl font-bold">{users.length}</p>
              </div>
              <div className="card bg-gradient-to-br from-orange-500 to-orange-600 text-white">
                <p className="text-sm opacity-90 mb-2">Total Donations</p>
                <p className="text-3xl font-bold">{donations.length}</p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="card">
                <h3 className="text-xl font-bold mb-4">📚 Education Fund</h3>
                <p className="text-3xl font-bold text-blue-600">₹{stats.educationFund.toFixed(0)}</p>
              </div>
              <div className="card">
                <h3 className="text-xl font-bold mb-4">🍚 Food Fund</h3>
                <p className="text-3xl font-bold text-orange-600">₹{stats.foodFund.toFixed(0)}</p>
              </div>
              <div className="card">
                <h3 className="text-xl font-bold mb-4">🏥 Medical Fund</h3>
                <p className="text-3xl font-bold text-green-600">₹{stats.medicalFund.toFixed(0)}</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'campaigns' && (
          <div>
            <h1 className="text-4xl font-bold mb-8">Manage Campaigns</h1>
            <div className="space-y-4">
              {campaigns.map(campaign => (
                <div key={campaign.id} className="card hover:shadow-xl transition">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2">{campaign.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-2">{campaign.description}</p>
                      <div className="flex items-center space-x-4 text-sm">
                        <span className="text-gray-500">Category: {campaign.category}</span>
                        <span className="text-gray-500">Raised: ₹{campaign.raised}</span>
                        <span className="text-gray-500">Goal: ₹{campaign.goal}</span>
                        <span className="text-gray-500">Donors: {campaign.donorCount}</span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Link to={`/campaign/${campaign.id}`} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                        View
                      </Link>
                      <button onClick={() => deleteCampaign(campaign.id)} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div>
            <h1 className="text-4xl font-bold mb-8">Manage Users</h1>
            <div className="card overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b dark:border-gray-700">
                    <th className="text-left py-3 px-4">Name</th>
                    <th className="text-left py-3 px-4">Email</th>
                    <th className="text-left py-3 px-4">Joined</th>
                    <th className="text-left py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user.id} className="border-b dark:border-gray-700">
                      <td className="py-3 px-4">{user.name}</td>
                      <td className="py-3 px-4">{user.email}</td>
                      <td className="py-3 px-4">{new Date(user.createdAt).toLocaleDateString()}</td>
                      <td className="py-3 px-4">
                        <button className="text-blue-600 hover:underline">View Details</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'donations' && (
          <div>
            <h1 className="text-4xl font-bold mb-8">Recent Donations</h1>
            <div className="card overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b dark:border-gray-700">
                    <th className="text-left py-3 px-4">Donor</th>
                    <th className="text-left py-3 px-4">Amount</th>
                    <th className="text-left py-3 px-4">Campaign</th>
                    <th className="text-left py-3 px-4">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {donations.map(donation => (
                    <tr key={donation.id} className="border-b dark:border-gray-700">
                      <td className="py-3 px-4">{donation.name}</td>
                      <td className="py-3 px-4 font-bold text-green-600">₹{donation.amount}</td>
                      <td className="py-3 px-4">{donation.campaignTitle || 'General Fund'}</td>
                      <td className="py-3 px-4">{new Date(donation.timestamp).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
