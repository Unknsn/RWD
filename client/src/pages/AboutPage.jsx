import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <div className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4">
          
          {/* Hero */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-4">About Go Fund</h1>
            <p className="text-2xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              The world's #1 platform for making a difference, one donation at a time.
            </p>
          </div>

          {/* Mission */}
          <div className="card mb-12">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
                  Go Fund bridges the gap between those who need help and those who want to help. We believe in the power of collective giving to create lasting social impact across India.
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  Every day, millions of Indians struggle with basic needs - education, healthcare, food security. Our platform empowers individuals and organizations to create verified fundraising campaigns that directly reach donors who care. With complete transparency and real-time tracking, we ensure every rupee makes maximum impact.
                </p>
              </div>
              <div className="rounded-2xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800" 
                  alt="Our mission"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <div className="card text-center bg-gradient-to-br from-blue-500 to-blue-600 text-white">
              <p className="text-5xl font-bold mb-2">₹1.2Cr+</p>
              <p className="text-lg">Funds Raised</p>
            </div>
            <div className="card text-center bg-gradient-to-br from-green-500 to-green-600 text-white">
              <p className="text-5xl font-bold mb-2">2,500+</p>
              <p className="text-lg">Active Donors</p>
            </div>
            <div className="card text-center bg-gradient-to-br from-purple-500 to-purple-600 text-white">
              <p className="text-5xl font-bold mb-2">450+</p>
              <p className="text-lg">Campaigns Funded</p>
            </div>
            <div className="card text-center bg-gradient-to-br from-orange-500 to-orange-600 text-white">
              <p className="text-5xl font-bold mb-2">15,000+</p>
              <p className="text-lg">Lives Impacted</p>
            </div>
          </div>

          {/* Values */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-center mb-8">What Drives Us</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="card text-center">
                <div className="text-5xl mb-4">🤝</div>
                <h3 className="text-xl font-bold mb-2">100% Transparency</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Every donation is tracked. Donors receive real-time updates on exactly how their money is being used, building trust through complete transparency.
                </p>
              </div>
              <div className="card text-center">
                <div className="text-5xl mb-4">✅</div>
                <h3 className="text-xl font-bold mb-2">Verified Campaigns</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  All campaigns undergo rigorous verification. We validate documents, beneficiaries, and fund usage to ensure authenticity and prevent fraud.
                </p>
              </div>
              <div className="card text-center">
                <div className="text-5xl mb-4">❤️</div>
                <h3 className="text-xl font-bold mb-2">Direct Impact</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Your donations reach beneficiaries directly. We work with verified NGOs and hospitals to ensure maximum impact with minimal overhead costs.
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="card text-center bg-gradient-to-br from-charity-primary to-charity-secondary text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Make a Difference?</h2>
            <p className="text-xl mb-8">
              Join thousands of donors creating real impact every day.
            </p>
            <div className="flex justify-center space-x-4">
              <Link to="/campaigns" className="bg-white text-charity-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
                Browse Campaigns
              </Link>
              <Link to="/signup" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-charity-primary transition">
                Sign Up Free
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
