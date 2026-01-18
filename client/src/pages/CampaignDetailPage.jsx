import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import Confetti from 'react-confetti'
import Navbar from '../components/Navbar'
import CampaignUpdates from '../components/CampaignUpdates'
import CampaignComments from '../components/CampaignComments'
import FavoriteButton from '../components/FavoriteButton'
import CampaignAnalytics from '../components/CampaignAnalytics'
import RecentDonations from '../components/RecentDonations'

export default function CampaignDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [campaign, setCampaign] = useState(null)
  const [amount, setAmount] = useState(500)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [showConfetti, setShowConfetti] = useState(false)

  const user = JSON.parse(localStorage.getItem('user') || '{}')
  const isOwner = user.email === campaign?.creator?.email

  useEffect(() => {
    axios.get(`/api/campaigns/${id}`)
      .then(res => {
        setCampaign(res.data)
        
        // Track view
        axios.post(`/api/campaigns/${id}/view`)
      })
      .catch(err => console.error(err))
  }, [id])

  const handleDonate = async (e) => {
    e.preventDefault()
    
    if (amount < 100) {
      toast.error('Minimum donation is ₹100')
      return
    }

    const loadingToast = toast.loading('Processing your donation...')
    
    try {
      const res = await axios.post(`/api/campaigns/${id}/donate`, { amount, name, email })
      toast.success('Thank you for your generosity! 🙏', { id: loadingToast })
      setShowConfetti(true)
      
      // Update campaign data
      setCampaign(prev => ({
        ...prev,
        raised: prev.raised + amount,
        donorCount: prev.donorCount + 1
      }))
      
      setTimeout(() => {
        navigate('/thankyou', { state: { donation: res.data } })
      }, 2000)
    } catch (err) {
      toast.error('Donation failed. Please try again.', { id: loadingToast })
    }
  }

  const handleShare = (platform) => {
    const url = window.location.href
    const text = `Help support: ${campaign.title}`
    
    let shareUrl = ''
    
    switch(platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
        break
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`
        break
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`
        break
      case 'copy':
        navigator.clipboard.writeText(url)
        toast.success('Link copied to clipboard!')
        return
    }
    
    window.open(shareUrl, '_blank', 'width=600,height=400')
  }

  if (!campaign) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-xl">Loading...</div>
    </div>
  )

  const progressPercent = Math.min((campaign.raised / campaign.goal) * 100, 100)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {showConfetti && <Confetti recycle={false} numberOfPieces={500} />}
      <Navbar />
      
      <div className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4">
          
          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Hero with Favorite Button */}
              <div className="rounded-2xl overflow-hidden shadow-xl relative">
                <img src={campaign.image} alt={campaign.title} className="w-full h-96 object-cover" />
                <div className="absolute top-4 right-4">
                  <FavoriteButton campaignId={campaign.id} />
                </div>
              </div>

              {/* Campaign Info */}
              <div className="card">
                <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mb-4">
                  <span className="px-3 py-1 bg-charity-accent/10 text-charity-accent rounded-full font-semibold">
                    {campaign.category}
                  </span>
                  <span>•</span>
                  <span>{campaign.creator.location}</span>
                </div>

                <h1 className="text-4xl font-bold mb-4">{campaign.title}</h1>
                
                <div className="flex items-center space-x-6 text-gray-600 dark:text-gray-400 mb-6">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">👤</span>
                    <div>
                      <p className="text-sm">Organized by</p>
                      <p className="font-semibold text-gray-900 dark:text-gray-100">
                        {campaign.creator.name}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-t dark:border-gray-700 pt-6">
                  <h2 className="text-2xl font-bold mb-4">Story</h2>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                    {campaign.fullStory}
                  </p>
                </div>
              </div>

              {/* Campaign Updates */}
              <CampaignUpdates campaignId={campaign.id} isOwner={isOwner} />

              {/* Comments */}
              <CampaignComments campaignId={campaign.id} />

              {/* Analytics (Owner Only) */}
              {isOwner && <CampaignAnalytics campaignId={campaign.id} />}

              {/* Share Section */}
              <div className="card">
                <h3 className="text-xl font-bold mb-4">Share this campaign</h3>
                <div className="grid grid-cols-2 gap-3">
                  <button 
                    onClick={() => handleShare('facebook')}
                    className="flex items-center justify-center space-x-2 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    <span>📘</span>
                    <span>Facebook</span>
                  </button>
                  <button 
                    onClick={() => handleShare('twitter')}
                    className="flex items-center justify-center space-x-2 py-3 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition"
                  >
                    <span>🐦</span>
                    <span>Twitter</span>
                  </button>
                  <button 
                    onClick={() => handleShare('whatsapp')}
                    className="flex items-center justify-center space-x-2 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                  >
                    <span>📱</span>
                    <span>WhatsApp</span>
                  </button>
                  <button 
                    onClick={() => handleShare('copy')}
                    className="flex items-center justify-center space-x-2 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
                  >
                    <span>🔗</span>
                    <span>Copy Link</span>
                  </button>
                </div>
              </div>

            </div>

            {/* Right Column - Donation Form */}
            <div className="lg:col-span-1">
              <div className="card sticky top-24">
                
                {/* Progress */}
                <div className="mb-6">
                  <div className="flex justify-between mb-2">
                    <span className="text-3xl font-bold text-charity-primary">
                      ₹{campaign.raised.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mb-3">
                    raised of ₹{campaign.goal.toLocaleString()} goal
                  </p>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-4">
                    <div 
                      className="bg-charity-accent h-3 rounded-full transition-all" 
                      style={{width: `${progressPercent}%`}}
                    ></div>
                  </div>
                  
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                    <span>👥 {campaign.donorCount} donors</span>
                    <span>⏰ {campaign.daysLeft} days left</span>
                  </div>
                </div>

                {/* Donation Form */}
                <form onSubmit={handleDonate} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Select Amount</label>
                    <div className="grid grid-cols-3 gap-2 mb-2">
                      {[500, 1000, 2000].map(amt => (
                        <button
                          key={amt}
                          type="button"
                          onClick={() => setAmount(amt)}
                          className={`py-2 rounded-lg font-semibold transition ${
                            amount === amt ? 'bg-charity-primary text-white' : 'bg-gray-200 dark:bg-gray-700'
                          }`}
                        >
                          ₹{amt}
                        </button>
                      ))}
                    </div>
                    <input
                      type="number"
                      placeholder="Custom amount"
                      value={amount}
                      onChange={(e) => setAmount(Number(e.target.value))}
                      className="input-field"
                    />
                  </div>

                  <input
                    type="text"
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="input-field"
                    required
                  />
                  
                  <input
                    type="email"
                    placeholder="Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-field"
                    required
                  />

                  <button type="submit" className="btn-primary w-full text-lg">
                    Donate ₹{amount}
                  </button>
                </form>

                <p className="text-xs text-center text-gray-500 dark:text-gray-500 mt-4">
                  🔒 Your donation is secure and protected
                </p>

                {/* Recent Donations */}
                <RecentDonations />
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  )
}
