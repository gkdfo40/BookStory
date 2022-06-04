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
  return (
    <button type='button' className={styles.itemBox} onClick={onClickBookCard}>
      <img src={book.cover} alt='cover' />
      <dl>
        <dt>TITLE</dt>
        <dd>{book.title}</dd>

        <dt>AUTHOR</dt>
        <dd>{book.author}</dd>

        <dt>PRICE</dt>
        <dd>{book.priceStandard.toLocaleString('kr')}&#8361;</dd>
      </dl>
    </button>
  )
}
export default BookCard
