import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Navbar from '../components/Navbar'

export default function SuccessStoriesPage() {
  const [stories, setStories] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get('/api/success-stories')
      .then(res => {
        setStories(res.data)
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
      
      <div className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4">
          
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4">Success Stories ⭐</h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Celebrating campaigns that reached their goals and changed lives
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-charity-primary"></div>
            </div>
          ) : stories.length > 0 ? (
            <div className="space-y-8">
              {stories.map((story, index) => (
                <div key={story.id} className="card hover:shadow-2xl transition">
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="md:col-span-1">
                      <img 
                        src={story.image} 
                        alt={story.title}
                        className="w-full h-64 object-cover rounded-lg"
                      />
                      {index === 0 && (
                        <div className="mt-4 text-center">
                          <span className="inline-block bg-yellow-400 text-yellow-900 px-4 py-2 rounded-full font-bold">
                            🏆 Top Success
                          </span>
                        </div>
                      )}
                    </div>
                    
                    <div className="md:col-span-2">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h2 className="text-2xl font-bold mb-2">{story.title}</h2>
                          <p className="text-gray-600 dark:text-gray-400">{story.description}</p>
                        </div>
                        <span className="text-green-600 text-4xl">✅</span>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                          <p className="text-2xl font-bold text-green-600">₹{story.raised.toLocaleString()}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Raised</p>
                        </div>
                        <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                          <p className="text-2xl font-bold text-blue-600">{story.donorCount}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Donors</p>
                        </div>
                        <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                          <p className="text-2xl font-bold text-purple-600">{((story.raised / story.goal) * 100).toFixed(0)}%</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Achieved</p>
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-500 dark:text-gray-500 mb-4">
                        Created by {story.creator.name} • {story.creator.location}
                      </p>
                      
                      <Link to={`/campaign/${story.id}`} className="btn-primary inline-block">
                        Read Full Story
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🎯</div>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                No success stories yet. Be the first!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
