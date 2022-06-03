export interface SeriesInfo {
  seriesId: number
  seriesLink: string
  seriesName: string
}
export interface SubInfo {
  subTitle: string
  originalTitle: string
  itemPage: number
}
export interface Item {
  title: string
  link: string
  author: string
  pubDate: string
  description: string
  creator: string
  isbn: string
  isbn13: string
  itemId: number
  priceSales: number
  priceStandard: number
  stockStatus: string
  mileage: number
  cover: string
  categoryId: number
  categoryName: string
  publisher: string
  customerReviewRank: number
  seriesInfo?: SeriesInfo
  subInfo?: SubInfo
}

export interface ResBookListData {
  data: any
  version: string
  title: string
  link: string
  pubDate: string
  imageUrl: string
  totalResults: number
  startIndex: number
  itemsPerPage: number
  query: string
  searchCategoryId: number
  searchCategoryName: string
  item: Item[]
}
