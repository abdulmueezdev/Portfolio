import React, { useState, useEffect } from 'react'

export function TerminalText() {
  const lines = [
    'MOV AX, @DATA',
    'MOV DS, AX',
    'START:',
    '  CALL RENDER_HERO',
    '  CMP AX, 0',
    '  JE EXIT',
    '  MOV AH, 09h',
    '  INT 21h',
    'EXIT:',
    '  MOV AH, 4Ch',
    '  INT 21h',
  ]
  const [visible, setVisible] = useState<string[]>([])

  useEffect(() => {
    const timers: NodeJS.Timeout[] = []
    lines.forEach((line, i) => {
      timers.push(setTimeout(() => setVisible(v => [...v, line]), i * 120))
    })
    return () => timers.forEach(clearTimeout)
  }, [])

  return (
    <div
      style={{
        fontFamily: '"Space Grotesk", monospace',
        fontSize: '9px',
        color: '#55E6C1',
        whiteSpace: 'pre',
        textAlign: 'left',
        width: '220px',
        lineHeight: 1.6,
        textShadow: '0 0 8px rgba(85, 230, 193, 0.4)',
      }}
    >
      {visible.map((l, i) => (
        <div key={i}>{l}</div>
      ))}
      {visible.length < lines.length && (
        <span style={{ opacity: 0.6, animation: 'blink 1s step-end infinite' }}>█</span>
      )}
    </div>
  )
}
