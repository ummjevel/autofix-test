# autofix-test

GitHub App 자동 수정 테스트용 리포입니다.

## 파일 구조

```
src/
├── components/
│   ├── LoginButton.tsx    ← 3-9 오타 테스트 ("로그읜")
│   ├── Dashboard.tsx      ← 3-C 기존 기능 오해 (CSV 내보내기 존재)
│   └── ThemeToggle.tsx    ← 3-B 다크모드 미구현
├── lib/
│   └── auth.ts            ← 3-A 500 에러 + 3-10 보안 코드 차단
├── pages/
│   └── LoginPage.tsx      ← 로그인 페이지
└── utils/
    └── format.ts          ← 일반 유틸리티
```

## 테스트 시나리오별 이슈

| 시나리오 | 이슈 제목 | 관련 파일 | 기대 결과 |
|---------|----------|----------|----------|
| A. 버그 | 로그인 버튼 클릭 시 500 에러 | auth.ts:33 | 🔴 error, FP ≤ 2, auto-fix 가능 |
| B. 기능 요청 | 다크모드 지원 추가 요청 | ThemeToggle.tsx | 🟢 new_feature, auto-fix 불가 |
| C. 기존 기능 | 데이터 내보내기 기능 없음 | Dashboard.tsx | 🔵 original_feature, 안내 메시지 |
| 3-9. PR 성공 | 오타: "로그읜" → "로그인" | LoginButton.tsx | PR 자동 생성 |
| 3-10. PR 거부 | 인증 토큰 만료 시간 | auth.ts | 보안 코드 → PR 생성 안 함 |

## 의도적으로 심어둔 버그/이슈

1. **auth.ts:33** — `user`가 null일 때 `user.id` 접근 → TypeError
2. **LoginButton.tsx** — "로그읜" 오타 3곳
3. **ThemeToggle.tsx** — 다크모드 미구현 (라이트만)
4. **Dashboard.tsx** — CSV 내보내기 버튼이 존재하지만 사용자가 못 찾을 수 있음
5. **auth.ts:4** — JWT 만료 시간 24h (보안 이슈)
