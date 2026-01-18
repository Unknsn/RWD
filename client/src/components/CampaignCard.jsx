import { Link } from 'react-router-dom'

export default function CampaignCard({ campaign }) {
  const progressPercent = Math.min((campaign.raised / campaign.goal) * 100, 100)

  return (
    <Link 
      to={`/campaign/${campaign.id}`} 
      className="block card hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer overflow-hidden p-0"
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={campaign.image} 
          alt={campaign.title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
          loading="lazy"
        />
        <div className="absolute top-4 right-4 bg-charity-accent text-white px-3 py-1 rounded-full text-sm font-semibold capitalize">
          {campaign.category}
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 line-clamp-2 hover:text-charity-primary transition">
          {campaign.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
          {campaign.description}
        </p>
        
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="font-bold text-charity-primary">
              ₹{campaign.raised.toLocaleString()}
            </span>
            <span className="text-gray-600 dark:text-gray-400">
              of ₹{campaign.goal.toLocaleString()}
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
            <div 
              className="bg-charity-accent h-2 rounded-full transition-all duration-500" 
              style={{width: `${progressPercent}%`}}
            ></div>
          </div>
        </div>
        
        <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center space-x-4">
            <span>👥 {campaign.donorCount} donors</span>
            <span>⏰ {campaign.daysLeft} days</span>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t dark:border-gray-700">
          <p className="text-xs text-gray-500 dark:text-gray-500">
            By {campaign.creator.name} • {campaign.creator.location}
          </p>
        </div>
      </div>
    </Link>
  )
}
