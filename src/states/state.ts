import { atom, AtomEffect } from 'recoil'
import { Item } from 'types'

const localStorageEffect: <T>(key: string) => AtomEffect<T> =
  (key: string) =>
  ({ setSelf, onSet }) => {
    const savedValue = localStorage.getItem(key)
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue))
    }
    onSet((newValue, _, isReset) => {
      isReset ? localStorage.removeItem(key) : localStorage.setItem(key, JSON.stringify(newValue))
    })
  }

export const searchInputValueState = atom<string>({
  key: '#searchInputValueState',
  default: '',
})

export const currentSearchPageState = atom<number>({
  key: '#currentSearchPageState',
  default: 1,
})

export const responseSearchBookList = atom<Item[]>({
  key: '#responseSearchBookList',
  default: [],
})

export const storedBookMarklist = atom<Item[]>({
  key: '#storedBookMarklist',
  default: [],
  effects_UNSTABLE: [localStorageEffect<Item[]>('mkbooklst&localStge')],
})

export const homePageCategoryState = atom<string>({
  key: '#homePageCategoryState',
  default: 'action',
})

export const modalOpenState = atom<boolean>({
  key: '#modalOpenState',
  default: false,
})

export const modaBookProps = atom<Item>({
  key: '#modaBookProps',
  default: {
    title: '',
    link: '',
    author: '',
    pubDate: '',
    description: '',
    creator: '',
    isbn: '',
    isbn13: '',
    itemId: 0,
    priceSales: 0,
    priceStandard: 0,
    stockStatus: '',
    mileage: 0,
    cover: '',
    categoryId: 0,
    categoryName: '',
    publisher: '',
    customerReviewRank: 0,
  },
})
