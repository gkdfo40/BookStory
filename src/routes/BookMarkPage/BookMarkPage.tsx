import { EditIcon, SetIcon } from 'assets/svgs'
import useOnClickOutside from 'hooks/useOnClickOutside'
import { useCallback, useMemo, useRef, useState } from 'react'
import { useRecoilState } from 'recoil'
import BookCard from 'components/BookCard/BookCard'
import { storedBookMarklist } from 'states/state'
import styles from './bookMarkPage.module.scss'

const BookMarkPage = () => {
  const [BookMarkList, setBookMarkList] = useRecoilState(storedBookMarklist)
  const [isDropDownOpen, setDropDown] = useState<boolean>(false)
  const dropDownRef = useRef<HTMLElement>(null)

  const onClickSetting = () => {
    setDropDown((prev) => !prev)
  }
  const onClickClearAll = useCallback(() => {
    setBookMarkList([])
    setDropDown(false)
  }, [setBookMarkList])

  useOnClickOutside(dropDownRef, () => setDropDown(false))

  const dropDownComponent = useMemo(() => {
    return isDropDownOpen ? (
      <div className={styles.setMenu}>
        <button type='button' onClick={onClickClearAll}>
          Clear All
        </button>
      </div>
    ) : null
  }, [isDropDownOpen, onClickClearAll])

  return (
    <div className={styles.container}>
      <header ref={dropDownRef}>
        <button type='button' onClick={onClickSetting}>
          <EditIcon />
        </button>
        {dropDownComponent}
      </header>

      <main>
        <ul className={styles.bookCase}>
          {BookMarkList.map((book) => (
            <li key={book.itemId} className={styles.item}>
              <BookCard book={book} />
            </li>
          ))}
        </ul>
      </main>
    </div>
  )
}
export default BookMarkPage
