import useReveal from '../hooks/useReveal'

export default function Reveal({ children, className = '', threshold }) {
  const ref = useReveal(threshold)

  return (
    <div ref={ref} className={`reveal ${className}`.trim()}>
      {children}
    </div>
  )
}
