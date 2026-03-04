import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import {
  AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer,
} from 'recharts';
import {
  Activity, Cpu, Leaf, BarChart3, ArrowRight, Cloud, Server, Radio,
  Shield, Zap, Globe, Database, Workflow,
} from 'lucide-react';
import AnimatedCounter from '../components/AnimatedCounter';

const NexusOS = () => {
  const { t } = useTranslation();

  /* ── data ── */
  const carbonData = Array.from({ length: 12 }, (_, i) => ({
    month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i],
    reduction: Math.floor(20 + i * 7 + Math.random() * 5),
    target: 20 + i * 8,
  }));

  const monitorRows = useMemo(() => [
    { id: 'FT-TW-001', type: 'Solar Array', location: 'Tainan', co2: 12.4, status: 'Active', delta: -3.2 },
    { id: 'FT-TW-002', type: 'BSF Reactor', location: 'Kaohsiung', co2: 8.7, status: 'Active', delta: -5.1 },
    { id: 'FT-JP-003', type: 'Recycling Hub', location: 'Osaka', co2: 22.1, status: 'Active', delta: -1.8 },
    { id: 'FT-KR-004', type: 'IoT Gateway', location: 'Seoul', co2: 5.3, status: 'Active', delta: -4.7 },
    { id: 'FT-TW-005', type: 'Carbon Sink', location: 'Hsinchu', co2: 0.9, status: 'Verified', delta: -8.3 },
    { id: 'FT-JP-006', type: 'Waste Sorting', location: 'Tokyo', co2: 15.6, status: 'Active', delta: -2.4 },
    { id: 'FT-KR-007', type: 'Energy Grid', location: 'Busan', co2: 18.2, status: 'Pending', delta: -1.1 },
    { id: 'FT-TW-008', type: 'Material Recovery', location: 'Taichung', co2: 6.8, status: 'Active', delta: -6.0 },
  ], []);

  const pipelineSteps = [
    { label: 'Data Ingestion', desc: 'IoT + Edge Sensors', color: '#94A3B8', nodes: 4 },
    { label: 'Validation Layer', desc: 'Anomaly Detection', color: '#4285F4', nodes: 5 },
    { label: 'Carbon Accounting', desc: 'GHG Protocol Engine', color: '#4285F4', nodes: 6 },
    { label: 'Credit Issuance', desc: 'Blockchain Notarized', color: '#34A853', nodes: 4 },
    { label: 'Registry Sync', desc: 'Verra / Gold Standard', color: '#34A853', nodes: 3 },
  ];

  const iotFlow = [
    { label: 'IoT Sensors', icon: Radio, color: '#4285F4' },
    { label: 'Edge Computing', icon: Cpu, color: '#94A3B8' },
    { label: 'Nexus OS Core', icon: BarChart3, color: '#4285F4' },
    { label: 'Carbon Ledger', icon: Shield, color: '#34A853' },
    { label: 'Credit Market', icon: Leaf, color: '#34A853' },
  ];

  const gridCols = '90px 100px 90px 80px 80px 80px';

  return (
    <div style={{ paddingTop: 64 }}>
      <section className="section">
        <div className="container">

          {/* ── 1. Hero ── */}
          <div className="tag" style={{ marginBottom: 24 }}>{t('nexus.tag')}</div>
          <h1 className="section-title" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
            {t('nexus.title')}
          </h1>
          <p className="section-subtitle">{t('nexus.subtitle')}</p>

          {/* ── 2. Metric Cards ── */}
          <div className="grid-4" style={{ marginBottom: 80 }}>
            {[
              { icon: Leaf, end: 42, suffix: '%', label: t('nexus.carbonReduction'), color: '#34A853', delay: 0 },
              { icon: Zap, end: 87, suffix: '%', label: t('nexus.energyEfficiency'), color: '#4285F4', delay: 150 },
              { icon: Activity, end: 93, suffix: '%', label: t('nexus.materialRecovery'), color: '#34A853', delay: 300 },
              { icon: Shield, end: 99.9, suffix: '%', label: t('nexus.traceability'), color: '#4285F4', delay: 450 },
            ].map((m, i) => (
              <div key={i} className="card" style={{ textAlign: 'center', padding: '28px 20px' }}>
                <m.icon size={28} color={m.color} style={{ marginBottom: 14 }} />
                <div className="metric-value" style={{ fontSize: '2rem', marginBottom: 6 }}>
                  <AnimatedCounter end={m.end} suffix={m.suffix} delay={m.delay} duration={2000} />
                </div>
                <div className="metric-label">{t(`nexus.${['carbonReduction','energyEfficiency','materialRecovery','traceability'][i]}`)}</div>
              </div>
            ))}
          </div>

          {/* ── 3. Carbon-Link Dashboard ── */}
          <div style={{ marginBottom: 80 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <h2 style={{ fontSize: '1.3rem', color: '#fff', margin: 0 }}>
                {t('nexus.dashboard')}
              </h2>
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
                color: '#34A853', display: 'flex', alignItems: 'center', gap: 6,
              }}>
                <span style={{
                  width: 7, height: 7, borderRadius: '50%', background: '#34A853',
                  display: 'inline-block', animation: 'pulse 2s infinite',
                }} />
                {t('nexus.liveWindow')}
              </span>
            </div>

            <div style={{
              background: '#0a0a0a', border: '1px solid #1a1a1a',
              borderRadius: 12, padding: 32,
            }}>
              {/* Time range buttons */}
              <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
                {['1D', '1W', '1M', '1Y'].map((p, i) => (
                  <button key={i} style={{
                    padding: '4px 14px', borderRadius: 4, border: 'none',
                    background: i === 3 ? 'rgba(66,133,244,0.2)' : 'transparent',
                    color: i === 3 ? '#4285F4' : '#64748B',
                    fontFamily: 'var(--font-mono)', fontSize: '0.7rem', cursor: 'pointer',
                  }}>{p}</button>
                ))}
              </div>

              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={carbonData}>
                  <defs>
                    <linearGradient id="colorReduction" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#34A853" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#34A853" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1a1a1a" />
                  <XAxis dataKey="month" stroke="#64748B" fontFamily="var(--font-mono)" fontSize={11} />
                  <YAxis stroke="#64748B" fontFamily="var(--font-mono)" fontSize={11} />
                  <Tooltip
                    contentStyle={{
                      background: '#111', border: '1px solid #1a1a1a',
                      borderRadius: 8, fontFamily: 'var(--font-mono)', fontSize: '0.8rem',
                    }}
                    labelStyle={{ color: '#fff' }}
                    formatter={(val, name) => [`${val}%`, name === 'reduction' ? t('nexus.co2Label') : t('nexus.targetLabel')]}
                  />
                  <Area type="monotone" dataKey="reduction" stroke="#34A853" fill="url(#colorReduction)" strokeWidth={2} />
                  <Line type="monotone" dataKey="target" stroke="#4285F4" strokeDasharray="5 5" strokeWidth={1} dot={false} />
                </AreaChart>
              </ResponsiveContainer>

              {/* Legend */}
              <div style={{
                display: 'flex', gap: 24, marginTop: 16, paddingTop: 12,
                borderTop: '1px solid #1a1a1a',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 12, height: 3, background: '#34A853', borderRadius: 2 }} />
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#64748B' }}>
                    {t('nexus.actualReduction')}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 12, height: 3, background: '#4285F4', borderRadius: 2, borderStyle: 'dashed' }} />
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#64748B' }}>
                    {t('nexus.targetTrajectory')}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ── 4. Real-Time Monitoring Grid ── */}
          <div style={{ marginBottom: 80 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <h2 style={{ fontSize: '1.3rem', color: '#fff', margin: 0 }}>
                {t('nexus.facilityTitle')}
              </h2>
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
                color: '#34A853', display: 'flex', alignItems: 'center', gap: 6,
              }}>
                <span style={{
                  width: 7, height: 7, borderRadius: '50%', background: '#34A853',
                  display: 'inline-block', animation: 'pulse 2s infinite',
                }} />
                {t('nexus.liveFacilities', { count: monitorRows.length })}
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
                <span>Facility ID</span>
                <span>Type</span>
                <span>Location</span>
                <span style={{ textAlign: 'center' }}>CO₂ (t)</span>
                <span style={{ textAlign: 'center' }}>Δ MoM</span>
                <span style={{ textAlign: 'right' }}>Status</span>
              </div>
              {/* Rows */}
              {monitorRows.map((row, i) => (
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
                    {row.type}
                  </span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#94A3B8' }}>
                    {row.location}
                  </span>
                  <span style={{
                    fontFamily: 'var(--font-mono)', fontSize: '0.8rem', textAlign: 'center',
                    color: row.co2 < 10 ? '#34A853' : '#fff',
                  }}>
                    {row.co2}
                  </span>
                  <span style={{
                    fontFamily: 'var(--font-mono)', fontSize: '0.75rem', textAlign: 'center',
                    color: '#34A853',
                  }}>
                    {row.delta}%
                  </span>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{
                      padding: '3px 10px', borderRadius: 100, fontSize: '0.6rem',
                      fontFamily: 'var(--font-mono)',
                      background: row.status === 'Active'
                        ? 'rgba(52,168,83,0.1)'
                        : row.status === 'Verified'
                          ? 'rgba(66,133,244,0.1)'
                          : 'rgba(234,179,8,0.1)',
                      color: row.status === 'Active'
                        ? '#34A853'
                        : row.status === 'Verified'
                          ? '#4285F4'
                          : '#EAB308',
                      border: `1px solid ${
                        row.status === 'Active'
                          ? 'rgba(52,168,83,0.3)'
                          : row.status === 'Verified'
                            ? 'rgba(66,133,244,0.3)'
                            : 'rgba(234,179,8,0.3)'
                      }`,
                    }}>{row.status.toUpperCase()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── 5. System Architecture — dual column ── */}
          <div className="grid-2" style={{ marginBottom: 80 }}>
            {/* Edge Computing Architecture */}
            <div className="card">
              <Server size={28} color="#4285F4" style={{ marginBottom: 16 }} />
              <h3 style={{ fontSize: '1.1rem', marginBottom: 12, color: '#fff' }}>
                {t('nexus.edgeTitle')}
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#64748B', lineHeight: 1.7, marginBottom: 20 }}>
                {t('nexus.edgeDesc')}
              </p>

              {/* Tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
                {['MQTT', 'gRPC', 'Edge TPU', 'K8s Cluster', 'WASM'].map((tag, i) => (
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
                <div style={{ color: '#475569' }}>// submit carbon reading</div>
                <div><span style={{ color: '#4285F4' }}>POST</span> <span style={{ color: '#94A3B8' }}>/v1/nexus/readings</span></div>
                <div style={{ color: '#475569', marginTop: 8 }}>// payload</div>
                <div style={{ color: '#94A3B8' }}>{'{'}</div>
                <div style={{ color: '#94A3B8', paddingLeft: 16 }}>"facility_id": <span style={{ color: '#34A853' }}>"FT-TW-001"</span>,</div>
                <div style={{ color: '#94A3B8', paddingLeft: 16 }}>"co2_tons": <span style={{ color: '#4285F4' }}>12.4</span>,</div>
                <div style={{ color: '#94A3B8', paddingLeft: 16 }}>"verified": <span style={{ color: '#34A853' }}>true</span>,</div>
                <div style={{ color: '#94A3B8', paddingLeft: 16 }}>"timestamp": <span style={{ color: '#4285F4' }}>"2025-01-15T08:30:00Z"</span></div>
                <div style={{ color: '#94A3B8' }}>{'}'}</div>
              </div>
            </div>

            {/* Carbon Credit Pipeline */}
            <div className="card">
              <Leaf size={28} color="#34A853" style={{ marginBottom: 16 }} />
              <h3 style={{ fontSize: '1.1rem', marginBottom: 12, color: '#fff' }}>
                {t('nexus.pipelineTitle')}
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#64748B', lineHeight: 1.7, marginBottom: 20 }}>
                {t('nexus.pipelineDesc')}
              </p>

              {/* 5-step pipeline */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {pipelineSteps.map((step, i) => (
                  <div key={i}>
                    <div style={{
                      display: 'flex', alignItems: 'center', gap: 12,
                      padding: '10px 14px', background: '#050505',
                      borderRadius: 8, border: '1px solid #1a1a1a',
                    }}>
                      {/* Node dots */}
                      <div style={{ display: 'flex', gap: 4, flexShrink: 0 }}>
                        {Array.from({ length: step.nodes }).map((_, j) => (
                          <div key={j} style={{
                            width: 8, height: 8, borderRadius: '50%',
                            background: `${step.color}40`, border: `1px solid ${step.color}60`,
                          }} />
                        ))}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{
                          fontFamily: 'var(--font-mono)', fontSize: '0.7rem',
                          color: step.color, fontWeight: 500,
                        }}>{step.label}</div>
                        <div style={{ fontSize: '0.6rem', color: '#475569' }}>{step.desc}</div>
                      </div>
                    </div>
                    {/* Connector */}
                    {i < pipelineSteps.length - 1 && (
                      <div style={{
                        display: 'flex', justifyContent: 'center', padding: '2px 0',
                        color: '#1a1a1a', fontSize: '0.7rem',
                      }}>▼</div>
                    )}
                  </div>
                ))}
              </div>

              {/* Certification tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 16 }}>
                {['Verra VCS', 'Gold Standard', 'ISO 14064', 'GHG Protocol'].map((m, i) => (
                  <span key={i} style={{
                    padding: '5px 12px', borderRadius: 100, fontSize: '0.65rem',
                    fontFamily: 'var(--font-mono)', background: 'rgba(52,168,83,0.08)',
                    color: '#34A853', border: '1px solid rgba(52,168,83,0.2)',
                  }}>{m}</span>
                ))}
              </div>
            </div>
          </div>

          {/* ── 6. IoT Data Flow ── */}
          <div style={{ marginBottom: 80 }}>
            <h2 style={{ fontSize: '1.3rem', marginBottom: 32, color: '#fff', textAlign: 'center' }}>
              {t('nexus.iot')}
            </h2>
            <div className="iot-flow" style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              gap: 0, flexWrap: 'wrap', padding: '32px 0',
            }}>
              {iotFlow.map((step, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center' }} className={i < iotFlow.length - 1 ? 'iot-flow' : ''}>
                  <div style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12,
                    padding: '24px 28px', background: '#0a0a0a', border: '1px solid #1a1a1a',
                    borderRadius: 12, minWidth: 110,
                  }}>
                    <step.icon size={28} color={step.color} />
                    <span style={{
                      fontFamily: 'var(--font-mono)', fontSize: '0.7rem',
                      color: step.color, textAlign: 'center',
                    }}>{step.label}</span>
                  </div>
                  {i < iotFlow.length - 1 && (
                    <div className="iot-connector" style={{
                      width: 40, height: 2,
                      background: 'linear-gradient(90deg, #1a1a1a, #4285F4, #1a1a1a)',
                      margin: '0 -1px',
                    }} />
                  )}
                </div>
              ))}
            </div>
            <p style={{
              textAlign: 'center', fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem', color: '#64748B', marginTop: 16, maxWidth: 600, margin: '16px auto 0',
            }}>{t('nexus.iotDesc')}</p>
          </div>

          {/* ── 7. Bottom CTA ── */}
          <div className="cta-box" style={{
            background: '#0a0a0a', border: '1px solid #1a1a1a',
            borderRadius: 12, padding: '48px 40px',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            flexWrap: 'wrap', gap: 24,
          }}>
            <div>
              <h3 style={{ fontSize: '1.2rem', color: '#fff', marginBottom: 8 }}>
                {t('nexus.ctaTitle')}
              </h3>
              <p style={{ fontSize: '0.9rem', color: '#64748B' }}>
                {t('nexus.ctaDesc')}
              </p>
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              <Link to="/supply-chain" className="btn-primary">
                {t('nexus.ctaBtn1')} <ArrowRight size={16} />
              </Link>
              <Link to="/partners" className="btn-outline">
                {t('nexus.ctaBtn2')} <ArrowRight size={16} />
              </Link>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default NexusOS;
