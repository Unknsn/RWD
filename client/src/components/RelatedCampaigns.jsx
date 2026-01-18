import { useEffect, useState } from 'react'
import axios from 'axios'
import CampaignCard from './CampaignCard'

export default function RelatedCampaigns({ currentCampaign }) {
  const [related, setRelated] = useState([])

  useEffect(() => {
    axios.get(`/api/campaigns?category=${currentCampaign.category}`)
      .then(res => {
        const filtered = res.data
          .filter(c => c.id !== currentCampaign.id)
          .slice(0, 3)
        setRelated(filtered)
      })
  }, [currentCampaign])

  if (related.length === 0) return null

  return (
    <div className="mt-12">
      <h2 className="text-3xl font-bold mb-6">Related Campaigns</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {related.map(campaign => (
          <CampaignCard key={campaign.id} campaign={campaign} />
        ))}
      </div>
    </div>
  )
}
