import { ChangeEvent, FormEvent, MouseEvent, useEffect, useMemo, useRef, useState } from 'react'
import { useRecoilState } from 'recoil'

import { SearchIcon } from 'assets/svgs'
import { getItemSearchApi } from 'services/getItemSearchApi'
import { currentSearchPageState, responseSearchBookList, searchInputValueState } from 'states/state'
import useSearchBookData from 'hooks/useSearchBookData'
import useOnClickOutside from 'hooks/useOnClickOutside'

import SearchResult from './SearchResult/SearchResult'

import styles from './searchPage.module.scss'

const SearchPage = () => {
  const [inputText, setInputText] = useRecoilState(searchInputValueState)
  const [, setResponseBookList] = useRecoilState(responseSearchBookList)
  const [, setPageNumber] = useRecoilState(currentSearchPageState)
  const { data } = useSearchBookData()

  const recommendRef = useRef<HTMLDivElement>(null)
  const [isInputWord, setIsInput] = useState(true)
  const [openRecommend, setRecommend] = useState(false)
  const [finalInputText, setFinalInputText] = useState<string>('')

  const onChangeInputText = (e: ChangeEvent<HTMLInputElement>) => {
    const text = e.currentTarget.value
    setInputText(text)
  }

  const onSubmitInputText = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (inputText.length) {
      setFinalInputText(inputText)
      getItemSearchApi({ Query: inputText, start: 1 }).then((res) => {
        setResponseBookList(res)
        setPageNumber(2)
      })
      setRecommend(false)
      setIsInput(true)
    }
  }

  const onClickInputText = () => {
    if (!openRecommend) setRecommend(true)
  }

  useEffect(() => {
    if (inputText.length === 0) {
      setResponseBookList([])
      setIsInput(false)
    }
  }, [inputText, setResponseBookList])

  useOnClickOutside(recommendRef, () => setRecommend(false))

  const recommendComponent = useMemo(() => {
    const onClickRecommendItem = (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault()
      const text = event.currentTarget.dataset.title as string
      setResponseBookList(() => [])
      setInputText(() => text)
      setFinalInputText(() => inputText)
      getItemSearchApi({ Query: inputText, start: 1 }).then((res) => {
        setResponseBookList(res)
        setPageNumber(2)
      })
      setRecommend(false)
      setIsInput(true)
    }
    return data && openRecommend ? (
      <div ref={recommendRef} className={styles.dropDown}>
        <ul className={styles.searchItem}>
          {data.map((book) => (
            <li key={book.itemId}>
              <button type='button' data-title={book.title} onClick={onClickRecommendItem}>
                {book.title}
              </button>
            </li>
          ))}
        </ul>
      </div>
    ) : null
  }, [data, inputText, openRecommend, setInputText, setPageNumber, setResponseBookList])

  return (
    <div className={styles.wrapper}>
      <div className={styles.inputContainer}>
        <form className={styles.inputBox} onSubmit={onSubmitInputText}>
          <SearchIcon className={styles.inputIcon} />
          <input
            type='search'
            value={inputText}
            placeholder='Search titles, topics or authors'
            onChange={onChangeInputText}
            onClick={onClickInputText}
          />
          {recommendComponent}
        </form>
      </div>
      {!!inputText.length && isInputWord && <SearchResult finalInputText={finalInputText} />}
    </div>
  )
}

export default SearchPage
