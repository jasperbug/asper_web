import { useTranslation } from 'react-i18next';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { ArrowRight, Droplets, Cpu, FlaskConical, Package, Truck } from 'lucide-react';
import AnimatedCounter from '../components/AnimatedCounter';

const BioInfrastructure = () => {
  const { t } = useTranslation();

  const steps = [
    { icon: Droplets, key: 'step1', color: '#94A3B8' },
    { icon: Cpu, key: 'step2', color: '#4285F4' },
    { icon: FlaskConical, key: 'step3', color: '#34A853' },
    { icon: Package, key: 'step4', color: '#4285F4' },
    { icon: Truck, key: 'step5', color: '#34A853' },
  ];

  const metricsData = [
    { key: 'throughput', end: 50, suffix: 'T', unit: '/day', color: '#4285F4', delay: 0 },
    { key: 'conversion', end: 94, suffix: '%', unit: '', color: '#34A853', delay: 150 },
    { key: 'proteinYield', end: 78, suffix: '%', unit: '', color: '#4285F4', delay: 300 },
    { key: 'energySaved', end: 62, suffix: '%', unit: '', color: '#34A853', delay: 450 },
  ];

  const optimizationChart = [
    { name: 'Q1', throughput: 32, conversion: 85 },
    { name: 'Q2', throughput: 38, conversion: 88 },
    { name: 'Q3', throughput: 44, conversion: 91 },
    { name: 'Q4', throughput: 50, conversion: 94 },
  ];

  return (
    <div style={{ paddingTop: 64 }}>
      <section className="section">
        <div className="container">
          <div className="tag" style={{ marginBottom: 24 }}>Biotechnology</div>
          <h1 className="section-title" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
            {t('bio.title')}
          </h1>
          <p className="section-subtitle">{t('bio.subtitle')}</p>

          {/* Process Flow */}
          <div style={{ marginBottom: 80 }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: 32, color: '#fff' }}>
              {t('bio.processTitle')}
            </h2>
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              gap: 0, flexWrap: 'wrap',
            }}>
              {steps.map((step, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12,
                    padding: '24px 20px', background: '#111', border: '1px solid #1a1a1a',
                    borderRadius: 12, minWidth: 140,
                  }}>
                    <div style={{
                      width: 48, height: 48, borderRadius: '50%',
                      background: `${step.color}15`, border: `1px solid ${step.color}30`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <step.icon size={22} color={step.color} />
                    </div>
                    <span style={{
                      fontFamily: 'var(--font-mono)', fontSize: '0.7rem',
                      color: '#94A3B8', textAlign: 'center',
                    }}>{t(`bio.${step.key}`)}</span>
                    <span style={{
                      fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
                      color: '#475569',
                    }}>STEP {i + 1}</span>
                  </div>
                  {i < steps.length - 1 && (
                    <ArrowRight size={16} color="#1a1a1a" style={{ margin: '0 4px', flexShrink: 0 }} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Optimization Metrics */}
          <div style={{ marginBottom: 80 }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: 32, color: '#fff' }}>
              {t('bio.optimizationTitle')}
            </h2>
            <div className="grid-4" style={{ marginBottom: 48 }}>
              {metricsData.map((m, i) => (
                <div key={i} className="card" style={{ textAlign: 'center' }}>
                  <div className="metric-value">
                    <AnimatedCounter end={m.end} suffix={m.suffix} delay={m.delay} />
                    {m.unit && <span style={{ fontSize: '1.2rem' }}>{m.unit}</span>}
                  </div>
                  <div className="metric-label">{t(`bio.${m.key}`)}</div>
                </div>
              ))}
            </div>

            <div style={{
              background: '#111', border: '1px solid #1a1a1a',
              borderRadius: 12, padding: 32,
            }}>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={optimizationChart}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1a1a1a" />
                  <XAxis dataKey="name" stroke="#64748B" fontFamily="var(--font-mono)" fontSize={12} />
                  <YAxis stroke="#64748B" fontFamily="var(--font-mono)" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      background: '#1a1a1a', border: '1px solid #333',
                      borderRadius: 8, fontFamily: 'var(--font-mono)',
                    }}
                  />
                  <Bar dataKey="throughput" fill="#4285F4" radius={[4, 4, 0, 0]} name="Throughput (T)" />
                  <Bar dataKey="conversion" fill="#34A853" radius={[4, 4, 0, 0]} name="Conversion (%)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BioInfrastructure;
