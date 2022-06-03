import { useEffect, useMemo } from 'react'
import { useQuery } from 'react-query'
import { useRecoilState } from 'recoil'
import { useInView } from 'react-intersection-observer'

import { currentSearchPageState, responseSearchBookList } from 'states/state'
import { getItemSearchApi } from 'services/getItemSearchApi'
import { Item } from 'types'

import BookCard from 'components/BookCardVer2/BookCard'

import styles from './searchResult.module.scss'

interface SearchResultProps {
  finalInputText: string
}
const SearchResult = ({ finalInputText }: SearchResultProps) => {
  const [pageNumber, setPageNumer] = useRecoilState(currentSearchPageState)
  const [responseBookList, setResponseBookList] = useRecoilState(responseSearchBookList)

  const [Liref, inView] = useInView()

  const { data, isLoading, isError } = useQuery<Item[]>(
    ['getItemSearchApi', finalInputText, pageNumber],
    () => getItemSearchApi({ Query: finalInputText, start: pageNumber }),
    {
      enabled: !!pageNumber && !!finalInputText,
      refetchOnWindowFocus: true,
      retry: 2,
      staleTime: 5 * 60 * 1000,
      onSuccess: (res: Item[]) => {
        setResponseBookList((prev) => {
          return prev.concat(res)
        })
      },
    }
  )

  useEffect(() => {
    if (inView && !isLoading) {
      setPageNumer((prev) => prev + 1)
    }
  }, [data, inView, isLoading, pageNumber, setPageNumer])

  const loadingComponent = useMemo(() => {
    return isLoading ? <li className={styles.loading}>loading....</li> : null
  }, [isLoading])

  const errorComponent = useMemo(() => {
    return isError ? <li>Error...</li> : null
  }, [isError])

  return (
    <div className={styles.container}>
      <ul>
        {responseBookList.map((book) => (
          <li key={book.itemId}>
            <BookCard book={book} />
          </li>
        ))}
        {errorComponent}
        {loadingComponent}
        {data && data.length > 0 ? (
          <li className={styles.loading} ref={Liref} />
        ) : (
          <li className={styles.endPoint}>검색 결과가 더 이상 없습니다.</li>
        )}
      </ul>
    </div>
  )
}
export default SearchResult
