import { useTranslation } from 'react-i18next';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Shield, Fingerprint, Network, Lock } from 'lucide-react';
import AnimatedCounter from '../components/AnimatedCounter';

const SupplyChain = () => {
  const { t } = useTranslation();

  const recoveryData = [
    { key: 'carbonFiber', rate: 92, color: '#4285F4' },
    { key: 'rareEarth', rate: 78, color: '#34A853' },
    { key: 'polymerReclaim', rate: 95, color: '#4285F4' },
    { key: 'glassRecovery', rate: 88, color: '#34A853' },
  ];

  const architectureLayers = [
    { label: 'Blockchain Layer', desc: 'Immutable ledger for material provenance', icon: Lock, color: '#4285F4' },
    { label: 'Verification Layer', desc: 'AI-powered quality & authenticity checks', icon: Shield, color: '#34A853' },
    { label: 'Identity Layer', desc: 'Unique digital fingerprint per material unit', icon: Fingerprint, color: '#4285F4' },
    { label: 'Network Layer', desc: 'Distributed partner connectivity', icon: Network, color: '#34A853' },
  ];

  return (
    <div style={{ paddingTop: 64 }}>
      <section className="section">
        <div className="container">
          <div className="tag" style={{ marginBottom: 24 }}>Traceability</div>
          <h1 className="section-title" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
            {t('supply.title')}
          </h1>
          <p className="section-subtitle">{t('supply.subtitle')}</p>

          {/* Digital Passport */}
          <div className="grid-2" style={{ marginBottom: 80 }}>
            <div className="card">
              <Shield size={28} color="#4285F4" style={{ marginBottom: 16 }} />
              <h3 style={{ fontSize: '1.1rem', marginBottom: 12, color: '#fff' }}>
                {t('supply.passportTitle')}
              </h3>
              <p style={{ fontSize: '0.875rem', color: '#64748B', lineHeight: 1.7, marginBottom: 24 }}>
                {t('supply.passportDesc')}
              </p>

              {/* Mock Passport Card */}
              <div style={{
                background: '#0a0a0a', border: '1px solid #1a1a1a', borderRadius: 8,
                padding: 20, fontFamily: 'var(--font-mono)',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                  <span style={{ fontSize: '0.7rem', color: '#64748B' }}>MATERIAL PASSPORT</span>
                  <span style={{ fontSize: '0.7rem', color: '#34A853' }}>VERIFIED</span>
                </div>
                <div style={{ fontSize: '0.8rem', color: '#fff', marginBottom: 8 }}>
                  rPET-2024-TW-0847291
                </div>
                {[
                  ['Origin', 'Taipei, Taiwan'],
                  ['Material', 'Recycled PET'],
                  ['Grade', 'Food-Contact Safe'],
                  ['Carbon Offset', '2.4 kg CO₂e'],
                ].map(([label, value], i) => (
                  <div key={i} style={{
                    display: 'flex', justifyContent: 'space-between',
                    padding: '6px 0', borderBottom: '1px solid #111',
                    fontSize: '0.7rem',
                  }}>
                    <span style={{ color: '#64748B' }}>{label}</span>
                    <span style={{ color: '#94A3B8' }}>{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Architecture */}
            <div>
              <h3 style={{ fontSize: '1.1rem', marginBottom: 24, color: '#fff' }}>
                {t('supply.architectureTitle')}
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {architectureLayers.map((layer, i) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'center', gap: 16,
                    padding: '16px 20px', background: '#111', border: '1px solid #1a1a1a',
                    borderRadius: 8, transition: 'border-color 0.2s',
                  }} onMouseOver={e => e.currentTarget.style.borderColor = layer.color}
                    onMouseOut={e => e.currentTarget.style.borderColor = '#1a1a1a'}>
                    <layer.icon size={22} color={layer.color} />
                    <div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: '#fff', marginBottom: 2 }}>
                        {layer.label}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#64748B' }}>{layer.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recovery Rates */}
          <div>
            <h2 style={{ fontSize: '1.5rem', marginBottom: 32, color: '#fff' }}>
              {t('supply.recoveryTitle')}
            </h2>
            <div className="grid-4" style={{ marginBottom: 32 }}>
              {recoveryData.map((item, i) => (
                <div key={i} className="card" style={{ textAlign: 'center' }}>
                  <div className="metric-value">
                    <AnimatedCounter end={item.rate} suffix="%" delay={i * 150} />
                  </div>
                  <div className="metric-label">{t(`supply.${item.key}`)}</div>
                  <div style={{
                    marginTop: 16, height: 4, background: '#1a1a1a', borderRadius: 2,
                    overflow: 'hidden',
                  }}>
                    <div style={{
                      width: `${item.rate}%`, height: '100%',
                      background: item.color, borderRadius: 2,
                      transition: 'width 1s ease-out',
                    }} />
                  </div>
                </div>
              ))}
            </div>

            <div style={{
              background: '#111', border: '1px solid #1a1a1a',
              borderRadius: 12, padding: 32,
            }}>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={recoveryData.map(d => ({ name: t(`supply.${d.key}`), rate: d.rate, color: d.color }))}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1a1a1a" />
                  <XAxis dataKey="name" stroke="#64748B" fontFamily="var(--font-mono)" fontSize={10} />
                  <YAxis stroke="#64748B" fontFamily="var(--font-mono)" fontSize={11} domain={[0, 100]} />
                  <Tooltip
                    contentStyle={{
                      background: '#1a1a1a', border: '1px solid #333',
                      borderRadius: 8, fontFamily: 'var(--font-mono)',
                    }}
                  />
                  <Bar dataKey="rate" radius={[4, 4, 0, 0]} name="Recovery Rate (%)">
                    {recoveryData.map((d, i) => (
                      <Cell key={i} fill={d.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SupplyChain;
