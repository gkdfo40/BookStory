# 개인프로젝트

### 기간: 2022/06/03~ 2022/06/05

```
├─assets
│  └─svgs
│      └─category
├─components
│  ├─BookCard
│  ├─BookCardModal
│  └─BookCardVer2
├─hooks
│  ├─state
│  └─worker
├─routes
│  ├─BookMarkPage
│  ├─GNB
│  ├─HomePage
│  │  └─CategoryItem
│  ├─ProfilePage
│  └─SearchPage
│      └─SearchResult
├─services
├─states
├─styles
│  ├─base
│  ├─constants
│  └─mixins
├─types
└─utils
```

> 주제

알라딘 api를 사용하여 Category별 베스트셀러 추천과 도서 북마크를 통한 취향을 차트로 표현하여 사용자의 취향분석 합니다.

## HOME
각 카테고리에서 베스트 셀러 10개를 추천합니다.

![HOME](https://user-images.githubusercontent.com/57490711/172034130-4c514583-d5ac-48b8-bbb7-9a4fd98b1438.PNG)


## BOOKCARD
책을 클릭하면 해당 도서의 상세정보를 볼 수 있고 `Link To Buy`를 클릭하면 해당 도서를 살 수 있는 링크로 연결합니다.

![BookCardModal](https://user-images.githubusercontent.com/57490711/172034145-906f9a8f-bf93-4b6c-9163-7e10e0a5339c.PNG)


## BOOKMARK
북마크한 도서를 로컬에 저장하여 다음에 접속했을 때 로컬에 저장된 도서 목록을 가져옵니다.
 Edit 버튼을 클릭해 Dropdown 버튼에서 clear All을 통해 북마크 목록을 초기화 할 수 있습니다.
 
![BookMark](https://user-images.githubusercontent.com/57490711/172034154-02cc92e1-e224-4fba-8086-7a23ee7a72f7.PNG)


## SEARCH
입력한 검색어와 관련된 도서 정보를 가져옵니다.
스크롤을 통해 다음 정보를 가져옵니다.

![Search](https://user-images.githubusercontent.com/57490711/172034158-b670d5b8-aca3-4d01-a5f6-d5c11f19379b.PNG)


## PROFILE
사용자가 북마크한 도서를 통해 카테고리를 분리하여 사용자가 가장 선호하는 취향을 그래프로 표현합니다.

![Profile](https://user-images.githubusercontent.com/57490711/172034163-1c56a6c7-8bfd-42a9-a071-56c414daa141.PNG)

## Dependency
`react-query`

'axios`

`@egjs/react-flicking`

`recoil`

`react-router-dom`

`react-intersection-observer`

`victory'
## 개발 스택
REACT
Typescript
SCSS
