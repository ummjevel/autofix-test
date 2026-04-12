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
      console.log('로그인 시도...')
      await onLogin('test@test.com', 'password')
    } catch (e) {
      setError('로그인에 실패했습니다.')
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
        {loading ? '처리 중...' : '로그인'}
      </button>
      {error && <p className="error">{error}</p>}
    </div>
  )
}
