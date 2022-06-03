import axios from 'axios'
import { ResBookListData } from 'types'

const API_URL = '/ItemSearch.aspx'

export async function getItemNewSpecialApi() {
  try {
    const res = await axios.get<ResBookListData>(API_URL, {
      params: {
        ttbkey: process.env.REACT_APP_API_KEY,
        QueryType: 'ItemNewSpecial ',
        SearchTarget: 'Book',
        MaxResults: 10,
        Cover: 'MidBig',
        Output: 'js',
        Version: 20070901,
        Sort: 'Title ',
      },
    })
    const { item } = res.data
    return item
  } catch (error) {
    throw new Error((error as Error).message)
  }
}
