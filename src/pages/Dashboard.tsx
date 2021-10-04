import { useState } from 'react'
import { useAbortableFetch, REQUEST_STATUSES } from 'hooks'
import Layout from 'components/Layout'
import { Filters, Specialties } from 'components/Filters'
import { CompaniesList, CompanyProps } from 'components/Company'

const serverUrl = process.env.REACT_APP_SERVER_URL || ''

export default function Dashboard() {
  const [searchText, setSearchText] = useState('')
  const [specialties, setSpecialties] = useState<Specialties[]>([])
  const searchFilters = specialties.join(',')

  const url = searchText
    ? `${serverUrl}/companies?search=${searchText}&specialties=${searchFilters}`
    : ''

  const { status, data: companies = [] } =
    useAbortableFetch<CompanyProps[]>(url)

  return (
    <Layout>
      <Filters
        initialValue={searchText}
        searchFn={setSearchText}
        filters={specialties}
        filterFn={setSpecialties}
      />
      {status === REQUEST_STATUSES.LOADING ? <div>... Loading ...</div> : null}
      {status === REQUEST_STATUSES.ERROR ? (
        <div>Oops! There was an Error. Try refreshing the page</div>
      ) : null}

      {status === REQUEST_STATUSES.SUCCESS && companies?.length === 0 ? (
        <div>No Records Matched Your Search</div>
      ) : null}
      {companies && <CompaniesList companies={companies} />}
    </Layout>
  )
}
