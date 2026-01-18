import { useState, useEffect } from 'react'
import axios from 'axios'

export default function CampaignAnalytics({ campaignId }) {
  const [analytics, setAnalytics] = useState(null)

  useEffect(() => {
    axios.get(`/api/campaigns/${campaignId}/analytics`)
      .then(res => setAnalytics(res.data))
      .catch(err => console.error(err))
  }, [campaignId])

  if (!analytics) return null

  return (
    <div className="card">
      <h3 className="text-2xl font-bold mb-6">Campaign Analytics</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <p className="text-sm text-gray-600 dark:text-gray-400">Total Views</p>
          <p className="text-3xl font-bold text-blue-600">{analytics.views}</p>
        </div>
        <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <p className="text-sm text-gray-600 dark:text-gray-400">Donations</p>
          <p className="text-3xl font-bold text-green-600">{analytics.donations}</p>
        </div>
        <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
          <p className="text-sm text-gray-600 dark:text-gray-400">Avg Donation</p>
          <p className="text-3xl font-bold text-purple-600">₹{analytics.avgDonation}</p>
        </div>
        <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
          <p className="text-sm text-gray-600 dark:text-gray-400">Conversion</p>
          <p className="text-3xl font-bold text-orange-600">{analytics.conversionRate}%</p>
        </div>
      </div>
    </div>
  )
}
