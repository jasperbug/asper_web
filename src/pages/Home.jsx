import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowRight, Database, Cpu, Leaf, Link2, Brain, Activity, Shield, Globe } from 'lucide-react';
import AnimatedCounter from '../components/AnimatedCounter';

// 數據格子視覺化元件
const DataGridVis = () => {
  const cells = useMemo(() => {
    const data = [];
    for (let row = 0; row < 6; row++) {
      for (let col = 0; col < 8; col++) {
        const value = Math.floor(Math.random() * 900 + 100);
        const isHighlightBlue = Math.random() < 0.15;
        const isHighlightGreen = !isHighlightBlue && Math.random() < 0.12;
        data.push({ value, isHighlightBlue, isHighlightGreen, row, col });
      }
    }
    return data;
  }, []);

  return (
    <div style={{
      background: '#0a0a0a', border: '1px solid #1a1a1a', borderRadius: 12,
      padding: 20, overflow: 'hidden',
    }}>
      {/* Header row */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: 2,
        marginBottom: 4,
      }}>
        {['ID', 'MAT', 'SPEC', 'CONF', 'LAT', 'LON', 'TS', 'SIG'].map((h, i) => (
          <div key={i} style={{
            padding: '6px 4px', textAlign: 'center',
            fontFamily: 'var(--font-mono)', fontSize: '0.55rem',
            color: '#475569', letterSpacing: '0.1em',
          }}>{h}</div>
        ))}
      </div>
      {/* Data cells */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: 2,
      }}>
        {cells.map((cell, i) => (
          <div key={i} style={{
            padding: '8px 4px', textAlign: 'center',
            fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
            borderRadius: 4,
            background: cell.isHighlightBlue
              ? 'rgba(66,133,244,0.15)'
              : cell.isHighlightGreen
                ? 'rgba(52,168,83,0.15)'
                : 'rgba(255,255,255,0.02)',
            color: cell.isHighlightBlue
              ? '#4285F4'
              : cell.isHighlightGreen
                ? '#34A853'
                : '#475569',
            border: cell.isHighlightBlue
              ? '1px solid rgba(66,133,244,0.2)'
              : cell.isHighlightGreen
                ? '1px solid rgba(52,168,83,0.2)'
                : '1px solid transparent',
          }}>
            {cell.value}
          </div>
        ))}
      </div>
      {/* Footer */}
      <div style={{
        marginTop: 12, display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', padding: '8px 4px',
        borderTop: '1px solid #1a1a1a',
      }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: '#475569' }}>
          48 data nodes ● streaming
        </span>
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: '0.55rem',
          color: '#34A853', display: 'flex', alignItems: 'center', gap: 4,
        }}>
          <span style={{
            width: 6, height: 6, borderRadius: '50%',
            background: '#34A853', display: 'inline-block',
            animation: 'pulse 2s infinite',
          }} />
          LIVE
        </span>
      </div>
    </div>
  );
};

const Home = () => {
  const { t } = useTranslation();

  const features = [
    { icon: Database, title: t('nav.aiVision'), desc: '100M+ AI-labeled images', path: '/ai-vision', color: '#4285F4' },
    { icon: Cpu, title: t('nav.nexus'), desc: 'Carbon tracking OS', path: '/nexus', color: '#34A853' },
    { icon: Link2, title: t('nav.supply'), desc: 'Digital material passports', path: '/supply-chain', color: '#4285F4' },
  ];

  return (
    <div>
      {/* Hero */}
      <section style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center',
        position: 'relative', paddingTop: 64,
      }}>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: 800 }}>
            <div className="tag" style={{ marginBottom: 24 }}>Global Environmental Data Infrastructure</div>
            <h1 style={{
              fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1.1,
              marginBottom: 24, fontWeight: 700,
            }}>
              <span style={{ color: '#fff' }}>{t('hero.headline')}</span><br />
              <span style={{
                background: 'linear-gradient(135deg, #4285F4, #34A853)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>{t('hero.headline2')}</span>
            </h1>
            <p style={{
              fontSize: '1.15rem', color: '#94A3B8', maxWidth: 600,
              marginBottom: 40, lineHeight: 1.8,
            }}>{t('hero.subtext')}</p>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <Link to="/ai-vision" className="btn-primary">
                {t('hero.cta1')} <ArrowRight size={16} />
              </Link>
              <Link to="/nexus" className="btn-outline">
                {t('hero.cta2')} <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          {/* Stats row */}
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: 32, marginTop: 100, paddingTop: 48,
            borderTop: '1px solid rgba(255,255,255,0.05)',
          }}>
            {[
              { value: 100, suffix: 'M+', label: t('stats.images'), delay: 0 },
              { value: 50, suffix: 'M+', label: t('stats.spectral'), delay: 150 },
              { value: 99.7, suffix: '%', label: t('stats.accuracy'), delay: 300 },
              { value: 45, suffix: '+', label: t('stats.partners'), delay: 450 },
            ].map((stat, i) => (
              <div key={i}>
                <div className="metric-value">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} delay={stat.delay} />
                </div>
                <div className="metric-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Cards */}
      <section className="section" style={{ paddingTop: 60 }}>
        <div className="container">
          <div className="grid-4">
            {[
              { icon: Database, value: 100, suffix: 'M+', label: 'Labeled Images', color: '#4285F4', delay: 0 },
              { icon: Brain, value: 99.7, suffix: '%', label: 'Model Accuracy', color: '#34A853', delay: 150 },
              { icon: Activity, value: 12, suffix: 'B+', label: 'Data Points Processed', color: '#4285F4', delay: 300 },
              { icon: Globe, value: 47, suffix: '+', label: 'Countries Deployed', color: '#34A853', delay: 450 },
            ].map((stat, i) => (
              <div key={i} className="card" style={{ textAlign: 'center', padding: '28px 20px' }}>
                <stat.icon size={28} color={stat.color} style={{ marginBottom: 14 }} />
                <div className="metric-value" style={{ fontSize: '2rem', marginBottom: 6 }}>
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} delay={stat.delay} duration={2200} />
                </div>
                <div className="metric-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Infrastructure at Scale */}
      <section className="section">
        <div className="container">
          <div className="infra-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
            {/* Left: Text */}
            <div>
              <div className="tag" style={{ marginBottom: 20 }}>Platform</div>
              <h2 className="section-title" style={{ marginBottom: 16 }}>Infrastructure at Scale</h2>
              <p style={{
                fontSize: '1rem', color: '#94A3B8', lineHeight: 1.8, marginBottom: 32,
              }}>
                Processing billions of data points across global recycling and decarbonization networks. Our distributed platform powers real-time decision making at every node.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {[
                  { icon: Brain, text: 'AI-Powered Material Classification', color: '#4285F4' },
                  { icon: Activity, text: 'Real-time Carbon Tracking', color: '#34A853' },
                  { icon: Shield, text: 'Blockchain-Verified Supply Chain', color: '#4285F4' },
                  { icon: Globe, text: 'Edge Computing Deployment', color: '#34A853' },
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: 8,
                      background: `${item.color}12`, border: `1px solid ${item.color}30`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                    }}>
                      <item.icon size={18} color={item.color} />
                    </div>
                    <span style={{ fontSize: '0.9rem', color: '#cbd5e1', fontFamily: 'var(--font-mono)' }}>
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Data Grid Visualization */}
            <DataGridVis />
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="section">
        <div className="container">
          <div className="grid-4">
            {features.map((f, i) => (
              <Link to={f.path} key={i} className="card" style={{ textDecoration: 'none' }}>
                <f.icon size={28} color={f.color} style={{ marginBottom: 16 }} />
                <h3 style={{ fontSize: '1rem', marginBottom: 8, color: '#fff' }}>{f.title}</h3>
                <p style={{ fontSize: '0.875rem', color: '#64748B' }}>{f.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
