import { useState, useRef } from 'react'
import { Captcha, validateCaptcha } from 'easy-captcha'
import './App.css'

function App() {
  const [captchaCode, setCaptchaCode] = useState('')
  const [userInput, setUserInput] = useState('')
  const [status, setStatus] = useState(null)

  const captchaRef = useRef(null)

  const handleCaptchaChange = (code) => {
    setCaptchaCode(code)
    console.log('Captcha code changed:', code)
    setStatus(null) // Reset status on new captcha
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const isValid = validateCaptcha(userInput, captchaCode)
    if (isValid) {
      setStatus('success')
    } else {
      setStatus('error')
    }
  }

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Easy Captcha Test</h1>
      
        <div style={{ marginBottom: '1rem' }}>
          <Captcha 
            ref={captchaRef}
            onChange={handleCaptchaChange} 
            width={250} 
            height={80}
            textColor="#ffffff"
            backgroundColor="#1f2937"
          />
          <p 
            style={{ fontSize: '0.8rem', color: '#666', cursor: 'pointer', textDecoration: 'underline' }}
            onClick={() => captchaRef.current?.refresh()}
          >
            Click to refresh
          </p>
        </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '300px' }}>
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Enter captcha code"
          style={{ padding: '0.5rem', fontSize: '1rem' }}
        />
        <button type="submit" style={{ padding: '0.5rem', cursor: 'pointer' }}>
          Verify
        </button>
      </form>

      {status === 'success' && (
        <p style={{ color: 'green', fontWeight: 'bold', marginTop: '1rem' }}>
          ✅ Captcha Valid!
        </p>
      )}
      
      {status === 'error' && (
        <p style={{ color: 'red', fontWeight: 'bold', marginTop: '1rem' }}>
          ❌ Invalid Code. Try again.
        </p>
      )}
      
      <div style={{ marginTop: '2rem', borderTop: '1px solid #ccc', paddingTop: '1rem' }}>
        <p>Current Code (Debug): {captchaCode}</p>
      </div>
    </div>
  )
}

export default App
