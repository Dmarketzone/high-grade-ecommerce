import {PRODUCT_IMAGES, type CatalogImage} from './product-images';

/**
 * Manufacturer-referenced editorial catalog, checked 2026-11-02.
 * These records have no Shopify variants, prices, inventory, or verified fitment.
 * See docs/catalog-sources.md before converting one into a commercial listing.
 */
export const CATEGORIES = [
  {
    slug: 'oem-audio',
    name: 'OEM Plug & Play Audio',
    description:
      'Thoughtful upgrades that start with your factory system. Exact fitment is confirmed with an advisor.',
  },
  {
    slug: 'speakers-subwoofers',
    name: 'Speakers & Subwoofers',
    description:
      'Explore individual drivers and complete kits for a carefully designed listening experience.',
  },
  {
    slug: 'amplifiers-dsp',
    name: 'Amplifiers & DSP',
    description:
      'Amplification and signal processing for control, integration, and a system tuned to you.',
  },
  {
    slug: 'radar-laser',
    name: 'Radar Detectors & Laser Defense',
    description:
      'Compare radar detection technology and discuss a considered installation.',
  },
  {
    slug: 'dash-cameras',
    name: 'Dash Cameras',
    description:
      'Front, rear, and connected camera options. Hardware and subscription needs vary by system.',
  },
  {
    slug: 'security-accessories',
    name: 'Vehicle Security & Accessories',
    description:
      'Connected modules and accessories, selected around your vehicle and existing equipment.',
  },
] as const;

export type CategorySlug = (typeof CATEGORIES)[number]['slug'];
export type Product = {
  slug: string;
  brand: string;
  family: string;
  name: string;
  category: CategorySlug;
  kind:
    | 'speaker'
    | 'subwoofer'
    | 'amplifier'
    | 'radar'
    | 'camera'
    | 'oem'
    | 'accessory';
  summary: string;
  description: string;
  specs: {label: string; value: string}[];
  sourceUrl: string;
  checkedAt: string;
  manufacturerStatus: string;
  commerce: 'consultation';
  fitment: {status: 'unverified'; note: string};
  imagery: {
    status: 'manufacturer-review';
    note: string;
    images: CatalogImage[];
  };
  featured: boolean;
};

type CatalogInput = Omit<
  Product,
  | 'checkedAt'
  | 'commerce'
  | 'fitment'
  | 'imagery'
  | 'manufacturerStatus'
  | 'featured'
> & {
  fitmentNote?: string;
  manufacturerStatus?: string;
  featured?: boolean;
};

function product(input: CatalogInput): Product {
  const {fitmentNote, manufacturerStatus, featured, ...details} = input;
  return {
    ...details,
    checkedAt: '2026-11-02',
    manufacturerStatus:
      manufacturerStatus ??
      'Listed in the manufacturer catalog; High Grade availability is unconfirmed.',
    commerce: 'consultation',
    fitment: {
      status: 'unverified',
      note:
        fitmentNote ??
        'Vehicle fitment has not been verified. Mounting, wiring, system design, and factory equipment need an installation review.',
    },
    imagery: {
      status: 'manufacturer-review',
      note: 'Official manufacturer photography used for client review. Commercial publication rights require confirmation.',
      images: PRODUCT_IMAGES[input.slug],
    },
    featured: featured ?? false,
  };
}

export const PRODUCTS: Product[] = [
  product({
    slug: 'focal-tbm',
    brand: 'Focal',
    family: 'Utopia M',
    name: 'TBM',
    category: 'speakers-subwoofers',
    kind: 'speaker',
    summary:
      'Beryllium tweeters for an individually specified Utopia M system.',
    description:
      'A pair of tweeters combining an M-profile beryllium diaphragm with Focal’s TMD suspension. Designed as a component of a custom system, rather than a vehicle-specific replacement kit.',
    specs: [
      {label: 'Format', value: 'Pair of tweeters'},
      {label: 'Diaphragm', value: 'M-profile beryllium'},
      {label: 'Impedance', value: '4 Ω'},
      {label: 'Nominal power', value: '20 W RMS'},
    ],
    sourceUrl: 'https://www.focal.com/products/tbm',
  }),
  product({
    slug: 'focal-6-wm',
    brand: 'Focal',
    family: 'Utopia M',
    name: '6 WM',
    category: 'speakers-subwoofers',
    kind: 'speaker',
    featured: true,
    summary: 'A shallow-profile 6.5-inch woofer with an M-profile W cone.',
    description:
      'The 6 WM brings Focal’s W sandwich diaphragm and TMD suspension to a woofer designed for a custom installation. Its compact mounting depth helps the installer plan a discreet integration.',
    specs: [
      {label: 'Driver size', value: '165 mm / 6.5 in'},
      {label: 'Mounting depth', value: '51.5 mm'},
      {label: 'Impedance', value: '4 Ω'},
      {label: 'Nominal power', value: '100 W RMS'},
    ],
    sourceUrl: 'https://www.focal.com/products/6wm',
  }),
  product({
    slug: 'focal-3-5-wm',
    brand: 'Focal',
    family: 'Utopia M',
    name: '3.5 WM',
    category: 'speakers-subwoofers',
    kind: 'speaker',
    summary: 'A compact midrange driver for a precisely designed front stage.',
    description:
      'This Utopia M midrange uses an M-profile W diaphragm, TMD suspension, and a neodymium motor. It is a separate driver for a custom system and requires a review of mounting space and signal processing.',
    specs: [
      {label: 'Driver size', value: '3.5 in midrange'},
      {label: 'Mounting depth', value: '31 mm'},
      {label: 'Impedance', value: '4 Ω'},
      {label: 'Nominal power', value: '50 W RMS'},
    ],
    sourceUrl: 'https://www.focal.com/products/35wm',
  }),
  product({
    slug: 'focal-sub-10-wm',
    brand: 'Focal',
    family: 'Utopia M',
    name: 'SUB 10 WM',
    category: 'speakers-subwoofers',
    kind: 'subwoofer',
    summary: 'A 10-inch Utopia M subwoofer for a purpose-designed enclosure.',
    description:
      'The SUB 10 WM pairs an M-profile W diaphragm with a dual-voice-coil design. Focal specifies operation in a sealed enclosure from 10 liters; final enclosure design and amplifier loading need professional assessment.',
    specs: [
      {label: 'Size', value: '10 in'},
      {label: 'Nominal power', value: '400 W RMS'},
      {label: 'Mounting depth', value: '108 mm'},
      {label: 'Minimum sealed volume', value: '10 L, per manufacturer'},
    ],
    sourceUrl: 'https://www.focal.com/products/sub-10wm',
  }),
  product({
    slug: 'focal-6-5-km',
    brand: 'Focal',
    family: 'K2 Power M',
    name: '6.5 KM',
    category: 'speakers-subwoofers',
    kind: 'speaker',
    featured: true,
    summary: 'Focal’s yellow K2 diaphragm, shaped for a custom active system.',
    description:
      'An individual 165 mm woofer with an M-profile K2 diaphragm. It belongs to Focal’s configurable K2 Power M range, where individual drivers are selected around the installation rather than supplied as a predefined vehicle kit.',
    specs: [
      {label: 'Driver size', value: '165 mm / 6.5 in'},
      {label: 'Mounting depth', value: '54 mm'},
      {label: 'Impedance', value: '4 Ω'},
      {label: 'Nominal power', value: '120 W RMS'},
    ],
    sourceUrl: 'https://www.focal.com/products/65-km',
  }),
  product({
    slug: 'focal-sub-5-km',
    brand: 'Focal',
    family: 'K2 Power M',
    name: 'SUB 5 KM',
    category: 'speakers-subwoofers',
    kind: 'subwoofer',
    summary: 'A compact K2 Power M subwoofer for a tailored bass solution.',
    description:
      'This individual subwoofer uses an M-profile K2 diaphragm and a ferrite motor. Its small format is intended for a custom system; enclosure requirements and vehicle packaging must be reviewed before specifying it.',
    specs: [
      {label: 'Manufacturer format', value: '145 mm subwoofer'},
      {label: 'Nominal power', value: '200 W RMS'},
      {label: 'Impedance', value: '4 Ω'},
      {label: 'Mounting depth', value: '69 mm'},
    ],
    sourceUrl: 'https://www.focal.com/products/sub-5-km',
  }),
  product({
    slug: 'focal-tweeter-frak',
    brand: 'Focal',
    family: 'K2 Power M',
    name: 'Tweeter FRAK',
    category: 'speakers-subwoofers',
    kind: 'speaker',
    summary: 'A 32 mm aluminum/magnesium tweeter with an M-profile diaphragm.',
    description:
      'FRAK is an individual tweeter in the K2 Power M range. Its aluminum/magnesium M-profile diaphragm and neodymium motor are intended for a carefully specified custom front-stage system.',
    specs: [
      {label: 'Format', value: '32 mm tweeter'},
      {label: 'Diaphragm', value: 'Aluminum/magnesium, M profile'},
      {label: 'Impedance', value: '4 Ω'},
      {label: 'Nominal power', value: '25 W RMS'},
    ],
    sourceUrl: 'https://www.focal.com/products/tweeter-frak',
  }),
  product({
    slug: 'focal-es-165-kx3e',
    brand: 'Focal',
    family: 'K2 Power',
    name: 'ES 165 KX3E',
    category: 'speakers-subwoofers',
    kind: 'speaker',
    summary: 'A complete three-way component kit from the K2 Power family.',
    description:
      'This kit combines two 165 mm woofers, two 80 mm midrange drivers, and two FRAK tweeters. It is a custom audio component kit, not a Focal Inside vehicle-specific Plug & Play product.',
    specs: [
      {label: 'Format', value: '3-way component kit'},
      {label: 'Woofers', value: '2 × 165 mm'},
      {label: 'Midrange drivers', value: '2 × 80 mm'},
      {label: 'Nominal power', value: '120 W RMS'},
    ],
    sourceUrl: 'https://www.focal.com/products/es-165-kx3e',
  }),
  product({
    slug: 'gladen-aerospace-165-pp',
    brand: 'Gladen',
    family: 'Aerospace',
    name: 'Aerospace 165 PP',
    category: 'speakers-subwoofers',
    kind: 'speaker',
    featured: true,
    summary: 'A 165 mm phase-plug woofer from Gladen’s Aerospace range.',
    description:
      'An individual woofer option in Gladen’s Aerospace speaker family. The manufacturer identifies its phase-plug design and 3-ohm impedance; an advisor should select the amplification and mounting approach for your system.',
    specs: [
      {label: 'Driver size', value: '165 mm'},
      {label: 'Design', value: 'Phase-plug woofer'},
      {label: 'Impedance', value: '3 Ω'},
    ],
    sourceUrl:
      'https://www.gladen.com/en-us/gladen/speaker/gladen-aerospace-speaker',
  }),
  product({
    slug: 'gladen-aerospace-80-pp',
    brand: 'Gladen',
    family: 'Aerospace',
    name: 'Aerospace 80 PP',
    category: 'speakers-subwoofers',
    kind: 'speaker',
    summary: 'An 80 mm phase-plug midrange with Gladen’s C5 diaphragm.',
    description:
      'This separate Aerospace midrange uses a Gladen C5 cone and an aluminum phase plug. It is designed as part of a multi-driver installation, with crossover design and mounting assessed for the vehicle.',
    specs: [
      {label: 'Driver size', value: '80 mm'},
      {label: 'Impedance', value: '3 Ω'},
      {label: 'Cone', value: 'Gladen C5'},
      {label: 'Phase plug', value: 'Aluminum'},
    ],
    sourceUrl:
      'https://www.gladen.com/en-us/gladen/speaker/gladen-aerospace-speaker/gladen-aerospace-80',
  }),
  product({
    slug: 'gladen-pro-165',
    brand: 'Gladen',
    family: 'Pro',
    name: 'PRO 165',
    category: 'speakers-subwoofers',
    kind: 'speaker',
    summary: 'A midbass driver for an active two-way or three-way front stage.',
    description:
      'Gladen’s PRO 165 uses a mineral-coated paper cone and a 38 mm voice coil. The manufacturer positions it as the midbass foundation of an active sound-quality system, requiring suitable amplification and processing.',
    specs: [
      {label: 'Driver size', value: '165 mm'},
      {label: 'Impedance', value: '3 Ω'},
      {label: 'Voice coil', value: '38 mm'},
      {label: 'Cone', value: 'Mineral-coated paper'},
    ],
    sourceUrl:
      'https://www.gladen.com/en-us/gladen/speaker/gladen-pro-speaker/gladen-pro-165',
  }),
  product({
    slug: 'mosconi-pro-4-10-evo',
    brand: 'Mosconi',
    family: 'Pro EVO',
    name: 'PRO 4|10 EVO',
    category: 'amplifiers-dsp',
    kind: 'amplifier',
    summary: 'Four-channel Class AB amplification with DirectDSP input.',
    description:
      'The PRO 4|10 EVO is a four-channel amplifier with DIP-switch input adjustment. Its DirectDSP input is intended for external signal processors; this model should not be confused with an amplifier containing an integrated DSP.',
    specs: [
      {label: 'Amplified channels', value: '4'},
      {label: 'Architecture', value: 'Class AB'},
      {label: 'Output at 4 Ω', value: '4 × 120 W'},
      {label: 'DSP', value: 'External DSP connection; not integrated'},
    ],
    sourceUrl:
      'https://www.gladen.com/en-us/mosconi/mosconi-pro-evo/mosconi-pro-4-10-evo',
  }),
  product({
    slug: 'mosconi-pro-8-30-dsp-evo',
    brand: 'Mosconi',
    family: 'Pro EVO',
    name: 'PRO 8|30 DSP EVO',
    category: 'amplifiers-dsp',
    kind: 'amplifier',
    featured: true,
    summary:
      'Eight channels of amplification, with an integrated 12-channel DSP.',
    description:
      'The DSP-equipped PRO EVO model combines eight amplified channels with a 12-channel signal processor. It provides a platform for a custom multi-channel system; amplifier loading, processing, and factory integration need a complete installation plan.',
    specs: [
      {label: 'Amplified channels', value: '8'},
      {label: 'Integrated DSP', value: '12 channels'},
      {label: 'Processing', value: '96 kHz / 24-bit'},
      {label: 'Output at 4 Ω', value: '4 × 90 W + 4 × 170 W RMS'},
    ],
    sourceUrl: 'https://www.gladen.com/en-us/mosconi/mosconi-pro-evo',
  }),
  product({
    slug: 'mosconi-one-6-10-dsp',
    brand: 'Mosconi',
    family: 'One',
    name: 'ONE 6|10 DSP',
    category: 'amplifiers-dsp',
    kind: 'amplifier',
    summary: 'Six-channel Class AB amplification with ten channels of DSP.',
    description:
      'The ONE 6|10 DSP combines an analog amplifier section with an integrated ten-channel processor. The manufacturer offers 12 V and 24 V versions; the correct version and wiring must be confirmed during consultation.',
    specs: [
      {label: 'Amplified channels', value: '6'},
      {label: 'Integrated DSP', value: '10 channels'},
      {label: 'Architecture', value: 'Class AB'},
      {label: 'Output at 4 Ω', value: '6 × 100 W'},
    ],
    sourceUrl:
      'https://www.gladen.com/en-us/mosconi/mosconi-one/mosconi-one-6-10-dsp',
  }),
  product({
    slug: 'focal-is-bmw-100-v2',
    brand: 'Focal',
    family: 'Focal Inside',
    name: 'IS BMW 100 v2',
    category: 'oem-audio',
    kind: 'oem',
    summary: 'A Focal Inside two-way kit for selected BMW applications.',
    description:
      'This manufacturer-designated Plug & Play component kit uses Polyglass drivers and aluminum/magnesium inverted-dome tweeters. Its BMW application does not establish fitment for every model, year, or factory audio package.',
    specs: [
      {label: 'Format', value: '2-way component kit'},
      {label: 'Cone', value: 'Polyglass'},
      {label: 'Nominal power', value: '40 W RMS'},
      {label: 'Impedance', value: '4 Ω'},
    ],
    fitmentNote:
      'Focal describes selected BMW applications. Exact model, year, generation, mounting position, and factory audio package require confirmation using the manufacturer fitment guide and a vehicle inspection.',
    sourceUrl: 'https://www.focal.com/products/is-bmw-100-v2',
  }),
  product({
    slug: 'focal-is-mbz-100-v2',
    brand: 'Focal',
    family: 'Focal Inside',
    name: 'IS MBZ 100 V2',
    category: 'oem-audio',
    kind: 'oem',
    summary:
      'A Focal Inside two-way kit for selected Mercedes-Benz applications.',
    description:
      'This manufacturer-designated Plug & Play component kit combines Flax cone midrange drivers with aluminum inverted-dome tweeters. An application-specific kit still needs exact vehicle and factory-system verification before it is specified.',
    specs: [
      {label: 'Format', value: '2-way component kit'},
      {label: 'Cone', value: 'Flax'},
      {label: 'Nominal power', value: '50 W RMS'},
      {label: 'Impedance', value: '4 Ω'},
    ],
    fitmentNote:
      'Focal describes selected Mercedes-Benz applications. Exact model, year, generation, mounting position, and factory audio package require confirmation using the manufacturer fitment guide and a vehicle inspection.',
    sourceUrl: 'https://www.focal.com/products/is-mbz-100-v2',
  }),
  product({
    slug: 'uniden-r8w',
    brand: 'UNIDEN',
    family: 'R-Series',
    name: 'R8w',
    category: 'radar-laser',
    kind: 'radar',
    featured: true,
    summary:
      'Dual-antenna radar detection with directional alerts and Wi-Fi updates.',
    description:
      'The R8w combines dual-antenna directional detection, GPS functions, and wireless firmware and database updates. This is a radar detector, not a laser-jamming system. Installation, permitted use, and local requirements should be discussed with your advisor.',
    specs: [
      {
        label: 'Detection design',
        value: 'Dual antennas with directional alerts',
      },
      {label: 'Connectivity', value: 'Wi-Fi and Bluetooth'},
      {label: 'Location features', value: 'GPS'},
      {label: 'Updates', value: 'Wi-Fi firmware and camera database updates'},
    ],
    manufacturerStatus:
      'Listed in UNIDEN’s current radar catalog on 2026-11-02, without an out-of-stock label. This is not a claim of High Grade stock.',
    sourceUrl: 'https://uniden.com/products/r8w',
  }),
  product({
    slug: 'uniden-r4w',
    brand: 'UNIDEN',
    family: 'R-Series',
    name: 'R4w',
    category: 'radar-laser',
    kind: 'radar',
    summary: 'A compact radar detector with GPS learning and wireless updates.',
    description:
      'The R4w offers GPS-based false-alert learning, an OLED display, and Wi-Fi updating. It is a standalone radar detector rather than an installed laser-defense package; mounting and power routing should be reviewed for your vehicle.',
    specs: [
      {label: 'Updates', value: 'Built-in Wi-Fi'},
      {label: 'Location features', value: 'GPS auto-lockouts'},
      {label: 'Display', value: 'Multicolor OLED'},
      {label: 'Phone connectivity', value: 'Bluetooth / R-TACH app support'},
    ],
    manufacturerStatus:
      'Listed in UNIDEN’s current radar catalog on 2026-11-02, without an out-of-stock label. This is not a claim of High Grade stock.',
    sourceUrl: 'https://uniden.com/products/r4w',
  }),
  product({
    slug: 'dronemobile-xc',
    brand: 'DroneMobile',
    family: 'XC',
    name: 'XC Dash Camera',
    category: 'dash-cameras',
    kind: 'camera',
    summary: 'A connected 1440p dash camera with an additional camera input.',
    description:
      'The XC-LTE combines front recording, GPS, and LTE connectivity. It can be installed on its own or paired with compatible aftermarket security or remote-start hardware. Connected services require an applicable subscription; hardware and installation are assessed separately.',
    specs: [
      {label: 'Model', value: 'XC-LTE'},
      {label: 'Front resolution', value: '1440p'},
      {label: 'Front field of view', value: '135°'},
      {label: 'Expansion', value: 'One additional rear/interior camera input'},
    ],
    manufacturerStatus:
      'Official XC product page remains listed; XC2 is the camera in the main hardware catalog. Current XC supply and lifecycle require dealer confirmation.',
    sourceUrl: 'https://www.dronemobile.com/products/xc-lte-dash-cam',
  }),
  product({
    slug: 'dronemobile-xc2',
    brand: 'DroneMobile',
    family: 'XC2',
    name: 'XC2 Dash Camera',
    category: 'dash-cameras',
    kind: 'camera',
    featured: true,
    summary:
      '2K QHD recording, LTE connectivity, and support for up to three cameras.',
    description:
      'The XC2-LTE supports front, rear, and interior video inputs, with optional cameras chosen for the installation. LTE-based functions such as remote viewing require a subscription. Compatible security or remote-start integration needs additional equipment and verification.',
    specs: [
      {label: 'Model', value: 'XC2-LTE'},
      {label: 'Front resolution', value: '2K QHD / 1440p'},
      {label: 'Video inputs', value: 'Up to 3'},
      {label: 'Frame rate', value: '30 fps'},
    ],
    sourceUrl: 'https://www.dronemobile.com/products/xc2-lte-dash-cam',
  }),
  product({
    slug: 'dronemobile-rc1',
    brand: 'DroneMobile',
    family: 'XC camera accessories',
    name: 'RC1 Rear Camera',
    category: 'dash-cameras',
    kind: 'accessory',
    summary: 'A rear-facing camera add-on for a compatible Drone XC system.',
    description:
      'The RC1 is a camera accessory, not a standalone dash camera or security module. The official page identifies model XC-RC100 and compatibility with Drone XC. Confirm camera-generation compatibility and cable routing before selecting it for a system.',
    specs: [
      {label: 'Model', value: 'XC-RC100'},
      {label: 'Resolution', value: 'FHD 1080p'},
      {label: 'Field of view', value: '146°'},
      {label: 'Frame rate', value: '30 fps'},
    ],
    fitmentNote:
      'The manufacturer lists this as an add-on for Drone XC. Vehicle installation and compatibility with a particular XC/XC2 hardware revision must be confirmed; this page does not assert universal XC2 compatibility.',
    sourceUrl: 'https://www.dronemobile.com/accessories/xc-rc1-rear-camera',
  }),
  product({
    slug: 'dronemobile-x2max',
    brand: 'DroneMobile',
    family: 'Connected security',
    name: 'X2MAX Module',
    category: 'security-accessories',
    kind: 'accessory',
    summary:
      'An LTE and GPS connectivity module for a compatible vehicle system.',
    description:
      'X2MAX is a connected module, not a dash camera and not a complete alarm by itself. It is offered for U.S. customers and requires compatible hardware and a DroneMobile service plan. An advisor must confirm the equipment and service required for your installation.',
    specs: [
      {label: 'Product type', value: 'LTE / GPS connectivity module'},
      {label: 'Market', value: 'U.S. customers'},
      {label: 'Video recording', value: 'Not a dash camera'},
      {label: 'Connected service', value: 'Subscription required'},
    ],
    sourceUrl: 'https://www.dronemobile.com/products/x2max-lte',
  }),
];

export const BRANDS = [
  'Focal',
  'Gladen',
  'Mosconi',
  'UNIDEN',
  'DroneMobile',
] as const;
