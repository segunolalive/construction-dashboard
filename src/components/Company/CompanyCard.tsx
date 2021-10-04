import style from './company-card.module.css'

export type CompanyProps = {
  id: number
  name: string
  specialties: string[]
}

export function CompanyCard({ id, name, specialties }: CompanyProps) {
  return (
    <article className={style.card}>
      <img src="https://via.placeholder.com/150/" alt="" />
      <div className={style.info}>
        <p className={style.name}>{name}</p>
        {specialties.length > 0 && (
          <div>
            <p>Specialties:</p>
            <em>{specialties.join(', ')}</em>
          </div>
        )}
      </div>
    </article>
  )
}
