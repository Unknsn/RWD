import toast from 'react-hot-toast'

export default function ShareButtons({ campaign }) {
  const url = window.location.href
  const text = `Help support: ${campaign.title}`

  const handleShare = (platform) => {
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
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
        break
      case 'copy':
        navigator.clipboard.writeText(url)
        toast.success('Link copied!')
        return
    }
    
    window.open(shareUrl, '_blank', 'width=600,height=400')
  }

  return (
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
          onClick={() => handleShare('linkedin')}
          className="flex items-center justify-center space-x-2 py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition"
        >
          <span>💼</span>
          <span>LinkedIn</span>
        </button>
        <button 
          onClick={() => handleShare('copy')}
          className="col-span-2 flex items-center justify-center space-x-2 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
        >
          <span>🔗</span>
          <span>Copy Link</span>
        </button>
      </div>
    </div>
  )
}
