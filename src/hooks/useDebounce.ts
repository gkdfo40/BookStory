import { useState, useEffect } from 'react'
// import { useSetRecoilState } from 'recoil'
// import { searchInputValueState } from 'states/state'

// import { activeIndexState } from '../recoil/search'

const useDebounce = <T>(value: T, delay: number = 500) => {
  // const setActiveItemIndex = useSetRecoilState(searchInputValueState)
  const [debounceValue, setDebounceValue] = useState<T>(value)

  useEffect(() => {
    const timer: NodeJS.Timeout = setTimeout(() => {
      setDebounceValue(value)
      // setActiveItemIndex(-1)
    }, delay)

    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])

  return debounceValue
}

export default useDebounce
