import { useState, useEffect } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'

export default function FavoriteButton({ campaignId }) {
  const [isFavorited, setIsFavorited] = useState(false)
  const user = JSON.parse(localStorage.getItem('user') || '{}')

  useEffect(() => {
    if (user.email) {
      axios.get(`/api/favorites/${user.email}/${campaignId}`)
        .then(res => setIsFavorited(res.data.isFavorited))
        .catch(err => console.error(err))
    }
  }, [campaignId, user.email])

  const toggleFavorite = async () => {
    if (!user.email) {
      toast.error('Please login to save favorites')
      return
    }

    try {
      if (isFavorited) {
        await axios.delete('/api/favorites', { data: { userEmail: user.email, campaignId } })
        toast.success('Removed from favorites')
      } else {
        await axios.post('/api/favorites', { userEmail: user.email, campaignId })
        toast.success('Added to favorites!')
      }
      setIsFavorited(!isFavorited)
    } catch (err) {
      toast.error('Failed to update favorites')
    }
  }

  return (
    <button
      onClick={toggleFavorite}
      className={`p-3 rounded-full transition ${
        isFavorited 
          ? 'bg-red-100 dark:bg-red-900/20 text-red-600' 
          : 'bg-gray-100 dark:bg-gray-800 text-gray-600'
      }`}
      title={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
    >
      {isFavorited ? '❤️' : '🤍'}
    </button>
  )
}
