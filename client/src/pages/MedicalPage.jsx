import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Navbar from '../components/Navbar'
import CampaignCard from '../components/CampaignCard'

export default function MedicalPage() {
  const [campaigns, setCampaigns] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get('/api/campaigns', { params: { category: 'medical' } })
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
        <section className="relative h-96 bg-gradient-to-br from-green-500 to-teal-600 overflow-hidden">
          <div className="absolute inset-0 bg-black/30"></div>
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{backgroundImage: 'url(https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200)'}}
          ></div>
          
          <div className="relative h-full max-w-7xl mx-auto px-4 flex items-center">
            <div className="text-white">
              <h1 className="text-5xl md:text-6xl font-bold mb-4">Medical Relief Campaigns</h1>
              <p className="text-xl md:text-2xl mb-6 max-w-2xl">
                Healthcare is a right, not a privilege. Help us provide medical care to those in need.
              </p>
              <div className="flex space-x-4">
                <Link to="/create-campaign" className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
                  Start Medical Campaign
                </Link>
                <Link to="/campaigns" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition">
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
                <p className="text-4xl font-bold text-green-600 mb-2">40+</p>
                <p className="text-gray-600 dark:text-gray-400">Medical Campaigns</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-green-600 mb-2">₹8L+</p>
                <p className="text-gray-600 dark:text-gray-400">Treatment Costs Covered</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-green-600 mb-2">200+</p>
                <p className="text-gray-600 dark:text-gray-400">Lives Saved</p>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-12 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-6 text-center">Medical Support We Provide</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="card">
                <div className="text-4xl mb-4">🏥</div>
                <h3 className="text-xl font-bold mb-2">Emergency Treatment</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Immediate financial support for critical medical emergencies.
                </p>
              </div>
              <div className="card">
                <div className="text-4xl mb-4">💊</div>
                <h3 className="text-xl font-bold mb-2">Medicine Access</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Ensuring patients get essential medications without financial burden.
                </p>
              </div>
              <div className="card">
                <div className="text-4xl mb-4">🔬</div>
                <h3 className="text-xl font-bold mb-2">Surgery Funding</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Supporting life-saving surgeries for those who can't afford them.
                </p>
              </div>
              <div className="card">
                <div className="text-4xl mb-4">👨‍⚕️</div>
                <h3 className="text-xl font-bold mb-2">Long-term Care</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Ongoing treatment support for chronic illnesses and recovery.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Campaigns Section */}
        <section className="py-12 bg-white dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Active Medical Campaigns</h2>
            
            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
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
                  No medical campaigns available yet.
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
