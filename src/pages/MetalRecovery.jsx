import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from 'recharts';
import {
  ArrowRight, Cpu, Shield, Flame, Factory,
  Recycle, BarChart3, Layers, ThermometerSun,
} from 'lucide-react';
import AnimatedCounter from '../components/AnimatedCounter';

const CarbonFiberRecovery = () => {
  const { t } = useTranslation();

  /* ── Fiber grade yield data ── */
  const gradeData = [
    { name: 'Grade A', retention: 95.2, color: '#4285F4' },
    { name: 'Grade B', retention: 92.8, color: '#34A853' },
    { name: 'Grade C', retention: 89.5, color: '#4285F4' },
    { name: 'Grade D', retention: 86.1, color: '#34A853' },
    { name: 'Grade E', retention: 82.7, color: '#94A3B8' },
    { name: 'Milled', retention: 78.3, color: '#94A3B8' },
  ];

  /* ── Capabilities ── */
  const capabilities = [
    {
      icon: Flame,
      title: t('metal.cap1Title'),
      desc: t('metal.cap1Desc'),
      color: '#EAB308',
    },
    {
      icon: Factory,
      title: t('metal.cap2Title'),
      desc: t('metal.cap2Desc'),
      color: '#4285F4',
    },
    {
      icon: Cpu,
      title: t('metal.cap3Title'),
      desc: t('metal.cap3Desc'),
      color: '#34A853',
    },
    {
      icon: Recycle,
      title: t('metal.cap4Title'),
      desc: t('metal.cap4Desc'),
      color: '#34A853',
    },
    {
      icon: BarChart3,
      title: t('metal.cap5Title'),
      desc: t('metal.cap5Desc'),
      color: '#4285F4',
    },
    {
      icon: Shield,
      title: t('metal.cap6Title'),
      desc: t('metal.cap6Desc'),
      color: '#EAB308',
    },
  ];

  return (
    <div style={{ paddingTop: 64 }}>
      <section className="section">
        <div className="container">

          {/* ── 1. Hero ── */}
          <div className="tag" style={{ marginBottom: 24 }}>{t('metal.tag')}</div>
          <h1 className="section-title" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
            {t('metal.title')}
          </h1>
          <p className="section-subtitle">{t('metal.subtitle')}</p>

          {/* ── 2. Metric Cards ── */}
          <div className="grid-4" style={{ marginBottom: 80 }}>
            {[
              { icon: ThermometerSun, end: 95, suffix: '%', label: t('metal.propertyRetention'), color: '#4285F4', delay: 0 },
              { icon: Factory, end: 500, suffix: 't', label: t('metal.annualCapacity'), color: '#34A853', delay: 150 },
              { icon: Recycle, end: 60, suffix: '%', label: t('metal.carbonReduction'), color: '#34A853', delay: 300 },
              { icon: Layers, end: 8, suffix: '+', label: t('metal.fiberGrades'), color: '#4285F4', delay: 450 },
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

          {/* ── 3. Overview ── */}
          <div className="cta-box" style={{
            marginBottom: 80, background: '#0a0a0a', border: '1px solid #1a1a1a',
            borderRadius: 12, padding: '40px 40px',
          }}>
            <h2 style={{ fontSize: '1.3rem', color: '#fff', marginBottom: 20 }}>
              {t('metal.overviewTitle')}
            </h2>
            <p style={{
              fontSize: '0.95rem', color: '#94A3B8', lineHeight: 1.9,
              fontFamily: 'var(--font-body)',
            }}>
              {t('metal.overviewDesc')}
            </p>
          </div>

          {/* ── 4. Property Retention Chart ── */}
          <div style={{ marginBottom: 80 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <h2 style={{ fontSize: '1.3rem', color: '#fff', margin: 0 }}>
                {t('metal.chartTitle')}
              </h2>
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
                color: '#4285F4', display: 'flex', alignItems: 'center', gap: 6,
              }}>
                <span style={{
                  width: 7, height: 7, borderRadius: '50%', background: '#4285F4',
                  display: 'inline-block', animation: 'pulse 2s infinite',
                }} />
                {t('metal.latestBatch')}
              </span>
            </div>

            <div style={{
              background: '#0a0a0a', border: '1px solid #1a1a1a',
              borderRadius: 12, padding: 32,
            }}>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={gradeData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1a1a1a" />
                  <XAxis dataKey="name" stroke="#64748B" fontFamily="var(--font-mono)" fontSize={12} />
                  <YAxis stroke="#64748B" fontFamily="var(--font-mono)" fontSize={12} domain={[70, 100]} />
                  <Tooltip
                    contentStyle={{
                      background: '#111', border: '1px solid #1a1a1a',
                      borderRadius: 8, fontFamily: 'var(--font-mono)', fontSize: '0.8rem',
                    }}
                    labelStyle={{ color: '#fff' }}
                    formatter={(val) => [`${val}%`, t('metal.retentionLabel')]}
                  />
                  <Bar dataKey="retention" radius={[6, 6, 0, 0]}>
                    {gradeData.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* ── 5. Capabilities Grid ── */}
          <div style={{ marginBottom: 80 }}>
            <h2 style={{ fontSize: '1.3rem', marginBottom: 32, color: '#fff' }}>
              {t('metal.capabilitiesTitle')}
            </h2>
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: 16,
            }}>
              {capabilities.map((cap, i) => (
                <div key={i} style={{
                  padding: '24px', background: '#0a0a0a', border: '1px solid #1a1a1a',
                  borderRadius: 12, transition: 'border-color 0.2s',
                }}
                  onMouseOver={e => e.currentTarget.style.borderColor = '#333'}
                  onMouseOut={e => e.currentTarget.style.borderColor = '#1a1a1a'}
                >
                  <cap.icon size={22} color={cap.color} style={{ marginBottom: 12 }} />
                  <h4 style={{
                    fontSize: '0.95rem', color: '#fff', marginBottom: 8,
                    fontFamily: 'var(--font-mono)',
                  }}>{cap.title}</h4>
                  <p style={{ fontSize: '0.8rem', color: '#64748B', lineHeight: 1.7 }}>
                    {cap.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ── 9. Bottom CTA ── */}
          <div className="cta-box" style={{
            background: '#0a0a0a', border: '1px solid #1a1a1a',
            borderRadius: 12, padding: '48px 40px',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            flexWrap: 'wrap', gap: 24,
          }}>
            <div>
              <h3 style={{ fontSize: '1.2rem', color: '#fff', marginBottom: 8 }}>
                {t('metal.ctaTitle')}
              </h3>
              <p style={{ fontSize: '0.9rem', color: '#64748B' }}>
                {t('metal.ctaDesc')}
              </p>
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              <Link to="/supply-chain" className="btn-primary">
                {t('metal.ctaBtn1')} <ArrowRight size={16} />
              </Link>
              <Link to="/partners" className="btn-outline">
                {t('metal.ctaBtn2')} <ArrowRight size={16} />
              </Link>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default CarbonFiberRecovery;
