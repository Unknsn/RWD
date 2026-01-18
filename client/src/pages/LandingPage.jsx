import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import CampaignCard from '../components/CampaignCard'
import ChartsSection from '../components/ChartsSection'
import axios from 'axios'

export default function LandingPage() {
  const [funds, setFunds] = useState(null)
  const [history, setHistory] = useState([])
  const [campaigns, setCampaigns] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch all data
    Promise.all([
      axios.get('/api/funds'),
      axios.get('/api/history'),
      axios.get('/api/campaigns')
    ])
    .then(([fundsRes, historyRes, campaignsRes]) => {
      setFunds(fundsRes.data)
      setHistory(historyRes.data)
      setCampaigns(campaignsRes.data.slice(0, 3)) // Get first 3 campaigns
      setLoading(false)
    })
    .catch(err => {
      console.error('Error loading data:', err)
      setLoading(false)
    })
  }, [])

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="min-h-screen flex items-center bg-gradient-to-br from-charity-primary/10 via-charity-secondary/10 to-charity-accent/10 dark:from-charity-primary/20 dark:via-charity-secondary/20 dark:to-charity-accent/20 pt-16">
        <div className="max-w-7xl mx-auto px-4 py-20 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              Fund What <br />
              <span className="text-charity-primary">Matters to You</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              The world's #1 platform for helping people and communities reach their goals.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/campaigns" className="btn-primary text-center">
                Browse Campaigns
              </Link>
              <Link to="/create-campaign" className="px-8 py-3 border-2 border-charity-primary text-charity-primary font-semibold rounded-lg hover:bg-charity-primary hover:text-white transition text-center">
                Start a Campaign
              </Link>
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800" 
              alt="Charity impact"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Featured Campaigns */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Featured Campaigns</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Support these urgent causes today
            </p>
          </div>
          
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-charity-primary"></div>
              <p className="mt-4 text-gray-600 dark:text-gray-400">Loading campaigns...</p>
            </div>
          ) : campaigns.length > 0 ? (
            <>
              <div className="grid md:grid-cols-3 gap-8 mb-8">
                {campaigns.map(campaign => (
                  <CampaignCard key={campaign.id} campaign={campaign} />
                ))}
              </div>
              
              <div className="text-center">
                <Link to="/campaigns" className="btn-primary">
                  View All Campaigns
                </Link>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600 dark:text-gray-400">
                No campaigns available yet.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">How Go Fund Works</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Making a difference is simple
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card text-center">
              <div className="text-6xl mb-4">🎯</div>
              <h3 className="text-2xl font-bold mb-4">1. Choose a Cause</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Browse campaigns or explore by category: Education, Food Relief, or Medical.
              </p>
              <Link to="/campaigns" className="text-charity-primary font-semibold mt-4 inline-block hover:underline">
                Browse Now →
              </Link>
            </div>
            
            <div className="card text-center">
              <div className="text-6xl mb-4">💝</div>
              <h3 className="text-2xl font-bold mb-4">2. Make a Donation</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Support campaigns with any amount. Every contribution counts and makes an impact.
              </p>
              <Link to="/choose" className="text-charity-primary font-semibold mt-4 inline-block hover:underline">
                Donate Now →
              </Link>
            </div>
            
            <div className="card text-center">
              <div className="text-6xl mb-4">📊</div>
              <h3 className="text-2xl font-bold mb-4">3. Track Impact</h3>
              <p className="text-gray-600 dark:text-gray-400">
                See real-time updates on how your donation is making a difference in lives.
              </p>
              <Link to="/dashboard" className="text-charity-primary font-semibold mt-4 inline-block hover:underline">
                View Dashboard →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Cause Categories CTA */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Explore By Cause</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Find campaigns that align with your passion
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Link to="/education" className="group relative overflow-hidden rounded-2xl shadow-xl h-80 transition-transform hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-600"></div>
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="relative h-full flex flex-col items-center justify-center text-white p-6">
                <div className="text-7xl mb-4">📚</div>
                <h3 className="text-3xl font-bold mb-2">Education</h3>
                <p className="text-center mb-4">Empower minds through learning</p>
                <span className="btn-primary bg-white text-blue-600 hover:bg-gray-100">
                  Explore Education
                </span>
              </div>
            </Link>

            <Link to="/food" className="group relative overflow-hidden rounded-2xl shadow-xl h-80 transition-transform hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-red-600"></div>
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="relative h-full flex flex-col items-center justify-center text-white p-6">
                <div className="text-7xl mb-4">🍚</div>
                <h3 className="text-3xl font-bold mb-2">Food Relief</h3>
                <p className="text-center mb-4">End hunger, one meal at a time</p>
                <span className="btn-primary bg-white text-orange-600 hover:bg-gray-100">
                  Explore Food Relief
                </span>
              </div>
            </Link>

            <Link to="/medical" className="group relative overflow-hidden rounded-2xl shadow-xl h-80 transition-transform hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-teal-600"></div>
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="relative h-full flex flex-col items-center justify-center text-white p-6">
                <div className="text-7xl mb-4">🏥</div>
                <h3 className="text-3xl font-bold mb-2">Medical</h3>
                <p className="text-center mb-4">Save lives with healthcare support</p>
                <span className="btn-primary bg-white text-green-600 hover:bg-gray-100">
                  Explore Medical
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Charts Section */}
      {funds && history.length > 0 && (
        <ChartsSection funds={funds} history={history} />
      )}

      {/* Live Fund Stats */}
      {funds && (
        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-8">Total Impact</h2>
            <p className="text-6xl font-bold text-charity-primary mb-12">
              ₹{funds.totalFund.toLocaleString()}
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              {Object.entries(funds).filter(([key]) => key !== 'totalFund').map(([key, value]) => (
                <div key={key} className="card">
                  <h4 className="text-xl font-semibold mb-2 capitalize">
                    {key.replace('Fund', '')}
                  </h4>
                  <p className="text-3xl font-bold text-charity-accent">
                    ₹{value.toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-black text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-charity-primary">Go Fund</h3>
              <p className="text-gray-400 mb-4">
                India's trusted crowdfunding platform connecting those who need help with those who want to help. Together, we create lasting social impact.
              </p>
              <p className="text-sm text-gray-500">Registered under Section 80G</p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Causes We Support</h4>
              <div className="space-y-2">
                <Link to="/education" className="block text-gray-400 hover:text-white transition">📚 Education & Scholarships</Link>
                <Link to="/food" className="block text-gray-400 hover:text-white transition">🍚 Food Security & Relief</Link>
                <Link to="/medical" className="block text-gray-400 hover:text-white transition">🏥 Medical & Healthcare</Link>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <div className="space-y-2">
                <Link to="/about" className="block text-gray-400 hover:text-white transition">About Us</Link>
                <Link to="/contact" className="block text-gray-400 hover:text-white transition">Contact Support</Link>
                <Link to="/success-stories" className="block text-gray-400 hover:text-white transition">Success Stories</Link>
                <Link to="/leaderboard" className="block text-gray-400 hover:text-white transition">Top Donors</Link>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">For Fundraisers</h4>
              <div className="space-y-2">
                <Link to="/create-campaign" className="block text-gray-400 hover:text-white transition">Start Campaign</Link>
                <Link to="/signup" className="block text-gray-400 hover:text-white transition">Create Account</Link>
                <Link to="/login" className="block text-gray-400 hover:text-white transition">Login</Link>
                <a href="#" className="block text-gray-400 hover:text-white transition">Terms & Conditions</a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8">
            <div className="grid md:grid-cols-2 gap-4">
              <p className="text-gray-400 text-sm">
                © 2024 Go Fund Foundation. All rights reserved. | CIN: UXXXXX2024NPXXXXXXX
              </p>
              <p className="text-gray-400 text-sm md:text-right">
                Made with ❤️ in India | Empowering Change, One Donation at a Time
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
