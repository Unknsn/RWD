import { Link } from 'react-router-dom'

export default function DonationTypePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-charity-primary/5 to-charity-secondary/5 dark:from-charity-primary/10 dark:to-charity-secondary/10">
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-8">
        
        <Link to="/login" className="card hover:shadow-2xl transition transform hover:scale-105 cursor-pointer">
          <div className="text-center space-y-6 py-12">
            <div className="text-6xl">👤</div>
            <h2 className="text-3xl font-bold">Member Donation</h2>
            <p className="text-gray-600">
              Login to track your impact and view donation history
            </p>
            <button className="btn-primary">Login</button>
          </div>
        </Link>

        <Link to="/payment" className="card hover:shadow-2xl transition transform hover:scale-105 cursor-pointer">
          <div className="text-center space-y-6 py-12">
            <div className="text-6xl">❤️</div>
            <h2 className="text-3xl font-bold">Guest Donation</h2>
            <p className="text-gray-600">
              Make a quick one-time donation without login
            </p>
            <button className="btn-primary">Donate Now</button>
          </div>
        </Link>

      </div>
    </div>
  )
}
