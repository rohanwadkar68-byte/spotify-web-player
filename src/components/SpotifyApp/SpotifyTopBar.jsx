export default function SpotifyTopBar({
  activeView,
  setActiveView,
  searchQuery,
  setSearchQuery,
  onBackToWorld
}) {
  return (
    <header style={{
      height: 60,
      background: 'rgba(18, 18, 18, 0.95)',
      backdropFilter: 'blur(20px)',
      position: 'sticky',
      top: 0,
      zIndex: 50,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 16px',
      gap: 10,
      borderBottom: '1px solid rgba(255,255,255,0.06)'
    }}>
      {/* LEFT: Back Button & Search Input */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1, minWidth: 0 }}>
        <button
          onClick={() => setActiveView('home')}
          style={{
            width: 32,
            height: 32,
            borderRadius: '50%',
            background: 'rgba(0,0,0,0.7)',
            border: 'none',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            flexShrink: 0
          }}
          title="Go back"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M11.03.47a.75.75 0 0 1 0 1.06L4.56 8l6.47 6.47a.75.75 0 1 1-1.06 1.06L2.44 8.53a.75.75 0 0 1 0-1.06L9.97.47a.75.75 0 0 1 1.06 0z"/>
          </svg>
        </button>

        {activeView === 'search' && (
          <div style={{ position: 'relative', flex: 1, maxWidth: 360, minWidth: 140 }}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="#747474"
              style={{ position: 'absolute', left: 12, top: 10, pointerEvents: 'none' }}
            >
              <path d="M10.533 1.279c-5.18 0-9.407 4.14-9.407 9.279s4.226 9.279 9.407 9.279c2.234 0 4.29-.77 5.907-2.058l4.353 4.353a1 1 0 1 0 1.414-1.414l-4.344-4.344a9.157 9.157 0 0 0 2.077-5.816c0-5.14-4.226-9.28-9.407-9.28zm-7.407 9.279c0-4.006 3.302-7.279 7.407-7.279s7.407 3.273 7.407 7.279-3.302 7.279-7.407 7.279-7.407-3.273-7.407-7.279z"/>
            </svg>
            <input
              type="text"
              placeholder="What do you want to play?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
              style={{
                width: '100%',
                background: '#242424',
                border: 'none',
                borderRadius: 9999,
                padding: '8px 32px 8px 36px',
                color: '#ffffff',
                fontSize: '13px',
                outline: 'none',
                fontWeight: 500,
                boxSizing: 'border-box'
              }}
              onFocus={(e) => { e.currentTarget.style.border = '2px solid #ffffff' }}
              onBlur={(e) => { e.currentTarget.style.border = 'none' }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                style={{
                  position: 'absolute',
                  right: 10,
                  top: 8,
                  border: 'none',
                  background: 'transparent',
                  color: '#b3b3b3',
                  cursor: 'pointer',
                  fontSize: '12px'
                }}
              >
                ✕
              </button>
            )}
          </div>
        )}
      </div>

      {/* RIGHT: Return to World Button */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
        {onBackToWorld && (
          <button
            onClick={onBackToWorld}
            style={{
              border: '1px solid rgba(255,255,255,0.2)',
              background: 'rgba(255,255,255,0.08)',
              color: '#ffffff',
              padding: '6px 12px',
              borderRadius: 9999,
              fontSize: '12px',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              whiteSpace: 'nowrap'
            }}
            title="Return to Previous World"
          >
            <span>←</span>
            <span>Back to World</span>
          </button>
        )}

        <div style={{
          width: 28,
          height: 28,
          borderRadius: '50%',
          background: '#282828',
          border: '1px solid rgba(255,255,255,0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ffffff',
          fontWeight: 700,
          fontSize: '12px'
        }}>
          S
        </div>
      </div>
    </header>
  )
}
