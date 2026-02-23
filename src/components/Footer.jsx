import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Github, Linkedin, Twitter } from 'lucide-react';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer style={{
      borderTop: '1px solid rgba(255,255,255,0.05)',
      background: '#050505',
      padding: '64px 0 32px',
    }}>
      <div className="container">
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 48, marginBottom: 48,
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div style={{
                width: 32, height: 32, borderRadius: 8,
                background: 'linear-gradient(135deg, #4285F4, #34A853)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 14, color: '#fff',
              }}>A</div>
              <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, color: '#fff' }}>
                {t('footer.company')}
              </span>
            </div>
            <p style={{ color: '#64748B', fontSize: '0.875rem', lineHeight: 1.7 }}>
              {t('footer.companyDesc')}
            </p>
            <div style={{ display: 'flex', gap: 16, marginTop: 20 }}>
              {[Github, Linkedin, Twitter].map((Icon, i) => (
                <a key={i} href="#" style={{
                  color: '#475569', transition: 'color 0.2s',
                }} onMouseOver={e => e.currentTarget.style.color = '#4285F4'}
                  onMouseOut={e => e.currentTarget.style.color = '#475569'}>
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: '#94A3B8',
              textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 20,
            }}>{t('footer.quickLinks')}</h4>
            {[
              { path: '/ai-vision', label: t('nav.aiVision') },
              { path: '/nexus', label: t('nav.nexus') },
              { path: '/supply-chain', label: t('nav.supply') },
              { path: '/metal-recovery', label: t('nav.metal') },
              { path: '/partners', label: t('nav.partners') },
            ].map(link => (
              <Link key={link.path} to={link.path} style={{
                display: 'block', color: '#475569', fontSize: '0.875rem',
                textDecoration: 'none', padding: '6px 0', transition: 'color 0.2s',
              }} onMouseOver={e => e.currentTarget.style.color = '#fff'}
                onMouseOut={e => e.currentTarget.style.color = '#475569'}>
                {link.label}
              </Link>
            ))}
          </div>

          <div>
            <h4 style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: '#94A3B8',
              textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 20,
            }}>{t('footer.contact')}</h4>
            <p style={{ color: '#475569', fontSize: '0.875rem', lineHeight: 2 }}>
              contact@asper.international<br />
              Taipei, Taiwan<br />
              +886-2-XXXX-XXXX
            </p>
          </div>
        </div>

        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.05)',
          paddingTop: 24, display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', flexWrap: 'wrap', gap: 16,
        }}>
          <p style={{ color: '#475569', fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}>
            &copy; {new Date().getFullYear()} Asper International. {t('footer.rights')}
          </p>
          <p style={{
            color: '#475569', fontSize: '0.75rem', fontFamily: 'var(--font-mono)',
            fontStyle: 'italic',
          }}>{t('footer.tagline')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
