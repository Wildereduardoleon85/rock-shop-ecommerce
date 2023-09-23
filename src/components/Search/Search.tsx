import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AiOutlineSearch } from 'react-icons/ai'
import styles from './Search.module.scss'
import { Button } from '../UI'
import { ROUTES } from '../../constants'

type SearchProps = {
  className?: string
}

function Search({ className = '' }: SearchProps) {
  const [searchValue, setSearchValue] = useState<string>('')
  const navigate = useNavigate()

  const onSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }

  const onSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    navigate(`${ROUTES.search}?keywords=${searchValue}`)
    setSearchValue('')
  }

  return (
    <form className={className} onSubmit={onSearchSubmit}>
      <div className={styles.root}>
        <input value={searchValue} onChange={onSearchInputChange} type='text' />
        <Button className={styles.searchButton} type='submit'>
          <AiOutlineSearch className={styles.searchIcon} />
          <span className={styles.text}>SEARCH</span>
        </Button>
      </div>
    </form>
  )
}

export default Search
