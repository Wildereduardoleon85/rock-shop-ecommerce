import { AiOutlineSearch } from 'react-icons/ai'
import styles from './Search.module.scss'
import { Button } from '../UI'

function Search() {
  return (
    <div className={styles.root}>
      <input type='text' />
      <Button className={styles.searchButton} type='button'>
        <AiOutlineSearch className={styles.searchIcon} />
        SEARCH
      </Button>
    </div>
  )
}

export default Search
