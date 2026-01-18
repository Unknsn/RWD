export default function DonorBadge({ totalDonated }) {
  const getBadge = () => {
    if (totalDonated >= 10000) return { name: 'Diamond Donor', icon: '💎', color: 'from-cyan-400 to-blue-600' }
    if (totalDonated >= 5000) return { name: 'Gold Donor', icon: '🥇', color: 'from-yellow-400 to-orange-500' }
    if (totalDonated >= 2000) return { name: 'Silver Donor', icon: '🥈', color: 'from-gray-300 to-gray-500' }
    if (totalDonated >= 500) return { name: 'Bronze Donor', icon: '🥉', color: 'from-orange-300 to-orange-600' }
    return { name: 'Supporter', icon: '❤️', color: 'from-pink-400 to-red-500' }
  }

  const badge = getBadge()

  return (
    <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-gradient-to-r ${badge.color} text-white font-bold shadow-lg`}>
      <span className="text-2xl">{badge.icon}</span>
      <span>{badge.name}</span>
    </div>
  )
}
