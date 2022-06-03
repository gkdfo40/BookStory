import { useEffect, useMemo } from 'react'
import { useQuery } from 'react-query'
import { useRecoilState, useRecoilValue } from 'recoil'
import { useInView } from 'react-intersection-observer'

import { currentSearchPageState, responseSearchBookList, searchInputValueState } from 'states/state'
import { getItemSearchApi } from 'services/getItemSearchApi'
import { Item } from 'types'

import BookCard from 'components/BookCardVer2/BookCard'

import styles from './searchResult.module.scss'

const SearchResult = () => {
  const inputText = useRecoilValue(searchInputValueState)
  const [pageNumber, setPageNumer] = useRecoilState(currentSearchPageState)
  const [responseBookList, setResponseBookList] = useRecoilState(responseSearchBookList)

  const [Liref, inView] = useInView()

  const { data, isLoading, isError } = useQuery<Item[]>(
    ['getItemSearchApi', inputText, pageNumber],
    () => getItemSearchApi({ Query: inputText, start: pageNumber }),
    {
      enabled: !!pageNumber,
      onSuccess: (res: Item[]) => {
        setResponseBookList((prev) => {
          return prev.concat(res)
        })
      },
    }
  )
  const loadingComponent = useMemo(() => {
    return isLoading ? <li>loading....</li> : null
  }, [isLoading])

  const errorComponent = useMemo(() => {
    return isError ? <li>Error...</li> : null
  }, [isError])
  // const loadNextPage = async () => {
  //   await getItemSearchApi({ Query: inputText, start: pageNumber }).then((res) => {
  //     setResponseBookList((prev) => {
  //       return prev.concat(res)
  //     })
  //     setPageNumer((prev) => prev + 1)
  //   })
  // }
  useEffect(() => {
    if (inView && !isLoading) setPageNumer((prev) => prev + 1)
  }, [inView, isLoading, setPageNumer])

  return (
    <div className={styles.container}>
      <ul>
        {responseBookList.map((book) => (
          <li key={book.itemId}>
            <BookCard book={book} />
          </li>
        ))}
        {loadingComponent}
        {errorComponent}
        {data ? (
          <li className={styles.loading} ref={Liref}>
            loading...
          </li>
        ) : (
          <li className={styles.endPoint}>검색 결과가 더 이상 없습니다.</li>
        )}
      </ul>
    </div>
  )
}
export default SearchResult
