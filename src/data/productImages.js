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
productPhotos['samsung-galaxy-s26-ultra-5g-512-gb-titanium-black'] = {
  file: 'samsung-galaxy-s26-ultra-5g-512-gb-titanium-black-ai-photo.png',
  title: 'AI-generated studio concept photo showing front and rear views of a titanium-black flagship phone',
  author: 'Bazaar Studio',
  license: 'AI-generated photographic concept; not a verified manufacturer product photo',
  generated: true,
}
productPhotos['apple-iphone-16e-128-gb-white'] = {
  file: 'apple-iphone-16e-128-gb-white-ai-photo.png',
  title: 'AI-generated studio concept photo showing front and rear views of a white compact smartphone',
  author: 'Bazaar Studio',
  license: 'AI-generated photographic concept; not a verified manufacturer product photo',
  generated: true,
}
productPhotos['apple-macbook-air-13-m4-16-gb-256-gb-sky-blue'] = {
  file: 'apple-macbook-air-13-m4-16-gb-256-gb-sky-blue-ai-photo.png',
  title: 'AI-generated studio concept photo of an open sky-blue aluminum ultrabook',
  author: 'Bazaar Studio',
  license: 'AI-generated photographic concept; not a verified manufacturer product photo',
  generated: true,
}
productPhotos['xiaomi-redmi-note-14-5g-128-gb'] = {
  file: 'xiaomi-redmi-note-14-5g-ivy-green-flipkart.jpg',
  title: 'Redmi Note 14 5G Ivy Green smartphone product image',
  author: 'Flipkart product listing',
  license: 'Product image sourced from the Flipkart listing supplied by the user for this practice project',
}

productPhotos['apple-iphone-17-128-gb-lavender'] = { file: 'flipkart-apple-iphone-17-128-gb-lavender.jpg', title: "Apple iPhone 17 (Lavender, 256 GB)", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['google-pixel-10-128-gb-indigo'] = { file: 'flipkart-google-pixel-10-128-gb-indigo.jpg', title: "Google Pixel 10 (Indigo, 256 GB)", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['oneplus-oneplus-15-5g-512-gb-sand-storm'] = { file: 'flipkart-oneplus-oneplus-15-5g-512-gb-sand-storm.jpg', title: "OnePlus 15 5G (Sand Storm, 512 GB)", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['vivo-v60-5g-256-gb-mist-gray'] = { file: 'flipkart-vivo-v60-5g-256-gb-mist-gray.jpg', title: "vivo V60 5G (Mist Gray, 256 GB)", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }



productPhotos['sony-wh-1000xm6-wireless-noise-cancelling-headphones'] = { file: 'flipkart-sony-wh-1000xm6-wireless-noise-cancelling-headphones.jpg', title: "SONY WH-1000XM6 Wireless Noise Cancellation with AI Noise Reduction Bluetooth & Wired", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['jbl-tune-770nc-wireless-over-ear-headphones'] = { file: 'flipkart-jbl-tune-770nc-wireless-over-ear-headphones.jpg', title: "JBL Tune 770NC Active Noise Cancelling, 70Hr Playtime, Fast Pair & Multi Connect Bluetooth Gaming", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['boat-airdopes-800-dolby-audio-earbuds'] = { file: 'flipkart-boat-airdopes-800-dolby-audio-earbuds.jpg', title: "boAt Airdopes 800 w/ Dolby Audio, 4 Mics AI-ENx Tech, Titanium Drivers & ASAP Charge Bluetooth", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['apple-watch-series-11-gps-46-mm-jet-black-aluminium'] = { file: 'flipkart-apple-watch-series-11-gps-46-mm-jet-black-aluminium.jpg', title: "Apple Watch Series 11 GPS + Cellular 46mm Slate Titanium Case Black Sport Band - M/L", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['sony-alpha-7-iv-full-frame-mirrorless-camera-body'] = { file: 'flipkart-sony-alpha-7-iv-full-frame-mirrorless-camera-body.jpg', title: "SONY Alpha ILCE-7M3M/BQ IN5 Mirrorless Camera Body with 28-70 mm 24.2MP,Full-Frame 4K HDR Video Record...", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['lenovo-yoga-slim-7i-core-ultra-5-16-gb-oled'] = { file: 'flipkart-lenovo-yoga-slim-7i-core-ultra-5-16-gb-oled.jpg', title: "Lenovo Yoga Slim 7 WUXGA OLED with 1Yr ADP Intel Core Ultra 9 185H - (32 GB/1 TB SSD/Windows 11 Home) ...", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['lenovo-legion-pro-5i-core-i9-rtx-5070-ti'] = { file: 'flipkart-lenovo-legion-pro-5i-core-i9-rtx-5070-ti.jpg', title: "Lenovo Legion 7 Intel Core Ultra 9 275HX - (32 GB/1 TB SSD/Windows 11 Home/8 GB Graphics/NVIDIA GeForce RTX 5070) 16IAX10 Gaming Laptop", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['oneplus-pad-3-wi-fi-256-gb-storm-blue'] = { file: 'flipkart-oneplus-pad-3-wi-fi-256-gb-storm-blue.jpg', title: "OnePlus Pad Lite 8 GB RAM 128 GB ROM 11.0 inch with Wi-Fi+4G MediaTek Helio G100 Tablet (Aero Blue)", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['sony-bravia-8-ii-55-qd-oled-google-tv'] = { file: 'flipkart-sony-bravia-8-ii-55-qd-oled-google-tv.jpg', title: "SONY BRAVIA 8 II 138.8 cm (55 inch) OLED Ultra HD (4K) Smart Google TV", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['samsung-crystal-4k-vivid-55-smart-tv'] = { file: 'flipkart-samsung-crystal-4k-vivid-55-smart-tv.jpg', title: "Samsung Crystal 4K Vision AI 138 cm (55 inch) Ultra HD (4K) LED Smart Tizen TV 2026 Edition with 30W S...", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['xiaomi-tv-a-pro-55-4k-qled-google-tv'] = { file: 'flipkart-xiaomi-tv-a-pro-55-4k-qled-google-tv.jpg', title: "XIAOMI X Pro CineMagiQLED 138 cm (55 inch) QLED Ultra HD (4K) Smart Google TV with Dolby Vision | HDR ...", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['jbl-bar-1000-mk2-7-1-4-soundbar'] = { file: 'flipkart-jbl-bar-1000-mk2-7-1-4-soundbar.jpg', title: "JBL Bar 1000 MK2 True Dolby Atmos and DTS:X, MultiBeam Surround Sound, HDMI eARC 960 W Bluetooth Soundbar", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['sony-bravia-theatre-bar-9-dolby-atmos-soundbar'] = { file: 'flipkart-sony-bravia-theatre-bar-9-dolby-atmos-soundbar.jpg', title: "SONY Bravia Bar 8 Home theatre for TV with 360 SSM and Dolby Atmos Bluetooth Soundbar", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['samsung-the-freestyle-2nd-gen-smart-projector'] = { file: 'flipkart-samsung-the-freestyle-2nd-gen-smart-projector.jpg', title: "Samsung SP-LFF3CLAXXXL (2300 lm / 1 Speaker / Wireless / Remote Controller) Portable The Freestyle 2nd Gen with HDR 10+, Wi-Fi, Premium 360 Degree Sound, All Round Design, Instant Setup, In-Built OTT Apps, Compact Smart LED Projector", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['sony-playstation-5-slim-digital-edition'] = { file: 'flipkart-sony-playstation-5-slim-digital-edition.jpg', title: "SONY PS5 Console Digital - Fortnite Bundle (Slim) 1 TB with Yes", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['nintendo-switch-2-console-with-mario-kart-world-bundle'] = { file: 'flipkart-nintendo-switch-2-console-with-mario-kart-world-bundle.jpg', title: "NINTENDO Switch 2 Gaming Console| The Ultimate 3-in-1 Gaming Powerhouse| Next Version | Play: TV, Tabletop or Handheld With 4K HDR| Built-in GameChat & Video Chat 256 GB with Joy-Con 2 with Magnetic Snap, Smart & Super Portable, Best Value for Gamers", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['ea-sports-ea-sports-fc-26-standard-edition-ps5'] = { file: 'flipkart-ea-sports-ea-sports-fc-26-standard-edition-ps5.jpg', title: "PS5 EA Sports FC 27 (Standard)", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['levis-womens-ribcage-straight-ankle-jeans'] = { file: 'flipkart-levis-womens-ribcage-straight-ankle-jeans.jpg', title: "LEVI'S Straight Fit Women Dark Blue Jeans", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['u-s-polo-assn-mens-slim-fit-pique-polo-t-shirt'] = { file: 'flipkart-u-s-polo-assn-mens-slim-fit-pique-polo-t-shirt.jpg', title: "U.S. POLO ASSN. Striped Men Polo Neck Orange T-Shirt", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['allen-solly-mens-regular-fit-oxford-shirt-sky-blue'] = { file: 'flipkart-allen-solly-mens-regular-fit-oxford-shirt-sky-blue.jpg', title: "Allen Solly Men Solid Casual Light Blue Shirt", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['nike-pegasus-42-mens-road-running-shoes'] = { file: 'flipkart-nike-pegasus-42-mens-road-running-shoes.jpg', title: "NIKE Pegasus 40 Men's Road Running Shoes Running Shoes For Men", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['puma-deviate-nitro-3-running-shoes'] = { file: 'flipkart-puma-deviate-nitro-3-running-shoes.jpg', title: "PUMA Deviate NITRO 3 HYROX Running Shoes For Women", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['asics-gel-nimbus-27-mens-running-shoes'] = { file: 'flipkart-asics-gel-nimbus-27-mens-running-shoes.jpg', title: "Asics GEL-NIMBUS 27 Running Shoes For Women", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['skechers-go-walk-7-slip-on-walking-shoes'] = { file: 'flipkart-skechers-go-walk-7-slip-on-walking-shoes.jpg', title: "Skechers GO WALK 7 Walking Shoes For Women", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['clarks-mens-tilden-cap-leather-oxford-black'] = { file: 'flipkart-clarks-mens-tilden-cap-leather-oxford-black.jpg', title: "CLARKS Clarks Hail cap Black Leather Slip On For Men", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['the-ordinary-niacinamide-10-zinc-1-serum-30-ml'] = { file: 'flipkart-the-ordinary-niacinamide-10-zinc-1-serum-30-ml.jpg', title: "TLISMI The Ordinary Niacinamide 10% + Zinc 1% serum", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['minimalist-10-vitamin-c-face-serum-30-ml'] = { file: 'flipkart-minimalist-10-vitamin-c-face-serum-30-ml.jpg', title: "Minimalist 10% Vitamin C Face Serum for Men & Women | Skin Brightening, Glow & UV Damage Repair | Stable Vitamin C Skincare", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['lakme-9to5-primer-matte-lipstick-burgundy-lane'] = { file: 'flipkart-lakme-9to5-primer-matte-lipstick-burgundy-lane.jpg', title: "Lakmé 9TO5 Primer + Matte Lip Color", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['maybelline-fit-me-matte-poreless-foundation-128'] = { file: 'flipkart-maybelline-fit-me-matte-poreless-foundation-128.jpg', title: "MAYBELLINE NEW YORK Fit Me Matte+Poreless Liquid Foundation (With Pump & SPF 22) Foundation", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['home-centre-ceramic-ribbed-table-vase-sage'] = { file: 'flipkart-home-centre-ceramic-ribbed-table-vase-sage.jpg', title: "Futur store Elegant blue straight ribbed design ceramic pot for home and office Ceramic Vase", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['sleepwell-ortho-pro-spring-mattress-queen-8'] = { file: 'flipkart-sleepwell-ortho-pro-spring-mattress-queen-8.jpg', title: "Sleepwell Orthopedic Pro, Medium Firm, Zero Partner Disturbance, Cool Yarn, Anti-Microbial 8 inch Queen Pocket Spring Mattress", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['trident-zero-twist-cotton-bath-towel-set-of-4'] = { file: 'flipkart-trident-zero-twist-cotton-bath-towel-set-of-4.jpg', title: "TRIDENT Cotton 400 GSM Bath Towel Set", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['spaces-hygro-cotton-210-tc-king-bedsheet-set'] = { file: 'flipkart-spaces-hygro-cotton-210-tc-king-bedsheet-set.jpg', title: "SPACES Cotton King Fitted (Elastic) 210 TC Solid 1 Bedsheet", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['philips-air-purifier-ac1715-with-hepa-filter'] = { file: 'flipkart-philips-air-purifier-ac1715-with-hepa-filter.jpg', title: "finehepa Replacement Filters Compatible with Philips 1000i Series AC1711/AC1715 Air Purifier Filter", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['milton-thermosteel-flip-lid-bottle-1-litre-set-of-2'] = { file: 'flipkart-milton-thermosteel-flip-lid-bottle-1-litre-set-of-2.jpg', title: "MILTON Flip lid 1000 Thermosteel Water Bottle, ISI Certified, 24 Hr Hot and Cold 1000 ml Steel Flask", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['featherlite-liberate-high-back-ergonomic-chair'] = { file: 'flipkart-featherlite-liberate-high-back-ergonomic-chair.jpg', title: "Featherlite Versa High Back Fabric Office Adjustable Arm Chair", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['prestige-omega-deluxe-granite-3-piece-cookware-set'] = { file: 'flipkart-prestige-omega-deluxe-granite-3-piece-cookware-set.jpg', title: "Prestige Omega Deluxe Granite Induction Bottom Non-Stick Coated Cookware Set", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['morphy-richards-electric-kettle-1-5-l-stainless-steel'] = { file: 'flipkart-morphy-richards-electric-kettle-1-5-l-stainless-steel.jpg', title: "Morphy Richards Hive Electric Kettle", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['borosil-larah-opalware-dinner-set-35-pieces'] = { file: 'flipkart-borosil-larah-opalware-dinner-set-35-pieces.jpg', title: "Larah by Borosil Pack of 34 Opalware Dinner Set", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['samsung-bespoke-ai-653-l-side-by-side-refrigerator'] = { file: 'flipkart-samsung-bespoke-ai-653-l-side-by-side-refrigerator.jpg', title: "Samsung 653 L Frost Free Side by Side 3 Star Refrigerator  with AI and WiFi, Convertible 5-in-1, Digit...", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['bosch-8-kg-5-star-fully-automatic-front-load'] = { file: 'flipkart-bosch-8-kg-5-star-fully-automatic-front-load.jpg', title: "BOSCH 8 kg Fully Automatic Front Load Washing Machine with In-built Heater White", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['daikin-1-5-ton-3-star-inverter-split-ac'] = { file: 'flipkart-daikin-1-5-ton-3-star-inverter-split-ac.jpg', title: "Daikin 2026 Model 1.5 Ton 3 Star Split Inverter AC", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['samsung-28-l-convection-microwave-oven-with-curd-making'] = { file: 'flipkart-samsung-28-l-convection-microwave-oven-with-curd-making.jpg', title: "Samsung 28 L Curd Making, Pre heat, Eco Mode, Power Defrost, Auto Cook Convection Microwave Oven", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['dyson-v15-detect-absolute-cordless-vacuum'] = { file: 'flipkart-dyson-v15-detect-absolute-cordless-vacuum.jpg', title: "Dyson V15 Detect Cordless Vacuum Cleaner Illumination for Hidden dust, Senses dust Levels & Auto adjus...", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['tata-tea-gold-premium-assam-tea-1-kg'] = { file: 'flipkart-tata-tea-gold-premium-assam-tea-1-kg.jpg', title: "Rungta's Real Gold Tea - 1Kg, Premium Leaf Blend | Best Exotic Assam Chai Patti | Combo Black Tea Pouch", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['india-gate-basmati-rice-classic-5-kg'] = { file: 'flipkart-india-gate-basmati-rice-classic-5-kg.jpg', title: "INDIA GATE Gold Standard Classic Basmati Rice (Polished)", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['surf-excel-matic-front-load-liquid-detergent-2-l'] = { file: 'flipkart-surf-excel-matic-front-load-liquid-detergent-2-l.jpg', title: "Surf excel Matic Front Load Fresh Liquid Detergent", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['arihant-upsc-cse-prelims-2027-30-years-solved-papers'] = { file: 'flipkart-arihant-upsc-cse-prelims-2027-30-years-solved-papers.jpg', title: "Arihant UPSC Civil Services Prelims CSAT 2027 Complete Combo (Paper II) | Aptitude Syllabus Coverage with Latest Questions & Trends, Strategy Planner, 16 Years Topicwise PYQs (2011–2026), Solved Papers, Elimination Techniques, 30+ Mock Tests, OMR Sheets, AIR Mock Test & 10 Practice Sets", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['lego-classic-large-creative-brick-box-790-pieces'] = { file: 'flipkart-lego-classic-large-creative-brick-box-790-pieces.jpg', title: "LEGO Classic Large Creative Brick Box (790 Blocks) Model Building Kit", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['hasbro-monopoly-classic-board-game'] = { file: 'flipkart-hasbro-monopoly-classic-board-game.jpg', title: "HASBRO GAMING The Classic Game of Connect 4 Strategy Board Game for Kids Strategy & War Board Game", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['skillmatics-guess-in-10-animal-planet-card-game'] = { file: 'flipkart-skillmatics-guess-in-10-animal-planet-card-game.jpg', title: "Skillmatics Card Game - Guess in 10 Cities Around The World, Educational Toys for Ages 8+", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['pampers-premium-care-pants-large-64-count'] = { file: 'flipkart-pampers-premium-care-pants-large-64-count.jpg', title: "Pampers Premium Care Pants, Large size baby diapers (LG), 44 Count Pant Diapers - L", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['philips-avent-natural-response-baby-bottle-260-ml-pack-of-2'] = { file: 'flipkart-philips-avent-natural-response-baby-bottle-260-ml-pack-of-2.jpg', title: "Philips Avent Natural Response Baby Bottle SCY903/02 | 1m+ age | BPA free | Pack of 2 - 260 ml", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['himalaya-gentle-baby-wipes-72-count-pack-of-6'] = { file: 'flipkart-himalaya-gentle-baby-wipes-72-count-pack-of-6.jpg', title: "HIMALAYA Soft & Gentle Baby Wipes - 72 Wipes (Pack of 4 - 288 wipes)", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['steelbird-sba-21-gt-full-face-helmet-matt-black'] = { file: 'flipkart-steelbird-sba-21-gt-full-face-helmet-matt-black.jpg', title: "Steelbird Air SBH-25 ISS Sharp Glossy Black Full Face ISI Certified 580mm Medium Motorsports Helmet", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['70mai-a510-dash-cam-3k-with-rear-camera'] = { file: 'flipkart-70mai-a510-dash-cam-3k-with-rear-camera.jpg', title: "70MAI A510 HDR 3K Dual DashCam,STARVIS2 IMX675 3K+FHD,ADAS,GPS Logger,MaiColor Vivid+ Dashboard Camera System", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['royal-canin-maxi-adult-dry-dog-food-4-kg'] = { file: 'flipkart-royal-canin-maxi-adult-dry-dog-food-4-kg.jpg', title: "Royal Canin Maxi 4 kg Dry Adult Dog Food", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['pedigree-adult-dry-dog-food-chicken-vegetables-10-kg'] = { file: 'flipkart-pedigree-adult-dry-dog-food-chicken-vegetables-10-kg.jpg', title: "PEDIGREE 100% Complete & Balanced Nutrition Chicken, Vegetable 10 kg Dry Adult Dog Food", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['whiskas-adult-wet-cat-food-tuna-in-jelly-12-x-85-g'] = { file: 'flipkart-whiskas-adult-wet-cat-food-tuna-in-jelly-12-x-85-g.jpg', title: "Whiskas (1+ Years) Tuna 1.12 kg (14x0.08 kg) Wet Adult Cat Food", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['samsung-galaxy-a47-5g-128-gb'] = { file: 'flipkart-samsung-galaxy-a47-5g-128-gb.jpg', title: "ASVALBUY Back Camera Lens Glass Protector for Samsung Galaxy A47 5G Samsung A47 5G", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['samsung-galaxy-s25-fe-128-gb'] = { file: 'flipkart-samsung-galaxy-s25-fe-128-gb.jpg', title: "Samsung Galaxy S25 FE 5G (Navy, 128 GB)", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['apple-iphone-15-plus-128-gb'] = { file: 'flipkart-apple-iphone-15-plus-128-gb.jpg', title: "Apple iPhone 15 Plus (Black, 128 GB)", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['apple-iphone-16-plus-256-gb'] = { file: 'flipkart-apple-iphone-16-plus-256-gb.jpg', title: "Apple iPhone 16 Plus (White, 256 GB)", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['apple-iphone-16-pro-max-512-gb'] = { file: 'flipkart-apple-iphone-16-pro-max-512-gb.jpg', title: "Apple iPhone 17 Pro Max (Silver, 512 GB)", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['apple-iphone-17-air-256-gb'] = { file: 'flipkart-apple-iphone-17-air-256-gb.jpg', title: "Apple iPhone Air (Sky Blue, 256 GB)", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['apple-iphone-17-pro-max-1-tb'] = { file: 'flipkart-apple-iphone-17-pro-max-1-tb.jpg', title: "Apple iPhone 17 Pro Max (Cosmic Orange, 1 TB)", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['apple-iphone-se-256-gb'] = { file: 'flipkart-apple-iphone-se-256-gb.jpg', title: "Apple iPhone SE (Black, 256 GB) (Includes EarPods, Power Adapter)", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['xiaomi-redmi-note-14-pro-5g-512-gb'] = { file: 'flipkart-xiaomi-redmi-note-14-pro-5g-512-gb.jpg', title: "SeriousShoppers FOR XIAOMI REDMI NOTE 14 PRO 5G FULL HOUSING BODY Full Panel", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['xiaomi-redmi-14c-5g-128-gb'] = { file: 'flipkart-xiaomi-redmi-14c-5g-128-gb.jpg', title: "FLOUNDER XIAOMI REDMI 14C 5G FULL HOUSING BODY WITH CAMERA RING LENS AND SIDE KEYS BUTTONS Full Panel", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['motorola-edge-60-fusion-256-gb'] = { file: 'flipkart-motorola-edge-60-fusion-256-gb.jpg', title: "MOTOROLA Edge 60 Fusion 5G (PANTONE Zephyr, 256 GB)", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['motorola-edge-60-neo-256-gb'] = { file: 'flipkart-motorola-edge-60-neo-256-gb.jpg', title: "Motorola Edge 40 Neo (Soothing Sea, 256 GB)", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['motorola-edge-60-stylus-256-gb'] = { file: 'flipkart-motorola-edge-60-stylus-256-gb.jpg', title: "MOTOROLA Edge 60 Stylus (PANTONE Gibraltar Sea, 256 GB)", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['motorola-moto-g86-power-5g-256-gb'] = { file: 'flipkart-motorola-moto-g86-power-5g-256-gb.jpg', title: "MOTOROLA G86 Power 5G (Pantone Cosmic Sky, 128 GB)", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['motorola-moto-g96-5g-256-gb'] = { file: 'flipkart-motorola-moto-g96-5g-256-gb.jpg', title: "FLOUNDER MOTOROLA MOTO G96 ( 5g ) ORIGINAL LCD MIDDLE FRAME WITH PROPER LOGO Front Panel", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['vivo-t4-ultra-5g-256-gb'] = { file: 'flipkart-vivo-t4-ultra-5g-256-gb.jpg', title: "vivo T4 Ultra 5G (Phoenix Gold, 256 GB)", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['vivo-y400-pro-5g-256-gb'] = { file: 'flipkart-vivo-y400-pro-5g-256-gb.jpg', title: "vivo Y400 Pro 5G (Freestyle White, 256 GB)", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['oppo-reno14-pro-5g-512-gb'] = { file: 'flipkart-oppo-reno14-pro-5g-512-gb.jpg', title: "OPPO Reno14 Pro 5G (Pearl White, 512 GB)", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['oppo-reno14-5g-256-gb'] = { file: 'flipkart-oppo-reno14-5g-256-gb.jpg', title: "OPPO Reno14 5G (Diwali Gold Edition, 256 GB)", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['oppo-find-x8-5g-512-gb'] = { file: 'flipkart-oppo-find-x8-5g-512-gb.jpg', title: "OPPO Find X8 5G (Space Black, 512 GB)", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['oppo-a5-pro-5g-256-gb'] = { file: 'flipkart-oppo-a5-pro-5g-256-gb.jpg', title: "OPPO A5 Pro 5G (Mocha Brown, 256 GB)", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['realme-14-pro-5g-512-gb'] = { file: 'flipkart-realme-14-pro-5g-512-gb.jpg', title: "realme 13 Pro+ 5G (Monet Purple, 512 GB)", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['realme-narzo-80-pro-5g-256-gb'] = { file: 'flipkart-realme-narzo-80-pro-5g-256-gb.jpg', title: "realme Narzo 80 Pro 5G (Speed Silver, 256 GB)", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['realme-p3-ultra-5g-256-gb'] = { file: 'flipkart-realme-p3-ultra-5g-256-gb.jpg', title: "realme P3 Ultra 5G (Glowing Lunar White, 256 GB)", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['oneplus-oneplus-13r-256-gb'] = { file: 'flipkart-oneplus-oneplus-13r-256-gb.jpg', title: "OnePlus 13R 5G (Nebula Noir, 256 GB)", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['oneplus-nord-ce5-5g-256-gb'] = { file: 'flipkart-oneplus-nord-ce5-5g-256-gb.jpg', title: "OnePlus Nord CE5 5G (Nexus Blue, 256 GB)", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['google-pixel-9a-256-gb'] = { file: 'flipkart-google-pixel-9a-256-gb.jpg', title: "Google Pixel 11 (Frost, 256 GB)", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['google-pixel-9-pro-xl-512-gb'] = { file: 'flipkart-google-pixel-9-pro-xl-512-gb.jpg', title: "Google Pixel 11 Pro XL (Obsidian, 512 GB)", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['google-pixel-9-pro-fold-256-gb'] = { file: 'flipkart-google-pixel-9-pro-fold-256-gb.jpg', title: "MoreFit Front and Back Screen Guard for Google Pixel 9 Pro Fold", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['samsung-galaxy-z-fold6-512-gb'] = { file: 'flipkart-samsung-galaxy-z-fold6-512-gb.jpg', title: "Samsung Galaxy Z Fold6 5G (Navy, 512 GB)", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['samsung-galaxy-z-flip6-512-gb'] = { file: 'flipkart-samsung-galaxy-z-flip6-512-gb.jpg', title: "Samsung Galaxy Z Flip6 5G (Silver Shadow, 512 GB)", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['nothing-phone-3a-pro-256-gb'] = { file: 'flipkart-nothing-phone-3a-pro-256-gb.jpg', title: "Nothing Phone (4a) Pro (Black, 256 GB)", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['nothing-phone-3a-256-gb'] = { file: 'flipkart-nothing-phone-3a-256-gb.jpg', title: "Nothing Phone (3) (Black, 256 GB)", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['samsung-galaxy-z-fold-special-edition-512-gb'] = { file: 'flipkart-samsung-galaxy-z-fold-special-edition-512-gb.jpg', title: "Samsung Galaxy Z Fold5 (Icy Blue, 512 GB)", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['sony-wh-ch720n-wireless-anc-headphones'] = { file: 'flipkart-sony-wh-ch720n-wireless-anc-headphones.jpg', title: "SONY WH-CH720N Wireless Noise Cancellation with Lightweight Design Bluetooth", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['sony-wh-1000xm5-wireless-headphones'] = { file: 'flipkart-sony-wh-1000xm5-wireless-headphones.jpg', title: "SONY WH-1000XM5 Wireless Noise Cancellation with AI Noise Reduction Bluetooth", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['bose-quietcomfort-headphones'] = { file: 'flipkart-bose-quietcomfort-headphones.jpg', title: "Bose QuietComfort II, Wireless,in-Ear Headphones with Personalized Noise Cancellation Bluetooth", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['bose-quietcomfort-ultra-earbuds-2nd-gen'] = { file: 'flipkart-bose-quietcomfort-ultra-earbuds-2nd-gen.jpg', title: "Bose QuietComfort Ultra Bluetooth Earbuds (2nd Gen) Bluetooth", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['jbl-live-770nc-wireless-headphones'] = { file: 'flipkart-jbl-live-770nc-wireless-headphones.jpg', title: "JBL Live 770NC with ANC, 65Hr Playtime,Speed-charge,BT 5.3 (LE Audio), Personify 2.0 Bluetooth Gaming", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['sennheiser-momentum-4-wireless'] = { file: 'flipkart-sennheiser-momentum-4-wireless.jpg', title: "Sennheiser Momentum 4 Wireless Over Ear Headphones Designed in Germany with 60 Hr Battery Bluetooth", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['sennheiser-accentum-plus-wireless'] = { file: 'flipkart-sennheiser-accentum-plus-wireless.jpg', title: "Sennheiser Accentum Plus Wireless Over Ear Headphones Designed in Germany with 50Hr Battery Bluetooth", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['apple-airpods-4-with-active-noise-cancellation'] = { file: 'flipkart-apple-airpods-4-with-active-noise-cancellation.jpg', title: "Apple AirPods 4 Wireless Earbuds with Active Noise Cancellation, Adaptive Audio Bluetooth", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['boat-airdopes-311-pro'] = { file: 'flipkart-boat-airdopes-311-pro.jpg', title: "boAt Airdopes 311 Pro w/ 50 HRS Playback, ASAP Charge & Dual Mics ENx Technology Bluetooth", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['boat-nirvana-ion-anc'] = { file: 'flipkart-boat-nirvana-ion-anc.jpg', title: "boAt Nirvana ION ANC Pro w/ Hi-Res Audio with LDAC, ANC, 120 HRS Playback, MultiPoint Bluetooth", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['boat-nirvana-space'] = { file: 'flipkart-boat-nirvana-space.jpg', title: "boAt Nirvana Space w/ 360 Spatial Audio, ANC(~32dB), 100HRS Battery & Dual Pairing Bluetooth", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['nothing-cmf-buds-pro-2'] = { file: 'flipkart-nothing-cmf-buds-pro-2.jpg', title: "CMF by Nothing Buds Pro 2 with 50 dB ANC| Hi-Res + LDAC| Smart Dial| Spatial Audio|Dual Drivers Bluetooth", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['oneplus-buds-pro-3'] = { file: 'flipkart-oneplus-buds-pro-3.jpg', title: "OnePlus Buds Pro 3 - Midnight Opus Bluetooth", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['oneplus-buds-3-pro'] = { file: 'flipkart-oneplus-buds-3-pro.jpg', title: "OnePlus Buds Pro 3 True Wireless In-Ear Buds Bluetooth", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['oneplus-buds-nord-3'] = { file: 'flipkart-oneplus-buds-nord-3.jpg', title: "OnePlus Nord Buds 3r TWS Earbud, 10min charge for 8hr Music, 3D Audio, 2-mic call Bluetooth", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['jbl-flip-7-portable-speaker'] = { file: 'flipkart-jbl-flip-7-portable-speaker.jpg', title: "JBL Flip 5 with 12Hr Playtime, IPX7 Waterproof, Partyboost Portable 20 W Bluetooth Speaker", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['bose-soundlink-flex-2nd-gen'] = { file: 'flipkart-bose-soundlink-flex-2nd-gen.jpg', title: "Bose New SoundLink Flex Portable (2nd Gen), Portable Outdoor with Hi-Fi Audio Bluetooth Speaker", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['jbl-clip-5-portable-speaker'] = { file: 'flipkart-jbl-clip-5-portable-speaker.jpg', title: "JBL Clip 5 with 12hrs of Playtime,Pro Sound, Integrated Carabiner,Dust & Waterproof 7 W Bluetooth Speaker", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['bose-soundlink-max-portable-speaker'] = { file: 'flipkart-bose-soundlink-max-portable-speaker.jpg', title: "Bose New SoundLink Max Portable , Large Waterproof Up to 20 Hours of Battery Life Bluetooth Speaker", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['bose-soundlink-micro-2nd-gen'] = { file: 'flipkart-bose-soundlink-micro-2nd-gen.jpg', title: "Bose New SoundLink Flex Portable (2nd Gen), Portable Outdoor with Hi-Fi Audio Bluetooth Speaker", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['marshall-emberton-iii'] = { file: 'flipkart-marshall-emberton-iii.jpg', title: "Marshall Emberton III Portable 32+Hour Playtime, 360-degree Sound, Waterproof 20 W Bluetooth Speaker", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['garmin-instinct-3-amoled-45-mm'] = { file: 'flipkart-garmin-instinct-3-amoled-45-mm.jpg', title: "GARMIN Instinct 3,45Mm,Amoled,Neo Tropic Bezel W/Neo Tropic Band,(A04883) Smartwatch", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['canon-eos-r10-mirrorless-camera'] = { file: 'flipkart-canon-eos-r10-mirrorless-camera.jpg', title: "Canon EOS R10 Mirrorless Camera Body with RF-S 18 - 150 mm f/3.5 - 6.3 IS STM Lens Kit", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['canon-eos-r50-v-creator-camera'] = { file: 'flipkart-canon-eos-r50-v-creator-camera.jpg', title: "Canon EOS R50 Mirrorless Camera RF - S 18 - 45 mm f/4.5 - 6.3 IS STM and RF - S 55 - 210 mm f/5 - 7.1 ...", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['dji-osmo-action-5-pro'] = { file: 'flipkart-dji-osmo-action-5-pro.jpg', title: "dji Osmo Action 5 Pro Standard Combo Sports and Action Camera", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['dji-osmo-action-4-adventure-combo'] = { file: 'flipkart-dji-osmo-action-4-adventure-combo.jpg', title: "dji Osmo Action 4 Adventure Combo Sports and Action Camera", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['apple-macbook-air-13-inch-m3-16-gb-512-gb'] = { file: 'flipkart-apple-macbook-air-13-inch-m3-16-gb-512-gb.jpg', title: "Apple MacBook Air M3 - (8 GB/512 GB SSD/macOS Sonoma) MRXW3HN/A", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['dji-osmo-pocket-3-creator-combo'] = { file: 'flipkart-dji-osmo-pocket-3-creator-combo.jpg', title: "dji OSMO Osmo Pocket 3 Creator Combo Sports and Action Camera", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['apple-macbook-air-15-inch-m3-16-gb-512-gb'] = { file: 'flipkart-apple-macbook-air-15-inch-m3-16-gb-512-gb.jpg', title: "Apple MacBook Air (M5, 2026) M5 - (16 GB/512 GB SSD/Tahoe) MDHE4HN/A", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['apple-macbook-air-13-inch-m2-16-gb-256-gb'] = { file: 'flipkart-apple-macbook-air-13-inch-m2-16-gb-256-gb.jpg', title: "Apple 2020 Macbook Air M1 - (16 GB/256 GB SSD/Mac OS Big Sur) MGN63HN/A", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['apple-macbook-pro-14-inch-m4-pro-24-gb'] = { file: 'flipkart-apple-macbook-pro-14-inch-m4-pro-24-gb.jpg', title: "Apple MacBook Pro M5 - (24 GB/1 TB SSD/macOS Tahoe) MDE64HN/A|MDE64HN/A", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['asus-zenbook-s-14-ux5406'] = { file: 'flipkart-asus-zenbook-s-14-ux5406.jpg', title: "TakshoraTech Screen Guard with Applicator Kit for Asus ZenBook S14 UX5406 (14 inch)", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['asus-expertbook-b9-oled'] = { file: 'flipkart-asus-expertbook-b9-oled.jpg', title: "ASUS ExpertBook Ultra Full Metal Nano Ceramic Coating, OLED with Touchscreen Copilot Intel Core Ultra ...", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['lenovo-thinkpad-e14-gen-6'] = { file: 'flipkart-lenovo-thinkpad-e14-gen-6.jpg', title: "Lenovo Thinkpad E14 G5 Intel Core i5 13th Gen 1335U - (16 GB/512 GB SSD/Windows 11 Pro) E14 Business L...", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['lenovo-thinkbook-14-gen-7'] = { file: 'flipkart-lenovo-thinkbook-14-gen-7.jpg', title: "Evoshield Screen Guard with Applicator Kit for Lenovo ThinkBook Plus Gen 7 Auto Twist (14 inch)", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['lenovo-thinkpad-t14-gen-5'] = { file: 'flipkart-lenovo-thinkpad-t14-gen-5.jpg', title: "SOLUTIONS-365 COMPATIBLE L21C3PD4 BATTERY FOR LENOVO THINKPAD T14 GEN 2 SERIES 4 Cell Laptop Battery", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['lenovo-thinkpad-x1-carbon-gen-12'] = { file: 'flipkart-lenovo-thinkpad-x1-carbon-gen-12.jpg', title: "Lenovo 00HW003 LAPTOP BATTERY FOR ThinkPad X1 Carbon2, X1 Carbon Gen 2 14 20A8, ThinkPad X1 Carbon 14 ...", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['dell-latitude-5450'] = { file: 'flipkart-dell-latitude-5450.jpg', title: "HexaGear Screen Guard for Screen Guard for Dell Latitude 5450 – Anti-Glare Screen Protection", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['dell-latitude-7350'] = { file: 'flipkart-dell-latitude-7350.jpg', title: "DELL CHARGER FOR LATITUDE 7350 4.5-3.0MM SMALL PIN 65 W Adapter", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['acer-predator-helios-neo-16'] = { file: 'flipkart-acer-predator-helios-neo-16.jpg', title: "Acer AP21A8T AP21A7T AP21A5T Original Laptop Battery for Predator Helios 300, Helios 16, Helios 18, Ni...", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['asus-rog-strix-g16'] = { file: 'flipkart-asus-rog-strix-g16.jpg', title: "ASUS ROG Strix G16 (2026) Intel Core i7 14th Gen 14650HX - (16 GB/1 TB SSD/Windows 11 Home/8 GB Graphi...", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['asus-rog-zephyrus-g16'] = { file: 'flipkart-asus-rog-zephyrus-g16.jpg', title: "ASUS ROG Zephyrus G16 OLED (2026) Intel Core Ultra 9 386H - (32 GB/2 TB SSD/Windows 11 Home/16 GB Grap...", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['asus-tuf-gaming-a15'] = { file: 'flipkart-asus-tuf-gaming-a15.jpg', title: "ASUS TUF Gaming A15 AMD Ryzen 7 Octa Core 7435HS - (16 GB/512 GB SSD/Windows 11 Home/4 GB Graphics/NVI...", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['asus-rog-flow-z13'] = { file: 'flipkart-asus-rog-flow-z13.jpg', title: "ASUS ROG Flow Z13 (2025) for Creator with Touch Screen, MSO 2024 + M365 Basic ,AI PC AMD Ryzen AI Max ...", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['samsung-galaxy-tab-s10-256-gb'] = { file: 'flipkart-samsung-galaxy-tab-s10-256-gb.jpg', title: "Samsung Galaxy Tab S10 FE+ With S Pen 8 GB RAM 128 GB ROM 13.1 inch with Wi-Fi Only Gaming Exynos 1580...", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['samsung-galaxy-tab-s10-ultra-512-gb'] = { file: 'flipkart-samsung-galaxy-tab-s10-ultra-512-gb.jpg', title: "Samsung Galaxy Tab S10 FE+ With S Pen 8 GB RAM 128 GB ROM 13.1 inch with Wi-Fi Only Gaming Exynos 1580...", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['samsung-galaxy-tab-s10-fe-256-gb'] = { file: 'flipkart-samsung-galaxy-tab-s10-fe-256-gb.jpg', title: "Samsung Galaxy Tab S10+ With S Pen 12 GB RAM 256 GB ROM 12.4 inch with Wi-Fi Only Gaming MediaTek Dime...", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['microsoft-surface-laptop-7-13-8-inch'] = { file: 'flipkart-microsoft-surface-laptop-7-13-8-inch.jpg', title: "MICROSOFT Surface Laptop 15 Inch Snapdragon X2 Elite - (32 GB/1 TB SSD/Windows 11 Home) EP2-60280 Lapt...", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['microsoft-surface-pro-11-13-inch-oled'] = { file: 'flipkart-microsoft-surface-pro-11-13-inch-oled.jpg', title: "MICROSOFT Surface Pro 13 Inch Snapdragon X2 Plus - (16 GB/256 GB SSD/Windows 11 Home) EP2-73230 2 in 1...", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['microsoft-surface-laptop-go-3'] = { file: 'flipkart-microsoft-surface-laptop-go-3.jpg', title: "MICROSOFT Surface Laptop 13\" with Microsoft 365 for 6 Months* Snapdragon X Plus - (16 GB/256 GB SSD/Wi...", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['sony-bravia-8-55-inch-oled'] = { file: 'flipkart-sony-bravia-8-55-inch-oled.jpg', title: "SONY Bravia 3 138.8 cm (55 inch) Ultra HD (4K) LED Smart Google TV with Dolby Vision| Dolby Atmos | Fe...", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['sony-bravia-8-65-inch-oled'] = { file: 'flipkart-sony-bravia-8-65-inch-oled.jpg', title: "SONY BRAVIA 8 II 163.9 cm (65 inch) OLED Ultra HD (4K) Smart Google TV", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['samsung-the-serif-65-inch-qled'] = { file: 'flipkart-samsung-the-serif-65-inch-qled.jpg', title: "Samsung The Frame 165.1 cm (65 inch) QLED Ultra HD (4K) Smart Tizen TV with 2024 Model", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['tcl-c655-pro-55-inch-qled'] = { file: 'flipkart-tcl-c655-pro-55-inch-qled.jpg', title: "TCL C655 139 cm (55 inch) QLED Ultra HD (4K) Smart Google TV with T-SCREEN |Dolby Vision-Atmos | Hands...", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['tcl-c655-pro-65-inch-qled'] = { file: 'flipkart-tcl-c655-pro-65-inch-qled.jpg', title: "TCL C655 164 cm (65 inch) QLED Ultra HD (4K) Smart Google TV with T-SCREEN |Dolby Vision-Atmos | Hands...", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['xiaomi-x-pro-qled-43-inch'] = { file: 'flipkart-xiaomi-x-pro-qled-43-inch.jpg', title: "XIAOMI X Pro CineMagiQLED 108 cm (43 inch) QLED Ultra HD (4K) Smart Google TV with Dolby Vision | HDR ...", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['xiaomi-x-pro-qled-55-inch'] = { file: 'flipkart-xiaomi-x-pro-qled-55-inch.jpg', title: "XIAOMI X Pro Series 189.3 cm (75 inch) QLED Ultra HD (4K) Smart Google TV 2026 Edition with MaxView Di...", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['xiaomi-fx-pro-55-inch-4k-led'] = { file: 'flipkart-xiaomi-fx-pro-55-inch-4k-led.jpg', title: "XIAOMI S Series 138.68 cm (55 inch) Ultra HD (4K) Mini LED Smart Google TV 2026 Edition with Flagship ...", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['xiaomi-max-65-inch-4k-qled'] = { file: 'flipkart-xiaomi-max-65-inch-4k-qled.jpg', title: "XIAOMI FX Series 165.1 cm (65 inch) Ultra HD (4K) Mini LED Smart Fire TV 2026 Edition with QLED TECHNO...", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['sonos-arc-ultra-soundbar'] = { file: 'flipkart-sonos-arc-ultra-soundbar.jpg', title: "Sonos ARC ULTRA S45 120 W Bluetooth Soundbar", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['sonos-beam-gen-2-soundbar'] = { file: 'flipkart-sonos-beam-gen-2-soundbar.jpg', title: "Sonos Beam 2 Wireless Dolby Atmos, Wi-Fi Connect 250 W Bluetooth Soundbar", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['sonos-ray-compact-soundbar'] = { file: 'flipkart-sonos-ray-compact-soundbar.jpg', title: "Sonos Ray Essential , for TV, Music and Video Games Soundbar", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['sony-playstation-5-slim-disc-edition-1-tb'] = { file: 'flipkart-sony-playstation-5-slim-disc-edition-1-tb.jpg', title: "Playstation Sony PS5 Pro 2TB SSD Gaming Console Play Station 5–The Ultimate Built True Gamer Visual Internal Storage (Ultra-Fast) 2000 GB with Dynamic Haptic Feedback, Digital Edition, Trusted by ps 5 sony, ps5 slim Fans", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['sony-playstation-portal-remote-player'] = { file: 'flipkart-sony-playstation-portal-remote-player.jpg', title: "SONY Brand New Latest PlayStation Portal Remote Player for PS5 White GB", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['nintendo-switch-oled-white-set'] = { file: 'flipkart-nintendo-switch-oled-white-set.jpg', title: "NINTENDO Switch OLED Console with White Joy Con 64 GB", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['nintendo-switch-oled-neon-set'] = { file: 'flipkart-nintendo-switch-oled-neon-set.jpg', title: "Neon White Nintendo Switch Games CD | Lightning-Fast First-Person Action Platformer with Demon Exterminating Gameplay | Speedrunning & Movement Ability Challenges | nintendo games switch for Action Platformer Fans", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['sony-dualsense-edge-wireless-controller'] = { file: 'flipkart-sony-dualsense-edge-wireless-controller.jpg', title: "Sony PS5 DualSense Wireless Controller", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['microsoft-xbox-elite-wireless-controller-series-2'] = { file: 'flipkart-microsoft-xbox-elite-wireless-controller-series-2.jpg', title: "MICROSOFT XBOX S/X Wireless Controller Bluetooth Gamepad", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['microsoft-xbox-adaptive-controller'] = { file: 'flipkart-microsoft-xbox-adaptive-controller.jpg', title: "GSH Xbox 360 Wired Controller Gamepad For PC and Microsoft Xbox 360  Motion Controller", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['logitech-g-g502-x-plus-wireless-mouse'] = { file: 'flipkart-logitech-g-g502-x-plus-wireless-mouse.jpg', title: "Logitech G502 Hero / Hero 25K Sensor, Adj DPI Upto 25600, RGB, 11 Programmable Buttons Wired Ambidextrous Optical  Gaming Mouse 25K Sensor, Adj DPI Upto 25600, RGB, 11 Programmable Buttons", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['logitech-g-g-pro-x-superlight-2-dex'] = { file: 'flipkart-logitech-g-g-pro-x-superlight-2-dex.jpg', title: "Logitech G Pro X Superlight 2 Ambidextrous Optical  Gaming Mouse", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['logitech-g-g309-lightspeed-wireless-mouse'] = { file: 'flipkart-logitech-g-g309-lightspeed-wireless-mouse.jpg', title: "Logitech G309 Wireless Ambidextrous Optical  Gaming Mouse", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['logitech-g-g203-lightsync-mouse'] = { file: 'flipkart-logitech-g-g203-lightsync-mouse.jpg', title: "Logitech G203 LIGHTSYNC RGB 6 Button Wired Ambidextrous Optical  Gaming Mouse", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['razer-blackwidow-v4-pro-mechanical-keyboard'] = { file: 'flipkart-razer-blackwidow-v4-pro-mechanical-keyboard.jpg', title: "Razer BlackWidow V3 Mini HyperSpeed - 65% Wireless Mechanical (Yellow Switch) RZ03-03890100-R3M1 Wireless Standard Gaming Keyboard Compatible with Desktop, Laptop, Mac", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['wrogn-mens-colourblock-polo-t-shirt'] = { file: 'flipkart-wrogn-mens-colourblock-polo-t-shirt.jpg', title: "WROGN Solid Men Polo Neck White T-Shirt", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['wrogn-mens-printed-resort-shirt'] = { file: 'flipkart-wrogn-mens-printed-resort-shirt.jpg', title: "WROGN Men Printed Casual White, Light Blue Shirt", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['jack-jones-mens-glenn-slim-fit-jeans'] = { file: 'flipkart-jack-jones-mens-glenn-slim-fit-jeans.jpg', title: "JACK & JONES Slim Men Blue Jeans", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['jack-jones-mens-mike-original-straight-jeans'] = { file: 'flipkart-jack-jones-mens-mike-original-straight-jeans.jpg', title: "JACK & JONES Straight Fit Men Dark Blue Jeans", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['the-souled-store-mens-graphic-fleece-sweatshirt'] = { file: 'flipkart-the-souled-store-mens-graphic-fleece-sweatshirt.jpg', title: "The Souled Store Full Sleeve Graphic Print Men Sweatshirt", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['biba-womens-printed-straight-kurta'] = { file: 'flipkart-biba-womens-printed-straight-kurta.jpg', title: "BIBA Women Printed Straight Kurta", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['biba-womens-floral-midi-dress'] = { file: 'flipkart-biba-womens-floral-midi-dress.jpg', title: "BIBA Women Fit and Flare Yellow Midi/Calf Length Dress", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['only-womens-high-rise-straight-jeans'] = { file: 'flipkart-only-womens-high-rise-straight-jeans.jpg', title: "ONLY Straight Fit Women Blue Jeans", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['manyavar-mens-jacquard-festive-kurta-set'] = { file: 'flipkart-manyavar-mens-jacquard-festive-kurta-set.jpg', title: "MANYAVAR Men Kurta Churidar Set", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['manyavar-mens-printed-silk-kurta-set'] = { file: 'flipkart-manyavar-mens-printed-silk-kurta-set.jpg', title: "MANYAVAR Men Kurta Churidar Set", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['aurelia-womens-cotton-straight-kurta'] = { file: 'flipkart-aurelia-womens-cotton-straight-kurta.jpg', title: "Aurelia Women Striped Straight Kurta", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['aurelia-womens-printed-kurta-pant-set'] = { file: 'flipkart-aurelia-womens-printed-kurta-pant-set.jpg', title: "The Aure Collection by aurelia Women Kurta Pant Set", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['allen-solly-mens-textured-formal-shirt'] = { file: 'flipkart-allen-solly-mens-textured-formal-shirt.jpg', title: "Allen Solly Men Printed Formal Blue Shirt", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['allen-solly-mens-regular-fit-chinos'] = { file: 'flipkart-allen-solly-mens-regular-fit-chinos.jpg', title: "Allen Solly Regular Fit Men Grey Trousers", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['allen-solly-mens-slim-fit-printed-shirt'] = { file: 'flipkart-allen-solly-mens-slim-fit-printed-shirt.jpg', title: "Allen Solly Men Printed Casual Blue Shirt", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['allen-solly-mens-cotton-linen-casual-shirt'] = { file: 'flipkart-allen-solly-mens-cotton-linen-casual-shirt.jpg', title: "Allen Solly Men Solid Casual Beige Shirt", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['asics-gel-kayano-31'] = { file: 'flipkart-asics-gel-kayano-31.jpg', title: "Asics GEL-KAYANO 32 Running Shoes For Unisex", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['new-balance-arishi-v4-running-shoes'] = { file: 'flipkart-new-balance-arishi-v4-running-shoes.jpg', title: "New Balance ARISHI Running Shoes For Men", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['skechers-go-run-consistent-2-0'] = { file: 'flipkart-skechers-go-run-consistent-2-0.jpg', title: "Skechers GO RUN CONSISTENT Outdoors For Men", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['skechers-go-run-supersonic-max'] = { file: 'flipkart-skechers-go-run-supersonic-max.jpg', title: "Skechers GO RUN SUPERSONIC Running Shoes For Men", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['skechers-go-run-elevate'] = { file: 'flipkart-skechers-go-run-elevate.jpg', title: "Skechers GO RUN ELEVATE Running Shoes For Women", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['converse-chuck-taylor-all-star-lift-platform'] = { file: 'flipkart-converse-chuck-taylor-all-star-lift-platform.jpg', title: "Converse Chuck Taylor All Star Lift Platform Mini Studs Low Top Canvas Casuals For Women", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['converse-run-star-hike-high-top'] = { file: 'flipkart-converse-run-star-hike-high-top.jpg', title: "Converse Chuck Taylor All Star Madison Mid Top Canvas Sneakers For Women", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['adidas-grand-court-2-0'] = { file: 'flipkart-adidas-grand-court-2-0.jpg', title: "ADIDAS GRAND COURT BASE 2.0 Sneakers For Men", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['puma-velocity-nitro-3'] = { file: 'flipkart-puma-velocity-nitro-3.jpg', title: "PUMA Velocity Nitro 2 Run 75 Running Shoes For Men", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['puma-deviate-nitro-elite-3'] = { file: 'flipkart-puma-deviate-nitro-elite-3.jpg', title: "PUMA Deviate NITRO Elite 4 HYROX Running Shoes For Men", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['puma-fast-r-nitro-elite-2'] = { file: 'flipkart-puma-fast-r-nitro-elite-2.jpg', title: "PUMA Deviate NITRO Elite 4 Running Shoes For Men", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['puma-electrify-nitro-3'] = { file: 'flipkart-puma-electrify-nitro-3.jpg', title: "PUMA Electrify Nitro Turn Running Shoes For Women", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['minimalist-alpha-arbutin-2-face-serum-30-ml'] = { file: 'flipkart-minimalist-alpha-arbutin-2-face-serum-30-ml.jpg', title: "Minimalist 2% Alpha Arbutin Face Serum for Men & Women | Anti-Pigmentation", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['minimalist-vitamin-c-10-face-serum-30-ml'] = { file: 'flipkart-minimalist-vitamin-c-10-face-serum-30-ml.jpg', title: "Minimalist 10% Vitamin C Face Serum for Men & Women | Skin Brightening, Glow & UV Damage Repair | Stable Vitamin C Skincare", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['minimalist-retinol-0-3-face-serum-30-ml'] = { file: 'flipkart-minimalist-retinol-0-3-face-serum-30-ml.jpg', title: "Minimalist 0.3% Retinol Face Serum| Anti Aging, Fine Lines & Wrinkles", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['minimalist-salicylic-acid-2-face-serum-30-ml'] = { file: 'flipkart-minimalist-salicylic-acid-2-face-serum-30-ml.jpg', title: "Minimalist 2% Salicylic Acid Face Serum for Men & Women | Acne, Blackheads & Open Pores Skincare", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['minimalist-multi-peptide-serum-30-ml'] = { file: 'flipkart-minimalist-multi-peptide-serum-30-ml.jpg', title: "Minimalist Multi Peptide Anti Aging Night Serum for Collagen Boosting", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['la-roche-posay-cicaplast-baume-b5-40-ml'] = { file: 'flipkart-la-roche-posay-cicaplast-baume-b5-40-ml.jpg', title: "La Roche Posay Cicaplast Baume B5+ Multi-Repair Balm | Skin Barrier Support Moisturizer", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['la-roche-posay-effaclar-duo-m-40-ml'] = { file: 'flipkart-la-roche-posay-effaclar-duo-m-40-ml.jpg', title: "LA ROCHE-POSAY EFFACLAR DUO + M TRIPPLE CORRECTION", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['minimalist-spf-50-sunscreen-50-g'] = { file: 'flipkart-minimalist-spf-50-sunscreen-50-g.jpg', title: "Minimalist Sunscreen - SPF 50 PA++++ SPF 50 PA++++ Sunscreen for Men & Women | Niacinamide Sun Cream for Oily Skin", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['la-roche-posay-anthelios-uvmune-400-spf50-50-ml'] = { file: 'flipkart-la-roche-posay-anthelios-uvmune-400-spf50-50-ml.jpg', title: "La Roche Posay Sunscreen - SPF 50 PA+ Anthelios UVmune 400 Invisible Fluid SPF50 50ml", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['la-roche-posay-toleriane-double-repair-moisturizer-75-ml'] = { file: 'flipkart-la-roche-posay-toleriane-double-repair-moisturizer-75-ml.jpg', title: "La Roche Posay Cicaplast Skin Repair Cream | B5 Barrier Care Moisturizer for Daily Use", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['maybelline-fit-me-matte-poreless-foundation-30-ml-128'] = { file: 'flipkart-maybelline-fit-me-matte-poreless-foundation-30-ml-128.jpg', title: "MAYBELLINE NEW YORK Fit Me Matte+Poreless Liquid Foundation (With Pump & SPF 22), 340 Cappuccino Foundation", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['maybelline-super-stay-lumi-matte-foundation-30-ml-220'] = { file: 'flipkart-maybelline-super-stay-lumi-matte-foundation-30-ml-220.jpg', title: "MAYBELLINE NEW YORK Super Stay Lumi-Matte Foundation-220, 30H Wear, Lightweight, Suits all skintypes Foundation", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['maybelline-colossal-kajal-black-0-35-g'] = { file: 'flipkart-maybelline-colossal-kajal-black-0-35-g.jpg', title: "MAYBELLINE NEW YORK Colossal Eye Combo - Liner, Mascara & Kajal - Black", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['maybelline-super-stay-vinyl-ink-4-2-ml-cheeky'] = { file: 'flipkart-maybelline-super-stay-vinyl-ink-4-2-ml-cheeky.jpg', title: "MAYBELLINE NEW YORK Super Stay Matte Ink Liquid Lipstick", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['maybelline-hypercurl-mascara-9-2-ml'] = { file: 'flipkart-maybelline-hypercurl-mascara-9-2-ml.jpg', title: "MAYBELLINE NEW YORK Hypercurl Waterproof Mascara, Longlasting, Curls Lashes, Highly Pigmented Colour 9.2 ml", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['lakme-absolute-matte-melt-liquid-lip-color-red'] = { file: 'flipkart-lakme-absolute-matte-melt-liquid-lip-color-red.jpg', title: "Lakmé Xtraordin-airy Lip Mousse Love Me Red", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['lakme-9to5-primer-matte-lip-color-blush-nude'] = { file: 'flipkart-lakme-9to5-primer-matte-lip-color-blush-nude.jpg', title: "Lakmé 9TO5 Primer + Matte Lip Color Brick Blush", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['lakme-eyeconic-kajal-deep-black'] = { file: 'flipkart-lakme-eyeconic-kajal-deep-black.jpg', title: "Lakmé 9-5 Eyeconic Kajal, Deep Black, 0.35 g, Smudgeproof, Waterproof, Lasts Upto 24H", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['davidoff-cool-water-edt-125-ml'] = { file: 'flipkart-davidoff-cool-water-edt-125-ml.jpg', title: "DAVIDOFF Cool Water Eau de Toilette  -  125 ml", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['philips-smart-led-strip-2-m'] = { file: 'flipkart-philips-smart-led-strip-2-m.jpg', title: "PHILIPS 5 Meter Wi-Fi Smart LED Strip with Music Sync, Voice Control & Dimmable feature Light Strip", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['wakefit-cotton-king-bedsheet-set-sage'] = { file: 'flipkart-wakefit-cotton-king-bedsheet-set-sage.jpg', title: "Wakefit Cotton King Fitted (Elastic) 200 TC Floral 1 Bedsheet with 2 Pillow Covers", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['wakefit-organic-cotton-duvet-cover-queen'] = { file: 'flipkart-wakefit-organic-cotton-duvet-cover-queen.jpg', title: "Wakefit Queen Polyester Duvet Cover", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['wakefit-printed-cotton-double-bedsheet-set'] = { file: 'flipkart-wakefit-printed-cotton-double-bedsheet-set.jpg', title: "Wakefit Cotton Double Flat 200 TC Floral 1 Bedsheet with 2 Pillow Covers", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['wakefit-cloud-comfort-mattress-protector-king'] = { file: 'flipkart-wakefit-cloud-comfort-mattress-protector-king.jpg', title: "Wakefit King Size Fitted Terry Cotton Waterproof, Stretchable, Breathable Mattress Cover", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['ikea-kuggis-storage-box-with-lid-26-l'] = { file: 'flipkart-ikea-kuggis-storage-box-with-lid-26-l.jpg', title: "IKEA Microfibre FJÄDERHARV Storage box with lid, anthracite, 25x35x16 cm Storage Basket", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['ikea-skubb-under-bed-storage-case'] = { file: 'flipkart-ikea-skubb-under-bed-storage-case.jpg', title: "IKEA STICKAT Bed pocket Polyester Storage Pouch", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['ikea-samla-clear-storage-box-45-l'] = { file: 'flipkart-ikea-samla-clear-storage-box-45-l.jpg', title: "IKEA Digital Shoppy Storage box with lid, transparent grey-blue, 16.5x16.5x16.5 cm Storage Box", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['ikea-variera-shelf-insert-white'] = { file: 'flipkart-ikea-variera-shelf-insert-white.jpg', title: "IKEA Pegboard Shelf - White Steel Wall Shelf", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['prestige-omega-deluxe-5-piece-cookware-set'] = { file: 'flipkart-prestige-omega-deluxe-5-piece-cookware-set.jpg', title: "Prestige Omega Festive Pack Induction Bottom Non-Stick Coated Cookware Set", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['prestige-platino-plus-3-piece-fry-pan-set'] = { file: 'flipkart-prestige-platino-plus-3-piece-fry-pan-set.jpg', title: "Prestige Omega Deluxe Plus BYK Set of 3-Tawa, Fry Pan & Kadai with Glass Lid Induction Bottom Non-Stick Coated Cookware Set", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['prestige-tri-ply-stainless-steel-kadai-3-l'] = { file: 'flipkart-prestige-tri-ply-stainless-steel-kadai-3-l.jpg', title: "Prestige Tri-Ply Stainless Steel Splendid Kadhai 26 cm diameter with Lid 3.2 L capacity", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['prestige-omega-select-plus-5-l-pressure-cooker'] = { file: 'flipkart-prestige-omega-select-plus-5-l-pressure-cooker.jpg', title: "Prestige Svachh Nakshatra Duo Plus 5 L Inner Lid Induction Bottom Pressure Cooker", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['prestige-popular-plus-3-l-pressure-cooker'] = { file: 'flipkart-prestige-popular-plus-3-l-pressure-cooker.jpg', title: "Prestige Popular Plus 2 L, 3 L, 5 L Outer Lid Induction Bottom Pressure Cooker", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['prestige-alpha-deluxe-cooktop-set'] = { file: 'flipkart-prestige-alpha-deluxe-cooktop-set.jpg', title: "Prestige Omega Deluxe Granite Alpha 3Pcs BYK-Kadai 24cm Glass Lid+Tawa 28cm+Fry Pan 24cm Induction Bottom Non-Stick Coated Cookware Set", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['prestige-hard-anodised-tawa-28-cm'] = { file: 'flipkart-prestige-hard-anodised-tawa-28-cm.jpg', title: "Prestige Durastone Hard Anodised Dosa Tawa 28 cm diameter", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['bosch-truemixx-pro-1000-w-mixer-grinder'] = { file: 'flipkart-bosch-truemixx-pro-1000-w-mixer-grinder.jpg', title: "BOSCH TrueMixx Pro 1000 W Mixer Grinder", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['bosch-truemixx-style-750-w-mixer-grinder'] = { file: 'flipkart-bosch-truemixx-style-750-w-mixer-grinder.jpg', title: "BOSCH TrueMixx Style 750 W Mixer Grinder", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['havells-aqua-plus-1-2-l-electric-kettle'] = { file: 'flipkart-havells-aqua-plus-1-2-l-electric-kettle.jpg', title: "HAVELLS Aqua Plus 1.2 L Electric Kettle 1250W (Blue, White, Silver)", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['havells-crysta-1-5-l-electric-kettle'] = { file: 'flipkart-havells-crysta-1-5-l-electric-kettle.jpg', title: "HAVELLS CRAFT Kettle (Pack of 1) Electric Kettle", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['instant-vortex-slim-5-7-l-air-fryer'] = { file: 'flipkart-instant-vortex-slim-5-7-l-air-fryer.jpg', title: "Instant Pot Vortex Plus 6L Air Fryer Air Fryer", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['instant-vortex-mini-4-l-air-fryer'] = { file: 'flipkart-instant-vortex-mini-4-l-air-fryer.jpg', title: "KENT Classic Hot Air Fryer 4L 1300 W | 80% Less Oil | Instant Electric Air Fryer | Auto Cut Off | Fry, Grill, Roast, Steam, and Bake Air Fryer", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['samsung-digital-inverter-236-l-double-door'] = { file: 'flipkart-samsung-digital-inverter-236-l-double-door.jpg', title: "Samsung 236 L Frost Free Double Door 3 Star Refrigerator  with Convertible, Digital Inverter, 2026 Mod...", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['samsung-family-hub-653-l-side-by-side'] = { file: 'flipkart-samsung-family-hub-653-l-side-by-side.jpg', title: "Samsung 653 L Frost Free Side by Side 3 Star Refrigerator", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['ifb-senator-mbn-8-kg-front-load'] = { file: 'flipkart-ifb-senator-mbn-8-kg-front-load.jpg', title: "IFB 8 kg Fully Automatic Front Load Washing Machine Grey", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['ifb-executive-plus-vx-7-kg-front-load'] = { file: 'flipkart-ifb-executive-plus-vx-7-kg-front-load.jpg', title: "IFB 7 kg Fully Automatic Front Load Washing Machine Black", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['ifb-tl-sss-7-kg-top-load'] = { file: 'flipkart-ifb-tl-sss-7-kg-top-load.jpg', title: "IFB 7 kg Fully Automatic Top Load Washing Machine with In-built Heater Grey", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['ifb-neo-diva-bx-6-5-kg-front-load'] = { file: 'flipkart-ifb-neo-diva-bx-6-5-kg-front-load.jpg', title: "IFB 8 kg with 9 Swirl Wash, 2x Power Steam, 30 Min Steam Refresh Program, Eco Inverter Motor, WiFi Enabled, DeepClean Powered by Ai Fully Automatic Front Load Washing Machine with In-built Heater Black", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['ifb-executive-zxm-8-kg-front-load'] = { file: 'flipkart-ifb-executive-zxm-8-kg-front-load.jpg', title: "IFB 8 kg Fully Automatic Front Load Washing Machine Silver", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['whirlpool-freshcare-8-kg-front-load'] = { file: 'flipkart-whirlpool-freshcare-8-kg-front-load.jpg', title: "Whirlpool 8 kg Fully Automatic Front Load Washing Machine with In-built Heater Grey", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['whirlpool-stainwash-pro-7-kg-top-load'] = { file: 'flipkart-whirlpool-stainwash-pro-7-kg-top-load.jpg', title: "Whirlpool 7.5 kg 5 Star Stainwash Pro Fully Automatic Top Load Washing Machine with In-built Heater Gr...", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['whirlpool-ace-xl-9-kg-top-load'] = { file: 'flipkart-whirlpool-ace-xl-9-kg-top-load.jpg', title: "Whirlpool 7 kg 5 Star with Ace Wash Station, 1400 RPM Speed and Rust Proof Semi Automatic Top Load Was...", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['whirlpool-whitemagic-elite-7-5-kg-top-load'] = { file: 'flipkart-whirlpool-whitemagic-elite-7-5-kg-top-load.jpg', title: "Whirlpool 7.5 kg Fully Automatic Top Load Washing Machine with In-built Heater Grey", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['whirlpool-stainwash-ultra-8-kg-top-load'] = { file: 'flipkart-whirlpool-stainwash-ultra-8-kg-top-load.jpg', title: "Whirlpool 8 kg Fully Automatic Top Load Washing Machine with In-built Heater Grey", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['voltas-vectra-prism-1-5-ton-5-star-inverter-ac'] = { file: 'flipkart-voltas-vectra-prism-1-5-ton-5-star-inverter-ac.jpg', title: "Voltas 2025 Model 1.5 Ton 3 Star Split Inverter AC", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['voltas-adjustable-inverter-1-5-ton-3-star-ac'] = { file: 'flipkart-voltas-adjustable-inverter-1-5-ton-3-star-ac.jpg', title: "Voltas 2025 Model 1.5 Ton 3 Star Split Inverter 4-IN-1 Adjustable Mode | Energy Efficient | High Ambie...", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['voltas-vertis-emerald-1-ton-inverter-ac'] = { file: 'flipkart-voltas-vertis-emerald-1-ton-inverter-ac.jpg', title: "Voltas 2026 Model 1 Ton 3 Star Split Inverter AC", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['voltas-all-weather-1-5-ton-hot-and-cold-ac'] = { file: 'flipkart-voltas-all-weather-1-5-ton-hot-and-cold-ac.jpg', title: "Voltas 2026 Model 1.42 Ton 3 Star Hot and Cold Split Inverter All Weather AC AC", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['eureka-forbes-quick-clean-dx-1200-w-vacuum'] = { file: 'flipkart-eureka-forbes-quick-clean-dx-1200-w-vacuum.jpg', title: "EUREKA FORBES Quick Clean DX Dry Vacuum Cleaner with 1200 Watts Powerful Suction Control, 3 Free Reusa...", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['eureka-forbes-zerobend-6-in-1-cordless-vacuum'] = { file: 'flipkart-eureka-forbes-zerobend-6-in-1-cordless-vacuum.jpg', title: "EUREKA FORBES Kordfree K20 SuperSilent Cordless Vacuum Cleaner", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['eureka-forbes-euroclean-wd-x2-wet-and-dry'] = { file: 'flipkart-eureka-forbes-euroclean-wd-x2-wet-and-dry.jpg', title: "EUREKA FORBES EurocLean The Most Advanced Vaccum Cleaner WD X2 Wet & Dry Wet & Dry Vacuum Cleaner", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['tata-consumer-tata-tea-gold-care-1-kg'] = { file: 'flipkart-tata-consumer-tata-tea-gold-care-1-kg.jpg', title: "Tata Tea Gold Care Goodness of 5 Ingredients, Tea Pouch", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['tata-consumer-tata-tea-premium-desh-ki-chai-1-kg'] = { file: 'flipkart-tata-consumer-tata-tea-premium-desh-ki-chai-1-kg.jpg', title: "Tata Tea Premium Desh Ki Chai, Crafted For Chai Lovers Across India Tea Pouch", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['tata-consumer-tata-sampann-masala-chai-500-g'] = { file: 'flipkart-tata-consumer-tata-sampann-masala-chai-500-g.jpg', title: "Tata TEA PREMIUM 500 GRAMS Masala Tea Pouch", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['tata-consumer-tata-tea-chakra-gold-1-kg'] = { file: 'flipkart-tata-consumer-tata-tea-chakra-gold-1-kg.jpg', title: "Tata Tea Chakra Gold Dust Tea with Long Lasting Taste Tea Pouch 1 kg Tea Pouch", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['tata-consumer-tata-tea-agni-strong-leaf-1-kg'] = { file: 'flipkart-tata-consumer-tata-tea-agni-strong-leaf-1-kg.jpg', title: "Tata Agni Tea Josh Jagaye Har Roj Strong Leaf 1Kg $$ 10% Extra Strong Black Tea Pouch", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['tata-sampann-unpolished-toor-dal-1-kg'] = { file: 'flipkart-tata-sampann-unpolished-toor-dal-1-kg.jpg', title: "Tata Sampann Unpolished Yellow Toor/Arhar Dal", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['tata-sampann-unpolished-moong-dal-1-kg'] = { file: 'flipkart-tata-sampann-unpolished-moong-dal-1-kg.jpg', title: "Tata Sampann Unpolished Yellow Moong Dal (Split)", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['tata-sampann-unpolished-chana-dal-1-kg'] = { file: 'flipkart-tata-sampann-unpolished-chana-dal-1-kg.jpg', title: "Tata Sampann Unpolished Yellow Chana Dal (Split)", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['tata-sampann-unpolished-masoor-dal-1-kg'] = { file: 'flipkart-tata-sampann-unpolished-masoor-dal-1-kg.jpg', title: "Tata Sampann Unpolished Masoor Dal (Whole)", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['tata-sampann-unpolished-urad-dal-1-kg'] = { file: 'flipkart-tata-sampann-unpolished-urad-dal-1-kg.jpg', title: "Tata Sampann Unpolished White Urad Dal (Whole)", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['tata-sampann-unpolished-kabuli-chana-1-kg'] = { file: 'flipkart-tata-sampann-unpolished-kabuli-chana-1-kg.jpg', title: "Tata Sampann Unpolished Kabuli Chana", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['kelloggs-chocos-fills-375-g'] = { file: 'flipkart-kelloggs-chocos-fills-375-g.jpg', title: "Kellogg's by Kellogg's KELLOGGS CHOCOS DUET 375 GM Pouch", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['surf-excel-matic-front-load-liquid-2-l'] = { file: 'flipkart-surf-excel-matic-front-load-liquid-2-l.jpg', title: "Surf excel Matic for Front Load Removes tough Stains in 1st wash Fresh Liquid Detergent", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['surf-excel-matic-top-load-liquid-2-l'] = { file: 'flipkart-surf-excel-matic-top-load-liquid-2-l.jpg', title: "Surf excel Matic Top Load Fresh Liquid Detergent", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['surf-excel-easy-wash-detergent-powder-4-kg'] = { file: 'flipkart-surf-excel-easy-wash-detergent-powder-4-kg.jpg', title: "BLG Excel Wash Detergent Powder | Washing Powder | Detergent Powder (Lemon)", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['surf-excel-matic-front-load-powder-2-kg'] = { file: 'flipkart-surf-excel-matic-front-load-powder-2-kg.jpg', title: "Surf excel Front Load Matic Detergent Powder", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['google-pixel-10-128-gb-indigo'] = { file: 'amazon-google-pixel-10-128-gb-indigo.jpg', title: "Google Pixel 10 5G (Indigo, 12GB RAM, 256GB Storage)", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }



productPhotos['google-pixel-10-pro-256-gb-moonstone'] = { file: 'flipkart-google-pixel-10-pro-256-gb-moonstone.jpg', title: "Google Pixel 10 Pro XL (Moonstone, 256 GB)", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['samsung-galaxy-z-fold7-5g-256-gb-blue-shadow'] = { file: 'flipkart-samsung-galaxy-z-fold7-5g-256-gb-blue-shadow.jpg', title: "Samsung Galaxy Z Fold7 5G (Blue Shadow, 256 GB)", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['oneplus-oneplus-nord-5-5g-256-gb-marble-sands'] = { file: 'flipkart-oneplus-oneplus-nord-5-5g-256-gb-marble-sands.jpg', title: "OnePlus Nord 5 (Phantom Grey, 256 GB)", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['nothing-phone-3-256-gb-white'] = { file: 'flipkart-nothing-phone-3-256-gb-white.jpg', title: "Nothing Phone (3) (White, 512 GB)", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['apple-airpods-pro-3-with-magsafe-case'] = { file: 'flipkart-apple-airpods-pro-3-with-magsafe-case.jpg', title: "Oboe Polypropylene Press and Release Earbuds Case For Apple Airpods Pro 3 Case Magsafe Ready with Phone Stand,Magnetic Lock & Keyring", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['jbl-tune-770nc-wireless-over-ear-headphones'] = { file: 'flipkart-jbl-tune-770nc-wireless-over-ear-headphones.jpg', title: "JBL Tune 770NC Active Noise Cancelling, 70Hr Playtime, Fast Pair & Multi Connect Bluetooth", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['jbl-charge-6-portable-bluetooth-speaker'] = { file: 'flipkart-jbl-charge-6-portable-bluetooth-speaker.jpg', title: "JBL Charge 6,Powerful Pro Sound with AI Sound Boost,28 Hrs Playtime,IP68 Waterproof 45 W Bluetooth Speaker", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['sony-ult-field-1-wireless-speaker'] = { file: 'flipkart-sony-ult-field-1-wireless-speaker.jpg', title: "SONY ULT FIELD 1 Massive Bass 12Hrs Battery Voice Calling IP67 Water Dust Rustproof 30 W Bluetooth Speaker", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['canon-eos-r50-mirrorless-camera-with-18-45-mm-lens'] = { file: 'flipkart-canon-eos-r50-mirrorless-camera-with-18-45-mm-lens.jpg', title: "Canon EOS R50 Mirrorless Camera Body with RF - S 18 - 45 mm f/4.5 - 6.3 IS STM", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['gopro-hero13-black-action-camera'] = { file: 'flipkart-gopro-hero13-black-action-camera.jpg', title: "GoPro Hero13 Black Polar White Sports and Action Camera", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['dell-xps-13-copilot-pc-snapdragon-x-elite-16-gb'] = { file: 'flipkart-dell-xps-13-copilot-pc-snapdragon-x-elite-16-gb.jpg', title: "DELL 15 (Previously Inspiron) Intel Core i5 13th Gen 1334U - (16 GB/512 GB SSD/Windows 11 Home) DC1525...", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['hp-pavilion-plus-14-oled-ryzen-7-16-gb'] = { file: 'flipkart-hp-pavilion-plus-14-oled-ryzen-7-16-gb.jpg', title: "HP Pavilion Plus Creator OLED Eyesafe H-Series Intel Core i7 12th Gen 12700H - (16 GB/1 TB SSD/Windows 11 Home) 14-eh0024TU Thin and Light Laptop", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['dell-inspiron-14-plus-core-ultra-7-16-gb-1-tb'] = { file: 'flipkart-dell-inspiron-14-plus-core-ultra-7-16-gb-1-tb.jpg', title: "DELL Alienware 16 Aurora (i7 14th Gen) Microsoft Office Home 2024 Intel Core 7 240H - (16 GB/1 TB SSD/...", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['lenovo-thinkpad-x1-carbon-gen-13-aura-edition'] = { file: 'flipkart-lenovo-thinkpad-x1-carbon-gen-13-aura-edition.jpg', title: "Lenovo LOQ Intel Core i7 13th Gen 13645HX - (16 GB/1 TB SSD/Windows 11 Home/8 GB Graphics/NVIDIA GeFor...", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['lenovo-yoga-slim-7i-core-ultra-5-16-gb-oled'] = { file: 'flipkart-lenovo-yoga-slim-7i-core-ultra-5-16-gb-oled.jpg', title: "Lenovo Yoga Slim 7 Aura Edition OLED Display Intel Core Ultra 5 226V - (16 GB/512 GB SSD/Windows 11 Ho...", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['asus-zenbook-14-oled-core-ultra-7-16-gb'] = { file: 'flipkart-asus-zenbook-14-oled-core-ultra-7-16-gb.jpg', title: "ASUS Zenbook S 14 OLED Intel Core Ultra 7 - (16 GB/512 GB SSD/Windows 11 Home) UX5406SA-PV356WS Thin a...", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['acer-swift-go-14-ai-snapdragon-x-plus-16-gb'] = { file: 'flipkart-acer-swift-go-14-ai-snapdragon-x-plus-16-gb.jpg', title: "Acer Swift Neo Next Gen AI PC OLED Intel Core Ultra 5 226V - (16 GB/512 GB SSD/Windows 11 Home) SFN14-...", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['apple-ipad-air-11-m3-wi-fi-128-gb-purple'] = { file: 'flipkart-apple-ipad-air-11-m3-wi-fi-128-gb-purple.jpg', title: "Apple 2025 iPad Air (M3) 128 GB ROM 11.0 inch with Wi-Fi Only Apple M3 Chip (Purple)", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['lg-oled-evo-c5-65-4k-smart-tv'] = { file: 'flipkart-lg-oled-evo-c5-65-4k-smart-tv.jpg', title: "LG evo AI C5 164 cm (65 inch) OLED Ultra HD (4K) Smart WebOS TV with Alpha 9 AI Processor 4K Gen8 Brig...", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['tcl-c7k-65-qd-mini-led-google-tv'] = { file: 'flipkart-tcl-c7k-65-qd-mini-led-google-tv.jpg', title: "TCL Q7D 163.83 cm (65 inch) Ultra HD (4K) Mini LED Smart Google TV 2026 Edition with Up to 1800 Precis...", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['nintendo-switch-2-console-with-mario-kart-world-bundle'] = { file: 'flipkart-nintendo-switch-2-console-with-mario-kart-world-bundle.jpg', title: "Super Mario Maker 2 Nintendo switch", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['sony-ghost-of-yotei-standard-edition-ps5'] = { file: 'flipkart-sony-ghost-of-yotei-standard-edition-ps5.jpg', title: "SONY PS5 MARVEL TOKON FIGHTING SOULS (STD)", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['nike-pegasus-42-mens-road-running-shoes'] = { file: 'flipkart-nike-pegasus-42-mens-road-running-shoes.jpg', title: "NIKE Air Zoom Pegasus 42 SE Running Shoes For Men", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['loreal-paris-total-repair-5-shampoo-650-ml'] = { file: 'flipkart-loreal-paris-total-repair-5-shampoo-650-ml.jpg', title: "L'Oréal Paris Total Repair 5 Shampoo 650ml + Conditioner 175ml + Serum 40ml", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['hawkins-contura-hard-anodised-pressure-cooker-5-l'] = { file: 'flipkart-hawkins-contura-hard-anodised-pressure-cooker-5-l.jpg', title: "Hawkins Contura Black XT, Hard Anodised 5L(CXT50) Inner Lid (Pack Of 3) 5 L Inner Lid Induction Bottom Pressure Cooker", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['prestige-omega-deluxe-granite-3-piece-cookware-set'] = { file: 'flipkart-prestige-omega-deluxe-granite-3-piece-cookware-set.jpg', title: "Prestige Omega Deluxe Plus Build Your Kitchen Set of 3-Tawa, Fry Pan & Kadai Induction Bottom Non-Stick Coated Cookware Set", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['lg-9-kg-5-star-ai-dd-front-load-washing-machine'] = { file: 'flipkart-lg-9-kg-5-star-ai-dd-front-load-washing-machine.jpg', title: "LG 9 kg 5 Star with AI Direct Drive, 6 Motion, Inverter Direct Drive, Steam and Wi-Fi Enabled Fully Au...", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['lg-1-5-ton-5-star-ai-dual-inverter-split-ac'] = { file: 'flipkart-lg-1-5-ton-5-star-ai-dual-inverter-split-ac.jpg', title: "LG 2025 Model 1.5 Ton 5 Star Split Dual Inverter with Faster Cooling and Energy Saving, AI Convertible...", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['bosch-8-kg-5-star-fully-automatic-front-load'] = { file: 'flipkart-bosch-8-kg-5-star-fully-automatic-front-load.jpg', title: "BOSCH 8 kg 5 Star with 1360 High RPM Spin Motor Semi Automatic Top Load Washing Machine Multicolor", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['nescafe-classic-instant-coffee-jar-200-g'] = { file: 'flipkart-nescafe-classic-instant-coffee-jar-200-g.jpg', title: "Nescafe Classic Pure Soluble Coffee - 200g Instant Coffee", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['cadbury-dairy-milk-silk-chocolate-bar-pack-of-4'] = { file: 'flipkart-cadbury-dairy-milk-silk-chocolate-bar-pack-of-4.jpg', title: "Cadbury Celebration Chocolate Hamper | Elephant Design Rakhi | Beautiful Hathi Rakhi Gift For Brother | Rakhi Gift | SF4/21/HATHI RAKHI Combo", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['sg-sunny-tonny-english-willow-cricket-bat'] = { file: 'flipkart-sg-sunny-tonny-english-willow-cricket-bat.jpg', title: "SG SUNNY GOLD CLASSIC English Willow Cricket  Bat For 15+ Yrs", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['amazon-kindle-kindle-paperwhite-16-gb-7-display'] = { file: 'flipkart-amazon-kindle-kindle-paperwhite-16-gb-7-display.jpg', title: "spartan shield Screen Guard for Amazon Kindle Paperwhite || 7 Inch Touchscreen All-new fastest Kindle ever || Anti Scratch || Fingerprint Resistant || [2 PACK] AmazonKindle TouchPad Display PET Thin Flexible Protector Film 2025 (NOT TEMPERED GLASS)", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['arihant-upsc-cse-prelims-2027-30-years-solved-papers'] = { file: 'flipkart-arihant-upsc-cse-prelims-2027-30-years-solved-papers.jpg', title: "Arihant UPSC Civil Services Prelims 2027 Test Series Combo (GS Paper I + CSAT Paper II) | 30+ Tests with NCERT-Based, Topical, Sectional & Full-Length Mock Tests, OMR Sheets, AIR Mock Test & 100 Trending Topics", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['hot-wheels-rc-rally-racer-1-16-scale'] = { file: 'flipkart-hot-wheels-rc-rally-racer-1-16-scale.jpg', title: "Arizuul 1:16 Land Rover Defender RC Rechargeable Model Car Baby Pull Toy with Wheels", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['lego-technic-ferrari-sf-24-f1-car-model-kit'] = { file: 'flipkart-lego-technic-ferrari-sf-24-f1-car-model-kit.jpg', title: "LEGO Technic Ferrari SF-24 F1 Car Model Kit for Adults 42207 (1361 Blocks)", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['mamaearth-gentle-cleansing-baby-shampoo-400-ml'] = { file: 'flipkart-mamaearth-gentle-cleansing-baby-shampoo-400-ml.jpg', title: "Mamaearth Milky Soft Body Wash for Babies with Oats, Milk and Calendula 400 ml", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['wildcraft-trailblazer-45-l-rucksack'] = { file: 'flipkart-wildcraft-trailblazer-45-l-rucksack.jpg', title: "Wildcraft Howler_RSK_45L_Blue Rucksack  - 45 L", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['samsung-galaxy-a47-5g-128-gb'] = { file: 'flipkart-samsung-galaxy-a47-5g-128-gb.jpg', title: "Samsung M47 5G (Blaze Blue, 128 GB)", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['apple-iphone-17-air-256-gb'] = { file: 'flipkart-apple-iphone-17-air-256-gb.jpg', title: "Apple iPhone 17 (White, 256 GB)", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['apple-iphone-se-256-gb'] = { file: 'flipkart-apple-iphone-se-256-gb.jpg', title: "Apple iPhone SE 3rd Gen (Starlight, 256 GB)", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['motorola-edge-60-neo-256-gb'] = { file: 'flipkart-motorola-edge-60-neo-256-gb.jpg', title: "MOTOROLA Edge 60 Stylus (PANTONE Surf the Web, 256 GB)", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['vivo-v50e-5g-256-gb'] = { file: 'flipkart-vivo-v50e-5g-256-gb.jpg', title: "vivo V50 5G (Starry Night, 256 GB)", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['oppo-reno14-f-5g-256-gb'] = { file: 'flipkart-oppo-reno14-f-5g-256-gb.jpg', title: "OPPO Reno14 5G (Mint Green, 256 GB)", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['oneplus-nord-5-5g-512-gb'] = { file: 'flipkart-oneplus-nord-5-5g-512-gb.jpg', title: "Velmobile OnePlus Nord 5G Premium Quality Back Panel", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['realme-14-pro-5g-512-gb'] = { file: 'flipkart-realme-14-pro-5g-512-gb.jpg', title: "realme 14 Pro 5G (Suede Grey, 128 GB)", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['nothing-phone-3a-pro-256-gb'] = { file: 'flipkart-nothing-phone-3a-pro-256-gb.jpg', title: "Velmobile Nothing Phone 3a Pro Back Panel", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['jbl-live-770nc-wireless-headphones'] = { file: 'flipkart-jbl-live-770nc-wireless-headphones.jpg', title: "JBL Live 770NC with ANC, 65Hr Playtime,Speed-charge,BT 5.3 (LE Audio), Personify 2.0 Bluetooth", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['sennheiser-momentum-4-wireless'] = { file: 'flipkart-sennheiser-momentum-4-wireless.jpg', title: "Sennheiser Momentum True Wireless 4 with Bluetooth 5.4 and with 30Hr Battery Bluetooth Bluetooth", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['sennheiser-accentum-plus-wireless'] = { file: 'flipkart-sennheiser-accentum-plus-wireless.jpg', title: "Sennheiser Accentum Plus Wireless Over Ear Headphones Designed in Germany with 50Hr Battery Bluetooth", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['apple-airpods-4'] = { file: 'flipkart-apple-airpods-4.jpg', title: "Apple AirPods 4 Wireless Earbuds, Personalised Spatial Audio,Sweat and Water Resistant Bluetooth", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['boat-nirvana-space'] = { file: 'flipkart-boat-nirvana-space.jpg', title: "boAt Nirvana Space w/ 360 Spatial Audio, ANC(~32dB), 100HRS Battery & Dual Pairing Bluetooth", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['oneplus-buds-nord-3'] = { file: 'flipkart-oneplus-buds-nord-3.jpg', title: "OnePlus Nord Buds 3r TWS Earbud, 10min charge for 8hr Music, 3D Audio, 2-mic call Bluetooth", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['jbl-go-4-mini-speaker'] = { file: 'flipkart-jbl-go-4-mini-speaker.jpg', title: "JBL Go 4, Wireless Ultra Portable, Pro Sound,Water & Dust Proof 4.2 W Bluetooth Speaker", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['jbl-clip-5-portable-speaker'] = { file: 'flipkart-jbl-clip-5-portable-speaker.jpg', title: "JBL Clip 5 with 12hrs of Playtime,Pro Sound, Integrated Carabiner,Dust & Waterproof 7 W Bluetooth Speaker", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['marshall-emberton-iii'] = { file: 'flipkart-marshall-emberton-iii.jpg', title: "Marshall Emberton III 20 W Bluetooth Speaker", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['canon-eos-r50-v-creator-camera'] = { file: 'flipkart-canon-eos-r50-v-creator-camera.jpg', title: "Canon EOS R50 Mirrorless Camera Body with RF - S 18 - 45 mm f/4.5 - 6.3 IS STM", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['lenovo-thinkpad-t14-gen-5'] = { file: 'flipkart-lenovo-thinkpad-t14-gen-5.jpg', title: "Lenovo THINKPAD E14 GEN 5 - AMD Ryzen 5 7th Gen 7430U - (16 GB/512 GB SSD/Windows 11 Pro) TP E14 Gen 5...", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['lenovo-ideapad-slim-5-14imh9'] = { file: 'flipkart-lenovo-ideapad-slim-5-14imh9.jpg', title: "Lenovo IdeaPad Slim 5 OLED Display Intel Core Ultra 9 185H - (16 GB/512 GB SSD/Windows 11 Home) IdeaPad Slim 5 14IMH10 Laptop", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['hp-pavilion-aero-13'] = { file: 'flipkart-hp-pavilion-aero-13.jpg', title: "HP Pavilion Plus MSO 2024 Intel Core i5 13th Gen 1335U - (16 GB/512 GB SSD/Windows 11 Home) 14-ew0107T...", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['hp-spectre-x360-14'] = { file: 'flipkart-hp-spectre-x360-14.jpg', title: "TRUSTin.ONLINE Screen Guard with Applicator Kit for HP Spectre x360 14 (2024) (14 inch)", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['hp-omnibook-ultra-flip-14'] = { file: 'flipkart-hp-omnibook-ultra-flip-14.jpg', title: "HP 14 Omnibook X Flip Next Gen AI PC Intel Core Ultra 7 256V - (16 GB/1 TB SSD/Windows 11 Home) Omnibo...", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['hp-omnibook-5-14'] = { file: 'flipkart-hp-omnibook-5-14.jpg', title: "HP OmniBook 7(i5 14th Gen) Intel Core 5 210H - (16 GB/512 GB SSD/Windows 11 Home) FS0789TU Laptop", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['acer-nitro-v-16'] = { file: 'flipkart-acer-nitro-v-16.jpg', title: "Acer NITRO V 16S (i5 14th Gen) Intel Core 5 210H - (16 GB/512 GB SSD/Windows 11 Home/8 GB Graphics/NVI...", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['acer-predator-triton-neo-16'] = { file: 'flipkart-acer-predator-triton-neo-16.jpg', title: "Guardpad Screen Guard for Acer Predator Triton 300 PT315-51-5974 (15.6 Inch Screen)(1, Clear) With 9H ...", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['acer-swift-x-14-creator'] = { file: 'flipkart-acer-swift-x-14-creator.jpg', title: "Acer Swift Neo Next Gen AI PC Intel Core Ultra 5 226V - (16 GB/512 GB SSD/Windows 11 Home) SFN14-56 No...", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['msi-katana-15-hx'] = { file: 'flipkart-msi-katana-15-hx.jpg', title: "MSI Katana 15 Intel Core i5 13th Gen 13420H - (16 GB/1 TB SSD/Windows 11 Home/6 GB Graphics/NVIDIA GeF...", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['msi-thin-15-b13v'] = { file: 'flipkart-msi-thin-15-b13v.jpg', title: "MSI Modern 15 H Intel Core i7 13th Gen 13620H - (16 GB/512 GB SSD/Windows 11 Home) Modern 15 H B13M-22...", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['asus-rog-zephyrus-g16'] = { file: 'flipkart-asus-rog-zephyrus-g16.jpg', title: "ARZSP Screen Guard for ASUS ROG ZEPHYRUS G16 GU603ZU-N3023WS SERIES SCREEN PROTECTOR", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['asus-tuf-gaming-a15'] = { file: 'flipkart-asus-tuf-gaming-a15.jpg', title: "ASUS TUF Gaming A15 (2025) AMD Ryzen 7 Hexa Core 7445HS - (16 GB/512 GB SSD/Windows 11 Home/4 GB Graph...", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['asus-rog-strix-g16'] = { file: 'flipkart-asus-rog-strix-g16.jpg', title: "ASUS ROG Strix G16 (2026) Intel Core Ultra 7 255HX - (16 GB/1 TB SSD/Windows 11 Home/8 GB Graphics/NVI...", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['samsung-galaxy-tab-s10-256-gb'] = { file: 'flipkart-samsung-galaxy-tab-s10-256-gb.jpg', title: "Ximytec Mobile Battery For  Samsung Galaxy Tab S 10.5", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['samsung-galaxy-tab-s10-ultra-512-gb'] = { file: 'flipkart-samsung-galaxy-tab-s10-ultra-512-gb.jpg', title: "Samsung Galaxy Tab S10 Lite 6 GB RAM 128 GB ROM 10.9 inch with Wi-Fi+5G Gaming Samsung Exynos 1380 Tab...", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['lg-oled-b4-55-inch-4k-smart-tv'] = { file: 'flipkart-lg-oled-b4-55-inch-4k-smart-tv.jpg', title: "LG evo AI C5 139 cm (55 inch) OLED Ultra HD (4K) Smart WebOS TV with Alpha 9 AI Processor 4K Gen8 Brig...", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['lg-oled-c4-65-inch-evo-tv'] = { file: 'flipkart-lg-oled-c4-65-inch-evo-tv.jpg', title: "LG AI TV OLED evo C4 164 cm (65 inch) OLED Ultra HD (4K) Smart WebOS TV with Alpha 9 AI Processor 4K G...", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['lg-oled-b4-65-inch-4k-smart-tv'] = { file: 'flipkart-lg-oled-b4-65-inch-4k-smart-tv.jpg', title: "LG OLED C2 164 cm (65 inch) OLED Ultra HD (4K) Smart WebOS TV with Alpha9 AI Processor 4K Gen5, AI Pic...", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['hisense-u6n-55-inch-uled'] = { file: 'flipkart-hisense-u6n-55-inch-uled.jpg', title: "Hisense Q6Q 139 cm (55 inch) QLED Ultra HD (4K) Smart VIDAA TV with 120HZ |Dolby Vision & Atmos |Voice...", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['xiaomi-x-pro-qled-55-inch'] = { file: 'flipkart-xiaomi-x-pro-qled-55-inch.jpg', title: "XIAOMI FX Series 138.68 cm (55 inch) Ultra HD (4K) LED Smart Fire TV with Alexa built-in | HDR 10 | 32...", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['hisense-e7n-pro-65-inch-qled'] = { file: 'flipkart-hisense-e7n-pro-65-inch-qled.jpg', title: "Kpdp Remote for Hisense 65E7K (Non-Voice Supported) Hisense 4K Ultra HD Smart QLED TV Remote Controlle...", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['sony-playstation-5-slim-disc-edition-1-tb'] = { file: 'flipkart-sony-playstation-5-slim-disc-edition-1-tb.jpg', title: "SONY PS5 Console Disc - Fortnite Bundle (Slim) 1 TB with Yes", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['sony-playstation-5-slim-digital-edition-1-tb'] = { file: 'flipkart-sony-playstation-5-slim-digital-edition-1-tb.jpg', title: "SONY PS5 Console (CFI-2116A01Y) 1 TB with ASTRO’s PLAYROOM", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['nintendo-switch-lite-turquoise'] = { file: 'flipkart-nintendo-switch-lite-turquoise.jpg', title: "OIVO INDIA Travel Case Pouch For Nintendo Switch & Switch Lite Console Portable Carry Cover  Gaming Accessory Kit", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['logitech-g-g502-x-plus-wireless-mouse'] = { file: 'flipkart-logitech-g-g502-x-plus-wireless-mouse.jpg', title: "Logitech G502X Lightspeed Plus/Hero 25k Sensor/8LED RGB/Adj.DPI Shift butt.,upto 25600DPI Ambidextrous Optical  Gaming Mouse", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['razer-huntsman-v3-pro-tkl'] = { file: 'flipkart-razer-huntsman-v3-pro-tkl.jpg', title: "Razer Tartarus Pro - Analog Optical Mercury Wired USB Handheld Gaming Keyboard Compatible with Desktop, Laptop, Mac stand support,RZ07-03110200-R3M1", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['asics-gel-cumulus-27'] = { file: 'flipkart-asics-gel-cumulus-27.jpg', title: "Asics GEL-NIMBUS 27 Running Shoes For Men", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['asics-novablast-5'] = { file: 'flipkart-asics-novablast-5.jpg', title: "Asics NOVABLAST 5 Running Shoes For Men", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['puma-deviate-nitro-elite-3'] = { file: 'flipkart-puma-deviate-nitro-elite-3.jpg', title: "PUMA Deviate NITRO Elite 3 Running Shoes For Women", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['puma-velocity-nitro-3'] = { file: 'flipkart-puma-velocity-nitro-3.jpg', title: "PUMA ForeverRun NITRO 3 Running Shoes For Men", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['puma-foreverrun-nitro-2'] = { file: 'flipkart-puma-foreverrun-nitro-2.jpg', title: "PUMA Magnify Nitro 2 Dream Rush Running Shoes For Women", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['puma-fast-r-nitro-elite-2'] = { file: 'flipkart-puma-fast-r-nitro-elite-2.jpg', title: "PUMA Deviate NITRO 2 Running Shoes For Men", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['puma-electrify-nitro-3'] = { file: 'flipkart-puma-electrify-nitro-3.jpg', title: "PUMA Electrify NITRO 3 Knit Running Shoes For Women", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['minimalist-multi-peptide-serum-30-ml'] = { file: 'flipkart-minimalist-multi-peptide-serum-30-ml.jpg', title: "Minimalist Hair Growth + Anti-Grey Actives 15.6% Hair Serum 30ml", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['maybelline-fit-me-matte-poreless-foundation-30-ml-128'] = { file: 'flipkart-maybelline-fit-me-matte-poreless-foundation-30-ml-128.jpg', title: "MAYBELLINE NEW YORK Super Stay Lumi-Matte Foundation-128, 30H Wear, Lightweight, Suits all skintypes Foundation", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['maybelline-super-stay-vinyl-ink-4-2-ml-cheeky'] = { file: 'flipkart-maybelline-super-stay-vinyl-ink-4-2-ml-cheeky.jpg', title: "MAYBELLINE NEW YORK Supersta Vinyl Ink Liquid Lipstick, Irresistible, 4.2ml", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['lakme-insta-eye-liner-black-9-ml'] = { file: 'flipkart-lakme-insta-eye-liner-black-9-ml.jpg', title: "Lakmé 9to5 Eyeconic Liquid Eyeliner Intense Black 4.5 ml", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['loreal-paris-everpure-bond-repair-shampoo-250-ml'] = { file: 'flipkart-loreal-paris-everpure-bond-repair-shampoo-250-ml.jpg', title: "L'Oréal Professionnel Absolut Repair Shampoo 300ml + Masque 250gms | For Dry & Damaged Hair", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['loreal-paris-professionnel-absolut-repair-mask-250-ml'] = { file: 'flipkart-loreal-paris-professionnel-absolut-repair-mask-250-ml.jpg', title: "L'Oréal Professionnel Repair Mask For Dry and Damaged Hair 250ml WithProtein & Omega-9", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['wakefit-cloud-comfort-mattress-protector-king'] = { file: 'flipkart-wakefit-cloud-comfort-mattress-protector-king.jpg', title: "Wakefit King Size Fitted Polyster Waterproof, Stretchable, Breathable Mattress Cover", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['ikea-kuggis-storage-box-with-lid-26-l'] = { file: 'flipkart-ikea-kuggis-storage-box-with-lid-26-l.jpg', title: "IKEA Digital Shoppy KUGGIS Lid, bamboo, 18x26 cm (7x10 ¼ \") 10 inch Lid, Pack of 1", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['ikea-pluggis-sorting-bin-set-of-3'] = { file: 'flipkart-ikea-pluggis-sorting-bin-set-of-3.jpg', title: "IKEA Product 3-Piece Bathroom Organizer Set Combo- 1 Soap Dispenser, 1 Soap Trey Holder and 1 Plastic Toothbrush Holder", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['prestige-omega-deluxe-5-piece-cookware-set'] = { file: 'flipkart-prestige-omega-deluxe-5-piece-cookware-set.jpg', title: "Prestige TriPly 3 pcs BYK-Fry Pan 24cm/1.7L+Kadai 24cm/2.7L SS Lid, Sauce Pan 16cm/1.5L Induction Bottom Cookware Set", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['prestige-platino-plus-3-piece-fry-pan-set'] = { file: 'flipkart-prestige-platino-plus-3-piece-fry-pan-set.jpg', title: "Prestige 38489 Augusta Peach BYK Set of 3-Tawa 28Cm,Fry Pan 24Cm,Kadai 24Cm Induction Bottom Non-Stick Coated Cookware Set", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['prestige-alpha-deluxe-cooktop-set'] = { file: 'flipkart-prestige-alpha-deluxe-cooktop-set.jpg', title: "Judge by TTK Prestige Deluxe Induction Bottom Non-Stick Coated Cookware Set", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['corelle-winter-frost-serving-bowl-set'] = { file: 'flipkart-corelle-winter-frost-serving-bowl-set.jpg', title: "CORELLE Glass Dessert Bowl Livingware Winter Frost White 296 ml Dessert Bowl Pack of 6", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['lg-doorcooling-655-l-side-by-side'] = { file: 'flipkart-lg-doorcooling-655-l-side-by-side.jpg', title: "LG 655 L Frost Free Side by Side 3 Star Refrigerator  with Smart Inverter Compressor, Express Freeze, ...", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['lg-convertible-272-l-double-door'] = { file: 'flipkart-lg-convertible-272-l-double-door.jpg', title: "LG 272 L Frost Free Double Door 2 Star Convertible Refrigerator  with Smart Inverter Compressor and Mu...", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['ifb-neo-diva-bx-6-5-kg-front-load'] = { file: 'flipkart-ifb-neo-diva-bx-6-5-kg-front-load.jpg', title: "IFB 6.5 kg with 9 Swirl Wash, 2x Power Steam, 30 Min Steam Refresh Program, Eco Inverter Motor, DeepCl...", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['whirlpool-ace-xl-9-kg-top-load'] = { file: 'flipkart-whirlpool-ace-xl-9-kg-top-load.jpg', title: "Whirlpool 9 kg 5 Star, Hard Water wash Semi Automatic Top Load Washing Machine Grey", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['voltas-all-weather-1-5-ton-hot-and-cold-ac'] = { file: 'flipkart-voltas-all-weather-1-5-ton-hot-and-cold-ac.jpg', title: "Voltas 2026 Model 1.5 Ton 3 Star Split Inverter with Wi-fi AC", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['panasonic-nn-st64-32-l-grill-microwave'] = { file: 'flipkart-panasonic-nn-st64-32-l-grill-microwave.jpg', title: "Panasonic 20 L Grill Microwave Oven", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['tata-consumer-tata-tea-premium-desh-ki-chai-1-kg'] = { file: 'flipkart-tata-consumer-tata-tea-premium-desh-ki-chai-1-kg.jpg', title: "Tata Premium Desh Ki Chai 1kg Tea Vacuum Pack", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['motorola-edge-60-pro-5g-256-gb-pantone-dazzling-blue'] = { file: 'amazon-motorola-edge-60-pro-5g-256-gb-pantone-dazzling-blue.jpg', title: "MOTOROLA Edge 60 Pro 5G (Pantone Dazzling Blue, 16GB RAM, 512GB Storage) | MediaTek Dimensity 8350 Processor | 50MP + 50MP...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['bose-quietcomfort-ultra-headphones-2nd-gen'] = { file: 'amazon-bose-quietcomfort-ultra-headphones-2nd-gen.jpg', title: "Sponsored Ad - New Bose QuietComfort Ultra Bluetooth Headphones (2nd Gen), Wireless Headphones with Spatial Audio, Over Ea...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['apple-airpods-max-usb-c-midnight'] = { file: 'amazon-apple-airpods-max-usb-c-midnight.jpg', title: "Apple AirPods Max 2 - Midnight ​​​​​​​", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['jbl-tune-770nc-wireless-over-ear-headphones'] = { file: 'amazon-jbl-tune-770nc-wireless-over-ear-headphones.jpg', title: "JBL Tune 770NC, BITA Award Winner- Most loved Over Ear Wireless Headphones, True Adaptive Noise Cancellation, Ambient awar...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['samsung-galaxy-buds3-pro-silver'] = { file: 'amazon-samsung-galaxy-buds3-pro-silver.jpg', title: "Single Right Ear Replacement Bud for Samsung Galaxy Buds 3 Pro AI Ture Wireless Bluetooth Earbuds(Silver)", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['marshall-emberton-iii-portable-speaker-black-brass'] = { file: 'amazon-marshall-emberton-iii-portable-speaker-black-brass.jpg', title: "Marshall Emberton II 20 W Wireless Bluetooth Portable Outdoor Speaker (Black & Brass)", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['samsung-galaxy-watch8-classic-46-mm-black'] = { file: 'amazon-samsung-galaxy-watch8-classic-46-mm-black.jpg', title: "Samsung Galaxy Watch8 Classic (46mm LTE, Black) with 3nm Processor | Dual GPS | Sapphire Glass & Stainless Steel | 5ATM & ...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['garmin-forerunner-970-gps-running-watch'] = { file: 'amazon-garmin-forerunner-970-gps-running-watch.jpg', title: "Case for Garmin Forerunner 970 Premium Running Smartwatch,WUNIAK Hard PC Screen Protector for Garmin 970,9H Tempered Glass...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['noise-colorfit-pro-6-max-smartwatch'] = { file: 'amazon-noise-colorfit-pro-6-max-smartwatch.jpg', title: "Noise Pro 6 Smart Watch:Intelligent AI, Endless AI Watch Faces, AI Companion, 1.85” AMOLED, EN2 Processor, Nebula UI 2.0, ...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['hp-elitebook-840-g11-core-ultra-5-16-gb'] = { file: 'amazon-hp-elitebook-840-g11-core-ultra-5-16-gb.jpg', title: "HP EliteBook 840 G11 14\" Notebook - WUXGA - Intel Core Ultra 5 135U - vPro Technology - 16 GB - 512 GB SSD - English Keyboard", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['lenovo-thinkpad-x1-carbon-gen-13-aura-edition'] = { file: 'amazon-lenovo-thinkpad-x1-carbon-gen-13-aura-edition.jpg', title: "Lenovo Gen 13 ThinkPad X1 Carbon Aura Edition Laptop with Intel Core Ultra 7 258V Processor, 14\" 2.8K OLED Non-Touch 120Hz...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['lenovo-legion-pro-5i-core-i9-rtx-5070-ti'] = { file: 'amazon-lenovo-legion-pro-5i-core-i9-rtx-5070-ti.jpg', title: "Lenovo Legion 5 2025 Intel Core Ultra 9 275HX | NVIDIA RTX 5070 8GB (16GB RAM/512GB SSD/WQXGA OLED/165Hz/15.1\" (38.3cm)/Wi...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['acer-swift-go-14-ai-snapdragon-x-plus-16-gb'] = { file: 'amazon-acer-swift-go-14-ai-snapdragon-x-plus-16-gb.jpg', title: "Acer Swift Go 14 AI PC, Qualcomm SnapdragonX Plus X1P-42-100,Office 2024 + M365 Basic,(16GB LPDDR5X/ 512GB SSD/14.5-inch W...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['asus-rog-zephyrus-g14-oled-ryzen-ai-9-rtx-5070'] = { file: 'amazon-asus-rog-zephyrus-g14-oled-ryzen-ai-9-rtx-5070.jpg', title: "ASUS ROG Zephyrus G14 (2026),Intel Core Ultra 9 386H (Series 3),RTX 5070-8GB,32GB RAM,1TB SSD,3K OLED,14\"(35.5 cm),120Hz,W...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['samsung-galaxy-tab-s11-wi-fi-128-gb-grey'] = { file: 'amazon-samsung-galaxy-tab-s11-wi-fi-128-gb-grey.jpg', title: "Samsung Galaxy Tab A11+ 128 Gb 27.9 Cm (11\") 6 Gb Wi-Fi 5, W129309779 (Cm (11) 6 Gb Wi-Fi 5 (802.11Ac) Grey)", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['samsung-neo-qled-qn90f-65-4k-smart-tv'] = { file: 'amazon-samsung-neo-qled-qn90f-65-4k-smart-tv.jpg', title: "Samsung 163 cm (65 inches) 4K Ultra HD Mini LED AI Smart Neo-QLED TV QA65QN90DAULXL (Carbon Silver)", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['sony-bravia-theatre-bar-9-dolby-atmos-soundbar'] = { file: 'amazon-sony-bravia-theatre-bar-9-dolby-atmos-soundbar.jpg', title: "Sony BRAVIA Theatre Bar 7, Single Soundbar, 9 Speaker Units, Surround Sound by Dolby Atmos, 360 Spatial Sound Mapping, Voi...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['samsung-the-freestyle-2nd-gen-smart-projector'] = { file: 'amazon-samsung-the-freestyle-2nd-gen-smart-projector.jpg', title: "Carrying Case for Samsung The Freestyle Projector | Compatible with The Freestyle Smart Portable Projector/2nd Gen Project...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['sony-playstation-5-pro-console-2-tb'] = { file: 'amazon-sony-playstation-5-pro-console-2-tb.jpg', title: "WD_Black SN850P NVMe SSD for PS5 2TB, PCIe Gen 4, Upto 7300MB/s Read, Certified by Sony", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['sony-dualsense-wireless-controller-cosmic-red'] = { file: 'amazon-sony-dualsense-wireless-controller-cosmic-red.jpg', title: "Sony DualSense Wireless Controller Red (PlayStation 5)", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['microsoft-xbox-wireless-controller-robot-white'] = { file: 'amazon-microsoft-xbox-wireless-controller-robot-white.jpg', title: "Xbox Accessory: Wireless Controller - Microsoft - Robot White", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['razer-blackwidow-v4-75-mechanical-keyboard'] = { file: 'amazon-razer-blackwidow-v4-75-mechanical-keyboard.jpg', title: "Razer BlackWidow V4 75% - Hot-swappable Mechanical Gaming Keyboard - Phantom Green Edition - US Layout FRML", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['sony-ghost-of-yotei-standard-edition-ps5'] = { file: 'amazon-sony-ghost-of-yotei-standard-edition-ps5.jpg', title: "Sony PS5 RATCHET & CLANK: RIFT APART", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['logitech-g-pro-x-2-lightspeed-gaming-headset'] = { file: 'amazon-logitech-g-pro-x-2-lightspeed-gaming-headset.jpg', title: "Detachable Boom Mic/Microphone for Logitech G PRO X 2 Lightspeed Wireless Gaming Headset/Logitech G PRO X Gaming Headphone...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['levis-mens-classic-trucker-denim-jacket'] = { file: 'amazon-levis-mens-classic-trucker-denim-jacket.jpg', title: "Levi Strauss Signature Gold mens Signature Trucker Jacket, Forty-niner, Small", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['nike-sportswear-club-mens-fleece-hoodie'] = { file: 'amazon-nike-sportswear-club-mens-fleece-hoodie.jpg', title: "Nike Boys Sportswear Club Fleece Pullover Hoodie", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['adidas-essentials-3-stripes-mens-track-jacket'] = { file: 'amazon-adidas-essentials-3-stripes-mens-track-jacket.jpg', title: "adidas Big & Tall Essentials 3-Stripe Tricot Track Jacket Bold Blue/Black", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['puma-essentials-logo-mens-cotton-t-shirt'] = { file: 'amazon-puma-essentials-logo-mens-cotton-t-shirt.jpg', title: "PUMA | Essentials Small Logo Men", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['fabindia-womens-cotton-block-print-kurta'] = { file: 'amazon-fabindia-womens-cotton-block-print-kurta.jpg', title: "Sponsored Ad - Fabindia Red Cotton Hand Block Print Knee Length Kurta", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['fossil-grant-chronograph-brown-leather-watch'] = { file: 'amazon-fossil-grant-chronograph-brown-leather-watch.jpg', title: "Fossil Grant Chronograph Brown Leather Men", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['adidas-ultraboost-5x-running-shoes-core-black'] = { file: 'amazon-adidas-ultraboost-5x-running-shoes-core-black.jpg', title: "adidas Womens Ultraboost Ultra Boost Light Running Sneakers Shoes - Black, Black/Black/Black, 5.5", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['adidas-samba-og-shoes-cloud-white'] = { file: 'amazon-adidas-samba-og-shoes-cloud-white.jpg', title: "adidas Originals Men Shoes | Samba Og | White/Black | | Casual Shoes", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['new-balance-fresh-foam-x-1080v14-running-shoes'] = { file: 'amazon-new-balance-fresh-foam-x-1080v14-running-shoes.jpg', title: "New Balance Women 1080 V14 Running Shoes", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['crocs-classic-clog-unisex-black'] = { file: 'amazon-crocs-classic-clog-unisex-black.jpg', title: "Crocs Classic Clog Unisex Adult Clogs, Black Camo Print | Croslite foam clog with an all-over black, grey and white marble...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['the-ordinary-niacinamide-10-zinc-1-serum-30-ml'] = { file: 'amazon-the-ordinary-niacinamide-10-zinc-1-serum-30-ml.jpg', title: "The Ordinary Niacinamide 10% + Zinc 1%, Brightening & Smoothing Serum for Blemish-Prone Skin, 30ml", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['minimalist-10-vitamin-c-face-serum-30-ml'] = { file: 'amazon-minimalist-10-vitamin-c-face-serum-30-ml.jpg', title: "Sponsored Ad - Minimalist Oil Control & Barrier Repair Combo | 10% Niacinamide Face Serum with Zinc 30ml + 10% Vitamin B5 ...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['neutrogena-ultra-sheer-sunscreen-spf-50-88-ml'] = { file: 'amazon-neutrogena-ultra-sheer-sunscreen-spf-50-88-ml.jpg', title: "Neutrogena Ultra sheer Sunscreen, SPF 50+, Ultra light, for oily and dry skin, 88 ml", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['cerave-moisturising-cream-for-dry-skin-454-g'] = { file: 'amazon-cerave-moisturising-cream-for-dry-skin-454-g.jpg', title: "Sponsored Ad - CeraVe Moisturizing Cream For Dry To Very Dry Skin (454g) - Formulated with 3 Essential Ceramides And Hyalu...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['davidoff-cool-water-eau-de-toilette-for-men-125-ml'] = { file: 'amazon-davidoff-cool-water-eau-de-toilette-for-men-125-ml.jpg', title: "Davidoff Cool Water For Men Eau De Toilette Spray 125ml", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['calvin-klein-ck-one-eau-de-toilette-200-ml'] = { file: 'amazon-calvin-klein-ck-one-eau-de-toilette-200-ml.jpg', title: "Calvin Klein One Unisex EDT, 200ml", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['philips-oneblade-pro-360-face-body-trimmer'] = { file: 'amazon-philips-oneblade-pro-360-face-body-trimmer.jpg', title: "Philips Norelco OneBlade Pro 360 Face + Body Electric Shaver, Beard Trimmer and Groomer, with 360 Blade Technology, 14-Len...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['philips-series-7000-wet-dry-electric-shaver'] = { file: 'amazon-philips-series-7000-wet-dry-electric-shaver.jpg', title: "Philips Shaver Series 7000, Wet & Dry Electric Shaver (Model S7885/63)", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['philips-hue-white-colour-ambiance-starter-kit-3-bulbs'] = { file: 'amazon-philips-hue-white-colour-ambiance-starter-kit-3-bulbs.jpg', title: "Philips Hue Starter kit: 3 GU10 Smart spotlights + Smart Button White and Colour Ambiance", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['ikea-tagarp-floor-uplighter-lamp-black'] = { file: 'amazon-ikea-tagarp-floor-uplighter-lamp-black.jpg', title: "Ikea Storhaga LED Table lamp dimmable Outdoor Black 304.327.38", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['trident-zero-twist-cotton-bath-towel-set-of-4'] = { file: 'amazon-trident-zero-twist-cotton-bath-towel-set-of-4.jpg', title: "Trident Cotton Collection - Charcoal Hand Towels (4pc) + Bath Towel (69x137cm) | 500 GSM | Air Rich Design", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['milton-thermosteel-flip-lid-bottle-1-litre-set-of-2'] = { file: 'amazon-milton-thermosteel-flip-lid-bottle-1-litre-set-of-2.jpg', title: "MILTON Aqua 1000 Stainless Steel Water Bottle, 1 pc, 950 ml, Silver (Pack of 2)", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['ikea-lack-coffee-table-white-stained-oak'] = { file: 'amazon-ikea-lack-coffee-table-white-stained-oak.jpg', title: "Ikea Lack Coffee Table, White Stained Oak effect90x55 cm (35 3/8x21 5/8 \")", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['wakefit-electric-height-adjustable-standing-desk'] = { file: 'amazon-wakefit-electric-height-adjustable-standing-desk.jpg', title: "Wakefit Study Table | 5 Yr Warranty | Standing desk, Computer Table for Home Pc, Electric Height adjustable, Digital Displ...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['prestige-omega-deluxe-granite-3-piece-cookware-set'] = { file: 'amazon-prestige-omega-deluxe-granite-3-piece-cookware-set.jpg', title: "Prestige Omega Deluxe Granite Alpha 3Piece BYK Non-Stick Cookware Set| Kadai 24cm with Glass Lid, Omni Tawa 28cm & Fry Pan...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['philips-hl7756-750-w-mixer-grinder-3-jars'] = { file: 'amazon-philips-hl7756-750-w-mixer-grinder-3-jars.jpg', title: "Philips HL7756 Mixer Grinder 750W, with 3 Stainless Steel Jars | 25 mins Continuous Grinding, Mixer Grinder for Kitchen wi...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['kitchenaid-artisan-stand-mixer-4-8-l-empire-red'] = { file: 'amazon-kitchenaid-artisan-stand-mixer-4-8-l-empire-red.jpg', title: "KitchenAid 4.8L Artisan Tilt-Head Stand Mixer – 300W, 10-Speed, Stainless Steel Bowl, Empire Red – 4.8L Capacity, Includes...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['morphy-richards-electric-kettle-1-5-l-stainless-steel'] = { file: 'amazon-morphy-richards-electric-kettle-1-5-l-stainless-steel.jpg', title: "Morphy Richards Plastic Hive Series 1.5L Kettle, 1500 Watt, Black", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['borosil-larah-opalware-dinner-set-35-pieces'] = { file: 'amazon-borosil-larah-opalware-dinner-set-35-pieces.jpg', title: "Sponsored Ad - Larah by Borosil 35 Pieces Red Bud Opalware Dinner Set for Family of 6 | Microwave & Dishwasher Safe Silk S...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['eureka-forbes-robo-vac-mop-with-lidar-navigation'] = { file: 'amazon-eureka-forbes-robo-vac-mop-with-lidar-navigation.jpg', title: "Eureka Forbes SmartClean Fully Automatic Cleaning Blitz Robotic Vacuum | 18,000Pa Suction| Mop Extend & Lift |LiDAR with D...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['blue-tokai-attikan-estate-medium-roast-coffee-beans-250-g'] = { file: 'amazon-blue-tokai-attikan-estate-medium-roast-coffee-beans-250-g.jpg', title: "Blue Tokai Coffee Roasters Attikan Estate - Medium Dark Roast | Whole Beans 250 Gram | Single Origin Whole Coffee | 100% A...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['india-gate-basmati-rice-classic-5-kg'] = { file: 'amazon-india-gate-basmati-rice-classic-5-kg.jpg', title: "Sponsored Ad - India Gate Gold Standard Classic Basmati Rice 5 Kg | 2 Years Aged | Extra Long Grains", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['aashirvaad-shudh-chakki-atta-whole-wheat-10-kg'] = { file: 'amazon-aashirvaad-shudh-chakki-atta-whole-wheat-10-kg.jpg', title: "Aashirvaad Superior MP Atta, 10kg, 100% Whole Wheat Flour, 0% Maida", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['fortune-sunlite-refined-sunflower-oil-5-l'] = { file: 'amazon-fortune-sunlite-refined-sunflower-oil-5-l.jpg', title: "Kten SINCE 1984 TASTY FOOD... HEALTHY MOOD! Fortune Sunlite Refined Sunflower Oil, 5L With Long Handle Dessert Spoon Free", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['cadbury-dairy-milk-silk-chocolate-bar-pack-of-4'] = { file: 'amazon-cadbury-dairy-milk-silk-chocolate-bar-pack-of-4.jpg', title: "Cadbury Dairy Milk Silk Ganache Chocolate Bar, 146 Gm (Pack Of 4)", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['surf-excel-matic-front-load-liquid-detergent-2-l'] = { file: 'amazon-surf-excel-matic-front-load-liquid-detergent-2-l.jpg', title: "Surf Excel Matic Liquid Detergent 2 kg for Front Load | Removes tough Stains in 1st wash | Superior Fragrance | Color Prot...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['fitbit-charge-6-fitness-tracker-with-google'] = { file: 'amazon-fitbit-charge-6-fitness-tracker-with-google.jpg', title: "Bicmice Charger Replacement for Fitbit Charge 5,Charge 6,Luxe Fitness Tracker USB Charging Cable Cord", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['penguin-the-god-of-small-things-by-arundhati-roy'] = { file: 'amazon-penguin-the-god-of-small-things-by-arundhati-roy.jpg', title: "God of Small Things: Booker Prize Winner 1997- English & Things Fall Apart (Penguin Modern Classics)", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['arihant-upsc-cse-prelims-2027-30-years-solved-papers'] = { file: 'amazon-arihant-upsc-cse-prelims-2027-30-years-solved-papers.jpg', title: "Arihant UPSC Prelims Test Series 2027 | General Studies Paper I | 30+ Tests (7 NCERT-Based, 12 Sectional & 10 Full-Length ...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['amazon-kindle-kindle-paperwhite-16-gb-7-display'] = { file: 'amazon-amazon-kindle-kindle-paperwhite-16-gb-7-display.jpg', title: "All-new Amazon Kindle Paperwhite (16 GB) – Our fastest Kindle ever, with new 7\" glare-free display and weeks of battery life", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['hot-wheels-rc-rally-racer-1-16-scale'] = { file: 'amazon-hot-wheels-rc-rally-racer-1-16-scale.jpg', title: "Bestie toys 1:16 Scale RC Drift Car, 30KM/H 4WD 2.4GHz Remote Control Cars with LED Light, Racing and 4 Drifting Wheels, 1...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['mamaearth-gentle-cleansing-baby-shampoo-400-ml'] = { file: 'amazon-mamaearth-gentle-cleansing-baby-shampoo-400-ml.jpg', title: "Mamaearth Coco Soft Shampoo with Coconut Milk & Turmeric, for babies, for Gentle Cleansing - 400 ml", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['royal-enfield-mlg-open-face-helmet-gloss-white'] = { file: 'amazon-royal-enfield-mlg-open-face-helmet-gloss-white.jpg', title: "Royal Enfield ISI Certified Open Face Riding MLG Helmet with Clear Visor Matt Black & White-Impact Protection, Scratch Res...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['70mai-a510-dash-cam-3k-with-rear-camera'] = { file: 'amazon-70mai-a510-dash-cam-3k-with-rear-camera.jpg', title: "70mai A510 HDR 3K Dual Channel Dash Cam, BITA 2026 Best Dashcam Award Winner, STARVIS 2 IMX675 Sensor, ADAS, GPS Logger, M...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['samsonite-proxis-55-cm-cabin-spinner-matt-graphite'] = { file: 'amazon-samsonite-proxis-55-cm-cabin-spinner-matt-graphite.jpg', title: "Samsonite Neopulse - Spinner S, Carry-On Baggage, 55 cm, 42 L, Grey (Matt Graphite)", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['apple-airtag-4-pack'] = { file: 'amazon-apple-airtag-4-pack.jpg', title: "Apple AirTag 4 Pack ​​​​​​​", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['whiskas-adult-wet-cat-food-tuna-in-jelly-12-x-85-g'] = { file: 'amazon-whiskas-adult-wet-cat-food-tuna-in-jelly-12-x-85-g.jpg', title: "Whiskas Wet Cat Food, Tuna in Jelly for Adult Cats (+1 Year) – 85 g Pouch (Pack of 12)", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['kong-classic-dog-chew-toy-medium'] = { file: 'amazon-kong-classic-dog-chew-toy-medium.jpg', title: "KONG Classic Dog Chew Toy, Durable Natural Rubber Fetch Toy for Dogs, Stuff Dog Treats, Interactive Treat Dispenser, Unpre...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['samsung-galaxy-a57-5g-256-gb'] = { file: 'amazon-samsung-galaxy-a57-5g-256-gb.jpg', title: "Samsung Galaxy A57 5G (Awesome Icyblue, 8GB RAM, 256GB Storage), Agentic AI, Triple Camera with Nightography Video, 2 Days...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['google-pixel-9-pro-xl-512-gb'] = { file: 'amazon-google-pixel-9-pro-xl-512-gb.jpg', title: "Google Pixel 9 Pro XL (Obsidian,16GB RAM 256GB Storage)", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['sony-ult-wear-wireless-headphones'] = { file: 'amazon-sony-ult-wear-wireless-headphones.jpg', title: "Sponsored Ad - Sony ULT Wear WH-ULT900N Noise Cancellation Wireless Bluetooth Over Ear Headphones with Massive Bass, Up to...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['google-pixel-9a-256-gb'] = { file: 'amazon-google-pixel-9a-256-gb.jpg', title: "Google Pixel 9a 5G (Obsidian, 8GB RAM, 256GB Storage)", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['sony-inzone-h9-ii-gaming-headset'] = { file: 'amazon-sony-inzone-h9-ii-gaming-headset.jpg', title: "Sony INZONE H9 II Wireless Noise Cancelling Gaming Headset,WH-G910N, Lightweight, Detachable Cardoid AI Mic, WH-1000XM6 Dr...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['sony-float-run-open-ear-headphones'] = { file: 'amazon-sony-float-run-open-ear-headphones.jpg', title: "Sony Float Run WI-OE610 Headphones Designed for Running, Cycling, Hiking & Other Sports, Gym Headphones with Open-Ear Desi...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['jbl-live-770nc-wireless-headphones'] = { file: 'amazon-jbl-live-770nc-wireless-headphones.jpg', title: "Sponsored Ad - JBL Live 770NC Wireless Over Ear Headphones with True Adaptive Noise Cancelling, Smart Ambient, Spatial Sou...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['bose-soundlink-around-ear-wireless-ii'] = { file: 'amazon-bose-soundlink-around-ear-wireless-ii.jpg', title: "AHG Premium SoundLink AE2 Ear Pads Cushions Compatible with Bose SoundLink AE2 / Bose SoundLink Around Ear ii Wireless Hea...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['jbl-tour-one-m3-smart-tx'] = { file: 'amazon-jbl-tour-one-m3-smart-tx.jpg', title: "JBL Tour One M3 - Smart Transmitter Wireless Over Ear Headphones with ANC 2.0, Hi-Res LDAC Audio,Spatial 360 Sound, 8 Mics...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['sennheiser-accentum-plus-wireless'] = { file: 'amazon-sennheiser-accentum-plus-wireless.jpg', title: "Sponsored Ad - Sennheiser ACCENTUM Plus Wireless Over Ear Headphones,German Design,Adaptive ANC,50H Battery,Sound Personal...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['jbl-quantum-910-wireless-gaming-headset'] = { file: 'amazon-jbl-quantum-910-wireless-gaming-headset.jpg', title: "M.G.R.J® Hard Travel Carrying Headphone Case Cover for JBL Quantum 100/810 / 910 Over Ear Gaming Headset (EVA|Black)", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['sennheiser-hd-450bt-wireless'] = { file: 'amazon-sennheiser-hd-450bt-wireless.jpg', title: "Heavy driver® Replacement Earpads for Sennheiser HD Series (HD 4.50BT/4.50BTNC/4.40BT/4.30G/4.20S/HD 458BT/450BT/400S/350B...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['sennheiser-hd-620s-closed-back-headphones'] = { file: 'amazon-sennheiser-hd-620s-closed-back-headphones.jpg', title: "Sennheiser HD 620S Closed‑Back Hi-Res Audiophile Headphones, German Design, 42 mm Angled Transducers & 38 mm Aluminum Coi...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['audio-technica-ath-s300bt-wireless-anc'] = { file: 'amazon-audio-technica-ath-s300bt-wireless-anc.jpg', title: "Audio-Technica ATH-S300BTBK Wireless Headphones, Black", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['audio-technica-ath-m50xbt2-wireless'] = { file: 'amazon-audio-technica-ath-m50xbt2-wireless.jpg', title: "Audio-Technica ATH-M50xBT2 Bluetooth Wireless Over Ear Headphones with Dual mic, 45MM Large-Aperture Drivers, 50-Hour Batt...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['boat-nirvana-space'] = { file: 'amazon-boat-nirvana-space.jpg', title: "boAt Nirvana Space, 360º Spatial Audio, Active Noise Cancellation (~32dB), 100Hrs Battery,4Mics ENx, Fast Charge, v5.3 Blu...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['oneplus-buds-nord-3'] = { file: 'amazon-oneplus-buds-nord-3.jpg', title: "OnePlus Nord Buds 3 Truly Wireless in Ear Bluetooth Earbuds with up to 32dB Active Noise Cancellation, 10mins for 11Hours ...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['jbl-clip-5-portable-speaker'] = { file: 'amazon-jbl-clip-5-portable-speaker.jpg', title: "JBL Clip 5, Wireless Ultra Portable Bluetooth Speaker, Pro Sound, 12hrs of Playtime, Integrated Carabiner, Vibrant Colors ...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['marshall-willen-ii'] = { file: 'amazon-marshall-willen-ii.jpg', title: "Sponsored Ad - Marshall Willen II Portable Bluetooth Speaker with 17+ Hours of Portable Playtime, Dust & Waterproof (IP67)...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['jbl-charge-essential-2'] = { file: 'amazon-jbl-charge-essential-2.jpg', title: "JBL Flip Essential 2, Wireless Portable Bluetooth Speaker with Deep Base, IPX7 Water & Dustproof (Without Mic, Black)", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['garmin-venu-3s-gps-smartwatch'] = { file: 'amazon-garmin-venu-3s-gps-smartwatch.jpg', title: "Sponsored Ad - Garmin Venu 3 Slate Stainless Steel Smart Watch Bezel with Black Case | AMOLED GPS Smartwatch | Speaker & M...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['garmin-forerunner-265-gps-watch'] = { file: 'amazon-garmin-forerunner-265-gps-watch.jpg', title: "Garmin Forerunner 265 Music 46mm, Black/Powder Gray GPS Running Smartwatch | AMOLED Display, Garmin Coach, HRV, Sleep, SpO...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['canon-eos-r50-v-creator-camera'] = { file: 'amazon-canon-eos-r50-v-creator-camera.jpg', title: "Sponsored Ad - Canon EOS R50 RF-S18-45mm f/4.5-6.3 is STM Mirrorless Camera (Black)- 4K Video Vlogging with 24.2 MP", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['garmin-vivoactive-6-gps-watch'] = { file: 'amazon-garmin-vivoactive-6-gps-watch.jpg', title: "Wearable4U Garmin Vivoactive 6 - Health & Fitness Smartwatch, 1.2 inch Bright AMOLED Touchscreen Display, GPS Sports Track...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['canon-powershot-v10-vlogging-camera'] = { file: 'amazon-canon-powershot-v10-vlogging-camera.jpg', title: "Canon PowerShot V10 13.1 MP Digital Camera with CMOS Sensor|13.1MP | 4K Vlogging Camera - Black", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['apple-macbook-air-15-inch-m3-16-gb-512-gb'] = { file: 'amazon-apple-macbook-air-15-inch-m3-16-gb-512-gb.jpg', title: "Apple 2026 MacBook Air 15″ Laptop with M5 chip: AI and Apple Intelligence, 38.91 cm (15.3″) Liquid Retina Display, 16GB Un...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['asus-expertbook-b9-oled'] = { file: 'amazon-asus-expertbook-b9-oled.jpg', title: "ASUS Zenbook 14 (2026),Smartchoice,Intel Core Ultra 9 285H,Intel Arc iGPU,16GB RAM,512GB SSD,OLED,Touch Screen,14\"(35.5 c...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['hp-pavilion-aero-13'] = { file: 'amazon-hp-pavilion-aero-13.jpg', title: "HP Pavilion Plus, 13th Gen Intel Core i5-1335U Laptop (16GB DDR5, 512GB SSD) IPS WUXGA Anti-Glare, 14\"/35.6cm, Win 11, MS ...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['hp-envy-x360-14-2-in-1'] = { file: 'amazon-hp-envy-x360-14-2-in-1.jpg', title: "FASHEEN AntiGlare Matte Screen Guard Compatible With HP Pavilion X360 2 in 1 Laptop/HP Envy (14 Inch, 35.5 cm, 16:9 Ratio,...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['hp-omnibook-ultra-flip-14'] = { file: 'amazon-hp-omnibook-ultra-flip-14.jpg', title: "HP OmniBook X Flip OLED Intel Core Ultra 5 226V, 40 Tops (16GB LPDDR5x,1TB SSD) 3K, Touch, 120hz, 14", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['dell-inspiron-14-plus-7440'] = { file: 'amazon-dell-inspiron-14-plus-7440.jpg', title: "Dell Inspiron 7440 2in1 Laptop,14 inch Touch FHD+ 250nits(35.56cm)Display, Intel Core i5-1334U Windows 11 Home, 16 GB DDR5...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['hp-omnibook-5-14'] = { file: 'amazon-hp-omnibook-5-14.jpg', title: "Sponsored Ad - HP OmniBook 3 ● Intel Core Ultra 5 322● 46 Tops● 16GB DDR5 (Upgradeable)● 512GB SSD● 2K●14", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['acer-nitro-v-16'] = { file: 'amazon-acer-nitro-v-16.jpg', title: "acer Nitro V 16, Intel Core i5 14th Gen - 14450HX, NVIDIA GeForce RTX 4050-6GB, 16 GB RAM, 512 GB SSD, WUXGA IPS,16\"/40.6 ...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['acer-predator-triton-neo-16'] = { file: 'amazon-acer-predator-triton-neo-16.jpg', title: "Acer Predator Helios Neo 16, Intel Core i7-14650HX, NVIDIA GeF RTX 5060-8GB DR7, 16GB DDR5/ 1TB SSD, 16\"/40.6cm WQXGA IPS,...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['acer-swift-x-14-creator'] = { file: 'amazon-acer-swift-x-14-creator.jpg', title: "Acer Swift Pro AI PC,Intel Core Ultra 5 Processor 125H,Office 2024 + M365 Basic,16GB LPDDR5 RAM/512 SSD, 35.56cm /14\" WUXG...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['msi-katana-15-hx'] = { file: 'amazon-msi-katana-15-hx.jpg', title: "MSI Katana 15 HX, Intel 14th Gen. i5-14450HX, 40CM FHD 144Hz Gaming Laptop (16GB/512GB NVMe SSD/Windows 11 Home/NVIDIA GeF...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['msi-thin-15-b13v'] = { file: 'amazon-msi-thin-15-b13v.jpg', title: "MSI Thin 15, Intel 13th Gen. i5-13420H, 40CM FHD 144Hz Gaming Laptop (16GB/512GB NVMe SSD/Windows 11 Home/NVIDIA GeForce R...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['msi-stealth-16-ai-studio'] = { file: 'amazon-msi-stealth-16-ai-studio.jpg', title: "MSI Stealth 14 AI Studio, Intel 1st Gen. Ultra 7 155H,Built-in AI, 36CM FHD+ 165Hz Gaming Laptop(16GB/1TB NVMe SSD/Windows...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['msi-cyborg-15-ai'] = { file: 'amazon-msi-cyborg-15-ai.jpg', title: "MSI Cyborg 15, Intel 12th Gen. i5-12450H, 40CM FHD 144Hz Gaming Laptop (16GB/512GB NVMe SSD/Windows 11 Home/MSO 2021/NVIDI...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['asus-rog-strix-g16'] = { file: 'amazon-asus-rog-strix-g16.jpg', title: "Sponsored Ad - ASUS ROG Strix G16, AMD Ryzen 9 8940HX, RTX 5070 Ti,140W TGP,16GB RAM,1TB SSD,FHD+,16\",165Hz,90WHrs,Windows...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['asus-tuf-gaming-a15'] = { file: 'amazon-asus-tuf-gaming-a15.jpg', title: "ASUS TUF A15 (2026),Smartchoice,AMD Ryzen 7 8845HS,RTX 3050,16GB RAM (Upgradeable Upto 64GB),512GB SSD,FHD,15.6\"(39.6 cm),Win 11,M365 Basic(1Y),Office 24,Black,2.3 Kg,FA506NCG-HN192WS,Gaming Laptop", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['asus-rog-flow-z13'] = { file: 'amazon-asus-rog-flow-z13.jpg', title: "ASUS ROG Flow Z13 (2025), AMD Ryzen AI MAX+ 395,AMD Radeon iGPU, 32GB/1TB, 2.5K QHD+,Touchscreen, 13.4\", 34 cm,Windows 11,...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['microsoft-surface-laptop-7-13-8-inch'] = { file: 'amazon-microsoft-surface-laptop-7-13-8-inch.jpg', title: "Magnetic Privacy Screen Filter for Microsoft Surface Laptop 7 13.8 Inch | Removable Anti Spy Blue Light Glare Laptop Priva...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['microsoft-surface-laptop-go-3'] = { file: 'amazon-microsoft-surface-laptop-go-3.jpg', title: "TELTREK ScreenGuard Compatible With Microsoft Surface Laptop Go 3/2/1 & Surface Laptop Go (2020-2023) 12.4 Inch PixelSense...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['sony-bravia-xr-a80l-55-inch'] = { file: 'amazon-sony-bravia-xr-a80l-55-inch.jpg', title: "Ultra Slim Tilt TV Wall Mount Bracket for Sony - 55\" Class BRAVIA XR A80L OLED 4K HDR Google TV - XR55A80L - Low Profile ...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['sony-bravia-xr-a80l-65-inch'] = { file: 'amazon-sony-bravia-xr-a80l-65-inch.jpg', title: "Sony 164 cm (65 inches) BRAVIA 8M2 Series 4K Ultra HD Smart OLED Google TV K-65XR80M2", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['samsung-neo-qled-qn90d-55-inch'] = { file: 'amazon-samsung-neo-qled-qn90d-55-inch.jpg', title: "Samsung 138 cm (55 inches) 4K Ultra HD Smart Neo QLED TV QA55QN90CAKLXL (Carbon Silver)", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['samsung-the-frame-ls03d-55-inch'] = { file: 'amazon-samsung-the-frame-ls03d-55-inch.jpg', title: "Dorca® Dust Care Television Cover for Samsung 138 cm (55 inches) The Frame Series 4K Ultra HD Smart QLED TV QA55LS03AAKLXL...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['samsung-neo-qled-qn90d-75-inch'] = { file: 'amazon-samsung-neo-qled-qn90d-75-inch.jpg', title: "Samsung 189 cm (75 inches) 4K Ultra HD Smart Neo QLED TV QA75QN90BAKXXL (Titan Black)", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['hisense-u7n-55-inch-mini-led'] = { file: 'amazon-hisense-u7n-55-inch-mini-led.jpg', title: "Hisense 55 Inch 55E7S Pro | Mini Dimming | Hi-QLED | Native 144Hz Game Mode | 48W Powerful Speakers | Gaming in Dolby Visi...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['hisense-u7n-65-inch-mini-led'] = { file: 'amazon-hisense-u7n-65-inch-mini-led.jpg', title: "Hisense 65 Inch 65E7S Pro | Mini Dimming | Hi-QLED | Native 144Hz Game Mode | 48W Powerful Speakers | Gaming in Dolby Visi...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['xiaomi-x-pro-qled-55-inch'] = { file: 'amazon-xiaomi-x-pro-qled-55-inch.jpg', title: "Xiaomi (139 cm) 55 inch X Pro 4K QLED | Dolby Vision & HDR10+| 34W Boom Box Speakers| 120Hz Game Booster| Gemini AI| Googl...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['microsoft-xbox-series-s-1-tb-robot-white'] = { file: 'amazon-microsoft-xbox-series-s-1-tb-robot-white.jpg', title: "Gaming Console: Microsoft Xbox Series X: 1TB - Robot White", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['nintendo-switch-oled-neon-set'] = { file: 'amazon-nintendo-switch-oled-neon-set.jpg', title: "Nintendo Switch OLED Console with Neon Red/Blue Joy-Con", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['nintendo-switch-lite-turquoise'] = { file: 'amazon-nintendo-switch-lite-turquoise.jpg', title: "Gaming Console: Nintendo Switch Lite - Turquoise", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['sony-dualsense-wireless-controller-chroma-teal'] = { file: 'amazon-sony-dualsense-wireless-controller-chroma-teal.jpg', title: "PlayStation Sony Ps5 Dualsense Wireless Controller - Chroma Teal", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['sony-access-controller-for-ps5'] = { file: 'amazon-sony-access-controller-for-ps5.jpg', title: "Playstation Sony Ps5 Dualsense Wireless Controller Console Video Game – Fortnite Limited Edition", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['microsoft-xbox-elite-wireless-controller-series-2'] = { file: 'amazon-microsoft-xbox-elite-wireless-controller-series-2.jpg', title: "Microsoft Xbox Play With Charge Kit V2 With Cable (Type-C), USB Type C, Black", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['microsoft-xbox-wireless-controller-deep-pink'] = { file: 'amazon-microsoft-xbox-wireless-controller-deep-pink.jpg', title: "Xbox Accessory: Wireless Controller - Microsoft - Deep Pink", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['hyperx-cloud-iii-wireless'] = { file: 'amazon-hyperx-cloud-iii-wireless.jpg', title: "HyperX Cloud III– Wireless Gaming Over Ear Headset, PC, PS5, PS4, Nintendo Switch, 53mm with Neodymium Magnets, 2.4GHz Wir...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['hyperx-cloud-alpha-wireless'] = { file: 'amazon-hyperx-cloud-alpha-wireless.jpg', title: "HyperX Cloud Alpha Wireless - Gaming Headset for PC, 300-hour battery life, DTS Headphone:X Spatial Audio, Memory foam, Du...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['hyperx-cloud-stinger-2-core'] = { file: 'amazon-hyperx-cloud-stinger-2-core.jpg', title: "HyperX Cloud Stinger 2 Core - Gaming Headset for PlayStation, Lightweight Over-Ear Headset with mic, Swivel-to-Mute Functi...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['hyperx-cloud-iii-s-wireless'] = { file: 'amazon-hyperx-cloud-iii-s-wireless.jpg', title: "HyperX Cloud III– Wireless Gaming Over Ear Headset, PC, PS5, PS4, Nintendo Switch, 53mm with Neodymium Magnets, 2.4GHz Wir...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['hyperx-cloud-mini-wireless'] = { file: 'amazon-hyperx-cloud-mini-wireless.jpg', title: "HyperX Cloud Mini – Wired Headset Compatible with PC, Chromebook, Nintendo Switch,PlayStation Controllers,Xbox Controller...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['logitech-g-g502-x-plus-wireless-mouse'] = { file: 'amazon-logitech-g-g502-x-plus-wireless-mouse.jpg', title: "Logitech G502 X Lightspeed Plus Wireless RGB Gaming Mouse - Optical Mouse with LIGHTFORCE Hybrid switches, LIGHTSYNC RGB, ...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['razer-blackwidow-v4-pro-mechanical-keyboard'] = { file: 'amazon-razer-blackwidow-v4-pro-mechanical-keyboard.jpg', title: "Sponsored Ad - Razer BlackWidow V4 Pro Smartchoice Mechanical Gaming Keyboard, Green Switch Clicky Keys, RGB Chroma Backli...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['razer-huntsman-v3-pro-tkl'] = { file: 'amazon-razer-huntsman-v3-pro-tkl.jpg', title: "Razer Huntsman V3 Pro TKL Smartchoice Wired Gaming Keyboard, Gen-2 Analog Optical Switches, Rapid Trigger & Snap Tap, Adju...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['razer-ornata-v3-x-keyboard'] = { file: 'amazon-razer-ornata-v3-x-keyboard.jpg', title: "Razer Ornata V3 X Gaming Keyboard: Low-Profile Keys-Silent Membrane Switches-Uv-Coated Keycaps-Spill Resistant-Chroma RGB ...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['razer-deathstalker-v2-pro'] = { file: 'amazon-razer-deathstalker-v2-pro.jpg', title: "Razer DeathStalker V2 Pro Tenkeyless - Wireless Low Profile Optical Gaming Keyboard (Linear Red Switch) - White Edition - ...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['razer-blackwidow-v4-75'] = { file: 'amazon-razer-blackwidow-v4-75.jpg', title: "Razer BlackWidow V4 75% Mechanical Gaming Keyboard:Hot-swappable Design-Compact & Durable-Orange Tactile Switches-Chroma R...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['electronic-arts-dragon-age-the-veilguard-ps5'] = { file: 'amazon-electronic-arts-dragon-age-the-veilguard-ps5.jpg', title: "Electronic Arts Dragon Age: The Veilguard Standard Edition PS5 | Videogame | English", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['rare-rabbit-mens-linen-blend-cuban-collar-shirt'] = { file: 'amazon-rare-rabbit-mens-linen-blend-cuban-collar-shirt.jpg', title: "Rare Rabbit Men Regular Solid Dark Purple Linen Blend Long Sleeve Button Shirt", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['rare-rabbit-mens-textured-knit-polo'] = { file: 'amazon-rare-rabbit-mens-textured-knit-polo.jpg', title: "Rare Rabbit Regular fit Textured Polo", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['jack-jones-mens-chris-original-cargo-pants'] = { file: 'amazon-jack-jones-mens-chris-original-cargo-pants.jpg', title: "Jack & Jones Olive Slim Fit Casual Cargo Pants", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['the-souled-store-mens-oversized-anime-t-shirt'] = { file: 'amazon-the-souled-store-mens-oversized-anime-t-shirt.jpg', title: "The Souled Store Demon Slayer: Sanemi Men and Boys Short Sleeves V Neck Dark Green Anime Graphic Printed Cotton Oversized ...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['only-womens-floral-wrap-midi-dress'] = { file: 'amazon-only-womens-floral-wrap-midi-dress.jpg', title: "ONLY Floral Printed Flounce Chiffon Fit & Flare Midi Dress", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['fabindia-womens-hand-block-print-kurta'] = { file: 'amazon-fabindia-womens-hand-block-print-kurta.jpg', title: "Sponsored Ad - Fabindia Green Cotton Hand Block Print Long Kurta", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['fabindia-womens-indigo-dabu-cotton-kurta'] = { file: 'amazon-fabindia-womens-indigo-dabu-cotton-kurta.jpg', title: "Fabindia Indigo Cotton Dabu Printed Long Kurta", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['fabindia-mens-cotton-handloom-kurta'] = { file: 'amazon-fabindia-mens-cotton-handloom-kurta.jpg', title: "Fabindia Fabnu Men Cotton Printed Mandarin Collar Full Sleeves Everyday Comfort Fit Kurta", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['fabindia-womens-ajrakh-print-anarkali'] = { file: 'amazon-fabindia-womens-ajrakh-print-anarkali.jpg', title: "Fabindia Blue Cotton Ajrakh Print Midi Dress", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['aurelia-womens-embroidered-anarkali-set'] = { file: 'amazon-aurelia-womens-embroidered-anarkali-set.jpg', title: "Aurelia Women’s Geometric Foil Print Embroidered Anarkali Woven Kurta with Trouser and Dupatta Set", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['columbia-mens-powder-lite-hooded-jacket'] = { file: 'amazon-columbia-mens-powder-lite-hooded-jacket.jpg', title: "Columbia Men Powder Lite II Hooded Jacket upto -10°c", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['columbia-womens-heavenly-long-hooded-jacket'] = { file: 'amazon-columbia-womens-heavenly-long-hooded-jacket.jpg', title: "Columbia Women Heavenly Long Hooded Jacket Upto -10°c", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['columbia-mens-watertight-ii-rain-jacket'] = { file: 'amazon-columbia-mens-watertight-ii-rain-jacket.jpg', title: "Columbia Men Omni-Tech Watertight II Rain Jacket for Hiking | Trekking | Waterproof", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['asics-gel-kayano-31'] = { file: 'amazon-asics-gel-kayano-31.jpg', title: "ASICS Mens Gel-Kayano 31 Running Shoes", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['asics-gel-pulse-16'] = { file: 'amazon-asics-gel-pulse-16.jpg', title: "ASICS Gel-Pulse 16", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['new-balance-fresh-foam-x-880v14'] = { file: 'amazon-new-balance-fresh-foam-x-880v14.jpg', title: "New Balance Women 880v14 Running Shoes", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['new-balance-fresh-foam-x-860v14'] = { file: 'amazon-new-balance-fresh-foam-x-860v14.jpg', title: "New Balance Mens Fresh Foam X 860 V14 | Road Running Shoes", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['new-balance-1080v13-running-shoes'] = { file: 'amazon-new-balance-1080v13-running-shoes.jpg', title: "New Balance Men 1080 V13 Running Shoe", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['new-balance-arishi-v4-running-shoes'] = { file: 'amazon-new-balance-arishi-v4-running-shoes.jpg', title: "New Balance Kids Fresh Foam Arishi V4 Running Shoe (Little Kid)", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['skechers-max-cushioning-premier-2-0'] = { file: 'amazon-skechers-max-cushioning-premier-2-0.jpg', title: "Skechers Men Max Cushioning Premier 2.0 Running Shoe", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['skechers-go-run-ride-11'] = { file: 'amazon-skechers-go-run-ride-11.jpg', title: "Skechers Men Go Run Ride 11 Running Shoe", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['skechers-go-run-consistent-2-0'] = { file: 'amazon-skechers-go-run-consistent-2-0.jpg', title: "Skechers Mens Go Run Consistent 2.0 - Senna Sneaker", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['converse-run-star-hike-high-top'] = { file: 'amazon-converse-run-star-hike-high-top.jpg', title: "Sponsored Ad - Converse Chuck Taylor All Star High Top Black Monochrome Sneakers", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['converse-one-star-pro-suede'] = { file: 'amazon-converse-one-star-pro-suede.jpg', title: "Converse Unisex Chuck Taylor All Star Suede High Top Sneaker", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['adidas-forum-low-cl'] = { file: 'amazon-adidas-forum-low-cl.jpg', title: "adidas Originals Men Basketball Shoes | Forum Low Cl | White | Size-9.5 |", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['birkenstock-arizona-birko-flor-black'] = { file: 'amazon-birkenstock-arizona-birko-flor-black.jpg', title: "Birkenstock Arizona Birko-Flor Sandals, Black Oiled Leather, 6-6.5", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['birkenstock-mayari-birko-flor-stone'] = { file: 'amazon-birkenstock-mayari-birko-flor-stone.jpg', title: "Birkenstock Mayari - Birko-Flor™ & Birkibuc™ Stone Birkibuc EU 36 (US Women", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['birkenstock-gizeh-birko-flor-mocca'] = { file: 'amazon-birkenstock-gizeh-birko-flor-mocca.jpg', title: "Birkenstock Gizeh Birko-Flor Mocca Sandal - 7M / 5M", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['birkenstock-florida-soft-footbed'] = { file: 'amazon-birkenstock-florida-soft-footbed.jpg', title: "Birkenstock Florida Birko-Flor Soft Footbed - Blue", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['birkenstock-milano-birko-flor'] = { file: 'amazon-birkenstock-milano-birko-flor.jpg', title: "Birkenstock Original Milano ESD Birko Flor Narrow Width, Black L9 M7 40,0", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['birkenstock-arizona-big-buckle'] = { file: 'amazon-birkenstock-arizona-big-buckle.jpg', title: "Birkenstock Arizona Big Buckle EVA | Walking Sandals", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['puma-fuse-3-0-training-shoes'] = { file: 'amazon-puma-fuse-3-0-training-shoes.jpg', title: "Puma Mens Fuse 3.0 Unwavered Training Shoe", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['cerave-hydrating-cleanser-473-ml'] = { file: 'amazon-cerave-hydrating-cleanser-473-ml.jpg', title: "Sponsored Ad - CeraVe Hydrating Cleanser For Normal To Dry Skin (473ml) - Non-Foaming Face Wash with Hyaluronic Acid And C...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['cerave-moisturising-cream-454-g'] = { file: 'amazon-cerave-moisturising-cream-454-g.jpg', title: "CeraVe Moisturizing Cream For Dry To Very Dry Skin (454g) - Formulated with 3 Essential Ceramides And Hyaluronic Acid | No...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['cerave-pm-facial-moisturising-lotion-52-ml'] = { file: 'amazon-cerave-pm-facial-moisturising-lotion-52-ml.jpg', title: "Sponsored Ad - CeraVe PM Facial Moisturizing Lotion For Normal To Dry Skin (52ml) - Formulated With 3 Essential Ceramides,...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['cerave-sa-smoothing-cleanser-236-ml'] = { file: 'amazon-cerave-sa-smoothing-cleanser-236-ml.jpg', title: "CeraVe SA Smoothing Cleanser- Salicylic Acid Face Wash (236ml) and Moisturizing Cream (50ml) Combo | Exfoliation and hydra...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['cerave-daily-moisturising-lotion-473-ml'] = { file: 'amazon-cerave-daily-moisturising-lotion-473-ml.jpg', title: "Sponsored Ad - CeraVe Moisturizing Lotion For Normal to Dry Skin (473ml) - Formulated With 3 Essential Ceramides And Hyalu...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['minimalist-vitamin-c-10-face-serum-30-ml'] = { file: 'amazon-minimalist-vitamin-c-10-face-serum-30-ml.jpg', title: "ORGANOSILVIA Face Serum with Natural Aroma – 30ml | Minimalist 10% Advanced Vitamin C Serum for Glowing Skin | Brightening...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['maybelline-colossal-kajal-black-0-35-g'] = { file: 'amazon-maybelline-colossal-kajal-black-0-35-g.jpg', title: "Maybelline New York Colossal Kajal Pencil, Black, 0.35G And New York Hypercurl Mascara Waterproof, Black, 9.2Ml Matte Finish", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['lakme-absolute-matte-melt-liquid-lip-color-red'] = { file: 'amazon-lakme-absolute-matte-melt-liquid-lip-color-red.jpg', title: "Lakme Ultimate Glam Liquid Lipstick, Red Reviva | Moisturising Matte |Blurs Lip Lines | Non Sticky Formula | Intense Color...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['davidoff-run-wild-edt-100-ml'] = { file: 'amazon-davidoff-run-wild-edt-100-ml.jpg', title: "Davidoff The Game for Men EDT spray 100ml", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['davidoff-adventure-edt-100-ml'] = { file: 'amazon-davidoff-adventure-edt-100-ml.jpg', title: "Davidoff The Game for Men EDT spray 100ml (Pack of 2)", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['davidoff-cool-water-intense-edp-125-ml'] = { file: 'amazon-davidoff-cool-water-intense-edp-125-ml.jpg', title: "Davidoff Cool Water Eau de Parfum Intense For Men 125ml", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['philips-oneblade-360-face-body'] = { file: 'amazon-philips-oneblade-360-face-body.jpg', title: "Philips Norelco OneBlade 360 Face Body Hybrid Electric Shaver QP2834/70", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['philips-multigroom-series-7000-mg7745'] = { file: 'amazon-philips-multigroom-series-7000-mg7745.jpg', title: "RLSOCO Case for Philips MG7745/15 Multigroom Series 7000 & 9000 Multigroom MG7736/13,MG7785/20,MG7736/25,MG7720/15,MG7720/...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['garmin-forerunner-970-gps-running-watch'] = { file: 'amazon-garmin-forerunner-970-gps-running-watch.jpg', title: "FASHEEN 2 Pack SmartWatch Screenguard Compatible With Garmin Forerunner 970 || Full Edge to Edge Hydrogel TPU Watch Screen...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['dell-xps-13-copilot-pc-snapdragon-x-elite-16-gb'] = { file: 'amazon-dell-xps-13-copilot-pc-snapdragon-x-elite-16-gb.jpg', title: "2025 Dell XPS 13 9345 Laptop, Copilot+ AI PC (13.4\" FHD+ 120Hz, Qualcomm 12-Core Snapdragon X Elite, 32GB 8848MT/s RAM, 1T...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['lenovo-legion-pro-5i-core-i9-rtx-5070-ti'] = { file: 'amazon-lenovo-legion-pro-5i-core-i9-rtx-5070-ti.jpg', title: "Lenovo Legion Pro 5 2025, Intel Core Ultra 9 275HX, NVIDIA RTX 5070 8GB, 32GB RAM, 1TB SSD, WQXGA OLED, 16 (40.6cm), 165H...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['logitech-g502-x-plus-wireless-gaming-mouse'] = { file: 'amazon-logitech-g502-x-plus-wireless-gaming-mouse.jpg', title: "Logitech G502 X Lightspeed Plus Wireless RGB Gaming Mouse - Optical Mouse with LIGHTFORCE Hybrid switches, LIGHTSYNC RGB, ...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['u-s-polo-assn-mens-slim-fit-pique-polo-t-shirt'] = { file: 'amazon-u-s-polo-assn-mens-slim-fit-pique-polo-t-shirt.jpg', title: "U.S. Polo ASSN. Slim Fit Polo T-Shirt for Men- Ribbed Collar, Pique Knit - Half Sleeves Casual Mens Tshirt", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['allen-solly-mens-regular-fit-oxford-shirt-sky-blue'] = { file: 'amazon-allen-solly-mens-regular-fit-oxford-shirt-sky-blue.jpg', title: "Allen Solly Men Blue Regular Fit Solid Full Sleeves Formal Shirts", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['titan-edge-ceramic-slim-analog-watch'] = { file: 'amazon-titan-edge-ceramic-slim-analog-watch.jpg', title: "Sponsored Ad - Titan Edge Bicolour Quartz Analog Blue Dial Blue Ceramic Strap Watch for Men/NT1696KC05", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['nike-pegasus-42-mens-road-running-shoes'] = { file: 'amazon-nike-pegasus-42-mens-road-running-shoes.jpg', title: "Nike Mens Pegasus 42 Running Shoes", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['adidas-ultraboost-5x-running-shoes-core-black'] = { file: 'amazon-adidas-ultraboost-5x-running-shoes-core-black.jpg', title: "adidas Men Ultraboost 5X M Mer Motorsport Shoes Black 9", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['mac-matte-lipstick-ruby-woo'] = { file: 'amazon-mac-matte-lipstick-ruby-woo.jpg', title: "Mac Ruby Woo Lipstick", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['green-soul-monster-ultimate-ergonomic-chair-black-grey'] = { file: 'amazon-green-soul-monster-ultimate-ergonomic-chair-black-grey.jpg', title: "Green Soul: Jupiter Superb Ergonomic Office Chair (2024, Black), Venue Study Office Table (1 Drawer, 1 Cabinet) (Rolex Bro...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['trident-zero-twist-cotton-bath-towel-set-of-4'] = { file: 'amazon-trident-zero-twist-cotton-bath-towel-set-of-4.jpg', title: "TRIDENT Soft Comfort Air Rich Towel 100% Cotton Hand Towel for Daily use, 500 GSM Highly Absorbent Towels for Men/Women, 4...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['urban-ladder-camden-2-seater-sofa-sand-beige'] = { file: 'amazon-urban-ladder-camden-2-seater-sofa-sand-beige.jpg', title: "URBAN LIVING CRAFT | Sheesham Wood 2 Seater Sofa in Beige Colour | Wooden Sofa 2 Seater (Beige)", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['arihant-upsc-cse-prelims-2027-30-years-solved-papers'] = { file: 'amazon-arihant-upsc-cse-prelims-2027-30-years-solved-papers.jpg', title: "Arihant UPSC Civil Services Prelims 2027 Test Series Combo (GS Paper I + CSAT Paper II) | 30+ Tests with NCERT-Based,Secti...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['hot-wheels-rc-rally-racer-1-16-scale'] = { file: 'amazon-hot-wheels-rc-rally-racer-1-16-scale.jpg', title: "​Hot Wheels RC Ferrari SF90 Stradale Assetto Fiorano, Toy Car | Remote-Control 1:64 Scale Toy Car Recharges with USB Cabl...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['samsung-galaxy-a47-5g-128-gb'] = { file: 'amazon-samsung-galaxy-a47-5g-128-gb.jpg', title: "Samsung Galaxy M47 5G Mobile (Blaze Blue, 6GB RAM, 128GB Storage, 6000mAh Battery)| 50MP OIS| Snapdragon Processor| LPDDR5...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['sony-ult-wear-wireless-headphones'] = { file: 'amazon-sony-ult-wear-wireless-headphones.jpg', title: "Sony ULT Wear WH-ULT900N Noise Cancellation Wireless Bluetooth Over Ear Headphones with Massive Bass, Up to 50Hrs Battery-...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['jbl-tour-one-m3-smart-tx'] = { file: 'amazon-jbl-tour-one-m3-smart-tx.jpg', title: "JBL Tour One M3 - Smart Transmitter Wireless Over Ear Headphones with ANC 2.0, Hi-Res LDAC Audio,Spatial 360 Sound, 8 Mics...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['sennheiser-accentum-plus-wireless'] = { file: 'amazon-sennheiser-accentum-plus-wireless.jpg', title: "Sponsored Ad - Sennheiser ACCENTUM Plus Wireless Over Ear Headphones,German Design,Adaptive ANC,50H Battery,Sound Personal...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['boat-nirvana-space'] = { file: 'amazon-boat-nirvana-space.jpg', title: "boAt Nirvana Space, 360º Spatial Audio, Active Noise Cancellation (~32dB), 100Hrs Battery,4Mics ENx, Fast Charge, v5.3 Blu...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['oneplus-buds-nord-3'] = { file: 'amazon-oneplus-buds-nord-3.jpg', title: "OnePlus Nord Buds 3r TWS Earbuds up to 54 Hours Playback, 2-mic Clear Calls, 3D Spatial Audio, AI Translation, 12.4mm Driv...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['marshall-willen-ii'] = { file: 'amazon-marshall-willen-ii.jpg', title: "Marshall Willen II Portable Bluetooth Speaker with 17+ Hours of Portable Playtime, Dust & Waterproof (IP67) - Cream.", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['garmin-forerunner-265-gps-watch'] = { file: 'amazon-garmin-forerunner-265-gps-watch.jpg', title: "Sponsored Ad - Garmin Forerunner 265 Music 46mm, Black/Powder Gray GPS Running Smartwatch | AMOLED Display, Garmin Coach, ...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['canon-eos-r50-v-creator-camera'] = { file: 'amazon-canon-eos-r50-v-creator-camera.jpg', title: "Canon EOS R50 V Smartchoice Mirrorless Camera Kit with RF-S14-30mm F4-6.3 is STM PZ Lens – Black | 24.2 MP APS-C Sensor, 4...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['garmin-vivoactive-6-gps-watch'] = { file: 'amazon-garmin-vivoactive-6-gps-watch.jpg', title: "Garmin vivoactive 6 GPS Smartwatch with AMOLED Display, Lunar Gold | Advanced Health and Fitness Features, Up to 11 Day Ba...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['hp-omnibook-ultra-flip-14'] = { file: 'amazon-hp-omnibook-ultra-flip-14.jpg', title: "HP OmniBook Ultra Flip (Previously Spectre) Intel Core Ultra 7 256V 47 Tops (16GB LPDDR5X, 1TB SSD) OLED, 500 nits,14", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['hp-omnibook-5-14'] = { file: 'amazon-hp-omnibook-5-14.jpg', title: "HP OmniBook 5 OLED (Previously Pavilion), Snapdragon X Processor 45 Tops (16GB LPDDR5x, 1 TB SSD), 2K 14", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['acer-nitro-v-16'] = { file: 'amazon-acer-nitro-v-16.jpg', title: "acer Nitro V 15, Intel core i7-13th Gen 13620H,NVIDIA GeForce RTX - 5050 8GB, 16 GB,512 GB,Full HD IPS,15.6\"/39.62 cm,165 ...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['acer-predator-triton-neo-16'] = { file: 'amazon-acer-predator-triton-neo-16.jpg', title: "RAYA TPU Keyboard Cover for Acer Predator Helios Neo 16 (PHN16-72 / PHN16-73 / PHN16S-71) & Acer Nitro V 16S ANV16S-71 [ N...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['msi-katana-15-hx'] = { file: 'amazon-msi-katana-15-hx.jpg', title: "MSI Katana 15 HX Intel Core i9 14th Gen 14900HX (16GB/1TB SSD/Windows 11 Home/RTX 5050 8GB GDDR7/165Hz QHD Display/2 Year ...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['msi-thin-15-b13v'] = { file: 'amazon-msi-thin-15-b13v.jpg', title: "MSI Thin 15, Intel 13th Gen. i5-13420H, 40CM FHD 144Hz Gaming Laptop (16GB/512GB NVMe SSD/Windows 11 Home/NVIDIA GeForce R...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['msi-stealth-16-ai-studio'] = { file: 'amazon-msi-stealth-16-ai-studio.jpg', title: "MSI Stealth 16 AI Studio, Intel 1st Gen. Ultra 9 185H, Built-in AI, 41CM QHD+ 240Hz Gaming Laptop (32GB/2TB NVMe SSD/Windo...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['asus-rog-strix-g16'] = { file: 'amazon-asus-rog-strix-g16.jpg', title: "Sponsored Ad - ASUS ROG Strix G16,Intel Core Ultra 9 275HX,Gaming Laptop(RTX 5070-8GB/115W TGP/32GB/1TB /2.5K QHD+/16\"/240...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['asus-tuf-gaming-a15'] = { file: 'amazon-asus-tuf-gaming-a15.jpg', title: "ASUS TUF Gaming A15, Gaming Laptop, AMD Ryzen 7 155, RTX 3050 GPU (16GB/512GB/39.62 cms (15.6) FHD/Windows 11 Home) FA506N...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['asus-rog-flow-z13'] = { file: 'amazon-asus-rog-flow-z13.jpg', title: "KEANBOLL 3 Pack ASUS ROG Flow Z13 GZ302 13.2\" Laptop Tablet Screen Protector Anti-Glare Anti-Fingerprint Matte Screen Prot...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['xiaomi-x-pro-qled-55-inch'] = { file: 'amazon-xiaomi-x-pro-qled-55-inch.jpg', title: "Xiaomi (139 cm) 55 inch X Pro 4K QLED | Dolby Vision & HDR10+| 34W Boom Box Speakers| 120Hz Game Booster| Gemini AI| Googl...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['sony-playstation-5-slim-digital-edition-1-tb'] = { file: 'amazon-sony-playstation-5-slim-digital-edition-1-tb.jpg', title: "Sony PlayStation5 Gaming Console (Slim) | Disc Edition - 1TB", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['sony-dualsense-wireless-controller-volcanic-red'] = { file: 'amazon-sony-dualsense-wireless-controller-volcanic-red.jpg', title: "Sony DualSense Wireless Controller Red (PlayStation 5)", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['hyperx-cloud-iii-wireless'] = { file: 'amazon-hyperx-cloud-iii-wireless.jpg', title: "HyperX Cloud III Over Ear Wired Gaming Headset, PC, PS5, Xbox Series X|S, Angled 53Mm Drivers, Memory Foam, Durable Frame,...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['hyperx-cloud-alpha-wireless'] = { file: 'amazon-hyperx-cloud-alpha-wireless.jpg', title: "HyperX Cloud Stinger 2 Smartchoice Wireless Gaming Headset Compatible with PC. Noise-Cancelling Swivel-to-Mute Microphone,...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['hyperx-cloud-iii-s-wireless'] = { file: 'amazon-hyperx-cloud-iii-s-wireless.jpg', title: "HyperX Cloud Earbuds III S – Wired Earbuds, PC; Nintendo Switch; Console Controller, Dynamic; 14.3 mm Driver, Silicone Ear...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['hyperx-cloud-mini-wireless'] = { file: 'amazon-hyperx-cloud-mini-wireless.jpg', title: "HyperX Cloud Jet Smartchoice Dual Wireless Gaming Headset, 2.4GHz dongle, Bluetooth 5.2, PC, PS5, Nintendo Switch, Steam D...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['razer-ornata-v3-x-keyboard'] = { file: 'amazon-razer-ornata-v3-x-keyboard.jpg', title: "Razer Ornata V3 Tenkeyless - Low Profile Gaming Mechanical Membrane Wired Keyboard-Black-RZ03-04880100-R3M1", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['the-souled-store-mens-oversized-anime-t-shirt'] = { file: 'amazon-the-souled-store-mens-oversized-anime-t-shirt.jpg', title: "The Souled Store Cotton Men T-Shirt, Oversized Fit", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['biba-womens-embroidered-co-ord-set'] = { file: 'amazon-biba-womens-embroidered-co-ord-set.jpg', title: "Biba Women Teal Blue Dyed Co-ord Set_38", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['fabindia-mens-cotton-handloom-kurta'] = { file: 'amazon-fabindia-mens-cotton-handloom-kurta.jpg', title: "Fabindia Fabnu Men Cotton Printed Mandarin Collar Full Sleeves Everyday Comfort Fit Kurta", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['manyavar-mens-jacquard-festive-kurta-set'] = { file: 'amazon-manyavar-mens-jacquard-festive-kurta-set.jpg', title: "DIWAS BY MANYAVAR Mens Kurta Jacket Set", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['manyavar-mens-printed-silk-kurta-set'] = { file: 'amazon-manyavar-mens-printed-silk-kurta-set.jpg', title: "Manyavar Mens Kurta Pyjama Set", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['asics-gel-cumulus-27'] = { file: 'amazon-asics-gel-cumulus-27.jpg', title: "ASICS Womens Gel-Cumulus 27 Running Shoes", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['clarks-un-aldric-step-leather-loafer'] = { file: 'amazon-clarks-un-aldric-step-leather-loafer.jpg', title: "Clarks Mens Bradley Step, Beeswax Leather, 8 | Casual Shoes", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['puma-velocity-nitro-3'] = { file: 'amazon-puma-velocity-nitro-3.jpg', title: "Puma Men Velocity Nitro™ 3 Running Shoe", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['puma-foreverrun-nitro-2'] = { file: 'amazon-puma-foreverrun-nitro-2.jpg', title: "Puma Mens Foreverrun Nitro™ 2 Running Shoe", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['puma-fast-r-nitro-elite-2'] = { file: 'amazon-puma-fast-r-nitro-elite-2.jpg', title: "Puma Mens Fast-r Nitro™ Elite 2 Running Shoe", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['cerave-daily-moisturising-lotion-473-ml'] = { file: 'amazon-cerave-daily-moisturising-lotion-473-ml.jpg', title: "CeraVe Moisturizing Lotion For Dry Skin (473ml) - Formulated With 3 Essential Ceramides And Hyaluronic Acid | Non-Comedoge...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['lakme-insta-eye-liner-black-9-ml'] = { file: 'amazon-lakme-insta-eye-liner-black-9-ml.jpg', title: "LAKMÉ Insta Eye Liner, Black, Water Resistant, Long-Lasting, 9 ml & Lakme Eyebrow Pencil, Black, 1.2g Matte Finish", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['philips-smart-wi-fi-led-bulb-9-w-b22'] = { file: 'amazon-philips-smart-wi-fi-led-bulb-9-w-b22.jpg', title: "Philips WiZ 9W B22 Wi-Fi & Bluetooth LED Smart Bulb with Music Sync, Compatible with Amazon Alexa & Google Assistant, 16 M...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['philips-smart-led-strip-2-m'] = { file: 'amazon-philips-smart-led-strip-2-m.jpg', title: "Philips Wiz 2-Meter Smart LED Strip Light with Philips 10-watt Smart B22 LED Bulb |RGB Strip Light & LED Bulb for Gaming a...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['philips-smart-wi-fi-candle-bulb-5-5-w'] = { file: 'amazon-philips-smart-wi-fi-candle-bulb-5-5-w.jpg', title: "PHILIPS LED Candle Bulb SceneSwitch 5W | 3 in 1 Cool Daylight Neutral White Warm White | E14 Small Screw Base | Dimmable A...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['philips-led-downlight-12-w-warm-white'] = { file: 'amazon-philips-led-downlight-12-w-warm-white.jpg', title: "PHILIPS 12-watt Round Surface Full Glow | Surface LED Downlight for Ceiling, Warm White(Pack of 1),Polycarbonate", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['philips-portable-dusk-to-dawn-night-light'] = { file: 'amazon-philips-portable-dusk-to-dawn-night-light.jpg', title: "Philips LED SereneShine Plug-in Night Lamp 0.5W | Warm White LED Night Light | Soft Glare-Free Illumination | Energy Effic...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['chumbak-sunset-city-ceramic-table-lamp'] = { file: 'amazon-chumbak-sunset-city-ceramic-table-lamp.jpg', title: "Chumbak Folklore Bloom Ikat Table Lamp | Multicolour Floral Print Metal & Fabric Bedside Lamp for Bedroom, Living Room Dec...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['chumbak-lotus-garden-serving-tray'] = { file: 'amazon-chumbak-lotus-garden-serving-tray.jpg', title: "Sponsored Ad - Chumbak Jaipur Gardens Kasuti Wooden Serving Tray | Teal Peacock Folk Art | Tea & Snack Tray for Home & Off...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['chumbak-handpainted-mango-wood-photo-frame'] = { file: 'amazon-chumbak-handpainted-mango-wood-photo-frame.jpg', title: "Sponsored Ad - Chumbak Wild Bloom Paper Mache Photo Frame – Red | Hand-Painted Decorative Table Photo Frame for Home Décor...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['wakefit-microfibre-reversible-comforter-king'] = { file: 'amazon-wakefit-microfibre-reversible-comforter-king.jpg', title: "Wakefit Reversible Comforter - Single Bed | Supersoft Floral Design Quilt AC Blanket for Winters | 220 GSM Virgin Siliconi...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['wakefit-cloud-comfort-mattress-protector-king'] = { file: 'amazon-wakefit-cloud-comfort-mattress-protector-king.jpg', title: "Wakefit 100% Waterproof Premium Terry Cotton Mattress Protector, King - 78x72 inch | Breathable and Hypoallergenic Ultra S...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['spaces-zero-twist-cotton-bath-towel-set-of-4'] = { file: 'amazon-spaces-zero-twist-cotton-bath-towel-set-of-4.jpg', title: "Comfort Spaces 12 Pc Towel Set, 100% Cotton Zero Twist, Blush | Zero Twist Cotton, Quick Dry Ultra Soft, 4 Bath 4 Hand 4 W...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['spaces-hydrocotton-bath-sheet-pair'] = { file: 'amazon-spaces-hydrocotton-bath-sheet-pair.jpg', title: "Comfort Spaces Turkish Cotton Bath Sheet Set 2 Piece, 35 x 70, Beige | 500 GSM Soft Quick Dry Oversized, Breathable Absorb...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['spaces-quick-dry-gym-towel-set-of-2'] = { file: 'amazon-spaces-quick-dry-gym-towel-set-of-2.jpg', title: "Spaces Hygro 100% Cotton Hand Towels | Spa & Gym Towel | Blooms Softer After Every Wash | Ultra Absorbent & Quick Dry | 2 ...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['spaces-textured-cotton-bath-mat'] = { file: 'amazon-spaces-textured-cotton-bath-mat.jpg', title: "Spaces Hygro Cotton 2000 GSM Machine Tufted Small Premium Bath Mat for Daily use | Anti-Skid, Good Absorbent & Soft Feel –...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['spaces-turkish-cotton-robe-large'] = { file: 'amazon-spaces-turkish-cotton-robe-large.jpg', title: "Spaces Airsoft 100% 100% Cotton 300 GSM Dobby Plain Large Bath Robe | Super Soft, Breathable & Quick Dry - Grey", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['ikea-helmer-drawer-unit-white'] = { file: 'amazon-ikea-helmer-drawer-unit-white.jpg', title: "Ikea Alloy Steel HELMER White 40176101 Drawer Unit with Casters, White, Bedroom", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['ikea-jonaxel-wire-basket-frame'] = { file: 'amazon-ikea-jonaxel-wire-basket-frame.jpg', title: "IKEA Risatorp Wire Basket White 902.816.18 Size 9 ?x10 ?x7", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['ikea-komplement-pull-out-tray-75-cm'] = { file: 'amazon-ikea-komplement-pull-out-tray-75-cm.jpg', title: "Sponsored Ad - Ikea KOMPLEMENT Drawer Divider for Pull-Out Tray, Light Grey, 75x58 cm, with Patterned Paper Napkin, Light ...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['ikea-variera-shelf-insert-white'] = { file: 'amazon-ikea-variera-shelf-insert-white.jpg', title: "IKEA Variera Shelf Insert White Cupboard Organiser Large | Cupboard Organiser", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['prestige-omega-deluxe-5-piece-cookware-set'] = { file: 'amazon-prestige-omega-deluxe-5-piece-cookware-set.jpg', title: "Sponsored Ad - Prestige Omega Deluxe Non-Stick Cookware 3 Pc Set |PFOA Free 5-Layer Coating | Omni Tawa 25 cm | Fry Pan 24...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['prestige-platino-plus-3-piece-fry-pan-set'] = { file: 'amazon-prestige-platino-plus-3-piece-fry-pan-set.jpg', title: "Prestige Omega Deluxe Plus BYK Set of 3(Omni Tawa 25 cm- 1U, Fry Pan 24 cm/1.7L -1 U & Kadai with Glass Lid 24 cm/2.4 L-1...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['prestige-alpha-deluxe-cooktop-set'] = { file: 'amazon-prestige-alpha-deluxe-cooktop-set.jpg', title: "Prestige Pic 20.0 Omega Stainless Steel Deluxe Byk Induction Cooktop, Black, Set of 3", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['havells-crysta-1-5-l-electric-kettle'] = { file: 'amazon-havells-crysta-1-5-l-electric-kettle.jpg', title: "Havells Electric Kettle Altro 1250 Watts 1.5 liters, Double Layered Cool Touch Outer Body | 304 Rust Resistant SS Inner Bo...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['instant-vortex-mini-4-l-air-fryer'] = { file: 'amazon-instant-vortex-mini-4-l-air-fryer.jpg', title: "KENT Classic Hot Air Fryer 4L 1300 W | 80% Less Oil | Instant Electric Air Fryer | Auto Cut Off | Fry, Grill, Roast, Stea...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['corelle-winter-frost-white-dinner-set-21-pc'] = { file: 'amazon-corelle-winter-frost-white-dinner-set-21-pc.jpg', title: "Corelle 21 Pc Dinner Set Provence Garden (Vitrelle Glass, White)", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['corelle-country-cottage-dinner-set-21-pc'] = { file: 'amazon-corelle-country-cottage-dinner-set-21-pc.jpg', title: "Sponsored Ad - Corelle 21 Pc Square Round Dinner Set - Dancing Leaves", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['corelle-portofino-dinner-set-21-pc'] = { file: 'amazon-corelle-portofino-dinner-set-21-pc.jpg', title: "CORELLE Glass 21 Pc Dinner Set Wheeler Diamonds", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['corelle-indigo-speckle-dinner-set-18-pc'] = { file: 'amazon-corelle-indigo-speckle-dinner-set-18-pc.jpg', title: "Corelle 1134352 Dinnerware Set, 18-Piece, Indigo Speckle", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['corelle-classic-cafe-blue-dinner-set-21-pc'] = { file: 'amazon-corelle-classic-cafe-blue-dinner-set-21-pc.jpg', title: "Sponsored Ad - CORELLE Blue Floral 21 Pcs Dinner Set for Family of 6 | Plates, Bowls & Platter for Dining| Vitrelle 3 Laye...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['corelle-city-block-dinner-set-21-pc'] = { file: 'amazon-corelle-city-block-dinner-set-21-pc.jpg', title: "Corelle 21 Pieces Dinner Set City Block, Microwave & Dishwasher Safe, Elegant Crockery for Dining & Gifting (White)", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['corelle-impressions-splendor-dinner-set-21-pc'] = { file: 'amazon-corelle-impressions-splendor-dinner-set-21-pc.jpg', title: "Corelle 21 Pc Square Round Dinner Set - European Herbs", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['corelle-square-splendor-dinner-set-16-pc'] = { file: 'amazon-corelle-square-splendor-dinner-set-16-pc.jpg', title: "Corelle 21 Pc Square Round Dinner Set - POM POM White", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['corelle-simple-lines-dinner-set-21-pc'] = { file: 'amazon-corelle-simple-lines-dinner-set-21-pc.jpg', title: "CORELLE Glass 21 Pc Square Round Dinner Set - Simple Lines (White)", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['corelle-ocean-blues-dinner-set-21-pc'] = { file: 'amazon-corelle-ocean-blues-dinner-set-21-pc.jpg', title: "Corelle 21 Pc Square Round Dinner Set - Simple Sketch White", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['ifb-neo-diva-bx-6-5-kg-front-load'] = { file: 'amazon-ifb-neo-diva-bx-6-5-kg-front-load.jpg', title: "IFB 6.5 Kg 5 Star with 9 Swirl Wash, Steam Refresh, Eco Inverter Motor, DeepClean® Ai Powered Fully Automatic Front Load W...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['daikin-ftkm50uv-1-5-ton-inverter-split-ac'] = { file: 'amazon-daikin-ftkm50uv-1-5-ton-inverter-split-ac.jpg', title: "SRIVI 5 Years Warranty Compatible for Daikin Split Inverter Ac Remote 1.5 Ton 5 Star, (Model No. FTKM50U, 2022) White, Rem...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['daikin-mtkm50uv-1-5-ton-5-star-ac'] = { file: 'amazon-daikin-mtkm50uv-1-5-ton-5-star-ac.jpg', title: "VNQ Ac Remote Compatible with Daikin 1.5 Ton 5 Star Inverter Split AC Remoet MTKM50U, White", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['daikin-ftkl35uv-1-ton-inverter-split-ac'] = { file: 'amazon-daikin-ftkl35uv-1-ton-inverter-split-ac.jpg', title: "GMQ Air Conditioner Remote Compatible for Daikin AC Remote Model- FTKL35UV Daikin 1 Ton 3 Star Split Inverter AC Remote Wh...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['daikin-mtkm60uv-1-8-ton-inverter-ac'] = { file: 'amazon-daikin-mtkm60uv-1-8-ton-inverter-ac.jpg', title: "The Furnishing Tree Split AC Cover Set of Indoor and Outdoor Unit Used for 1.8 Ton Daikin MTKM60 Ditzy Pattern Grey on Bla...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['daikin-ftkm71uv-2-ton-inverter-split-ac'] = { file: 'amazon-daikin-ftkm71uv-2-ton-inverter-split-ac.jpg', title: "Daikin 2.0 Ton 3 Star Inverter Split AC (Copper, PM2.5 Filter, FTKL71XV16, White,Ideal upto 300 sq ft)", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['voltas-vertis-gold-2-ton-5-star-ac'] = { file: 'amazon-voltas-vertis-gold-2-ton-5-star-ac.jpg', title: "5 Years Warranty Compatible for Voltas Inverter Split/Window AC Remote 1.5 2 Ton 3 Star WiFi/AQI/ADJ/183V Vectra Gold Func...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['puma-suede-classic-xxi-sneakers-peacoat'] = { file: 'flipkart-puma-suede-classic-xxi-sneakers-peacoat.jpg', title: "PUMA Suede Classic SD Sneakers For Men", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['arihant-upsc-cse-prelims-2027-30-years-solved-papers'] = { file: 'flipkart-arihant-upsc-cse-prelims-2027-30-years-solved-papers.jpg', title: "Arihant UPSC Civil Services Prelims CSAT 2027 Complete Combo (Paper II) | Aptitude Syllabus Coverage with Latest Questions & Trends, Strategy Planner, 16 Years Topicwise PYQs (2011–2026), Solved Papers, Elimination Techniques, 30+ Mock Tests, OMR Sheets, AIR Mock Test & 10 Practice Sets", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['motorola-moto-g96-5g-256-gb'] = { file: 'flipkart-motorola-moto-g96-5g-256-gb.jpg', title: "FLOUNDER MOTOROLA MOTO G96 ( 5g ) ORIGINAL LCD MIDDLE FRAME WITH PROPER LOGO Front Panel", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['sennheiser-accentum-plus-wireless'] = { file: 'flipkart-sennheiser-accentum-plus-wireless.jpg', title: "Sennheiser Accentum Plus Wireless Over Ear Headphones Designed in Germany with 50Hr Battery Bluetooth", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['boat-nirvana-space'] = { file: 'flipkart-boat-nirvana-space.jpg', title: "boAt Nirvana Space w/ 360 Spatial Audio, ANC(~32dB), 100HRS Battery & Dual Pairing Bluetooth", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['oneplus-buds-nord-3'] = { file: 'flipkart-oneplus-buds-nord-3.jpg', title: "OnePlus Nord Buds 3r TWS Earbud, 10min charge for 8hr Music, 3D Audio, 2-mic call Bluetooth", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['canon-eos-r50-v-creator-camera'] = { file: 'flipkart-canon-eos-r50-v-creator-camera.jpg', title: "Canon EOS R50 Mirrorless Camera RF - S 18 - 45 mm f/4.5 - 6.3 IS STM and RF - S 55 - 210 mm f/5 - 7.1 ...", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['hp-omnibook-5-14'] = { file: 'flipkart-hp-omnibook-5-14.jpg', title: "HP Omnibook 5 2k OLED Intel Core 5 Series 3 320 - (8 GB/512 GB SSD/Windows 11 Home) 14-mh0017TU Laptop", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['acer-nitro-v-16'] = { file: 'flipkart-acer-nitro-v-16.jpg', title: "Acer Nitro 5 Intel Core i5 14th Gen 14450HX - (16 GB/1 TB SSD/Windows 11 Home/8 GB Graphics/NVIDIA GeF...", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['asus-rog-strix-g16'] = { file: 'flipkart-asus-rog-strix-g16.jpg', title: "ASUS ROG Strix G16 (2026) Intel Core i7 14th Gen 14650HX - (16 GB/1 TB SSD/Windows 11 Home/8 GB Graphi...", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['asus-tuf-gaming-a15'] = { file: 'flipkart-asus-tuf-gaming-a15.jpg', title: "ASUS TUF Gaming A15 AMD Ryzen 7 Octa Core 7435HS - (16 GB/512 GB SSD/Windows 11 Home/4 GB Graphics/NVI...", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['benq-tk700sti-4k-gaming-projector'] = { file: 'flipkart-benq-tk700sti-4k-gaming-projector.jpg', title: "BenQ TK700 (3200 lm / 1 Speaker / Remote Controller) 4K UHD HDR , Excellent Colors 96% REC 709, Upto 200inches Screen Size, Sports Mode, eARC, 16ms Low Input Lag, 2D Keystone,3D,Inbox Amazon 4K Fire Stick Home Cinema Projector", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['xiaomi-x-pro-qled-55-inch'] = { file: 'flipkart-xiaomi-x-pro-qled-55-inch.jpg', title: "XIAOMI F Pro 138 cm (55 inch) QLED Ultra HD (4K) Smart Fire TV with 34W Box Speakers | Dolby Surround ...", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['manyavar-mens-printed-silk-kurta-set'] = { file: 'flipkart-manyavar-mens-printed-silk-kurta-set.jpg', title: "DIWAS by Manyavar Men Printed Straight Kurta", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['manyavar-mens-jacquard-festive-kurta-set'] = { file: 'flipkart-manyavar-mens-jacquard-festive-kurta-set.jpg', title: "MANYAVAR Men Kurta Churidar Set", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['converse-chuck-70-high-top-parchment'] = { file: 'flipkart-converse-chuck-70-high-top-parchment.jpg', title: "Converse Converse Unisex Chuck 70 High Top Sneaker Sneakers For Men", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['wakefit-cloud-comfort-mattress-protector-king'] = { file: 'flipkart-wakefit-cloud-comfort-mattress-protector-king.jpg', title: "Wakefit King Size Fitted Terry Cotton Waterproof, Stretchable, Breathable Mattress Cover", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['prestige-platino-plus-3-piece-fry-pan-set'] = { file: 'flipkart-prestige-platino-plus-3-piece-fry-pan-set.jpg', title: "Prestige Omega Deluxe Plus BYK Set of 3-Tawa, Fry Pan & Kadai with Glass Lid Induction Bottom Non-Stick Coated Cookware Set", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['prestige-alpha-deluxe-cooktop-set'] = { file: 'flipkart-prestige-alpha-deluxe-cooktop-set.jpg', title: "Prestige Omega Deluxe Granite Alpha 3Pcs BYK-Kadai 24cm Glass Lid+Tawa 28cm+Fry Pan 24cm Induction Bottom Non-Stick Coated Cookware Set", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['samsung-galaxy-s25-fe-5g-256-gb-icy-blue'] = { file: 'amazon-samsung-galaxy-s25-fe-5g-256-gb-icy-blue.jpg', title: "Samsung Galaxy S25 FE 5G Smartphone with Galaxy AI (JetBlack, 8GB RAM, 256GB Storage), 12MP Front Camera, ProVisual Engin...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['noise-colorfit-pro-6-max-smartwatch'] = { file: 'amazon-noise-colorfit-pro-6-max-smartwatch.jpg', title: "ACM Watch Strap 22mm compatible with Noise Colorfit Pro 6 Max Smartwatch | Magnetic Silicone Luxury Colorful Band", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['apple-macbook-pro-14-m5-16-gb-512-gb-space-black'] = { file: 'amazon-apple-macbook-pro-14-m5-16-gb-512-gb-space-black.jpg', title: "Apple 2026 MacBook Pro Laptop with M5 Pro chip with 15‑core CPU and 16‑core GPU: Built for AI, 35.97 cm (14.2″) Liquid Ret...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['manyavar-mens-silk-blend-kurta-set-ivory'] = { file: 'amazon-manyavar-mens-silk-blend-kurta-set-ivory.jpg', title: "Manyavar Men Kurta Set", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['adidas-ultraboost-5x-running-shoes-core-black'] = { file: 'amazon-adidas-ultraboost-5x-running-shoes-core-black.jpg', title: "adidas Men Ultraboost 5X M Mer Motorsport Shoes Black 11", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['trident-zero-twist-cotton-bath-towel-set-of-4'] = { file: 'amazon-trident-zero-twist-cotton-bath-towel-set-of-4.jpg', title: "Trident Cotton Collection - Charcoal Hand Towels (4pc) + Bath Towel (69x137cm) | 500 GSM | Air Rich Design", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['arihant-upsc-cse-prelims-2027-30-years-solved-papers'] = { file: 'amazon-arihant-upsc-cse-prelims-2027-30-years-solved-papers.jpg', title: "Arihant UPSC Prelims Test Series 2027 | General Studies Paper I | 30+ Tests (7 NCERT-Based, 12 Sectional & 10 Full-Length ...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['hot-wheels-rc-rally-racer-1-16-scale'] = { file: 'amazon-hot-wheels-rc-rally-racer-1-16-scale.jpg', title: "​Hot Wheels RC Ford Mustang, Remote-Control Toy Car | 1:64 Scale Booster Button to Race & Stunt On or Off Track, Recharge ...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['steelbird-sba-21-gt-full-face-helmet-matt-black'] = { file: 'amazon-steelbird-sba-21-gt-full-face-helmet-matt-black.jpg', title: "Steelbird SBA-21 GT Full Face Helmet with Clear Visor with Skull Cap", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['american-tourister-ivy-68-cm-medium-hard-luggage-navy'] = { file: 'amazon-american-tourister-ivy-68-cm-medium-hard-luggage-navy.jpg', title: "American Tourister Ivy 2.0 | Medium Size Check-in Trolley Bag (68 cm) | 360° 8 Wheel Travel Luggage | Hard Case Polypropyl...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['sony-ult-wear-wireless-headphones'] = { file: 'amazon-sony-ult-wear-wireless-headphones.jpg', title: "Sponsored Ad - Sony ULT Wear WH-ULT900N Noise Cancellation Wireless Bluetooth Over Ear Headphones with Massive Bass, Up to...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['jbl-live-670nc-on-ear-headphones'] = { file: 'amazon-jbl-live-670nc-on-ear-headphones.jpg', title: "SOULWIT Replacement Earpads for JBL Live 670NC On-Ear Headphones(Do Not Fit Tune 670NC), Ear Pads Cushions with Soft Prote...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['jbl-tour-one-m3-smart-tx'] = { file: 'amazon-jbl-tour-one-m3-smart-tx.jpg', title: "JBL Tour One M3 - Smart Transmitter Wireless Over Ear Headphones with ANC 2.0, Hi-Res LDAC Audio,Spatial 360 Sound, 8 Mics...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['sennheiser-accentum-plus-wireless'] = { file: 'amazon-sennheiser-accentum-plus-wireless.jpg', title: "Sponsored Ad - Sennheiser ACCENTUM Plus Wireless Over Ear Headphones,German Design,Adaptive ANC,50H Battery,Sound Personal...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['boat-nirvana-space'] = { file: 'amazon-boat-nirvana-space.jpg', title: "boAt Nirvana Space, 360º Spatial Audio, Active Noise Cancellation (~32dB), 100Hrs Battery,4Mics ENx, Fast Charge, v5.3 Blu...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['oneplus-buds-nord-3'] = { file: 'amazon-oneplus-buds-nord-3.jpg', title: "OnePlus Nord Buds 3 Truly Wireless in Ear Bluetooth Earbuds with up to 32dB Active Noise Cancellation, 10mins for 11Hours ...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['marshall-willen-ii'] = { file: 'amazon-marshall-willen-ii.jpg', title: "Sponsored Ad - Marshall Willen II Portable Bluetooth Speaker with 17+ Hours of Portable Playtime, Dust & Waterproof (IP67)...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['garmin-forerunner-265-gps-watch'] = { file: 'amazon-garmin-forerunner-265-gps-watch.jpg', title: "Sponsored Ad - Garmin Forerunner 265 Music 46mm, Black/Powder Gray GPS Running Smartwatch | AMOLED Display, Garmin Coach, ...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['garmin-vivoactive-6-gps-watch'] = { file: 'amazon-garmin-vivoactive-6-gps-watch.jpg', title: "Wearable4U Garmin Vivoactive 6 - Health & Fitness Smartwatch, 1.2 inch Bright AMOLED Touchscreen Display, GPS Sports Track...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['canon-eos-r50-v-creator-camera'] = { file: 'amazon-canon-eos-r50-v-creator-camera.jpg', title: "Sponsored Ad - Canon EOS R50 RF-S18-45mm f/4.5-6.3 is STM Mirrorless Camera (Black)- 4K Video Vlogging with 24.2 MP", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['hp-omnibook-ultra-flip-14'] = { file: 'amazon-hp-omnibook-ultra-flip-14.jpg', title: "HP OmniBook X Flip OLED Intel Core Ultra 5 226V, 40 Tops (16GB LPDDR5x,1TB SSD) 3K, Touch, 120hz, 14", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['dell-latitude-7350'] = { file: 'amazon-dell-latitude-7350.jpg', title: "Keyboard Cover for Dell Latitude 3340 13.3\", Dell Latitude 5320 5330 5340 5350 13.3\" Dell Latitude 7320 7330 7340 7350 13....", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['hp-omnibook-5-14'] = { file: 'amazon-hp-omnibook-5-14.jpg', title: "Sponsored Ad - HP OmniBook 5 ● Intel Core 5 Series 3 Processor 320 ● 8GB LPDDR5 ●512GB SSD● 2K OLED● Gorilla Glass● 14", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['acer-nitro-v-16'] = { file: 'amazon-acer-nitro-v-16.jpg', title: "acer Nitro V 16, Intel Core i5 14th Gen - 14450HX, NVIDIA GeForce RTX 4050-6GB, 16 GB RAM, 512 GB SSD, WUXGA IPS,16\"/40.6 ...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['msi-katana-15-hx'] = { file: 'amazon-msi-katana-15-hx.jpg', title: "MSI Katana 15 HX, Intel 14th Gen. i5-14450HX, 40CM FHD 144Hz Gaming Laptop (16GB/512GB NVMe SSD/Windows 11 Home/NVIDIA GeF...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['msi-thin-15-b13v'] = { file: 'amazon-msi-thin-15-b13v.jpg', title: "MSI Thin 15, Intel 13th Gen. i5-13420H, 40CM FHD 144Hz Gaming Laptop (16GB/512GB NVMe SSD/Windows 11 Home/NVIDIA GeForce R...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['msi-stealth-16-ai-studio'] = { file: 'amazon-msi-stealth-16-ai-studio.jpg', title: "MSI Stealth 14 AI Studio, Intel 1st Gen. Ultra 7 155H,Built-in AI, 36CM FHD+ 165Hz Gaming Laptop(16GB/1TB NVMe SSD/Windows...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['asus-rog-strix-g16'] = { file: 'amazon-asus-rog-strix-g16.jpg', title: "Sponsored Ad - ASUS ROG Strix G16, AMD Ryzen 9 8940HX, RTX 5070 Ti,140W TGP,16GB RAM,1TB SSD,FHD+,16\",165Hz,90WHrs,Windows...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['asus-tuf-gaming-a15'] = { file: 'amazon-asus-tuf-gaming-a15.jpg', title: "ASUS TUF A15 (2026),Smartchoice,AMD Ryzen 7 8845HS,RTX 3050,16GB RAM (Upgradeable Upto 64GB),512GB SSD,FHD,15.6\"(39.6 cm),Win 11,M365 Basic(1Y),Office 24,Black,2.3 Kg,FA506NCG-HN192WS,Gaming Laptop", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['asus-rog-flow-z13'] = { file: 'amazon-asus-rog-flow-z13.jpg', title: "ASUS ROG Flow Z13 (2025), AMD Ryzen AI MAX+ 395,AMD Radeon iGPU, 32GB/1TB, 2.5K QHD+,Touchscreen, 13.4\", 34 cm,Windows 11,...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['samsung-the-frame-ls03d-55-inch'] = { file: 'amazon-samsung-the-frame-ls03d-55-inch.jpg', title: "Samsung 55 inches The Frame 4K Samsung Vision AI Smart TV QA55LS03HEULXL", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['hyperx-cloud-iii-wireless'] = { file: 'amazon-hyperx-cloud-iii-wireless.jpg', title: "HyperX Cloud III– Wireless Gaming Over Ear Headset, PC, PS5, PS4, Nintendo Switch, 53mm with Neodymium Magnets, 2.4GHz Wir...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['hyperx-cloud-alpha-wireless'] = { file: 'amazon-hyperx-cloud-alpha-wireless.jpg', title: "HyperX Cloud Alpha Wireless - Gaming Headset for PC, 300-hour battery life, DTS Headphone:X Spatial Audio, Memory foam, Du...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['hyperx-cloud-iii-s-wireless'] = { file: 'amazon-hyperx-cloud-iii-s-wireless.jpg', title: "HyperX Cloud III– Wireless Gaming Over Ear Headset, PC, PS5, PS4, Nintendo Switch, 53mm with Neodymium Magnets, 2.4GHz Wir...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['hyperx-cloud-mini-wireless'] = { file: 'amazon-hyperx-cloud-mini-wireless.jpg', title: "HyperX Cloud Mini – Wired Headset Compatible with PC, Chromebook, Nintendo Switch,PlayStation Controllers,Xbox Controller...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['fabindia-mens-cotton-handloom-kurta'] = { file: 'amazon-fabindia-mens-cotton-handloom-kurta.jpg', title: "Fabindia Fabnu Men Cotton Printed Mandarin Collar Full Sleeves Everyday Comfort Fit Kurta", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['manyavar-mens-jacquard-festive-kurta-set'] = { file: 'amazon-manyavar-mens-jacquard-festive-kurta-set.jpg', title: "Manyavar Mens Kurta Churidar Set", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['cerave-daily-moisturising-lotion-473-ml'] = { file: 'amazon-cerave-daily-moisturising-lotion-473-ml.jpg', title: "Sponsored Ad - CeraVe Moisturizing Lotion For Normal to Dry Skin (473ml) - Formulated With 3 Essential Ceramides And Hyalu...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['philips-smart-wi-fi-candle-bulb-5-5-w'] = { file: 'amazon-philips-smart-wi-fi-candle-bulb-5-5-w.jpg', title: "PHILIPS LED Candle Bulb SceneSwitch 5W | 3 in 1 Cool Daylight Neutral White Warm White | E14 Small Screw Base | Dimmable A...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['philips-portable-dusk-to-dawn-night-light'] = { file: 'amazon-philips-portable-dusk-to-dawn-night-light.jpg', title: "Philips LED SereneShine Plug-in Night Lamp 0.5W | Cool White LED Night Light | Soft Glare-Free Illumination | Energy Effic...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['chumbak-sunset-city-ceramic-table-lamp'] = { file: 'amazon-chumbak-sunset-city-ceramic-table-lamp.jpg', title: "Chumbak Marigold Tiger Table Lamp | Multicolour Tiger Print Metal & Fabric Bedside Lamp for Bedroom, Living Room Decor | F...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['chumbak-indigo-floral-cushion-cover-set'] = { file: 'amazon-chumbak-indigo-floral-cushion-cover-set.jpg', title: "Sponsored Ad - Chumbak The Knight Cushion Cover Set of 2, Multicolor Jacquard Woven Cushion Covers with Horse Motif, 40x40...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['chumbak-lotus-garden-serving-tray'] = { file: 'amazon-chumbak-lotus-garden-serving-tray.jpg', title: "Chumbak Wood & MDF Tribal Blossom Pink Serving Tray", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['chumbak-handpainted-mango-wood-photo-frame'] = { file: 'amazon-chumbak-handpainted-mango-wood-photo-frame.jpg', title: "Chumbak Dal Lake Botanical Photo Frame – Beadwork Floral Design Inspired by Kashmir – Handmade Table Decor & Gifting Frame...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['wakefit-microfibre-reversible-comforter-king'] = { file: 'amazon-wakefit-microfibre-reversible-comforter-king.jpg', title: "Wakefit Reversible Comforter - Double Bed | Grid Design Quilt AC Blanket for All-Season, Lightweight & Super-Soft | 120 GS...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['wakefit-cloud-comfort-mattress-protector-king'] = { file: 'amazon-wakefit-cloud-comfort-mattress-protector-king.jpg', title: "Wakefit 100% Waterproof Terry Bamboo Mattress Protector, King - 72x72 inch | Breathable and Hypoallergenic Ultra Soft Fitt...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['spaces-textured-cotton-bath-mat'] = { file: 'amazon-spaces-textured-cotton-bath-mat.jpg', title: "Spaces Large Bath Mat – Polyester | 50 cm x 80 cm | 1539 GSM | Anti-Skid | High Absorbency | Soft Feel", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['spaces-turkish-cotton-robe-large'] = { file: 'amazon-spaces-turkish-cotton-robe-large.jpg', title: "Spaces Airsoft 100% 100% Cotton 300 GSM Dobby Plain Large Bath Robe | Super Soft, Breathable & Quick Dry - Light Violet", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['ikea-samla-clear-storage-box-45-l'] = { file: 'amazon-ikea-samla-clear-storage-box-45-l.jpg', title: "Ikea SAMLA Clip lock for box 45/65 l, black", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['prestige-omega-deluxe-5-piece-cookware-set'] = { file: 'amazon-prestige-omega-deluxe-5-piece-cookware-set.jpg', title: "Sponsored Ad - Prestige Omega Granite Non-Stick 3 Pc Cookware Set with Glass Lid | 5-Layer Coating | Gas & Induction Compa...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['prestige-platino-plus-3-piece-fry-pan-set'] = { file: 'amazon-prestige-platino-plus-3-piece-fry-pan-set.jpg', title: "Prestige Omega Deluxe Plus Aluminium Non-Stick Build Your Kitchen Set of 3 Cookware Set-Omni Tawa 25cm, Fry Pan 24cm/1.7L,...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['prestige-alpha-deluxe-cooktop-set'] = { file: 'amazon-prestige-alpha-deluxe-cooktop-set.jpg', title: "Prestige 5 Litre Stainless Steel Deluxe Alpha Svachh Outer Lid Deep Pressure Pan Cooker | 10Y Warranty | Deep Lid for Spil...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['corelle-indigo-speckle-dinner-set-18-pc'] = { file: 'amazon-corelle-indigo-speckle-dinner-set-18-pc.jpg', title: "Sponsored Ad - CORELLE Modena 18 Pcs Dinner Set for Family of 6 | Plates & Bowls for Dining| Vitrelle Triple Layer Glass| ...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['corelle-classic-cafe-blue-dinner-set-21-pc'] = { file: 'amazon-corelle-classic-cafe-blue-dinner-set-21-pc.jpg', title: "Sponsored Ad - CORELLE LAPINUE1 21 Pcs Dinner Set for Family of 6 (Plates, Bowls & Platter) for Dining | Vitrelle 3 Layer ...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['tata-consumer-tata-tea-gold-care-1-kg'] = { file: 'amazon-tata-consumer-tata-tea-gold-care-1-kg.jpg', title: "Tata Tea Gold Care 1kg, Rich in Taste, Goodness of Elaichi, Ginger, Tulsi, Brahmi & Mulethi, Black Tea, Loose Leaves", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['tata-consumer-tata-coffee-grand-filter-coffee-500-g'] = { file: 'amazon-tata-consumer-tata-coffee-grand-filter-coffee-500-g.jpg', title: "Tata Coffee Grand Filter Coffee, 500g", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['aashirvaad-select-sharbati-atta-5-kg'] = { file: 'amazon-aashirvaad-select-sharbati-atta-5-kg.jpg', title: "Aashirvaad Select Premium Sharbati Atta, 5kg", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['aashirvaad-multigrain-atta-5-kg'] = { file: 'amazon-aashirvaad-multigrain-atta-5-kg.jpg', title: "Aashirvaad Atta with Multigrains, 5kg pack, The High Fibre Atta", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['aashirvaad-high-fibre-atta-5-kg'] = { file: 'amazon-aashirvaad-high-fibre-atta-5-kg.jpg', title: "Aashirvaad Atta with Millets, 5kg pack | Nutrient-Rich & High Fibre Atta | 25% Millets", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['aashirvaad-organic-whole-wheat-atta-5-kg'] = { file: 'amazon-aashirvaad-organic-whole-wheat-atta-5-kg.jpg', title: "Aashirvaad Khapli Atta 5Kg | Emmer Wheat Flour | High Fiber & Protein | Aids Digestion | Ancient Grain | Soft & Nutritious...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['aashirvaad-chakki-fresh-atta-10-kg'] = { file: 'amazon-aashirvaad-chakki-fresh-atta-10-kg.jpg', title: "Aashirvaad Atta with Multigrains, 10kg pack | High Fibre & High Protein Multigrain Atta | 6 Natural Grains", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['aashirvaad-gluten-free-flour-blend-1-kg'] = { file: 'amazon-aashirvaad-gluten-free-flour-blend-1-kg.jpg', title: "Aashirvaad Nature’s Superfoods Gluten Free Flour, 1kg Pack, 100% Pure & Natural and Wheat Free | High Fibre Atta", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['tata-sampann-unpolished-moong-dal-1-kg'] = { file: 'amazon-tata-sampann-unpolished-moong-dal-1-kg.jpg', title: "Tata Sampann Organic Unpolished Moong Dal, 1kg", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['tata-sampann-unpolished-toor-dal-1-kg'] = { file: 'amazon-tata-sampann-unpolished-toor-dal-1-kg.jpg', title: "Sponsored Ad - Tata Sampann Organic Unpolished Toor Dal (Arhar Dal), 1 kg", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['tata-sampann-unpolished-chana-dal-1-kg'] = { file: 'amazon-tata-sampann-unpolished-chana-dal-1-kg.jpg', title: "Tata Sampann Organic Unpolished Chana Dal, 1kg", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['tata-sampann-unpolished-masoor-dal-1-kg'] = { file: 'amazon-tata-sampann-unpolished-masoor-dal-1-kg.jpg', title: "Tata Sampann Unpolished Masoor Dal (Split), 1kg", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['tata-sampann-unpolished-urad-dal-1-kg'] = { file: 'amazon-tata-sampann-unpolished-urad-dal-1-kg.jpg', title: "Tata Sampann Unpolished Urad Dal Whole, 1kg", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['tata-sampann-unpolished-kabuli-chana-1-kg'] = { file: 'amazon-tata-sampann-unpolished-kabuli-chana-1-kg.jpg', title: "Sponsored Ad - Tata Sampann Unpolished Kabuli Chana, 1 kg, (Medium Size)", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['kelloggs-granola-almond-and-cranberry-450-g'] = { file: 'amazon-kelloggs-granola-almond-and-cranberry-450-g.jpg', title: "Kellogg’s Crunchy Almond Berry Crumble Granola 450g | 12-In-1 Power Breakfast | No Maida, No Palm Oil | Source of Protein...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['kelloggs-crunchy-granola-fruit-and-nut-450-g'] = { file: 'amazon-kelloggs-crunchy-granola-fruit-and-nut-450-g.jpg', title: "Kellogg’s Crunchy Almond Berry Crumble Granola 450g | 12-In-1 Power Breakfast | No Maida, No Palm Oil | Source of Protein...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['haldirams-aloo-bhujia-400-g'] = { file: 'amazon-haldirams-aloo-bhujia-400-g.jpg', title: "Haldiram Namkeen - Aloo Bhujia, 400g Pouch", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['haldirams-moong-dal-400-g'] = { file: 'amazon-haldirams-moong-dal-400-g.jpg', title: "Haldiram Namkeen - Moong Dal, 400g Pouch", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['surf-excel-matic-front-load-liquid-2-l'] = { file: 'amazon-surf-excel-matic-front-load-liquid-2-l.jpg', title: "Surf Excel Matic Liquid Detergent 3 kg for Front Load (Pack of 2) | Removes tough Stains in 1st wash | Superior Fragrance...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['surf-excel-matic-top-load-liquid-2-l'] = { file: 'amazon-surf-excel-matic-top-load-liquid-2-l.jpg', title: "Surf Excel Matic Liquid Detergent 2 kg for Top Load | Removes tough Stains in 1st wash | Superior Fragrance | Color Protec...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['surf-excel-easy-wash-detergent-powder-4-kg'] = { file: 'amazon-surf-excel-easy-wash-detergent-powder-4-kg.jpg', title: "Surf Excel Easy Wash Detergent Powder 4 kg | Superfine Washing Powder | Dissolves Easily & Removes Tough Stains | Suitable...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['surf-excel-quick-wash-liquid-1-l'] = { file: 'amazon-surf-excel-quick-wash-liquid-1-l.jpg', title: "Surf Excel Matic Liquid Front Load Detergent 1 Liter Bottle & Quick Wash Detergent Powder 1 Kg, Washing Powder With Lemon...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['surf-excel-matic-front-load-powder-2-kg'] = { file: 'amazon-surf-excel-matic-front-load-powder-2-kg.jpg', title: "Surf Excel Matic Front Load Detergent Washing Powder 2 kg|| Specially designed for Tough Stain Removal on Laundry in Washi...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['surf-excel-comfort-fabric-conditioner-2-l'] = { file: 'amazon-surf-excel-comfort-fabric-conditioner-2-l.jpg', title: "Surf Excel Easy Wash Detergent Powder, 5 Kg & Comfort Morning Fresh Fabric Conditioner 2 L Refill Pack, After Wash Liquid ...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['samsung-galaxy-z-flip7-5g-256-gb-coral-red'] = { file: 'flipkart-samsung-galaxy-z-flip7-5g-256-gb-coral-red.jpg', title: "Samsung Galaxy Z Flip7 5G (Coralred, 256 GB)", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['oneplus-buds-4-true-wireless-storm-grey'] = { file: 'flipkart-oneplus-buds-4-true-wireless-storm-grey.jpg', title: "OnePlus Buds 4 55dB ANC, 45 hrs Playback, Dual Drivers with Dual DACs, 3D Audio Bluetooth", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['wakefit-monza-fabric-3-seater-sofa-teal'] = { file: 'flipkart-wakefit-monza-fabric-3-seater-sofa-teal.jpg', title: "Wakefit Molan Fabric 3 Seater  Sofa", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['hot-wheels-rc-rally-racer-1-16-scale'] = { file: 'flipkart-hot-wheels-rc-rally-racer-1-16-scale.jpg', title: "HOT WHEELS Formula 1 Toy Cars, Set of 10 1:64 Scale Die-Cast Race cars", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['arihant-upsc-cse-prelims-2027-30-years-solved-papers'] = { file: 'flipkart-arihant-upsc-cse-prelims-2027-30-years-solved-papers.jpg', title: "Arihant UPSC Civil Services Prelims 2027 Test Series Combo (GS Paper I + CSAT Paper II) | 30+ Tests with NCERT-Based, Topical, Sectional & Full-Length Mock Tests, OMR Sheets, AIR Mock Test & 100 Trending Topics", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['jbl-tour-one-m3-smart-tx'] = { file: 'flipkart-jbl-tour-one-m3-smart-tx.jpg', title: "JBL Tour One M3 Over Ear Headphones with ANC 2.0, Hi-Res LDAC Audio, 70Hrs Playback Bluetooth", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['sennheiser-accentum-plus-wireless'] = { file: 'flipkart-sennheiser-accentum-plus-wireless.jpg', title: "Sennheiser Accentum Plus Wireless Over Ear Headphones Designed in Germany with 50Hr Battery Bluetooth", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['boat-nirvana-space'] = { file: 'flipkart-boat-nirvana-space.jpg', title: "boAt Nirvana Space w/ 360 Spatial Audio, ANC(~32dB), 100HRS Battery & Dual Pairing Bluetooth", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['oneplus-buds-nord-3'] = { file: 'flipkart-oneplus-buds-nord-3.jpg', title: "OnePlus Nord Buds 3r TWS Earbud, 10min charge for 8hr Music, 3D Audio, 2-mic call Bluetooth", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['jbl-charge-essential-2'] = { file: 'flipkart-jbl-charge-essential-2.jpg', title: "JBL Partybox Encore Essential 2,AI Sound Boost, 15Hrs Playtime,Guitar & Mic Inputs 100 W Bluetooth Home Audio Speaker", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['canon-eos-r50-v-creator-camera'] = { file: 'flipkart-canon-eos-r50-v-creator-camera.jpg', title: "Canon EOS R50 Mirrorless Camera Body with RF - S 18 - 45 mm f/4.5 - 6.3 IS STM", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['hp-omnibook-ultra-flip-14'] = { file: 'flipkart-hp-omnibook-ultra-flip-14.jpg', title: "HP Omnibook 3 Next Gen AI PC Snapdragon X - (16 GB/512 GB SSD/Windows 11 Home) Omnibook 3 14-hz0024QU ...", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['hp-pavilion-aero-13'] = { file: 'flipkart-hp-pavilion-aero-13.jpg', title: "HP Pavilion Intel Core i7 13th Gen 1360P - (16 GB/512 GB SSD/Windows 11 Home) 15-eg3032TU Thin and Lig...", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['hp-omnibook-5-14'] = { file: 'flipkart-hp-omnibook-5-14.jpg', title: "HP OmniBook 7(i5 14th Gen) Intel Core 5 210H - (16 GB/512 GB SSD/Windows 11 Home) FS0789TU Laptop", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['acer-nitro-v-16'] = { file: 'flipkart-acer-nitro-v-16.jpg', title: "Acer NITRO V 16S (i5 14th Gen) Intel Core 5 210H - (16 GB/512 GB SSD/Windows 11 Home/8 GB Graphics/NVI...", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['acer-swift-x-14-creator'] = { file: 'flipkart-acer-swift-x-14-creator.jpg', title: "Acer Swift Neo AI PC Intel Core 3 304 - (8 GB/512 GB SSD/Windows 11 Home) SFN14-57 Notebook", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['msi-stealth-16-ai-studio'] = { file: 'flipkart-msi-stealth-16-ai-studio.jpg', title: "MSI Prestige 13 Evo AI PC Intel Core Ultra 5 125H - (16 GB/1 TB SSD/Windows 11 Home) Prestige 13 AI Ev...", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['asus-rog-strix-g16'] = { file: 'flipkart-asus-rog-strix-g16.jpg', title: "ASUS ROG Strix G16 (2026) Intel Core Ultra 7 255HX - (16 GB/1 TB SSD/Windows 11 Home/8 GB Graphics/NVI...", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['asus-tuf-gaming-a15'] = { file: 'flipkart-asus-tuf-gaming-a15.jpg', title: "ASUS TUF Gaming A15 (2025) AMD Ryzen 7 Hexa Core 7445HS - (16 GB/512 GB SSD/Windows 11 Home/4 GB Graph...", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['hisense-u6n-55-inch-uled'] = { file: 'flipkart-hisense-u6n-55-inch-uled.jpg', title: "Hisense E6N 139 cm (55 inch) Ultra HD (4K) LED Smart Google TV with Atmos, Dts Virtual X and 4K AI Ups...", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['wakefit-cloud-comfort-mattress-protector-king'] = { file: 'flipkart-wakefit-cloud-comfort-mattress-protector-king.jpg', title: "Wakefit King Size Fitted Polyster Waterproof, Stretchable, Breathable Mattress Cover", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['ikea-pluggis-sorting-bin-set-of-3'] = { file: 'flipkart-ikea-pluggis-sorting-bin-set-of-3.jpg', title: "IKEA Digital Shoppy Box, set of 3, grey( Storage Box", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['prestige-platino-plus-3-piece-fry-pan-set'] = { file: 'flipkart-prestige-platino-plus-3-piece-fry-pan-set.jpg', title: "Prestige 38489 Augusta Peach BYK Set of 3-Tawa 28Cm,Fry Pan 24Cm,Kadai 24Cm Induction Bottom Non-Stick Coated Cookware Set", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['prestige-alpha-deluxe-cooktop-set'] = { file: 'flipkart-prestige-alpha-deluxe-cooktop-set.jpg', title: "Judge by TTK Prestige Deluxe Induction Bottom Non-Stick Coated Cookware Set", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['oneplus-buds-4-true-wireless-storm-grey'] = { file: 'amazon-oneplus-buds-4-true-wireless-storm-grey.jpg', title: "OnePlus Nord Buds 2r True Wireless in Ear Earbuds with Mic, 12.4mm Drivers, Playback:Upto 38hr case,4-Mic Design, IP55 Rat...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['oneplus-pad-3-wi-fi-256-gb-storm-blue'] = { file: 'amazon-oneplus-pad-3-wi-fi-256-gb-storm-blue.jpg', title: "OnePlus Pad 3 Smart Keyboard - Detachable Bluetooth Keyboard & Touchpad, Magnetic Attachment, Adjustable Angle (110-165°),...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['ray-ban-wayfarer-classic-sunglasses-rb2140'] = { file: 'amazon-ray-ban-wayfarer-classic-sunglasses-rb2140.jpg', title: "Sponsored Ad - STYLISH GUYS Branded Stop Ray With 100% UV Ban Sunglasses 2140 Aviator, Square, Round, Oval, Sport, Goggle...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['ikea-tagarp-floor-uplighter-lamp-black'] = { file: 'amazon-ikea-tagarp-floor-uplighter-lamp-black.jpg', title: "Ikea Plastic Work Lamp, Black, Pack of 1", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['trident-zero-twist-cotton-bath-towel-set-of-4'] = { file: 'amazon-trident-zero-twist-cotton-bath-towel-set-of-4.jpg', title: "TRIDENT Soft Comfort Air Rich 100% Cotton Towel for Face, 500 GSM Highly Absorbent Towels for Men/Women, 4Pc Face Towel Se...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['arihant-upsc-cse-prelims-2027-30-years-solved-papers'] = { file: 'amazon-arihant-upsc-cse-prelims-2027-30-years-solved-papers.jpg', title: "Arihant UPSC Prelims Test Series 2027 | General Studies Paper I | 30+ Tests (7 NCERT-Based, 12 Sectional & 10 Full-Length ...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['hot-wheels-rc-rally-racer-1-16-scale'] = { file: 'amazon-hot-wheels-rc-rally-racer-1-16-scale.jpg', title: "​Hot Wheels RC Ferrari SF90 Stradale Assetto Fiorano, Toy Car | Remote-Control 1:64 Scale Toy Car Recharges with USB Cabl...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['sony-ult-wear-wireless-headphones'] = { file: 'amazon-sony-ult-wear-wireless-headphones.jpg', title: "Sony ULT Wear WH-ULT900N Noise Cancellation Wireless Bluetooth Over Ear Headphones with Massive Bass, Up to 50Hrs Battery-...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['jbl-tour-one-m3-smart-tx'] = { file: 'amazon-jbl-tour-one-m3-smart-tx.jpg', title: "JBL Tour One M3 - Smart Transmitter Wireless Over Ear Headphones with ANC 2.0, Hi-Res LDAC Audio,Spatial 360 Sound, 8 Mics...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['sennheiser-accentum-plus-wireless'] = { file: 'amazon-sennheiser-accentum-plus-wireless.jpg', title: "Sponsored Ad - Sennheiser ACCENTUM Plus Wireless Over Ear Headphones,German Design,Adaptive ANC,50H Battery,Sound Personal...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['oneplus-buds-nord-3'] = { file: 'amazon-oneplus-buds-nord-3.jpg', title: "OnePlus Nord Buds 3r TWS Earbuds up to 54 Hours Playback, 2-mic Clear Calls, 3D Spatial Audio, AI Translation, 12.4mm Driv...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['marshall-willen-ii'] = { file: 'amazon-marshall-willen-ii.jpg', title: "Marshall Willen II Portable Bluetooth Speaker with 17+ Hours of Portable Playtime, Dust & Waterproof (IP67) - Cream.", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['garmin-forerunner-265-gps-watch'] = { file: 'amazon-garmin-forerunner-265-gps-watch.jpg', title: "Sponsored Ad - Garmin Forerunner 265 Music 46mm, Black/Powder Gray GPS Running Smartwatch | AMOLED Display, Garmin Coach, ...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['garmin-vivoactive-6-gps-watch'] = { file: 'amazon-garmin-vivoactive-6-gps-watch.jpg', title: "Garmin vivoactive 6 GPS Smartwatch with AMOLED Display, Lunar Gold | Advanced Health and Fitness Features, Up to 11 Day Ba...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['canon-eos-r50-v-creator-camera'] = { file: 'amazon-canon-eos-r50-v-creator-camera.jpg', title: "Canon EOS R50 V Smartchoice Mirrorless Camera Kit with RF-S14-30mm F4-6.3 is STM PZ Lens – Black | 24.2 MP APS-C Sensor, 4...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['apple-macbook-air-13-inch-m3-16-gb-512-gb'] = { file: 'amazon-apple-macbook-air-13-inch-m3-16-gb-512-gb.jpg', title: "Apple iPad Air 13″ with M3 chip: Built for Apple Intelligence, Liquid Retina Display, 512GB, 12MP Front/Back Camera, Wi-Fi...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['asus-expertbook-b9-oled'] = { file: 'amazon-asus-expertbook-b9-oled.jpg', title: "ASUS Zenbook S14 (2026),Smartchoice,Intel Core Ultra 9 (Series 3),16GB RAM,512GB SSD, 3K OLED,Touchscreen, 14\"(35.5 cm),Wi...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['asus-proart-px13-creator'] = { file: 'amazon-asus-proart-px13-creator.jpg', title: "NAXTON® ® 9H Pro+ Unbreakable Screen Guard for Asus ProArt Px13 (13.3 Inch). Scratch Free, Residue Free, Smooth Touch, Pro...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['hp-omnibook-ultra-flip-14'] = { file: 'amazon-hp-omnibook-ultra-flip-14.jpg', title: "HP OmniBook Ultra Flip (Previously Spectre) Intel Core Ultra 7 256V 47 Tops (16GB LPDDR5X, 1TB SSD) OLED, 500 nits,14", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['hp-omnibook-5-14'] = { file: 'amazon-hp-omnibook-5-14.jpg', title: "HP OmniBook 5 OLED (Previously Pavilion), Snapdragon X Processor 45 Tops (16GB LPDDR5x, 1 TB SSD), 2K 14", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['dell-inspiron-14-plus-7440'] = { file: 'amazon-dell-inspiron-14-plus-7440.jpg', title: "Dell Thin & Light Inspiron 7440 2in1 Laptop, Intel Core 7 150U, 16GB + 1TB SSD, 14\" (35.62cm) FHD+ 250nits Touch, Dell Act...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['acer-nitro-v-16'] = { file: 'amazon-acer-nitro-v-16.jpg', title: "acer Nitro V 15, Intel core i7-13th Gen 13620H,NVIDIA GeForce RTX - 5050 8GB, 16 GB,512 GB,Full HD IPS,15.6\"/39.62 cm,165 ...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['msi-katana-15-hx'] = { file: 'amazon-msi-katana-15-hx.jpg', title: "MSI Katana 15 HX Intel Core i9 14th Gen 14900HX (16GB/1TB SSD/Windows 11 Home/RTX 5050 8GB GDDR7/165Hz QHD Display/2 Year ...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['msi-thin-15-b13v'] = { file: 'amazon-msi-thin-15-b13v.jpg', title: "MSI Thin 15, Intel 13th Gen. Core i7-13620H, 40CM FHD 144Hz Gaming Laptop(16GB/512GB NVMe SSD/Windows 11 Home/NVIDIA GeFor...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['msi-stealth-16-ai-studio'] = { file: 'amazon-msi-stealth-16-ai-studio.jpg', title: "MSI Stealth 16 AI Studio, Intel 1st Gen. Ultra 9 185H, Built-in AI, 41CM QHD+ 240Hz Gaming Laptop (32GB/2TB NVMe SSD/Windo...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['msi-cyborg-15-ai'] = { file: 'amazon-msi-cyborg-15-ai.jpg', title: "MSI Cyborg 15, Intel 12th Gen. i5-12450H, 40CM FHD 144Hz Gaming Laptop (16GB/512GB NVMe SSD/Windows 11 Home/MSO 2021/NVIDI...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['asus-rog-strix-g16'] = { file: 'amazon-asus-rog-strix-g16.jpg', title: "Sponsored Ad - ASUS ROG Strix G16,Intel Core Ultra 9 275HX,Gaming Laptop(RTX 5070-8GB/115W TGP/32GB/1TB /2.5K QHD+/16\"/240...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['asus-tuf-gaming-a15'] = { file: 'amazon-asus-tuf-gaming-a15.jpg', title: "ASUS TUF Gaming A15, Gaming Laptop, AMD Ryzen 7 155, RTX 3050 GPU (16GB/512GB/39.62 cms (15.6) FHD/Windows 11 Home) FA506N...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['asus-rog-flow-z13'] = { file: 'amazon-asus-rog-flow-z13.jpg', title: "Pxin Tablet Privacy Guard compatible with Asus ROG Flow Z13 | Screen protector | Anti-Glare | Blue light filter | 360 degr...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['hyperx-cloud-iii-wireless'] = { file: 'amazon-hyperx-cloud-iii-wireless.jpg', title: "HyperX Cloud III Over Ear Wired Gaming Headset, PC, PS5, Xbox Series X|S, Angled 53Mm Drivers, Memory Foam, Durable Frame,...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['hyperx-cloud-alpha-wireless'] = { file: 'amazon-hyperx-cloud-alpha-wireless.jpg', title: "HyperX Cloud Stinger 2 Smartchoice Wireless Gaming Headset Compatible with PC. Noise-Cancelling Swivel-to-Mute Microphone,...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['hyperx-cloud-iii-s-wireless'] = { file: 'amazon-hyperx-cloud-iii-s-wireless.jpg', title: "HyperX Cloud Earbuds III S – Wired Earbuds, PC; Nintendo Switch; Console Controller, Dynamic; 14.3 mm Driver, Silicone Ear...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['hyperx-cloud-mini-wireless'] = { file: 'amazon-hyperx-cloud-mini-wireless.jpg', title: "HyperX Cloud Jet Smartchoice Dual Wireless Gaming Headset, 2.4GHz dongle, Bluetooth 5.2, PC, PS5, Nintendo Switch, Steam D...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['fabindia-mens-cotton-handloom-kurta'] = { file: 'amazon-fabindia-mens-cotton-handloom-kurta.jpg', title: "Fabindia Fabnu Men Cotton Printed Mandarin Collar Full Sleeves Everyday Comfort Fit Kurta", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['cerave-daily-moisturising-lotion-473-ml'] = { file: 'amazon-cerave-daily-moisturising-lotion-473-ml.jpg', title: "CeraVe Moisturizing Lotion For Dry Skin (473ml) - Formulated With 3 Essential Ceramides And Hyaluronic Acid | Non-Comedoge...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['philips-smart-wi-fi-candle-bulb-5-5-w'] = { file: 'amazon-philips-smart-wi-fi-candle-bulb-5-5-w.jpg', title: "PHILIPS LED Candle Bulb SceneSwitch 5W | 3 in 1 Cool Daylight Neutral White Warm White | E14 Small Screw Base | Dimmable A...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['philips-hue-white-ambiance-e27-9-w'] = { file: 'amazon-philips-hue-white-ambiance-e27-9-w.jpg', title: "Philips Hue White Ambience 9.5W A60 E27 in", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['philips-portable-dusk-to-dawn-night-light'] = { file: 'amazon-philips-portable-dusk-to-dawn-night-light.jpg', title: "Philips LED SereneShine Plug-in Night Lamp 0.5W | Cool White LED Night Light | Soft Glare-Free Illumination | Energy Effic...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['chumbak-indigo-floral-cushion-cover-set'] = { file: 'amazon-chumbak-indigo-floral-cushion-cover-set.jpg', title: "Chumbak Marigold Lady Cushion Covers, Set of 3 | Cotton Blend Multicoloured Floral Print Decorative Pillow Cases for Sofa,...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['chumbak-sunset-city-ceramic-table-lamp'] = { file: 'amazon-chumbak-sunset-city-ceramic-table-lamp.jpg', title: "Sponsored Ad - Chumbak Folklore Bloom Ikat Table Lamp | Multicolour Floral Print Metal & Fabric Bedside Lamp for Bedroom, ...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['chumbak-blue-pottery-bud-vase-set'] = { file: 'amazon-chumbak-blue-pottery-bud-vase-set.jpg', title: "Sponsored Ad - Chumbak Midnight Forest Embossed Vase, Navy Blue Ceramic Flower Vase with Wooden Base, 23cm Decorative Vase...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['chumbak-handpainted-mango-wood-photo-frame'] = { file: 'amazon-chumbak-handpainted-mango-wood-photo-frame.jpg', title: "Sponsored Ad - Chumbak Wild Bloom Paper Mache Photo Frame – Red | Hand-Painted Decorative Table Photo Frame for Home Décor...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['wakefit-microfibre-reversible-comforter-king'] = { file: 'amazon-wakefit-microfibre-reversible-comforter-king.jpg', title: "Sponsored Ad - Wakefit Pure Cotton Reversible Comforter - Double Bed | Supersoft Floral Design Quilt AC Blanket for Winter...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['wakefit-cloud-comfort-mattress-protector-king'] = { file: 'amazon-wakefit-cloud-comfort-mattress-protector-king.jpg', title: "Wakefit 100% Waterproof Premium Terry Cotton Mattress Protector, King - 78x72 inch | Breathable and Hypoallergenic Ultra S...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['spaces-textured-cotton-bath-mat'] = { file: 'amazon-spaces-textured-cotton-bath-mat.jpg', title: "Spaces Hygro Cotton 2000 GSM Machine Tufted Small Premium Bath Mat for Daily use | Anti-Skid, Good Absorbent & Soft Feel –...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['spaces-turkish-cotton-robe-large'] = { file: 'amazon-spaces-turkish-cotton-robe-large.jpg', title: "Spaces Airsoft 100% 100% Cotton 300 GSM Dobby Plain Large Bath Robe | Super Soft, Breathable & Quick Dry - Grey", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['prestige-omega-deluxe-5-piece-cookware-set'] = { file: 'amazon-prestige-omega-deluxe-5-piece-cookware-set.jpg', title: "Prestige Omega Deluxe Non-Stick Cookware 3 Pc Set |PFOA Free 5-Layer Coating | Omni Tawa 25 cm | Fry Pan 24 cm | Kadai wit...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['prestige-platino-plus-3-piece-fry-pan-set'] = { file: 'amazon-prestige-platino-plus-3-piece-fry-pan-set.jpg', title: "Prestige Omega Deluxe Plus BYK Set of 3(Omni Tawa 25 cm- 1U, Fry Pan 24 cm/1.7L -1 U & Kadai with Glass Lid 24 cm/2.4 L-1...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['prestige-durastone-3-l-casserole'] = { file: 'amazon-prestige-durastone-3-l-casserole.jpg', title: "Prestige 3L Durastone hard anodised non-stick deep kadai (24cm)with glass lid|6 layers extra durable stone finish|No harmf...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['prestige-alpha-deluxe-cooktop-set'] = { file: 'amazon-prestige-alpha-deluxe-cooktop-set.jpg', title: "Prestige Pic 20.0 Omega Stainless Steel Deluxe Byk Induction Cooktop, Black, Set of 3", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['bosch-silentmixx-pro-800-w-mixer'] = { file: 'amazon-bosch-silentmixx-pro-800-w-mixer.jpg', title: "Bosch PureMixx Plus 800W Mixer Grinder & Food Processor with 5 Jars, 40+ Functions, Atta Kneading, Chopping, Slicing, Coar...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['havells-stelio-1-7-l-kettle'] = { file: 'amazon-havells-stelio-1-7-l-kettle.jpg', title: "Havells Vesta Electric Kettle | Large 1.7L | 2000 Watts | 360° Cordless Control | Wide Mouth for Easy Use | Triple Safety ...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['havells-delite-1-2-l-travel-kettle'] = { file: 'amazon-havells-delite-1-2-l-travel-kettle.jpg', title: "Sponsored Ad - Havells Aqua Plus Electric Kettle 1.2 Litre, 1250 Watt | 304 Stainless Steel Inner Body | Cool Touch Body |...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['instant-vortex-plus-clearcook-6-in-1-5-7-l'] = { file: 'amazon-instant-vortex-plus-clearcook-6-in-1-5-7-l.jpg', title: "GWBSXM Air Fryer Accessories for Instant Pot Vortex 6 in 1 5.7QT 6 QT Gourmia GAF735 6 QT Air Fryer, Air Fryer Replacement...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['instant-vortex-versazone-8-5-l'] = { file: 'amazon-instant-vortex-versazone-8-5-l.jpg', title: "Reusable Air Fryer Liners for Instant VersaZone 8.5L, Air Fryer Silicone Liners Reusable Air Fryer Inserts, Air Fryer Acce...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['corelle-indigo-speckle-dinner-set-18-pc'] = { file: 'amazon-corelle-indigo-speckle-dinner-set-18-pc.jpg', title: "Corelle 1134352 Dinnerware Set, 18-Piece, Indigo Speckle", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['corelle-classic-cafe-blue-dinner-set-21-pc'] = { file: 'amazon-corelle-classic-cafe-blue-dinner-set-21-pc.jpg', title: "Sponsored Ad - CORELLE Blue Floral 21 Pcs Dinner Set for Family of 6 | Plates, Bowls & Platter for Dining| Vitrelle 3 Laye...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['samsung-rt28-253-l-frost-free-refrigerator'] = { file: 'amazon-samsung-rt28-253-l-frost-free-refrigerator.jpg', title: "OM PLASTICS VEGETABLE BOX COMPATIBLE WITH SAMSUNG DOUBLE DOOR 253 LITER FRIDGE MODEL RT26, RT27, RT28, RT29, RT30 HEAVY DU...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['kelloggs-granola-almond-and-cranberry-450-g'] = { file: 'amazon-kelloggs-granola-almond-and-cranberry-450-g.jpg', title: "Kellogg’s Crunchy Almond Berry Crumble Granola 450g | 12-In-1 Power Breakfast | No Maida, No Palm Oil | Source of Protein...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['kelloggs-crunchy-granola-fruit-and-nut-450-g'] = { file: 'amazon-kelloggs-crunchy-granola-fruit-and-nut-450-g.jpg', title: "Kellogg’s Crunchy Almond Berry Crumble Granola 450g and Muesli 0% Added Sugar | 450g + 10g", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['sony-playstation-5-pro-console-2-tb'] = { file: 'flipkart-sony-playstation-5-pro-console-2-tb.jpg', title: "SONY PS5 Console Digital (CFI-2116B01Y) 825 GB with ASTRO’S Playroom", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['lg-242-l-3-star-frost-free-double-door-refrigerator'] = { file: 'flipkart-lg-242-l-3-star-frost-free-double-door-refrigerator.jpg', title: "LG 246 L Frost Free Double Door 3 Star Convertible Refrigerator  with Inverter Compressor, Express Fre...", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['arihant-upsc-cse-prelims-2027-30-years-solved-papers'] = { file: 'flipkart-arihant-upsc-cse-prelims-2027-30-years-solved-papers.jpg', title: "Arihant UPSC Civil Services Prelims CSAT 2027 Complete Combo (Paper II) | Aptitude Syllabus Coverage with Latest Questions & Trends, Strategy Planner, 16 Years Topicwise PYQs (2011–2026), Solved Papers, Elimination Techniques, 30+ Mock Tests, OMR Sheets, AIR Mock Test & 10 Practice Sets", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['hot-wheels-rc-rally-racer-1-16-scale'] = { file: 'flipkart-hot-wheels-rc-rally-racer-1-16-scale.jpg', title: "Arizuul 1:16 Land Rover Defender RC Rechargeable Model Car Baby Pull Toy with Wheels", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['vivo-x200-fe-5g-512-gb'] = { file: 'flipkart-vivo-x200-fe-5g-512-gb.jpg', title: "HNVIEW VIVO X200 FE OG BACK PANEL WITH CAMERA LENS Back Panel", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['realme-gt-7t-5g-256-gb'] = { file: 'flipkart-realme-gt-7t-5g-256-gb.jpg', title: "realme GT 7T (IceSense Black, 256 GB)", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['sennheiser-accentum-plus-wireless'] = { file: 'flipkart-sennheiser-accentum-plus-wireless.jpg', title: "Sennheiser Accentum Plus Wireless Over Ear Headphones Designed in Germany with 50Hr Battery Bluetooth", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['boat-nirvana-space'] = { file: 'flipkart-boat-nirvana-space.jpg', title: "boAt Nirvana Space w/ 360 Spatial Audio, ANC(~32dB), 100HRS Battery & Dual Pairing Bluetooth", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['oneplus-buds-nord-3'] = { file: 'flipkart-oneplus-buds-nord-3.jpg', title: "OnePlus Nord Buds 3r TWS Earbud, 10min charge for 8hr Music, 3D Audio, 2-mic call Bluetooth", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['canon-eos-r50-v-creator-camera'] = { file: 'flipkart-canon-eos-r50-v-creator-camera.jpg', title: "Canon EOS R50 Mirrorless Camera RF - S 18 - 45 mm f/4.5 - 6.3 IS STM and RF - S 55 - 210 mm f/5 - 7.1 ...", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['hp-pavilion-aero-13'] = { file: 'flipkart-hp-pavilion-aero-13.jpg', title: "HP Pavilion Plus MSO 2024 Intel Core i5 13th Gen 1335U - (16 GB/512 GB SSD/Windows 11 Home) 14-ew0107T...", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['hp-omnibook-ultra-flip-14'] = { file: 'flipkart-hp-omnibook-ultra-flip-14.jpg', title: "HP 14 Omnibook X Flip Next Gen AI PC Intel Core Ultra 7 256V - (16 GB/1 TB SSD/Windows 11 Home) Omnibo...", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['hp-omnibook-5-14'] = { file: 'flipkart-hp-omnibook-5-14.jpg', title: "HP Omnibook 5 2k OLED Intel Core 5 Series 3 320 - (8 GB/512 GB SSD/Windows 11 Home) 14-mh0017TU Laptop", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['acer-swift-x-14-creator'] = { file: 'flipkart-acer-swift-x-14-creator.jpg', title: "Acer Swift Neo Next Gen AI PC Intel Core Ultra 5 226V - (16 GB/512 GB SSD/Windows 11 Home) SFN14-56 No...", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['acer-nitro-v-16'] = { file: 'flipkart-acer-nitro-v-16.jpg', title: "Acer Nitro 5 Intel Core i5 14th Gen 14450HX - (16 GB/1 TB SSD/Windows 11 Home/8 GB Graphics/NVIDIA GeF...", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['asus-tuf-gaming-a15'] = { file: 'flipkart-asus-tuf-gaming-a15.jpg', title: "ASUS TUF Gaming A15 AMD Ryzen 7 Octa Core 7435HS - (16 GB/512 GB SSD/Windows 11 Home/4 GB Graphics/NVI...", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['asus-rog-strix-g16'] = { file: 'flipkart-asus-rog-strix-g16.jpg', title: "ASUS ROG Strix G16 (2026) Intel Core i7 14th Gen 14650HX - (16 GB/1 TB SSD/Windows 11 Home/8 GB Graphi...", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['hisense-u6n-55-inch-uled'] = { file: 'flipkart-hisense-u6n-55-inch-uled.jpg', title: "Hisense Q6Q 139 cm (55 inch) QLED Ultra HD (4K) Smart VIDAA TV with 120HZ |Dolby Vision & Atmos |Voice...", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['loreal-paris-extraordinary-oil-shampoo-400-ml'] = { file: 'flipkart-loreal-paris-extraordinary-oil-shampoo-400-ml.jpg', title: "L'Oréal Paris Shampoo (340 ml) + Conditioner (175 ml) + Serum (30 ml)", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['loreal-paris-hyaluromic-shampoo-396-ml'] = { file: 'flipkart-loreal-paris-hyaluromic-shampoo-396-ml.jpg', title: "Peacemakers Professionnel Paris Serie Expert Absolut Repair Shampoo (300 ml)", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['wakefit-cloud-comfort-mattress-protector-king'] = { file: 'flipkart-wakefit-cloud-comfort-mattress-protector-king.jpg', title: "Wakefit King Size Fitted Terry Cotton Waterproof, Stretchable, Breathable Mattress Cover", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['prestige-platino-plus-3-piece-fry-pan-set'] = { file: 'flipkart-prestige-platino-plus-3-piece-fry-pan-set.jpg', title: "Prestige Omega Deluxe Plus BYK Set of 3-Tawa, Fry Pan & Kadai with Glass Lid Induction Bottom Non-Stick Coated Cookware Set", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['bosch-ergomaster-600-w-hand-blender'] = { file: 'flipkart-bosch-ergomaster-600-w-hand-blender.jpg', title: "BOSCH 300 W White Hand Blender", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['prestige-alpha-deluxe-cooktop-set'] = { file: 'flipkart-prestige-alpha-deluxe-cooktop-set.jpg', title: "Prestige Omega Deluxe Granite Alpha 3Pcs BYK-Kadai 24cm Glass Lid+Tawa 28cm+Fry Pan 24cm Induction Bottom Non-Stick Coated Cookware Set", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['bosch-silentmixx-pro-800-w-mixer'] = { file: 'flipkart-bosch-silentmixx-pro-800-w-mixer.jpg', title: "BOSCH TrueMixx Pro 1000 W Mixer Grinder", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['havells-stelio-1-7-l-kettle'] = { file: 'flipkart-havells-stelio-1-7-l-kettle.jpg', title: "HAVELLS MARINO 1 L Electric Kettle", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['havells-crysta-1-5-l-electric-kettle'] = { file: 'flipkart-havells-crysta-1-5-l-electric-kettle.jpg', title: "HAVELLS CRAFT Kettle | OptiHeat Tech for Custom(Pack of 6)Temperature Setting Electric Kettle", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['lg-instaview-door-in-door-617-l'] = { file: 'flipkart-lg-instaview-door-in-door-617-l.jpg', title: "LG 674 L Frost Free Side by Side Refrigerator  with Inverter Linear ThinQ (Wi-fi) InstaView Door-in-Do...", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['samsung-bespoke-322-l-convertible-double-door'] = { file: 'flipkart-samsung-bespoke-322-l-convertible-double-door.jpg', title: "Samsung 301 L Frost Free Double Door 2 Star Refrigerator  with Convertible 5-in-1, Digital Inverter, D...", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['samsung-convertible-345-l-double-door'] = { file: 'flipkart-samsung-convertible-345-l-double-door.jpg', title: "Samsung 256 L Frost Free Double Door 2 Star Convertible Refrigerator", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['eureka-forbes-ultimo-200-w-cordless-stick-vacuum'] = { file: 'flipkart-eureka-forbes-ultimo-200-w-cordless-stick-vacuum.jpg', title: "EUREKA FORBES Atom Hand-held Vacuum Cleaner 12,000 Pa Powerful Suction Power, 2-In-1, Handheld & Stick...", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['eureka-forbes-supervac-1600-w-wet-and-dry-vacuum'] = { file: 'flipkart-eureka-forbes-supervac-1600-w-wet-and-dry-vacuum.jpg', title: "Eureka Forbes bold wet and dry vacuum cleaner", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['kelloggs-bran-flakes-500-g'] = { file: 'flipkart-kelloggs-bran-flakes-500-g.jpg', title: "Kellogg's Bran Flakes Cereal Box", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['kelloggs-multigrain-chocos-700-g'] = { file: 'flipkart-kelloggs-multigrain-chocos-700-g.jpg', title: "Kellogg's Multigrain Chocos, More Chocolatey | No-Maida| Kids Breakfast cereal Box", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['haldirams-soan-papdi-500-g'] = { file: 'flipkart-haldirams-soan-papdi-500-g.jpg', title: "Haldiram's Soan Papdi (Pack of 4)", author: 'Flipkart product listing', license: 'Product image sourced from Flipkart for this practice project' }

productPhotos['anker-nano-65-w-3-port-gan-charger'] = { file: 'amazon-anker-nano-65-w-3-port-gan-charger.jpg', title: "Anker Nano 100W USB-C Charger, 3-Port Fast Compact GaN Charger for MacBook Pro/Air, Pixelbook, ThinkPad, Dell XPS, iPad Pr...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['oneplus-buds-4-true-wireless-storm-grey'] = { file: 'amazon-oneplus-buds-4-true-wireless-storm-grey.jpg', title: "OnePlus Nord Buds 4 TWS Earbuds with 52dB Real-time ANC, Game Sound Spatial Audio, 6-Mic AI Clear Calls, Up to 54hrs Playb...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['oneplus-pad-3-wi-fi-256-gb-storm-blue'] = { file: 'amazon-oneplus-pad-3-wi-fi-256-gb-storm-blue.jpg', title: "Robustrion Tempered Glass for OnePlus Pad 3 13.2\" Screen Protector, 1 Pack | Screen Protector Guard for OnePlus Pad 3 13....", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['sony-playstation-5-pro-console-2-tb'] = { file: 'amazon-sony-playstation-5-pro-console-2-tb.jpg', title: "PS5/Slim/Pro Cooling Station with Controller Charging Station for Sony PSP Console Playstation 5 Slim&Standard Disc/Digita...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['trident-zero-twist-cotton-bath-towel-set-of-4'] = { file: 'amazon-trident-zero-twist-cotton-bath-towel-set-of-4.jpg', title: "TRIDENT Soft Comfort Air Rich 100% Cotton Towel for Face, 500 GSM Highly Absorbent Towels for Men/Women, 4Pc Face Towel Se...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['instant-pot-vortex-plus-6-in-1-air-fryer-5-7-l'] = { file: 'amazon-instant-pot-vortex-plus-6-in-1-air-fryer-5-7-l.jpg', title: "Instant Vortex Plus 6L Air Fryer, 6-in-1 with 360° EvenCrisp Technology, Touch Control Panel, Uses 95% Less Oil, Air Fry, ...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['haldirams-bhujia-sev-namkeen-1-kg'] = { file: 'amazon-haldirams-bhujia-sev-namkeen-1-kg.jpg', title: "Haldiram Nagpur Bhujia Sev Pouch, 600 g", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['boldfit-adjustable-dumbbell-set-20-kg'] = { file: 'amazon-boldfit-adjustable-dumbbell-set-20-kg.jpg', title: "Boldfit Dumbbell Set for Men & Women Rubber Coated Dumbbells Set for Home Workout with Anti-Slip Steel Handle Home Gym Equ...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['arihant-upsc-cse-prelims-2027-30-years-solved-papers'] = { file: 'amazon-arihant-upsc-cse-prelims-2027-30-years-solved-papers.jpg', title: "Arihant UPSC Civil Services Prelims 2027 Test Series Combo (GS Paper I + CSAT Paper II) | 30+ Tests with NCERT-Based,Secti...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['hot-wheels-rc-rally-racer-1-16-scale'] = { file: 'amazon-hot-wheels-rc-rally-racer-1-16-scale.jpg', title: "Bestie toys 1:16 Scale RC Drift Car, 30KM/H 4WD 2.4GHz Remote Control Cars with LED Light, Racing and 4 Drifting Wheels, 1...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['herschel-little-america-laptop-backpack-25-l'] = { file: 'amazon-herschel-little-america-laptop-backpack-25-l.jpg', title: "Herschel Unisex Little America Backpack", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['xiaomi-poco-f7-5g-512-gb'] = { file: 'amazon-xiaomi-poco-f7-5g-512-gb.jpg', title: "ColorCase Full Screen Edge-Edge Protection Tempered Glass Screenguard for Xiaomi Poco F7 (5G) - (Black)", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['sony-ult-wear-wireless-headphones'] = { file: 'amazon-sony-ult-wear-wireless-headphones.jpg', title: "Sponsored Ad - Sony ULT Wear WH-ULT900N Noise Cancellation Wireless Bluetooth Over Ear Headphones with Massive Bass, Up to...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['jbl-tour-one-m3-smart-tx'] = { file: 'amazon-jbl-tour-one-m3-smart-tx.jpg', title: "JBL Tour One M3 - Smart Transmitter Wireless Over Ear Headphones with ANC 2.0, Hi-Res LDAC Audio,Spatial 360 Sound, 8 Mics...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['sennheiser-accentum-plus-wireless'] = { file: 'amazon-sennheiser-accentum-plus-wireless.jpg', title: "Sponsored Ad - Sennheiser ACCENTUM Plus Wireless Over Ear Headphones,German Design,Adaptive ANC,50H Battery,Sound Personal...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['sennheiser-hd-450bt-wireless'] = { file: 'amazon-sennheiser-hd-450bt-wireless.jpg', title: "SOULWIT Earpads Replacement for Sennheiser HD 4.50BT/HD 4.50BTNC/HD4.50SE/HD4.40BT/HD4.30G/HD4.20S/HD458BT/HD 450/HD450BT/...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['oneplus-buds-nord-3'] = { file: 'amazon-oneplus-buds-nord-3.jpg', title: "OnePlus Nord Buds 3 Truly Wireless in Ear Bluetooth Earbuds with up to 32dB Active Noise Cancellation, 10mins for 11Hours ...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['marshall-willen-ii'] = { file: 'amazon-marshall-willen-ii.jpg', title: "Sponsored Ad - Marshall Willen II Portable Bluetooth Speaker with 17+ Hours of Portable Playtime, Dust & Waterproof (IP67)...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['garmin-forerunner-265-gps-watch'] = { file: 'amazon-garmin-forerunner-265-gps-watch.jpg', title: "Garmin Forerunner 265 Music 46mm, Black/Powder Gray GPS Running Smartwatch | AMOLED Display, Garmin Coach, HRV, Sleep, SpO...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['garmin-vivoactive-6-gps-watch'] = { file: 'amazon-garmin-vivoactive-6-gps-watch.jpg', title: "Wearable4U Garmin Vivoactive 6 - Health & Fitness Smartwatch, 1.2 inch Bright AMOLED Touchscreen Display, GPS Sports Track...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['canon-eos-r50-v-creator-camera'] = { file: 'amazon-canon-eos-r50-v-creator-camera.jpg', title: "Sponsored Ad - Canon EOS R50 RF-S18-45mm f/4.5-6.3 is STM Mirrorless Camera (Black)- 4K Video Vlogging with 24.2 MP", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['asus-expertbook-b9-oled'] = { file: 'amazon-asus-expertbook-b9-oled.jpg', title: "ASUS Zenbook A14 OLED (2025),Smartchoice,Qualcomm Snapdragon X,Copilot+PC,0.9kg Light-Weight,14\"(35 cm),32hrs Battery Lif...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['asus-proart-px13-creator'] = { file: 'amazon-asus-proart-px13-creator.jpg', title: "NAXTON® ® 9H Pro+ Unbreakable Screen Guard for Asus ProArt Px13 13.3 Inch [Scratch Free] [Residue Free] [Smooth Touch] Pro...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['lenovo-thinkpad-e14-gen-6'] = { file: 'amazon-lenovo-thinkpad-e14-gen-6.jpg', title: "Lenovo ThinkPad E14 Gen 6 (Intel) 14\" WUXGA Intel Core Ultra 5 125U 16GB DDR5 Windows 11 Pro Laptop - Black", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['hp-omnibook-ultra-flip-14'] = { file: 'amazon-hp-omnibook-ultra-flip-14.jpg', title: "HP OmniBook X Flip OLED Intel Core Ultra 5 226V, 40 Tops (16GB LPDDR5x,1TB SSD) 3K, Touch, 120hz, 14", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['hp-omnibook-5-14'] = { file: 'amazon-hp-omnibook-5-14.jpg', title: "Sponsored Ad - HP OmniBook 5 ● Intel Core 5 Series 3 Processor 320 ● 8GB LPDDR5 ●512GB SSD● 2K OLED● Gorilla Glass● 14", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['dell-inspiron-14-plus-7440'] = { file: 'amazon-dell-inspiron-14-plus-7440.jpg', title: "Dell Inspiron 7440 2in1 Laptop,14 inch Touch FHD+ 250nits(35.56cm)Display, Intel Core i5-1334U Windows 11 Home, 16 GB DDR5...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['acer-nitro-v-16'] = { file: 'amazon-acer-nitro-v-16.jpg', title: "acer Nitro V 16, Intel Core i5 14th Gen - 14450HX, NVIDIA GeForce RTX 4050-6GB, 16 GB RAM, 512 GB SSD, WUXGA IPS,16\"/40.6 ...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['msi-katana-15-hx'] = { file: 'amazon-msi-katana-15-hx.jpg', title: "MSI Katana 15 HX, Intel 14th Gen. i5-14450HX, 40CM FHD 144Hz Gaming Laptop (16GB/512GB NVMe SSD/Windows 11 Home/NVIDIA GeF...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['msi-thin-15-b13v'] = { file: 'amazon-msi-thin-15-b13v.jpg', title: "MSI Thin 15, Intel 13th Gen. i5-13420H, 40CM FHD 144Hz Gaming Laptop (16GB/512GB NVMe SSD/Windows 11 Home/NVIDIA GeForce R...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['msi-stealth-16-ai-studio'] = { file: 'amazon-msi-stealth-16-ai-studio.jpg', title: "MSI Stealth 14 AI Studio, Intel 1st Gen. Ultra 7 155H,Built-in AI, 36CM FHD+ 165Hz Gaming Laptop(16GB/1TB NVMe SSD/Windows...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['msi-cyborg-15-ai'] = { file: 'amazon-msi-cyborg-15-ai.jpg', title: "MSI Cyborg 15, Intel 2nd Series. Core 7 240H, 40CM FHD 144Hz Gaming Laptop (16GB/512GB NVMe SSD/Windows 11 Home/NVIDIA GeF...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['asus-rog-strix-g16'] = { file: 'amazon-asus-rog-strix-g16.jpg', title: "Sponsored Ad - ASUS ROG Strix G16, AMD Ryzen 9 8940HX, RTX 5070 Ti,140W TGP,16GB RAM,1TB SSD,FHD+,16\",165Hz,90WHrs,Windows...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['asus-rog-flow-z13'] = { file: 'amazon-asus-rog-flow-z13.jpg', title: "ASUS ROG Flow Z13 (2025), AMD Ryzen AI MAX+ 395,AMD Radeon iGPU, 32GB/1TB, 2.5K QHD+,Touchscreen, 13.4\", 34 cm,Windows 11,...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['asus-tuf-gaming-a15'] = { file: 'amazon-asus-tuf-gaming-a15.jpg', title: "ASUS TUF A15 (2026),Smartchoice,AMD Ryzen 7 8845HS,RTX 3050,16GB RAM (Upgradeable Upto 64GB),512GB SSD,FHD,15.6\"(39.6 cm),Win 11,M365 Basic(1Y),Office 24,Black,2.3 Kg,FA506NCG-HN192WS,Gaming Laptop", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['sony-playstation-5-pro-2-tb'] = { file: 'amazon-sony-playstation-5-pro-2-tb.jpg', title: "Sony PlayStation®5 Digital Edition (slim) Console Video Game", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['hyperx-cloud-iii-wireless'] = { file: 'amazon-hyperx-cloud-iii-wireless.jpg', title: "HyperX Cloud III– Wireless Gaming Over Ear Headset, PC, PS5, PS4, Nintendo Switch, 53mm with Neodymium Magnets, 2.4GHz Wir...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['hyperx-cloud-alpha-wireless'] = { file: 'amazon-hyperx-cloud-alpha-wireless.jpg', title: "HyperX Cloud Alpha Wireless - Gaming Headset for PC, 300-hour battery life, DTS Headphone:X Spatial Audio, Memory foam, Du...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['hyperx-cloud-iii-s-wireless'] = { file: 'amazon-hyperx-cloud-iii-s-wireless.jpg', title: "HyperX Cloud III– Wireless Gaming Over Ear Headset, PC, PS5, PS4, Nintendo Switch, 53mm with Neodymium Magnets, 2.4GHz Wir...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['hyperx-cloud-mini-wireless'] = { file: 'amazon-hyperx-cloud-mini-wireless.jpg', title: "HyperX Cloud Mini – Wired Headset Compatible with PC, Chromebook, Nintendo Switch,PlayStation Controllers,Xbox Controller...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['fabindia-mens-cotton-handloom-kurta'] = { file: 'amazon-fabindia-mens-cotton-handloom-kurta.jpg', title: "Fabindia Fabnu Men Cotton Printed Mandarin Collar Full Sleeves Everyday Comfort Fit Kurta", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['cerave-resurfacing-retinol-serum-30-ml'] = { file: 'amazon-cerave-resurfacing-retinol-serum-30-ml.jpg', title: "CeraVe Resurfacing Retinol Serum For Blemish-Prone Skin, Reduces Post Acne Marks & Pores, Formulated with Licorice Root Ex...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['cerave-daily-moisturising-lotion-473-ml'] = { file: 'amazon-cerave-daily-moisturising-lotion-473-ml.jpg', title: "Sponsored Ad - CeraVe Moisturizing Lotion For Normal to Dry Skin (473ml) - Formulated With 3 Essential Ceramides And Hyalu...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['maybelline-fit-me-compact-powder-8-g-220'] = { file: 'amazon-maybelline-fit-me-compact-powder-8-g-220.jpg', title: "Maybelline New York Fit Me Matte + Poreless Powder, 220 Natural Beige", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['maybelline-instant-age-rewind-concealer-6-ml-120'] = { file: 'amazon-maybelline-instant-age-rewind-concealer-6-ml-120.jpg', title: "Maybelline Instant Age Rewind Eraser Treatt Makeup, Medium Coverage, Creamy Ivory 120, 20G Matte Finish For Dry Skin, Pack...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['davidoff-the-game-edt-100-ml'] = { file: 'amazon-davidoff-the-game-edt-100-ml.jpg', title: "Davidoff Cool Water Woman Eau de Toilette 100ml", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['davidoff-hot-water-edt-110-ml'] = { file: 'amazon-davidoff-hot-water-edt-110-ml.jpg', title: "Davidoff Cool Water Eau Man De Toilette 75Ml", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['loreal-paris-hyaluromic-shampoo-396-ml'] = { file: 'amazon-loreal-paris-hyaluromic-shampoo-396-ml.jpg', title: "L’Oréal Paris Hyaluron Pure 72H Purifying Shampoo, For oily scalp & dry hair with salicylic and hyaluronic acid 800mL + Co...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['loreal-paris-dream-lengths-conditioner-360-ml'] = { file: 'amazon-loreal-paris-dream-lengths-conditioner-360-ml.jpg', title: "L’Oreal Paris Glycolic Gloss Conditioner - 4% Glycolic Acid, 175ml | Dull hair rescue for a complete shine-seal routine. S...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['philips-smart-wi-fi-candle-bulb-5-5-w'] = { file: 'amazon-philips-smart-wi-fi-candle-bulb-5-5-w.jpg', title: "Wiz Wi-Fi 40W Yellow/White Smart Candle Type Bulb C37 E14 (Philips Lighting Guaranteed)", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['philips-portable-dusk-to-dawn-night-light'] = { file: 'amazon-philips-portable-dusk-to-dawn-night-light.jpg', title: "Philips LED SereneShine Plug-in Night Lamp 0.5W | Warm White LED Night Light | Soft Glare-Free Illumination | Energy Effic...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['chumbak-jaipur-tiles-wall-clock-30-cm'] = { file: 'amazon-chumbak-jaipur-tiles-wall-clock-30-cm.jpg', title: "Sponsored Ad - TEAL BY CHUMBAK Scooting Around Analog Wall Clock | 11 inch | Home Decor| Silent Sweep Movement | Mineral G...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['chumbak-indigo-floral-cushion-cover-set'] = { file: 'amazon-chumbak-indigo-floral-cushion-cover-set.jpg', title: "Chumbak Marigold Gala Cushion Cover | Multicoloured Cotton Blend Floral Printed Decorative Throw Pillow Case for Sofa, Bed...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['chumbak-sunset-city-ceramic-table-lamp'] = { file: 'amazon-chumbak-sunset-city-ceramic-table-lamp.jpg', title: "Chumbak Marigold Tiger Table Lamp | Multicolour Tiger Print Metal & Fabric Bedside Lamp for Bedroom, Living Room Decor | F...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['chumbak-handpainted-mango-wood-photo-frame'] = { file: 'amazon-chumbak-handpainted-mango-wood-photo-frame.jpg', title: "Chumbak Birdie Wooden Platter Cum Wall Decor Small | Citrus Collection | Mango Wood Wall Decor | Dual Use Platter | Bird D...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['wakefit-microfibre-reversible-comforter-king'] = { file: 'amazon-wakefit-microfibre-reversible-comforter-king.jpg', title: "Sponsored Ad - Wakefit Reversible Comforter - Double Bed | Grid Design Quilt AC Blanket for All-Season, Lightweight & Supe...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['wakefit-cloud-comfort-mattress-protector-king'] = { file: 'amazon-wakefit-cloud-comfort-mattress-protector-king.jpg', title: "Wakefit 100% Waterproof Terry Bamboo Mattress Protector, King - 72x72 inch | Breathable and Hypoallergenic Ultra Soft Fitt...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['spaces-textured-cotton-bath-mat'] = { file: 'amazon-spaces-textured-cotton-bath-mat.jpg', title: "Spaces Swift Flow Polyester 1726 GSM Machine Tufted Plain Large Bath Mat| Anti-Skid, Stain-Resistant & Easy-Care – 50 x 80...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['spaces-turkish-cotton-robe-large'] = { file: 'amazon-spaces-turkish-cotton-robe-large.jpg', title: "Spaces Airsoft 100% 100% Cotton 300 GSM Dobby Plain Large Bath Robe | Super Soft, Breathable & Quick Dry - Light Violet", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['prestige-omega-deluxe-5-piece-cookware-set'] = { file: 'amazon-prestige-omega-deluxe-5-piece-cookware-set.jpg', title: "Prestige Aluminum Omega Cookware Set, 3-Piece, 1.5 Liters, Red", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['prestige-platino-plus-3-piece-fry-pan-set'] = { file: 'amazon-prestige-platino-plus-3-piece-fry-pan-set.jpg', title: "Prestige Omega Deluxe Plus Aluminium Non-Stick Build Your Kitchen Set of 3 Cookware Set-Omni Tawa 25cm, Fry Pan 24cm/1.7L,...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['prestige-durastone-3-l-casserole'] = { file: 'amazon-prestige-durastone-3-l-casserole.jpg', title: "Prestige Durastone Hard Anodised 6 Layer Non-Stick Casserole with Glass Lid, (20 cm, 2.4 Litre, Black)", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['prestige-alpha-deluxe-cooktop-set'] = { file: 'amazon-prestige-alpha-deluxe-cooktop-set.jpg', title: "Mixino New Model Visual Pressure INDICATOR Compatible For prestige Deluxe Stainless Steel & Alpha Cooker models (Pack of 3)", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['bosch-vitapower-series-4-blender'] = { file: 'amazon-bosch-vitapower-series-4-blender.jpg', title: "Bosch CosMixx Pro 1000W Mixer Grinder | 5 Years Warranty on Motor | 4 Leak Proof Jars including Blender Jar | 22000 RPM He...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['havells-prestige-1-5-l-glass-kettle'] = { file: 'amazon-havells-prestige-1-5-l-glass-kettle.jpg', title: "Havells Culinox Multicook Kettle| 1.2 L Capacity| Food Grade Body with Cool Touch Handle| 3 Temperature Modes| Double Safe...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['havells-crysta-1-5-l-electric-kettle'] = { file: 'amazon-havells-crysta-1-5-l-electric-kettle.jpg', title: "Sponsored Ad - Havells Aqua Plus Electric Kettle 1.2 Litre, 1250 Watt | 304 Stainless Steel Inner Body | Cool Touch Body |...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['havells-delite-1-2-l-travel-kettle'] = { file: 'amazon-havells-delite-1-2-l-travel-kettle.jpg', title: "Havells Capture 1.2 L Multi-Cook Electric Kettle with Steamer | 650W |304 Stainless Steel Inner Body|Cooks Noodles, Rice, ...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['instant-vortex-mini-4-l-air-fryer'] = { file: 'amazon-instant-vortex-mini-4-l-air-fryer.jpg', title: "Sponsored Ad - Instant Vortex Plus 6L Air Fryer, 6-in-1 with 360° EvenCrisp Technology, Touch Control Panel, Uses 95% Less...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['corelle-livingware-mystic-grey-dinner-set-21-pc'] = { file: 'amazon-corelle-livingware-mystic-grey-dinner-set-21-pc.jpg', title: "Sponsored Ad - CORELLE LAPINUE1 21 Pcs Dinner Set for Family of 6 (Plates, Bowls & Platter) for Dining | Vitrelle 3 Layer ...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['corelle-classic-cafe-blue-dinner-set-21-pc'] = { file: 'amazon-corelle-classic-cafe-blue-dinner-set-21-pc.jpg', title: "1 : Corelle Livingware Dinner Plate, 10-1/4-Inch, Classic Cafe Blue", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['samsung-rt28-253-l-frost-free-refrigerator'] = { file: 'amazon-samsung-rt28-253-l-frost-free-refrigerator.jpg', title: "Samsung 236 L, 2 Star, Digital Inverter, Frost Free Double Door Refrigerator (RT40H28W2QHL, Gray Silver, 2026 Model)", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['eureka-forbes-ultimo-200-w-cordless-stick-vacuum'] = { file: 'amazon-eureka-forbes-ultimo-200-w-cordless-stick-vacuum.jpg', title: "Eureka ReactiClean 200W Lightweight Cordless Stick Vacuum, NEC410BK | 5.5 lbs Lightweight, Detachable Battery, Up to 50-Mi...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['eureka-forbes-trendzy-600-w-handheld-vacuum'] = { file: 'amazon-eureka-forbes-trendzy-600-w-handheld-vacuum.jpg', title: "Eureka Forbes Super Clean Handheld Vacuum Cleaner | 800 W | Powerful Suction, Blower Function | 7 Accessories | Car/Home/S...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['kelloggs-granola-almond-and-cranberry-450-g'] = { file: 'amazon-kelloggs-granola-almond-and-cranberry-450-g.jpg', title: "Kellogg’s Crunchy Almond Berry Crumble Granola 450g | 12-In-1 Power Breakfast | No Maida, No Palm Oil | Source of Protein...", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }

productPhotos['haldirams-classic-salted-peanuts-400-g'] = { file: 'amazon-haldirams-classic-salted-peanuts-400-g.jpg', title: "Haldiram Snacks - Salted Peanuts, 200g Pack", author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }
