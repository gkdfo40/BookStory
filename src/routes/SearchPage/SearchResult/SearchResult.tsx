import BookCard from 'components/BookCardVer2/BookCard'
import { useRecoilState } from 'recoil'

import { currentSearchPageState, responseSearchBookList } from 'states/state'

import styles from './searchResult.module.scss'

const SearchResult = () => {
  const [pageNumber, setPageNumer] = useRecoilState(currentSearchPageState)
  const [responseBookList] = useRecoilState(responseSearchBookList)
  const loadNextPage = () => {}
  return (
    <div className={styles.container}>
      <ul>
        {responseBookList.map((book) => (
          <li key={book.itemId}>
            <BookCard book={book} />
          </li>
        ))}
      </ul>
    </div>
  )
}
export default SearchResult
