import React, { useState, useEffect } from 'react'

// 시나리오 B: 현재 라이트 모드만 지원
// 다크모드 기능은 아직 미구현

type Theme = 'light'

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('light')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  return (
    <div className="theme-toggle">
      <span>테마: 라이트 모드</span>
      {/* 다크모드 토글은 아직 없음 */}
    </div>
  )
}
