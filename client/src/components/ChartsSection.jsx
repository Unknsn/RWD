import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { useTheme } from '../context/ThemeContext'

export default function ChartsSection({ funds, history }) {
  const { darkMode } = useTheme()

  // Pie chart data
  const pieData = [
    { name: 'Education', value: funds.educationFund, color: '#4F46E5' },
    { name: 'Food', value: funds.foodFund, color: '#EC4899' },
    { name: 'Medical', value: funds.medicalFund, color: '#10B981' }
  ]

  // Bar chart data
  const barData = [
    { name: 'Education', amount: funds.educationFund },
    { name: 'Food', amount: funds.foodFund },
    { name: 'Medical', amount: funds.medicalFund }
  ]

  // Line chart data (last 7 donations)
  const lineData = history.slice(-7).map((donation, index) => ({
    donation: index + 1,
    amount: donation.amount
  }))

  const chartColors = {
    text: darkMode ? '#E5E7EB' : '#374151',
    grid: darkMode ? '#374151' : '#E5E7EB'
  }

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">📊 Impact Analytics</h2>

        <div className="grid md:grid-cols-2 gap-8">
          
          {/* Pie Chart */}
          <div className="card">
            <h3 className="text-xl font-bold mb-4">Fund Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Bar Chart */}
          <div className="card">
            <h3 className="text-xl font-bold mb-4">Cause Comparison</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />
                <XAxis dataKey="name" stroke={chartColors.text} />
                <YAxis stroke={chartColors.text} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: darkMode ? '#1F2937' : '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    color: chartColors.text
                  }}
                />
                <Bar dataKey="amount" fill="#4F46E5" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Line Chart */}
          <div className="card md:col-span-2">
            <h3 className="text-xl font-bold mb-4">Recent Donation Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={lineData}>
                <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />
                <XAxis dataKey="donation" stroke={chartColors.text} />
                <YAxis stroke={chartColors.text} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: darkMode ? '#1F2937' : '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    color: chartColors.text
                  }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="amount" 
                  stroke="#10B981" 
                  strokeWidth={3}
                  dot={{ fill: '#10B981', r: 5 }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

        </div>
      </div>
    </section>
  )
}
