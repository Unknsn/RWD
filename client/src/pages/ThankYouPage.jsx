import { useLocation, Link } from 'react-router-dom'
import { generatePDFReceipt } from '../utils/pdfGenerator'

export default function ThankYouPage() {
  const location = useLocation()
  const donation = location.state?.donation

  if (!donation) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <p className="text-xl mb-4">No donation data found</p>
          <Link to="/" className="btn-primary">
            Back to Home
          </Link>
        </div>
      </div>
    )
  }

  // Calculate breakdown with proper rounding
  const educationShare = Math.round((donation.amount / 3) * 100) / 100
  const foodShare = Math.round((donation.amount / 3) * 100) / 100
  const medicalShare = Math.round((donation.amount / 3) * 100) / 100

  const handleDownloadPDF = () => {
    generatePDFReceipt(donation)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-charity-accent/10 to-charity-primary/10 dark:from-charity-accent/20 dark:to-charity-primary/20 p-4">
      <div className="max-w-2xl w-full">
        <div className="card text-center">
          <div className="text-6xl mb-6">🙏</div>
          <h1 className="text-4xl font-bold mb-4">Thank You!</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            Your generosity makes a real difference in people's lives.
          </p>

          {/* Donation Receipt */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 mb-8">
            <h3 className="text-2xl font-bold mb-6">Donation Receipt</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-lg">
                <span className="text-gray-600 dark:text-gray-400">Amount:</span>
                <span className="font-bold text-2xl text-charity-primary">
                  ₹{donation.amount.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Cause:</span>
                <span className="font-bold capitalize">
                  {donation.cause || donation.campaign || 'General Fund'}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-500">
                <span>Transaction ID:</span>
                <span className="font-mono">{donation.id}</span>
              </div>
            </div>
          </div>

          {/* Fund Breakdown */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-6">Your Impact Breakdown</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border-2 border-blue-200 dark:border-blue-800">
                <div className="text-3xl mb-2">📚</div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Education</p>
                <p className="text-2xl font-bold text-blue-600">
                  ₹{educationShare.toLocaleString()}
                </p>
              </div>
              <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-6 border-2 border-orange-200 dark:border-orange-800">
                <div className="text-3xl mb-2">🍚</div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Food</p>
                <p className="text-2xl font-bold text-orange-600">
                  ₹{foodShare.toLocaleString()}
                </p>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6 border-2 border-green-200 dark:border-green-800">
                <div className="text-3xl mb-2">🏥</div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Medical</p>
                <p className="text-2xl font-bold text-green-600">
                  ₹{medicalShare.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          {/* Impact Message */}
          <div className="bg-gradient-to-r from-charity-primary/10 to-charity-accent/10 dark:from-charity-primary/20 dark:to-charity-accent/20 rounded-lg p-6 mb-8">
            <p className="text-lg">
              <strong>Your ₹{donation.amount} donation</strong> is making a real impact:
            </p>
            <ul className="mt-4 space-y-2 text-left max-w-lg mx-auto">
              <li>✓ Providing education to {Math.floor(donation.amount / 100)} students</li>
              <li>✓ Feeding {Math.floor(donation.amount / 50)} families</li>
              <li>✓ Supporting medical care for {Math.floor(donation.amount / 150)} people</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={handleDownloadPDF} className="btn-primary">
              📄 Download PDF Receipt
            </button>
            <Link to="/" className="btn-primary">
              Back to Home
            </Link>
            <Link
              to="/campaigns"
              className="px-8 py-3 border-2 border-charity-primary text-charity-primary font-semibold rounded-lg hover:bg-charity-primary hover:text-white transition"
            >
              Browse More Campaigns
            </Link>
          </div>

          {/* Email Notice */}
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-8">
            📧 A receipt has been sent to your email address
          </p>
        </div>
      </div>
    </div>
  )
}
