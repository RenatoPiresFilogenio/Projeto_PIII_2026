import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function IconBadge({ icon, className = '', label }) {
  const badgeClassName = ['feature-card__icon', 'feature-card__icon--fa', className]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={badgeClassName} aria-hidden={label ? undefined : 'true'} aria-label={label}>
      <FontAwesomeIcon icon={icon} />
    </div>
  )
}
