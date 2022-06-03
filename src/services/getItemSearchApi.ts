import axios from 'axios'
import { Item, ResBookListData } from 'types'

const API_URL = '/ItemSearch.aspx'

interface IParams {
  Query: string
  start: number
}

export const getItemSearchApi = async (params: IParams) => {
  try {
    const res = await axios.get<ResBookListData>(API_URL, {
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
