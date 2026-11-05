import { productPhotos } from './productImages'
import { sellers } from './sellers'
import { categoryBySlug } from './categories'
import { catalogExpansion } from './catalogExpansion'

/*
  Catalogue source. Each row is compact and normalised by `build()` below into the full
  product shape used across the app (pricing, seller, delivery, returns, offers, specs).

  row: [category, sub, brand, title, art, colour, price, mrp, rating, reviews, seller, specs, extra?]
  specs: 'Key: Value | Key: Value'
*/
const rows = [
  // ── Mobiles ────────────────────────────────────────────────────────────────
  ['mobiles', 'Smartphones', 'Apple', 'iPhone 17 Pro 256 GB, Cosmic Orange', 'phone', '#D9773A', 134900, 134900, 4.7, 18432, 'appario', 'Display: 6.3" Super Retina XDR, 120 Hz | Chip: A19 Pro | Camera: 48 MP triple Fusion | Battery: Up to 31 h video | Build: Aluminium unibody', { badges: ['New launch'], colors: ['#D9773A', '#2B3A55', '#E6E4DF'] }],
  ['mobiles', 'Smartphones', 'Apple', 'iPhone 17 128 GB, Lavender', 'phone', '#B9AEDB', 82900, 82900, 4.6, 9211, 'appario', 'Display: 6.3" ProMotion OLED | Chip: A19 | Camera: 48 MP dual Fusion | Storage: 128 GB | Charging: 40 W wired', { colors: ['#B9AEDB', '#9FC3B4', '#1D1E22'] }],
  ['mobiles', 'Smartphones', 'Apple', 'iPhone 16e 128 GB, White', 'phone', '#EDEBE6', 54900, 59900, 4.5, 21876, 'cloudtail', 'Display: 6.1" OLED | Chip: A18 | Camera: 48 MP Fusion | Face ID: Yes | Charging: USB-C' ],
  ['mobiles', 'Smartphones', 'Samsung', 'Galaxy S26 Ultra 5G 512 GB, Titanium Black', 'phone', '#2A2C30', 139999, 159999, 4.6, 7412, 'brandstore', 'Display: 6.9" QHD+ Dynamic AMOLED 2X | Processor: Snapdragon 8 Elite Gen 5 | Camera: 200 MP quad | S Pen: Built-in | Battery: 5000 mAh', { badges: ['New launch'], colors: ['#2A2C30', '#C9C4BC', '#3C4E66'] }],
  ['mobiles', 'Smartphones', 'Samsung', 'Galaxy S25 FE 5G 256 GB, Icy Blue', 'phone', '#A9C3DD', 44999, 65999, 4.4, 12890, 'brandstore', 'Display: 6.7" FHD+ AMOLED 120 Hz | Processor: Exynos 2400 | Camera: 50 MP triple | Battery: 4900 mAh | AI: Galaxy AI' ],
  ['mobiles', 'Foldables', 'Samsung', 'Galaxy Z Fold7 5G 256 GB, Blue Shadow', 'foldable', '#2F4466', 174999, 186999, 4.5, 2104, 'brandstore', 'Main display: 8.0" QXGA+ | Cover display: 6.5" | Processor: Snapdragon 8 Elite | Weight: 215 g | Thickness: 8.9 mm folded' ],
  ['mobiles', 'Foldables', 'Samsung', 'Galaxy Z Flip7 5G 256 GB, Coral Red', 'flip', '#D85A4A', 109999, 119999, 4.4, 3381, 'brandstore', 'Main display: 6.9" FHD+ | Cover display: 4.1" FlexWindow | Processor: Exynos 2500 | Battery: 4300 mAh | Camera: 50 MP dual' ],
  ['mobiles', 'Smartphones', 'Google', 'Pixel 10 Pro 256 GB, Moonstone', 'phone', '#8C96A3', 109999, 119999, 4.6, 4120, 'retailnet', 'Display: 6.3" Super Actua 120 Hz | Chip: Tensor G5 | Camera: 50 MP triple, 5x telephoto | Updates: 7 years OS | Battery: 4870 mAh' ],
  ['mobiles', 'Smartphones', 'Google', 'Pixel 10 128 GB, Indigo', 'phone', '#3B4A7A', 79999, 79999, 4.5, 2876, 'retailnet', 'Display: 6.3" Actua OLED | Chip: Tensor G5 | Camera: 48 MP triple with telephoto | Updates: 7 years | Magnets: Pixelsnap' ],
  ['mobiles', 'Smartphones', 'OnePlus', 'OnePlus 15 5G 512 GB, Sand Storm', 'phone', '#C8B69A', 76999, 79999, 4.5, 15302, 'retailnet', 'Display: 6.78" 2K LTPO 165 Hz | Processor: Snapdragon 8 Elite Gen 5 | Battery: 7300 mAh | Charging: 120 W SUPERVOOC | Camera: 50 MP triple', { badges: ['Bestseller'] }],
  ['mobiles', 'Smartphones', 'OnePlus', 'OnePlus Nord 5 5G 256 GB, Marble Sands', 'phone', '#D9D2C3', 31999, 34999, 4.3, 22140, 'retailnet', 'Display: 6.83" 1.5K AMOLED 144 Hz | Processor: Snapdragon 8s Gen 3 | Battery: 6800 mAh | Charging: 80 W | Camera: 50 MP + 8 MP' ],
  ['mobiles', 'Smartphones', 'Nothing', 'Phone (3) 256 GB, White', 'phone', '#E9E8E4', 74999, 79999, 4.4, 5310, 'retailnet', 'Display: 6.67" flexible AMOLED 120 Hz | Processor: Snapdragon 8s Gen 4 | Glyph Matrix: Yes | Battery: 5150 mAh | Camera: 50 MP triple' ],
  ['mobiles', 'Smartphones', 'Xiaomi', 'Redmi Note 15 Pro+ 5G 256 GB, Mirage Purple', 'phone', '#7C6BA6', 29999, 34999, 4.2, 31877, 'cloudtail', 'Display: 6.67" 1.5K AMOLED | Processor: Dimensity 7400 Ultra | Battery: 6200 mAh | Charging: 90 W | Rating: IP68' ],
  ['mobiles', 'Smartphones', 'Motorola', 'Edge 60 Pro 5G 256 GB, Pantone Dazzling Blue', 'phone', '#2D5FA8', 29999, 33999, 4.3, 14420, 'cloudtail', 'Display: 6.7" pOLED curved | Processor: Dimensity 8350 Extreme | Battery: 6000 mAh | Charging: 90 W | Durability: MIL-STD-810H' ],
  ['mobiles', 'Smartphones', 'Vivo', 'V60 5G 256 GB, Mist Gray', 'phone', '#9AA0A3', 38999, 42999, 4.3, 6702, 'cloudtail', 'Display: 6.77" AMOLED 120 Hz | Processor: Snapdragon 7 Gen 4 | Camera: 50 MP ZEISS | Battery: 6500 mAh | Charging: 90 W' ],
  ['mobiles', 'Chargers', 'Anker', 'Nano 65 W 3-Port GaN Charger', 'charger', '#F2F1EC', 3499, 5999, 4.5, 8890, 'retailnet', 'Output: 65 W max | Ports: 2x USB-C, 1x USB-A | Tech: GaN II | Weight: 112 g | Warranty: 18 months' ],

  // ── Electronics (audio, wearables, cameras) ────────────────────────────────
  ['electronics', 'Headphones', 'Sony', 'WH-1000XM6 Wireless Noise Cancelling Headphones', 'headphones', '#2E2F33', 39990, 44990, 4.7, 6214, 'brandstore', 'Type: Over-ear | ANC: QN3 processor, 12 mics | Battery: 30 h | Codecs: LDAC, AAC | Weight: 254 g', { badges: ['Top rated'], colors: ['#2E2F33', '#D8D3CA', '#5B6E8C'] }],
  ['electronics', 'Headphones', 'Bose', 'QuietComfort Ultra Headphones (2nd Gen)', 'headphones', '#E4DED2', 35900, 39900, 4.6, 2410, 'brandstore', 'Type: Over-ear | ANC: CustomTune | Audio: Immersive spatial | Battery: 30 h | Charging: USB-C' ],
  ['electronics', 'Headphones', 'Apple', 'AirPods Max, USB-C, Midnight', 'headphones', '#2C3340', 59900, 59900, 4.5, 3120, 'appario', 'Type: Over-ear | Chip: H1 | ANC: Active Noise Cancellation | Audio: Spatial audio | Battery: 20 h' ],
  ['electronics', 'Headphones', 'JBL', 'Tune 770NC Wireless Over-Ear Headphones', 'headphones', '#3A5BA0', 6999, 9999, 4.3, 27451, 'cloudtail', 'Type: Over-ear | ANC: Adaptive | Battery: 70 h | Fast pair: Yes | Weight: 232 g' ],
  ['electronics', 'Earbuds', 'Apple', 'AirPods Pro 3 with MagSafe Case', 'earbuds', '#F4F3EF', 25900, 25900, 4.7, 11290, 'appario', 'Type: In-ear | ANC: 2x stronger than Pro 2 | Health: Heart-rate sensing | Battery: 8 h (ANC) | Rating: IP57', { badges: ['Bestseller'] }],
  ['electronics', 'Earbuds', 'Samsung', 'Galaxy Buds3 Pro, Silver', 'earbuds', '#C9CCD0', 14999, 21999, 4.3, 5530, 'brandstore', 'Type: In-ear | ANC: Intelligent ANC | Audio: 24-bit Hi-Fi | Battery: 6 h + 20 h case | Rating: IP57' ],
  ['electronics', 'Earbuds', 'OnePlus', 'Buds 4 True Wireless, Storm Grey', 'earbuds', '#5D6066', 5499, 6999, 4.3, 19803, 'retailnet', 'Type: In-ear | ANC: 55 dB adaptive | Battery: 45 h total | Codec: LHDC 5.0 | Rating: IP55' ],
  ['electronics', 'Earbuds', 'boAt', 'Airdopes 800 Dolby Audio Earbuds', 'earbuds', '#2B2D35', 1999, 4990, 4.0, 64180, 'cloudtail', 'Type: In-ear | Audio: Dolby Audio | Battery: 40 h | Mics: 4 with ENx | Charging: ASAP 10 min = 150 min' ],
  ['electronics', 'Speakers', 'JBL', 'Charge 6 Portable Bluetooth Speaker', 'speaker', '#B8352E', 15999, 18999, 4.6, 7604, 'cloudtail', 'Output: 45 W | Battery: 24 h + 4 h Playtime Boost | Rating: IP68 | Powerbank: Yes | Auracast: Yes', { colors: ['#B8352E', '#1E2A44', '#2C2D30'] }],
  ['electronics', 'Speakers', 'Marshall', 'Emberton III Portable Speaker, Black & Brass', 'speaker', '#1F1E1C', 16999, 19999, 4.6, 3302, 'retailnet', 'Output: 360° True Stereophonic | Battery: 32 h | Rating: IP67 | Bluetooth: 5.3 LE Audio | Weight: 0.68 kg' ],
  ['electronics', 'Speakers', 'Sony', 'ULT Field 1 Wireless Speaker', 'speaker', '#E0DCD3', 8990, 12990, 4.4, 4180, 'brandstore', 'Output: ULT deep bass | Battery: 12 h | Rating: IP67 | Shockproof: Yes | Strap: Detachable' ],
  ['electronics', 'Smartwatches', 'Apple', 'Watch Series 11 GPS 46 mm, Jet Black Aluminium', 'watch', '#1F2023', 46900, 46900, 4.7, 4021, 'appario', 'Display: Always-On Retina LTPO3 | Health: Hypertension notifications, sleep score | Battery: 24 h | Water: WR50 | Chip: S10' ],
  ['electronics', 'Smartwatches', 'Samsung', 'Galaxy Watch8 Classic 46 mm, Black', 'watch', '#2B2B2B', 38999, 46999, 4.4, 1876, 'brandstore', 'Display: 1.5" Super AMOLED | Bezel: Rotating | Health: Antioxidant index, BioActive sensor | Battery: 445 mAh | Water: 5ATM + IP68' ],
  ['electronics', 'Smartwatches', 'Garmin', 'Forerunner 970 GPS Running Watch', 'watch', '#3A3F47', 74990, 79990, 4.7, 642, 'retailnet', 'Display: 1.4" AMOLED | GPS: Multi-band | Battery: 15 days | Features: Running economy, LED flashlight | Water: 5 ATM' ],
  ['electronics', 'Smartwatches', 'Noise', 'ColorFit Pro 6 Max Smartwatch', 'watch', '#4A5A4E', 4999, 9999, 4.1, 28644, 'cloudtail', 'Display: 1.96" AMOLED | Calling: Bluetooth | Battery: 7 days | Health: SpO2, HR, stress | Water: IP68' ],
  ['electronics', 'Cameras', 'Sony', 'Alpha 7 IV Full-Frame Mirrorless Camera Body', 'camera', '#232427', 199990, 242490, 4.8, 1207, 'brandstore', 'Sensor: 33 MP full-frame Exmor R | Video: 4K 60p 10-bit | AF: Real-time Eye AF | Stabilisation: 5-axis IBIS | Mount: Sony E' ],
  ['electronics', 'Cameras', 'Canon', 'EOS R50 Mirrorless Camera with 18-45 mm Lens', 'camera', '#E7E3DA', 69990, 79995, 4.6, 2304, 'retailnet', 'Sensor: 24.2 MP APS-C | Video: 4K 30p uncropped | AF: Dual Pixel CMOS AF II | Weight: 375 g | Mount: RF' ],
  ['electronics', 'Cameras', 'GoPro', 'HERO13 Black Action Camera', 'actioncam', '#1E1F21', 39990, 45000, 4.5, 3389, 'cloudtail', 'Video: 5.3K60 | Photo: 27 MP | Stabilisation: HyperSmooth 6.0 | Water: 10 m | Battery: 1900 mAh Enduro' ],

  // ── Laptops & tablets ──────────────────────────────────────────────────────
  ['laptops', 'Thin & light', 'Apple', 'MacBook Air 13" M4, 16 GB, 256 GB, Sky Blue', 'laptop', '#B6CCD9', 99900, 99900, 4.8, 6012, 'appario', 'Chip: Apple M4, 10-core CPU | Memory: 16 GB unified | Storage: 256 GB SSD | Display: 13.6" Liquid Retina | Battery: Up to 18 h', { badges: ['Bestseller'], colors: ['#B6CCD9', '#D7D7D5', '#2E3138'] }],
  ['laptops', 'Thin & light', 'Apple', 'MacBook Pro 14" M5, 16 GB, 512 GB, Space Black', 'laptop', '#2B2C30', 169900, 169900, 4.8, 1874, 'appario', 'Chip: Apple M5 | Memory: 16 GB | Storage: 512 GB SSD | Display: 14.2" Liquid Retina XDR | Battery: Up to 24 h' ],
  ['laptops', 'Business', 'Dell', 'XPS 13 Copilot+ PC, Snapdragon X Elite, 16 GB', 'laptop', '#9EA3A8', 129990, 154990, 4.4, 1210, 'retailnet', 'Processor: Snapdragon X Elite | Memory: 16 GB LPDDR5x | Storage: 512 GB SSD | Display: 13.4" FHD+ 120 Hz | Weight: 1.19 kg' ],
  ['laptops', 'Thin & light', 'Dell', 'Inspiron 14 Plus, Core Ultra 7, 16 GB, 1 TB', 'laptop', '#BFC2C4', 84990, 104990, 4.3, 3420, 'retailnet', 'Processor: Intel Core Ultra 7 255H | Memory: 16 GB | Storage: 1 TB SSD | Display: 14" 2.8K | Weight: 1.6 kg' ],
  ['laptops', 'Business', 'HP', 'EliteBook 840 G11, Core Ultra 5, 16 GB', 'laptop', '#A7ABAF', 109990, 136000, 4.4, 802, 'cloudtail', 'Processor: Intel Core Ultra 5 125U | Memory: 16 GB | Storage: 512 GB SSD | Display: 14" WUXGA | Security: HP Wolf Security' ],
  ['laptops', 'Thin & light', 'HP', 'Pavilion Plus 14 OLED, Ryzen 7, 16 GB', 'laptop', '#C9C3D8', 72990, 89990, 4.3, 5233, 'cloudtail', 'Processor: AMD Ryzen 7 8840U | Memory: 16 GB LPDDR5x | Storage: 512 GB SSD | Display: 14" 2.8K OLED 120 Hz | Weight: 1.44 kg' ],
  ['laptops', 'Gaming laptops', 'HP', 'OMEN Transcend 14, RTX 4060, 16 GB', 'laptop', '#1E1F24', 154990, 179999, 4.5, 610, 'cloudtail', 'Processor: Intel Core Ultra 7 155H | GPU: RTX 4060 8 GB | Display: 14" 2.8K OLED 120 Hz | Memory: 16 GB | Storage: 1 TB' ],
  ['laptops', 'Business', 'Lenovo', 'ThinkPad X1 Carbon Gen 13 Aura Edition', 'laptop', '#232427', 189990, 239000, 4.6, 412, 'retailnet', 'Processor: Intel Core Ultra 7 258V | Memory: 32 GB | Storage: 1 TB SSD | Display: 14" 2.8K OLED | Weight: 986 g' ],
  ['laptops', 'Thin & light', 'Lenovo', 'Yoga Slim 7i, Core Ultra 5, 16 GB, OLED', 'laptop', '#6F7A8A', 79990, 99990, 4.4, 2186, 'retailnet', 'Processor: Intel Core Ultra 5 226V | Memory: 16 GB | Storage: 1 TB SSD | Display: 14" 2.8K OLED | Battery: 70 Wh' ],
  ['laptops', 'Gaming laptops', 'Lenovo', 'Legion Pro 5i, Core i9, RTX 5070 Ti', 'laptop', '#2F3237', 199990, 239990, 4.6, 920, 'retailnet', 'Processor: Intel Core i9-14900HX | GPU: RTX 5070 Ti 12 GB | Display: 16" WQXGA 240 Hz | Memory: 32 GB | Cooling: Legion ColdFront' ],
  ['laptops', 'Gaming laptops', 'ASUS', 'ROG Zephyrus G14 OLED, Ryzen AI 9, RTX 5070', 'laptop', '#D5D6D8', 189990, 214990, 4.6, 744, 'cloudtail', 'Processor: AMD Ryzen AI 9 HX 370 | GPU: RTX 5070 8 GB | Display: 14" 3K OLED 120 Hz | Memory: 32 GB | Weight: 1.5 kg' ],
  ['laptops', 'Thin & light', 'ASUS', 'Zenbook 14 OLED, Core Ultra 7, 16 GB', 'laptop', '#3A4C6B', 89990, 109990, 4.4, 3010, 'cloudtail', 'Processor: Intel Core Ultra 7 155H | Memory: 16 GB | Storage: 1 TB SSD | Display: 14" 3K OLED | Battery: 75 Wh' ],
  ['laptops', 'Thin & light', 'Acer', 'Swift Go 14 AI, Snapdragon X Plus, 16 GB', 'laptop', '#A9AFB4', 64990, 84999, 4.2, 1530, 'cloudtail', 'Processor: Snapdragon X Plus | Memory: 16 GB | Storage: 512 GB | Display: 14.5" 2K | Battery: Up to 22 h' ],
  ['laptops', 'Tablets', 'Apple', 'iPad Air 11" M3 Wi-Fi 128 GB, Purple', 'tablet', '#B8ACCF', 59900, 59900, 4.7, 4402, 'appario', 'Chip: Apple M3 | Display: 11" Liquid Retina | Storage: 128 GB | Pencil: Apple Pencil Pro support | Camera: 12 MP' ],
  ['laptops', 'Tablets', 'Samsung', 'Galaxy Tab S11 Wi-Fi 128 GB, Grey', 'tablet', '#7A7D82', 79999, 89999, 4.5, 1308, 'brandstore', 'Display: 11" Dynamic AMOLED 2X | Processor: Dimensity 9400+ | S Pen: Included | Battery: 8400 mAh | Rating: IP68' ],
  ['laptops', 'Tablets', 'OnePlus', 'Pad 3 Wi-Fi 256 GB, Storm Blue', 'tablet', '#3D5878', 47999, 52999, 4.4, 2041, 'retailnet', 'Display: 13.2" 3.4K 144 Hz | Processor: Snapdragon 8 Elite | Battery: 12140 mAh | Speakers: 8 | Charging: 80 W' ],

  // ── TVs ────────────────────────────────────────────────────────────────────
  ['tvs', 'OLED', 'LG', 'OLED evo C5 65" 4K Smart TV', 'tv', '#1A1B1F', 189990, 299990, 4.7, 2602, 'brandstore', 'Panel: OLED evo | Processor: α9 AI Gen8 | Refresh: 144 Hz | HDMI: 4x HDMI 2.1 | OS: webOS 25', { badges: ['Top rated'] }],
  ['tvs', 'OLED', 'Sony', 'BRAVIA 8 II 55" QD-OLED Google TV', 'tv', '#1D1E21', 219990, 279900, 4.7, 811, 'brandstore', 'Panel: QD-OLED | Processor: XR Processor | Audio: Acoustic Surface Audio+ | HDR: Dolby Vision | OS: Google TV' ],
  ['tvs', 'QLED & Neo QLED', 'Samsung', 'Neo QLED QN90F 65" 4K Smart TV', 'tv', '#202226', 179990, 259900, 4.6, 1420, 'brandstore', 'Panel: Neo QLED Mini LED | Processor: NQ4 AI Gen3 | Refresh: 165 Hz | Glare: Anti-glare | OS: Tizen' ],
  ['tvs', '4K LED', 'Samsung', 'Crystal 4K Vivid 55" Smart TV', 'tv', '#26282C', 41990, 65900, 4.3, 18225, 'brandstore', 'Panel: 4K UHD LED | Processor: Crystal 4K | HDR: HDR10+ | Audio: OTS Lite 20 W | OS: Tizen' ],
  ['tvs', '4K LED', 'Xiaomi', 'TV A Pro 55" 4K QLED Google TV', 'tv', '#202124', 34999, 54999, 4.2, 25640, 'cloudtail', 'Panel: QLED | Refresh: 60 Hz with MEMC | Audio: 30 W Dolby Audio | Storage: 32 GB | OS: Google TV' ],
  ['tvs', 'QLED & Neo QLED', 'TCL', 'C7K 65" QD-Mini LED Google TV', 'tv', '#1F2023', 79990, 159990, 4.3, 3210, 'cloudtail', 'Panel: QD-Mini LED | Refresh: 144 Hz | Audio: Bang & Olufsen | HDR: Dolby Vision IQ | OS: Google TV' ],
  ['tvs', 'Soundbars', 'Sony', 'BRAVIA Theatre Bar 9 Dolby Atmos Soundbar', 'soundbar', '#232427', 109990, 139990, 4.6, 640, 'brandstore', 'Channels: 13 speakers | Audio: Dolby Atmos, 360 Spatial Sound Mapping | HDMI: eARC | Wi-Fi: Yes' ],
  ['tvs', 'Soundbars', 'JBL', 'Bar 1000 MK2 7.1.4 Soundbar', 'soundbar', '#1F2022', 89999, 114999, 4.5, 920, 'cloudtail', 'Channels: 7.1.4 | Output: 960 W | Surround: Detachable wireless | Audio: Dolby Atmos, DTS:X | Subwoofer: 10"' ],
  ['tvs', 'Projectors', 'Samsung', 'The Freestyle 2nd Gen Smart Projector', 'projector', '#E8E6E1', 59990, 84900, 4.3, 580, 'brandstore', 'Resolution: FHD | Screen: 30"-100" | Audio: 360° speaker | Rotation: 180° | OS: Tizen' ],

  // ── Gaming ─────────────────────────────────────────────────────────────────
  ['gaming', 'Consoles', 'Sony', 'PlayStation 5 Pro Console, 2 TB', 'console', '#ECEBE8', 74990, 74990, 4.8, 4821, 'brandstore', 'Storage: 2 TB SSD | GPU: Upgraded with PSSR | Output: 8K, 4K 120 Hz | Wi-Fi: Wi-Fi 7 | Controller: DualSense', { badges: ['Bestseller'] }],
  ['gaming', 'Consoles', 'Sony', 'PlayStation 5 Slim Digital Edition', 'console', '#F0EFEC', 44990, 49990, 4.8, 12046, 'brandstore', 'Storage: 1 TB SSD | Output: 4K 120 Hz | Ray tracing: Yes | Audio: Tempest 3D | Controller: DualSense' ],
  ['gaming', 'Consoles', 'Nintendo', 'Switch 2 Console with Mario Kart World Bundle', 'handheld', '#2A2B2F', 46999, 49999, 4.8, 3790, 'retailnet', 'Display: 7.9" 1080p 120 Hz | TV output: 4K | Storage: 256 GB | Joy-Con 2: Magnetic | Bundle: Mario Kart World', { badges: ['New launch'] }],
  ['gaming', 'Consoles', 'Microsoft', 'Xbox Series X 1 TB, Carbon Black', 'xbox', '#1C1D1F', 54990, 59990, 4.7, 6044, 'cloudtail', 'Storage: 1 TB SSD | Output: 4K 120 fps | Quick Resume: Yes | Drive: Disc | Game Pass: Compatible' ],
  ['gaming', 'Controllers', 'Sony', 'DualSense Wireless Controller, Cosmic Red', 'controller', '#B9252F', 5990, 6390, 4.7, 30220, 'brandstore', 'Haptics: Haptic feedback | Triggers: Adaptive | Battery: Rechargeable | Mic: Built-in | Connectivity: USB-C' ],
  ['gaming', 'Controllers', 'Microsoft', 'Xbox Wireless Controller, Robot White', 'controller', '#ECECEA', 5390, 5990, 4.6, 21308, 'cloudtail', 'Connectivity: Bluetooth, USB-C | Compatibility: Xbox, PC, mobile | Grip: Textured | Battery: AA' ],
  ['gaming', 'Gaming headsets', 'Logitech', 'G Pro X 2 Lightspeed Gaming Headset', 'headphones', '#2A2C30', 21995, 25995, 4.5, 1220, 'retailnet', 'Drivers: 50 mm graphene | Wireless: Lightspeed + Bluetooth | Battery: 50 h | Mic: Detachable | Weight: 345 g' ],
  ['gaming', 'Accessories', 'Logitech', 'G502 X Plus Wireless Gaming Mouse', 'mouse', '#1E1F22', 13995, 16995, 4.6, 4410, 'retailnet', 'Sensor: HERO 25K | Switches: Lightforce hybrid | Lighting: RGB | Battery: 130 h | Weight: 106 g' ],
  ['gaming', 'Accessories', 'Razer', 'BlackWidow V4 75% Mechanical Keyboard', 'keyboard', '#1B1C1E', 17999, 21999, 4.5, 1342, 'cloudtail', 'Switches: Orange tactile, hot-swappable | Layout: 75% | Knob: Command dial | Lighting: Chroma RGB | Case: Aluminium' ],
  ['gaming', 'Games', 'Sony', 'Ghost of Yōtei Standard Edition (PS5)', 'gamebox', '#9E2B25', 4999, 4999, 4.8, 2840, 'brandstore', 'Platform: PS5 | Genre: Action adventure | Age: 18+ | Language: English, Hindi subtitles | Format: Disc' ],
  ['gaming', 'Games', 'EA Sports', 'EA SPORTS FC 26 Standard Edition (PS5)', 'gamebox', '#1D3B6E', 4499, 4999, 4.2, 6610, 'cloudtail', 'Platform: PS5 | Genre: Sports | Players: 1-4 | Online: Yes | Format: Disc' ],

  // ── Fashion ────────────────────────────────────────────────────────────────
  ['fashion', 'Men', "Levi's", "511 Slim Fit Men's Jeans, Dark Indigo", 'jeans', '#2F3E5C', 2399, 3999, 4.3, 23140, 'stylehub', 'Fit: Slim | Fabric: 99% cotton, 1% elastane | Rise: Mid | Closure: Zip fly | Care: Machine wash', { colors: ['#2F3E5C', '#4E6B8E', '#1E1F22'] }],
  ['fashion', 'Women', "Levi's", "Women's Ribcage Straight Ankle Jeans", 'jeans', '#6E8DB0', 2999, 4999, 4.2, 8120, 'stylehub', 'Fit: Straight | Rise: Ultra high | Fabric: 100% cotton denim | Length: Ankle | Care: Machine wash' ],
  ['fashion', 'Men', "Levi's", "Men's Classic Trucker Denim Jacket", 'jacket', '#4D6A8F', 3999, 6999, 4.4, 5402, 'stylehub', 'Fit: Regular | Fabric: 100% cotton | Closure: Buttons | Pockets: 4 | Care: Machine wash' ],
  ['fashion', 'Men', 'Nike', "Sportswear Club Men's Fleece Hoodie", 'hoodie', '#3D4A3C', 3295, 4495, 4.5, 11086, 'brandstore', 'Fit: Standard | Fabric: Cotton-poly brushed fleece | Pockets: Kangaroo | Hood: Adjustable | Care: Machine wash', { colors: ['#3D4A3C', '#1F2023', '#B9B4AA'] }],
  ['fashion', 'Men', 'Adidas', "Essentials 3-Stripes Men's Track Jacket", 'jacket', '#1D2233', 3199, 4599, 4.3, 7204, 'brandstore', 'Fit: Regular | Fabric: 100% recycled polyester | Closure: Full zip | Pockets: Side | Care: Machine wash' ],
  ['fashion', 'Men', 'Puma', "Essentials Logo Men's Cotton T-Shirt", 'tshirt', '#E7E3D9', 899, 1599, 4.2, 34500, 'urbanthreads', 'Fit: Regular | Fabric: 100% cotton jersey | Neck: Crew | Sleeve: Short | Care: Machine wash' ],
  ['fashion', 'Men', 'U.S. Polo Assn.', "Men's Slim Fit Pique Polo T-Shirt", 'polo', '#264D3F', 1199, 1999, 4.2, 19870, 'urbanthreads', 'Fit: Slim | Fabric: Cotton pique | Collar: Polo | Sleeve: Short | Care: Machine wash' ],
  ['fashion', 'Men', 'Allen Solly', "Men's Regular Fit Oxford Shirt, Sky Blue", 'shirt', '#A9C3DE', 1299, 2299, 4.1, 15602, 'stylehub', 'Fit: Regular | Fabric: 100% cotton oxford | Collar: Button-down | Sleeve: Full | Occasion: Office' ],
  ['fashion', 'Women', 'Zara', "Women's Linen Blend Midi Dress", 'dress', '#C9A27C', 3990, 3990, 4.1, 2310, 'stylehub', 'Fit: Relaxed | Fabric: Linen blend | Length: Midi | Neck: V-neck | Care: Hand wash' ],
  ['fashion', 'Women', 'H&M', "Women's Oversized Cotton T-Shirt", 'tshirt', '#1E1F22', 699, 999, 4.0, 22104, 'urbanthreads', 'Fit: Oversized | Fabric: 100% cotton | Neck: Round | Sleeve: Short | Care: Machine wash', { images: ['h-m-womens-oversized-cotton-t-shirt-side.webp', 'h-m-womens-oversized-cotton-t-shirt-back.webp', 'h-m-womens-oversized-cotton-t-shirt-fabric-detail.webp'], imageLabels: ['Front view', 'Side view', 'Back view', 'Fabric detail'] }],
  ['fashion', 'Ethnic wear', 'Fabindia', "Women's Cotton Block Print Kurta", 'kurta', '#B5523A', 1890, 2690, 4.4, 6012, 'stylehub', 'Fabric: 100% cotton | Print: Hand block | Length: Calf | Sleeve: 3/4 | Care: Hand wash' ],
  ['fashion', 'Ethnic wear', 'Manyavar', "Men's Silk Blend Kurta Set, Ivory", 'kurta', '#EDE4D1', 4999, 6999, 4.5, 3402, 'brandstore', 'Fabric: Silk blend | Set: Kurta + churidar | Occasion: Festive | Fit: Regular | Care: Dry clean' ],
  ['fashion', 'Winter wear', 'The North Face', "Men's 1996 Retro Nuptse Down Jacket", 'puffer', '#1F2023', 27999, 32999, 4.7, 902, 'brandstore', 'Fill: 700-fill goose down | Shell: Recycled nylon ripstop | Hood: Stowable | Pockets: 2 hand, 1 chest | Fit: Relaxed' ],
  ['fashion', 'Men', 'Ray-Ban', 'Wayfarer Classic Sunglasses RB2140', 'sunglasses', '#1C1C1C', 9890, 11890, 4.6, 7341, 'retailnet', 'Frame: Acetate | Lens: G-15 green | Protection: 100% UV | Size: 50 mm | Shape: Wayfarer' ],
  ['fashion', 'Women', 'Michael Kors', 'Jet Set Medium Saffiano Leather Tote', 'handbag', '#9B6A45', 18999, 29999, 4.5, 1203, 'stylehub', 'Material: Saffiano leather | Closure: Top zip | Compartments: 3 | Strap: Dual handles | Dimensions: 33 x 26 cm' ],
  ['fashion', 'Men', 'Fossil', 'Grant Chronograph Brown Leather Watch', 'analogwatch', '#6B4B33', 9995, 13995, 4.5, 6620, 'retailnet', 'Movement: Quartz chronograph | Case: 44 mm stainless steel | Strap: Leather | Water: 5 ATM | Dial: Roman numerals' ],
  ['fashion', 'Men', 'Titan', 'Edge Ceramic Slim Analog Watch', 'analogwatch', '#1D1E20', 21995, 24995, 4.4, 820, 'brandstore', 'Movement: Quartz | Case: 4.4 mm ultra-slim | Strap: Ceramic | Water: 3 ATM | Dial: Black' ],

  // ── Footwear ───────────────────────────────────────────────────────────────
  ['footwear', 'Running', 'Nike', "Pegasus 42 Men's Road Running Shoes", 'shoe', '#E4502F', 11895, 11895, 4.6, 5402, 'brandstore', 'Type: Road running | Cushioning: ReactX + Air Zoom | Drop: 10 mm | Upper: Engineered mesh | Weight: 286 g', { badges: ['New launch'], colors: ['#E4502F', '#1F2023', '#E9E6DF'] }],
  ['footwear', 'Sneakers', 'Nike', 'Air Force 1 \'07 Men\'s Sneakers, White', 'sneaker', '#F2F1ED', 7495, 7495, 4.7, 41092, 'brandstore', 'Type: Lifestyle | Upper: Leather | Sole: Rubber with Air unit | Closure: Lace-up | Fit: True to size', { badges: ['Bestseller'] }],
  ['footwear', 'Sneakers', 'Nike', 'Dunk Low Retro Men\'s Shoes, Panda', 'sneaker', '#1E1F21', 8695, 8695, 4.6, 12240, 'brandstore', 'Type: Lifestyle | Upper: Leather | Sole: Rubber cupsole | Closure: Lace-up | Colourway: Black/White' ],
  ['footwear', 'Running', 'Adidas', 'Ultraboost 5X Running Shoes, Core Black', 'shoe', '#232427', 15999, 19999, 4.5, 4120, 'brandstore', 'Type: Road running | Cushioning: Light BOOST | Upper: PRIMEKNIT+ | Outsole: Continental rubber | Drop: 10 mm' ],
  ['footwear', 'Sneakers', 'Adidas', 'Samba OG Shoes, Cloud White', 'sneaker', '#ECE9E2', 10999, 10999, 4.7, 9870, 'brandstore', 'Type: Lifestyle | Upper: Leather with suede overlays | Sole: Gum rubber | Closure: Lace-up | Origin: Terrace classic' ],
  ['footwear', 'Running', 'Puma', 'Deviate NITRO 3 Running Shoes', 'shoe', '#2D6BD8', 12999, 15999, 4.4, 2108, 'sportsvilla', 'Type: Road running | Cushioning: NITRO Elite foam | Plate: PWRPLATE | Outsole: PUMAGRIP | Weight: 255 g' ],
  ['footwear', 'Sneakers', 'Puma', 'Suede Classic XXI Sneakers, Peacoat', 'sneaker', '#253049', 4499, 6999, 4.3, 14220, 'sportsvilla', 'Type: Lifestyle | Upper: Suede | Sole: Rubber | Closure: Lace-up | Fit: Regular' ],
  ['footwear', 'Running', 'ASICS', 'GEL-Nimbus 27 Men\'s Running Shoes', 'shoe', '#4D8FC7', 15999, 17999, 4.6, 1880, 'sportsvilla', 'Type: Max cushion | Cushioning: FF BLAST PLUS ECO + PureGEL | Upper: Knit | Drop: 8 mm | Weight: 304 g' ],
  ['footwear', 'Running', 'New Balance', 'Fresh Foam X 1080v14 Running Shoes', 'shoe', '#C9CDD2', 15999, 17499, 4.5, 1342, 'sportsvilla', 'Type: Daily trainer | Cushioning: Fresh Foam X | Upper: Hypoknit | Drop: 6 mm | Width: Standard' ],
  ['footwear', 'Sandals', 'Crocs', 'Classic Clog Unisex, Black', 'clog', '#1F2022', 3495, 4495, 4.5, 30540, 'retailnet', 'Material: Croslite | Fit: Roomy | Strap: Pivoting heel strap | Ventilation: Ports | Care: Water friendly' ],
  ['footwear', 'Formal', 'Clarks', 'Men\'s Tilden Cap Leather Oxford, Black', 'formalshoe', '#1C1C1C', 5999, 7999, 4.3, 3920, 'stylehub', 'Upper: Leather | Sole: Rubber | Closure: Lace-up | Insole: OrthoLite | Occasion: Formal' ],
  ['footwear', 'Sports', 'Skechers', 'GO WALK 7 Slip-On Walking Shoes', 'shoe', '#6E747C', 4999, 6999, 4.4, 12940, 'sportsvilla', 'Type: Walking | Cushioning: ULTRA GO | Insole: Air-Cooled Goga Mat | Closure: Slip-on | Machine washable: Yes' ],

  // ── Beauty ─────────────────────────────────────────────────────────────────
  ['beauty', 'Skincare', 'The Ordinary', 'Niacinamide 10% + Zinc 1% Serum, 30 ml', 'serum', '#EDEAE3', 650, 700, 4.4, 51220, 'glowup', 'Skin type: Oily, combination | Key ingredient: Niacinamide | Size: 30 ml | Concern: Blemishes | Fragrance free: Yes' ],
  ['beauty', 'Skincare', 'Minimalist', '10% Vitamin C Face Serum, 30 ml', 'serum', '#E9B45A', 599, 699, 4.3, 38110, 'glowup', 'Skin type: All | Key ingredient: Ethyl ascorbic acid | Size: 30 ml | Concern: Dullness | pH: 4.5-5.5' ],
  ['beauty', 'Skincare', 'CeraVe', 'Moisturising Cream for Dry Skin, 454 g', 'jar', '#F1F3F5', 1650, 1950, 4.6, 24502, 'glowup', 'Skin type: Dry to very dry | Key ingredients: 3 ceramides, hyaluronic acid | Size: 454 g | Fragrance free: Yes | Dermatologist developed: Yes' ],
  ['beauty', 'Skincare', 'Neutrogena', 'Ultra Sheer Sunscreen SPF 50+, 88 ml', 'tube', '#F5A33C', 699, 899, 4.4, 30982, 'glowup', 'SPF: 50+ PA+++ | Finish: Dry-touch | Size: 88 ml | Water resistant: 80 min | Skin type: All' ],
  ['beauty', 'Makeup', 'MAC', 'Matte Lipstick, Ruby Woo', 'lipstick', '#A3202A', 2100, 2100, 4.6, 8902, 'glowup', 'Finish: Retro matte | Shade: Ruby Woo | Weight: 3 g | Long wearing: Yes | Cruelty: Not tested on animals' ],
  ['beauty', 'Makeup', 'Maybelline', 'Fit Me Matte + Poreless Foundation, 128', 'foundation', '#D9A985', 499, 599, 4.2, 66120, 'glowup', 'Finish: Matte | Coverage: Medium | Size: 30 ml | Skin type: Normal to oily | Shade: 128 Warm Nude' ],
  ['beauty', 'Makeup', 'Lakmé', '9to5 Primer + Matte Lipstick, Burgundy Lane', 'lipstick', '#6E2333', 450, 650, 4.1, 22140, 'glowup', 'Finish: Matte | Shade: Burgundy Lane | Weight: 3.6 g | Primer: Built-in | Long lasting: Up to 16 h' ],
  ['beauty', 'Fragrance', 'Davidoff', 'Cool Water Eau de Toilette for Men, 125 ml', 'perfume', '#5C9EC8', 3200, 5900, 4.4, 12204, 'glowup', 'Type: Eau de Toilette | Notes: Aquatic, mint, cedar | Size: 125 ml | Longevity: Moderate | Gender: Men' ],
  ['beauty', 'Fragrance', 'Calvin Klein', 'CK One Eau de Toilette, 200 ml', 'perfume', '#DCDDD8', 4400, 6500, 4.4, 9120, 'glowup', 'Type: Eau de Toilette | Notes: Citrus, green tea | Size: 200 ml | Gender: Unisex | Longevity: Moderate' ],
  ['beauty', 'Haircare', 'Dyson', 'Supersonic Nural Hair Dryer, Vinca Blue & Rosé', 'hairdryer', '#3F5B8A', 44900, 49900, 4.5, 1840, 'brandstore', 'Motor: Hyperdymium | Heat control: Intelligent | Attachments: 5 | Scalp protect: Yes | Cable: 2.7 m' ],
  ['beauty', 'Haircare', "L'Oréal Paris", 'Total Repair 5 Shampoo, 650 ml', 'shampoo', '#C83C4A', 549, 799, 4.2, 30120, 'glowup', 'Hair type: Damaged | Key ingredient: Keratin XS | Size: 650 ml | Paraben free: No | Use: Daily' ],
  ['beauty', 'Grooming', 'Philips', 'OneBlade Pro 360 Face + Body Trimmer', 'trimmer', '#3FA7A0', 4499, 5995, 4.3, 18240, 'retailnet', 'Blades: 360 flex | Combs: 14-length adjustable | Battery: 120 min | Wet & dry: Yes | Charging: USB-C' ],
  ['beauty', 'Grooming', 'Philips', 'Series 7000 Wet & Dry Electric Shaver', 'shaver', '#2F3237', 9999, 13995, 4.4, 4210, 'retailnet', 'Heads: SteelPrecision blades | Wet & dry: Yes | Battery: 60 min | Charging: 1 h | Trimmer: Pop-up' ],

  // ── Home ───────────────────────────────────────────────────────────────────
  ['home', 'Lighting', 'Philips', 'Hue White & Colour Ambiance Starter Kit, 3 Bulbs', 'bulb', '#F3D27A', 10999, 14999, 4.5, 3210, 'retailnet', 'Bulbs: 3x E27 | Colours: 16 million | Bridge: Included | Voice: Alexa, Google | Wattage: 9 W each' ],
  ['home', 'Lighting', 'IKEA', 'TÅGARP Floor Uplighter Lamp, Black', 'lamp', '#2A2B2D', 1990, 2490, 4.2, 4012, 'homecraft', 'Type: Floor uplighter | Height: 176 cm | Bulb: E27 (not included) | Material: Steel | Switch: Cord' ],
  ['home', 'Decor', 'Home Centre', 'Ceramic Ribbed Table Vase, Sage', 'vase', '#9FB3A0', 1299, 1999, 4.3, 1820, 'homecraft', 'Material: Ceramic | Height: 24 cm | Finish: Matte | Use: Dry or fresh flowers | Care: Wipe clean' ],
  ['home', 'Bedding', 'Spaces', 'Hygro Cotton 210 TC King Bedsheet Set', 'bedding', '#C7D3DE', 1899, 3499, 4.3, 12940, 'homecraft', 'Size: King, 274 x 274 cm | Material: 100% cotton | Thread count: 210 | Includes: 1 sheet, 2 pillow covers | Care: Machine wash' ],
  ['home', 'Bedding', 'Sleepwell', 'Ortho Pro Spring Mattress, Queen, 8"', 'mattress', '#E7E5E0', 18999, 28999, 4.4, 6520, 'homecraft', 'Size: Queen, 78 x 60 in | Thickness: 8 inch | Type: Pocket spring | Firmness: Medium firm | Warranty: 7 years' ],
  ['home', 'Bath', 'Trident', 'Zero Twist Cotton Bath Towel Set of 4', 'towel', '#D6C6B0', 1499, 2599, 4.3, 9842, 'homecraft', 'Pieces: 4 bath towels | Material: 100% cotton | GSM: 500 | Size: 70 x 140 cm | Care: Machine wash' ],
  ['home', 'Storage', 'Milton', 'Thermosteel Flip Lid Bottle, 1 Litre, Set of 2', 'flask', '#8A8E93', 1199, 1700, 4.4, 41230, 'homecraft', 'Capacity: 1 L each | Insulation: 24 h hot & cold | Material: Stainless steel | Lid: Flip | Leak proof: Yes' ],
  ['home', 'Decor', 'Philips', 'Air Purifier AC1715 with HEPA Filter', 'purifier', '#F0EFEB', 9999, 13995, 4.4, 15620, 'retailnet', 'Coverage: Up to 36 m² | CADR: 300 m³/h | Filter: NanoProtect HEPA | Modes: Auto, sleep | Connectivity: App' ],

  // ── Furniture ──────────────────────────────────────────────────────────────
  ['furniture', 'Office chairs', 'Green Soul', 'Monster Ultimate Ergonomic Chair, Black & Grey', 'chair', '#2B2D30', 14999, 29990, 4.3, 8920, 'homecraft', 'Back: Mesh, adjustable lumbar | Armrests: 4D | Recline: 135° | Weight capacity: 150 kg | Warranty: 3 years' ],
  ['furniture', 'Office chairs', 'Featherlite', 'Liberate High Back Ergonomic Chair', 'chair', '#4A4D52', 22990, 31500, 4.4, 1220, 'homecraft', 'Back: Mesh | Lumbar: Adjustable | Armrests: 3D | Mechanism: Synchro tilt | Warranty: 5 years' ],
  ['furniture', 'Sofas', 'Wakefit', 'Monza Fabric 3 Seater Sofa, Teal', 'sofa', '#2F6B6A', 27999, 45999, 4.3, 2140, 'homecraft', 'Seating: 3 seater | Upholstery: Fabric | Frame: Engineered wood | Dimensions: 198 x 84 x 82 cm | Assembly: DIY' ],
  ['furniture', 'Sofas', 'Urban Ladder', 'Camden 2 Seater Sofa, Sand Beige', 'sofa', '#CDBEA6', 34999, 52999, 4.4, 640, 'homecraft', 'Seating: 2 seater | Upholstery: Velvet touch fabric | Frame: Solid wood | Legs: Oak finish | Warranty: 1 year' ],
  ['furniture', 'Tables', 'IKEA', 'LACK Coffee Table, White Stained Oak', 'table', '#D9C7A7', 2990, 3490, 4.2, 6320, 'homecraft', 'Dimensions: 90 x 55 cm | Height: 45 cm | Material: Particleboard, oak veneer | Shelf: Yes | Assembly: Required' ],
  ['furniture', 'Tables', 'Wakefit', 'Electric Height Adjustable Standing Desk', 'desk', '#B88B5B', 24999, 39999, 4.4, 1880, 'homecraft', 'Top: 120 x 60 cm engineered wood | Height: 72-121 cm | Motor: Single | Presets: 4 memory | Load: 70 kg' ],
  ['furniture', 'Shelves', 'Solimo', 'Engineered Wood 5-Tier Bookshelf, Walnut', 'shelf', '#6E4C33', 4499, 8999, 4.1, 9840, 'homecraft', 'Tiers: 5 | Dimensions: 60 x 30 x 168 cm | Material: Engineered wood | Finish: Walnut | Load per shelf: 10 kg' ],

  // ── Kitchen ────────────────────────────────────────────────────────────────
  ['kitchen', 'Cookware', 'Prestige', 'Omega Deluxe Granite 3-Piece Cookware Set', 'cookware', '#2D2E31', 2799, 4995, 4.3, 24402, 'homecraft', 'Pieces: Fry pan, kadai, tawa | Coating: Granite non-stick | Induction: Yes | Handles: Bakelite | Warranty: 2 years' ],
  ['kitchen', 'Cookware', 'Hawkins', 'Contura Hard Anodised Pressure Cooker, 5 L', 'cooker', '#1F2022', 3150, 3575, 4.6, 18902, 'homecraft', 'Capacity: 5 L | Material: Hard anodised aluminium | Induction: No | Lid: Inner lid | Warranty: 5 years' ],
  ['kitchen', 'Mixers', 'Philips', 'HL7756 750 W Mixer Grinder, 3 Jars', 'mixer', '#EEEDE9', 3999, 5995, 4.3, 52040, 'retailnet', 'Power: 750 W | Jars: 3 stainless steel | Speed: 3 + pulse | Motor: Turbo | Warranty: 2 years' ],
  ['kitchen', 'Mixers', 'KitchenAid', 'Artisan Stand Mixer 4.8 L, Empire Red', 'standmixer', '#B4242C', 54999, 64999, 4.8, 920, 'brandstore', 'Bowl: 4.8 L stainless steel | Speeds: 10 | Motor: 300 W | Attachments: 3 | Hub: Power hub for 10+ attachments' ],
  ['kitchen', 'Kettles', 'Morphy Richards', 'Electric Kettle 1.5 L, Stainless Steel', 'kettle', '#B8BCC0', 1199, 1995, 4.2, 30410, 'homecraft', 'Capacity: 1.5 L | Power: 1500 W | Material: Stainless steel | Auto shut-off: Yes | Base: 360° cordless' ],
  ['kitchen', 'Air fryers', 'Philips', 'Airfryer 3000 Series XL, 6.2 L', 'airfryer', '#1F2022', 8999, 12995, 4.5, 21340, 'retailnet', 'Capacity: 6.2 L | Power: 2000 W | Presets: 14 | Technology: Rapid Air | Dishwasher safe: Yes', { badges: ['Bestseller'] }],
  ['kitchen', 'Air fryers', 'Instant Pot', 'Vortex Plus 6-in-1 Air Fryer, 5.7 L', 'airfryer', '#3A3B3E', 10999, 15999, 4.4, 4320, 'homecraft', 'Capacity: 5.7 L | Functions: 6-in-1 | Window: ClearCook | Odour: OdorErase | Power: 1700 W' ],
  ['kitchen', 'Dinnerware', 'Borosil', 'Larah Opalware Dinner Set, 35 Pieces', 'plates', '#F3F2EE', 3299, 4950, 4.3, 7610, 'homecraft', 'Pieces: 35 | Material: Opalware | Microwave safe: Yes | Dishwasher safe: Yes | Serves: 6' ],
  ['kitchen', 'Kettles', 'Nespresso', 'Vertuo Pop Coffee Machine, Liquorice Black', 'coffeemachine', '#1E1F21', 10990, 14990, 4.4, 1430, 'brandstore', 'Type: Capsule | Cup sizes: 5 | Water tank: 0.6 L | Heat-up: 30 s | Centrifusion: Yes' ],

  // ── Appliances ─────────────────────────────────────────────────────────────
  ['appliances', 'Refrigerators', 'Samsung', 'Bespoke AI 653 L Side-by-Side Refrigerator', 'fridge', '#C7C9CC', 89990, 129900, 4.4, 1320, 'brandstore', 'Capacity: 653 L | Type: Side-by-side | Inverter: Digital Inverter | Energy: 3 star | AI: SmartThings, AI Energy Mode' ],
  ['appliances', 'Refrigerators', 'LG', '242 L 3 Star Frost-Free Double Door Refrigerator', 'fridge2', '#5B6068', 26490, 33999, 4.3, 9840, 'brandstore', 'Capacity: 242 L | Type: Double door | Inverter: Smart Inverter | Energy: 3 star | Warranty: 10 years compressor' ],
  ['appliances', 'Washing machines', 'LG', '9 kg 5 Star AI DD Front Load Washing Machine', 'washer', '#D7D9DB', 38990, 51990, 4.5, 6420, 'brandstore', 'Capacity: 9 kg | Type: Front load | Motor: AI Direct Drive | Energy: 5 star | Steam: Yes' ],
  ['appliances', 'Washing machines', 'Bosch', '8 kg 5 Star Fully Automatic Front Load', 'washer', '#ECEDEE', 35490, 46990, 4.4, 4102, 'brandstore', 'Capacity: 8 kg | Type: Front load | Programs: 15 | Energy: 5 star | Drum: VarioDrum' ],
  ['appliances', 'Air conditioners', 'LG', '1.5 Ton 5 Star AI Dual Inverter Split AC', 'ac', '#F2F2F0', 46990, 78990, 4.3, 7620, 'brandstore', 'Capacity: 1.5 Ton | Energy: 5 star | Compressor: Dual inverter | Cooling: 6-in-1 convertible | Copper: 100%' ],
  ['appliances', 'Air conditioners', 'Daikin', '1.5 Ton 3 Star Inverter Split AC', 'ac', '#F4F4F2', 37990, 58400, 4.4, 10420, 'retailnet', 'Capacity: 1.5 Ton | Energy: 3 star | Compressor: Inverter swing | Filter: PM 2.5 | Copper: 100%' ],
  ['appliances', 'Microwaves', 'Samsung', '28 L Convection Microwave Oven with Curd Making', 'microwave', '#232427', 13490, 18900, 4.3, 14220, 'brandstore', 'Capacity: 28 L | Type: Convection | Auto cook: 197 menus | Feature: Curd making | Warranty: 10 years cavity' ],
  ['appliances', 'Vacuum cleaners', 'Dyson', 'V15 Detect Absolute Cordless Vacuum', 'vacuum', '#C9A642', 65900, 72900, 4.6, 1680, 'brandstore', 'Run time: 60 min | Suction: 240 AW | Laser: Dust detect | Filtration: Whole-machine HEPA | Bin: 0.76 L' ],
  ['appliances', 'Vacuum cleaners', 'Eureka Forbes', 'Robo Vac & Mop with LiDAR Navigation', 'robovac', '#2A2B2E', 18999, 34999, 4.1, 3410, 'retailnet', 'Navigation: LiDAR | Suction: 3000 Pa | Mopping: Yes | Battery: 150 min | Control: App, voice' ],

  // ── Grocery ────────────────────────────────────────────────────────────────
  ['grocery', 'Beverages', 'Tata Tea', 'Gold Premium Assam Tea, 1 kg', 'teabox', '#B8262E', 610, 680, 4.4, 50210, 'freshmart', 'Type: Loose leaf CTC | Weight: 1 kg | Origin: Assam | Blend: With 15% long leaf | Shelf life: 12 months' ],
  ['grocery', 'Beverages', 'Nescafé', 'Classic Instant Coffee Jar, 200 g', 'coffee', '#3A1E14', 699, 760, 4.5, 41340, 'freshmart', 'Type: Instant coffee | Weight: 200 g | Roast: Medium-dark | Pack: Glass jar | Shelf life: 18 months' ],
  ['grocery', 'Beverages', 'Blue Tokai', 'Attikan Estate Medium Roast Coffee Beans, 250 g', 'coffeebag', '#2D5B7C', 595, 650, 4.6, 6210, 'freshmart', 'Roast: Medium | Origin: Attikan Estate, Karnataka | Weight: 250 g | Grind: Whole bean | Notes: Chocolate, caramel' ],
  ['grocery', 'Staples', 'Aashirvaad', 'Shudh Chakki Atta Whole Wheat, 10 kg', 'sack', '#E3A73A', 499, 580, 4.4, 62030, 'freshmart', 'Type: Whole wheat flour | Weight: 10 kg | Grain: 100% whole wheat | Pack: Sack | Shelf life: 3 months' ],
  ['grocery', 'Staples', 'India Gate', 'Basmati Rice Classic, 5 kg', 'sack', '#C3212A', 899, 1150, 4.4, 28040, 'freshmart', 'Type: Basmati | Weight: 5 kg | Grain: Extra long | Aged: 1 year | Origin: India' ],
  ['grocery', 'Staples', 'Fortune', 'Sunlite Refined Sunflower Oil, 5 L', 'oil', '#F2C230', 799, 975, 4.3, 22104, 'freshmart', 'Type: Refined sunflower | Volume: 5 L | Pack: Jar | Vitamins: A & D | Use: Cooking, frying' ],
  ['grocery', 'Breakfast', "Kellogg's", 'Corn Flakes Original, 875 g', 'cereal', '#E8352E', 349, 399, 4.4, 30120, 'freshmart', 'Type: Breakfast cereal | Weight: 875 g | Iron: Fortified | Serving: 30 g | Pack: Box' ],
  ['grocery', 'Snacks', 'Haldiram\'s', 'Bhujia Sev Namkeen, 1 kg', 'snack', '#E0A12C', 255, 290, 4.4, 26440, 'freshmart', 'Type: Namkeen | Weight: 1 kg | Veg: Yes | Pack: Pouch | Shelf life: 6 months' ],
  ['grocery', 'Snacks', 'Cadbury', 'Dairy Milk Silk Chocolate Bar, Pack of 4', 'chocolate', '#4B2A7B', 360, 400, 4.6, 18902, 'freshmart', 'Type: Milk chocolate | Weight: 4 x 60 g | Veg: Yes | Pack: Bar | Storage: Cool, dry place' ],
  ['grocery', 'Household', 'Surf Excel', 'Matic Front Load Liquid Detergent, 2 L', 'detergent', '#2E66C2', 449, 570, 4.5, 34012, 'freshmart', 'Type: Liquid detergent | Volume: 2 L | Machine: Front load | Washes: Up to 30 | Fragrance: Fresh' ],

  // ── Sports ─────────────────────────────────────────────────────────────────
  ['sports', 'Fitness', 'Boldfit', 'Adjustable Dumbbell Set, 20 kg', 'dumbbell', '#2B2C2F', 2999, 5999, 4.2, 14120, 'sportsvilla', 'Total weight: 20 kg | Plates: PVC | Rods: 2 dumbbell + 1 connector | Grip: Knurled | Use: Home gym' ],
  ['sports', 'Fitness', 'Decathlon', 'Domyos 500 Treadmill, Foldable', 'treadmill', '#2E3033', 49999, 64999, 4.3, 1220, 'sportsvilla', 'Max speed: 16 km/h | Incline: 10% | Motor: 2 HP | Max user: 110 kg | Fold: Yes' ],
  ['sports', 'Yoga', 'Lululemon', 'The Mat 5 mm Reversible Yoga Mat', 'yogamat', '#6E7F6A', 8800, 9800, 4.7, 820, 'sportsvilla', 'Thickness: 5 mm | Material: Natural rubber, polyurethane top | Size: 180 x 66 cm | Grip: Wet & dry | Weight: 2.38 kg' ],
  ['sports', 'Cricket', 'SG', 'Sunny Tonny English Willow Cricket Bat', 'bat', '#D8B57A', 15999, 19999, 4.5, 920, 'sportsvilla', 'Willow: English, Grade 1 | Weight: 1.16-1.22 kg | Handle: Cane | Size: SH | Grains: 8-12' ],
  ['sports', 'Football', 'Nike', 'Premier League Flight Football, Size 5', 'football', '#F2F1EC', 3995, 4995, 4.6, 2104, 'brandstore', 'Size: 5 | Construction: Aerowsculpt grooves | Certification: FIFA Quality Pro | Bladder: Rubber | Use: Match' ],
  ['sports', 'Cycling', 'Btwin', 'Rockrider ST 100 Mountain Bike, 27.5"', 'cycle', '#C9452B', 17999, 21999, 4.4, 3210, 'sportsvilla', 'Wheel: 27.5" | Gears: 21 speed | Frame: Aluminium | Brakes: V-brakes | Suspension: Front fork 100 mm' ],
  ['sports', 'Fitness', 'Fitbit', 'Charge 6 Fitness Tracker with Google', 'band', '#2B2D30', 14999, 17999, 4.3, 3420, 'retailnet', 'Display: AMOLED | GPS: Built-in | Battery: 7 days | Health: ECG, SpO2 | Payments: Google Wallet' ],

  // ── Books ──────────────────────────────────────────────────────────────────
  ['books', 'Self-help', 'Penguin', 'Atomic Habits by James Clear (Paperback)', 'book', '#E8DCC0', 499, 799, 4.7, 98240, 'pageturner', 'Author: James Clear | Publisher: Penguin Random House | Pages: 320 | Language: English | Binding: Paperback', { badges: ['Bestseller'] }],
  ['books', 'Business', 'Jaico', 'The Psychology of Money by Morgan Housel', 'book', '#F2EFE6', 349, 399, 4.6, 72140, 'pageturner', 'Author: Morgan Housel | Publisher: Jaico Publishing | Pages: 252 | Language: English | Binding: Paperback' ],
  ['books', 'Fiction', 'Bloomsbury', 'Harry Potter Box Set: The Complete Collection', 'bookset', '#3A2E5A', 3499, 5999, 4.8, 34020, 'pageturner', 'Author: J.K. Rowling | Volumes: 7 | Publisher: Bloomsbury | Language: English | Binding: Paperback' ],
  ['books', 'Fiction', 'Penguin', 'The God of Small Things by Arundhati Roy', 'book', '#7A2E2A', 299, 450, 4.4, 12900, 'pageturner', 'Author: Arundhati Roy | Publisher: Penguin India | Pages: 340 | Language: English | Binding: Paperback' ],
  ['books', 'Business', 'HarperCollins', 'Zero to One by Peter Thiel', 'book', '#1F4F8C', 399, 699, 4.5, 21040, 'pageturner', 'Author: Peter Thiel | Publisher: Virgin Books | Pages: 224 | Language: English | Binding: Paperback' ],
  ['books', 'Children', 'Scholastic', 'The Very Hungry Caterpillar Board Book', 'book', '#6FAF5A', 299, 399, 4.8, 15402, 'pageturner', 'Author: Eric Carle | Age: 1-4 years | Pages: 26 | Language: English | Binding: Board book' ],
  ['books', 'Exam prep', 'Arihant', 'UPSC CSE Prelims 2027: 30 Years Solved Papers', 'book', '#C4302B', 545, 695, 4.4, 8230, 'pageturner', 'Publisher: Arihant | Edition: 2027 | Pages: 960 | Language: English | Binding: Paperback' ],
  ['books', 'Fiction', 'Amazon Kindle', 'Kindle Paperwhite 16 GB, 7" Display', 'ereader', '#1F2124', 16999, 17999, 4.6, 12030, 'retailnet', 'Display: 7" 300 ppi glare-free | Storage: 16 GB | Battery: Up to 12 weeks | Water: IPX8 | Light: Adjustable warm' ],

  // ── Toys ───────────────────────────────────────────────────────────────────
  ['toys', 'Building sets', 'LEGO', 'Technic Ferrari SF-24 F1 Car Model Kit', 'blocks', '#C8102E', 21999, 24999, 4.8, 1420, 'kidzone', 'Pieces: 1361 | Age: 18+ | Theme: Technic | Dimensions: 63 cm long | Features: Working steering, V6 engine' ],
  ['toys', 'Building sets', 'LEGO', 'Classic Large Creative Brick Box, 790 Pieces', 'blocks', '#F2B705', 3999, 4999, 4.8, 12620, 'kidzone', 'Pieces: 790 | Age: 4+ | Theme: Classic | Storage: Tub included | Colours: 33' ],
  ['toys', 'Remote control', 'Hot Wheels', 'RC Rally Racer, 1:16 Scale', 'rccar', '#1F5FC4', 2499, 3999, 4.2, 3410, 'kidzone', 'Scale: 1:16 | Range: 30 m | Battery: Rechargeable | Age: 6+ | Speed: 12 km/h' ],
  ['toys', 'Board games', 'Hasbro', 'Monopoly Classic Board Game', 'boardgame', '#D32F2F', 1299, 1799, 4.5, 21040, 'kidzone', 'Players: 2-6 | Age: 8+ | Duration: 60-180 min | Language: English | Contents: Board, tokens, cards' ],
  ['toys', 'Soft toys', 'Mirada', 'Super Soft Teddy Bear, 3 Feet', 'teddy', '#C59A6E', 1199, 2499, 4.3, 8920, 'kidzone', 'Height: 90 cm | Material: Polyester plush | Age: 3+ | Washable: Hand wash | Filling: Fibre' ],
  ['toys', 'Learning', 'Skillmatics', 'Guess in 10: Animal Planet Card Game', 'boardgame', '#2F8F6F', 599, 799, 4.6, 10220, 'kidzone', 'Players: 2-6 | Age: 6+ | Duration: 20 min | Skills: Deduction, vocabulary | Cards: 50' ],

  // ── Baby ───────────────────────────────────────────────────────────────────
  ['baby', 'Diapers', 'Pampers', 'Premium Care Pants, Large, 64 Count', 'diapers', '#5FB3D9', 1499, 2099, 4.5, 42030, 'freshmart', 'Size: Large, 9-14 kg | Count: 64 | Type: Pant style | Wetness indicator: Yes | Protection: Up to 12 h' ],
  ['baby', 'Feeding', 'Philips Avent', 'Natural Response Baby Bottle, 260 ml, Pack of 2', 'babybottle', '#E9F1F5', 1350, 1650, 4.5, 6120, 'kidzone', 'Capacity: 260 ml | Material: BPA free | Nipple: Natural Response, 1m+ | Anti-colic: Yes | Pack: 2' ],
  ['baby', 'Strollers', 'LuvLap', 'Starshine Baby Stroller with Reversible Handle', 'stroller', '#2F3A4A', 6999, 10999, 4.3, 4210, 'kidzone', 'Age: 0-3 years | Recline: 3 position | Handle: Reversible | Basket: Large | Weight: 9.5 kg' ],
  ['baby', 'Baby care', 'Himalaya', 'Gentle Baby Wipes, 72 Count, Pack of 6', 'wipes', '#9BC7A6', 799, 1050, 4.4, 30420, 'freshmart', 'Count: 6 x 72 | Ingredients: Aloe vera, Indian kino | Alcohol free: Yes | Paraben free: Yes | Use: Daily' ],
  ['baby', 'Baby care', 'Mamaearth', 'Gentle Cleansing Baby Shampoo, 400 ml', 'shampoo', '#F2B9A6', 449, 599, 4.3, 18220, 'glowup', 'Volume: 400 ml | Ingredients: Coconut, aloe vera | Tear free: Yes | Sulphate free: Yes | Age: 0+' ],

  // ── Automotive ─────────────────────────────────────────────────────────────
  ['automotive', 'Helmets', 'Steelbird', 'SBA-21 GT Full Face Helmet, Matt Black', 'helmet', '#1F2022', 1899, 2899, 4.2, 18420, 'motormate', 'Type: Full face | Certification: ISI, DOT | Visor: Clear, anti-scratch | Shell: ABS | Sizes: M, L, XL' ],
  ['automotive', 'Helmets', 'Royal Enfield', 'MLG Open Face Helmet, Gloss White', 'helmet', '#ECEBE7', 3450, 3950, 4.4, 2310, 'motormate', 'Type: Open face | Certification: ISI | Shell: Thermoplastic | Liner: Removable | Sizes: M, L, XL' ],
  ['automotive', 'Car electronics', '70mai', 'A510 Dash Cam 3K with Rear Camera', 'dashcam', '#1D1E20', 7499, 11999, 4.3, 5602, 'motormate', 'Resolution: 3K front + 1080p rear | Night vision: Yes | GPS: Built-in | Parking mode: Yes | App: Wi-Fi' ],
  ['automotive', 'Car care', 'Bosch', 'GHP 180 Pressure Washer, 1700 W', 'washer2', '#2D7D3A', 9999, 13999, 4.3, 3210, 'motormate', 'Power: 1700 W | Pressure: 120 bar | Flow: 360 L/h | Hose: 6 m | Use: Car, bike, patio' ],
  ['automotive', 'Tyres', 'Michelin', 'Primacy 4 ST 205/55 R16 Tubeless Car Tyre', 'tyre', '#202123', 8499, 9800, 4.6, 920, 'motormate', 'Size: 205/55 R16 | Type: Tubeless | Speed: V (240 km/h) | Load index: 91 | Use: Car' ],

  // ── Travel ─────────────────────────────────────────────────────────────────
  ['travel', 'Suitcases', 'American Tourister', 'Ivy 68 cm Medium Hard Luggage, Navy', 'suitcase', '#253A5E', 4999, 9900, 4.3, 18402, 'retailnet', 'Size: 68 cm medium | Shell: Polypropylene | Wheels: 4 spinner | Lock: TSA combination | Warranty: 3 years' ],
  ['travel', 'Suitcases', 'Samsonite', 'Proxis 55 cm Cabin Spinner, Matt Graphite', 'suitcase', '#4A4D52', 22999, 32000, 4.6, 920, 'brandstore', 'Size: 55 cm cabin | Shell: Roxkin | Weight: 2.1 kg | Wheels: Double spinner | Warranty: 10 years' ],
  ['travel', 'Backpacks', 'Wildcraft', 'Trailblazer 45 L Rucksack', 'backpack', '#3E5A47', 2999, 4495, 4.3, 7610, 'sportsvilla', 'Capacity: 45 L | Material: Polyester | Rain cover: Included | Compartments: 3 | Back: Padded ventilated' ],
  ['travel', 'Backpacks', 'Herschel', 'Little America Laptop Backpack, 25 L', 'backpack', '#1F2A3A', 9499, 11999, 4.6, 1230, 'stylehub', 'Capacity: 25 L | Laptop: Up to 15" | Material: Recycled polyester | Closure: Magnetic straps | Warranty: Limited lifetime' ],
  ['travel', 'Duffels', 'Nike', 'Brasilia 9.5 Training Duffel Bag, 60 L', 'duffel', '#1E1F21', 2995, 3495, 4.5, 6120, 'brandstore', 'Capacity: 60 L | Material: Polyester | Shoe compartment: Yes | Strap: Removable | Size: Medium' ],
  ['travel', 'Travel accessories', 'Apple', 'AirTag, 4 Pack', 'airtag', '#F2F2F0', 10900, 11900, 4.7, 8210, 'appario', 'Pack: 4 | Tracking: Find My network | Precision finding: UWB | Battery: CR2032, 1 year+ | Water: IP67' ],

  // ── Pet supplies ───────────────────────────────────────────────────────────
  ['pets', 'Dog food', 'Pedigree', 'Adult Dry Dog Food, Chicken & Vegetables, 10 kg', 'petfood', '#F2C230', 2299, 2650, 4.4, 30120, 'pawsome', 'Life stage: Adult | Flavour: Chicken & vegetables | Weight: 10 kg | Veg: No | Protein: 21%' ],
  ['pets', 'Dog food', 'Royal Canin', 'Maxi Adult Dry Dog Food, 4 kg', 'petfood', '#C21F32', 3699, 3999, 4.6, 6420, 'pawsome', 'Breed size: Large | Life stage: Adult | Weight: 4 kg | Benefit: Bone & joint health | Protein: 26%' ],
  ['pets', 'Cat food', 'Whiskas', 'Adult Wet Cat Food, Tuna in Jelly, 12 x 85 g', 'petpouch', '#6A3D9A', 540, 600, 4.4, 15420, 'pawsome', 'Life stage: Adult 1+ | Flavour: Tuna in jelly | Pack: 12 x 85 g | Type: Wet | Complete: Yes' ],
  ['pets', 'Toys', 'Kong', 'Classic Dog Chew Toy, Medium', 'kong', '#C62C2A', 1199, 1450, 4.6, 4210, 'pawsome', 'Size: Medium | Material: Natural rubber | Dogs: 7-16 kg | Treat dispensing: Yes | Origin: USA' ],
  ['pets', 'Beds', 'Petsfit', 'Orthopaedic Donut Pet Bed, Large', 'petbed', '#B9AD9C', 1899, 3499, 4.3, 2410, 'pawsome', 'Size: Large, 80 cm | Fill: Memory foam | Cover: Removable, washable | Base: Anti-slip | Pets: Dogs & cats' ],
]

const slugify = (s) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/['’"]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 64)

rows.push(...catalogExpansion)

const parseSpecs = (s) =>
  Object.fromEntries(
    s.split('|').map((pair) => {
      const i = pair.indexOf(':')
      return [pair.slice(0, i).trim(), pair.slice(i + 1).trim()]
    }),
  )

const imageMatchStopWords = new Set(['the', 'with', 'and', 'for', 'from', 'view', 'image', 'photo', 'studio', 'model', 'product', 'pack', 'set', 'men', 'mens', 'women', 'womens', 'shoe', 'shoes', 'running', 'road', 'wireless', 'smart', 'new', 'edt', 'edp', 'eau', 'toilette'])
const imageStorageNumbers = new Set(['16', '32', '64', '128', '256', '512', '1024', '2048'])
const imageColors = new Set('black white gray grey blue navy red green purple lavender violet pink silver gold beige cream brown tan graphite titanium midnight starlight rose orange yellow teal ivory mocha sand storm indigo copper'.split(' '))
const imageColor = (token) => token === 'grey' ? 'gray' : token
const imageTokens = (value) => new Set(value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/([a-z])(\d)/g, '$1 $2').replace(/(\d)([a-z])/g, '$1 $2').replace(/[^a-z0-9]+/g, ' ').split(' ').filter((token) => (token.length > 1 || /^\d$/.test(token)) && !imageMatchStopWords.has(token)))

function imageModelNumbers(title, wanted) {
  const measured = new Set()
  for (const match of title.toLowerCase().matchAll(/(\d+(?:\.\d+)?)\s*(?:gb|tb|kg|mg|ml|mah|hz|w|g|cm|mm|inch(?:es)?|in|l|m|pieces?|pcs?)\b/g)) {
    for (const part of match[1].split('.')) measured.add(part)
  }
  return [...wanted].filter((token) => /\d/.test(token) && !imageStorageNumbers.has(token) && !measured.has(token))
}

// Avoid showing an asset whose own source title describes a different product or model.
// Low-confidence files remain on disk for manual review but are not served as product photos.
function sourceTitleMatchesProduct(row, photo) {
  if (photo.generated) return true
  const wanted = imageTokens(`${row[2]} ${row[3]}`)
  const source = imageTokens(photo.title ?? '')
  const brand = imageTokens(row[2])
  const modelTokens = imageModelNumbers(row[3], wanted)
  if (modelTokens.length && !modelTokens.every((token) => source.has(token))) return false
  const expectedColors = [...wanted].filter((token) => imageColors.has(token)).map(imageColor)
  const listedColors = [...source].filter((token) => imageColors.has(token)).map(imageColor)
  if (expectedColors.length && listedColors.length && !expectedColors.some((color) => listedColors.includes(color))) return false
  const identityTokens = [...wanted].filter((token) => !brand.has(token) && !/\d/.test(token) && !imageColors.has(token))
  const identityOverlap = identityTokens.filter((token) => source.has(token)).length
  if (identityTokens.length && identityOverlap < 1) return false
  const accessoryTerms = row[0] === 'mobiles'
    ? ['case', 'cover', 'charger', 'cable', 'protector', 'adapter', 'holder', 'mount', 'skin']
    : row[0] === 'laptops'
      ? ['case', 'sleeve', 'bag', 'charger', 'adapter', 'stand', 'skin']
      : []
  if (accessoryTerms.some((term) => source.has(term) && !wanted.has(term))) return false
  const overlap = [...wanted].filter((token) => source.has(token)).length
  const union = new Set([...wanted, ...source]).size
  return union > 0 && overlap / union >= 0.25
}

// Deterministic pseudo-random so the catalogue is identical on every load.
const seeded = (n) => {
  const x = Math.sin(n * 9301 + 49297) * 233280
  return x - Math.floor(x)
}

const BIG_TICKET = new Set(['tvs', 'appliances', 'furniture'])
const FAST_CATEGORIES = new Set(['grocery', 'mobiles', 'electronics', 'beauty', 'books', 'baby', 'pets'])

function deliveryFor(category, price, i) {
  const r = seeded(i + 7)
  if (BIG_TICKET.has(category)) {
    return { days: 3 + Math.floor(r * 3), free: true, installation: category !== 'furniture' ? 'Free installation' : 'Free assembly' }
  }
  if (category === 'grocery') return { days: 0, free: price >= 299, slot: 'Today, 6 – 8 PM' }
  const days = FAST_CATEGORIES.has(category) ? (r > 0.45 ? 1 : 2) : 2 + Math.floor(r * 3)
  return { days, free: price >= 499 }
}

function returnsFor(category) {
  if (category === 'grocery' || category === 'beauty') return { days: 0, policy: 'Non-returnable, replacement only if damaged' }
  if (category === 'fashion' || category === 'footwear') return { days: 15, policy: '15-day free returns & size exchange' }
  if (BIG_TICKET.has(category)) return { days: 10, policy: '10-day replacement' }
  return { days: 7, policy: '7-day replacement' }
}

function offersFor(price) {
  const offers = []
  if (price >= 5000) offers.push({ type: 'bank', text: '10% instant discount on HDFC Bank credit cards', cap: Math.min(Math.round(price * 0.1), 7500) })
  if (price >= 10000) offers.push({ type: 'emi', text: `No-cost EMI from ₹${Math.round(price / 12).toLocaleString('en-IN')}/month` })
  if (price >= 1000) offers.push({ type: 'upi', text: 'Flat ₹100 off on UPI payments above ₹1,000' })
  offers.push({ type: 'coupon', text: 'Extra 5% off with code BAZAAR5 on first order' })
  return offers
}

function build(row, i) {
  const [category, sub, brand, title, art, color, price, mrp, rating, reviewCount, sellerId, specs, extra = {}] = row
  const id = slugify(`${brand} ${title}`)
  const exactPhoto = productPhotos[id]
  const imagePhoto = exactPhoto && sourceTitleMatchesProduct(row, exactPhoto) ? exactPhoto : null
  const photoMeta = imagePhoto ?? null
  const discount = mrp > price ? Math.round(((mrp - price) / mrp) * 100) : 0
  const r = seeded(i)
  const stock = r < 0.08 ? 3 + Math.floor(r * 40) : 20 + Math.floor(r * 400)
  const parsedSpecs = parseSpecs(specs)
  const categoryName = categoryBySlug[category]?.name
  const highlights = extra.highlights ?? Object.entries(parsedSpecs).slice(0, 4).map(([key, value]) => `${key}: ${value}`)
  const description = extra.description ?? `${brand} ${title} is a ${sub.toLowerCase()} pick from Bazaar’s curated ${categoryName.toLowerCase()} catalogue. Review the key product details below to compare materials, features and compatibility before ordering.`
  const tags = extra.tags ?? [...new Set([category, categoryName.toLowerCase(), sub.toLowerCase(), brand.toLowerCase(), art, ...title.toLowerCase().split(/[^a-z0-9]+/).filter((word) => word.length > 2)])]
  const sizes = extra.sizes ?? []
  const imageUrls = [imagePhoto ? `${import.meta.env.BASE_URL}products/${imagePhoto.file}` : null, ...(imagePhoto?.images ?? []).map((f) => `${import.meta.env.BASE_URL}products/${f}`), ...(extra.images ?? []).map((f) => `${import.meta.env.BASE_URL}products/${f}`)].filter(Boolean)
  const imageLabels = extra.imageLabels ?? imagePhoto?.imageLabels ?? imageUrls.map((_, index) => index === 0 ? 'Primary product view' : `Additional product view ${index + 1}`)
  const colorGalleries = Object.fromEntries(Object.entries(imagePhoto?.colorGalleries ?? extra.colorGalleries ?? {}).map(([shade, files]) => [shade, files.map((file) => `${import.meta.env.BASE_URL}products/${file}`)]))
  return {
    id,
    sku: `BZR-${category.slice(0, 3).toUpperCase()}-${String(1000 + i)}`,
    category,
    categoryName,
    subcategory: sub,
    brand,
    title,
    seller: sellers[sellerId],
    art: { kind: art, color },
    colors: Object.keys(colorGalleries).length ? Object.keys(colorGalleries) : (extra.colors ?? [color]),
    price,
    mrp,
    discount,
    rating,
    reviewCount,
    stock,
    badges: extra.badges ?? [],
    assured: sellers[sellerId]?.rating >= 4.6,
    specs: parsedSpecs,
    description,
    highlights,
    tags,
    sizes,
    delivery: deliveryFor(category, price, i),
    returns: returnsFor(category),
    offers: offersFor(price),
    image: imagePhoto ? `${import.meta.env.BASE_URL}products/${imagePhoto.file}` : null,
    // Extra gallery views (public/products/<file>); the product card crossfades to the second one on hover.
    images: imageUrls,
    imageLabels,
    galleryImages: imageUrls.map((url, index) => ({ url, alt: `${imageLabels[index] ?? 'Product view'} of ${title}`, order: index + 1 })),
    // Populate only when the catalogue has verified, colour-specific photo sets.
    colorGalleries,
    photo: photoMeta,
    imageReview: exactPhoto ? (imagePhoto ? (exactPhoto.generated ? 'ai-illustrative' : 'source-title-match') : 'needs-product-photo-review') : 'missing',
    addedAt: Date.UTC(2026, 0, 1) + Math.floor(seeded(i + 3) * 270) * 86400000,
  }
}

export const products = rows.map(build)
export const productById = Object.fromEntries(products.map((p) => [p.id, p]))
export const brandsInCatalogue = [...new Set(products.map((p) => p.brand))].sort()
