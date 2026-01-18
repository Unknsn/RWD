import { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import Navbar from '../components/Navbar'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    toast.success('Message sent! We\'ll get back to you soon.')
    setFormData({ name: '', email: '', subject: '', message: '' })
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <Toaster position="top-right" />
      
      <div className="pt-20 pb-12">
        <div className="max-w-5xl mx-auto px-4">
          
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4">Contact Us</h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Have questions? We'd love to hear from you.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            
            {/* Contact Form */}
            <div className="card">
              <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="input-field"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="input-field"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Subject</label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    className="input-field"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Message</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="input-field min-h-[150px]"
                    required
                  />
                </div>
                <button type="submit" className="btn-primary w-full">
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <div className="card">
                <h3 className="text-xl font-bold mb-4">Get in Touch</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="text-2xl">📧</div>
                    <div>
                      <p className="font-semibold">Email Support</p>
                      <p className="text-gray-600 dark:text-gray-400">support@gofund.org</p>
                      <p className="text-sm text-gray-500">Response within 24 hours</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="text-2xl">📱</div>
                    <div>
                      <p className="font-semibold">Helpline (Toll-Free)</p>
                      <p className="text-gray-600 dark:text-gray-400">1800-XXX-XXXX</p>
                      <p className="text-sm text-gray-500">Mon-Sat: 9 AM - 6 PM IST</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="text-2xl">📍</div>
                    <div>
                      <p className="font-semibold">Registered Office</p>
                      <p className="text-gray-600 dark:text-gray-400">Go Fund Foundation<br/>123 Charity Street<br/>New Delhi - 110001, India</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card">
                <h3 className="text-xl font-bold mb-4">Frequently Asked</h3>
                <div className="space-y-3">
                  <details className="group">
                    <summary className="font-semibold cursor-pointer list-none">
                      How do I start a fundraising campaign?
                    </summary>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                      Click "Start Campaign" in the navigation menu. Fill in campaign details, upload supporting documents, and submit for review. Our team verifies within 24-48 hours and your campaign goes live.
                    </p>
                  </details>
                  <details className="group">
                    <summary className="font-semibold cursor-pointer list-none">
                      Are donations tax-deductible under 80G?
                    </summary>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                      Yes! Go Fund is registered under Section 80G. All donations qualify for 50% tax exemption. You'll receive a digital receipt immediately after donation for tax filing purposes.
                    </p>
                  </details>
                  <details className="group">
                    <summary className="font-semibold cursor-pointer list-none">
                      What payment methods do you accept?
                    </summary>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                      We accept all major credit/debit cards, UPI, Net Banking, and digital wallets. All transactions are 100% secure and encrypted.
                    </p>
                  </details>
                  <details className="group">
                    <summary className="font-semibold cursor-pointer list-none">
                      How is my donation used?
                    </summary>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                      95% of your donation goes directly to the beneficiary. 5% covers platform costs, payment gateway fees, and verification expenses. You get real-time updates on fund utilization.
                    </p>
                  </details>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  )
}
