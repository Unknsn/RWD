import { useState, useEffect } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'

export default function CampaignUpdates({ campaignId, isOwner }) {
  const [updates, setUpdates] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [newUpdate, setNewUpdate] = useState({ title: '', message: '' })

  useEffect(() => {
    loadUpdates()
  }, [campaignId])

  const loadUpdates = () => {
    axios.get(`/api/campaigns/${campaignId}/updates`)
      .then(res => setUpdates(res.data))
      .catch(err => console.error(err))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    
    try {
      await axios.post(`/api/campaigns/${campaignId}/updates`, {
        ...newUpdate,
        authorEmail: user.email
      })
      toast.success('Update posted!')
      setNewUpdate({ title: '', message: '' })
      setShowForm(false)
      loadUpdates()
    } catch (err) {
      toast.error('Failed to post update')
    }
  }

  return (
    <div className="card">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold">Campaign Updates</h3>
        {isOwner && (
          <button 
            onClick={() => setShowForm(!showForm)}
            className="btn-primary"
          >
            {showForm ? 'Cancel' : '+ Post Update'}
          </button>
        )}
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <input
            type="text"
            placeholder="Update Title"
            value={newUpdate.title}
            onChange={(e) => setNewUpdate({...newUpdate, title: e.target.value})}
            className="input-field mb-3"
            required
          />
          <textarea
            placeholder="Share your progress..."
            value={newUpdate.message}
            onChange={(e) => setNewUpdate({...newUpdate, message: e.target.value})}
            className="input-field min-h-[100px] mb-3"
            required
          />
          <button type="submit" className="btn-primary">
            Post Update
          </button>
        </form>
      )}

      <div className="space-y-4">
        {updates.length > 0 ? (
          updates.map(update => (
            <div key={update.id} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h4 className="font-bold text-lg mb-2">{update.title}</h4>
              <p className="text-gray-600 dark:text-gray-400 mb-2">{update.message}</p>
              <p className="text-xs text-gray-500">
                {new Date(update.timestamp).toLocaleDateString()}
              </p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 py-8">No updates yet</p>
        )}
      </div>
    </div>
  )
}
