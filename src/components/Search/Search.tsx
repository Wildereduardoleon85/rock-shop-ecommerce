import { AiOutlineSearch } from 'react-icons/ai'
import styles from './Search.module.scss'

function Search() {
  return (
    <div className={styles.root}>
      <input type='text' />
      <button className={styles.searchButton} type='button'>
        <AiOutlineSearch className={styles.searchIcon} />
        SEARCH
      </button>
    </div>
  )
}

export default Search
