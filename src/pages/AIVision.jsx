import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Brain, Cloud, Layers, Zap, Database, ArrowRight, Microscope, Radio, Server, Workflow } from 'lucide-react';
import AnimatedCounter from '../components/AnimatedCounter';

const AIVision = () => {
  const { t } = useTranslation();

  // Recharts data
  const classificationData = [
    { name: 'PET', accuracy: 99.8, color: '#4285F4' },
    { name: 'HDPE', accuracy: 99.5, color: '#34A853' },
    { name: 'PP', accuracy: 99.2, color: '#4285F4' },
    { name: 'PS', accuracy: 98.9, color: '#34A853' },
    { name: 'PVC', accuracy: 98.5, color: '#4285F4' },
    { name: 'Other', accuracy: 97.1, color: '#94A3B8' },
  ];

  // Real-time classification grid data (expanded)
  const gridRows = useMemo(() => [
    { id: 'PET-0847', material: 'PET', spectral: '0.9821', region: 'TW-North', conf: 99.8, status: 'Verified' },
    { id: 'HDPE-1293', material: 'HDPE', spectral: '0.9654', region: 'JP-Kanto', conf: 99.5, status: 'Verified' },
    { id: 'PP-3371', material: 'PP', spectral: '0.9587', region: 'KR-Seoul', conf: 99.2, status: 'Verified' },
    { id: 'PS-0092', material: 'PS', spectral: '0.9413', region: 'TW-South', conf: 98.9, status: 'Verified' },
    { id: 'PVC-2218', material: 'PVC', spectral: '0.9298', region: 'JP-Osaka', conf: 98.5, status: 'Pending' },
    { id: 'PET-1190', material: 'PET', spectral: '0.9776', region: 'TW-Central', conf: 99.6, status: 'Verified' },
    { id: 'MIX-0561', material: 'Mixed', spectral: '0.8847', region: 'KR-Busan', conf: 97.1, status: 'Pending' },
    { id: 'HDPE-3802', material: 'HDPE', spectral: '0.9601', region: 'JP-Nagoya', conf: 99.3, status: 'Verified' },
    { id: 'PP-1455', material: 'PP', spectral: '0.9539', region: 'TW-North', conf: 99.0, status: 'Verified' },
  ], []);

  // Neural network layers
  const nnLayers = [
    { label: 'Input Layer', desc: 'Spectral + Visual', color: '#94A3B8', nodes: 4 },
    { label: 'Conv Blocks', desc: '128→256→512', color: '#4285F4', nodes: 6 },
    { label: 'Pooling', desc: 'Adaptive Avg', color: '#4285F4', nodes: 4 },
    { label: 'Dense', desc: '1024→512', color: '#34A853', nodes: 5 },
    { label: 'Output', desc: '6 Classes', color: '#34A853', nodes: 3 },
  ];

  const gridCols = '80px 80px 90px 100px 80px 80px';

  return (
    <div style={{ paddingTop: 64 }}>
      <section className="section">
        <div className="container">
          {/* Hero */}
          <div className="tag" style={{ marginBottom: 24 }}>{t('aiVision.tag')}</div>
          <h1 className="section-title" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
            {t('aiVision.title')}
          </h1>
          <p className="section-subtitle">{t('aiVision.subtitle')}</p>

          {/* 1. Metric Cards — 4 columns */}
          <div className="grid-4" style={{ marginBottom: 80 }}>
            {[
              { icon: Database, end: 100, suffix: 'M+', label: t('aiVision.images'), color: '#4285F4', delay: 0 },
              { icon: Layers, end: 8.5, suffix: 'B+', label: t('aiVision.spectral'), color: '#34A853', delay: 150 },
              { icon: Brain, end: 99.7, suffix: '%', label: t('aiVision.accuracy'), color: '#4285F4', delay: 300 },
              { icon: Zap, end: 847, suffix: '', label: t('aiVision.activeModels'), color: '#34A853', delay: 450 },
            ].map((m, i) => (
              <div key={i} className="card" style={{ textAlign: 'center', padding: '28px 20px' }}>
                <m.icon size={28} color={m.color} style={{ marginBottom: 14 }} />
                <div className="metric-value" style={{ fontSize: '2rem', marginBottom: 6 }}>
                  <AnimatedCounter end={m.end} suffix={m.suffix} delay={m.delay} duration={2000} />
                </div>
                <div className="metric-label">{m.label}</div>
              </div>
            ))}
          </div>

          {/* 2. Real-Time Classification Grid */}
          <div style={{ marginBottom: 80 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <h2 style={{ fontSize: '1.3rem', color: '#fff', margin: 0 }}>
                {t('aiVision.realtimeTitle')}
              </h2>
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
                color: '#34A853', display: 'flex', alignItems: 'center', gap: 6,
              }}>
                <span style={{
                  width: 7, height: 7, borderRadius: '50%', background: '#34A853',
                  display: 'inline-block', animation: 'pulse 2s infinite',
                }} />
                {t('aiVision.liveStreams', { count: gridRows.length })}
              </span>
            </div>

            <div className="data-table-wrapper" style={{
              background: '#0a0a0a', border: '1px solid #1a1a1a',
              borderRadius: 12, overflow: 'hidden',
            }}>
              {/* Header */}
              <div style={{
                display: 'grid', gridTemplateColumns: gridCols, minWidth: 520,
                padding: '14px 24px', borderBottom: '1px solid #1a1a1a',
                fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
                color: '#475569', textTransform: 'uppercase', letterSpacing: '0.1em',
              }}>
                <span>ID</span>
                <span>Material</span>
                <span>Spectral Sig.</span>
                <span>Region</span>
                <span style={{ textAlign: 'center' }}>Conf.</span>
                <span style={{ textAlign: 'right' }}>Status</span>
              </div>
              {/* Rows */}
              {gridRows.map((row, i) => (
                <div key={i} style={{
                  display: 'grid', gridTemplateColumns: gridCols, minWidth: 520,
                  padding: '12px 24px', borderBottom: '1px solid #111',
                  alignItems: 'center', transition: 'background 0.2s',
                }}
                  onMouseOver={e => e.currentTarget.style.background = 'rgba(66,133,244,0.04)'}
                  onMouseOut={e => e.currentTarget.style.background = 'transparent'}
                >
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#64748B' }}>
                    {row.id}
                  </span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: '#fff' }}>
                    {row.material}
                  </span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#4285F4' }}>
                    {row.spectral}
                  </span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#94A3B8' }}>
                    {row.region}
                  </span>
                  <span style={{
                    fontFamily: 'var(--font-mono)', fontSize: '0.8rem', textAlign: 'center',
                    color: row.conf > 99 ? '#34A853' : '#4285F4',
                  }}>
                    {row.conf}%
                  </span>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{
                      padding: '3px 10px', borderRadius: 100, fontSize: '0.6rem',
                      fontFamily: 'var(--font-mono)',
                      background: row.status === 'Verified'
                        ? 'rgba(52,168,83,0.1)' : 'rgba(234,179,8,0.1)',
                      color: row.status === 'Verified' ? '#34A853' : '#EAB308',
                      border: `1px solid ${row.status === 'Verified'
                        ? 'rgba(52,168,83,0.3)' : 'rgba(234,179,8,0.3)'}`,
                    }}>{row.status.toUpperCase()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Classification Accuracy Chart (Recharts) */}
          <div style={{ marginBottom: 80 }}>
            <h2 style={{ fontSize: '1.3rem', marginBottom: 24, color: '#fff' }}>
              {t('aiVision.categories')} — {t('aiVision.accuracyDist')}
            </h2>
            <div style={{
              background: '#0a0a0a', border: '1px solid #1a1a1a',
              borderRadius: 12, padding: 32,
            }}>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={classificationData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1a1a1a" />
                  <XAxis dataKey="name" stroke="#64748B" fontFamily="var(--font-mono)" fontSize={12} />
                  <YAxis stroke="#64748B" fontFamily="var(--font-mono)" fontSize={12} domain={[95, 100]} />
                  <Tooltip
                    contentStyle={{
                      background: '#111', border: '1px solid #1a1a1a',
                      borderRadius: 8, fontFamily: 'var(--font-mono)', fontSize: '0.8rem',
                    }}
                    labelStyle={{ color: '#fff' }}
                    formatter={(val) => [`${val}%`, t('aiVision.accuracyLabel')]}
                  />
                  <Bar dataKey="accuracy" radius={[6, 6, 0, 0]}>
                    {classificationData.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 4. API + Neural Network — dual column */}
          <div className="grid-2" style={{ marginBottom: 80 }}>
            {/* API-First Architecture */}
            <div className="card">
              <Cloud size={28} color="#4285F4" style={{ marginBottom: 16 }} />
              <h3 style={{ fontSize: '1.1rem', marginBottom: 12, color: '#fff' }}>
                {t('aiVision.apiTitle')}
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#64748B', lineHeight: 1.7, marginBottom: 20 }}>
                {t('aiVision.apiDesc')}
              </p>

              {/* Feature tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
                {['RESTful API', 'WebSocket', 'Batch Processing', 'Edge SDK'].map((tag, i) => (
                  <span key={i} style={{
                    padding: '5px 12px', borderRadius: 100, fontSize: '0.65rem',
                    fontFamily: 'var(--font-mono)', background: 'rgba(66,133,244,0.08)',
                    color: '#4285F4', border: '1px solid rgba(66,133,244,0.2)',
                  }}>{tag}</span>
                ))}
              </div>

              {/* Code snippet */}
              <div style={{
                padding: 16, background: '#050505', borderRadius: 8,
                fontFamily: 'var(--font-mono)', fontSize: '0.7rem', lineHeight: 1.8,
                border: '1px solid #1a1a1a',
              }}>
                <div style={{ color: '#475569' }}>// classify material</div>
                <div><span style={{ color: '#4285F4' }}>POST</span> <span style={{ color: '#94A3B8' }}>/v2/classify</span></div>
                <div style={{ color: '#475569', marginTop: 8 }}>// response</div>
                <div style={{ color: '#94A3B8' }}>{'{'}</div>
                <div style={{ color: '#94A3B8', paddingLeft: 16 }}>"material": <span style={{ color: '#34A853' }}>"PET"</span>,</div>
                <div style={{ color: '#94A3B8', paddingLeft: 16 }}>"confidence": <span style={{ color: '#4285F4' }}>0.998</span>,</div>
                <div style={{ color: '#94A3B8', paddingLeft: 16 }}>"spectral_sig": <span style={{ color: '#4285F4' }}>"0.9821"</span></div>
                <div style={{ color: '#94A3B8' }}>{'}'}</div>
              </div>
            </div>

            {/* Neural Network Inference Pipeline */}
            <div className="card">
              <Brain size={28} color="#34A853" style={{ marginBottom: 16 }} />
              <h3 style={{ fontSize: '1.1rem', marginBottom: 12, color: '#fff' }}>
                {t('aiVision.neuralTitle')}
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#64748B', lineHeight: 1.7, marginBottom: 20 }}>
                {t('aiVision.neuralDesc')}
              </p>

              {/* 5-layer pipeline */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {nnLayers.map((layer, i) => (
                  <div key={i}>
                    <div style={{
                      display: 'flex', alignItems: 'center', gap: 12,
                      padding: '10px 14px', background: '#050505',
                      borderRadius: 8, border: '1px solid #1a1a1a',
                    }}>
                      {/* Node dots */}
                      <div style={{ display: 'flex', gap: 4, flexShrink: 0 }}>
                        {Array.from({ length: layer.nodes }).map((_, j) => (
                          <div key={j} style={{
                            width: 8, height: 8, borderRadius: '50%',
                            background: `${layer.color}40`, border: `1px solid ${layer.color}60`,
                          }} />
                        ))}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{
                          fontFamily: 'var(--font-mono)', fontSize: '0.7rem',
                          color: layer.color, fontWeight: 500,
                        }}>{layer.label}</div>
                        <div style={{ fontSize: '0.6rem', color: '#475569' }}>{layer.desc}</div>
                      </div>
                    </div>
                    {/* Connector arrow */}
                    {i < nnLayers.length - 1 && (
                      <div style={{
                        display: 'flex', justifyContent: 'center', padding: '2px 0',
                        color: '#1a1a1a', fontSize: '0.7rem',
                      }}>▼</div>
                    )}
                  </div>
                ))}
              </div>

              {/* Model tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 16 }}>
                {['CNN', 'Transformer', 'NIR Spectral', 'Multi-Modal'].map((m, i) => (
                  <span key={i} style={{
                    padding: '5px 12px', borderRadius: 100, fontSize: '0.65rem',
                    fontFamily: 'var(--font-mono)', background: 'rgba(52,168,83,0.08)',
                    color: '#34A853', border: '1px solid rgba(52,168,83,0.2)',
                  }}>{m}</span>
                ))}
              </div>
            </div>
          </div>

          {/* 5. Bottom CTA */}
          <div className="cta-box" style={{
            background: '#0a0a0a', border: '1px solid #1a1a1a',
            borderRadius: 12, padding: '48px 40px',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            flexWrap: 'wrap', gap: 24,
          }}>
            <div>
              <h3 style={{ fontSize: '1.2rem', color: '#fff', marginBottom: 8 }}>
                {t('aiVision.ctaTitle')}
              </h3>
              <p style={{ fontSize: '0.9rem', color: '#64748B' }}>
                {t('aiVision.ctaDesc')}
              </p>
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              <Link to="/nexus" className="btn-primary">
                {t('aiVision.ctaBtn1')} <ArrowRight size={16} />
              </Link>
              <Link to="/partners" className="btn-outline">
                {t('aiVision.ctaBtn2')} <ArrowRight size={16} />
              </Link>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default AIVision;
