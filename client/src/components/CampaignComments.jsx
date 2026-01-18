import { useState, useEffect } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'

export default function CampaignComments({ campaignId }) {
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState({ name: '', email: '', message: '' })

  useEffect(() => {
    loadComments()
  }, [campaignId])

  const loadComments = () => {
    axios.get(`/api/campaigns/${campaignId}/comments`)
      .then(res => setComments(res.data))
      .catch(err => console.error(err))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      await axios.post(`/api/campaigns/${campaignId}/comments`, newComment)
      toast.success('Comment posted!')
      setNewComment({ name: '', email: '', message: '' })
      loadComments()
    } catch (err) {
      toast.error('Failed to post comment')
    }
  }

  return (
    <div className="card">
      <h3 className="text-2xl font-bold mb-6">Comments ({comments.length})</h3>

      <form onSubmit={handleSubmit} className="mb-6 space-y-3">
        <input
          type="text"
          placeholder="Your Name"
          value={newComment.name}
          onChange={(e) => setNewComment({...newComment, name: e.target.value})}
          className="input-field"
          required
        />
        <input
          type="email"
          placeholder="Your Email"
          value={newComment.email}
          onChange={(e) => setNewComment({...newComment, email: e.target.value})}
          className="input-field"
          required
        />
        <textarea
          placeholder="Share your thoughts..."
          value={newComment.message}
          onChange={(e) => setNewComment({...newComment, message: e.target.value})}
          className="input-field min-h-[80px]"
          required
        />
        <button type="submit" className="btn-primary">
          Post Comment
        </button>
      </form>

      <div className="space-y-4">
        {comments.map(comment => (
          <div key={comment.id} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-charity-primary/20 rounded-full flex items-center justify-center font-bold">
                {comment.name.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1">
                <p className="font-semibold">{comment.name}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{comment.message}</p>
                <p className="text-xs text-gray-500 mt-2">
                  {new Date(comment.timestamp).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
