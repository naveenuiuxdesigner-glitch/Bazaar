// Product photos keyed by product id. Files live in public/products/ and keep individual source and licence metadata.
// Products without an eligible image render an explicit unavailable-photo state instead of a product illustration.
const productPhotoRecords = {
  "apple-iphone-17-pro-256-gb-cosmic-orange": {
    "file": "apple-iphone-17-pro-256-gb-cosmic-orange.webp",
    "title": "Cosmic Orange iPhone 17 Pro Max",
    "author": "Wikimedia Commons contributor",
    "license": "CC0",
    "licenseUrl": "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
    "source": "https://commons.wikimedia.org/w/index.php?curid=175253995"
  },
  "apple-iphone-17-128-gb-lavender": {
    "file": "apple-iphone-17-128-gb-lavender.webp",
    "title": "Light Gold iPhone Air",
    "author": "Wikimedia Commons contributor",
    "license": "CC0",
    "licenseUrl": "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
    "source": "https://commons.wikimedia.org/w/index.php?curid=175253993"
  },
  "apple-iphone-16e-128-gb-white": {
    "file": "apple-iphone-16e-128-gb-white.webp",
    "title": "IPhone XS",
    "author": "Wikimedia Commons contributor",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "source": "https://commons.wikimedia.org/w/index.php?curid=86369964"
  },
  "samsung-galaxy-s26-ultra-5g-512-gb-titanium-black": {
    "file": "samsung-galaxy-s26-ultra-5g-512-gb-titanium-black.webp",
    "title": "Samsung Galaxy S23 Ultra, 512 GB, Lavender mit S-Pen 20230416 HOF00335 RAW-Export cens",
    "author": "Wikimedia Commons contributor",
    "license": "CC BY 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/4.0",
    "source": "https://commons.wikimedia.org/w/index.php?curid=130828041"
  },
  "samsung-galaxy-s25-fe-5g-256-gb-icy-blue": {
    "file": "samsung-galaxy-s25-fe-5g-256-gb-icy-blue.webp",
    "title": "第一手！Samsung Galaxy S25系列拿到了：5个升级！S Pen不支持蓝牙了？ (2160p 50fps VP9-96kbit AAC)-00.00.07.100",
    "author": "Wikimedia Commons contributor",
    "license": "CC BY 3.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/3.0",
    "source": "https://commons.wikimedia.org/w/index.php?curid=158392507"
  },
  "samsung-galaxy-z-fold7-5g-256-gb-blue-shadow": {
    "file": "samsung-galaxy-z-fold7-5g-256-gb-blue-shadow.webp",
    "title": "Samsung Galaxy Fold7 Cover Screen (cropped)",
    "author": "Wikimedia Commons contributor",
    "license": "CC0",
    "licenseUrl": "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
    "source": "https://commons.wikimedia.org/w/index.php?curid=174310773"
  },
  "samsung-galaxy-z-flip7-5g-256-gb-coral-red": {
    "file": "samsung-galaxy-z-flip7-5g-256-gb-coral-red.webp",
    "title": "Samsung Galaxy Z Flip 3",
    "author": "Wikimedia Commons contributor",
    "license": "Apache License 2.0",
    "licenseUrl": "http://www.apache.org/licenses/LICENSE-2.0",
    "source": "https://commons.wikimedia.org/w/index.php?curid=112527373"
  },
  "google-pixel-10-pro-256-gb-moonstone": {
    "file": "google-pixel-10-pro-256-gb-moonstone.webp",
    "title": "Google Pixel 9 Pro XL (back)",
    "author": "D.328",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/",
    "source": "https://commons.wikimedia.org/w/index.php?curid=156666037"
  },
  "google-pixel-10-128-gb-indigo": {
    "file": "google-pixel-10-128-gb-indigo.webp",
    "title": "Arrière du Google Pixel 10 Pro pierre de lune de 256 Go",
    "author": "Wikimedia Commons contributor",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "source": "https://commons.wikimedia.org/w/index.php?curid=175908734"
  },
  "oneplus-oneplus-15-5g-512-gb-sand-storm": {
    "file": "oneplus-oneplus-15-5g-512-gb-sand-storm.webp",
    "title": "Oneplus-15-back",
    "author": "Wikimedia Commons contributor",
    "license": "CC BY 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/4.0",
    "source": "https://commons.wikimedia.org/w/index.php?curid=185296461"
  },
  "oneplus-oneplus-nord-5-5g-256-gb-marble-sands": {
    "file": "oneplus-oneplus-nord-5-5g-256-gb-marble-sands.webp",
    "title": "OnePlus Nord 2T",
    "author": "Wikimedia Commons contributor",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "source": "https://commons.wikimedia.org/w/index.php?curid=150277619"
  },
  "nothing-phone-3-256-gb-white": {
    "file": "nothing-phone-3-256-gb-white.webp",
    "title": "Nothing Phone",
    "author": "Wikimedia Commons contributor",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "source": "https://commons.wikimedia.org/w/index.php?curid=139963849"
  },
  "xiaomi-redmi-note-15-pro-5g-256-gb-mirage-purple": {
    "file": "xiaomi-redmi-note-15-pro-5g-256-gb-mirage-purple.webp",
    "title": "Xiaomi Redmi Note 6 Pro レビュー (13)",
    "author": "GEEK KAZU",
    "license": "CC BY 2.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/2.0/",
    "source": "https://www.flickr.com/photos/152342724@N04/44537762405"
  },
  "motorola-edge-60-pro-5g-256-gb-pantone-dazzling-blue": {
    "file": "motorola-edge-60-pro-5g-256-gb-pantone-dazzling-blue.webp",
    "title": "Motorola Edge 60 Pro (cropped)",
    "author": "Wikimedia Commons contributor",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "source": "https://commons.wikimedia.org/w/index.php?curid=181964956"
  },
  "anker-nano-65-w-3-port-gan-charger": {
    "file": "anker-nano-65-w-3-port-gan-charger.webp",
    "title": "Anker Fusion White",
    "author": "Wikimedia Commons contributor",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "source": "https://commons.wikimedia.org/w/index.php?curid=75564195"
  },
  "sony-wh-1000xm6-wireless-noise-cancelling-headphones": {
    "file": "sony-wh-1000xm6-wireless-noise-cancelling-headphones.webp",
    "title": "Sony-WH-1000XM3-kabellose-Bluetooth-Noise-Cancelling-Kopfhoerer.3",
    "author": "Wikimedia Commons contributor",
    "license": "CC BY 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/4.0",
    "source": "https://commons.wikimedia.org/w/index.php?curid=92714351"
  },
  "bose-quietcomfort-ultra-headphones-2nd-gen": {
    "file": "bose-quietcomfort-ultra-headphones-2nd-gen.webp",
    "title": "File:Bose QuietComfort 25 Acoustic Noise Cancelling Headphones.jpg",
    "author": "Florian Fuchs",
    "license": "CC BY-SA 3.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/",
    "source": "https://commons.wikimedia.org/w/index.php?curid=48773652"
  },
  "apple-airpods-max-usb-c-midnight": {
    "file": "apple-airpods-max-usb-c-midnight.webp",
    "title": "Apple airpods max 1",
    "author": "Arne Müseler",
    "license": "CC BY-SA 3.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/de/deed.en/",
    "source": "https://commons.wikimedia.org/w/index.php?curid=98546842"
  },
  "jbl-tune-770nc-wireless-over-ear-headphones": {
    "file": "jbl-tune-770nc-wireless-over-ear-headphones.webp",
    "title": "JBL LIVE 650 BTNC (Over-Ear Noise Cancelling Headphone). (51127342181)",
    "author": "Wikimedia Commons contributor",
    "license": "CC BY 2.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
    "source": "https://commons.wikimedia.org/w/index.php?curid=104533726"
  },
  "apple-airpods-pro-3-with-magsafe-case": {
    "file": "apple-airpods-pro-3-with-magsafe-case.webp",
    "title": "Apple airpods pro case",
    "author": "Wikimedia Commons contributor",
    "license": "CC BY-SA 3.0 de",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/de/deed.en",
    "source": "https://commons.wikimedia.org/w/index.php?curid=98518627"
  },
  "samsung-galaxy-buds3-pro-silver": {
    "file": "samsung-galaxy-buds3-pro-silver.webp",
    "title": "Samsung Galaxy Buds FE and Samsung Galaxy Buds2 Pro",
    "author": "Wikimedia Commons contributor",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "source": "https://commons.wikimedia.org/w/index.php?curid=182671221"
  },
  "boat-airdopes-800-dolby-audio-earbuds": {
    "file": "boat-airdopes-800-dolby-audio-earbuds.webp",
    "title": "Fairphone+True+Wireless+Earbuds+_+front+and+back",
    "author": "Fairphone",
    "license": "CC BY-SA 2.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.0/",
    "source": "https://www.flickr.com/photos/60295192@N08/51549857553"
  },
  "jbl-charge-6-portable-bluetooth-speaker": {
    "file": "jbl-charge-6-portable-bluetooth-speaker.webp",
    "title": "JBL Charge 4 2v2",
    "author": "Wikimedia Commons contributor",
    "license": "CC0",
    "licenseUrl": "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
    "source": "https://commons.wikimedia.org/w/index.php?curid=110903875"
  },
  "marshall-emberton-iii-portable-speaker-black-brass": {
    "file": "marshall-emberton-iii-portable-speaker-black-brass.webp",
    "title": "Marshall Speaker",
    "author": "Wikimedia Commons contributor",
    "license": "CC0",
    "licenseUrl": "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
    "source": "https://commons.wikimedia.org/w/index.php?curid=145808050"
  },
  "sony-ult-field-1-wireless-speaker": {
    "file": "sony-ult-field-1-wireless-speaker.webp",
    "title": "Sony ULT Field 5 Speaker",
    "author": "Wikimedia Commons contributor",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "source": "https://commons.wikimedia.org/w/index.php?curid=192612742"
  },
  "samsung-galaxy-watch8-classic-46-mm-black": {
    "file": "samsung-galaxy-watch8-classic-46-mm-black.webp",
    "title": "Samsung Galaxy Watch6 Classic 43mm",
    "author": "Wikimedia Commons contributor",
    "license": "CC0",
    "licenseUrl": "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
    "source": "https://commons.wikimedia.org/w/index.php?curid=152537594"
  },
  "garmin-forerunner-970-gps-running-watch": {
    "file": "garmin-forerunner-970-gps-running-watch.webp",
    "title": "Garmin Forerunner 965",
    "author": "Wikimedia Commons contributor",
    "license": "GFDL",
    "licenseUrl": "http://www.gnu.org/copyleft/fdl.html",
    "source": "https://commons.wikimedia.org/w/index.php?curid=129853282"
  },
  "noise-colorfit-pro-6-max-smartwatch": {
    "file": "noise-colorfit-pro-6-max-smartwatch.webp",
    "title": "PineTime smartwatch",
    "author": "Wikimedia Commons contributor",
    "license": "CC0",
    "licenseUrl": "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
    "source": "https://commons.wikimedia.org/w/index.php?curid=144952904"
  },
  "sony-alpha-7-iv-full-frame-mirrorless-camera-body": {
    "file": "sony-alpha-7-iv-full-frame-mirrorless-camera-body.webp",
    "title": "Sony.alpha.7IV.G-Master.24-105mm.DSC00141",
    "author": "Wikimedia Commons contributor",
    "license": "CC0",
    "licenseUrl": "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
    "source": "https://commons.wikimedia.org/w/index.php?curid=111435774"
  },
  "canon-eos-r50-mirrorless-camera-with-18-45-mm-lens": {
    "file": "canon-eos-r50-mirrorless-camera-with-18-45-mm-lens.webp",
    "title": "Canon EOS R50 (52694437103)",
    "author": "Wikimedia Commons contributor",
    "license": "CC BY 2.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
    "source": "https://commons.wikimedia.org/w/index.php?curid=139804666"
  },
  "gopro-hero13-black-action-camera": {
    "file": "gopro-hero13-black-action-camera.webp",
    "title": "GoPro Hero 8 Black and Hero 11 Black",
    "author": "Wikimedia Commons contributor",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "source": "https://commons.wikimedia.org/w/index.php?curid=153489359"
  },
  "apple-macbook-air-13-m4-16-gb-256-gb-sky-blue": {
    "file": "apple-macbook-air-13-m4-16-gb-256-gb-sky-blue.webp",
    "title": "M2 Macbook Air Starlight model",
    "author": "KKPCW（Kyu3）",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/",
    "source": "https://commons.wikimedia.org/w/index.php?curid=121262187"
  },
  "apple-macbook-pro-14-m5-16-gb-512-gb-space-black": {
    "file": "apple-macbook-pro-14-m5-16-gb-512-gb-space-black.webp",
    "title": "MacBook Pro 16 (M1 Pro, 2021) - Wikipedia",
    "author": "Wikimedia Commons contributor",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "source": "https://commons.wikimedia.org/w/index.php?curid=112497213"
  },
  "dell-xps-13-copilot-pc-snapdragon-x-elite-16-gb": {
    "file": "dell-xps-13-copilot-pc-snapdragon-x-elite-16-gb.webp",
    "title": "Dell XPS 15 (2017)",
    "author": "Wikimedia Commons contributor",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "source": "https://commons.wikimedia.org/w/index.php?curid=118755569"
  },
  "dell-inspiron-14-plus-core-ultra-7-16-gb-1-tb": {
    "file": "dell-inspiron-14-plus-core-ultra-7-16-gb-1-tb.webp",
    "title": "Dell Inspiron e1505n with Linux (14June2007)",
    "author": "Wikimedia Commons contributor",
    "license": "CC BY-SA 2.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.0",
    "source": "https://commons.wikimedia.org/w/index.php?curid=13035046"
  },
  "hp-elitebook-840-g11-core-ultra-5-16-gb": {
    "file": "hp-elitebook-840-g11-core-ultra-5-16-gb.webp",
    "title": "HP EliteBook 840 G4",
    "author": "Wikimedia Commons contributor",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "source": "https://commons.wikimedia.org/w/index.php?curid=98529074"
  },
  "hp-pavilion-plus-14-oled-ryzen-7-16-gb": {
    "file": "hp-pavilion-plus-14-oled-ryzen-7-16-gb.webp",
    "title": "HP Pavilion dv2000 laptop",
    "author": "Wikimedia Commons contributor",
    "license": "CC BY 2.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
    "source": "https://commons.wikimedia.org/w/index.php?curid=37144180"
  },
  "lenovo-thinkpad-x1-carbon-gen-13-aura-edition": {
    "file": "lenovo-thinkpad-x1-carbon-gen-13-aura-edition.webp",
    "title": "Lenovo ThinkPad X1 Ultrabook (Nov 16, 2012)",
    "author": "Wikimedia Commons contributor",
    "license": "CC BY-SA 2.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.0",
    "source": "https://commons.wikimedia.org/w/index.php?curid=27930663"
  },
  "lenovo-yoga-slim-7i-core-ultra-5-16-gb-oled": {
    "file": "lenovo-yoga-slim-7i-core-ultra-5-16-gb-oled.webp",
    "title": "Lenovo Yoga 530 Opening English Wikipedia",
    "author": "Wikimedia Commons contributor",
    "license": "CC BY 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/4.0",
    "source": "https://commons.wikimedia.org/w/index.php?curid=89411617"
  },
  "asus-rog-zephyrus-g14-oled-ryzen-ai-9-rtx-5070": {
    "file": "asus-rog-zephyrus-g14-oled-ryzen-ai-9-rtx-5070.webp",
    "title": "ASUS ROG Zephyrus 2026-08-15 G14",
    "author": "Wikimedia Commons contributor",
    "license": "CC BY 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/4.0",
    "source": "https://commons.wikimedia.org/w/index.php?curid=199042431"
  },
  "asus-zenbook-14-oled-core-ultra-7-16-gb": {
    "file": "asus-zenbook-14-oled-core-ultra-7-16-gb.webp",
    "title": "ASUS ZenBook UX305",
    "author": "Wikimedia Commons contributor",
    "license": "CC BY 2.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
    "source": "https://commons.wikimedia.org/w/index.php?curid=150349696"
  },
  "acer-swift-go-14-ai-snapdragon-x-plus-16-gb": {
    "file": "acer-swift-go-14-ai-snapdragon-x-plus-16-gb.webp",
    "title": "Acer Swift 7 laptop computer",
    "author": "Andri Koolme",
    "license": "CC BY 2.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/2.0/",
    "source": "https://www.flickr.com/photos/125858571@N04/32448365373"
  },
  "apple-ipad-air-11-m3-wi-fi-128-gb-purple": {
    "file": "apple-ipad-air-11-m3-wi-fi-128-gb-purple.webp",
    "title": "iPad Air",
    "author": "JohnKarak",
    "license": "CC BY-SA 2.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.0/",
    "source": "https://www.flickr.com/photos/98231059@N00/10922238735"
  },
  "samsung-galaxy-tab-s11-wi-fi-128-gb-grey": {
    "file": "samsung-galaxy-tab-s11-wi-fi-128-gb-grey.webp",
    "title": "Samsung Galaxy Tab S5e",
    "author": "Wikimedia Commons contributor",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "source": "https://commons.wikimedia.org/w/index.php?curid=98611054"
  },
  "lg-oled-evo-c5-65-4k-smart-tv": {
    "file": "lg-oled-evo-c5-65-4k-smart-tv.webp",
    "title": "LG OLED TV",
    "author": "Wikimedia Commons contributor",
    "license": "CC BY 2.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
    "source": "https://commons.wikimedia.org/w/index.php?curid=43883311"
  },
  "samsung-neo-qled-qn90f-65-4k-smart-tv": {
    "file": "samsung-neo-qled-qn90f-65-4k-smart-tv.webp",
    "title": "Free close television image",
    "author": "rawpixel",
    "license": "CC0",
    "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/",
    "source": "https://www.rawpixel.com/image/5917364/photo-image-public-domain-free"
  },
  "tcl-c7k-65-qd-mini-led-google-tv": {
    "file": "tcl-c7k-65-qd-mini-led-google-tv.webp",
    "title": "TCL H9700 55” Quantum Dot TV with Color IQ (16862291531)",
    "author": "Wikimedia Commons contributor",
    "license": "CC BY 2.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
    "source": "https://commons.wikimedia.org/w/index.php?curid=51017093"
  },
  "sony-playstation-5-pro-console-2-tb": {
    "file": "sony-playstation-5-pro-console-2-tb.webp",
    "title": "Video über die PS5 Pro (BeatEmUps) (2160p 60fps VP9-128kbit AAC)-00.02.26.400",
    "author": "Wikimedia Commons contributor",
    "license": "CC BY 3.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/3.0",
    "source": "https://commons.wikimedia.org/w/index.php?curid=155180624"
  },
  "nintendo-switch-2-console-with-mario-kart-world-bundle": {
    "file": "nintendo-switch-2-console-with-mario-kart-world-bundle.webp",
    "title": "Nintendo Switch 2 in Handheld Mode",
    "author": "Wikimedia Commons contributor",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "source": "https://commons.wikimedia.org/w/index.php?curid=166999711"
  },
  "microsoft-xbox-series-x-1-tb-carbon-black": {
    "file": "microsoft-xbox-series-x-1-tb-carbon-black.webp",
    "title": "Xbox Series X mit Controller (transparent background)",
    "author": "Wikimedia Commons contributor",
    "license": "CC BY 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/4.0",
    "source": "https://commons.wikimedia.org/w/index.php?curid=163274421"
  },
  "sony-dualsense-wireless-controller-cosmic-red": {
    "file": "sony-dualsense-wireless-controller-cosmic-red.webp",
    "title": "Playstation 5 DualSense controller in Midnight Black, 2026-02-07 (front)",
    "author": "Wikimedia Commons contributor",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "source": "https://commons.wikimedia.org/w/index.php?curid=183459423"
  },
  "microsoft-xbox-wireless-controller-robot-white": {
    "file": "microsoft-xbox-wireless-controller-robot-white.webp",
    "title": "Xbox One Wireless Controller Model 1708 (35327621563)",
    "author": "Wikimedia Commons contributor",
    "license": "CC BY 2.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
    "source": "https://commons.wikimedia.org/w/index.php?curid=96261990"
  },
  "logitech-g502-x-plus-wireless-gaming-mouse": {
    "file": "logitech-g502-x-plus-wireless-gaming-mouse.webp",
    "title": "Logitech-g502 (14155156681)",
    "author": "Wikimedia Commons contributor",
    "license": "CC BY 2.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
    "source": "https://commons.wikimedia.org/w/index.php?curid=80610969"
  },
  "razer-blackwidow-v4-75-mechanical-keyboard": {
    "file": "razer-blackwidow-v4-75-mechanical-keyboard.webp",
    "title": "Razer BlackWidow Ultimate 2014 Elite Mechanical Gaming Keyboard",
    "author": "Wikimedia Commons contributor",
    "license": "CC BY 2.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
    "source": "https://commons.wikimedia.org/w/index.php?curid=115353680"
  },
  "allen-solly-mens-regular-fit-oxford-shirt-sky-blue": {
    "file": "allen-solly-mens-regular-fit-oxford-shirt-sky-blue.webp",
    "title": "Modern Tailor testshirt",
    "author": "Wikimedia Commons contributor",
    "license": "CC BY-SA 2.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.0",
    "source": "https://commons.wikimedia.org/w/index.php?curid=34095177"
  },
  "ray-ban-wayfarer-classic-sunglasses-rb2140": {
    "file": "ray-ban-wayfarer-classic-sunglasses-rb2140.webp",
    "title": "Ray-Ban, New Wayfarer - 4",
    "author": "Wikimedia Commons contributor",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "source": "https://commons.wikimedia.org/w/index.php?curid=175374568"
  },
  "michael-kors-jet-set-medium-saffiano-leather-tote": {
    "file": "michael-kors-jet-set-medium-saffiano-leather-tote.webp",
    "title": "Michael Kors Jet Set Travel Shopper 30H1GTVT2L Kalbsleder schwarz (1) (16876867416)",
    "author": "Wikimedia Commons contributor",
    "license": "CC BY 2.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
    "source": "https://commons.wikimedia.org/w/index.php?curid=39515645"
  },
  "fossil-grant-chronograph-brown-leather-watch": {
    "file": "fossil-grant-chronograph-brown-leather-watch.webp",
    "title": "Fossil wristwatch with white background",
    "author": "Wikimedia Commons contributor",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "source": "https://commons.wikimedia.org/w/index.php?curid=122853727"
  },
  "titan-edge-ceramic-slim-analog-watch": {
    "file": "titan-edge-ceramic-slim-analog-watch.webp",
    "title": "TITAN watch",
    "author": "Wikimedia Commons contributor",
    "license": "CC BY-SA 3.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
    "source": "https://commons.wikimedia.org/w/index.php?curid=16902712"
  },
  "nike-air-force-1-07-mens-sneakers-white": {
    "file": "nike-air-force-1-07-mens-sneakers-white.webp",
    "title": "Nike Air Force 1's",
    "author": "Wikimedia Commons contributor",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "source": "https://commons.wikimedia.org/w/index.php?curid=101271804"
  },
  "nike-dunk-low-retro-mens-shoes-panda": {
    "file": "nike-dunk-low-retro-mens-shoes-panda.webp",
    "title": "Panda Nike Dunk",
    "author": "Wikimedia Commons contributor",
    "license": "CC0",
    "licenseUrl": "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
    "source": "https://commons.wikimedia.org/w/index.php?curid=163159808"
  },
  "adidas-ultraboost-5x-running-shoes-core-black": {
    "file": "adidas-ultraboost-5x-running-shoes-core-black.webp",
    "title": "Adidas Ultra Boost 4 running shoes",
    "author": "Wikimedia Commons contributor",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "source": "https://commons.wikimedia.org/w/index.php?curid=104663341"
  },
  "adidas-samba-og-shoes-cloud-white": {
    "file": "adidas-samba-og-shoes-cloud-white.webp",
    "title": "Adidas Samba OG",
    "author": "Wikimedia Commons contributor",
    "license": "CC0",
    "licenseUrl": "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
    "source": "https://commons.wikimedia.org/w/index.php?curid=154323550"
  },
  "puma-deviate-nitro-3-running-shoes": {
    "file": "puma-deviate-nitro-3-running-shoes.webp",
    "title": "Puma Jago Zig Zag Running Shoe",
    "author": "Wikimedia Commons contributor",
    "license": "CC BY 2.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
    "source": "https://commons.wikimedia.org/w/index.php?curid=10828951"
  },
  "puma-suede-classic-xxi-sneakers-peacoat": {
    "file": "puma-suede-classic-xxi-sneakers-peacoat.webp",
    "title": "Puma Suede",
    "author": "Wikimedia Commons contributor",
    "license": "CC0",
    "licenseUrl": "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
    "source": "https://commons.wikimedia.org/w/index.php?curid=153859371"
  },
  "asics-gel-nimbus-27-mens-running-shoes": {
    "file": "asics-gel-nimbus-27-mens-running-shoes.webp",
    "title": "My new training shoes, Asics Nimbus 9, for 2008 Nov.'s Shanghai International Marathon",
    "author": "guccio@文房具社",
    "license": "CC BY-NC 2.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-nc/2.0/",
    "source": "https://www.flickr.com/photos/11979533@N00/2398371634"
  },
  "new-balance-fresh-foam-x-1080v14-running-shoes": {
    "file": "new-balance-fresh-foam-x-1080v14-running-shoes.webp",
    "title": "New Balance Running Shoes",
    "author": "slgckgc",
    "license": "CC BY 2.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/2.0/",
    "source": "https://www.flickr.com/photos/14771153@N04/5573932055"
  },
  "crocs-classic-clog-unisex-black": {
    "file": "crocs-classic-clog-unisex-black.webp",
    "title": "Crocs-synthetic-clogs",
    "author": "Wikimedia Commons contributor",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "source": "https://commons.wikimedia.org/w/index.php?curid=92719979"
  },
  "clarks-mens-tilden-cap-leather-oxford-black": {
    "file": "clarks-mens-tilden-cap-leather-oxford-black.webp",
    "title": "Samuel Windsor oxford shoe",
    "author": "Wikimedia Commons contributor",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "source": "https://commons.wikimedia.org/w/index.php?curid=56651721"
  },
  "the-ordinary-niacinamide-10-zinc-1-serum-30-ml": {
    "file": "the-ordinary-niacinamide-10-zinc-1-serum-30-ml.webp",
    "title": "Dropper bottle, blank retro label",
    "author": "rawpixel",
    "license": "CC0",
    "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/",
    "source": "https://www.rawpixel.com/image/11515770/dropper-bottle-blank-retro-label"
  },
  "minimalist-10-vitamin-c-face-serum-30-ml": {
    "file": "minimalist-10-vitamin-c-face-serum-30-ml.webp",
    "title": "Dropper bottle, blank retro label",
    "author": "rawpixel",
    "license": "CC0",
    "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/",
    "source": "https://www.rawpixel.com/image/11515770/dropper-bottle-blank-retro-label"
  },
  "cerave-moisturising-cream-for-dry-skin-454-g": {
    "file": "cerave-moisturising-cream-for-dry-skin-454-g.webp",
    "title": "cerave facial foaming cleanser",
    "author": "theleoone00",
    "license": "Public domain",
    "licenseUrl": "https://creativecommons.org/publicdomain/mark/1.0/",
    "source": "https://www.flickr.com/photos/199532672@N05/53411227377"
  },
  "neutrogena-ultra-sheer-sunscreen-spf-50-88-ml": {
    "file": "neutrogena-ultra-sheer-sunscreen-spf-50-88-ml.webp",
    "title": "Neutrogena Sunscreen",
    "author": "JeepersMedia",
    "license": "CC BY 2.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/2.0/",
    "source": "https://www.flickr.com/photos/39160147@N03/17852308002"
  },
  "mac-matte-lipstick-ruby-woo": {
    "file": "mac-matte-lipstick-ruby-woo.webp",
    "title": "MAC pink lipstick",
    "author": "Wikimedia Commons contributor",
    "license": "CC BY-SA 3.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
    "source": "https://commons.wikimedia.org/w/index.php?curid=17303137"
  },
  "maybelline-fit-me-matte-poreless-foundation-128": {
    "file": "maybelline-fit-me-matte-poreless-foundation-128.webp",
    "title": "Fit Me Face Wash review",
    "author": "Wikimedia Commons contributor",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "source": "https://commons.wikimedia.org/w/index.php?curid=123618948"
  },
  "lakme-9to5-primer-matte-lipstick-burgundy-lane": {
    "file": "lakme-9to5-primer-matte-lipstick-burgundy-lane.webp",
    "title": "Lakme 9 to 5 Scarlet Surge Primer+Matte Lipstick MR22",
    "author": "Wikimedia Commons contributor",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "source": "https://commons.wikimedia.org/w/index.php?curid=71665482"
  },
  "davidoff-cool-water-eau-de-toilette-for-men-125-ml": {
    "file": "davidoff-cool-water-eau-de-toilette-for-men-125-ml.webp",
    "title": "Davidoff Cool Water",
    "author": "The Manic Macrographer",
    "license": "CC BY 2.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/2.0/",
    "source": "https://www.flickr.com/photos/105673978@N08/34638538514"
  },
  "calvin-klein-ck-one-eau-de-toilette-200-ml": {
    "file": "calvin-klein-ck-one-eau-de-toilette-200-ml.webp",
    "title": "ck one",
    "author": "cinz",
    "license": "CC BY 2.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/2.0/",
    "source": "https://www.flickr.com/photos/29002012@N00/3462051499"
  },
  "dyson-supersonic-nural-hair-dryer-vinca-blue-rose": {
    "file": "dyson-supersonic-nural-hair-dryer-vinca-blue-rose.webp",
    "title": "Dyson Supersonic Hair Dryer 3 2017-01-28",
    "author": "FASTILY",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/",
    "source": "https://commons.wikimedia.org/w/index.php?curid=55481104"
  },
  "philips-oneblade-pro-360-face-body-trimmer": {
    "file": "philips-oneblade-pro-360-face-body-trimmer.webp",
    "title": "2023 Philips OneBlade (1)",
    "author": "Wikimedia Commons contributor",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "source": "https://commons.wikimedia.org/w/index.php?curid=134845461"
  },
  "philips-series-7000-wet-dry-electric-shaver": {
    "file": "philips-series-7000-wet-dry-electric-shaver.webp",
    "title": "2023 Golarka Philips",
    "author": "Wikimedia Commons contributor",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "source": "https://commons.wikimedia.org/w/index.php?curid=129458046"
  },
  "ikea-tagarp-floor-uplighter-lamp-black": {
    "file": "ikea-tagarp-floor-uplighter-lamp-black.webp",
    "title": "Floor lamp 1 2016-07-06",
    "author": "Wikimedia Commons contributor",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "source": "https://commons.wikimedia.org/w/index.php?curid=49969567"
  },
  "sleepwell-ortho-pro-spring-mattress-queen-8": {
    "file": "sleepwell-ortho-pro-spring-mattress-queen-8.webp",
    "title": "Mattress in Coventry July 29 2021",
    "author": "Wikimedia Commons contributor",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "source": "https://commons.wikimedia.org/w/index.php?curid=107988961"
  },
  "milton-thermosteel-flip-lid-bottle-1-litre-set-of-2": {
    "file": "milton-thermosteel-flip-lid-bottle-1-litre-set-of-2.webp",
    "title": "Stainless Steel Water Bottle",
    "author": "Wikimedia Commons contributor",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "source": "https://commons.wikimedia.org/w/index.php?curid=182337243"
  },
  "featherlite-liberate-high-back-ergonomic-chair": {
    "file": "featherlite-liberate-high-back-ergonomic-chair.webp",
    "title": "Unwrapping my new Luxy 'Overtime' ergonomic chair",
    "author": "Rain Rabbit",
    "license": "CC BY-NC 2.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-nc/2.0/",
    "source": "https://www.flickr.com/photos/37996583811@N01/8444894441"
  },
  "ikea-lack-coffee-table-white-stained-oak": {
    "file": "ikea-lack-coffee-table-white-stained-oak.webp",
    "title": "IKEA Lack",
    "author": "Wikimedia Commons contributor",
    "license": "CC BY 2.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
    "source": "https://commons.wikimedia.org/w/index.php?curid=128866664"
  },
  "prestige-omega-deluxe-granite-3-piece-cookware-set": {
    "file": "prestige-omega-deluxe-granite-3-piece-cookware-set.webp",
    "title": "EarthPan-Hard-Anodized-Aluminum-10-Piece-Cookware-Set",
    "author": "fictures",
    "license": "CC BY 2.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/2.0/",
    "source": "https://www.flickr.com/photos/53838941@N00/13180371865"
  },
  "hawkins-contura-hard-anodised-pressure-cooker-5-l": {
    "file": "hawkins-contura-hard-anodised-pressure-cooker-5-l.webp",
    "title": "Pressure cooker - Hawkins, Contura Model - 3 litres - 4",
    "author": "Wikimedia Commons contributor",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "source": "https://commons.wikimedia.org/w/index.php?curid=110565276"
  },
  "philips-hl7756-750-w-mixer-grinder-3-jars": {
    "file": "philips-hl7756-750-w-mixer-grinder-3-jars.webp",
    "title": "A table-top mixer-grinder or mixie",
    "author": "Wikimedia Commons contributor",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "source": "https://commons.wikimedia.org/w/index.php?curid=121280357"
  },
  "kitchenaid-artisan-stand-mixer-4-8-l-empire-red": {
    "file": "kitchenaid-artisan-stand-mixer-4-8-l-empire-red.webp",
    "title": "Red KitchenAid Artisan",
    "author": "BenFrantzDale",
    "license": "CC BY-SA 2.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.0/",
    "source": "https://commons.wikimedia.org/w/index.php?curid=18166220"
  },
  "morphy-richards-electric-kettle-1-5-l-stainless-steel": {
    "file": "morphy-richards-electric-kettle-1-5-l-stainless-steel.webp",
    "title": "Electric kettle, Ribnitz-Damgarten (LRM 20200521 132413-hdr)",
    "author": "Wikimedia Commons contributor",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/deed.en",
    "source": "https://commons.wikimedia.org/w/index.php?curid=95412534"
  },
  "philips-airfryer-3000-series-xl-6-2-l": {
    "file": "philips-airfryer-3000-series-xl-6-2-l.webp",
    "title": "Airfryer Convert",
    "author": "Wikimedia Commons contributor",
    "license": "CC BY 2.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
    "source": "https://commons.wikimedia.org/w/index.php?curid=132121521"
  },
  "instant-pot-vortex-plus-6-in-1-air-fryer-5-7-l": {
    "file": "instant-pot-vortex-plus-6-in-1-air-fryer-5-7-l.webp",
    "title": "Air Fryer 2020",
    "author": "Wikimedia Commons contributor",
    "license": "CC BY 2.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
    "source": "https://commons.wikimedia.org/w/index.php?curid=132121523"
  },
  "borosil-larah-opalware-dinner-set-35-pieces": {
    "file": "borosil-larah-opalware-dinner-set-35-pieces.webp",
    "title": "Set",
    "author": "gifrancis",
    "license": "CC BY 2.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/2.0/",
    "source": "https://www.flickr.com/photos/98682907@N00/3817165257"
  },
  "nespresso-vertuo-pop-coffee-machine-liquorice-black": {
    "file": "nespresso-vertuo-pop-coffee-machine-liquorice-black.webp",
    "title": "Nespresso Vertuo Pop",
    "author": "Wikimedia Commons contributor",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "source": "https://commons.wikimedia.org/w/index.php?curid=128712628"
  },
  "lg-242-l-3-star-frost-free-double-door-refrigerator": {
    "file": "lg-242-l-3-star-frost-free-double-door-refrigerator.webp",
    "title": "LG가전, 2014 CES서 ‘고효율의 진수’ 선보인다",
    "author": "LGEPR",
    "license": "CC BY 2.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/2.0/",
    "source": "https://www.flickr.com/photos/32985045@N08/11696847884"
  },
  "lg-1-5-ton-5-star-ai-dual-inverter-split-ac": {
    "file": "lg-1-5-ton-5-star-ai-dual-inverter-split-ac.webp",
    "title": "Sanyo SAP-KRV-93EH",
    "author": "Wikimedia Commons contributor",
    "license": "CC BY-SA 3.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
    "source": "https://commons.wikimedia.org/w/index.php?curid=3342273"
  },
  "samsung-28-l-convection-microwave-oven-with-curd-making": {
    "file": "samsung-28-l-convection-microwave-oven-with-curd-making.webp",
    "title": "CombiMicroWaveOven",
    "author": "Wikimedia Commons contributor",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "source": "https://commons.wikimedia.org/w/index.php?curid=104480521"
  },
  "dyson-v15-detect-absolute-cordless-vacuum": {
    "file": "dyson-v15-detect-absolute-cordless-vacuum.webp",
    "title": "Dyson Cyclone V10 Absolute cordless stick vacuum",
    "author": "Wikimedia Commons contributor",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "source": "https://commons.wikimedia.org/w/index.php?curid=74532637"
  },
  "eureka-forbes-robo-vac-mop-with-lidar-navigation": {
    "file": "eureka-forbes-robo-vac-mop-with-lidar-navigation.webp",
    "title": "RVC3N Robotic Vacuum Cleaner \"Kreng\" on the job (8499549941)",
    "author": "Wikimedia Commons contributor",
    "license": "CC BY-SA 2.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.0",
    "source": "https://commons.wikimedia.org/w/index.php?curid=162885633"
  },
  "tata-tea-gold-premium-assam-tea-1-kg": {
    "file": "tata-tea-gold-premium-assam-tea-1-kg.webp",
    "title": "TataTea",
    "author": "Wikimedia Commons contributor",
    "license": "CC BY-SA 3.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
    "source": "https://commons.wikimedia.org/w/index.php?curid=15569545"
  },
  "nescafe-classic-instant-coffee-jar-200-g": {
    "file": "nescafe-classic-instant-coffee-jar-200-g.webp",
    "title": "Front - Nescafe Noir - 2yo instant coffee",
    "author": "avlxyz",
    "license": "CC BY-SA 2.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.0/",
    "source": "https://www.flickr.com/photos/10559879@N00/4605291784"
  },
  "fortune-sunlite-refined-sunflower-oil-5-l": {
    "file": "fortune-sunlite-refined-sunflower-oil-5-l.webp",
    "title": "Sunflower oil",
    "author": "Wikimedia Commons contributor",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "source": "https://commons.wikimedia.org/w/index.php?curid=65494670"
  },
  "kelloggs-corn-flakes-original-875-g": {
    "file": "kelloggs-corn-flakes-original-875-g.webp",
    "title": "Kellogg's Banana Corn Flakes PD 191203-1",
    "author": "Wikimedia Commons contributor",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "source": "https://commons.wikimedia.org/w/index.php?curid=119293402"
  },
  "cadbury-dairy-milk-silk-chocolate-bar-pack-of-4": {
    "file": "cadbury-dairy-milk-silk-chocolate-bar-pack-of-4.webp",
    "title": "Cadbury Dairy Milk's 'Thodi Thodi Hindi' Wrapper",
    "author": "Wikimedia Commons contributor",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "source": "https://commons.wikimedia.org/w/index.php?curid=177397760"
  },
  "boldfit-adjustable-dumbbell-set-20-kg": {
    "file": "boldfit-adjustable-dumbbell-set-20-kg.webp",
    "title": "Hantel",
    "author": "Wikimedia Commons contributor",
    "license": "Copyrighted free use",
    "licenseUrl": "",
    "source": "https://commons.wikimedia.org/w/index.php?curid=36281738"
  },
  "decathlon-domyos-500-treadmill-foldable": {
    "file": "decathlon-domyos-500-treadmill-foldable.webp",
    "title": "Treadmill from Viking Sport, side",
    "author": "Wikimedia Commons contributor",
    "license": "CC BY 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/4.0",
    "source": "https://commons.wikimedia.org/w/index.php?curid=169463611"
  },
  "lululemon-the-mat-5-mm-reversible-yoga-mat": {
    "file": "lululemon-the-mat-5-mm-reversible-yoga-mat.webp",
    "title": "Teal yoga mat",
    "author": "rawpixel",
    "license": "CC0",
    "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/",
    "source": "https://www.rawpixel.com/image/11515790/teal-yoga-mat"
  },
  "sg-sunny-tonny-english-willow-cricket-bat": {
    "file": "sg-sunny-tonny-english-willow-cricket-bat.webp",
    "title": "Cricket bat at Fenner's Field ground, Cambridge University Cricket Club, England 01",
    "author": "Wikimedia Commons contributor",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "source": "https://commons.wikimedia.org/w/index.php?curid=86876419"
  },
  "nike-premier-league-flight-football-size-5": {
    "file": "nike-premier-league-flight-football-size-5.webp",
    "title": "Nike-Maxim-ball-EPL",
    "author": "Wikimedia Commons contributor",
    "license": "CC BY-SA 3.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
    "source": "https://commons.wikimedia.org/w/index.php?curid=18139944"
  },
  "btwin-rockrider-st-100-mountain-bike-27-5": {
    "file": "btwin-rockrider-st-100-mountain-bike-27-5.webp",
    "title": "Mountain Bike 01",
    "author": "jtbradford",
    "license": "CC BY 2.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/2.0/",
    "source": "https://www.flickr.com/photos/99623414@N00/6125467033"
  },
  "fitbit-charge-6-fitness-tracker-with-google": {
    "file": "fitbit-charge-6-fitness-tracker-with-google.webp",
    "title": "Navy blue Fitbit fitness tracker",
    "author": "rawpixel",
    "license": "CC0",
    "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/",
    "source": "https://www.rawpixel.com/image/11524170/navy-blue-fitbit-fitness-tracker"
  },
  "amazon-kindle-kindle-paperwhite-16-gb-7-display": {
    "file": "amazon-kindle-kindle-paperwhite-16-gb-7-display.webp",
    "title": "Amazon Kindle Paperwhite 3",
    "author": "Wikimedia Commons contributor",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "source": "https://commons.wikimedia.org/w/index.php?curid=75916629"
  },
  "lego-technic-ferrari-sf-24-f1-car-model-kit": {
    "file": "lego-technic-ferrari-sf-24-f1-car-model-kit.webp",
    "title": "Lego Technic Red Car (42491444060)",
    "author": "Wikimedia Commons contributor",
    "license": "CC BY 2.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
    "source": "https://commons.wikimedia.org/w/index.php?curid=89184131"
  },
  "lego-classic-large-creative-brick-box-790-pieces": {
    "file": "lego-classic-large-creative-brick-box-790-pieces.webp",
    "title": "Lego Bricks Yard Sale",
    "author": "JeepersMedia",
    "license": "CC BY 2.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/2.0/",
    "source": "https://www.flickr.com/photos/39160147@N03/12722868335"
  },
  "hasbro-monopoly-classic-board-game": {
    "file": "hasbro-monopoly-classic-board-game.webp",
    "title": "Monopoly- Go Green Edition - DPLA - 03e1dfbb805a415d73e077ace9d18118 (page 10)",
    "author": "Wikimedia Commons contributor",
    "license": "CC BY 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/4.0",
    "source": "https://commons.wikimedia.org/w/index.php?curid=134201689"
  },
  "philips-avent-natural-response-baby-bottle-260-ml-pack-of-2": {
    "file": "philips-avent-natural-response-baby-bottle-260-ml-pack-of-2.webp",
    "title": "Pumped breastmilk and baby bottle",
    "author": "rawpixel",
    "license": "CC0",
    "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/",
    "source": "https://www.rawpixel.com/image/6074395/pumped-breastmilk-and-baby-bottle"
  },
  "luvlap-starshine-baby-stroller-with-reversible-handle": {
    "file": "luvlap-starshine-baby-stroller-with-reversible-handle.webp",
    "title": "Free baby stroller image",
    "author": "rawpixel",
    "license": "CC0",
    "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/",
    "source": "https://www.rawpixel.com/image/5904710/photo-image-public-domain-red-free"
  },
  "royal-enfield-mlg-open-face-helmet-gloss-white": {
    "file": "royal-enfield-mlg-open-face-helmet-gloss-white.webp",
    "title": "Open-face helmet kallerna",
    "author": "kallerna",
    "license": "CC BY-SA 3.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/",
    "source": "https://commons.wikimedia.org/w/index.php?curid=7495393"
  },
  "70mai-a510-dash-cam-3k-with-rear-camera": {
    "file": "70mai-a510-dash-cam-3k-with-rear-camera.webp",
    "title": "Видеорегистратор двухкамерный и блок питания к нему. Фото А. Щекинова",
    "author": "Wikimedia Commons contributor",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "source": "https://commons.wikimedia.org/w/index.php?curid=79829785"
  },
  "michelin-primacy-4-st-205-55-r16-tubeless-car-tyre": {
    "file": "michelin-primacy-4-st-205-55-r16-tubeless-car-tyre.webp",
    "title": "Ford Wheel with Michelin Primacy AS Tire",
    "author": "Wikimedia Commons contributor",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "source": "https://commons.wikimedia.org/w/index.php?curid=153694572"
  },
  "samsonite-proxis-55-cm-cabin-spinner-matt-graphite": {
    "file": "samsonite-proxis-55-cm-cabin-spinner-matt-graphite.webp",
    "title": "Samsonite Proxis",
    "author": "Wikimedia Commons contributor",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "source": "https://commons.wikimedia.org/w/index.php?curid=171131947"
  },
  "herschel-little-america-laptop-backpack-25-l": {
    "file": "herschel-little-america-laptop-backpack-25-l.webp",
    "title": "Herschel Supply backpacks",
    "author": "albertoziveri",
    "license": "CC BY 2.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/2.0/",
    "source": "https://www.flickr.com/photos/92167476@N03/9415914033"
  },
  "nike-brasilia-9-5-training-duffel-bag-60-l": {
    "file": "nike-brasilia-9-5-training-duffel-bag-60-l.webp",
    "title": "San Diego Comic-Con 2011 - Back to the Future II Nike footwear duffel bag (Profiles in History booth) (6039241661)",
    "author": "Wikimedia Commons contributor",
    "license": "CC BY 2.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
    "source": "https://commons.wikimedia.org/w/index.php?curid=30680074"
  },
  "apple-airtag-4-pack": {
    "file": "apple-airtag-4-pack.webp",
    "title": "Airtag - 1",
    "author": "Wikimedia Commons contributor",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "source": "https://commons.wikimedia.org/w/index.php?curid=105752636"
  },
  "levis-mens-classic-trucker-denim-jacket": {
    "file": "levis-mens-classic-trucker-denim-jacket-lifestyle.webp",
    "title": "Denim trucker jacket on model",
    "author": "Bazaar Studio",
    "license": "AI-generated illustrative image",
    "generated": true
  },
  "puma-essentials-logo-mens-cotton-t-shirt": {
    "file": "puma-essentials-logo-mens-cotton-t-shirt-lifestyle.webp",
    "title": "Cotton crew-neck T-shirt on model",
    "author": "Bazaar Studio",
    "license": "AI-generated illustrative image",
    "generated": true
  },
  "fabindia-womens-cotton-block-print-kurta": {
    "file": "fabindia-womens-cotton-block-print-kurta-lifestyle.webp",
    "title": "Block-print kurta on model",
    "author": "Bazaar Studio",
    "license": "AI-generated illustrative image",
    "generated": true
  },
  "h-m-womens-oversized-cotton-t-shirt": {
    "file": "h-m-womens-oversized-cotton-t-shirt-front.webp",
    "title": "Front view of oversized cotton T-shirt on model",
    "author": "Bazaar Studio",
    "license": "AI-generated illustrative image",
    "generated": true
  },
  "levis-511-slim-fit-mens-jeans-dark-indigo": {
    "file": "bazaar-indigo-jeans-model.webp",
    "title": "Indigo denim styling on model",
    "author": "Bazaar Studio",
    "license": "AI-generated illustrative image",
    "generated": true
  },
  "levis-womens-ribcage-straight-ankle-jeans": {
    "file": "bazaar-womens-straight-jeans-model.webp",
    "title": "Straight-leg denim styling on model",
    "author": "Bazaar Studio",
    "license": "AI-generated illustrative image",
    "generated": true
  },
  "nike-sportswear-club-mens-fleece-hoodie": {
    "file": "bazaar-olive-hoodie-model.webp",
    "title": "Olive fleece hoodie styling on model",
    "author": "Bazaar Studio",
    "license": "AI-generated illustrative image",
    "generated": true
  },
  "adidas-essentials-3-stripes-mens-track-jacket": {
    "file": "bazaar-navy-track-jacket-model.webp",
    "title": "Navy track jacket styling on model",
    "author": "Bazaar Studio",
    "license": "AI-generated illustrative image",
    "generated": true
  },
  "u-s-polo-assn-mens-slim-fit-pique-polo-t-shirt": {
    "file": "bazaar-forest-polo-model.webp",
    "title": "Forest green polo styling on model",
    "author": "Bazaar Studio",
    "license": "AI-generated illustrative image",
    "generated": true
  },
  "zara-womens-linen-blend-midi-dress": {
    "file": "bazaar-linen-midi-dress-model.webp",
    "title": "Linen midi dress styling on model",
    "author": "Bazaar Studio",
    "license": "AI-generated illustrative image",
    "generated": true
  },
  "manyavar-mens-silk-blend-kurta-set-ivory": {
    "file": "bazaar-ivory-festive-kurta-model.webp",
    "title": "Ivory festive kurta styling on model",
    "author": "Bazaar Studio",
    "license": "AI-generated illustrative image",
    "generated": true
  },
  "the-north-face-mens-1996-retro-nuptse-down-jacket": {
    "file": "bazaar-black-winter-puffer-model.webp",
    "title": "Black winter puffer styling on model",
    "author": "Bazaar Studio",
    "license": "AI-generated illustrative image",
    "generated": true
  },
  "mirada-super-soft-teddy-bear-3-feet": {
    "file": "mirada-super-soft-teddy-bear-3-feet.webp",
    "title": "Cream plush teddy bear packshot",
    "author": "Bazaar Studio",
    "license": "AI-generated illustrative product image",
    "generated": true
  },
  "spaces-hygro-cotton-210-tc-king-bedsheet-set": {
    "file": "bazaar-king-cotton-bedsheet-packshot.webp",
    "title": "Folded king cotton bedsheet set packshot",
    "author": "Bazaar Studio",
    "license": "AI-generated illustrative product image",
    "generated": true
  },
  "petsfit-orthopaedic-donut-pet-bed-large": {
    "file": "bazaar-oatmeal-orthopaedic-pet-bed-packshot.webp",
    "title": "Oatmeal orthopedic pet bed packshot",
    "author": "Bazaar Studio",
    "license": "AI-generated illustrative product image",
    "generated": true
  },
  "sony-bravia-theatre-bar-9-dolby-atmos-soundbar": {
    "file": "bazaar-matte-black-soundbar-packshot.webp",
    "title": "Matte black soundbar and subwoofer packshot",
    "author": "Bazaar Studio",
    "license": "AI-generated illustrative product image",
    "generated": true
  },
  "samsung-the-freestyle-2nd-gen-smart-projector": {
    "file": "bazaar-compact-white-projector-packshot.webp",
    "title": "Compact white projector packshot",
    "author": "Bazaar Studio",
    "license": "AI-generated illustrative product image",
    "generated": true
  },
  "clarks-oakland-lace-leather-shoe": {
    "file": "clarks-oakland-lace-leather-shoe-ai-illustration.jpg",
    "title": "AI-generated black leather lace-up shoe styling",
    "author": "Bazaar Studio",
    "license": "AI-generated illustrative product image, not verified product photography",
    "generated": true
  },
  "clarks-unstructured-un-aldric-cap": {
    "file": "clarks-unstructured-un-aldric-cap-ai-illustration.jpg",
    "title": "AI-generated black leather slip-on shoe styling",
    "author": "Bazaar Studio",
    "license": "AI-generated illustrative product image, not verified product photography",
    "generated": true
  },
  "asics-gt-2000-13": {
    "file": "asics-gt-2000-13-ai-illustration.jpg",
    "title": "AI-generated grey stability running shoe styling",
    "author": "Bazaar Studio",
    "license": "AI-generated illustrative product image, not verified product photography",
    "generated": true
  },
  "birkenstock-mayari-birko-flor-stone": {
    "file": "birkenstock-mayari-birko-flor-stone-ai-illustration.jpg",
    "title": "AI-generated taupe two-strap sandal styling",
    "author": "Bazaar Studio",
    "license": "AI-generated illustrative product image, not verified product photography",
    "generated": true
  },
  "new-balance-fresh-foam-x-880v14": {
    "file": "new-balance-fresh-foam-x-880v14-ai-illustration.jpg",
    "title": "AI-generated grey daily running shoe styling",
    "author": "Bazaar Studio",
    "license": "AI-generated illustrative product image, not verified product photography",
    "generated": true
  },
  "converse-run-star-hike-high-top": {
    "file": "converse-run-star-hike-high-top-ai-illustration.jpg",
    "title": "AI-generated black canvas platform high-top styling",
    "author": "Bazaar Studio",
    "license": "AI-generated illustrative product image, not verified product photography",
    "generated": true
  },
  "new-balance-1080v13-running-shoes": {
    "file": "new-balance-1080v13-running-shoes-ai-illustration.jpg",
    "title": "AI-generated high-cushion running shoe styling",
    "author": "Bazaar Studio",
    "license": "AI-generated illustrative product image, not verified product photography",
    "generated": true
  }
}

// Remove the vector-like generated stand-ins that were previously stored as product imagery.
// Only original photo assets and specifically generated photographic concepts are eligible.
export const productPhotos = Object.fromEntries(
  Object.entries(productPhotoRecords).filter(([, photo]) => !(photo.generated && photo.license?.includes('illustrative')))
)
productPhotos['clarks-oakland-lace-leather-shoe'] = {
  file: 'clarks-oakland-lace-leather-shoe-ai-photo.png',
  images: ['clarks-oakland-lace-leather-shoe-ai-photo-rear.png'],
  imageLabels: ['Three-quarter side view', 'Rear three-quarter view'],
  colorGalleries: {
    '#F8F7F4': ['clarks-oakland-lace-leather-shoe-ai-photo.png', 'clarks-oakland-lace-leather-shoe-ai-photo-rear.png'],
    '#191A1D': ['clarks-oakland-lace-leather-shoe-black-ai-photo.png'],
  },
  title: 'AI-generated studio concept photo of a white leather lace-up sneaker with navy accent',
  author: 'Bazaar Studio',
  license: 'AI-generated photographic concept; not a verified manufacturer product photo',
  generated: true,
}
productPhotos['clarks-unstructured-un-aldric-cap'] = {
  file: 'clarks-unstructured-un-aldric-cap-ai-photo.png',
  title: 'AI-generated studio concept photo of a black leather cap-toe slip-on dress shoe',
  author: 'Bazaar Studio',
  license: 'AI-generated photographic concept; not a verified manufacturer product photo',
  generated: true,
}
productPhotos['asics-gt-2000-13'] = {
  file: 'asics-gt-2000-13-ai-photo.png',
  title: 'AI-generated studio concept photo of a grey mesh stability running shoe with blue accents',
  author: 'Bazaar Studio',
  license: 'AI-generated photographic concept; not a verified manufacturer product photo',
  generated: true,
}
