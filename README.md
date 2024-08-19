## 프로젝트 링크
https://map-editor-tkp12345s-projects.vercel.app/

## 실행
  ```
  $ npm install
  $ npm run dev
  ```

## 프로젝트 구조
```
src
│   ├── assets           # 정적파일 관리 폴더
│   ├── components       # 도메인별 UI 폴더
│   ├── container        # API 호출 기능 및 컨테이너 컴포넌트들이 위치한 폴더
│   ├── hooks            # 커스텀 훅들이 위치한 폴더
│   ├── page             # 페이지 단위 컴포넌트들이 위치한 폴더
│   ├── routes           # 라우트 설정 파일들이 위치한 폴더
│   ├── store            # store 관련 폴더 (zustand)
│   ├── types            # 타입 정의 파일들이 위치한 폴더
│   ├── ui               # ui 관련 로직 (emotion)
│   ├── utils            # 유틸리티 함수들이 위치한 폴더
│   ├── App.tsx          # 애플리케이션의 루트 컴포넌트
```

## 구현에로 사항 
    캔버스를 이소메트릭 격자 모양으로 구현하고 그위에 선택한 sprite 를 그리는 과정에 에로 사항이 있었습니다. <Br/>
    - 캔버스 요소에 맞게 sprite 를 채우는 로직 구현 필요 