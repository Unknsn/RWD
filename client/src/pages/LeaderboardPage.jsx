import { useEffect, useState } from 'react'
import axios from 'axios'
import Navbar from '../components/Navbar'

export default function LeaderboardPage() {
  const [donors, setDonors] = useState([])

  useEffect(() => {
    axios.get('/api/leaderboard').then(res => setDonors(res.data))
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-20">
        <h1 className="text-4xl font-bold text-center mb-12">🏆 Top Donors</h1>
        
        <div className="space-y-4">
          {donors.map((donor, index) => (
            <div key={donor.email} className="card flex items-center justify-between hover:shadow-xl transition">
              <div className="flex items-center space-x-4">
                <div className={`text-4xl font-bold ${
                  index === 0 ? 'text-yellow-500' :
                  index === 1 ? 'text-gray-400' :
                  index === 2 ? 'text-orange-600' :
                  'text-gray-600'
                }`}>
                  #{index + 1}
                </div>
                <div>
                  <p className="font-bold text-lg">{donor.name}</p>
                  <p className="text-sm text-gray-600">{donor.count} donations</p>
                </div>
              </div>
              <div className="text-2xl font-bold text-charity-primary">
                ₹{donor.total.toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
