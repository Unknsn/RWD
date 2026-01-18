import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Navbar from '../components/Navbar'
import CampaignCard from '../components/CampaignCard'

export default function FoodPage() {
  const [campaigns, setCampaigns] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get('/api/campaigns', { params: { category: 'food' } })
      .then(res => {
        setCampaigns(res.data)
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
      })
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <div className="pt-20">
        {/* Hero Section */}
        <section className="relative h-96 bg-gradient-to-br from-orange-500 to-red-600 overflow-hidden">
          <div className="absolute inset-0 bg-black/30"></div>
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{backgroundImage: 'url(https://images.unsplash.com/photo-1593113598332-cd288d649433?w=1200)'}}
          ></div>
          
          <div className="relative h-full max-w-7xl mx-auto px-4 flex items-center">
            <div className="text-white">
              <h1 className="text-5xl md:text-6xl font-bold mb-4">Food Relief Campaigns</h1>
              <p className="text-xl md:text-2xl mb-6 max-w-2xl">
                No one should go hungry. Join us in feeding families and communities in need.
              </p>
              <div className="flex space-x-4">
                <Link to="/create-campaign" className="bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
                  Start Food Campaign
                </Link>
                <Link to="/campaigns" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-orange-600 transition">
                  All Campaigns
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 bg-white dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <p className="text-4xl font-bold text-orange-600 mb-2">30+</p>
                <p className="text-gray-600 dark:text-gray-400">Food Drives</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-orange-600 mb-2">10K+</p>
                <p className="text-gray-600 dark:text-gray-400">Meals Served</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-orange-600 mb-2">500+</p>
                <p className="text-gray-600 dark:text-gray-400">Families Fed</p>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-12 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-6 text-center">Our Food Relief Mission</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="card">
                <div className="text-4xl mb-4">🍚</div>
                <h3 className="text-xl font-bold mb-2">Daily Meals</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Providing nutritious meals to underprivileged families every day.
                </p>
              </div>
              <div className="card">
                <div className="text-4xl mb-4">📦</div>
                <h3 className="text-xl font-bold mb-2">Ration Kits</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Monthly grocery supplies for families facing food insecurity.
                </p>
              </div>
              <div className="card">
                <div className="text-4xl mb-4">🚛</div>
                <h3 className="text-xl font-bold mb-2">Emergency Relief</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Rapid response to natural disasters and crisis situations.
                </p>
              </div>
              <div className="card">
                <div className="text-4xl mb-4">🌾</div>
                <h3 className="text-xl font-bold mb-2">Community Kitchens</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Setting up kitchens in areas with high food poverty rates.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Campaigns Section */}
        <section className="py-12 bg-white dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Active Food Relief Campaigns</h2>
            
            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-600"></div>
                <p className="mt-4 text-gray-600 dark:text-gray-400">Loading campaigns...</p>
              </div>
            ) : campaigns.length > 0 ? (
              <div className="grid md:grid-cols-3 gap-8">
                {campaigns.map(campaign => (
                  <CampaignCard key={campaign.id} campaign={campaign} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-xl text-gray-600 dark:text-gray-400">
                  No food relief campaigns available yet.
                </p>
                <Link to="/create-campaign" className="btn-primary mt-6 inline-block">
                  Start First Campaign
                </Link>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}
