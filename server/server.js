import express from 'express'
import cors from 'cors'
import nodemailer from 'nodemailer'

const app = express()
app.use(cors())
app.use(express.json())

// In-memory storage
let funds = {
  totalFund: 0,
  educationFund: 0,
  foodFund: 0,
  medicalFund: 0
}

let donationHistory = []
let campaignUpdates = []
let campaignComments = []
let favorites = []
let campaignViews = {}

const goals = {
  education: 50000,
  food: 30000,
  medical: 40000
}

let users = [
  {
    id: 1,
    name: 'Go Fund Member',
    email: 'member@gofund.com',
    password: 'password123',
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    name: 'Admin',
    email: '123456789@gmail.com',
    password: '123456',
    isAdmin: true,
    createdAt: new Date().toISOString()
  }
]

let campaigns = [
  {
    id: 1,
    title: "Support Education for 50 Underprivileged Children",
    description: "Help provide quality education, books, and school supplies to children from low-income families who dream of a better future.",
    fullStory: "These 50 children from underprivileged backgrounds show exceptional academic potential but lack resources for books, uniforms, and school fees. Your support will cover their educational expenses for one full academic year, giving them a fighting chance to break the cycle of poverty. Every child deserves access to quality education regardless of their economic background.",
    category: "education",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800",
    raised: 25000,
    goal: 75000,
    donorCount: 67,
    daysLeft: 45,
    creator: {
      name: "Shiksha Foundation",
      email: "contact@shikshafoundation.org",
      location: "New Delhi, India"
    },
    createdAt: "2024-01-10"
  },
  {
    id: 2,
    title: "Emergency Flood Relief: 200 Families Need Food & Shelter",
    description: "Severe flooding has displaced 200 families. They urgently need food, clean water, temporary shelter, and medical supplies.",
    fullStory: "Recent heavy monsoon floods in rural Maharashtra have left 200 families homeless. They've lost their homes, crops, and livelihoods. We're providing immediate relief with food rations, clean drinking water, medical aid, and temporary shelter materials. Each family will receive a relief kit worth ₹2,000 containing rice, dal, cooking oil, medicines, and tarpaulin sheets for temporary shelter.",
    category: "food",
    image: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800",
    raised: 180000,
    goal: 400000,
    donorCount: 234,
    daysLeft: 12,
    creator: {
      name: "Relief India Trust",
      email: "relief@reliefindia.org",
      location: "Mumbai, Maharashtra"
    },
    createdAt: "2024-01-20"
  },
  {
    id: 3,
    title: "Life-Saving Heart Surgery for 8-Year-Old Riya",
    description: "Little Riya needs urgent heart surgery. Her family cannot afford the ₹5 lakh treatment cost. Help save her life.",
    fullStory: "8-year-old Riya was born with a congenital heart defect. She needs immediate open-heart surgery or she won't survive beyond a few months. Her father is a daily wage laborer earning ₹300/day and has already exhausted all savings on initial medical tests. The surgery costs ₹5,00,000 which is impossible for them to arrange. Doctors have confirmed that with the surgery, Riya will lead a completely normal life. Your contribution can save her life.",
    category: "medical",
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800",
    raised: 325000,
    goal: 500000,
    donorCount: 412,
    daysLeft: 8,
    creator: {
      name: "Child Heart Foundation",
      email: "help@childheart.in",
      location: "Chennai, Tamil Nadu"
    },
    createdAt: "2024-01-25"
  },
  {
    id: 4,
    title: "Build Computer Lab for Government School",
    description: "Help 500 students in a rural government school access digital education by building their first computer lab with 25 computers.",
    fullStory: "This government school in rural Karnataka serves 500 students from farming families. None of these children have ever used a computer. In today's digital age, they're being left behind without basic computer skills. We want to build their first computer lab with 25 computers, UPS, furniture, and provide free computer education training. This will help bridge the digital divide and give these children skills needed for future job opportunities.",
    category: "education",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800",
    raised: 85000,
    goal: 200000,
    donorCount: 93,
    daysLeft: 30,
    creator: {
      name: "Digital Bharat Initiative",
      email: "info@digitalbharat.org",
      location: "Bangalore, Karnataka"
    },
    createdAt: "2024-01-15"
  },
  {
    id: 5,
    title: "Monthly Meals for 100 Homeless People",
    description: "Provide nutritious daily meals to 100 homeless individuals living on the streets of Delhi for the next 3 months.",
    fullStory: "Over 100 homeless people sleep on the streets near Kashmere Gate, Delhi. Most go hungry for days. We've partnered with a local NGO to provide them one nutritious meal daily (dal, rice, vegetables, roti) for 3 months. Each meal costs ₹40. Your contribution will ensure no one sleeps hungry. We also provide basic medical checkups and winter clothes. Many of these people are elderly or disabled who cannot work. Your support will bring dignity to their lives.",
    category: "food",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800",
    raised: 240000,
    goal: 360000,
    donorCount: 156,
    daysLeft: 25,
    creator: {
      name: "Feeding Hope Foundation",
      email: "meals@feedinghope.org",
      location: "New Delhi, India"
    },
    createdAt: "2024-01-12"
  },
  {
    id: 6,
    title: "Free Cataract Surgeries for 50 Elderly Poor",
    description: "Restore vision and independence to 50 elderly people from slums who are suffering from treatable cataract blindness.",
    fullStory: "Thousands of elderly poor in Indian slums suffer from cataract blindness - a completely curable condition. Each surgery costs only ₹3,000 but for poor families, it's an impossible amount. We've partnered with reputable eye hospitals to perform surgeries at subsidized rates. Post-surgery, patients regain 100% vision within weeks. This restores their independence, dignity, and ability to work. 50 elderly patients are waiting for your support. Your ₹3,000 can give someone their sight back.",
    category: "medical",
    image: "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?w=800",
    raised: 95000,
    goal: 150000,
    donorCount: 78,
    daysLeft: 60,
    creator: {
      name: "Vision Restore Mission",
      email: "contact@visionrestore.in",
      location: "Kolkata, West Bengal"
    },
    createdAt: "2024-01-05"
  }
]

// Email Configuration
const EMAIL_CONFIG = {
  service: 'gmail',
  auth: {
    user: 'unknsn1@gmail.com',
    pass: 'xogefswgjpukiosq'
  }
}

let transporter = null
let EMAIL_ENABLED = true

try {
  transporter = nodemailer.createTransport(EMAIL_CONFIG)
  transporter.verify((error, success) => {
    if (error) {
      console.log('❌ Email error:', error.message)
    } else {
      EMAIL_ENABLED = true
      console.log('✅ Email server ready!')
    }
  })
} catch (error) {
  console.log('⚠️ Email not configured')
}

async function sendWelcomeEmail(userEmail, userName) {
  if (!EMAIL_ENABLED || !transporter) {
    console.log('📧 [DEV] Welcome email ->', userEmail)
    return
  }

  const mailOptions = {
    from: '"Go Fund" <' + EMAIL_CONFIG.auth.user + '>',
    to: userEmail,
    subject: 'Welcome to Go Fund! 🎉',
    html: '<h1>Welcome ' + userName + '!</h1><p>Thank you for joining Go Fund.</p>'
  }

  try {
    await transporter.sendMail(mailOptions)
    console.log('✅ Welcome email sent ->', userEmail)
  } catch (error) {
    console.error('❌ Email error:', error.message)
  }
}

async function sendThankYouEmail(userEmail, userName, amount, campaignTitle) {
  if (!EMAIL_ENABLED || !transporter) {
    console.log('📧 [DEV] Thank you email ->', userEmail)
    return
  }

  const mailOptions = {
    from: '"Go Fund" <' + EMAIL_CONFIG.auth.user + '>',
    to: userEmail,
    subject: 'Thank You for Your Donation! 🙏',
    html: '<h1>Thank You ' + userName + '!</h1><p>Your donation of ₹' + amount + ' for ' + campaignTitle + ' is appreciated.</p>'
  }

  try {
    await transporter.sendMail(mailOptions)
    console.log('✅ Thank you email sent ->', userEmail)
  } catch (error) {
    console.error('❌ Email error:', error.message)
  }
}

async function sendCampaignCreatedEmail(userEmail, userName, campaignTitle, campaignId) {
  if (!EMAIL_ENABLED || !transporter) {
    console.log('📧 [DEV] Campaign email ->', userEmail)
    return
  }

  const mailOptions = {
    from: '"Go Fund" <' + EMAIL_CONFIG.auth.user + '>',
    to: userEmail,
    subject: 'Your Campaign is Live! 🚀',
    html: '<h1>Congratulations ' + userName + '!</h1><p>Your campaign "' + campaignTitle + '" is now live!</p>'
  }

  try {
    await transporter.sendMail(mailOptions)
    console.log('✅ Campaign email sent ->', userEmail)
  } catch (error) {
    console.error('❌ Email error:', error.message)
  }
}

// API Routes
app.post('/api/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'All fields required' })
    }

    const existing = users.find(u => u.email === email)
    if (existing) {
      return res.status(400).json({ success: false, message: 'Email exists' })
    }

    const newUser = {
      id: users.length + 1,
      name,
      email,
      password,
      createdAt: new Date().toISOString()
    }

    users.push(newUser)
    sendWelcomeEmail(email, name).catch(e => console.log('Email skip'))

    res.json({ 
      success: true, 
      user: { name: newUser.name, email: newUser.email, id: newUser.id }
    })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' })
  }
})

app.post('/api/login', (req, res) => {
  const { email, password } = req.body
  const user = users.find(u => u.email === email && u.password === password)
  
  if (user) {
    res.json({ success: true, user: { name: user.name, email: user.email, id: user.id }})
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' })
  }
})

app.post('/api/donate', async (req, res) => {
  const { amount, cause, name, email } = req.body
  
  funds.totalFund += amount
  const share = amount / 3
  funds.educationFund += share
  funds.foodFund += share
  funds.medicalFund += share
  
  const donation = {
    id: Date.now(),
    amount,
    cause,
    name,
    email,
    timestamp: new Date().toISOString(),
    funds: { ...funds }
  }
  donationHistory.push(donation)
  
  const title = cause.charAt(0).toUpperCase() + cause.slice(1) + ' Fund'
  sendThankYouEmail(email, name, amount, title).catch(e => console.log('Email skip'))
  
  res.json({ success: true, amount, cause, funds: { ...funds }, id: donation.id })
})

app.post('/api/campaigns/:id/donate', async (req, res) => {
  const { amount, name, email } = req.body
  const campaignId = parseInt(req.params.id)
  const campaign = campaigns.find(c => c.id === campaignId)
  
  if (!campaign) {
    return res.status(404).json({ error: 'Campaign not found' })
  }
  
  campaign.raised += amount
  campaign.donorCount += 1
  funds.totalFund += amount
  const share = amount / 3
  funds.educationFund += share
  funds.foodFund += share
  funds.medicalFund += share
  
  const donation = {
    id: Date.now(),
    amount,
    campaignId,
    campaignTitle: campaign.title,
    name,
    email,
    timestamp: new Date().toISOString(),
    funds: { ...funds }
  }
  donationHistory.push(donation)
  
  sendThankYouEmail(email, name, amount, campaign.title).catch(e => console.log('Email skip'))
  
  res.json({ success: true, amount, campaign: campaign.title, funds: { ...funds }, id: donation.id })
})

app.get('/api/campaigns', (req, res) => {
  const { category, search } = req.query
  let filtered = [...campaigns]
  
  if (category && category !== 'all') {
    filtered = filtered.filter(c => c.category === category)
  }
  
  if (search) {
    const s = search.toLowerCase()
    filtered = filtered.filter(c => 
      c.title.toLowerCase().includes(s) || c.description.toLowerCase().includes(s)
    )
  }
  
  res.json(filtered)
})

app.get('/api/campaigns/:id', (req, res) => {
  const campaign = campaigns.find(c => c.id === parseInt(req.params.id))
  if (campaign) {
    res.json(campaign)
  } else {
    res.status(404).json({ error: 'Not found' })
  }
})

app.post('/api/campaigns', async (req, res) => {
  const newCampaign = {
    id: campaigns.length + 1,
    ...req.body,
    raised: 0,
    donorCount: 0,
    daysLeft: 60,
    createdAt: new Date().toISOString()
  }
  campaigns.push(newCampaign)
  
  if (req.body.creator && req.body.creator.email) {
    sendCampaignCreatedEmail(
      req.body.creator.email,
      req.body.creator.name,
      req.body.title,
      newCampaign.id
    ).catch(e => console.log('Email skip'))
  }
  
  res.json(newCampaign)
})

app.get('/api/funds', (req, res) => {
  res.json(funds)
})

app.get('/api/stats', (req, res) => {
  res.json({ totalDonated: funds.totalFund, ...funds })
})

app.get('/api/history', (req, res) => {
  res.json(donationHistory.slice(-10).reverse())
})

app.get('/api/goals', (req, res) => {
  res.json({
    goals,
    progress: {
      education: Math.min((funds.educationFund / goals.education) * 100, 100),
      food: Math.min((funds.foodFund / goals.food) * 100, 100),
      medical: Math.min((funds.medicalFund / goals.medical) * 100, 100)
    }
  })
})

app.get('/api/leaderboard', (req, res) => {
  const topDonors = donationHistory
    .reduce((acc, d) => {
      const existing = acc.find(x => x.email === d.email)
      if (existing) {
        existing.total += d.amount
        existing.count++
      } else {
        acc.push({ name: d.name, email: d.email, total: d.amount, count: 1 })
      }
      return acc
    }, [])
    .sort((a, b) => b.total - a.total)
    .slice(0, 10)
  
  res.json(topDonors)
})

app.get('/api/user-stats/:email', (req, res) => {
  const userDonations = donationHistory.filter(d => d.email === req.params.email)
  const total = userDonations.reduce((sum, d) => sum + d.amount, 0)
  res.json({ totalDonated: total, donationCount: userDonations.length, donations: userDonations })
})

// Campaign Updates & Comments
app.post('/api/campaigns/:id/updates', (req, res) => {
  const { title, message, authorEmail } = req.body
  const campaignId = parseInt(req.params.id)
  
  const update = {
    id: Date.now(),
    campaignId,
    title,
    message,
    authorEmail,
    timestamp: new Date().toISOString()
  }
  
  campaignUpdates.push(update)
  res.json({ success: true, update })
})

// Get campaign updates
app.get('/api/campaigns/:id/updates', (req, res) => {
  const campaignId = parseInt(req.params.id)
  const updates = campaignUpdates
    .filter(u => u.campaignId === campaignId)
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
  res.json(updates)
})

// Post comment
app.post('/api/campaigns/:id/comments', (req, res) => {
  const { name, email, message } = req.body
  const campaignId = parseInt(req.params.id)
  
  const comment = {
    id: Date.now(),
    campaignId,
    name,
    email,
    message,
    timestamp: new Date().toISOString()
  }
  
  campaignComments.push(comment)
  res.json({ success: true, comment })
})

// Get comments
app.get('/api/campaigns/:id/comments', (req, res) => {
  const campaignId = parseInt(req.params.id)
  const comments = campaignComments
    .filter(c => c.campaignId === campaignId)
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
  res.json(comments)
})

// Favorites
app.post('/api/favorites', (req, res) => {
  const { userEmail, campaignId } = req.body
  
  const existing = favorites.find(f => f.userEmail === userEmail && f.campaignId === campaignId)
  if (existing) {
    return res.json({ success: true, message: 'Already favorited' })
  }
  
  favorites.push({ userEmail, campaignId, timestamp: new Date().toISOString() })
  res.json({ success: true })
})

// Remove from favorites
app.delete('/api/favorites', (req, res) => {
  const { userEmail, campaignId } = req.body
  favorites = favorites.filter(f => !(f.userEmail === userEmail && f.campaignId === campaignId))
  res.json({ success: true })
})

// Get user favorites
app.get('/api/favorites/:email', (req, res) => {
  const userFavorites = favorites
    .filter(f => f.userEmail === req.params.email)
    .map(f => campaigns.find(c => c.id === f.campaignId))
    .filter(c => c !== undefined)
  res.json(userFavorites)
})

// Check if favorited
app.get('/api/favorites/:email/:campaignId', (req, res) => {
  const isFavorited = favorites.some(f => 
    f.userEmail === req.params.email && f.campaignId === parseInt(req.params.campaignId)
  )
  res.json({ isFavorited })
})

// Track campaign view
app.post('/api/campaigns/:id/view', (req, res) => {
  const campaignId = parseInt(req.params.id)
  if (!campaignViews[campaignId]) {
    campaignViews[campaignId] = 0
  }
  campaignViews[campaignId]++
  res.json({ views: campaignViews[campaignId] })
})

// Get campaign views
app.get('/api/campaigns/:id/views', (req, res) => {
  const campaignId = parseInt(req.params.id)
  res.json({ views: campaignViews[campaignId] || 0 })
})

// Get recent donations (live feed)
app.get('/api/recent-donations', (req, res) => {
  const recent = donationHistory
    .slice(-5)
    .reverse()
    .map(d => ({
      name: d.name,
      amount: d.amount,
      campaign: d.campaignTitle || 'General Fund',
      timestamp: d.timestamp
    }))
  res.json(recent)
})

// Get campaign analytics
app.get('/api/campaigns/:id/analytics', (req, res) => {
  const campaignId = parseInt(req.params.id)
  const campaign = campaigns.find(c => c.id === campaignId)
  
  if (!campaign) {
    return res.status(404).json({ error: 'Not found' })
  }
  
  const campaignDonations = donationHistory.filter(d => d.campaignId === campaignId)
  const totalRaised = campaignDonations.reduce((sum, d) => sum + d.amount, 0)
  const avgDonation = totalRaised / (campaignDonations.length || 1)
  
  res.json({
    views: campaignViews[campaignId] || 0,
    donations: campaignDonations.length,
    totalRaised,
    avgDonation: avgDonation.toFixed(2),
    conversionRate: ((campaignDonations.length / (campaignViews[campaignId] || 1)) * 100).toFixed(2)
  })
})

// Get all users (Admin only)
app.get('/api/admin/users', (req, res) => {
  res.json(users)
})

// Delete campaign (Admin only)
app.delete('/api/campaigns/:id', (req, res) => {
  const id = parseInt(req.params.id)
  campaigns = campaigns.filter(c => c.id !== id)
  res.json({ success: true })
})

// Get campaign donors
app.get('/api/campaigns/:id/donors', (req, res) => {
  const campaignId = parseInt(req.params.id)
  const donors = donationHistory
    .filter(d => d.campaignId === campaignId)
    .reduce((acc, d) => {
      const existing = acc.find(x => x.email === d.email)
      if (existing) {
        existing.total += d.amount
        existing.count++
      } else {
        acc.push({ name: d.name, email: d.email, total: d.amount, count: 1 })
      }
      return acc
    }, [])
    .sort((a, b) => b.total - a.total)
  
  res.json(donors)
})

// Get trending campaigns (MUST BE BEFORE /api/campaigns/:id)
app.get('/api/campaigns/trending', (req, res) => {
  const trending = campaigns
    .map(c => ({
      ...c,
      score: (c.raised / 1000) + (c.donorCount * 5) + ((campaignViews[c.id] || 0) * 2)
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
  res.json(trending)
})

// Get success stories (MUST BE BEFORE /api/campaigns/:id)
app.get('/api/success-stories', (req, res) => {
  const successful = campaigns
    .filter(c => c.raised >= c.goal)
    .sort((a, b) => b.raised - a.raised)
  res.json(successful)
})

app.get('/api/campaigns', (req, res) => {
  const { category, search } = req.query
  let filtered = [...campaigns]
  
  if (category && category !== 'all') {
    filtered = filtered.filter(c => c.category === category)
  }
  
  if (search) {
    const s = search.toLowerCase()
    filtered = filtered.filter(c => 
      c.title.toLowerCase().includes(s) || c.description.toLowerCase().includes(s)
    )
  }
  
  res.json(filtered)
})

app.get('/api/campaigns/:id', (req, res) => {
  const campaign = campaigns.find(c => c.id === parseInt(req.params.id))
  if (campaign) {
    res.json(campaign)
  } else {
    res.status(404).json({ error: 'Not found' })
  }
})

app.post('/api/campaigns', async (req, res) => {
  const newCampaign = {
    id: campaigns.length + 1,
    ...req.body,
    raised: 0,
    donorCount: 0,
    daysLeft: 60,
    createdAt: new Date().toISOString()
  }
  campaigns.push(newCampaign)
  
  if (req.body.creator && req.body.creator.email) {
    sendCampaignCreatedEmail(
      req.body.creator.email,
      req.body.creator.name,
      req.body.title,
      newCampaign.id
    ).catch(e => console.log('Email skip'))
  }
  
  res.json(newCampaign)
})

app.get('/api/funds', (req, res) => {
  res.json(funds)
})

app.get('/api/stats', (req, res) => {
  res.json({ totalDonated: funds.totalFund, ...funds })
})

app.get('/api/history', (req, res) => {
  res.json(donationHistory.slice(-10).reverse())
})

app.get('/api/goals', (req, res) => {
  res.json({
    goals,
    progress: {
      education: Math.min((funds.educationFund / goals.education) * 100, 100),
      food: Math.min((funds.foodFund / goals.food) * 100, 100),
      medical: Math.min((funds.medicalFund / goals.medical) * 100, 100)
    }
  })
})

app.get('/api/leaderboard', (req, res) => {
  const topDonors = donationHistory
    .reduce((acc, d) => {
      const existing = acc.find(x => x.email === d.email)
      if (existing) {
        existing.total += d.amount
        existing.count++
      } else {
        acc.push({ name: d.name, email: d.email, total: d.amount, count: 1 })
      }
      return acc
    }, [])
    .sort((a, b) => b.total - a.total)
    .slice(0, 10)
  
  res.json(topDonors)
})

app.get('/api/user-stats/:email', (req, res) => {
  const userDonations = donationHistory.filter(d => d.email === req.params.email)
  const total = userDonations.reduce((sum, d) => sum + d.amount, 0)
  res.json({ totalDonated: total, donationCount: userDonations.length, donations: userDonations })
})

// Campaign Updates & Comments
app.post('/api/campaigns/:id/updates', (req, res) => {
  const { title, message, authorEmail } = req.body
  const campaignId = parseInt(req.params.id)
  
  const update = {
    id: Date.now(),
    campaignId,
    title,
    message,
    authorEmail,
    timestamp: new Date().toISOString()
  }
  
  campaignUpdates.push(update)
  res.json({ success: true, update })
})

// Get campaign updates
app.get('/api/campaigns/:id/updates', (req, res) => {
  const campaignId = parseInt(req.params.id)
  const updates = campaignUpdates
    .filter(u => u.campaignId === campaignId)
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
  res.json(updates)
})

// Post comment
app.post('/api/campaigns/:id/comments', (req, res) => {
  const { name, email, message } = req.body
  const campaignId = parseInt(req.params.id)
  
  const comment = {
    id: Date.now(),
    campaignId,
    name,
    email,
    message,
    timestamp: new Date().toISOString()
  }
  
  campaignComments.push(comment)
  res.json({ success: true, comment })
})

// Get comments
app.get('/api/campaigns/:id/comments', (req, res) => {
  const campaignId = parseInt(req.params.id)
  const comments = campaignComments
    .filter(c => c.campaignId === campaignId)
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
  res.json(comments)
})

// Favorites
app.post('/api/favorites', (req, res) => {
  const { userEmail, campaignId } = req.body
  
  const existing = favorites.find(f => f.userEmail === userEmail && f.campaignId === campaignId)
  if (existing) {
    return res.json({ success: true, message: 'Already favorited' })
  }
  
  favorites.push({ userEmail, campaignId, timestamp: new Date().toISOString() })
  res.json({ success: true })
})

// Remove from favorites
app.delete('/api/favorites', (req, res) => {
  const { userEmail, campaignId } = req.body
  favorites = favorites.filter(f => !(f.userEmail === userEmail && f.campaignId === campaignId))
  res.json({ success: true })
})

// Get user favorites
app.get('/api/favorites/:email', (req, res) => {
  const userFavorites = favorites
    .filter(f => f.userEmail === req.params.email)
    .map(f => campaigns.find(c => c.id === f.campaignId))
    .filter(c => c !== undefined)
  res.json(userFavorites)
})

// Check if favorited
app.get('/api/favorites/:email/:campaignId', (req, res) => {
  const isFavorited = favorites.some(f => 
    f.userEmail === req.params.email && f.campaignId === parseInt(req.params.campaignId)
  )
  res.json({ isFavorited })
})

// Track campaign view
app.post('/api/campaigns/:id/view', (req, res) => {
  const campaignId = parseInt(req.params.id)
  if (!campaignViews[campaignId]) {
    campaignViews[campaignId] = 0
  }
  campaignViews[campaignId]++
  res.json({ views: campaignViews[campaignId] })
})

// Get campaign views
app.get('/api/campaigns/:id/views', (req, res) => {
  const campaignId = parseInt(req.params.id)
  res.json({ views: campaignViews[campaignId] || 0 })
})

// Get recent donations (live feed)
app.get('/api/recent-donations', (req, res) => {
  const recent = donationHistory
    .slice(-5)
    .reverse()
    .map(d => ({
      name: d.name,
      amount: d.amount,
      campaign: d.campaignTitle || 'General Fund',
      timestamp: d.timestamp
    }))
  res.json(recent)
})

// Get campaign analytics
app.get('/api/campaigns/:id/analytics', (req, res) => {
  const campaignId = parseInt(req.params.id)
  const campaign = campaigns.find(c => c.id === campaignId)
  
  if (!campaign) {
    return res.status(404).json({ error: 'Not found' })
  }
  
  const campaignDonations = donationHistory.filter(d => d.campaignId === campaignId)
  const totalRaised = campaignDonations.reduce((sum, d) => sum + d.amount, 0)
  const avgDonation = totalRaised / (campaignDonations.length || 1)
  
  res.json({
    views: campaignViews[campaignId] || 0,
    donations: campaignDonations.length,
    totalRaised,
    avgDonation: avgDonation.toFixed(2),
    conversionRate: ((campaignDonations.length / (campaignViews[campaignId] || 1)) * 100).toFixed(2)
  })
})

// Get all users (Admin only)
app.get('/api/admin/users', (req, res) => {
  res.json(users)
})

// Delete campaign (Admin only)
app.delete('/api/campaigns/:id', (req, res) => {
  const id = parseInt(req.params.id)
  campaigns = campaigns.filter(c => c.id !== id)
  res.json({ success: true })
})

// Get campaign donors
app.get('/api/campaigns/:id/donors', (req, res) => {
  const campaignId = parseInt(req.params.id)
  const donors = donationHistory
    .filter(d => d.campaignId === campaignId)
    .reduce((acc, d) => {
      const existing = acc.find(x => x.email === d.email)
      if (existing) {
        existing.total += d.amount
        existing.count++
      } else {
        acc.push({ name: d.name, email: d.email, total: d.amount, count: 1 })
      }
      return acc
    }, [])
    .sort((a, b) => b.total - a.total)
  
  res.json(donors)
})

const PORT = 5000
app.listen(PORT, () => {
  console.log('🚀 Server: http://localhost:' + PORT)
  console.log('📧 Email:', EMAIL_ENABLED ? 'Enabled ✅' : 'Disabled ⚠️')
})
