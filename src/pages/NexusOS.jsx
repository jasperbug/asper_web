import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer,
} from 'recharts';
import {
  Activity, Cpu, BarChart3, ArrowRight, Server, Radio,
  Shield, Zap, Globe, Database, MessageSquare, Bot,
} from 'lucide-react';
import AnimatedCounter from '../components/AnimatedCounter';

const NexusOS = () => {
  const { t } = useTranslation();

  /* ── data ── */
  const agentActivityData = useMemo(() => Array.from({ length: 12 }, (_, i) => ({
    month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i],
    aiRequests: Math.floor(150 + i * 80 + Math.random() * 40),
    manualOps: Math.max(20, Math.floor(200 - i * 15 + Math.random() * 10)),
  })), []);

  const carbonData = useMemo(() => Array.from({ length: 12 }, (_, i) => ({
    month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i],
    reduction: Math.floor(20 + i * 7 + Math.random() * 5),
    target: 20 + i * 8,
  })), []);

  const opsLogRows = useMemo(() => [
    { time: '09:42', role: 'Sales', action: 'Create Quotation', tool: '/api/quotations', confirm: 'Confirmed', status: 'Completed' },
    { time: '09:38', role: 'Warehouse', action: 'Check Inventory', tool: '/api/inventory', confirm: 'Auto', status: 'Completed' },
    { time: '09:35', role: 'HR', action: 'Submit Leave', tool: '/api/attendance', confirm: 'Confirmed', status: 'Completed' },
    { time: '09:31', role: 'Sales', action: 'Query Customer', tool: '/api/customers', confirm: 'Auto', status: 'Completed' },
    { time: '09:28', role: 'QC', action: 'Submit Test Result', tool: '/api/samples', confirm: 'Confirmed', status: 'Pending' },
    { time: '09:24', role: 'Warehouse', action: 'Update Stock Level', tool: '/api/oil-products', confirm: 'Confirmed', status: 'Completed' },
    { time: '09:20', role: 'Admin', action: 'Modify Permissions', tool: '/api/roles', confirm: 'Blocked', status: 'Rejected' },
    { time: '09:15', role: 'Sales', action: 'View Price History', tool: '/api/quotations', confirm: 'Auto', status: 'Completed' },
  ], []);

  const securityLevels = [
    { label: t('nexus.levelRead'), desc: 'Auto Execute', example: t('nexus.levelReadEx'), color: '#34A853', nodes: 3 },
    { label: t('nexus.levelWrite'), desc: 'Confirm & Execute', example: t('nexus.levelWriteEx'), color: '#4285F4', nodes: 4 },
    { label: t('nexus.levelCritical'), desc: 'Review & Approve', example: t('nexus.levelCriticalEx'), color: '#EAB308', nodes: 5 },
    { label: t('nexus.levelSensitive'), desc: 'Blocked for AI', example: t('nexus.levelSensitiveEx'), color: '#EA4335', nodes: 2 },
  ];

  const humanFlow = [
    { label: 'Employee', icon: MessageSquare, color: '#94A3B8' },
    { label: 'AI Agent', icon: Bot, color: '#4285F4' },
  ];
  const machineFlow = [
    { label: 'IoT Sensors', icon: Radio, color: '#94A3B8' },
    { label: 'Edge Computing', icon: Cpu, color: '#4285F4' },
  ];

  const opsGridCols = '55px 75px 1fr 1fr 80px 80px';

  const statusColor = (s) =>
    s === 'Completed' ? '#34A853' : s === 'Pending' ? '#EAB308' : '#EA4335';
  const statusBg = (s) =>
    s === 'Completed' ? 'rgba(52,168,83,0.1)' : s === 'Pending' ? 'rgba(234,179,8,0.1)' : 'rgba(234,67,53,0.1)';
  const statusBorder = (s) =>
    s === 'Completed' ? 'rgba(52,168,83,0.3)' : s === 'Pending' ? 'rgba(234,179,8,0.3)' : 'rgba(234,67,53,0.3)';
  const confirmColor = (c) =>
    c === 'Auto' ? '#34A853' : c === 'Confirmed' ? '#4285F4' : '#EA4335';

  /* ── chart shared styles ── */
  const chartBox = {
    background: '#0a0a0a', border: '1px solid #1a1a1a',
    borderRadius: 12, padding: 24,
  };
  const tooltipStyle = {
    background: '#111', border: '1px solid #1a1a1a',
    borderRadius: 8, fontFamily: 'var(--font-mono)', fontSize: '0.8rem',
  };

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
              { icon: Cpu, end: 22, suffix: '+', label: t('nexus.aiTools'), color: '#4285F4', delay: 0 },
              { icon: Radio, end: 8, suffix: '', label: t('nexus.iotNodes'), color: '#34A853', delay: 150 },
              { icon: Zap, end: 2, suffix: 's', prefix: '<', label: t('nexus.responseTime'), color: '#4285F4', delay: 300 },
              { icon: Shield, end: 99.9, suffix: '%', label: t('nexus.uptime'), color: '#34A853', delay: 450 },
            ].map((m, i) => (
              <div key={i} className="card" style={{ textAlign: 'center', padding: '28px 20px' }}>
                <m.icon size={28} color={m.color} style={{ marginBottom: 14 }} />
                <div className="metric-value" style={{ fontSize: '2rem', marginBottom: 6 }}>
                  {m.prefix && <span>{m.prefix}</span>}
                  <AnimatedCounter end={m.end} suffix={m.suffix} delay={m.delay} duration={2000} decimals={m.end % 1 !== 0 ? 1 : 0} />
                </div>
                <div className="metric-label">{m.label}</div>
              </div>
            ))}
          </div>

          {/* ── 3. Dual Dashboard ── */}
          <div style={{ marginBottom: 80 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <h2 style={{ fontSize: '1.3rem', color: '#fff', margin: 0 }}>
                {t('nexus.agentDashboard')} / {t('nexus.carbonDashboard')}
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

            <div className="grid-2" style={{ gap: 16 }}>
              {/* Left: AI Agent Activity */}
              <div style={chartBox}>
                <h3 style={{
                  fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#4285F4',
                  marginBottom: 16, fontWeight: 500,
                }}>{t('nexus.agentDashboard')}</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <AreaChart data={agentActivityData}>
                    <defs>
                      <linearGradient id="colorAI" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#34A853" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#34A853" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1a1a1a" />
                    <XAxis dataKey="month" stroke="#64748B" fontFamily="var(--font-mono)" fontSize={10} />
                    <YAxis stroke="#64748B" fontFamily="var(--font-mono)" fontSize={10} />
                    <Tooltip contentStyle={tooltipStyle} labelStyle={{ color: '#fff' }}
                      formatter={(val, name) => [val, name === 'aiRequests' ? t('nexus.aiProcessed') : t('nexus.manualOps')]}
                    />
                    <Area type="monotone" dataKey="aiRequests" stroke="#34A853" fill="url(#colorAI)" strokeWidth={2} />
                    <Area type="monotone" dataKey="manualOps" stroke="#4285F4" fill="none" strokeDasharray="5 5" strokeWidth={1} />
                  </AreaChart>
                </ResponsiveContainer>
                <div style={{ display: 'flex', gap: 20, marginTop: 12, paddingTop: 10, borderTop: '1px solid #1a1a1a' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <div style={{ width: 12, height: 3, background: '#34A853', borderRadius: 2 }} />
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: '#64748B' }}>{t('nexus.aiProcessed')}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <div style={{ width: 12, height: 3, background: '#4285F4', borderRadius: 2 }} />
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: '#64748B' }}>{t('nexus.manualOps')}</span>
                  </div>
                </div>
              </div>

              {/* Right: IoT Carbon Tracking */}
              <div style={chartBox}>
                <h3 style={{
                  fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#34A853',
                  marginBottom: 16, fontWeight: 500,
                }}>{t('nexus.carbonDashboard')}</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <AreaChart data={carbonData}>
                    <defs>
                      <linearGradient id="colorCarbon" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#34A853" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#34A853" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1a1a1a" />
                    <XAxis dataKey="month" stroke="#64748B" fontFamily="var(--font-mono)" fontSize={10} />
                    <YAxis stroke="#64748B" fontFamily="var(--font-mono)" fontSize={10} />
                    <Tooltip contentStyle={tooltipStyle} labelStyle={{ color: '#fff' }}
                      formatter={(val, name) => [`${val}%`, name === 'reduction' ? t('nexus.co2Label') : t('nexus.targetLabel')]}
                    />
                    <Area type="monotone" dataKey="reduction" stroke="#34A853" fill="url(#colorCarbon)" strokeWidth={2} />
                    <Area type="monotone" dataKey="target" stroke="#4285F4" fill="none" strokeDasharray="5 5" strokeWidth={1} />
                  </AreaChart>
                </ResponsiveContainer>
                <div style={{ display: 'flex', gap: 20, marginTop: 12, paddingTop: 10, borderTop: '1px solid #1a1a1a' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <div style={{ width: 12, height: 3, background: '#34A853', borderRadius: 2 }} />
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: '#64748B' }}>{t('nexus.co2Label')}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <div style={{ width: 12, height: 3, background: '#4285F4', borderRadius: 2 }} />
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: '#64748B' }}>{t('nexus.targetLabel')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── 4. Agent Operations Log ── */}
          <div style={{ marginBottom: 80 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <h2 style={{ fontSize: '1.3rem', color: '#fff', margin: 0 }}>
                {t('nexus.opsLogTitle')}
              </h2>
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
                color: '#34A853', display: 'flex', alignItems: 'center', gap: 6,
              }}>
                <span style={{
                  width: 7, height: 7, borderRadius: '50%', background: '#34A853',
                  display: 'inline-block', animation: 'pulse 2s infinite',
                }} />
                {t('nexus.liveOps', { count: opsLogRows.length })}
              </span>
            </div>

            <div className="data-table-wrapper" style={{
              background: '#0a0a0a', border: '1px solid #1a1a1a',
              borderRadius: 12, overflow: 'hidden',
            }}>
              {/* Header */}
              <div style={{
                display: 'grid', gridTemplateColumns: opsGridCols, minWidth: 560,
                padding: '14px 24px', borderBottom: '1px solid #1a1a1a',
                fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
                color: '#475569', textTransform: 'uppercase', letterSpacing: '0.1em',
              }}>
                <span>Time</span>
                <span>Role</span>
                <span>Action</span>
                <span>Tool</span>
                <span style={{ textAlign: 'center' }}>Confirm</span>
                <span style={{ textAlign: 'right' }}>Status</span>
              </div>
              {/* Rows */}
              {opsLogRows.map((row, i) => (
                <div key={i} style={{
                  display: 'grid', gridTemplateColumns: opsGridCols, minWidth: 560,
                  padding: '12px 24px', borderBottom: '1px solid #111',
                  alignItems: 'center', transition: 'background 0.2s',
                }}
                  onMouseOver={e => e.currentTarget.style.background = 'rgba(66,133,244,0.04)'}
                  onMouseOut={e => e.currentTarget.style.background = 'transparent'}
                >
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#64748B' }}>
                    {row.time}
                  </span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#fff' }}>
                    {row.role}
                  </span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#94A3B8' }}>
                    {row.action}
                  </span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#4285F4' }}>
                    {row.tool}
                  </span>
                  <div style={{ textAlign: 'center' }}>
                    <span style={{
                      fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
                      color: confirmColor(row.confirm),
                    }}>{row.confirm.toUpperCase()}</span>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{
                      padding: '3px 10px', borderRadius: 100, fontSize: '0.6rem',
                      fontFamily: 'var(--font-mono)',
                      background: statusBg(row.status),
                      color: statusColor(row.status),
                      border: `1px solid ${statusBorder(row.status)}`,
                    }}>{row.status.toUpperCase()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── 5. Dual Column — Architecture + Security ── */}
          <div className="grid-2" style={{ marginBottom: 80 }}>
            {/* AI + IoT Architecture */}
            <div className="card">
              <Cpu size={28} color="#4285F4" style={{ marginBottom: 16 }} />
              <h3 style={{ fontSize: '1.1rem', marginBottom: 12, color: '#fff' }}>
                {t('nexus.archTitle')}
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#64748B', lineHeight: 1.7, marginBottom: 20 }}>
                {t('nexus.archDesc')}
              </p>

              {/* Tech tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
                {['Claude API', 'OpenAI API', 'Tool Calling', 'MQTT', 'Edge TPU', 'JWT Auth'].map((tag, i) => (
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
                <div style={{ color: '#475569' }}>// AI Tool + IoT Bridge</div>
                <div style={{ color: '#94A3B8' }}>{'{'}</div>
                <div style={{ color: '#94A3B8', paddingLeft: 16 }}>"name": <span style={{ color: '#34A853' }}>"create_quotation"</span>,</div>
                <div style={{ color: '#94A3B8', paddingLeft: 16 }}>"permissions": [<span style={{ color: '#4285F4' }}>"QUOTATION.CREATE"</span>],</div>
                <div style={{ color: '#94A3B8', paddingLeft: 16 }}>"confirmation": <span style={{ color: '#EAB308' }}>"required"</span>,</div>
                <div style={{ color: '#94A3B8', paddingLeft: 16 }}>"iot_context": {'{'}</div>
                <div style={{ color: '#94A3B8', paddingLeft: 32 }}>"source": <span style={{ color: '#34A853' }}>"edge-node-tw-001"</span>,</div>
                <div style={{ color: '#94A3B8', paddingLeft: 32 }}>"material_scan": <span style={{ color: '#34A853' }}>"auto"</span></div>
                <div style={{ color: '#94A3B8', paddingLeft: 16 }}>{'}'}</div>
                <div style={{ color: '#94A3B8' }}>{'}'}</div>
              </div>
            </div>

            {/* Security Model */}
            <div className="card">
              <Shield size={28} color="#34A853" style={{ marginBottom: 16 }} />
              <h3 style={{ fontSize: '1.1rem', marginBottom: 12, color: '#fff' }}>
                {t('nexus.securityTitle')}
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#64748B', lineHeight: 1.7, marginBottom: 20 }}>
                {t('nexus.securityDesc')}
              </p>

              {/* 4-level pipeline */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {securityLevels.map((level, i) => (
                  <div key={i}>
                    <div style={{
                      display: 'flex', alignItems: 'center', gap: 12,
                      padding: '10px 14px', background: '#050505',
                      borderRadius: 8, border: '1px solid #1a1a1a',
                    }}>
                      {/* Node dots */}
                      <div style={{ display: 'flex', gap: 4, flexShrink: 0 }}>
                        {Array.from({ length: level.nodes }).map((_, j) => (
                          <div key={j} style={{
                            width: 8, height: 8, borderRadius: '50%',
                            background: `${level.color}40`, border: `1px solid ${level.color}60`,
                          }} />
                        ))}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{
                          fontFamily: 'var(--font-mono)', fontSize: '0.7rem',
                          color: level.color, fontWeight: 500,
                        }}>{level.label}</div>
                        <div style={{ fontSize: '0.6rem', color: '#475569' }}>{level.desc} — {level.example}</div>
                      </div>
                    </div>
                    {/* Connector */}
                    {i < securityLevels.length - 1 && (
                      <div style={{
                        display: 'flex', justifyContent: 'center', padding: '2px 0',
                        color: '#1a1a1a', fontSize: '0.7rem',
                      }}>▼</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── 6. Dual Intelligence Flow ── */}
          <div style={{ marginBottom: 80 }}>
            <h2 style={{ fontSize: '1.3rem', marginBottom: 32, color: '#fff', textAlign: 'center' }}>
              {t('nexus.flowTitle')}
            </h2>
            <div style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              gap: 16, padding: '32px 0',
            }}>
              {/* Human flow row */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0 }}>
                {humanFlow.map((step, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{
                      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
                      padding: '20px 24px', background: '#0a0a0a', border: '1px solid #1a1a1a',
                      borderRadius: 12, minWidth: 110,
                    }}>
                      <step.icon size={24} color={step.color} />
                      <span style={{
                        fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
                        color: step.color, textAlign: 'center',
                      }}>{step.label}</span>
                    </div>
                    {i < humanFlow.length - 1 && (
                      <div style={{
                        width: 40, height: 2,
                        background: 'linear-gradient(90deg, #1a1a1a, #4285F4, #1a1a1a)',
                        margin: '0 -1px',
                      }} />
                    )}
                  </div>
                ))}
                {/* Connector to center */}
                <div style={{
                  width: 40, height: 2,
                  background: 'linear-gradient(90deg, #1a1a1a, #4285F4, #1a1a1a)',
                  margin: '0 -1px',
                }} />
                {/* Merge indicator */}
                <div style={{
                  width: 2, height: 60, position: 'relative',
                  background: 'linear-gradient(180deg, #4285F4, #34A853)',
                }}>
                  <div style={{
                    position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                    width: 10, height: 10, borderRadius: '50%', background: '#4285F4',
                    border: '2px solid #0a0a0a',
                  }} />
                </div>
                {/* Core + Database */}
                <div style={{
                  width: 40, height: 2,
                  background: 'linear-gradient(90deg, #1a1a1a, #34A853, #1a1a1a)',
                  margin: '0 -1px',
                }} />
                <div style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
                  padding: '24px 28px', background: '#0a0a0a',
                  border: '2px solid #4285F4', borderRadius: 12, minWidth: 130,
                }}>
                  <BarChart3 size={28} color="#4285F4" />
                  <span style={{
                    fontFamily: 'var(--font-mono)', fontSize: '0.7rem',
                    color: '#4285F4', textAlign: 'center', fontWeight: 600,
                  }}>Nexus OS Core</span>
                </div>
                <div style={{
                  width: 40, height: 2,
                  background: 'linear-gradient(90deg, #1a1a1a, #34A853, #1a1a1a)',
                  margin: '0 -1px',
                }} />
                <div style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
                  padding: '20px 24px', background: '#0a0a0a', border: '1px solid #1a1a1a',
                  borderRadius: 12, minWidth: 110,
                }}>
                  <Database size={24} color="#34A853" />
                  <span style={{
                    fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
                    color: '#34A853', textAlign: 'center',
                  }}>Database</span>
                </div>
              </div>

              {/* Machine flow row — positioned to align with merge point */}
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0,
                marginTop: -76, marginRight: 340,
              }}>
                {machineFlow.map((step, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{
                      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
                      padding: '20px 24px', background: '#0a0a0a', border: '1px solid #1a1a1a',
                      borderRadius: 12, minWidth: 110,
                    }}>
                      <step.icon size={24} color={step.color} />
                      <span style={{
                        fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
                        color: step.color, textAlign: 'center',
                      }}>{step.label}</span>
                    </div>
                    {i < machineFlow.length - 1 && (
                      <div style={{
                        width: 40, height: 2,
                        background: 'linear-gradient(90deg, #1a1a1a, #34A853, #1a1a1a)',
                        margin: '0 -1px',
                      }} />
                    )}
                  </div>
                ))}
              </div>
            </div>
            <p style={{
              textAlign: 'center', fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem', color: '#64748B', marginTop: 24, maxWidth: 700, margin: '24px auto 0',
            }}>{t('nexus.flowDesc')}</p>
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
