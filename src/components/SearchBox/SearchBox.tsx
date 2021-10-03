import SRText from 'components/SRText'

import { ReactComponent as SearchIcon } from 'assets/icons/search.svg'

import style from './search-box.module.css'

type SearchBoxProps = {
  initialValue?: string
  label: string
  searchFn: (text: string) => void
}

type changehandler = (event: React.ChangeEvent<HTMLInputElement>) => void

export function SearchBox({
  initialValue = '',
  label,
  searchFn,
}: SearchBoxProps) {
  const onChange: changehandler = (event) => {
    searchFn(event.target.value)
  }

  return (
    <div className={style.searchContainer}>
      <label htmlFor="search" className={style.label}>
        <SearchIcon
          className={style.searchIcon}
          focusable="false"
          aria-hidden="true"
        />
        <SRText>{label}</SRText>
      </label>
      <input
        type="text"
        inputMode="search"
        defaultValue={initialValue}
        id="search"
        onChange={onChange}
        className={style.searchInput}
        placeholder={label}
      />
    </div>
  )
}
