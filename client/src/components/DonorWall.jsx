import { useEffect, useState } from 'react'
import axios from 'axios'

export default function DonorWall({ campaignId }) {
  const [donors, setDonors] = useState([])

  useEffect(() => {
    axios.get(`/api/campaigns/${campaignId}/donors`)
      .then(res => setDonors(res.data))
      .catch(err => console.error(err))
  }, [campaignId])

  return (
    <div className="card">
      <h3 className="text-2xl font-bold mb-6">🙏 Top Donors</h3>
      <div className="space-y-3">
        {donors.slice(0, 5).map((donor, i) => (
          <div key={i} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                i === 0 ? 'bg-yellow-400 text-yellow-900' :
                i === 1 ? 'bg-gray-400 text-gray-900' :
                i === 2 ? 'bg-orange-600 text-white' :
                'bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100'
              }`}>
                {donor.name.charAt(0)}
              </div>
              <div>
                <p className="font-semibold">{donor.name}</p>
                <p className="text-xs text-gray-500">{donor.count} donations</p>
              </div>
            </div>
            <p className="font-bold text-charity-primary">₹{donor.total.toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
