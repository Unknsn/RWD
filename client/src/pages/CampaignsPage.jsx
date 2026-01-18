import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Navbar from '../components/Navbar'
import CampaignCard from '../components/CampaignCard'

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState([])
  const [category, setCategory] = useState('all')
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState('recent')

  useEffect(() => {
    axios.get('/api/campaigns', { params: { category, search } })
      .then(res => {
        let sorted = res.data
        
        // Sort campaigns
        if (sortBy === 'popular') {
          sorted = sorted.sort((a, b) => b.donorCount - a.donorCount)
        } else if (sortBy === 'progress') {
          sorted = sorted.sort((a, b) => (b.raised / b.goal) - (a.raised / a.goal))
        } else if (sortBy === 'ending') {
          sorted = sorted.sort((a, b) => a.daysLeft - b.daysLeft)
        }
        
        setCampaigns(sorted)
      })
      .catch(err => console.error(err))
  }, [category, search, sortBy])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <div className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4">
          
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4">Discover Fundraisers</h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Support causes that matter to you
            </p>
          </div>

          {/* Search & Filters */}
          <div className="card mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                placeholder="Search campaigns..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input-field flex-1"
              />
              
              <select 
                value={category} 
                onChange={(e) => setCategory(e.target.value)}
                className="input-field md:w-48"
              >
                <option value="all">All Categories</option>
                <option value="education">Education</option>
                <option value="food">Food</option>
                <option value="medical">Medical</option>
              </select>

              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="input-field md:w-48"
              >
                <option value="recent">Most Recent</option>
                <option value="popular">Most Popular</option>
                <option value="progress">Most Progress</option>
                <option value="ending">Ending Soon</option>
              </select>

              <Link to="/create-campaign" className="btn-primary text-center whitespace-nowrap">
                Start Campaign
              </Link>
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-gray-600 dark:text-gray-400">
              Found <span className="font-bold">{campaigns.length}</span> campaigns
            </p>
          </div>

          {/* Campaigns Grid */}
          {campaigns.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {campaigns.map(campaign => (
                <CampaignCard key={campaign.id} campaign={campaign} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600 dark:text-gray-400">
                No campaigns found. Try adjusting your filters.
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
