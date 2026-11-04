import { memo, useId, useState } from 'react'
import { CameraOff } from 'lucide-react'
import { shade, mix, isLight, onColor } from '../../lib/color'

/*
  Studio-style vector product renders. Every product in the catalogue has an `art.kind`
  and `art.color`; this component draws a consistent, softly lit object for it so the whole
  marketplace shares one photographic language. Products with a licensed photo show it instead.
*/

const Shadow = ({ g, rx = 118, cy = 340, o = 1 }) => <ellipse cx="200" cy={cy} rx={rx} ry={rx * 0.085} fill={g('shadow')} opacity={o} />

const Screen = ({ g, x, y, w, h, r = 8 }) => (
  <g>
    <rect x={x} y={y} width={w} height={h} rx={r} fill={g('screen')} />
    <rect x={x} y={y} width={w} height={h} rx={r} fill={g('wall')} opacity="0.9" />
    <ellipse cx={x + w * 0.72} cy={y + h * 0.28} rx={w * 0.45} ry={h * 0.3} fill={g('glow')} opacity="0.55" />
    <path d={`M${x} ${y + h * 0.62} C ${x + w * 0.3} ${y + h * 0.48}, ${x + w * 0.6} ${y + h * 0.85}, ${x + w} ${y + h * 0.6} L ${x + w} ${y + h - r} Q ${x + w} ${y + h} ${x + w - r} ${y + h} L ${x + r} ${y + h} Q ${x} ${y + h} ${x} ${y + h - r} Z`} fill="#000" opacity="0.18" />
    <rect x={x} y={y} width={w} height={h} rx={r} fill={g('sheen')} />
  </g>
)

const Label = ({ x, y, w, h, fill, text, color, size = 15, r = 4, sub }) => (
  <g>
    <rect x={x} y={y} width={w} height={h} rx={r} fill={fill} />
    <text x={x + w / 2} y={y + h / 2 + (sub ? -2 : size * 0.35)} textAnchor="middle" fontFamily="Plus Jakarta Sans Variable, Inter Variable, sans-serif" fontWeight="800" fontSize={size} fill={color} letterSpacing="-0.3">
      {text}
    </text>
    {sub && (
      <text x={x + w / 2} y={y + h / 2 + size * 0.85} textAnchor="middle" fontFamily="Inter Variable, sans-serif" fontWeight="600" fontSize={size * 0.5} fill={color} opacity="0.75" letterSpacing="1">
        {sub}
      </text>
    )}
  </g>
)

const shortBrand = (b = '') => (b.length > 11 ? b.split(/[\s.']/)[0] : b)

/* ── Drawers ─────────────────────────────────────────────────────────────── */

const D = {
  phone: ({ g, d, l, brand = '', label = '' }) => {
    const style = brand === 'Apple' ? (/Pro/.test(label) ? 'pro' : 'dual') : brand === 'Samsung' ? 'samsung' : brand === 'Google' ? 'pixel' : brand === 'OnePlus' || brand === 'Vivo' ? 'circle' : brand === 'Nothing' ? 'glyph' : 'square'
    const lens = (cx, cy, r = 9) => (
      <g key={`${cx}-${cy}`}>
        <circle cx={cx} cy={cy} r={r + 2.5} fill={d} />
        <circle cx={cx} cy={cy} r={r} fill="#0b0c0f" />
        <circle cx={cx} cy={cy} r={r * 0.55} fill={g('lens')} />
        <circle cx={cx - r * 0.3} cy={cy - r * 0.3} r={r * 0.18} fill="#fff" opacity="0.6" />
      </g>
    )
    const cams = {
      pro: (
        <g>
          <rect x="94" y="74" width="62" height="62" rx="16" fill={l} opacity="0.55" stroke={d} strokeOpacity="0.4" />
          {lens(111, 92)}
          {lens(111, 119)}
          {lens(138, 105)}
          <circle cx="140" cy="126" r="3.5" fill="#f6efd8" />
        </g>
      ),
      dual: (
        <g>
          <rect x="96" y="74" width="34" height="62" rx="17" fill={l} opacity="0.5" />
          {lens(113, 91, 8)}
          {lens(113, 119, 8)}
          <circle cx="138" cy="84" r="3" fill="#f6efd8" />
        </g>
      ),
      samsung: <g>{[88, 114, 140].map((y) => lens(112, y, 9))}<circle cx="132" cy="88" r="3" fill="#f6efd8" /></g>,
      pixel: (
        <g>
          <rect x="88" y="96" width="116" height="34" rx="17" fill="#121316" />
          {lens(112, 113, 8)}
          {lens(138, 113, 8)}
          {lens(164, 113, 8)}
        </g>
      ),
      circle: (
        <g>
          <circle cx="150" cy="112" r="38" fill={d} />
          <circle cx="150" cy="112" r="34" fill="#16171a" />
          {lens(138, 98, 8)}
          {lens(162, 98, 8)}
          {lens(150, 124, 8)}
        </g>
      ),
      glyph: (
        <g>
          {lens(112, 92, 8)}
          {lens(136, 92, 8)}
          <path d="M150 170 a40 40 0 0 1 40 40 M100 260 h60 M190 250 v40" stroke="#fff" strokeOpacity="0.85" strokeWidth="4" fill="none" strokeLinecap="round" />
        </g>
      ),
      square: (
        <g>
          <rect x="94" y="74" width="58" height="66" rx="12" fill="#16171a" />
          {lens(110, 92, 8)}
          {lens(136, 92, 8)}
          {lens(110, 120, 8)}
        </g>
      ),
    }[style]
    return (
      <g>
        <Shadow g={g} rx={112} />
        {/* back */}
        <g transform="rotate(-7 150 200)">
          <rect x="80" y="58" width="132" height="280" rx="28" fill={d} />
          <rect x="82" y="60" width="128" height="276" rx="26" fill={g('body')} />
          <rect x="82" y="60" width="128" height="276" rx="26" fill={g('sheen')} />
          {cams}
          <circle cx="146" cy="226" r="9" fill={d} opacity="0.35" />
        </g>
        {/* front */}
        <g transform="translate(70 4)">
          <rect x="140" y="52" width="122" height="284" rx="26" fill={d} />
          <rect x="142" y="54" width="118" height="280" rx="24" fill={g('body')} />
          <rect x="148" y="60" width="106" height="268" rx="19" fill="#0d0e11" />
          <Screen g={g} x={151} y={63} w={100} h={262} r={16} />
          <rect x="185" y="70" width="32" height="9" rx="4.5" fill="#050506" />
          <text x="201" y="132" textAnchor="middle" fontFamily="Inter Variable" fontWeight="300" fontSize="30" fill="#fff" opacity="0.95">9:41</text>
          <rect x="261" y="128" width="3" height="40" rx="1.5" fill={d} />
        </g>
      </g>
    )
  },
  foldable: ({ g, d }) => (
    <g>
      <Shadow g={g} rx={120} />
      <rect x="86" y="70" width="230" height="260" rx="20" fill={d} />
      <rect x="88" y="72" width="226" height="256" rx="18" fill="#0d0e11" />
      <Screen g={g} x={94} y={78} w={214} h={244} r={13} />
      <line x1="201" y1="78" x2="201" y2="322" stroke="#fff" strokeOpacity="0.12" strokeWidth="2" />
      <circle cx="270" cy="92" r="4" fill="#050506" />
    </g>
  ),
  flip: ({ g, d }) => (
    <g>
      <Shadow g={g} rx={66} />
      <rect x="142" y="60" width="118" height="132" rx="22" fill={g('body')} />
      <rect x="152" y="70" width="98" height="112" rx="14" fill="#0d0e11" />
      <Screen g={g} x={155} y={73} w={92} h={106} r={12} />
      <circle cx="176" cy="94" r="11" fill="#08090b" stroke="#2a2b30" strokeWidth="3" />
      <circle cx="176" cy="124" r="11" fill="#08090b" stroke="#2a2b30" strokeWidth="3" />
      <rect x="142" y="190" width="118" height="10" fill={d} />
      <rect x="142" y="198" width="118" height="138" rx="22" fill={g('body')} />
      <rect x="142" y="198" width="118" height="20" fill={d} opacity="0.35" />
    </g>
  ),
  tablet: ({ g }) => (
    <g>
      <Shadow g={g} rx={150} />
      <rect x="64" y="72" width="272" height="258" rx="22" fill={g('body')} />
      <rect x="72" y="80" width="256" height="242" rx="15" fill="#0d0e11" />
      <Screen g={g} x={80} y={88} w={240} h={226} r={9} />
      <circle cx="200" cy="84" r="2.5" fill="#1d1e22" />
    </g>
  ),
  ereader: ({ g }) => (
    <g>
      <Shadow g={g} rx={100} />
      <rect x="110" y="56" width="180" height="280" rx="18" fill={g('body')} />
      <rect x="124" y="74" width="152" height="232" rx="4" fill="#ECEAE3" />
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => (
        <rect key={i} x="138" y={108 + i * 15} width={i % 4 === 3 ? 84 : 124} height="5" rx="2.5" fill="#8b8a85" opacity="0.7" />
      ))}
      <rect x="138" y="88" width="80" height="8" rx="4" fill="#3a3a38" />
    </g>
  ),
  laptop: ({ g, d, l }) => (
    <g>
      <Shadow g={g} rx={170} cy={322} />
      <rect x="78" y="80" width="244" height="168" rx="12" fill={d} />
      <rect x="80" y="82" width="240" height="164" rx="11" fill="#0d0e11" />
      <Screen g={g} x={88} y={90} w={224} h={148} r={4} />
      <rect x="194" y="84" width="12" height="4" rx="2" fill="#1e1f23" />
      <path d="M50 252 L350 252 L362 296 Q363 304 355 304 L45 304 Q37 304 38 296 Z" fill={g('body')} />
      <path d="M50 252 L350 252 L352 260 L48 260 Z" fill={l} opacity="0.6" />
      <rect x="170" y="294" width="60" height="5" rx="2.5" fill={d} opacity="0.6" />
      <path d="M70 264 L330 264 L336 286 L64 286 Z" fill={d} opacity="0.28" />
    </g>
  ),
  tv: ({ g }) => (
    <g>
      <Shadow g={g} rx={130} cy={330} />
      <rect x="24" y="66" width="352" height="210" rx="6" fill="#141518" />
      <Screen g={g} x={29} y={71} w={342} h={200} r={3} />
      <path d="M140 276 L128 322 L272 322 L260 276 Z" fill="#2a2b2f" />
      <rect x="120" y="318" width="160" height="8" rx="4" fill="#1b1c1f" />
    </g>
  ),
  monitor: (p) => D.tv(p),
  soundbar: ({ g }) => (
    <g>
      <Shadow g={g} rx={175} cy={262} />
      <rect x="20" y="190" width="360" height="64" rx="28" fill={g('bodyV')} />
      <rect x="40" y="200" width="320" height="44" rx="20" fill={g('mesh')} opacity="0.7" />
      <circle cx="200" cy="246" r="3" fill="#fff" opacity="0.4" />
    </g>
  ),
  projector: ({ g, d }) => (
    <g>
      <Shadow g={g} rx={80} />
      <path d="M140 200 h120 v126 q0 10 -10 10 h-100 q-10 0 -10 -10 Z" fill={d} />
      <path d="M150 120 a50 50 0 0 1 100 0 v120 a50 50 0 0 1 -100 0 Z" fill={g('bodyV')} />
      <circle cx="200" cy="150" r="30" fill="#0e0f12" />
      <circle cx="200" cy="150" r="20" fill={g('lens')} />
      <circle cx="193" cy="143" r="5" fill="#fff" opacity="0.5" />
    </g>
  ),
  headphones: ({ g, d, l }) => (
    <g>
      <Shadow g={g} rx={110} />
      <path d="M100 210 C 100 80, 300 80, 300 210" fill="none" stroke={d} strokeWidth="24" strokeLinecap="round" />
      <path d="M100 210 C 100 80, 300 80, 300 210" fill="none" stroke={l} strokeWidth="6" strokeLinecap="round" opacity="0.35" transform="translate(0 -6)" />
      <rect x="66" y="182" width="78" height="128" rx="34" fill={g('body')} />
      <rect x="256" y="182" width="78" height="128" rx="34" fill={g('body')} />
      <rect x="128" y="194" width="22" height="104" rx="10" fill={d} />
      <rect x="250" y="194" width="22" height="104" rx="10" fill={d} />
      <rect x="76" y="194" width="20" height="60" rx="10" fill="#fff" opacity="0.12" />
    </g>
  ),
  earbuds: ({ g, d }) => (
    <g>
      <Shadow g={g} rx={110} />
      <rect x="110" y="180" width="180" height="150" rx="48" fill={g('body')} />
      <path d="M110 236 h180" stroke={d} strokeOpacity="0.5" strokeWidth="2" />
      <rect x="194" y="252" width="12" height="4" rx="2" fill="#2fbf71" opacity="0.8" />
      <g transform="translate(140 84) rotate(-14)">
        <ellipse cx="30" cy="30" rx="30" ry="28" fill={g('body')} />
        <rect x="18" y="40" width="22" height="70" rx="11" fill={g('body')} />
        <ellipse cx="22" cy="22" rx="10" ry="8" fill="#0f1012" opacity="0.65" />
      </g>
      <g transform="translate(222 92) rotate(14)">
        <ellipse cx="30" cy="30" rx="30" ry="28" fill={g('body')} />
        <rect x="20" y="40" width="22" height="70" rx="11" fill={g('body')} />
        <ellipse cx="38" cy="22" rx="10" ry="8" fill="#0f1012" opacity="0.65" />
      </g>
    </g>
  ),
  speaker: ({ g, d }) => (
    <g>
      <Shadow g={g} rx={150} />
      <rect x="54" y="150" width="292" height="176" rx="72" fill={g('bodyV')} />
      <rect x="70" y="164" width="260" height="148" rx="60" fill={g('mesh')} opacity="0.55" />
      <rect x="160" y="226" width="80" height="24" rx="12" fill={d} />
      <text x="200" y="243" textAnchor="middle" fontFamily="Inter Variable" fontWeight="800" fontSize="13" fill="#fff" opacity="0.85">◖ ◗</text>
      <rect x="54" y="150" width="292" height="40" rx="20" fill="#fff" opacity="0.08" />
    </g>
  ),
  watch: ({ g, d }) => (
    <g>
      <Shadow g={g} rx={70} />
      <path d="M160 40 h80 l-6 88 h-68 Z" fill={g('strap')} />
      <path d="M166 272 h68 l6 64 h-80 Z" fill={g('strap')} />
      <rect x="130" y="112" width="140" height="170" rx="40" fill={g('body')} />
      <rect x="140" y="122" width="120" height="150" rx="32" fill="#0b0c0e" />
      <text x="200" y="196" textAnchor="middle" fontFamily="Inter Variable" fontWeight="300" fontSize="40" fill="#fff">10:09</text>
      <circle cx="170" cy="234" r="14" fill="none" stroke="#f0532c" strokeWidth="5" strokeDasharray="60 30" />
      <circle cx="200" cy="234" r="14" fill="none" stroke="#2fbf71" strokeWidth="5" strokeDasharray="70 20" />
      <circle cx="230" cy="234" r="14" fill="none" stroke="#3b9cf0" strokeWidth="5" strokeDasharray="45 45" />
      <rect x="268" y="160" width="10" height="34" rx="5" fill={d} />
    </g>
  ),
  band: ({ g }) => (
    <g>
      <Shadow g={g} rx={60} />
      <path d="M170 40 h60 v120 h-60 Z" fill={g('strap')} />
      <path d="M170 240 h60 v96 h-60 Z" fill={g('strap')} />
      <rect x="158" y="130" width="84" height="140" rx="30" fill={g('body')} />
      <rect x="166" y="140" width="68" height="120" rx="22" fill="#0b0c0e" />
      <text x="200" y="208" textAnchor="middle" fontFamily="Inter Variable" fontWeight="400" fontSize="22" fill="#fff">8,412</text>
      <text x="200" y="226" textAnchor="middle" fontFamily="Inter Variable" fontWeight="600" fontSize="9" fill="#2fbf71">STEPS</text>
    </g>
  ),
  analogwatch: ({ g, c }) => (
    <g>
      <Shadow g={g} rx={70} />
      <path d="M168 40 h64 l-4 100 h-56 Z" fill={g('strap')} />
      <path d="M172 262 h56 l4 76 h-64 Z" fill={g('strap')} />
      <circle cx="200" cy="200" r="74" fill={g('metal')} />
      <circle cx="200" cy="200" r="64" fill={isLight(c) ? '#1d1e21' : '#f3f1ea'} />
      {[...Array(12)].map((_, i) => (
        <rect key={i} x="198.5" y="142" width="3" height={i % 3 === 0 ? 12 : 6} fill={isLight(c) ? '#e9e6dd' : '#2a2b2e'} transform={`rotate(${i * 30} 200 200)`} />
      ))}
      <rect x="198" y="160" width="4" height="44" rx="2" fill={isLight(c) ? '#fff' : '#1b1c1f'} transform="rotate(-50 200 200)" />
      <rect x="198.5" y="150" width="3" height="54" rx="1.5" fill={isLight(c) ? '#fff' : '#1b1c1f'} transform="rotate(60 200 200)" />
      <rect x="199.4" y="144" width="1.2" height="62" fill="#f0532c" transform="rotate(150 200 200)" />
      <circle cx="200" cy="200" r="4" fill="#f0532c" />
      <rect x="272" y="190" width="12" height="20" rx="3" fill={g('metal')} />
    </g>
  ),
  camera: ({ g, d }) => (
    <g>
      <Shadow g={g} rx={150} />
      <path d="M70 140 h70 l14 -26 h74 l14 26 h88 q16 0 16 16 v148 q0 16 -16 16 h-260 q-16 0 -16 -16 v-148 q0 -16 16 -16 Z" fill={g('body')} />
      <rect x="54" y="160" width="46" height="160" rx="16" fill={d} opacity="0.6" />
      <circle cx="210" cy="232" r="76" fill="#121316" />
      <circle cx="210" cy="232" r="62" fill="#1d1e22" stroke="#2c2d31" strokeWidth="4" />
      <circle cx="210" cy="232" r="42" fill={g('lens')} />
      <circle cx="194" cy="216" r="10" fill="#fff" opacity="0.35" />
      <rect x="290" y="124" width="34" height="12" rx="4" fill={d} />
    </g>
  ),
  actioncam: ({ g }) => (
    <g>
      <Shadow g={g} rx={92} />
      <rect x="110" y="130" width="180" height="196" rx="26" fill={g('body')} />
      <rect x="128" y="150" width="76" height="76" rx="18" fill="#0d0e10" />
      <circle cx="166" cy="188" r="28" fill={g('lens')} />
      <circle cx="158" cy="180" r="7" fill="#fff" opacity="0.35" />
      <rect x="218" y="156" width="54" height="40" rx="6" fill="#0d0e10" />
      <rect x="222" y="160" width="46" height="32" rx="4" fill={g('wall')} />
      <circle cx="262" cy="140" r="5" fill="#e33b2c" />
      <text x="200" y="300" textAnchor="middle" fontFamily="Inter Variable" fontWeight="800" fontSize="16" fill="#fff" opacity="0.6">HERO</text>
    </g>
  ),
  charger: ({ g }) => (
    <g>
      <Shadow g={g} rx={80} />
      <rect x="166" y="70" width="12" height="54" rx="3" fill={g('metal')} />
      <rect x="222" y="70" width="12" height="54" rx="3" fill={g('metal')} />
      <rect x="128" y="116" width="144" height="210" rx="30" fill={g('body')} />
      <rect x="168" y="250" width="64" height="14" rx="7" fill="#1d1e21" />
      <rect x="168" y="274" width="64" height="14" rx="7" fill="#1d1e21" />
      <rect x="176" y="298" width="48" height="12" rx="3" fill="#1d1e21" />
    </g>
  ),
  console: ({ g }) => (
    <g>
      <Shadow g={g} rx={120} />
      <path d="M120 50 Q 112 200 128 336 L 150 336 Q 140 200 160 60 Z" fill={g('body')} />
      <path d="M280 50 Q 288 200 272 336 L 250 336 Q 260 200 240 60 Z" fill={g('body')} />
      <rect x="152" y="58" width="96" height="278" rx="10" fill="#141518" />
      <rect x="158" y="70" width="6" height="250" rx="3" fill="#2b5be0" opacity="0.6" />
    </g>
  ),
  xbox: ({ g }) => (
    <g>
      <Shadow g={g} rx={100} />
      <rect x="120" y="60" width="160" height="276" rx="8" fill={g('bodyV')} />
      <rect x="128" y="60" width="144" height="34" rx="6" fill="#0a0a0b" />
      {[...Array(5)].map((_, r) => [...Array(7)].map((__, i) => <circle key={`${r}-${i}`} cx={144 + i * 19} cy={72 + r * 5} r="1.6" fill="#2fbf71" opacity={0.25 + (i % 3) * 0.2} />))}
      <circle cx="146" cy="120" r="6" fill="#2a2b2e" />
    </g>
  ),
  handheld: ({ g }) => (
    <g>
      <Shadow g={g} rx={175} />
      <rect x="20" y="130" width="70" height="170" rx="34" fill="#1e7fd4" />
      <rect x="310" y="130" width="70" height="170" rx="34" fill="#e2483d" />
      <rect x="84" y="130" width="232" height="170" rx="10" fill="#17181b" />
      <Screen g={g} x={96} y={142} w={208} h={146} r={4} />
      <circle cx="55" cy="180" r="13" fill="#0e0f11" />
      <circle cx="345" cy="240" r="13" fill="#0e0f11" />
      {[[345, 168], [333, 180], [357, 180], [345, 192]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="5" fill="#0e0f11" />)}
    </g>
  ),
  controller: ({ g, d }) => (
    <g>
      <Shadow g={g} rx={140} />
      <path d="M110 150 Q 200 130 290 150 Q 340 160 352 230 Q 366 310 320 318 Q 296 320 270 270 L 130 270 Q 104 320 80 318 Q 34 310 48 230 Q 60 160 110 150 Z" fill={g('body')} />
      <path d="M150 158 h100 v40 q0 14 -14 14 h-72 q-14 0 -14 -14 Z" fill={d} opacity="0.5" />
      <circle cx="158" cy="242" r="20" fill="#121316" />
      <circle cx="242" cy="242" r="20" fill="#121316" />
      <path d="M96 196 h12 v-12 h12 v12 h12 v12 h-12 v12 h-12 v-12 h-12 Z" fill="#121316" opacity="0.85" />
      {[[300, 184], [286, 198], [314, 198], [300, 212]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="7" fill="#121316" opacity="0.85" />)}
    </g>
  ),
  mouse: ({ g }) => (
    <g>
      <Shadow g={g} rx={80} />
      <path d="M200 70 C 270 70 286 160 280 240 C 274 310 240 336 200 336 C 160 336 126 310 120 240 C 114 160 130 70 200 70 Z" fill={g('body')} />
      <path d="M200 74 V 160" stroke="#000" strokeOpacity="0.4" strokeWidth="2" />
      <rect x="193" y="100" width="14" height="30" rx="7" fill="#0c0d0f" />
      <path d="M128 230 Q 200 250 272 230" stroke="#3b9cf0" strokeWidth="3" fill="none" opacity="0.7" />
    </g>
  ),
  keyboard: ({ g }) => (
    <g>
      <Shadow g={g} rx={170} cy={300} />
      <rect x="30" y="150" width="340" height="140" rx="14" fill={g('bodyV')} />
      {[...Array(5)].map((_, r) => [...Array(13)].map((__, i) => <rect key={`${r}-${i}`} x={44 + i * 24.5} y={162 + r * 24} width="20" height="20" rx="4" fill="#2a2b2f" stroke="#3a3b40" strokeWidth="1" />))}
      <rect x="44" y="162" width="314" height="116" rx="6" fill={g('rgb')} opacity="0.18" />
      <circle cx="346" cy="140" r="12" fill={g('metal')} />
    </g>
  ),
  gamebox: ({ g }) => (
    <g>
      <Shadow g={g} rx={90} />
      <rect x="120" y="60" width="160" height="272" rx="8" fill="#1a3fb0" />
      <rect x="124" y="64" width="152" height="264" rx="5" fill={g('body')} />
      <rect x="124" y="64" width="152" height="24" fill="#1a3fb0" />
      <text x="138" y="81" fontFamily="Inter Variable" fontWeight="800" fontSize="12" fill="#fff">PS5</text>
      <circle cx="230" cy="190" r="70" fill="#fff" opacity="0.08" />
      <path d="M124 260 L180 200 L210 230 L246 190 L276 226 V328 H124 Z" fill="#000" opacity="0.35" />
    </g>
  ),
  // Fashion
  tshirt: ({ g, d }) => (
    <g>
      <Shadow g={g} rx={120} />
      <path d="M150 64 Q 200 92 250 64 L 330 100 L 306 168 L 274 156 L 274 330 L 126 330 L 126 156 L 94 168 L 70 100 Z" fill={g('body')} />
      <path d="M150 64 Q 200 104 250 64" fill="none" stroke={d} strokeWidth="6" />
      <path d="M126 156 L 126 330 L 140 330 L 140 150 Z" fill="#000" opacity="0.06" />
    </g>
  ),
  polo: ({ g, d, l }) => (
    <g>
      <Shadow g={g} rx={120} />
      <path d="M150 64 Q 200 88 250 64 L 330 100 L 306 168 L 274 156 L 274 330 L 126 330 L 126 156 L 94 168 L 70 100 Z" fill={g('body')} />
      <path d="M160 60 L200 96 L240 60 L232 52 L200 80 L168 52 Z" fill={d} />
      <rect x="196" y="96" width="8" height="54" fill={d} opacity="0.6" />
      <circle cx="200" cy="112" r="3" fill={l} />
      <circle cx="200" cy="132" r="3" fill={l} />
    </g>
  ),
  shirt: ({ g, d, l }) => (
    <g>
      <Shadow g={g} rx={120} />
      <path d="M150 58 L 200 80 L 250 58 L 324 96 L 318 330 L 282 330 L 278 140 L 274 330 L 126 330 L 122 140 L 118 330 L 82 330 L 76 96 Z" fill={g('body')} />
      <path d="M150 58 L 200 80 L 250 58 L 238 92 L 200 84 L 162 92 Z" fill={l} />
      <line x1="200" y1="84" x2="200" y2="330" stroke={d} strokeWidth="3" />
      {[110, 150, 190, 230, 270, 310].map((y) => <circle key={y} cx="206" cy={y} r="3" fill={l} />)}
      <rect x="146" y="140" width="34" height="38" rx="3" fill="none" stroke={d} strokeWidth="2" opacity="0.6" />
    </g>
  ),
  hoodie: ({ g, d, l }) => (
    <g>
      <Shadow g={g} rx={130} />
      <path d="M150 80 Q 200 30 250 80 L 330 112 L 320 300 L 286 300 L 280 170 L 280 332 L 120 332 L 120 170 L 114 300 L 80 300 L 70 112 Z" fill={g('body')} />
      <path d="M156 84 Q 200 40 244 84 Q 220 120 200 120 Q 180 120 156 84 Z" fill={d} />
      <line x1="190" y1="118" x2="186" y2="176" stroke={l} strokeWidth="3" strokeLinecap="round" />
      <line x1="210" y1="118" x2="214" y2="176" stroke={l} strokeWidth="3" strokeLinecap="round" />
      <path d="M146 250 h108 l10 50 h-128 Z" fill={d} opacity="0.45" />
      <rect x="120" y="316" width="160" height="16" fill={d} opacity="0.5" />
    </g>
  ),
  jacket: ({ g, d }) => (
    <g>
      <Shadow g={g} rx={130} />
      <path d="M150 64 L 200 86 L 250 64 L 328 100 L 322 320 L 286 320 L 282 160 L 280 330 L 120 330 L 118 160 L 114 320 L 78 320 L 72 100 Z" fill={g('body')} />
      <path d="M150 64 L 200 120 L 250 64 L 236 60 L 200 96 L 164 60 Z" fill={d} />
      <line x1="200" y1="120" x2="200" y2="330" stroke={d} strokeWidth="3" />
      <rect x="138" y="160" width="40" height="34" rx="3" fill={d} opacity="0.4" />
      <rect x="222" y="160" width="40" height="34" rx="3" fill={d} opacity="0.4" />
      <rect x="120" y="312" width="160" height="18" fill={d} opacity="0.4" />
    </g>
  ),
  puffer: ({ g, d }) => (
    <g>
      <Shadow g={g} rx={140} />
      <path d="M144 70 Q 200 50 256 70 L 334 110 L 326 312 L 284 312 L 282 336 L 118 336 L 116 312 L 74 312 L 66 110 Z" fill={g('body')} />
      {[120, 162, 204, 246, 288].map((y) => <path key={y} d={`M84 ${y} Q 200 ${y + 10} 316 ${y}`} stroke="#000" strokeOpacity="0.3" strokeWidth="2.5" fill="none" />)}
      <line x1="200" y1="70" x2="200" y2="336" stroke="#000" strokeOpacity="0.45" strokeWidth="3" />
      <path d="M150 70 Q 200 96 250 70 L 246 54 Q 200 72 154 54 Z" fill={d} />
    </g>
  ),
  jeans: ({ g, d, l }) => (
    <g>
      <Shadow g={g} rx={100} />
      <path d="M120 54 h160 l16 282 h-80 l-16 -196 l-16 196 h-80 Z" fill={g('body')} />
      <rect x="120" y="54" width="160" height="22" fill={d} />
      <rect x="194" y="58" width="12" height="14" rx="2" fill="#c9a24a" />
      <path d="M200 76 v62" stroke={l} strokeWidth="2" strokeDasharray="4 3" opacity="0.7" />
      <path d="M130 84 Q 160 110 176 84" stroke={l} strokeWidth="2" fill="none" strokeDasharray="4 3" opacity="0.7" />
      <path d="M270 84 Q 240 110 224 84" stroke={l} strokeWidth="2" fill="none" strokeDasharray="4 3" opacity="0.7" />
    </g>
  ),
  dress: ({ g, d }) => (
    <g>
      <Shadow g={g} rx={130} />
      <path d="M168 50 L 176 50 Q 200 86 224 50 L 232 50 L 252 120 Q 244 140 238 150 Q 300 250 320 330 L 80 330 Q 100 250 162 150 Q 156 140 148 120 Z" fill={g('body')} />
      <path d="M162 150 Q 200 162 238 150" stroke={d} strokeWidth="5" fill="none" />
      <path d="M200 160 Q 190 250 170 330 M200 160 Q 214 250 240 330" stroke={d} strokeWidth="2" fill="none" opacity="0.4" />
    </g>
  ),
  kurta: ({ g, d, l }) => (
    <g>
      <Shadow g={g} rx={120} />
      <path d="M152 50 Q 200 70 248 50 L 322 90 L 300 200 L 272 192 L 284 336 L 116 336 L 128 192 L 100 200 L 78 90 Z" fill={g('body')} />
      <path d="M186 58 L 200 120 L 214 58" stroke={d} strokeWidth="3" fill="none" />
      {[...Array(6)].map((_, r) => [...Array(5)].map((__, i) => <circle key={`${r}-${i}`} cx={146 + i * 27 + (r % 2) * 13} cy={150 + r * 32} r="5" fill={l} opacity="0.55" />))}
      <path d="M116 320 h168" stroke={l} strokeWidth="6" opacity="0.5" />
    </g>
  ),
  sunglasses: ({ g, c }) => (
    <g>
      <Shadow g={g} rx={150} cy={262} />
      <path d="M44 166 Q 44 150 60 150 L 182 150 Q 196 150 194 166 L 186 214 Q 180 248 144 248 L 94 248 Q 56 248 50 214 Z" fill={g('body')} />
      <path d="M206 166 Q 204 150 218 150 L 340 150 Q 356 150 356 166 L 350 214 Q 344 248 306 248 L 256 248 Q 220 248 214 214 Z" fill={g('body')} />
      <path d="M58 166 L 178 166 L 172 210 Q 168 234 140 234 L 98 234 Q 70 234 64 210 Z" fill={g('lensDark')} />
      <path d="M222 166 L 342 166 L 336 210 Q 330 234 302 234 L 260 234 Q 232 234 228 210 Z" fill={g('lensDark')} />
      <path d="M194 166 Q 200 156 206 166" stroke={c} strokeWidth="10" fill="none" />
      <path d="M70 176 L 110 176 L 80 214 Z" fill="#fff" opacity="0.1" />
    </g>
  ),
  handbag: ({ g, d, l }) => (
    <g>
      <Shadow g={g} rx={140} />
      <path d="M150 150 Q 150 70 200 70 Q 250 70 250 150" stroke={d} strokeWidth="12" fill="none" />
      <path d="M80 150 h240 l26 186 h-292 Z" fill={g('body')} />
      <path d="M80 150 h240 l4 24 h-248 Z" fill={l} opacity="0.35" />
      <rect x="180" y="190" width="40" height="18" rx="4" fill="#d6b56a" />
      <path d="M92 168 h216" stroke={d} strokeWidth="1.5" strokeDasharray="5 4" opacity="0.6" />
    </g>
  ),
  shoe: ({ g, c, d, l }) => {
    const sole = '#f5f4f0'
    const accent = isLight(c) ? '#121310' : '#ffffff'
    return (
      <g>
        <Shadow g={g} rx={168} cy={330} />
        <g transform="rotate(-4 200 260)">
          <path d="M62 286 C 52 258, 54 224, 74 206 C 88 194, 106 192, 124 202 C 136 209, 148 204, 160 190 L 188 158 C 196 150, 208 150, 214 158 C 238 194, 272 212, 314 226 C 340 235, 358 252, 360 278 L 360 288 Z" fill={g('body')} />
          <path d="M84 206 C 98 198, 116 200, 128 208 C 120 216, 96 216, 84 206 Z" fill={d} />
          <path d="M70 230 C 66 252, 66 272, 72 288 L 110 288 C 102 266, 100 244, 108 222 C 96 216, 80 218, 70 230 Z" fill={d} opacity="0.35" />
          <path d="M44 284 C 120 294, 280 294, 364 278 C 370 294, 362 312, 342 315 L 72 318 C 52 318, 42 304, 44 284 Z" fill={sole} />
          <path d="M44 300 C 120 306, 280 306, 366 294" stroke="#dcd8ce" strokeWidth="2" fill="none" />
          <path d="M60 318 L 342 315 C 354 315, 362 309, 365 300 L 365 306 C 362 318, 352 324, 340 324 L 68 326 C 56 326, 50 320, 52 314 Z" fill="#2a2b2e" />
          {[0, 1, 2, 3, 4].map((i) => (
            <line key={i} x1={192 + i * 19} y1={176 + i * 11} x2={204 + i * 19} y2={162 + i * 11} stroke={accent} strokeWidth="4" strokeLinecap="round" opacity="0.9" />
          ))}
          <path d="M100 266 C 160 236, 236 226, 334 252" stroke={accent} strokeWidth="10" fill="none" strokeLinecap="round" opacity="0.92" />
          <path d="M120 200 C 150 170, 180 150, 196 152" stroke={l} strokeWidth="3" fill="none" opacity="0.6" />
          <rect x="58" y="214" width="10" height="34" rx="4" fill={accent} opacity="0.85" transform="rotate(-12 63 231)" />
        </g>
      </g>
    )
  },
  sneaker: ({ g, c, d }) => {
    const white = isLight(c)
    const sole = white ? '#f8f7f3' : '#f3f1ea'
    const stripe = white ? '#1c1d20' : '#f3f1ea'
    return (
      <g>
        <Shadow g={g} rx={170} cy={330} />
        <path d="M58 290 C 48 262, 50 232, 72 216 C 90 204, 112 204, 128 212 C 140 218, 152 214, 162 202 L 182 176 C 190 166, 204 166, 212 174 C 236 200, 268 214, 310 226 C 338 234, 356 252, 358 280 L 358 292 Z" fill={g('body')} />
        <path d="M80 218 C 96 210, 114 212, 126 220 C 116 226, 92 226, 80 218 Z" fill={white ? '#d9d6ce' : d} />
        <path d="M240 210 C 280 226, 330 232, 356 270" stroke={white ? '#d5d2c9' : d} strokeWidth="2" fill="none" strokeDasharray="5 4" />
        <path d="M200 258 C 220 236, 260 228, 300 236 L 330 256 C 300 254, 240 260, 200 270 Z" fill={d} opacity={white ? 0.12 : 0.45} />
        <path d="M62 236 C 60 256, 62 276, 70 292 L 118 292 C 110 272, 108 248, 116 226 C 100 220, 76 222, 62 236 Z" fill={white ? '#e7e4dc' : d} opacity={white ? 1 : 0.55} />
        {[0, 1, 2].map((i) => (
          <path key={i} d={`M${150 + i * 20} 272 L ${176 + i * 20} 216`} stroke={stripe} strokeWidth="9" strokeLinecap="round" opacity={white ? 0.9 : 0.95} />
        ))}
        {[0, 1, 2, 3].map((i) => (
          <line key={i} x1={196 + i * 17} y1={188 + i * 9} x2={208 + i * 17} y2={176 + i * 9} stroke={white ? '#bdb9ae' : '#fff'} strokeWidth="3.5" strokeLinecap="round" />
        ))}
        <path d="M44 288 L 362 286 L 362 312 C 362 318, 356 322, 350 322 L 54 324 C 48 324, 44 320, 44 314 Z" fill={sole} stroke="#d6d2c8" strokeWidth="1.5" />
        <path d="M46 302 L 360 300" stroke="#d6d2c8" strokeWidth="2" />
      </g>
    )
  },
  clog: ({ g, d }) => (
    <g>
      <Shadow g={g} rx={150} cy={316} />
      <path d="M60 300 Q 50 230 120 200 Q 200 168 280 196 Q 350 220 350 300 Z" fill={g('body')} />
      <path d="M56 296 h298 v14 q-150 14 -298 0 Z" fill={d} />
      {[[140, 220], [170, 210], [200, 206], [230, 208], [260, 214], [150, 248], [180, 240], [210, 238], [240, 242]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="7" fill="#000" opacity="0.35" />)}
      <path d="M300 230 Q 340 250 330 290" stroke={d} strokeWidth="10" fill="none" />
    </g>
  ),
  formalshoe: ({ g, l }) => (
    <g>
      <Shadow g={g} rx={165} cy={318} />
      <path d="M40 296 Q 36 262 70 252 L 160 226 Q 190 200 220 196 Q 240 196 250 210 Q 290 214 330 236 Q 362 256 360 296 Z" fill={g('body')} />
      <path d="M36 294 h326 v14 q-160 14 -322 2 Z" fill="#141414" />
      <path d="M160 226 Q 200 236 250 210" stroke={l} strokeWidth="2" fill="none" opacity="0.4" />
      <path d="M70 252 Q 90 280 140 280" stroke={l} strokeWidth="2" fill="none" opacity="0.4" strokeDasharray="4 3" />
      <ellipse cx="120" cy="262" rx="40" ry="10" fill="#fff" opacity="0.12" />
    </g>
  ),
  // Beauty
  serum: ({ g, c, brand }) => (
    <g>
      <Shadow g={g} rx={66} />
      <rect x="176" y="58" width="48" height="56" rx="18" fill="#1d1e21" />
      <rect x="186" y="110" width="28" height="24" fill="#2a2b2e" />
      <rect x="140" y="130" width="120" height="206" rx="18" fill={g('glass')} />
      <rect x="146" y="200" width="108" height="130" rx="12" fill={c} opacity="0.85" />
      <Label x={156} y={190} w={88} h={70} fill="#fbfaf7" text={shortBrand(brand)} color="#1d1e21" size={13} r={3} sub="SERUM" />
      <rect x="150" y="140" width="10" height="180" rx="5" fill="#fff" opacity="0.4" />
    </g>
  ),
  jar: ({ g, brand }) => (
    <g>
      <Shadow g={g} rx={110} />
      <rect x="96" y="110" width="208" height="54" rx="12" fill="#2a63a8" />
      <rect x="90" y="156" width="220" height="180" rx="22" fill={g('bodyV')} />
      <Label x={110} y={196} w={180} h={96} fill="#ffffff" text={shortBrand(brand)} color="#2a63a8" size={24} r={6} sub="MOISTURISING CREAM" />
    </g>
  ),
  tube: ({ g, c, d, brand }) => (
    <g>
      <Shadow g={g} rx={70} />
      <path d="M140 56 h120 l-14 220 h-92 Z" fill={g('bodyV')} />
      <rect x="150" y="276" width="100" height="60" rx="10" fill="#f4f3ef" />
      <rect x="140" y="56" width="120" height="14" fill={d} />
      <text x="200" y="150" textAnchor="middle" fontFamily="Plus Jakarta Sans Variable" fontWeight="800" fontSize="17" fill={onColor(c)}>{shortBrand(brand)}</text>
      <text x="200" y="186" textAnchor="middle" fontFamily="Inter Variable" fontWeight="800" fontSize="26" fill={onColor(c)}>SPF 50+</text>
    </g>
  ),
  lipstick: ({ g }) => (
    <g>
      <Shadow g={g} rx={86} />
      <g transform="rotate(-12 200 220)">
        <path d="M176 70 L 224 96 L 224 170 L 176 170 Z" fill={g('body')} />
        <rect x="168" y="166" width="64" height="40" rx="3" fill={g('metal')} />
        <rect x="160" y="204" width="80" height="132" rx="6" fill="#141416" />
        <rect x="166" y="210" width="10" height="120" rx="5" fill="#fff" opacity="0.12" />
      </g>
    </g>
  ),
  foundation: ({ g, c, brand }) => (
    <g>
      <Shadow g={g} rx={80} />
      <rect x="168" y="60" width="64" height="70" rx="6" fill="#1a1b1d" />
      <rect x="134" y="126" width="132" height="210" rx="14" fill={g('glass')} />
      <rect x="140" y="132" width="120" height="198" rx="10" fill={c} />
      <Label x={152} y={196} w={96} h={60} fill="#ffffff" text={shortBrand(brand)} color="#1d1e21" size={13} r={3} sub="FIT ME" />
    </g>
  ),
  perfume: ({ g, c, brand }) => (
    <g>
      <Shadow g={g} rx={100} />
      <rect x="172" y="52" width="56" height="58" rx="6" fill={g('metal')} />
      <rect x="186" y="106" width="28" height="20" fill="#b7babd" />
      <rect x="106" y="122" width="188" height="214" rx="24" fill={g('glass')} />
      <rect x="114" y="130" width="172" height="198" rx="18" fill={c} opacity="0.8" />
      <text x="200" y="244" textAnchor="middle" fontFamily="Plus Jakarta Sans Variable" fontWeight="700" fontSize="18" fill={onColor(c)} letterSpacing="2">{shortBrand(brand).toUpperCase()}</text>
      <rect x="120" y="136" width="14" height="184" rx="7" fill="#fff" opacity="0.35" />
    </g>
  ),
  shampoo: ({ g, d, brand }) => (
    <g>
      <Shadow g={g} rx={80} />
      <rect x="176" y="52" width="48" height="44" rx="8" fill={d} />
      <path d="M150 96 h100 q24 0 24 24 v196 q0 20 -20 20 h-108 q-20 0 -20 -20 v-196 q0 -24 24 -24 Z" fill={g('bodyV')} />
      <Label x={146} y={180} w={108} h={84} fill="#fbfaf7" text={shortBrand(brand)} color={d} size={14} r={6} sub="SHAMPOO" />
    </g>
  ),
  detergent: ({ g, c, brand }) => (
    <g>
      <Shadow g={g} rx={110} />
      <rect x="210" y="60" width="56" height="40" rx="8" fill="#e33b2c" />
      <path d="M110 100 h170 q20 0 20 20 v196 q0 20 -20 20 h-170 q-20 0 -20 -20 v-196 q0 -20 20 -20 Z" fill={g('bodyV')} />
      <path d="M110 110 h50 v70 h-50 Z" fill="#fff" opacity="0.25" />
      <Label x={120} y={196} w={160} h={90} fill="#ffffff" text={shortBrand(brand)} color={c} size={22} r={45} sub="MATIC LIQUID" />
    </g>
  ),
  hairdryer: ({ g, c }) => (
    <g>
      <Shadow g={g} rx={90} />
      <rect x="176" y="190" width="48" height="146" rx="22" fill={g('bodyV')} />
      <circle cx="200" cy="140" r="78" fill={g('body')} />
      <circle cx="200" cy="140" r="44" fill="#141518" />
      <circle cx="200" cy="140" r="34" fill="none" stroke={mix(c, '#e8b4b0', 0.6)} strokeWidth="8" />
      <rect x="182" y="300" width="36" height="10" rx="5" fill={mix(c, '#e8b4b0', 0.6)} />
    </g>
  ),
  trimmer: ({ g }) => (
    <g>
      <Shadow g={g} rx={60} />
      <rect x="168" y="80" width="64" height="256" rx="30" fill={g('bodyV')} />
      <rect x="160" y="54" width="80" height="42" rx="10" fill="#1d1e21" />
      <rect x="166" y="60" width="68" height="12" rx="3" fill={g('metal')} />
      <circle cx="200" cy="170" r="14" fill="#1d1e21" />
      <rect x="168" y="236" width="64" height="100" rx="20" fill="#1d1e21" opacity="0.85" />
    </g>
  ),
  shaver: ({ g }) => (
    <g>
      <Shadow g={g} rx={70} />
      <path d="M150 140 h100 l-16 196 h-68 Z" fill={g('bodyV')} />
      <rect x="128" y="64" width="144" height="82" rx="30" fill="#1c1d1f" />
      {[160, 200, 240].map((x) => <circle key={x} cx={x} cy="104" r="20" fill={g('metal')} stroke="#2a2b2e" strokeWidth="3" />)}
      <circle cx="200" cy="200" r="12" fill="#3b9cf0" opacity="0.8" />
    </g>
  ),
  // Home
  bulb: ({ g, c }) => (
    <g>
      <Shadow g={g} rx={70} />
      <circle cx="200" cy="150" r="96" fill={g('glow')} opacity="0.6" />
      <path d="M200 60 C 260 60 290 110 280 156 C 272 192 244 206 240 250 L 160 250 C 156 206 128 192 120 156 C 110 110 140 60 200 60 Z" fill={c} />
      <path d="M200 60 C 260 60 290 110 280 156 C 272 192 244 206 240 250 L 160 250 C 156 206 128 192 120 156 C 110 110 140 60 200 60 Z" fill="#fff" opacity="0.35" />
      <rect x="160" y="246" width="80" height="62" rx="6" fill={g('metal')} />
      {[262, 278, 294].map((y) => <rect key={y} x="160" y={y} width="80" height="3" fill="#8e9297" />)}
      <path d="M180 308 h40 l-8 22 h-24 Z" fill="#3a3b3e" />
    </g>
  ),
  lamp: ({ g, c }) => (
    <g>
      <Shadow g={g} rx={80} />
      <path d="M130 60 h140 l-30 60 h-80 Z" fill={g('bodyV')} />
      <ellipse cx="200" cy="64" rx="70" ry="10" fill="#f3d27a" opacity="0.6" />
      <rect x="196" y="118" width="8" height="200" fill={c} />
      <ellipse cx="200" cy="326" rx="60" ry="12" fill={c} />
    </g>
  ),
  vase: ({ g, d }) => (
    <g>
      <Shadow g={g} rx={80} />
      <path d="M180 80 v40 Q 120 150 128 240 Q 136 330 200 336 Q 264 330 272 240 Q 280 150 220 120 v-40 Z" fill={g('body')} />
      {[...Array(9)].map((_, i) => <path key={i} d={`M${144 + i * 14} 160 Q ${140 + i * 15} 250 ${150 + i * 12.5} 326`} stroke={d} strokeWidth="2" fill="none" opacity="0.35" />)}
      <path d="M200 80 Q 190 40 160 30 M204 80 Q 220 30 260 40 M200 80 Q 200 30 210 20" stroke="#6a7b5a" strokeWidth="3" fill="none" />
      <ellipse cx="160" cy="30" rx="12" ry="7" fill="#6a7b5a" />
      <ellipse cx="260" cy="40" rx="12" ry="7" fill="#6a7b5a" />
    </g>
  ),
  bedding: ({ g, d }) => (
    <g>
      <Shadow g={g} rx={150} />
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(0 ${i * -58})`}>
          <rect x="60" y="270" width="280" height="56" rx="10" fill={i === 1 ? '#f4f2ed' : g('body')} />
          <path d="M60 296 h280" stroke={i === 1 ? '#ddd9cf' : d} strokeWidth="2" opacity="0.5" />
        </g>
      ))}
      <rect x="160" y="160" width="80" height="22" rx="3" fill="#fff" opacity="0.8" />
    </g>
  ),
  towel: (p) => D.bedding(p),
  mattress: ({ g, d }) => (
    <g>
      <Shadow g={g} rx={180} cy={300} />
      <path d="M30 210 L 120 150 L 370 150 L 370 230 L 280 290 L 30 290 Z" fill={d} opacity="0.4" />
      <path d="M30 210 L 120 150 L 370 150 L 280 210 Z" fill={g('body')} />
      <path d="M30 210 h250 v80 h-250 Z" fill="#dcd9d2" />
      <path d="M280 210 L 370 150 v80 L 280 290 Z" fill="#c9c6bf" />
      {[0, 1, 2, 3, 4].map((i) => <line key={i} x1={60 + i * 52} y1="196" x2={150 + i * 52} y2="160" stroke="#c8c5bd" strokeWidth="2" />)}
      <path d="M30 236 h250" stroke="#2a3e5e" strokeWidth="6" />
    </g>
  ),
  flask: ({ g }) => (
    <g>
      <Shadow g={g} rx={110} />
      {[-58, 58].map((dx) => (
        <g key={dx} transform={`translate(${dx} 0)`}>
          <rect x="164" y="64" width="72" height="44" rx="10" fill="#1d1e21" />
          <rect x="156" y="100" width="88" height="236" rx="20" fill={g('metal')} />
          <rect x="166" y="110" width="12" height="216" rx="6" fill="#fff" opacity="0.4" />
        </g>
      ))}
    </g>
  ),
  purifier: ({ g }) => (
    <g>
      <Shadow g={g} rx={100} />
      <rect x="120" y="60" width="160" height="276" rx="26" fill={g('bodyV')} />
      <rect x="132" y="72" width="136" height="38" rx="10" fill="#1d1e21" />
      <circle cx="160" cy="91" r="6" fill="#3b9cf0" />
      <text x="214" y="97" textAnchor="middle" fontFamily="Inter Variable" fontWeight="600" fontSize="16" fill="#fff">PM2.5 12</text>
      {[...Array(8)].map((_, r) => <rect key={r} x="140" y={140 + r * 22} width="120" height="8" rx="4" fill="#000" opacity="0.08" />)}
    </g>
  ),
  // Furniture
  chair: ({ g, d }) => (
    <g>
      <Shadow g={g} rx={120} />
      <path d="M140 40 Q 200 26 260 40 L 268 190 Q 200 206 132 190 Z" fill={g('mesh')} stroke={d} strokeWidth="8" />
      <rect x="120" y="196" width="160" height="40" rx="16" fill={g('body')} />
      <path d="M110 160 v40 h30 M290 160 v40 h-30" stroke={d} strokeWidth="10" fill="none" strokeLinecap="round" />
      <rect x="192" y="236" width="16" height="60" fill="#3a3b3e" />
      <path d="M200 296 L 110 322 M200 296 L 290 322 M200 296 L 150 334 M200 296 L 250 334 M200 296 L200 330" stroke="#2a2b2e" strokeWidth="8" strokeLinecap="round" />
      {[110, 290, 150, 250, 200].map((x, i) => <circle key={i} cx={x} cy={[326, 326, 338, 338, 334][i]} r="7" fill="#151618" />)}
    </g>
  ),
  sofa: ({ g, d }) => (
    <g>
      <Shadow g={g} rx={180} cy={318} />
      <rect x="44" y="120" width="312" height="130" rx="22" fill={d} />
      <rect x="64" y="128" width="132" height="100" rx="14" fill={g('body')} />
      <rect x="204" y="128" width="132" height="100" rx="14" fill={g('body')} />
      <rect x="22" y="180" width="62" height="120" rx="20" fill={g('body')} />
      <rect x="316" y="180" width="62" height="120" rx="20" fill={g('body')} />
      <rect x="76" y="220" width="248" height="70" rx="12" fill={g('bodyV')} />
      <line x1="200" y1="222" x2="200" y2="288" stroke={d} strokeWidth="3" />
      <path d="M60 300 l-6 22 M340 300 l6 22" stroke="#6b4b33" strokeWidth="8" strokeLinecap="round" />
    </g>
  ),
  table: ({ g, d }) => (
    <g>
      <Shadow g={g} rx={170} cy={322} />
      <path d="M40 180 L 120 140 L 360 140 L 280 180 Z" fill={g('body')} />
      <path d="M40 180 h240 v14 h-240 Z" fill={d} />
      <path d="M280 180 L 360 140 v14 L 280 194 Z" fill={d} opacity="0.8" />
      {[[52, 194], [266, 194], [340, 154]].map(([x, y], i) => <rect key={i} x={x} y={y} width="12" height={i === 2 ? 140 : 130} fill={d} />)}
      <path d="M58 270 h220" stroke={d} strokeWidth="6" />
    </g>
  ),
  desk: ({ g, d }) => (
    <g>
      <Shadow g={g} rx={170} cy={330} />
      <rect x="40" y="130" width="320" height="22" rx="4" fill={g('body')} />
      <rect x="40" y="148" width="320" height="6" fill={d} />
      {[96, 290].map((x) => (
        <g key={x}>
          <rect x={x} y="154" width="18" height="90" fill="#2a2b2e" />
          <rect x={x + 2} y="240" width="14" height="80" fill="#3a3b3e" />
          <rect x={x - 30} y="318" width="78" height="10" rx="4" fill="#2a2b2e" />
        </g>
      ))}
      <rect x="300" y="152" width="40" height="16" rx="3" fill="#1d1e21" />
      <text x="320" y="164" textAnchor="middle" fontFamily="Inter Variable" fontWeight="600" fontSize="10" fill="#2fbf71">108</text>
    </g>
  ),
  shelf: ({ g, d }) => (
    <g>
      <Shadow g={g} rx={100} />
      <rect x="110" y="40" width="180" height="296" fill={g('body')} />
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <rect x="122" y={52 + i * 70} width="156" height="58" fill={d} />
          {[...Array(5 - (i % 2))].map((_, j) => <rect key={j} x={130 + j * 18} y={66 + i * 70} width="14" height="44" fill={['#c4302b', '#e8dcc0', '#1f4f8c', '#6faf5a', '#e3a73a'][(i + j) % 5]} />)}
        </g>
      ))}
    </g>
  ),
  // Kitchen
  cookware: ({ g, d }) => (
    <g>
      <Shadow g={g} rx={170} cy={320} />
      <ellipse cx="160" cy="250" rx="120" ry="50" fill={g('body')} />
      <ellipse cx="160" cy="240" rx="108" ry="40" fill="#141517" />
      <ellipse cx="160" cy="240" rx="96" ry="34" fill="#25262a" />
      {[...Array(20)].map((_, i) => <circle key={i} cx={90 + ((i * 37) % 140)} cy={222 + ((i * 13) % 36)} r="1.6" fill="#888" opacity="0.6" />)}
      <path d="M268 232 L 380 196 L 386 212 L 278 254 Z" fill="#7a5034" />
      <ellipse cx="232" cy="140" rx="70" ry="22" fill={d} />
      <ellipse cx="232" cy="134" rx="62" ry="18" fill="#1d1e21" />
      <rect x="226" y="98" width="12" height="20" rx="4" fill="#7a5034" />
    </g>
  ),
  cooker: ({ g }) => (
    <g>
      <Shadow g={g} rx={130} />
      <path d="M88 170 h224 v130 q0 36 -36 36 h-152 q-36 0 -36 -36 Z" fill={g('bodyV')} />
      <ellipse cx="200" cy="170" rx="112" ry="22" fill="#2f3033" />
      <path d="M286 162 L 388 148 L 390 166 L 290 180 Z" fill="#141516" />
      <rect x="186" y="118" width="28" height="40" rx="6" fill="#141516" />
      <circle cx="200" cy="112" r="12" fill="#141516" />
      <path d="M88 220 h224" stroke="#fff" strokeOpacity="0.06" strokeWidth="20" />
    </g>
  ),
  mixer: ({ g }) => (
    <g>
      <Shadow g={g} rx={110} />
      <path d="M140 60 h120 l-14 140 h-92 Z" fill={g('glass')} stroke="#c9ccd0" strokeWidth="3" />
      <rect x="140" y="50" width="120" height="20" rx="6" fill="#2a2b2e" />
      <rect x="110" y="200" width="180" height="136" rx="22" fill={g('bodyV')} />
      <circle cx="200" cy="270" r="26" fill="#2a2b2e" />
      <rect x="196" y="250" width="8" height="18" rx="4" fill="#e33b2c" />
    </g>
  ),
  standmixer: ({ g }) => (
    <g>
      <Shadow g={g} rx={150} />
      <rect x="80" y="304" width="230" height="32" rx="14" fill={g('bodyV')} />
      <path d="M90 300 Q 76 160 110 120 Q 140 86 200 86 h90 q46 0 46 46 q0 40 -46 40 h-120 q-30 0 -36 30 L 156 300 Z" fill={g('body')} />
      <path d="M190 220 h150 l-20 84 h-110 Z" fill={g('metal')} />
      <rect x="250" y="172" width="12" height="40" fill="#c9ccd0" />
      <ellipse cx="160" cy="130" rx="40" ry="16" fill="#fff" opacity="0.14" />
    </g>
  ),
  kettle: ({ g }) => (
    <g>
      <Shadow g={g} rx={110} />
      <path d="M130 110 h140 l20 196 h-180 Z" fill={g('metal')} />
      <path d="M270 130 Q 330 140 320 230 Q 314 270 290 280" stroke="#1d1e21" strokeWidth="18" fill="none" strokeLinecap="round" />
      <path d="M130 140 L 80 120 L 90 150 L 128 170 Z" fill="#a9adb2" />
      <ellipse cx="200" cy="108" rx="70" ry="12" fill="#1d1e21" />
      <rect x="100" y="304" width="200" height="32" rx="10" fill="#1d1e21" />
      <rect x="150" y="120" width="14" height="170" rx="7" fill="#fff" opacity="0.4" />
    </g>
  ),
  airfryer: ({ g }) => (
    <g>
      <Shadow g={g} rx={120} />
      <path d="M110 80 Q 110 60 130 60 h140 q20 0 20 20 l16 236 q0 20 -20 20 h-172 q-20 0 -20 -20 Z" fill={g('bodyV')} />
      <rect x="134" y="80" width="132" height="46" rx="10" fill="#0d0e10" />
      <text x="200" y="110" textAnchor="middle" fontFamily="Inter Variable" fontWeight="500" fontSize="18" fill="#f0a23c">180°</text>
      <path d="M116 180 h168 l12 140 q0 10 -10 10 h-172 q-10 0 -10 -10 Z" fill="#000" opacity="0.25" />
      <rect x="170" y="200" width="60" height="16" rx="8" fill="#0d0e10" />
    </g>
  ),
  plates: ({ g }) => (
    <g>
      <Shadow g={g} rx={150} />
      {[0, 1, 2, 3].map((i) => <ellipse key={i} cx="200" cy={300 - i * 10} rx="140" ry="36" fill="#fff" stroke="#d6d3cb" strokeWidth="2" />)}
      <ellipse cx="200" cy="270" rx="110" ry="26" fill="none" stroke="#3d6c9b" strokeWidth="3" opacity="0.6" />
      <path d="M120 180 Q 120 130 200 130 Q 280 130 280 180 Q 280 230 200 236 Q 120 230 120 180 Z" fill="#fff" stroke="#d6d3cb" strokeWidth="2" />
      <ellipse cx="200" cy="146" rx="80" ry="14" fill="#efede7" />
    </g>
  ),
  coffeemachine: ({ g }) => (
    <g>
      <Shadow g={g} rx={100} />
      <rect x="110" y="60" width="180" height="276" rx="40" fill={g('bodyV')} />
      <rect x="120" y="220" width="160" height="100" rx="12" fill="#0d0e10" />
      <path d="M170 240 h60 v60 q0 12 -12 12 h-36 q-12 0 -12 -12 Z" fill="#f2f1ec" />
      <ellipse cx="200" cy="244" rx="28" ry="5" fill="#6b3b22" />
      <circle cx="200" cy="120" r="16" fill="#0d0e10" />
      <circle cx="200" cy="120" r="6" fill="#f0a23c" />
    </g>
  ),
  // Appliances
  fridge: ({ g, c }) => (
    <g>
      <Shadow g={g} rx={130} />
      <rect x="90" y="30" width="220" height="306" rx="12" fill={g('metal')} />
      <rect x="90" y="30" width="220" height="306" rx="12" fill={c} opacity="0.5" />
      <line x1="200" y1="30" x2="200" y2="336" stroke="#7d8186" strokeWidth="3" />
      <rect x="182" y="110" width="8" height="90" rx="4" fill="#5d6166" />
      <rect x="210" y="110" width="8" height="90" rx="4" fill="#5d6166" />
      <rect x="110" y="70" width="60" height="70" rx="6" fill="#141518" />
      <text x="140" y="110" textAnchor="middle" fontFamily="Inter Variable" fontWeight="500" fontSize="16" fill="#3b9cf0">3°</text>
    </g>
  ),
  fridge2: ({ g }) => (
    <g>
      <Shadow g={g} rx={90} />
      <rect x="120" y="30" width="160" height="306" rx="14" fill={g('bodyV')} />
      <line x1="120" y1="120" x2="280" y2="120" stroke="#000" strokeOpacity="0.35" strokeWidth="3" />
      <rect x="256" y="60" width="8" height="40" rx="4" fill="#c9ccd0" />
      <rect x="256" y="140" width="8" height="90" rx="4" fill="#c9ccd0" />
      {[...Array(6)].map((_, i) => <path key={i} d={`M130 ${150 + i * 28} q 30 -12 60 0 t 60 0`} stroke="#fff" strokeOpacity="0.07" strokeWidth="6" fill="none" />)}
    </g>
  ),
  washer: ({ g }) => (
    <g>
      <Shadow g={g} rx={130} />
      <rect x="90" y="50" width="220" height="286" rx="16" fill={g('bodyV')} />
      <rect x="90" y="50" width="220" height="56" rx="16" fill="#000" opacity="0.06" />
      <circle cx="122" cy="78" r="12" fill="#1d1e21" opacity="0.8" />
      <rect x="150" y="66" width="80" height="24" rx="5" fill="#141518" />
      <text x="190" y="84" textAnchor="middle" fontFamily="Inter Variable" fontWeight="500" fontSize="14" fill="#3b9cf0">1:24</text>
      <circle cx="200" cy="216" r="88" fill="#8a8e93" />
      <circle cx="200" cy="216" r="74" fill="#141518" />
      <circle cx="200" cy="216" r="60" fill={g('lensDark')} />
      <path d="M150 200 Q 200 260 250 200" stroke="#3b9cf0" strokeWidth="6" fill="none" opacity="0.5" />
    </g>
  ),
  washer2: ({ g }) => (
    <g>
      <Shadow g={g} rx={110} />
      <rect x="130" y="130" width="140" height="190" rx="26" fill={g('bodyV')} />
      <circle cx="160" cy="320" r="22" fill="#1d1e21" />
      <circle cx="250" cy="320" r="22" fill="#1d1e21" />
      <path d="M180 130 Q 180 60 240 60 h40" stroke="#1d1e21" strokeWidth="14" fill="none" strokeLinecap="round" />
      <path d="M270 200 Q 340 200 340 280 Q 340 330 300 330" stroke="#1d1e21" strokeWidth="6" fill="none" />
      <rect x="150" y="180" width="100" height="40" rx="6" fill="#1d1e21" opacity="0.3" />
    </g>
  ),
  ac: ({ g }) => (
    <g>
      <Shadow g={g} rx={180} cy={262} />
      <rect x="20" y="130" width="360" height="110" rx="24" fill={g('bodyV')} />
      <rect x="40" y="214" width="320" height="10" rx="5" fill="#c9cbcd" />
      <rect x="40" y="226" width="320" height="4" rx="2" fill="#dadcde" />
      <circle cx="330" cy="168" r="4" fill="#3b9cf0" />
      <text x="300" y="173" textAnchor="end" fontFamily="Inter Variable" fontWeight="500" fontSize="14" fill="#5a5e63">24°C</text>
    </g>
  ),
  microwave: ({ g }) => (
    <g>
      <Shadow g={g} rx={170} cy={320} />
      <rect x="30" y="110" width="340" height="210" rx="18" fill={g('bodyV')} />
      <rect x="48" y="128" width="230" height="174" rx="10" fill="#0c0d0f" />
      <rect x="58" y="138" width="210" height="154" rx="6" fill={g('lensDark')} opacity="0.8" />
      <rect x="292" y="132" width="62" height="28" rx="5" fill="#141518" />
      <text x="323" y="152" textAnchor="middle" fontFamily="Inter Variable" fontWeight="500" fontSize="14" fill="#2fbf71">12:30</text>
      {[...Array(4)].map((_, r) => [0, 1].map((i) => <rect key={`${r}-${i}`} x={294 + i * 32} y={176 + r * 26} width="26" height="18" rx="4" fill="#3a3b3f" />))}
    </g>
  ),
  vacuum: ({ g, c }) => (
    <g>
      <Shadow g={g} rx={120} />
      <rect x="196" y="120" width="10" height="196" fill={g('metal')} transform="rotate(14 200 220)" />
      <path d="M120 312 h140 q14 0 14 14 v6 h-168 v-6 q0 -14 14 -14 Z" fill="#2a2b2e" />
      <rect x="208" y="40" width="70" height="110" rx="20" fill={c} />
      <rect x="216" y="56" width="54" height="80" rx="14" fill={g('glass')} />
      <path d="M278 80 q 40 0 40 40 v30" stroke="#2a2b2e" strokeWidth="14" fill="none" strokeLinecap="round" />
      <circle cx="243" cy="96" r="14" fill="#c4302b" opacity="0.8" />
    </g>
  ),
  robovac: ({ g }) => (
    <g>
      <Shadow g={g} rx={150} cy={286} />
      <ellipse cx="200" cy="256" rx="148" ry="44" fill="#141518" />
      <ellipse cx="200" cy="236" rx="148" ry="44" fill={g('bodyV')} />
      <ellipse cx="200" cy="222" rx="38" ry="12" fill="#0b0c0e" />
      <ellipse cx="200" cy="216" rx="38" ry="12" fill="#2a2b2e" />
      <circle cx="270" cy="236" r="4" fill="#2fbf71" />
    </g>
  ),
  // Grocery & packaged
  teabox: ({ g, c, brand, sub = 'GOLD' }) => (
    <g>
      <Shadow g={g} rx={110} />
      <path d="M110 80 L 150 56 L 310 56 L 270 80 Z" fill={shade(c, 0.2)} />
      <path d="M270 80 L 310 56 L 310 310 L 270 336 Z" fill={shade(c, -0.3)} />
      <rect x="110" y="80" width="160" height="256" fill={g('bodyV')} />
      <Label x={124} y={120} w={132} h={70} fill="#f2c230" text={shortBrand(brand)} color="#7a1018" size={20} r={6} sub={sub} />
      <circle cx="190" cy="262" r="40" fill="#fff" opacity="0.1" />
      <path d="M160 270 q 30 -40 60 0" stroke="#3f7f3a" strokeWidth="10" fill="none" strokeLinecap="round" />
    </g>
  ),
  cereal: (p) => D.teabox({ ...p, sub: 'CORN FLAKES' }),
  boardgame: ({ g, c, brand, d }) => (
    <g>
      <Shadow g={g} rx={170} cy={300} />
      <path d="M40 210 L 110 150 L 360 150 L 290 210 Z" fill={g('body')} />
      <path d="M40 210 h250 v70 h-250 Z" fill={d} />
      <path d="M290 210 L 360 150 v70 L 290 280 Z" fill={shade(c, -0.45)} />
      <text x="200" y="190" textAnchor="middle" fontFamily="Plus Jakarta Sans Variable" fontWeight="800" fontSize="28" fill="#fff" transform="skewX(-40) translate(150 0)">{shortBrand(brand).toUpperCase()}</text>
    </g>
  ),
  coffee: ({ g, c, brand }) => (
    <g>
      <Shadow g={g} rx={100} />
      <rect x="120" y="70" width="160" height="40" rx="8" fill="#c4302b" />
      <path d="M110 110 h180 q12 0 12 12 v190 q0 24 -24 24 h-156 q-24 0 -24 -24 v-190 q0 -12 12 -12 Z" fill={g('glass')} />
      <path d="M116 150 h168 v156 q0 20 -20 20 h-128 q-20 0 -20 -20 Z" fill={c} />
      <Label x={128} y={186} w={144} h={74} fill="#c4302b" text={shortBrand(brand)} color="#fff" size={22} r={4} sub="CLASSIC" />
    </g>
  ),
  coffeebag: ({ g, c, brand }) => (
    <g>
      <Shadow g={g} rx={100} />
      <path d="M120 70 h160 l12 266 h-184 Z" fill={g('bodyV')} />
      <path d="M120 70 h160 v26 h-160 Z" fill="#000" opacity="0.2" />
      <circle cx="200" cy="140" r="6" fill="#000" opacity="0.4" />
      <Label x={132} y={186} w={136} h={84} fill="#f4f1e8" text={shortBrand(brand)} color={c} size={20} r={2} sub="MEDIUM ROAST" />
    </g>
  ),
  sack: ({ g, d, brand }) => (
    <g>
      <Shadow g={g} rx={130} />
      <path d="M100 70 Q 200 56 300 70 L 312 300 Q 316 336 280 336 L 120 336 Q 84 336 88 300 Z" fill={g('bodyV')} />
      <path d="M100 70 Q 200 56 300 70 L 300 90 Q 200 78 100 90 Z" fill={d} />
      <Label x={120} y={150} w={160} h={84} fill="#ffffff" text={shortBrand(brand)} color={d} size={22} r={42} sub="PREMIUM" />
      <ellipse cx="200" cy="280" rx="70" ry="22" fill="#fff" opacity="0.18" />
    </g>
  ),
  oil: ({ g, c, brand }) => (
    <g>
      <Shadow g={g} rx={110} />
      <rect x="230" y="56" width="40" height="30" rx="6" fill="#c4302b" />
      <path d="M120 90 h170 q16 0 16 16 v210 q0 20 -20 20 h-162 q-20 0 -20 -20 v-210 q0 -16 16 -16 Z" fill={g('glass')} />
      <path d="M124 140 h178 v170 q0 18 -18 18 h-142 q-18 0 -18 -18 Z" fill={c} opacity="0.85" />
      <path d="M130 96 h40 v40 h-40 Z" fill="none" stroke="#c9ccd0" strokeWidth="8" />
      <Label x={140} y={190} w={146} h={74} fill="#1f5fc4" text={shortBrand(brand)} color="#fff" size={22} r={6} sub="SUNLITE 5L" />
    </g>
  ),
  snack: ({ g, d, brand }) => (
    <g>
      <Shadow g={g} rx={110} />
      <path d="M110 70 L 290 70 L 296 90 L 300 300 L 290 336 L 110 336 L 100 300 L 104 90 Z" fill={g('bodyV')} />
      <path d="M110 70 L 290 70 L 290 82 L 110 82 Z" fill={d} />
      <path d="M110 324 L 290 324 L 290 336 L 110 336 Z" fill={d} />
      <Label x={124} y={120} w={152} h={60} fill="#c4302b" text={shortBrand(brand)} color="#fff" size={18} r={30} />
      <ellipse cx="200" cy="250" rx="66" ry="40" fill="#b5651d" opacity="0.6" />
      {[...Array(18)].map((_, i) => <path key={i} d={`M${150 + ((i * 23) % 100)} ${226 + ((i * 11) % 44)} l 14 4`} stroke="#f2c230" strokeWidth="3" strokeLinecap="round" />)}
    </g>
  ),
  petfood: (p) => D.snack(p),
  chocolate: ({ g, brand }) => (
    <g>
      <Shadow g={g} rx={170} cy={300} />
      {[0, 1].map((i) => (
        <g key={i} transform={`translate(${i * 20 - 10} ${i * -46}) rotate(-6 200 230)`}>
          <rect x="40" y="200" width="320" height="76" rx="8" fill={g('bodyV')} />
          <path d="M40 200 h40 v76 h-40 Z M320 200 h40 v76 h-40 Z" fill="#000" opacity="0.15" />
          <text x="200" y="250" textAnchor="middle" fontFamily="Plus Jakarta Sans Variable" fontWeight="700" fontStyle="italic" fontSize="30" fill="#fff">{shortBrand(brand)}</text>
        </g>
      ))}
    </g>
  ),
  petpouch: ({ g, brand }) => (
    <g>
      <Shadow g={g} rx={120} />
      {[-40, 0, 40].map((dx, i) => (
        <g key={dx} transform={`translate(${dx} ${i === 1 ? -10 : 0}) rotate(${dx / 8} 200 200)`}>
          <path d="M150 90 h100 l10 236 h-120 Z" fill={g('bodyV')} />
          <text x="200" y="170" textAnchor="middle" fontFamily="Plus Jakarta Sans Variable" fontWeight="800" fontSize="18" fill="#fff">{shortBrand(brand)}</text>
          <circle cx="200" cy="240" r="30" fill="#fff" opacity="0.15" />
        </g>
      ))}
    </g>
  ),
  diapers: ({ g, c, brand }) => (
    <g>
      <Shadow g={g} rx={140} />
      <rect x="80" y="80" width="240" height="256" rx="30" fill={g('bodyV')} />
      <rect x="140" y="60" width="120" height="30" rx="10" fill={shade(c, -0.2)} />
      <Label x={110} y={120} w={180} h={66} fill="#ffffff" text={shortBrand(brand)} color={shade(c, -0.4)} size={26} r={33} />
      <circle cx="200" cy="260" r="46" fill="#fff" opacity="0.4" />
      <text x="200" y="270" textAnchor="middle" fontFamily="Inter Variable" fontWeight="800" fontSize="26" fill="#fff">L 64</text>
    </g>
  ),
  wipes: (p) => D.diapers(p),
  // Sports
  dumbbell: ({ g }) => (
    <g>
      <Shadow g={g} rx={160} cy={300} />
      <rect x="100" y="210" width="200" height="16" rx="6" fill={g('metal')} />
      {[60, 90, 270, 300].map((x, i) => <rect key={x} x={x} y={i % 3 === 0 ? 160 : 150} width="30" height={i % 3 === 0 ? 116 : 136} rx="8" fill={g('bodyV')} />)}
    </g>
  ),
  treadmill: ({ g, c }) => (
    <g>
      <Shadow g={g} rx={170} cy={322} />
      <path d="M40 300 L 300 300 L 340 280 L 80 280 Z" fill="#141518" />
      <path d="M40 300 h260 v16 h-260 Z" fill={g('bodyV')} />
      <path d="M300 300 L 340 280 v16 L 300 316 Z" fill="#141518" />
      <path d="M290 290 L 316 90 M330 286 L 356 86" stroke={c} strokeWidth="12" strokeLinecap="round" />
      <rect x="296" y="70" width="80" height="40" rx="8" fill="#141518" />
      <rect x="304" y="78" width="40" height="18" rx="3" fill="#3b9cf0" opacity="0.6" />
    </g>
  ),
  yogamat: ({ g, d }) => (
    <g>
      <Shadow g={g} rx={160} cy={318} />
      <path d="M60 300 h220" stroke={d} strokeWidth="2" />
      <rect x="60" y="260" width="250" height="56" rx="4" fill={g('bodyV')} />
      <circle cx="300" cy="230" r="80" fill={g('body')} />
      <circle cx="300" cy="230" r="60" fill="none" stroke={d} strokeWidth="2" />
      <circle cx="300" cy="230" r="40" fill="none" stroke={d} strokeWidth="2" />
      <circle cx="300" cy="230" r="20" fill={d} />
    </g>
  ),
  bat: ({ g }) => (
    <g>
      <Shadow g={g} rx={150} cy={320} />
      <g transform="rotate(-38 200 200)">
        <rect x="188" y="10" width="24" height="120" rx="8" fill="#1d1e21" />
        {[...Array(8)].map((_, i) => <rect key={i} x="188" y={20 + i * 13} width="24" height="3" fill="#3a3b3e" />)}
        <path d="M176 130 h48 l10 240 q0 16 -16 16 h-36 q-16 0 -16 -16 Z" fill={g('body')} />
        <rect x="178" y="180" width="44" height="40" fill="#1f4f8c" />
        <text x="200" y="208" textAnchor="middle" fontFamily="Plus Jakarta Sans Variable" fontWeight="800" fontSize="20" fill="#fff">SG</text>
      </g>
    </g>
  ),
  football: ({ g }) => (
    <g>
      <Shadow g={g} rx={100} />
      <circle cx="200" cy="210" r="124" fill={g('body')} />
      <path d="M200 150 l 46 34 -18 54 h-56 l-18 -54 Z" fill="#c4302b" />
      {[0, 72, 144, 216, 288].map((a) => <path key={a} d="M200 150 L 200 96 M 246 184 L 296 166" stroke="#1d1e21" strokeWidth="3" transform={`rotate(${a} 200 210)`} />)}
      <path d="M110 160 Q 150 120 210 110" stroke="#2b5be0" strokeWidth="10" fill="none" strokeLinecap="round" />
      <ellipse cx="160" cy="150" rx="40" ry="24" fill="#fff" opacity="0.35" />
    </g>
  ),
  cycle: ({ g, c }) => (
    <g>
      <Shadow g={g} rx={180} cy={320} />
      {[100, 300].map((x) => (
        <g key={x}>
          <circle cx={x} cy="250" r="74" fill="none" stroke="#1d1e21" strokeWidth="12" />
          <circle cx={x} cy="250" r="64" fill="none" stroke="#c9ccd0" strokeWidth="1.5" strokeDasharray="2 6" />
          <circle cx={x} cy="250" r="8" fill="#3a3b3e" />
        </g>
      ))}
      <path d="M100 250 L 170 150 L 280 150 L 300 250 M170 150 L 200 250 L 280 150 M200 250 L 100 250" stroke={c} strokeWidth="12" fill="none" strokeLinejoin="round" />
      <path d="M160 130 h40" stroke="#1d1e21" strokeWidth="12" strokeLinecap="round" />
      <path d="M280 150 L 270 110 h30" stroke="#1d1e21" strokeWidth="10" fill="none" strokeLinecap="round" />
    </g>
  ),
  // Books
  book: ({ g, c, d, label = '' }) => {
    const [rawTitle, rawAuthor = ''] = label.split(' by ')
    const words = rawTitle.replace(/\(.*\)/, '').replace(/:.*$/, '').trim().split(' ')
    const lines = []
    words.forEach((w) => {
      const last = lines[lines.length - 1]
      if (last && (last + ' ' + w).length <= 10) lines[lines.length - 1] = last + ' ' + w
      else lines.push(w)
    })
    const shown = lines.slice(0, 4)
    const longest = Math.max(...shown.map((t) => t.length))
    const fs = Math.min(30, 150 / (longest * 0.66))
    const ink = onColor(c)
    const author = rawAuthor.replace(/\(.*\)/, '').trim()
    return (
      <g>
        <Shadow g={g} rx={110} />
        <rect x="116" y="50" width="184" height="288" rx="4" fill="#efece4" />
        <rect x="114" y="48" width="184" height="288" rx="4" fill={d} />
        <rect x="106" y="44" width="182" height="288" rx="3" fill={g('bodyV')} />
        <rect x="106" y="44" width="10" height="288" fill="#000" opacity="0.14" />
        <rect x="128" y="64" width="140" height="2" fill={ink} opacity="0.35" />
        {shown.map((t, i) => (
          <text key={i} x="202" y={104 + i * fs * 1.05} textAnchor="middle" fontFamily="Plus Jakarta Sans Variable" fontWeight="800" fontSize={fs} fill={ink} letterSpacing="-0.5">
            {t.toUpperCase()}
          </text>
        ))}
        <circle cx="202" cy={128 + shown.length * fs * 1.05 + 20} r="18" fill="#F0532C" opacity={isLight(c) ? 0.9 : 0.85} />
        {author && (
          <text x="202" y="312" textAnchor="middle" fontFamily="Inter Variable" fontWeight="600" fontSize="12" fill={ink} opacity="0.8" letterSpacing="1.5">
            {author.toUpperCase()}
          </text>
        )}
      </g>
    )
  },
  bookset: ({ g }) => (
    <g>
      <Shadow g={g} rx={150} />
      {['#3a2e5a', '#7a2e2a', '#1f4f5c', '#5a4a1f', '#2e5a3a', '#4a2e5a', '#8a5a1f'].map((col, i) => (
        <g key={i}>
          <rect x={70 + i * 38} y="70" width="36" height="266" rx="3" fill={col} />
          <rect x={70 + i * 38} y="100" width="36" height="4" fill="#d6b56a" />
          <rect x={70 + i * 38} y="300" width="36" height="4" fill="#d6b56a" />
          <text x={88 + i * 38} y="210" textAnchor="middle" fontFamily="Plus Jakarta Sans Variable" fontWeight="800" fontSize="20" fill="#d6b56a">{i + 1}</text>
        </g>
      ))}
    </g>
  ),
  // Toys & baby
  blocks: ({ g, c }) => (
    <g>
      <Shadow g={g} rx={150} />
      {[
        [80, 236, c],
        [200, 236, '#2b5be0'],
        [140, 156, '#f2b705'],
        [260, 156, '#2f9e5a'],
      ].map(([x, y, col], i) => (
        <g key={i}>
          <rect x={x} y={y} width="110" height="80" rx="6" fill={col} />
          <rect x={x} y={y} width="110" height="80" rx="6" fill={g('sheen')} />
          {[0, 1].map((j) => (
            <g key={j}>
              <rect x={x + 18 + j * 46} y={y - 16} width="28" height="18" rx="3" fill={col} />
              <ellipse cx={x + 32 + j * 46} cy={y - 16} rx="14" ry="5" fill="#fff" opacity="0.3" />
            </g>
          ))}
        </g>
      ))}
    </g>
  ),
  rccar: ({ g }) => (
    <g>
      <Shadow g={g} rx={170} cy={312} />
      <path d="M50 250 Q 60 200 120 196 L 160 150 h110 l40 46 q50 6 50 54 v20 h-300 Z" fill={g('body')} />
      <path d="M170 160 h90 l30 36 h-150 Z" fill="#0d0e10" opacity="0.85" />
      {[110, 300].map((x) => (
        <g key={x}>
          <circle cx={x} cy="276" r="40" fill="#141518" />
          <circle cx={x} cy="276" r="18" fill={g('metal')} />
        </g>
      ))}
      <path d="M60 230 h60" stroke="#f2b705" strokeWidth="6" />
    </g>
  ),
  teddy: ({ g, l }) => (
    <g>
      <Shadow g={g} rx={120} />
      <circle cx="140" cy="86" r="30" fill={g('body')} />
      <circle cx="260" cy="86" r="30" fill={g('body')} />
      <circle cx="140" cy="86" r="14" fill={l} />
      <circle cx="260" cy="86" r="14" fill={l} />
      <ellipse cx="200" cy="250" rx="100" ry="90" fill={g('body')} />
      <ellipse cx="200" cy="260" rx="56" ry="56" fill={l} opacity="0.6" />
      <circle cx="200" cy="130" r="76" fill={g('body')} />
      <ellipse cx="200" cy="156" rx="34" ry="26" fill={l} />
      <ellipse cx="200" cy="146" rx="12" ry="8" fill="#2a1d14" />
      <circle cx="172" cy="118" r="7" fill="#1a1210" />
      <circle cx="228" cy="118" r="7" fill="#1a1210" />
      <path d="M180 196 Q 200 212 220 196 L 214 220 L 200 210 L 186 220 Z" fill="#c4302b" />
      <ellipse cx="128" cy="314" rx="36" ry="24" fill={g('body')} />
      <ellipse cx="272" cy="314" rx="36" ry="24" fill={g('body')} />
    </g>
  ),
  babybottle: ({ g }) => (
    <g>
      <Shadow g={g} rx={110} />
      {[-56, 56].map((dx) => (
        <g key={dx} transform={`translate(${dx} 0)`}>
          <path d="M186 56 q14 -16 28 0 l6 40 h-40 Z" fill="#efe2c8" />
          <rect x="166" y="94" width="68" height="28" rx="6" fill="#5fb3d9" />
          <path d="M162 120 h76 q8 70 0 130 q8 60 -6 80 h-64 q-14 -20 -6 -80 q-8 -60 0 -130 Z" fill={g('glass')} stroke="#d0dde3" strokeWidth="2" />
          {[160, 190, 220, 250].map((y) => <line key={y} x1="172" y1={y} x2="186" y2={y} stroke="#5fb3d9" strokeWidth="2" />)}
        </g>
      ))}
    </g>
  ),
  stroller: ({ g }) => (
    <g>
      <Shadow g={g} rx={150} cy={330} />
      <path d="M90 120 Q 100 40 200 40 L 210 170 Z" fill={g('body')} />
      <path d="M90 120 L 210 170 L 300 170 Q 300 240 220 250 L 130 250 Q 90 240 90 170 Z" fill={g('bodyV')} />
      <path d="M300 170 L 340 70 h20" stroke="#1d1e21" strokeWidth="8" fill="none" strokeLinecap="round" />
      <path d="M140 250 L 110 300 M260 250 L 290 300" stroke="#1d1e21" strokeWidth="8" />
      {[110, 290].map((x) => <circle key={x} cx={x} cy="306" r="26" fill="#1d1e21" stroke="#3a3b3e" strokeWidth="6" />)}
    </g>
  ),
  // Automotive
  helmet: ({ g, d, l }) => (
    <g>
      <Shadow g={g} rx={130} />
      <path d="M70 230 Q 60 70 210 64 Q 340 66 340 210 Q 340 290 300 320 L 110 320 Q 74 300 70 230 Z" fill={g('body')} />
      <path d="M150 150 Q 240 126 330 160 L 334 240 Q 250 250 160 236 Q 140 200 150 150 Z" fill={g('lensDark')} />
      <path d="M170 156 Q 240 140 310 160" stroke="#fff" strokeWidth="6" opacity="0.25" fill="none" strokeLinecap="round" />
      <path d="M110 320 h190" stroke={d} strokeWidth="8" />
      <path d="M90 140 Q 130 90 200 84" stroke={l} strokeWidth="8" fill="none" opacity="0.4" strokeLinecap="round" />
    </g>
  ),
  dashcam: ({ g }) => (
    <g>
      <Shadow g={g} rx={130} />
      <rect x="110" y="70" width="40" height="80" rx="8" fill="#2a2b2e" />
      <rect x="70" y="140" width="260" height="140" rx="24" fill={g('bodyV')} />
      <circle cx="270" cy="210" r="44" fill="#0b0c0e" />
      <circle cx="270" cy="210" r="28" fill={g('lens')} />
      <rect x="96" y="166" width="120" height="88" rx="8" fill="#0b0c0e" />
      <rect x="100" y="170" width="112" height="80" rx="6" fill={g('wall')} />
    </g>
  ),
  tyre: ({ g }) => (
    <g>
      <Shadow g={g} rx={130} />
      <circle cx="200" cy="200" r="136" fill="#1a1b1d" />
      {[...Array(36)].map((_, i) => <rect key={i} x="196" y="66" width="8" height="18" rx="2" fill="#2c2d30" transform={`rotate(${i * 10} 200 200)`} />)}
      <circle cx="200" cy="200" r="96" fill="#232427" />
      <circle cx="200" cy="200" r="78" fill={g('metal')} />
      {[0, 72, 144, 216, 288].map((a) => <path key={a} d="M190 136 h20 l8 46 h-36 Z" fill="#6a6e73" transform={`rotate(${a} 200 200)`} />)}
      <circle cx="200" cy="200" r="20" fill="#3a3b3e" />
    </g>
  ),
  // Travel
  suitcase: ({ g, d }) => (
    <g>
      <Shadow g={g} rx={100} />
      <rect x="170" y="36" width="60" height="30" rx="8" fill="none" stroke="#2a2b2e" strokeWidth="8" />
      <rect x="118" y="62" width="164" height="262" rx="22" fill={g('body')} />
      {[150, 182, 218, 250].map((x) => <rect key={x} x={x} y="74" width="6" height="238" rx="3" fill={d} opacity="0.55" />)}
      <rect x="118" y="186" width="164" height="8" fill={d} />
      {[136, 264].map((x) => <circle key={x} cx={x} cy="334" r="9" fill="#1d1e21" />)}
    </g>
  ),
  backpack: ({ g, d }) => (
    <g>
      <Shadow g={g} rx={110} />
      <path d="M170 70 Q 200 30 230 70" stroke={d} strokeWidth="10" fill="none" />
      <path d="M110 120 Q 110 70 200 66 Q 290 70 290 120 L 296 314 Q 296 336 274 336 L 126 336 Q 104 336 104 314 Z" fill={g('body')} />
      <rect x="132" y="208" width="136" height="104" rx="18" fill={d} opacity="0.6" />
      <path d="M140 130 Q 200 110 260 130" stroke="#d6b56a" strokeWidth="4" fill="none" />
      <rect x="190" y="220" width="20" height="10" rx="3" fill="#d6b56a" />
    </g>
  ),
  duffel: ({ g, d }) => (
    <g>
      <Shadow g={g} rx={175} cy={316} />
      <path d="M130 170 Q 200 100 270 170" stroke={d} strokeWidth="12" fill="none" />
      <rect x="30" y="170" width="340" height="146" rx="70" fill={g('bodyV')} />
      <path d="M60 176 h280" stroke="#c9ccd0" strokeWidth="4" strokeDasharray="10 5" />
      <path d="M180 250 q 20 30 50 0" stroke="#fff" strokeWidth="8" fill="none" strokeLinecap="round" opacity="0.85" />
    </g>
  ),
  parcel: ({ g, c, d, l }) => (
    <g>
      <Shadow g={g} rx={150} />
      <path d="M200 120 L 330 170 L 330 300 L 200 346 Z" fill={shade(c, -0.22)} />
      <path d="M200 120 L 70 170 L 70 300 L 200 346 Z" fill={c} />
      <path d="M200 120 L 330 170 L 200 214 L 70 170 Z" fill={l} />
      <path d="M118 152 L 250 200 L 250 236 L 234 230 L 234 206 L 102 158 Z" fill="#f2e3c8" opacity="0.9" />
      <path d="M200 214 V 346" stroke={d} strokeWidth="2" opacity="0.5" />
      <rect x="96" y="240" width="70" height="40" rx="4" fill="#fff" transform="skewY(20) translate(0 -46)" />
    </g>
  ),
  airtag: ({ g }) => (
    <g>
      <Shadow g={g} rx={140} />
      {[[130, 160], [270, 160], [130, 260], [270, 260]].map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="56" fill={g('metal')} />
          <circle cx={x} cy={y} r="48" fill="#fbfbf9" />
          <circle cx={x - 14} cy={y - 14} r="14" fill="#fff" />
        </g>
      ))}
    </g>
  ),
  kong: ({ g }) => (
    <g>
      <Shadow g={g} rx={80} />
      <ellipse cx="200" cy="290" rx="80" ry="46" fill={g('body')} />
      <ellipse cx="200" cy="200" rx="66" ry="50" fill={g('body')} />
      <ellipse cx="200" cy="110" rx="50" ry="44" fill={g('body')} />
      <ellipse cx="200" cy="74" rx="16" ry="6" fill="#000" opacity="0.4" />
    </g>
  ),
  petbed: ({ g, d, l }) => (
    <g>
      <Shadow g={g} rx={170} cy={318} />
      <ellipse cx="200" cy="250" rx="168" ry="70" fill={g('body')} />
      <ellipse cx="200" cy="240" rx="120" ry="44" fill={d} />
      <ellipse cx="200" cy="250" rx="110" ry="36" fill={l} />
      <path d="M40 240 Q 200 330 360 240" stroke="#fff" strokeOpacity="0.15" strokeWidth="10" fill="none" />
    </g>
  ),
}

const ALIASES = {
  cookware: 'cookware',
}

export const STUDIO = '#F4F3EF'

function ProductArtImpl({ kind, color = '#c9c6bd', brand, label, className = '', tint = STUDIO, title, framed = true, style }) {
  const uid = useId().replace(/:/g, '')
  const g = (n) => `url(#${uid}-${n})`
  const c = color
  const l = shade(c, 0.28)
  const d = shade(c, -0.28)
  const draw = D[ALIASES[kind] ?? kind] ?? D.teabox
  const light = isLight(c)
  return (
    <svg viewBox="0 0 400 400" className={className} style={style} role="img" aria-label={title ?? `${brand ?? ''} ${label ?? ''}`.trim()} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={`${uid}-body`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={l} />
          <stop offset="0.55" stopColor={c} />
          <stop offset="1" stopColor={d} />
        </linearGradient>
        <linearGradient id={`${uid}-bodyV`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={shade(c, 0.18)} />
          <stop offset="1" stopColor={shade(c, -0.18)} />
        </linearGradient>
        <linearGradient id={`${uid}-strap`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor={shade(c, -0.15)} />
          <stop offset="0.5" stopColor={c} />
          <stop offset="1" stopColor={shade(c, -0.25)} />
        </linearGradient>
        <linearGradient id={`${uid}-screen`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1a1c22" />
          <stop offset="1" stopColor="#07080a" />
        </linearGradient>
        <linearGradient id={`${uid}-wall`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={mix(c, '#7b6dff', light ? 0.6 : 0.42)} />
          <stop offset="0.5" stopColor={mix(c, '#ff7a59', 0.35)} stopOpacity="0.9" />
          <stop offset="0.78" stopColor={mix(c, '#14151f', 0.75)} />
          <stop offset="1" stopColor="#0b0c10" />
        </linearGradient>
        <radialGradient id={`${uid}-glow`}>
          <stop offset="0" stopColor="#ffd2b8" stopOpacity="0.9" />
          <stop offset="1" stopColor="#ffd2b8" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${uid}-sheen`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.16" />
          <stop offset="0.35" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`${uid}-metal`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f1f2f3" />
          <stop offset="0.5" stopColor="#c3c6ca" />
          <stop offset="1" stopColor="#8e9297" />
        </linearGradient>
        <linearGradient id={`${uid}-glass`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="0.5" stopColor="#e6eaee" stopOpacity="0.85" />
          <stop offset="1" stopColor="#c9d0d6" stopOpacity="0.9" />
        </linearGradient>
        <radialGradient id={`${uid}-lens`} cx="0.4" cy="0.35">
          <stop offset="0" stopColor="#5a6a9a" />
          <stop offset="0.5" stopColor="#1b2140" />
          <stop offset="1" stopColor="#05060a" />
        </radialGradient>
        <linearGradient id={`${uid}-lensDark`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3a4250" />
          <stop offset="1" stopColor="#0b0c0f" />
        </linearGradient>
        <linearGradient id={`${uid}-rgb`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#ff3d6e" />
          <stop offset="0.5" stopColor="#3dd6ff" />
          <stop offset="1" stopColor="#8a3dff" />
        </linearGradient>
        <pattern id={`${uid}-meshp`} width="8" height="8" patternUnits="userSpaceOnUse">
          <circle cx="4" cy="4" r="1.6" fill="#000" opacity="0.35" />
        </pattern>
        <linearGradient id={`${uid}-meshbg`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={shade(c, -0.1)} />
          <stop offset="1" stopColor={shade(c, -0.3)} />
        </linearGradient>
        <radialGradient id={`${uid}-shadow`}>
          <stop offset="0" stopColor="#1a1a14" stopOpacity="0.28" />
          <stop offset="1" stopColor="#1a1a14" stopOpacity="0" />
        </radialGradient>
      </defs>
      {framed && <rect width="400" height="400" fill={tint} />}
      {/* mesh = pattern over a tinted base */}
      <defs>
        <pattern id={`${uid}-mesh`} width="400" height="400" patternUnits="userSpaceOnUse">
          <rect width="400" height="400" fill={`url(#${uid}-meshbg)`} />
          <rect width="400" height="400" fill={`url(#${uid}-meshp)`} />
        </pattern>
      </defs>
      {draw({ g, c, l, d, brand, label })}
    </svg>
  )
}

// Product images fail closed to an honest empty state. Illustrations remain opt-in for taxonomy tiles.
function ProductVisual({ src, className = '', style, fit = 'contain', loading = 'lazy', fallback = 'placeholder', ...rest }) {
  const [failedSrc, setFailedSrc] = useState(null)
  if (!src || failedSrc === src) {
    if (fallback === 'illustration') return <ProductArtImpl className={className} style={style} {...rest} />
    const label = rest.label ?? rest.title ?? 'this item'
    return (
      <div role="img" aria-label={`Product photo unavailable for ${label}`} style={style} className={`grid place-content-center justify-items-center gap-2 bg-gradient-to-br from-ink-50 to-ink-100 text-center text-ink-500 ${className}`}>
        <CameraOff className="size-5" aria-hidden="true" />
        <span className="max-w-full px-2 text-[10px] font-medium leading-tight">Product photo unavailable</span>
      </div>
    )
  }
  const alt = rest.title ?? `${rest.brand ?? ''} ${rest.label ?? ''}`.trim()
  // Product cutouts default to contain; lifestyle apparel photography can fill portrait card frames.
  return <img src={src} alt={alt} loading={loading} decoding="async" draggable={false} onError={() => setFailedSrc(src)} style={style} className={`${className} ${fit === 'cover' ? 'object-cover p-0!' : 'object-contain'}`} />
}

export const ProductArt = memo(ProductVisual)
export const artKinds = Object.keys(D)
