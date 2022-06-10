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

카테고리 아이콘 버튼을 클릭하면 10개의 베스트 셀러를 가져옵니다.
카테고리별로 API를 다르게 호출하며 useQuery를 사용하여 해당 카테고리를 호출한 적이 있다면 로컬 캐시에서 결과를 가져와 API의 반복적인 호출을 제한합니다.


카테고리와 도서목록을 정렬하기 위해  `overflow-x:auto` 스타일을 주어 스크롤이 가능하게 하였는데 모바일에서만 가능하고 pc에서는 사용할 수 없는 문제가 있어 
[egjs-flicking](https://github.com/naver/egjs-flicking) 라이브러리를 사용하여 pc와 모바일 양쪽에서 x축 방향을 스크롤이 가능하도록 구현하였습니다. 

![HOME](https://user-images.githubusercontent.com/57490711/172034130-4c514583-d5ac-48b8-bbb7-9a4fd98b1438.PNG)


## BOOKCARD
Home 탭과 Search탭에서 찾은 도서를 클릭하면 Modal창을 오픈합니다.
Modal창은 createPortal을 사용하여 구현하였고 클릭한 도서의 정보를 BookCardModal에 props로 넘겨주어 오픈한 모달창을 통해 해당 도서의 상세정보를 볼 수 있습니다.

+ 왼쪽 상단에는 뒤로가기 아이콘을 통해 Modal창을 닫습니다. 

+ 오른쪽 하단의 `Link To Buy`를 클릭하면 해당 도서를 살 수 있는 링크로 연결합니다.

+ 왼쪽 하단의 북마크 아이콘 버튼을 클릭하면 bookMarkList에 해당 도서 item type의 객체가 저장됩니다.
  bookMarkList을 조회하여 현재 선택된 도서가 bookMarkList안에 있다면 북마크 아이콘은 저장되었음을 표시합니다.

+ 다시 한번 클릭하여 bookMarkList에서 해당 도서 정보를 지워 취소되었음을 표시합니다.


![BookCardModal](https://user-images.githubusercontent.com/57490711/172034145-906f9a8f-bf93-4b6c-9163-7e10e0a5339c.PNG)


## BOOKMARK
bookMarkList에 추가한 도서를 로컬에 저장하여 다음에 접속했을 때 로컬에 저장된 도서 목록을 가져와 북마크 된 도서목록을 확인이 가능합니다.

bookMarkList에 저장된 값은 배열 내의 값이 변경되면 변경된 값을 localStorage에 저장하고 가져옵니다. 이를 구현하기위해 Recoil의 AtomEffect를 사용하여 localStorage와 bookMarkList를 연결합니다.

Edit 버튼을 클릭해 Dropdown 메뉴에서 clear All을 통해 북마크 목록을 초기화 할 수 있습니다.
 
![BookMark](https://user-images.githubusercontent.com/57490711/172034154-02cc92e1-e224-4fba-8086-7a23ee7a72f7.PNG)


## SEARCH

### 추천 검색어
검색창에 텍스트를 입력하면 api를 호출하여 입력 결과와 매치되는 추천 검색어 DropDown으로 표시하도록 구현하였습니다.

텍스트를 입력할 때마다 추천 검색어를 가져오면 api 호출을 낭비하게 되어 
Debounce를 구현하여 입력이 완료되었을 때 추천 검색어를 가져오도록 구현하였습니다.

만약 검색어가 검색한 기록이 있다면 api호출을 하지 않고 로컬 캐시에서 가져오도록 useQuery를 적용하였습니다.

검색어를 입력하지 않는다면 DropDown을 표시하지 않고 검색어 입력이 완료되면 표시되도록 하였습니다. 

### infinity scroll
스크롤을 통해 다음 정보를 가져옵니다.
검색결과의 마지막에 요소에 observer를 사용하여 해당 요소가 화면에 보이게 되면 현재 검색어의 다음페이지 결과를 호출하여 가져와 현재 검색 결과 뒤에 추가합니다.
만약 해당 호출의 결과의 길이가 0이라면 더 이상 검색결과에 대한 호출을 하지 않습니다.

![Search](https://user-images.githubusercontent.com/57490711/172034158-b670d5b8-aca3-4d01-a5f6-d5c11f19379b.PNG)


## PROFILE
사용자가 북마크한 도서를 통해 카테고리를 분리하여 사용자가 가장 선호하는 취향을 그래프로 표현합니다.
그래프는 VictoryChart 라이브러리의 VictoryPie를 사용하였고 추가한 북마크 개수와 북마크된 도서들의 카테고리별로 분리합니다.

### 카테고리 분류
각 도서마다 카테고리 최대 3개의 depth를 가집니다. 그리고 해당 도서는 Item type에 정의된 
categoryName을 가집니다. 이 모든 카테고리를 분류하기에는 양이 많고 제각각이기 때문에 
북마크에 추가한 도서를 카테고리별로 분류하기 위해서는 **Dictionary**를 사용합니다.

categoryName은 `>`문자로 depth를 구분합니다. categoryName.split('>')를 사용해 categoryName을 분리하고 2 depth를 기준으로 카테고리를 구분합니다.
```javascript
BookMarkList.forEach((book) => {
    const key = book.categoryName.split('>')[2]
    if (key in dictObj) dictObj[key] += 1
    else dictObj[key] = 1
  })
```
이렇게 하면 bookMarkList에 추가되거나 삭제될 때마다 bookMarkList를 계산하여 dictObj 객체를 생성하고 VictoryPie 차트는 dictObj를 data로 사용하여 그래프를 생성합니다.

![Profile](https://user-images.githubusercontent.com/57490711/172034163-1c56a6c7-8bfd-42a9-a071-56c414daa141.PNG)

## Dependency
`react-query`

`axios`

`@egjs/react-flicking`

`recoil`

`react-router-dom`

`react-intersection-observer`

`victory'
## 개발 스택
REACT
Typescript
SCSS
