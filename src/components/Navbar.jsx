import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X, Globe } from 'lucide-react';

const languages = [
  { code: 'en', label: 'EN' },
  { code: 'zh', label: '繁中' },
  { code: 'ja', label: '日本語' },
  { code: 'ko', label: '한국어' },
];

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const navLinks = [
    { path: '/', label: t('nav.home') },
    { path: '/ai-vision', label: t('nav.aiVision') },
    { path: '/nexus', label: t('nav.nexus') },
    { path: '/supply-chain', label: t('nav.supply') },
    { path: '/metal-recovery', label: t('nav.metal') },
    { path: '/partners', label: t('nav.partners') },
  ];

  const currentLang = languages.find(l => l.code === i18n.language) || languages[0];

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(255,255,255,0.05)',
    }}>
      <div style={{
        maxWidth: 1200, margin: '0 auto', padding: '0 24px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        height: 64,
      }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          <img src="/logo.png" alt="Asper International" style={{
            height: 36, width: 'auto', objectFit: 'contain',
          }} />
        </Link>

        <div style={{
          display: 'flex', alignItems: 'center', gap: 32,
        }} className="nav-desktop">
          {navLinks.map(link => (
            <Link key={link.path} to={link.path} style={{
              fontSize: '0.8rem', fontFamily: 'var(--font-mono)',
              color: location.pathname === link.path ? '#4285F4' : '#94A3B8',
              textDecoration: 'none', letterSpacing: '0.05em', textTransform: 'uppercase',
              transition: 'color 0.2s', fontWeight: 500,
            }}>{link.label}</Link>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ position: 'relative' }}>
            <button onClick={() => setLangOpen(!langOpen)} style={{
              display: 'flex', alignItems: 'center', gap: 6,
              background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 6, padding: '6px 12px', color: '#94A3B8',
              cursor: 'pointer', fontFamily: 'var(--font-mono)', fontSize: '0.75rem',
            }}>
              <Globe size={14} />
              {currentLang.label}
            </button>
            {langOpen && (
              <div style={{
                position: 'absolute', top: '100%', right: 0, marginTop: 8,
                background: '#111', border: '1px solid #1a1a1a', borderRadius: 8,
                overflow: 'hidden', minWidth: 120,
              }}>
                {languages.map(lang => (
                  <button key={lang.code} onClick={() => { i18n.changeLanguage(lang.code); setLangOpen(false); }}
                    style={{
                      display: 'block', width: '100%', padding: '10px 16px', border: 'none',
                      background: i18n.language === lang.code ? 'rgba(66,133,244,0.1)' : 'transparent',
                      color: i18n.language === lang.code ? '#4285F4' : '#94A3B8',
                      cursor: 'pointer', fontFamily: 'var(--font-mono)', fontSize: '0.8rem',
                      textAlign: 'left',
                    }}>{lang.label}</button>
                ))}
              </div>
            )}
          </div>

          <button onClick={() => setMobileOpen(!mobileOpen)} style={{
            display: 'none', background: 'none', border: 'none', color: '#fff', cursor: 'pointer',
          }} className="nav-mobile-btn">
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div style={{
          padding: '16px 24px', background: 'rgba(0,0,0,0.95)',
          borderTop: '1px solid rgba(255,255,255,0.05)',
        }} className="nav-mobile-menu">
          {navLinks.map(link => (
            <Link key={link.path} to={link.path} onClick={() => setMobileOpen(false)} style={{
              display: 'block', padding: '12px 0', fontSize: '0.9rem',
              fontFamily: 'var(--font-mono)', textDecoration: 'none',
              color: location.pathname === link.path ? '#4285F4' : '#94A3B8',
              borderBottom: '1px solid rgba(255,255,255,0.05)',
            }}>{link.label}</Link>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-mobile-btn { display: block !important; }
        }
        @media (min-width: 769px) {
          .nav-mobile-menu { display: none !important; }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
