import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-charity-primary mb-4">404</h1>
        <h2 className="text-4xl font-bold mb-4">Page Not Found</h2>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex justify-center space-x-4">
          <Link to="/" className="btn-primary">
            Back to Home
          </Link>
          <Link to="/campaigns" className="px-8 py-3 border-2 border-charity-primary text-charity-primary font-semibold rounded-lg hover:bg-charity-primary hover:text-white transition">
            Browse Campaigns
          </Link>
        </div>
      </div>
    </div>
  )
}
