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

## BOOKCARD
책을 클릭하면 해당 도서의 상세정보를 볼 수 있고 `Link To Buy`를 클릭하면 해당 도서를 살 수 있는 링크로 연결합니다.

## BOOKMARK
북마크한 도서를 로컬에 저장하여 다음에 접속했을 때 로컬에 저장된 도서 목록을 가져옵니다.
 Edit 버튼을 클릭해 Dropdown 버튼에서 clear All을 통해 북마크 목록을 초기화 할 수 있습니다.

## SEARCH
입력한 검색어와 관련된 도서 정보를 가져옵니다.
스크롤을 통해 다음 정보를 가져옵니다.

## PROFILE
사용자가 북마크한 도서를 통해 카테고리를 분리하여 사용자가 가장 선호하는 취향을 그래프로 표현합니다.
