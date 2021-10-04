import { CompanyCard, CompanyProps } from './CompanyCard'
import style from './companies-list.module.css'

type CompaniesProps = {
  companies: CompanyProps[]
}

export function CompaniesList({ companies }: CompaniesProps) {
  return (
    <div className={style.root}>
      {companies.map((company) => (
        <CompanyCard {...company} key={company.id} />
      ))}
    </div>
  )
}
