import { useState, useRef, useEffect } from 'react';

const VideoHero = ({ children }) => {
  const videoRef = useRef(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onCanPlay = () => setVideoLoaded(true);
    video.addEventListener('canplaythrough', onCanPlay);

    // fallback: if video takes too long, still fade in
    const timeout = setTimeout(() => setVideoLoaded(true), 4000);

    return () => {
      video.removeEventListener('canplaythrough', onCanPlay);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <section style={{
      position: 'relative',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      overflow: 'hidden',
    }}>
      {/* Video Background */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          minWidth: '100%',
          minHeight: '100%',
          width: 'auto',
          height: 'auto',
          objectFit: 'cover',
          zIndex: 0,
          opacity: videoLoaded ? 1 : 0,
          transition: 'opacity 1.5s ease-in-out',
        }}
      >
        <source src="/videos/asper_web_4k.mp4" type="video/mp4" />
      </video>

      {/* Dark Gradient Overlay */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        background: `
          linear-gradient(180deg,
            rgba(0,0,0,0.7) 0%,
            rgba(0,0,0,0.4) 40%,
            rgba(0,0,0,0.5) 70%,
            rgba(0,0,0,0.85) 100%
          )
        `,
        zIndex: 1,
      }} />

      {/* Content Overlay */}
      <div className="video-hero-content" style={{
        position: 'relative',
        zIndex: 2,
        width: '100%',
        paddingTop: 64,
      }}>
        {children}
      </div>

      {/* Scroll Indicator */}
      <div className="scroll-indicator" style={{
        position: 'absolute',
        bottom: 32,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 8,
        opacity: 0.5,
        animation: 'scrollBounce 2s ease-in-out infinite',
      }}>
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.6rem',
          color: '#94A3B8',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
        }}>Scroll</span>
        <div style={{
          width: 1,
          height: 24,
          background: 'linear-gradient(180deg, #94A3B8, transparent)',
        }} />
      </div>

      <style>{`
        @keyframes scrollBounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(8px); }
        }
        @media (max-width: 768px) {
          .video-hero-content { padding-top: 80px !important; padding-bottom: 32px !important; }
          .scroll-indicator { display: none !important; }
        }
      `}</style>
    </section>
  );
};

export default VideoHero;
