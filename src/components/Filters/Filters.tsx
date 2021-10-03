import { SearchBox } from 'components/SearchBox'
import { MouseEvent, useState } from 'react'

import style from './filters.module.css'

type FilterProps = {
  initialValue?: string
  searchFn: (text: string) => void
  filters: Specialties[]
  filterFn: (specialties: Specialties[]) => void
}

export type Specialties =
  | 'plumbing'
  | 'carpentry'
  | 'masonry'
  | 'roofing'
  | 'fittings'

const specialties: Specialties[] = [
  'plumbing',
  'carpentry',
  'masonry',
  'roofing',
  'fittings',
]

export function Filters({
  initialValue,
  searchFn,
  filters,
  filterFn,
}: FilterProps) {
  const onClick = (event: MouseEvent<HTMLInputElement>): void => {
    const value = (event.target as HTMLInputElement).value as Specialties
    const index = filters.findIndex((filter) => filter === value)
    if (index === -1) {
      const newFilters = [...filters, value]
      filterFn(newFilters)
    } else {
      const newFilters = [
        ...filters.slice(0, index),
        ...filters.slice(index + 1),
      ]
      filterFn(newFilters)
    }
  }
  return (
    <div className={style.root}>
      <div className={style.searchContainer}>
        <SearchBox
          label="Search companies"
          initialValue={initialValue}
          searchFn={searchFn}
        />
      </div>
      <div className={style.filters}>
        {specialties.map((specialty) => (
          <label className={style.filter}>
            <input
              type="checkbox"
              checked={filters.includes(specialty)}
              value={specialty}
              onClick={onClick}
            />
            {specialty}
          </label>
        ))}
      </div>
    </div>
  )
}
