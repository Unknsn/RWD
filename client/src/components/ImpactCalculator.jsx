import { useState } from 'react'

export default function ImpactCalculator() {
  const [amount, setAmount] = useState(500)

  const impact = {
    meals: Math.floor(amount / 50),
    books: Math.floor(amount / 100),
    medicines: Math.floor(amount / 150)
  }

  return (
    <div className="card">
      <h3 className="text-2xl font-bold mb-6">Impact Calculator</h3>
      
      <input
        type="range"
        min="100"
        max="5000"
        step="100"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        className="w-full mb-6"
      />
      
      <div className="text-center mb-6">
        <p className="text-4xl font-bold text-charity-primary">₹{amount}</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="text-center p-4 bg-charity-primary/10 rounded-lg">
          <p className="text-3xl font-bold text-charity-primary">{impact.meals}</p>
          <p className="text-sm text-gray-600">Meals</p>
        </div>
        <div className="text-center p-4 bg-charity-secondary/10 rounded-lg">
          <p className="text-3xl font-bold text-charity-secondary">{impact.books}</p>
          <p className="text-sm text-gray-600">Books</p>
        </div>
        <div className="text-center p-4 bg-charity-accent/10 rounded-lg">
          <p className="text-3xl font-bold text-charity-accent">{impact.medicines}</p>
          <p className="text-sm text-gray-600">Medicines</p>
        </div>
      </div>
    </div>
  )
}
