import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Navbar from '../components/Navbar'
import CampaignCard from '../components/CampaignCard'

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user') || '{}')

  useEffect(() => {
    if (!user.email) {
      navigate('/login')
      return
    }

    axios.get(`/api/favorites/${user.email}`)
      .then(res => {
        setFavorites(res.data)
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
      })
  }, [navigate, user.email])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <div className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8">My Favorites ❤️</h1>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-charity-primary"></div>
            </div>
          ) : favorites.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-8">
              {favorites.map(campaign => (
                <CampaignCard key={campaign.id} campaign={campaign} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">💔</div>
              <p className="text-xl mb-4">No favorites yet</p>
              <button onClick={() => navigate('/campaigns')} className="btn-primary">
                Browse Campaigns
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
