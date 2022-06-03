import { useSetRecoilState } from 'recoil'

import { modaBookProps, modalOpenState } from 'states/state'
import { Item } from 'types'

import styles from './bookCard.module.scss'

interface BookCardProps {
  book: Item
}

const BookCard = ({ book }: BookCardProps) => {
  const setModalState = useSetRecoilState(modalOpenState)
  const setModaBookProps = useSetRecoilState(modaBookProps)
  const onClickBookCard = () => {
    setModaBookProps(book)
    setModalState(true)
  }
  const { title } = book
  const { author } = book
  return (
    <figure className={styles.bookCard}>
      <button type='button' onClick={onClickBookCard}>
        <img src={book.cover} alt='cover img' />
        <p className={styles.title}>{title}</p>
        <p className={styles.author}>{author}</p>
      </button>
    </figure>
  )
}
export default BookCard
