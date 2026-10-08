/**
 * Product categories.
 *
 * Shape maps 1:1 onto WooCommerce product categories:
 *   name        -> product_cat name
 *   slug        -> product_cat slug
 *   description -> product_cat description
 *   image       -> product_cat thumbnail (term meta)
 */

import { IMAGES } from './products'

export const categories = [
  {
    id: 'cat-majlesi',
    name: 'کیف مجلسی',
    slug: 'majlesi',
    description: 'کیف‌های مجلسی با جزئیات فاخر برای مهمانی و مراسم.',
    image: IMAGES.pearl,
  },
  {
    id: 'cat-clutch',
    name: 'کیف کلاچ',
    slug: 'clutch',
    description: 'کلاچ‌های کوچک با قاب فلزی و قفل‌های تزئینی.',
    image: IMAGES.mosaic,
  },
  {
    id: 'cat-dasti-koochak',
    name: 'کیف دستی کوچک',
    slug: 'dasti-koochak',
    description: 'کیف‌های دستی جمع‌وجور با فرم‌های مینیمال.',
    image: IMAGES.crescent,
  },
  {
    id: 'cat-dooshi-bozorg',
    name: 'کیف دوشی بزرگ',
    slug: 'dooshi-bozorg',
    description: 'کیف‌های دوشی جادار با بند بلند و فرم نرم.',
    image: IMAGES.pearl,
  },
  {
    id: 'cat-mobile',
    name: 'کیف موبایل',
    slug: 'mobile',
    description: 'کیف‌های کوچک موبایل با بند قابل تنظیم.',
    image: IMAGES.mosaic,
  },
  {
    id: 'cat-safar',
    name: 'کیف سفر',
    slug: 'safar',
    description: 'کیف‌های سفر با فضای داخلی باز و آستر مقاوم.',
    image: IMAGES.crescent,
  },
]

export const categoryBySlug = (slug) => categories.find((c) => c.slug === slug) || null

export const categoryByName = (name) => categories.find((c) => c.name === name) || null
