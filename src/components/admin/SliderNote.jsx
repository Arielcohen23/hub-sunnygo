export default function SliderNote({ label, icon, value, onChange }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
      <span style={{ fontSize: '16px', width: '24px', flexShrink: 0 }}>{icon}</span>
      <span style={{ fontSize: '13px', color: '#374151', fontFamily: 'Quicksand, sans-serif', fontWeight: 600, width: '160px', flexShrink: 0 }}>{label}</span>
      <input
        type="range"
        min="0" max="5" step="0.5"
        value={value}
        onChange={e => onChange(Number(e.target.value))}
        style={{ flex: 1, accentColor: '#04255B', cursor: 'pointer' }}
      />
      <span style={{ fontSize: '13px', fontFamily: 'Quicksand, sans-serif', fontWeight: 700, color: '#04255B', width: '48px', textAlign: 'right', flexShrink: 0 }}>
        {Number(value).toFixed(1)} / 5
      </span>
    </div>
  )
}
