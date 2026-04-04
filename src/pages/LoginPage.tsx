import React, { useState } from 'react'
import { LoginButton } from '../components/LoginButton'
import { generateToken } from '../lib/auth'

export function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (email: string, password: string) => {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })

    if (!res.ok) {
      throw new Error('Login failed')
    }

    const { user } = await res.json()
    const token = generateToken(user)
    localStorage.setItem('token', token)
    window.location.href = '/dashboard'
  }

  return (
    <div className="login-page">
      <h1>로그인</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="이메일"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호"
        />
        <LoginButton onLogin={() => handleLogin(email, password)} />
      </form>
    </div>
  )
}
