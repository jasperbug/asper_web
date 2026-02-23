import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Code2, Send, CheckCircle } from 'lucide-react';

const Partners = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '', email: '', organization: '', partnerType: 'enterprise', message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const partners = [
    { name: 'ASE Group', nameCn: '日月光集團', category: 'Semiconductor' },
    { name: 'Swancor', nameCn: '上緯投控', category: 'Green Materials' },
    { name: 'Tairylan', nameCn: '台麗朗', category: 'Carbon Fiber' },
  ];

  return (
    <div style={{ paddingTop: 64 }}>
      <section className="section">
        <div className="container">
          <div className="tag" style={{ marginBottom: 24 }}>Ecosystem</div>
          <h1 className="section-title" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
            {t('partners.title')}
          </h1>
          <p className="section-subtitle">{t('partners.subtitle')}</p>

          {/* API Access */}
          <div className="card" style={{ marginBottom: 80 }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 24, flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: 300 }}>
                <Code2 size={28} color="#4285F4" style={{ marginBottom: 16 }} />
                <h3 style={{ fontSize: '1.1rem', marginBottom: 12, color: '#fff' }}>
                  {t('partners.apiAccess')}
                </h3>
                <p style={{ fontSize: '0.875rem', color: '#64748B', lineHeight: 1.7 }}>
                  {t('partners.apiDesc')}
                </p>
              </div>
              <div style={{
                flex: 1, minWidth: 300, padding: 20, background: '#0a0a0a',
                borderRadius: 8, fontFamily: 'var(--font-mono)', fontSize: '0.75rem',
              }}>
                <div style={{ color: '#64748B' }}>$ curl -X GET \</div>
                <div style={{ color: '#4285F4', paddingLeft: 16 }}>https://api.asper.international/v2/materials \</div>
                <div style={{ color: '#64748B', paddingLeft: 16 }}>-H "Authorization: Bearer {'<API_KEY>'}" \</div>
                <div style={{ color: '#64748B', paddingLeft: 16 }}>-H "Content-Type: application/json"</div>
                <div style={{ marginTop: 16, color: '#64748B' }}>// Response</div>
                <div style={{ color: '#34A853' }}>{'{'}</div>
                <div style={{ color: '#94A3B8', paddingLeft: 16 }}>"status": "ok",</div>
                <div style={{ color: '#94A3B8', paddingLeft: 16 }}>"materials": 847291,</div>
                <div style={{ color: '#94A3B8', paddingLeft: 16 }}>"api_version": "2.0"</div>
                <div style={{ color: '#34A853' }}>{'}'}</div>
              </div>
            </div>
          </div>

          {/* Logo Wall */}
          <div style={{ marginBottom: 80 }}>
            <h2 style={{ fontSize: '1.2rem', marginBottom: 32, color: '#fff' }}>
              {t('partners.logoWall')}
            </h2>
            <div className="grid-3">
              {partners.map((p, i) => (
                <div key={i} style={{
                  padding: '32px 24px', background: '#111', border: '1px solid #1a1a1a',
                  borderRadius: 12, textAlign: 'center', transition: 'border-color 0.2s',
                }} onMouseOver={e => e.currentTarget.style.borderColor = '#333'}
                  onMouseOut={e => e.currentTarget.style.borderColor = '#1a1a1a'}>
                  <div style={{
                    fontFamily: 'var(--font-mono)', fontSize: '1.2rem',
                    color: '#94A3B8', marginBottom: 8, fontWeight: 600,
                  }}>{p.name}</div>
                  <div style={{ fontSize: '0.8rem', color: '#475569', marginBottom: 4 }}>{p.nameCn}</div>
                  <div style={{
                    display: 'inline-block', padding: '2px 10px', borderRadius: 100,
                    background: 'rgba(66,133,244,0.1)', color: '#4285F4',
                    fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
                  }}>{p.category}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div style={{
            background: '#111', border: '1px solid #1a1a1a',
            borderRadius: 12, padding: '48px 40px', maxWidth: 640,
          }}>
            <h2 style={{ fontSize: '1.3rem', marginBottom: 32, color: '#fff' }}>
              {t('partners.formTitle')}
            </h2>

            {submitted ? (
              <div style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: 24, background: 'rgba(52,168,83,0.1)',
                border: '1px solid rgba(52,168,83,0.3)', borderRadius: 8,
              }}>
                <CheckCircle size={24} color="#34A853" />
                <span style={{ color: '#34A853', fontFamily: 'var(--font-mono)', fontSize: '0.9rem' }}>
                  {t('partners.success')}
                </span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {[
                  { key: 'name', type: 'text' },
                  { key: 'email', type: 'email' },
                  { key: 'organization', type: 'text' },
                ].map(field => (
                  <div key={field.key}>
                    <label style={{
                      display: 'block', fontFamily: 'var(--font-mono)',
                      fontSize: '0.75rem', color: '#64748B', marginBottom: 8,
                      textTransform: 'uppercase', letterSpacing: '0.1em',
                    }}>{t(`partners.${field.key}`)}</label>
                    <input
                      type={field.type} required
                      value={formData[field.key]}
                      onChange={e => setFormData({ ...formData, [field.key]: e.target.value })}
                      style={{
                        width: '100%', padding: '12px 16px', background: '#0a0a0a',
                        border: '1px solid #1a1a1a', borderRadius: 8, color: '#fff',
                        fontFamily: 'var(--font-body)', fontSize: '0.9rem',
                        outline: 'none', transition: 'border-color 0.2s',
                      }}
                      onFocus={e => e.target.style.borderColor = '#4285F4'}
                      onBlur={e => e.target.style.borderColor = '#1a1a1a'}
                    />
                  </div>
                ))}

                <div>
                  <label style={{
                    display: 'block', fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem', color: '#64748B', marginBottom: 8,
                    textTransform: 'uppercase', letterSpacing: '0.1em',
                  }}>{t('partners.partnerType')}</label>
                  <select
                    value={formData.partnerType}
                    onChange={e => setFormData({ ...formData, partnerType: e.target.value })}
                    style={{
                      width: '100%', padding: '12px 16px', background: '#0a0a0a',
                      border: '1px solid #1a1a1a', borderRadius: 8, color: '#fff',
                      fontFamily: 'var(--font-body)', fontSize: '0.9rem', outline: 'none',
                    }}
                  >
                    <option value="enterprise">{t('partners.enterprise')}</option>
                    <option value="research">{t('partners.research')}</option>
                    <option value="technology">{t('partners.technology')}</option>
                  </select>
                </div>

                <div>
                  <label style={{
                    display: 'block', fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem', color: '#64748B', marginBottom: 8,
                    textTransform: 'uppercase', letterSpacing: '0.1em',
                  }}>{t('partners.message')}</label>
                  <textarea
                    rows={4} value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    style={{
                      width: '100%', padding: '12px 16px', background: '#0a0a0a',
                      border: '1px solid #1a1a1a', borderRadius: 8, color: '#fff',
                      fontFamily: 'var(--font-body)', fontSize: '0.9rem',
                      outline: 'none', resize: 'vertical',
                    }}
                    onFocus={e => e.target.style.borderColor = '#4285F4'}
                    onBlur={e => e.target.style.borderColor = '#1a1a1a'}
                  />
                </div>

                <button type="submit" className="btn-primary" style={{ alignSelf: 'flex-start' }}>
                  {t('partners.submit')} <Send size={16} />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Partners;
