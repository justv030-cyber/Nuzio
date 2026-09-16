import React, { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'

export default function Home() {
  const { user, logout } = useAuth()
  const [activeTab, setActiveTab] = useState('All')
  const [isPlaying, setIsPlaying] = useState(true)
  const [currentTime, setCurrentTime] = useState(134);
  const totalDuration = 221;

  const categories = ['All', 'AI & Tech', 'Markets', 'Startups', 'Science']

  const firstName = user?.name ? user.name.split(' ')[0] : 'harshil'

  useEffect(() => {
    let timer;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= totalDuration) {
            return 0; // End thay etle reset
          }
          return prev + 1; // Dar second e 1 second aagal vadhvu
        });
      }, 1000);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${String(mins).padStart(2, '0')}:${String(remainingSecs).padStart(2, '0')}`;
  };

  // Baki rolo bachi relu time calculate karva mate:
  const remainingTime = totalDuration - currentTime;
  const formatRemainingTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `-${String(mins).padStart(2, '0')}:${String(remainingSecs).padStart(2, '0')}`;
  };

  // Progress bar width percentage calculate karva mate:
  const progressPercent = (currentTime / totalDuration) * 100;

  return (
    <div className="screen nuzio-screen">
      <div className="glow" />

      {/* Top Header Bar */}
      <header className="nuzio-header">
        <div className="brand-logo-group">
          <svg className="brand-wave-icon" width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0" y="7" width="3" height="8" rx="1.5" fill="#8B7CF6"></rect>
            <rect x="5.5" y="3" width="3" height="16" rx="1.5" fill="#8B7CF6"></rect>
            <rect x="11" y="0" width="3" height="22" rx="1.5" fill="#8B7CF6"></rect>
            <rect x="16.5" y="7" width="3" height="8" rx="1.5" fill="#8B7CF6"></rect>
          </svg>
          <span className="brand-title">Nuzio <span className="ai-badge">AI</span></span>
        </div>

        <div className="header-icons">
          <button className="icon-btn search-icon" title="Search">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="11" cy="11" r="7" stroke="#38BDF8" strokeWidth="2" />
              <path d="M16 16L21 21" stroke="#A855F7" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
          <button className="icon-btn notif-icon" title="Notifications">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z" stroke="#FBBF24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3495 21.9965 12 21.9965C11.6505 21.9965 11.3054 21.9044 11.0018 21.7295C10.6981 21.5547 10.4458 21.3031 10.27 21" stroke="#FBBF24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="notif-dot-glow"></span>
          </button>
        </div>
      </header>
      <hr className="header-divider" />

      {/* Category Pills Navigation */}
      <div className="category-tabs">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`category-pill ${activeTab === cat ? 'active' : ''}`}
            onClick={() => setActiveTab(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className="content home-content scrollable-area">

        {/* Exact Matching Greeting Section */}
        <div className="greeting-section-20">
          <div className="date-label">
            SUNDAY <span className="date-dot"></span> 12 JULY <span className="date-dot"></span> MORNING BRIEF
          </div>

          <h1 className="headline">
            Good morning, {firstName} — <br />
            <span className="highlight-italic-blue">6 things.</span>
          </h1>

          <div className="audio-live-status-bar">
            <span className="live-dot-glow"></span>
            <span className="live-text">Audio live</span>
            <span className="dot-sep">•</span>
            <span className="voice-text">Voice: <strong>Aria</strong></span>
            <span className="dot-sep">•</span>
            <span>6 stories</span>
            <span className="dot-sep">•</span>
            <span>18:30</span>
          </div>
        </div>

        {/* Now Playing Audio Card */}
        <div className="player-card">
          <div className="player-card-header">
            <span className="now-playing-badge">● NOW PLAYING - AI & TECH</span>
            <span className="track-counter">01 / 06</span>
          </div>

          <h2 className="article-title">
            Anthropic ships Claude 4.5 with 2M-token memory and native tools.
          </h2>

          <div className="article-meta">
            <span className="publisher">THE VERGE</span>
            <span className="dot">•</span>
            <span className="read-time">3 MIN</span>
            <span className="dot">•</span>
            <span className="source-link">SOURCE ↗</span>
            <button className="save-btn" onClick={logout} title="Logout / Save">
              SAVE
            </button>
          </div>

          <p className="article-snippet">
            OpenAI unveils on-device model rivaling GPT-4...
          </p>

          <div className="waveform-container">
            <div className={`waveform-bars ${isPlaying ? 'animating' : ''}`}>
              {[12, 18, 35, 20, 22, 28, 14, 38, 55, 75, 40, 25, 14, 50, 68, 40, 68, 35, 72, 30, 25, 42, 28, 18, 50, 38, 25, 14, 18, 42, 45].map((height, idx) => (
                <span
                  key={idx}
                  className={`bar ${idx < 14 ? 'played' : ''}`}
                  style={{ height: `${height}%` }}
                ></span>
              ))}
            </div>

            <div className="waveform-progress-track">
              <div
                className="waveform-progress-fill"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>

            <div className="time-indicators">
              <span>{formatTime(currentTime)}</span>
              <span>{formatRemainingTime(remainingTime)}</span>
            </div>
          </div>

          <div className="player-controls">
            <button className="control-btn skip-dir">
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><polygon points="19 20 9 12 19 4 19 20"></polygon><line x1="5" y1="4" x2="5" y2="20"></line></svg>
            </button>
            <button className="control-btn play-pause-main" onClick={() => setIsPlaying(!isPlaying)}>
              {isPlaying ? (
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>
              ) : (
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
              )}
            </button>
            <button className="control-btn skip-dir">
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><polygon points="5 4 15 12 5 20 5 4"></polygon><line x1="19" y1="4" x2="19" y2="20"></line></svg>
            </button>
            <button className="speed-btn">1x</button>
          </div>
        </div>

        {/* Mini Player Ticker */}
        <div className="mini-player-ticker">
          <span className="ticker-icon">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
              <path d="M19 10v1a7 7 0 0 1-14 0v-1"></path>
              <line x1="12" y1="19" x2="12" y2="23"></line>
              <line x1="8" y1="23" x2="16" y2="23"></line>
            </svg>
          </span>
          <p className="ticker-text">Now narrating — Anthropic ships Claude 4.5 with 2M-token...</p>
        </div>
      </div>

      {/* Floating Bottom Navigation */}
      <div className="footer floating-nav-footer">
        <div className="floating-action-btn-container">
          <button className="floating-big-play" onClick={() => setIsPlaying(!isPlaying)}>
            {isPlaying ? (
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>
            ) : (
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
            )}
          </button>
        </div>

        <div className="bottom-nav-bar">
          <button className="nav-item active">
            <svg width="18" height="18" fill="none" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"></circle><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon></svg>
            <span>DISCOVER</span>
          </button>
          <button className="nav-item" onClick={logout}>
            <svg width="18" height="18" fill="none" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
            <span>SETTINGS</span>
          </button>
        </div>
      </div>
    </div>
  )
}