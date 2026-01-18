import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import Navbar from '../components/Navbar'

export default function CreateCampaignPage() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    fullStory: '',
    category: 'education',
    goal: '',
    image: '',
    creatorName: '',
    creatorEmail: '',
    creatorLocation: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validation
    if (!formData.title || !formData.description || !formData.fullStory) {
      toast.error('Please fill all required fields')
      return
    }

    if (formData.goal < 1000) {
      toast.error('Goal must be at least ₹1,000')
      return
    }

    setLoading(true)
    const loadingToast = toast.loading('Creating your campaign...')

    try {
      const campaignData = {
        title: formData.title,
        description: formData.description,
        fullStory: formData.fullStory,
        category: formData.category,
        goal: parseInt(formData.goal),
        image: formData.image || `https://images.unsplash.com/photo-${
          formData.category === 'education' ? '1497633762265-9d179a990aa6' :
          formData.category === 'food' ? '1593113598332-cd288d649433' :
          '1576091160399-112ba8d25d1d'
        }?w=800`,
        creator: {
          name: formData.creatorName || 'Anonymous',
          email: formData.creatorEmail,
          location: formData.creatorLocation || 'India'
        }
      }

      const res = await axios.post('/api/campaigns', campaignData)
      
      toast.success('Campaign created successfully! 🎉', { id: loadingToast })
      
      setTimeout(() => {
        navigate(`/campaign/${res.data.id}`)
      }, 1500)
    } catch (err) {
      console.error('Campaign creation error:', err)
      toast.error('Failed to create campaign. Please try again.', { id: loadingToast })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <div className="pt-20 pb-12">
        <div className="max-w-4xl mx-auto px-4">
          
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">Start a Campaign</h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Create a fundraiser to support a cause that matters to you
            </p>
          </div>

          {/* Info Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="card text-center">
              <div className="text-4xl mb-2">🚀</div>
              <h3 className="font-bold mb-1">Quick Setup</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Launch in minutes</p>
            </div>
            <div className="card text-center">
              <div className="text-4xl mb-2">💯</div>
              <h3 className="font-bold mb-1">Keep More</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Low platform fees</p>
            </div>
            <div className="card text-center">
              <div className="text-4xl mb-2">🌍</div>
              <h3 className="font-bold mb-1">Global Reach</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Share worldwide</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="card space-y-6">
            
            {/* Campaign Title */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Campaign Title *
              </label>
              <input
                type="text"
                name="title"
                placeholder="e.g., Help Build School for 200 Children"
                value={formData.title}
                onChange={handleChange}
                className="input-field"
                required
                maxLength={100}
              />
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {formData.title.length}/100 characters
              </p>
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="input-field"
                required
              >
                <option value="education">📚 Education</option>
                <option value="food">🍚 Food Relief</option>
                <option value="medical">🏥 Medical</option>
              </select>
            </div>

            {/* Short Description */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Short Description *
              </label>
              <textarea
                name="description"
                placeholder="Brief summary of your campaign (1-2 sentences)"
                value={formData.description}
                onChange={handleChange}
                className="input-field min-h-[100px]"
                required
                maxLength={200}
              />
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {formData.description.length}/200 characters
              </p>
            </div>

            {/* Full Story */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Full Story *
              </label>
              <textarea
                name="fullStory"
                placeholder="Tell your story in detail. Why do you need funds? How will they be used? Who will benefit?"
                value={formData.fullStory}
                onChange={handleChange}
                className="input-field min-h-[200px]"
                required
              />
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Be specific and authentic. Donors want to know the impact of their contribution.
              </p>
            </div>

            {/* Funding Goal */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Funding Goal (₹) *
              </label>
              <input
                type="number"
                name="goal"
                placeholder="50000"
                value={formData.goal}
                onChange={handleChange}
                className="input-field"
                required
                min="1000"
              />
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Minimum goal: ₹1,000. Be realistic with your target.
              </p>
            </div>

            {/* Image URL (Optional) */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Campaign Image URL (Optional)
              </label>
              <input
                type="url"
                name="image"
                placeholder="https://example.com/image.jpg"
                value={formData.image}
                onChange={handleChange}
                className="input-field"
              />
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Leave blank to use default category image
              </p>
            </div>

            {/* Creator Details */}
            <div className="border-t dark:border-gray-700 pt-6">
              <h3 className="text-xl font-bold mb-4">Your Details</h3>
              
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      name="creatorName"
                      placeholder="John Doe"
                      value={formData.creatorName}
                      onChange={handleChange}
                      className="input-field"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Your Email
                    </label>
                    <input
                      type="email"
                      name="creatorEmail"
                      placeholder="john@example.com"
                      value={formData.creatorEmail}
                      onChange={handleChange}
                      className="input-field"
                    />
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      We'll send campaign updates here
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    name="creatorLocation"
                    placeholder="Mumbai, India"
                    value={formData.creatorLocation}
                    onChange={handleChange}
                    className="input-field"
                  />
                </div>
              </div>
            </div>

            {/* Preview Button */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <div className="text-2xl">💡</div>
                <div>
                  <h4 className="font-semibold text-blue-900 dark:text-blue-300 mb-1">
                    Tips for Success
                  </h4>
                  <ul className="text-sm text-blue-700 dark:text-blue-400 space-y-1">
                    <li>• Be honest and transparent about your needs</li>
                    <li>• Include specific details about fund usage</li>
                    <li>• Set a realistic and achievable goal</li>
                    <li>• Share your campaign on social media</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex space-x-4">
              <button
                type="submit"
                className="btn-primary flex-1 text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading}
              >
                {loading ? 'Creating Campaign...' : 'Launch Campaign 🚀'}
              </button>
              <button
                type="button"
                onClick={() => navigate('/campaigns')}
                className="px-8 py-4 border-2 border-gray-300 dark:border-gray-600 rounded-lg font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              >
                Cancel
              </button>
            </div>

          </form>

          {/* Bottom Info */}
          <div className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
            <p>By creating a campaign, you agree to our terms and conditions.</p>
            <p className="mt-2">Need help? <a href="#" className="text-charity-primary hover:underline">Contact Support</a></p>
          </div>

        </div>
      </div>
    </div>
  )
}
