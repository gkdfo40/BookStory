import axios from 'axios'
import { Item, ResBookListData } from 'types'


const PROXY = window.location.hostname === 'localhost' ? '' : '/proxy'

interface IParams {
  Query: string
  start: number
}

export const getItemSearchApi = async (params: IParams) => {
  try {
    const res = await axios.get<ResBookListData>(`${PROXY}/ItemSearch.aspx`, {
      params: {
        ttbkey: process.env.REACT_APP_API_KEY_ALTER,
        QeuryType: `Title`,
        MaxResult: 10,
        SearchTarget: `Book`,
        Cover: 'MidBig',
        Version: 20131101,
        output: `JS`,
        ...params,
      },
    })

    const { item } = res.data
    if (!item) {
      const empty: Item[] = []
      return empty
    }
    return item
  } catch (error) {
    throw new Error((error as Error).message)
  }
}
