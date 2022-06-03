import axios from 'axios'
import { ResBookListData } from 'types'

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

    const result = res.data.item
    return result
  } catch (error) {
    throw new Error((error as Error).message)
  }
}
