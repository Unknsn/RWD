export default function CampaignTags({ campaign }) {
  const getTags = () => {
    const tags = []
    
    // Progress tags
    const progress = (campaign.raised / campaign.goal) * 100
    if (progress >= 75) tags.push({ text: 'Almost There!', color: 'bg-green-100 text-green-800' })
    else if (progress >= 50) tags.push({ text: 'Halfway!', color: 'bg-blue-100 text-blue-800' })
    else if (progress >= 25) tags.push({ text: 'Gaining Momentum', color: 'bg-yellow-100 text-yellow-800' })
    
    // Urgency tags
    if (campaign.daysLeft <= 7) tags.push({ text: 'Urgent!', color: 'bg-red-100 text-red-800' })
    else if (campaign.daysLeft <= 15) tags.push({ text: 'Ending Soon', color: 'bg-orange-100 text-orange-800' })
    
    // Popularity tags
    if (campaign.donorCount > 100) tags.push({ text: 'Popular', color: 'bg-purple-100 text-purple-800' })
    if (campaign.raised > 50000) tags.push({ text: 'High Impact', color: 'bg-indigo-100 text-indigo-800' })
    
    return tags
  }

  const tags = getTags()

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag, i) => (
        <span key={i} className={`px-3 py-1 rounded-full text-xs font-semibold ${tag.color}`}>
          {tag.text}
        </span>
      ))}
    </div>
  )
}
