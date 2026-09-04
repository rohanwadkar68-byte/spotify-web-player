import React from 'react'

export default class SpotifyErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.warn('Spotify section caught an error:', error, errorInfo)
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null })
    if (this.props.onReset) this.props.onReset()
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          padding: '40px 20px',
          textAlign: 'center',
          color: '#ffffff',
          background: '#121212',
          minHeight: 280,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 16
        }}>
          <div style={{ fontSize: '32px' }}>🎵</div>
          <div style={{ fontSize: '18px', fontWeight: 800 }}>Smooth Recovery</div>
          <p style={{ fontSize: '13px', color: '#b3b3b3', maxWidth: 360, margin: 0, lineHeight: 1.4 }}>
            Ye section refresh ho raha hai. Niche button dabayein:
          </p>
          <button
            onClick={this.handleReset}
            style={{
              background: '#1ed760',
              color: '#000000',
              border: 'none',
              borderRadius: 999,
              padding: '10px 24px',
              fontSize: '13px',
              fontWeight: 800,
              cursor: 'pointer'
            }}
          >
            Back to Home
          </button>
        </div>
      )
    }

    return this.props.children
  }
}
