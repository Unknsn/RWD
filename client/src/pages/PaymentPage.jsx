import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import Confetti from 'react-confetti'

export default function PaymentPage() {
  const [amount, setAmount] = useState(500)
  const [customAmount, setCustomAmount] = useState('')
  const [cause, setCause] = useState('education')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [funds, setFunds] = useState(null)
  const [showConfetti, setShowConfetti] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    axios.get('/api/funds').then(res => setFunds(res.data))
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const finalAmount = customAmount ? parseInt(customAmount) : amount

    if (finalAmount < 100) {
      toast.error('Minimum donation is ₹100')
      return
    }

    setLoading(true)
    const loadingToast = toast.loading('Processing your donation...')
    
    try {
      const res = await axios.post('/api/donate', { 
        amount: finalAmount, 
        cause, 
        name, 
        email 
      })
      
      toast.success('Thank you for your generosity! 🙏', { id: loadingToast })
      setShowConfetti(true)
      
      setTimeout(() => {
        navigate('/thankyou', { state: { donation: res.data } })
      }, 2000)
    } catch (err) {
      toast.error('Donation failed. Please try again.', { id: loadingToast })
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen py-12 bg-gray-50 dark:bg-gray-900">
      {showConfetti && <Confetti recycle={false} numberOfPieces={500} />}
      
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Make a Donation</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Your contribution creates real impact
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          
          {/* Donation Form */}
          <div className="card">
            <h2 className="text-2xl font-bold mb-6">Donation Details</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Preset Amounts */}
              <div>
                <label className="block text-sm font-semibold mb-3">Select Amount</label>
                <div className="grid grid-cols-4 gap-3">
                  {[100, 500, 1000, 2000].map(amt => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => {
                        setAmount(amt)
                        setCustomAmount('')
                      }}
                      className={`py-3 rounded-lg font-semibold transition ${
                        amount === amt && !customAmount
                          ? 'bg-charity-primary text-white shadow-lg scale-105' 
                          : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
                      }`}
                    >
                      ₹{amt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Amount */}
              <div>
                <label className="block text-sm font-semibold mb-2">Custom Amount</label>
                <div className="relative">
                  <span className="absolute left-4 top-3 text-gray-500 text-lg">₹</span>
                  <input
                    type="number"
                    placeholder="Enter amount"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    className="input-field pl-10 text-lg"
                    min="100"
                  />
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Minimum: ₹100
                </p>
              </div>

              {/* Cause Selection */}
              <div>
                <label className="block text-sm font-semibold mb-3">Choose Cause</label>
                <div className="grid grid-cols-3 gap-3">
                  {(
                    { value: 'education', icon: '📚', label: 'Education' },
                    { value: 'food', icon: '🍚', label: 'Food' },
                    { value: 'medical', icon: '🏥', label: 'Medical' }
                  ).map(c => (
                    <button
                      key={c.value}
                      type="button"
                      onClick={() => setCause(c.value)}
                      className={`p-4 rounded-lg border-2 transition ${
                        cause === c.value
                          ? 'border-charity-primary bg-charity-primary/10'
                          : 'border-gray-300 dark:border-gray-600 hover:border-charity-primary'
                      }`}
                    >
                      <div className="text-3xl mb-2">{c.icon}</div>
                      <div className="font-semibold text-sm">{c.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Personal Details */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Your Name *</label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="input-field"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Your Email *</label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-field"
                    required
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    We'll send your receipt here
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Message (Optional)
                  </label>
                  <textarea
                    placeholder="Share why you're donating..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="input-field min-h-[80px]"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button 
                type="submit" 
                className="btn-primary w-full text-xl py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading}
              >
                {loading ? 'Processing...' : `Donate ₹${customAmount || amount}`}
              </button>

              <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                🔒 Your donation is secure and encrypted
              </p>
            </form>
          </div>

          {/* Live Stats Sidebar */}
          <div className="space-y-6">
            
            {/* Impact Preview */}
            <div className="card bg-gradient-to-br from-charity-primary/10 to-charity-accent/10 dark:from-charity-primary/20 dark:to-charity-accent/20">
              <h3 className="text-xl font-bold mb-4">Your Impact</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span>🎓 Students Educated</span>
                  <span className="font-bold text-xl">
                    {Math.floor((customAmount || amount) / 100)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>🍽️ Meals Provided</span>
                  <span className="font-bold text-xl">
                    {Math.floor((customAmount || amount) / 50)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>💊 Treatments Supported</span>
                  <span className="font-bold text-xl">
                    {Math.floor((customAmount || amount) / 150)}
                  </span>
                </div>
              </div>
            </div>

            {/* Live Fund Stats */}
            {funds && (
              <div className="card">
                <h3 className="text-xl font-bold mb-4">Live Fund Status</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-semibold">📚 Education</span>
                      <span className="text-sm">₹{funds.educationFund.toFixed(0)}</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                      <div 
                        className="bg-blue-600 h-3 rounded-full transition-all" 
                        style={{width: `${(funds.educationFund/funds.totalFund)*100}%`}}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-semibold">🍚 Food</span>
                      <span className="text-sm">₹{funds.foodFund.toFixed(0)}</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                      <div 
                        className="bg-orange-600 h-3 rounded-full transition-all" 
                        style={{width: `${(funds.foodFund/funds.totalFund)*100}%`}}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-semibold">🏥 Medical</span>
                      <span className="text-sm">₹{funds.medicalFund.toFixed(0)}</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                      <div 
                        className="bg-green-600 h-3 rounded-full transition-all" 
                        style={{width: `${(funds.medicalFund/funds.totalFund)*100}%`}}
                      ></div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t dark:border-gray-700">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold">Total Raised</span>
                    <span className="text-2xl font-bold text-charity-primary">
                      ₹{funds.totalFund.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Trust Badges */}
            <div className="card">
              <h3 className="text-xl font-bold mb-4">Why Donate With Us?</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="text-2xl">✅</div>
                  <div>
                    <p className="font-semibold">100% Secure</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Encrypted transactions
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="text-2xl">📧</div>
                  <div>
                    <p className="font-semibold">Instant Receipt</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Email confirmation
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="text-2xl">📊</div>
                  <div>
                    <p className="font-semibold">Track Impact</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Real-time updates
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  )
}
