import axios from 'axios'
import { Item, ResBookListData } from 'types'


const PROXY = window.location.hostname === 'localhost' ? '' : '/proxy'

interface Params {
  CategoryId: string
}
export async function getBestSellerApi(params: Params) {
  try {
    const convertCategoryID =
      {
        action: 3724,
        adventure: 104784,
        autobiography: 28268,
        comedy: 97612,
        drama: 57832,
        dystopia: 104770,
        horror: 56552,
        mystery: 50926,
        romance: 103706,
        scifi: 105302,
        selfhelp: 90854,
        thriller: 6545,
      }[params.CategoryId] ?? 152907

    const res = await axios.get<ResBookListData>(`${PROXY}/ItemList.aspx`, {
      params: {
        ttbkey: process.env.REACT_APP_API_KEY,
        QueryType: 'Bestseller',
        CategoryId: convertCategoryID,
        MaxResults: 10,
        Cover: 'MidBig',
        Output: 'JS',
        Version: 20131101,
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
