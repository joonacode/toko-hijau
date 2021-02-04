import { InterfaceProduct } from '../../Interface'
type typeToko = {
  tokoId: number
  tokoName: string
  tokoAddress: string
}

const tokoA: typeToko = {
  tokoId: 1,
  tokoName: 'Toko A',
  tokoAddress: 'Bandung',
}
const tokoB: typeToko = {
  tokoId: 2,
  tokoName: 'Toko B',
  tokoAddress: 'Jakarta',
}
const tokoC: typeToko = {
  tokoId: 3,
  tokoName: 'Toko C',
  tokoAddress: 'Surabaya',
}

export const dumyProducts: InterfaceProduct[] = [
  {
    id: 1,
    name: 'Jaket main murah meriah',
    color: ['Hijau', 'Merah', 'Putih', 'Biru'],
    size: ['S', 'M', 'L', 'XL'],
    slug: 'jaket-main-murah-meriah',
    price: 120000,
    image: 'https://cf.shopee.co.id/file/bd94bcc5d73b5591f5e66183a8e439e8',
    ...tokoA,
  },
  {
    id: 2,
    name: 'FF kaos pria II kaos distro sablon digital berkualitas',
    color: ['Hijau', 'Merah', 'Putih', 'Biru'],
    size: ['S', 'M', 'L', 'XL'],
    slug: 'FF-kaos-pria-ii-kaos-distro-sablon-digital-berkualitas',
    price: 55000,
    image: 'https://cf.shopee.co.id/file/69406f43d6c698ff8d7870fd882c165e',
    ...tokoB,
  },
  {
    id: 3,
    name: 'Baju Distro UNKILLED Kaos Distro Kaos Pria Keren',
    color: ['Hijau', 'Merah', 'Putih', 'Biru'],
    size: ['S', 'M', 'L', 'XL'],
    slug: 'baju-distro-unkilled-kaos-distro-kaos-pria-keren',
    price: 85000,
    image:
      'https://s3.bukalapak.com/img/3648111666/large/Baju_Distro_UNKILLED_Kaos_Distro_Kaos_Pria_Keren.jpg',
    ...tokoC,
  },
  {
    id: 4,
    name: 'Baju Anak Import Setelan Kaos Anak Laki Laki Murah',
    color: ['Hijau', 'Merah', 'Putih', 'Biru'],
    size: ['S', 'M', 'L', 'XL'],
    slug: 'baju-anak-import-setelan-kaos-anak-laki-laki-murah',
    price: 95000,
    image:
      'https://ecs7.tokopedia.net/img/cache/700/product-1/2018/6/7/11902367/11902367_07fa68c6-8845-4d5d-96d0-388689b4e401_800_800.jpg',
    ...tokoA,
  },
  {
    id: 5,
    name: 'Kaos Anak Laki-Laki Pakaian Anak Cowok Korean Style',
    color: ['Hijau', 'Merah', 'Putih', 'Biru'],
    size: ['S', 'M', 'L', 'XL'],
    slug: 'kaos-anak-laki-laki-pakaian-anak-cowok-korean-style',
    price: 58000,
    image:
      'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//88/MTA-4404291/onlinebaby-id_kaos_anak_laki-laki_pakaian_anak_cowok_korean_style_premium_hq_0071_full02_b7fzl1q3.jpg',
    ...tokoA,
  },
  {
    id: 6,
    name: 'Sepatu Sport Conxegn',
    color: ['Hijau', 'Merah', 'Putih', 'Biru'],
    size: ['S', 'M', 'L', 'XL'],
    slug: 'sepatu-sport-conxegn',
    price: 105000,
    image: 'https://cf.shopee.co.id/file/73221e2229b2257d88695f49981bdd41',
    ...tokoA,
  },
  {
    id: 7,
    name: 'Sepatu Sekolah Compassid ORIGINAL READY BIG SIZE 4',
    color: ['Hijau', 'Merah', 'Putih', 'Biru'],
    size: ['S', 'M', 'L', 'XL'],
    slug: 'sepatu-sekolah-compassid-original-ready-big-size-4',
    price: 125000,
    image: 'https://cf.shopee.co.id/file/e1e4ded7f4f16f6271e6bf55cd41f89f',
    ...tokoA,
  },
  {
    id: 8,
    name: 'COD Jaket Pria Sweater Hoodie Distro ORIGINAL JUMPER',
    color: ['Hijau', 'Merah', 'Putih', 'Biru'],
    size: ['S', 'M', 'L', 'XL'],
    slug: 'cod-jaket-pria-sweater-hoodie-distro-original-jumper',
    price: 87000,
    image:
      'https://id-test-11.slatic.net/p/1580415ee2c77a1fe998f24858a91a23.jpg',
    ...tokoA,
  },
  {
    id: 9,
    name: 'Baju Koko Lengan Panjang',
    color: ['Hijau', 'Merah', 'Putih', 'Biru'],
    size: ['S', 'M', 'L', 'XL'],
    slug: 'baju-koko-lengan-panjang',
    price: 60000,
    image:
      'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//89/MTA-8741123/no_brand_baju_koko_lengan_panjang_-_baju_koko_pria_-_baju_koko_murah_-_baju_koko_terbaru_-_baju_koko_pria_muslimin_-_koko_pria_lengan_panjang_list_bluberry_full02_ejiti93i.jpg',
    ...tokoA,
  },
  {
    id: 10,
    name: 'GAMIS SYARI POLOS MIRA PLUS KERUDUNG TERBARU',
    color: ['Hijau', 'Merah', 'Putih', 'Biru'],
    size: ['S', 'M', 'L', 'XL'],
    slug: 'gamis-syari-polos-mira-plus-kerudung-terbaru',
    price: 120000,
    image: 'https://cf.shopee.co.id/file/84b9c8f15feb162e7617e12be6b12e79',
    ...tokoA,
  },
  {
    id: 11,
    name: 'Hitjab 8309 Rihana Baju Gamis Polos',
    color: ['Hijau', 'Merah', 'Putih', 'Biru'],
    size: ['S', 'M', 'L', 'XL'],
    slug: 'hitjab-8309-rihana-baju-gamis-polos',
    price: 540000,
    image:
      'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//106/MTA-4896934/hitjab_hitjab_8309_baju_gamis_rihana__gamis_pesta_polos_full04_n40ljgco.jpg',
    ...tokoA,
  },
  {
    id: 12,
    name: 'Celana Chino Pria Panjang',
    color: ['Hijau', 'Merah', 'Putih', 'Biru'],
    size: ['S', 'M', 'L', 'XL'],
    slug: 'celana-chino-pria-panjang',
    price: 71000,
    image: 'https://cdn.elevenia.co.id/g/9/1/2/8/0/7/14912807_B_V15.jpg',
    ...tokoA,
  },
]
