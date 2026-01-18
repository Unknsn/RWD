import { useEffect, useState } from 'react'

export default function MilestoneAlert({ raised, goal }) {
  const [showMilestone, setShowMilestone] = useState(false)
  const [milestone, setMilestone] = useState(0)

  useEffect(() => {
    const percentage = (raised / goal) * 100
    
    if (percentage >= 25 && percentage < 50) setMilestone(25)
    else if (percentage >= 50 && percentage < 75) setMilestone(50)
    else if (percentage >= 75 && percentage < 100) setMilestone(75)
    else if (percentage >= 100) setMilestone(100)
    
    if (milestone > 0) {
      setShowMilestone(true)
      setTimeout(() => setShowMilestone(false), 5000)
    }
  }, [raised, goal])

  if (!showMilestone) return null

  return (
    <div className="fixed top-20 right-8 z-50 animate-bounce">
      <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-2xl shadow-2xl">
        <div className="text-6xl mb-2 text-center">🎉</div>
        <h3 className="text-2xl font-bold mb-2 text-center">{milestone}% Reached!</h3>
        <p className="text-center">Amazing progress! Keep going!</p>
      </div>
    </div>
  )
}
