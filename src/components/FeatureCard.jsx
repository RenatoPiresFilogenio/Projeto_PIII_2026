import IconBadge from './IconBadge'

export default function FeatureCard({ icon, title, description }) {
  return (
    <article className="feature-card feature-card--primary">
      <IconBadge icon={icon} />
      <div className="feature-card__content">
        <h3 className="feature-card__title">{title}</h3>
        <p className="feature-card__text">{description}</p>
      </div>
    </article>
  )
}
