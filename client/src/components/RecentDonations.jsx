import { useState, useEffect } from 'react'
import axios from 'axios'

export default function RecentDonations() {
  const [donations, setDonations] = useState([])

  useEffect(() => {
    loadDonations()
    const interval = setInterval(loadDonations, 10000) // Refresh every 10s
    return () => clearInterval(interval)
  }, [])

  const loadDonations = () => {
    axios.get('/api/recent-donations')
      .then(res => setDonations(res.data))
      .catch(err => console.error(err))
  }

  const getTimeAgo = (timestamp) => {
    const seconds = Math.floor((new Date() - new Date(timestamp)) / 1000)
    if (seconds < 60) return 'Just now'
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`
    return `${Math.floor(seconds / 86400)}d ago`
  }

  return (
    <div className="card">
      <h3 className="text-lg font-bold mb-4 flex items-center">
        <span className="animate-pulse text-green-500 mr-2">●</span>
        Recent Donations
      </h3>
      <div className="space-y-3">
        {donations.map((d, i) => (
          <div key={i} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg animate-fade-in">
            <div className="flex items-center space-x-3">
              <div className="text-2xl">💚</div>
              <div>
                <p className="font-semibold text-sm">{d.name}</p>
                <p className="text-xs text-gray-500">{d.campaign}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold text-charity-primary">₹{d.amount}</p>
              <p className="text-xs text-gray-500">{getTimeAgo(d.timestamp)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
