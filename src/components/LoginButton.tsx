import React, { useState } from 'react'

interface LoginButtonProps {
  onLogin: (email: string, password: string) => Promise<void>
}

export function LoginButton({ onLogin }: LoginButtonProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleClick = async () => {
    setLoading(true)
    setError(null)
    try {
      // 시나리오 3-9: 오타 "로그읜"
      console.log('로그읜 시도...')
      await onLogin('test@test.com', 'password')
    } catch (e) {
      setError('로그읜에 실패했습니다.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <button
        onClick={handleClick}
        disabled={loading}
        className="login-btn"
      >
        {loading ? '처리 중...' : '로그읜'}
      </button>
      {error && <p className="error">{error}</p>}
    </div>
  )
}
