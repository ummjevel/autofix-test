import React from 'react'

interface DashboardProps {
  data: Array<{ id: string; name: string; value: number }>
}

export function Dashboard({ data }: DashboardProps) {
  // 시나리오 C: CSV 내보내기 기능이 이미 존재함
  const handleExport = () => {
    const csv = [
      'ID,Name,Value',
      ...data.map(d => `${d.id},${d.name},${d.value}`),
    ].join('\n')

    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'export.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>대시보드</h1>
        <div className="actions">
          {/* 내보내기 버튼이 존재하지만 숨겨진 상태로 보일 수 있음 */}
          <button onClick={handleExport} className="export-btn" title="CSV 내보내기">
            📥 내보내기
          </button>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>이름</th>
            <th>값</th>
          </tr>
        </thead>
        <tbody>
          {data.map(d => (
            <tr key={d.id}>
              <td>{d.id}</td>
              <td>{d.name}</td>
              <td>{d.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
