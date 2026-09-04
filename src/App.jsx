import { MusicPlayerProvider } from './context/MusicPlayerContext.jsx'
import SpotifyApp from './components/SpotifyApp/SpotifyApp.jsx'
import SpotifyErrorBoundary from './components/SpotifyApp/SpotifyErrorBoundary.jsx'

export default function App() {
  return (
    <SpotifyErrorBoundary>
      <MusicPlayerProvider>
        <SpotifyApp onBackToWorld={null} />
      </MusicPlayerProvider>
    </SpotifyErrorBoundary>
  )
}
