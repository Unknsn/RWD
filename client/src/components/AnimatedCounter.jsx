import { useEffect, useState } from 'react'
import CountUp from 'react-countup'

export default function AnimatedCounter({ value, prefix = '₹', duration = 2 }) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.5 }
    )

    const element = document.getElementById('counter-trigger')
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  return (
    <div id="counter-trigger">
      {isVisible && (
        <CountUp
          start={0}
          end={value}
          duration={duration}
          separator=","
          prefix={prefix}
        />
      )}
    </div>
  )
}
