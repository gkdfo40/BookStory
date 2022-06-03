import ReactDOM from 'react-dom'
import { useRecoilState, useRecoilValue } from 'recoil'
import cx from 'classnames'

import { BackIcon, BookMarkIcon, MenuIcon, StarIcon } from 'assets/svgs'
import { modaBookProps, modalOpenState, storedBookMarklist } from 'states/state'

import styles from './bookCardModal.module.scss'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const BookCardModal = () => {
  const book = useRecoilValue(modaBookProps)
  const [isModalOpen, setModalOpen] = useRecoilState(modalOpenState)
  const [BookMarkList, setBookMarkList] = useRecoilState(storedBookMarklist)
  const [isMarked, setMarkState] = useState(() => {
    const flag = BookMarkList.find((data) => data.itemId === book.itemId)
    if (flag) return true
    return false
  })
  const onClickCloseModal = () => {
    setModalOpen(false)
  }
  const onClickBookMark = () => {
    const findBook = BookMarkList.find((data) => data.itemId === book.itemId)
    if (!findBook) {
      setBookMarkList((prev) => {
        return [book, ...prev]
      })
      setMarkState(true)
    }
    if (findBook) {
      const newBookMarkList = BookMarkList.filter((data) => data.itemId !== findBook.itemId)
      setBookMarkList(newBookMarkList)
      setMarkState(false)
    }
  }

  const el = document.getElementById('modal')
  const modal = (
    <main className={styles.container}>
      <header>
        <BackIcon onClick={onClickCloseModal} />
        <h1>{book.title}</h1>
        <MenuIcon />
      </header>
      <figure>
        <img src={book.cover} alt='cover' />
        <p>Author: {book.author}</p>
        {book.pubDate}
        <figcaption>
          <span className={styles.customerReviewRank}>
            <StarIcon />
            {book.customerReviewRank}/10
          </span>
          <span>{book.subInfo?.itemPage}page</span>
          <span>{book.priceStandard.toLocaleString('kr')} &#8361;</span>
        </figcaption>
      </figure>
      <article>
        <h1>Descriptioin</h1>
        <p>{book.description}</p>
      </article>
      <section>
        <button type='button' className={cx(styles.bookMarkIcon, { isAcive: isMarked })} onClick={onClickBookMark}>
          <BookMarkIcon />
        </button>
        <Link to={`${book.link.replace('http://', '//')}`}>Link To Buy</Link>
      </section>
    </main>
  )

  return isModalOpen ? ReactDOM.createPortal(modal, el as Element) : null
}
export default BookCardModal