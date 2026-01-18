import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default function TrendingCampaigns() {
  const [trending, setTrending] = useState([])

  useEffect(() => {
    axios.get('/api/campaigns/trending')
      .then(res => setTrending(res.data))
      .catch(err => console.error(err))
  }, [])

  if (trending.length === 0) return null

  return (
    <div className="card">
      <h3 className="text-xl font-bold mb-4 flex items-center">
        <span className="text-2xl mr-2">🔥</span>
        Trending Now
      </h3>
      <div className="space-y-3">
        {trending.map((campaign, i) => (
          <Link 
            key={campaign.id}
            to={`/campaign/${campaign.id}`}
            className="flex items-center space-x-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition"
          >
            <div className="text-2xl font-bold text-charity-primary">#{i + 1}</div>
            <img src={campaign.image} alt="" className="w-12 h-12 rounded-lg object-cover" />
            <div className="flex-1">
              <p className="font-semibold text-sm line-clamp-1">{campaign.title}</p>
              <p className="text-xs text-gray-500">₹{campaign.raised.toLocaleString()} raised</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
