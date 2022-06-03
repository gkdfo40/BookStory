import { useRecoilValue } from 'recoil'
import { useQuery } from 'react-query'

import { getBestSellerApi } from 'services/getBestSellerApi'
import { homePageCategoryState } from 'states/state'

import CategoryItem from './CategoryItem/CategoryItem'
import BookCard from '../../components/BookCard/BookCard'

import styles from './homePage.module.scss'
import { useMemo } from 'react'

const CATEGORYLIST = [
  'action',
  'adventure',
  'autobiography',
  'comedy',
  'drama',
  'dystopia',
  'horror',
  'mystery',
  'romance',
  'scifi',
  'thriller',
]
const HomePage = () => {
  const currentCategoryState = useRecoilValue(homePageCategoryState)

  const { data, isLoading, isError } = useQuery(
    ['bestSeller', currentCategoryState],
    () => getBestSellerApi({ CategoryId: currentCategoryState }),
    {
      refetchOnWindowFocus: true,
      retry: 2,
      staleTime: 5 * 60 * 1000,
    }
  )
  const loadingComponent = useMemo(() => {
    return isLoading ? <div className={styles.isLoading}>loading....</div> : null
  }, [isLoading])

  const errorComponent = useMemo(() => {
    return isError ? <div className={styles.isError}>error</div> : null
  }, [isError])

  return (
    <div className={styles.homeApp}>
      <main>
        <h1>Hellow!</h1>
        <p>Which book suits your</p>
        <p>current mood?</p>
      </main>
      <section className={styles.category}>
        <ul className={styles.categoryList}>
          {CATEGORYLIST.map((category) => (
            <li key={category} className={styles.item}>
              <CategoryItem categoryNM={category} />
            </li>
          ))}
        </ul>
      </section>
      <section className={styles.bestSeller}>
        {loadingComponent}
        {errorComponent}
        <ul className={styles.topTen}>
          {data?.map((book) => (
            <li key={book.itemId} className={styles.item}>
              <BookCard book={book} />
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
export default HomePage
