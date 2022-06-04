import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'

import { SearchIcon } from 'assets/svgs'
import { getItemSearchApi } from 'services/getItemSearchApi'
import { currentSearchPageState, responseSearchBookList, searchInputValueState } from 'states/state'

import styles from './searchPage.module.scss'
import SearchResult from './SearchResult/SearchResult'

const SearchPage = () => {
  const [inputText, setInputText] = useRecoilState(searchInputValueState)
  const [, setResponseBookList] = useRecoilState(responseSearchBookList)
  const [, setPageNumber] = useRecoilState(currentSearchPageState)
  const [isInputWord, setIsInput] = useState(true)
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

      setIsInput(true)
    }
  }
  useEffect(() => {
    if (inputText.length === 0) {
      setResponseBookList([])
      setIsInput(false)
    }
  }, [inputText, setResponseBookList])

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
          />
        </form>
      </div>
      {!!inputText.length && isInputWord && <SearchResult finalInputText={finalInputText} />}
      {/* {!isInputWord && <div>오늘의 추천도서 구역</div>} */}
    </div>
  )
}

export default SearchPage
