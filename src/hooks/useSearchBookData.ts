import { useQuery } from 'react-query'
import { useRecoilState } from 'recoil'
import { getItemSearchApi } from 'services/getItemSearchApi'
import { searchInputValueState } from 'states/state'
import useDebounce from './useDebounce'

export default function useSearchBookData() {
  const [inputText] = useRecoilState(searchInputValueState)
  const debounceInputValue = useDebounce(inputText, 1000)

  const { data, isLoading, error } = useQuery(
    ['quickSearch', debounceInputValue],
    () => getItemSearchApi({ Query: debounceInputValue, start: 1 }),
    {
      enabled: !!debounceInputValue,
      refetchOnWindowFocus: false,
      retry: false,
    }
  )
  return { data, isLoading, error }
}
