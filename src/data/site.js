/**
 * Site-wide content & configuration.
 *
 * Every user-facing string lives here so copy can be edited in one place — the
 * same way a WordPress theme exposes brand copy through the customizer.
 *
 * ⚠️ CONTACT DETAILS: intentionally left empty. Replace the empty strings below
 * with the brand's real phone, email, social handles and address. No placeholder
 * business information has been invented.
 */

export const site = {
  name: 'نیلگون گالری',
  nameEn: 'Nilgoon Gallery',
  tagline: 'زیبایی در جزئیات است.',
  currency: 'تومان',
  founded: 'کارگاه نیلگون',

  nav: [
    { label: 'خانه', to: '/' },
    { label: 'محصولات', to: '/products', mega: true },
    { label: 'درباره ما', to: '/about' },
    { label: 'تماس با ما', to: '/contact' },
  ],

  /* ---------------------------------------------------------------- CONTACT
   * Fill these in with the real business information. Empty values render as
   * an em dash in the UI.
   */
  contact: {
    phone: '',
    email: '',
    instagram: '',
    whatsapp: '',
    address: '',
    hours: '',
  },

  hero: {
    eyebrow: 'مجموعه پاییز نیلگون',
    title: 'زیبایی در جزئیات است...',
    subtitle: 'مجموعه‌ای از خاص‌ترین کیف‌های زنانه',
    scroll: 'اسکرول کنید',
    /* Film shown in the hero. It plays frame by frame with the page scroll —
       swap this one URL to change the film. */
    video: 'https://media.base44.com/videos/public/6ac748a1a9a7402174db2732/6d2376f8d_nilgoon_hero_scroll_compressed.mp4',
  },

  home: {
    categoriesTitle: 'دسته‌بندی محصولات',
    categoriesSubtitle: 'دنیای نیلگون را بر اساس سبک خود انتخاب کنید',
    featuredTitle: 'منتخب نیلگون',
    featuredSubtitle: 'انتخابی از خاص‌ترین محصولات',
    newTitle: 'مجموعه جدید',
    newSubtitle: 'تازه‌ترین طرح‌های کارگاه نیلگون',
    storyTitle: 'داستان نیلگون',
    whyTitle: 'چرا نیلگون',
    videoCta: 'مشاهده مجموعه',
  },

  story: {
    lead: 'نیلگون از یک کارگاه کوچک و علاقه‌ای قدیمی به پارچه‌های دست‌دوز شروع شد.',
    paragraphs: [
      'هر کیف نیلگون از یک قالب خام آغاز می‌شود؛ ساده، بی‌پیرایه و آماده برای روایت خودش. پارچه‌های طرح‌دار سوزن‌دوزی هندی، یکی‌یکی انتخاب و روی قالب خام می‌نشینند.',
      'قاب‌های فلزی، قفل‌های نگین‌دار و آسترهای ابریشمی با دست پرداخت می‌شوند. هیچ دو کیف نیلگون کاملاً یکسان نیستند و همین تفاوت‌های کوچک، امضای کارگاه ما است.',
    ],
  },

  why: [
    {
      icon: 'hand',
      title: 'ساخت دست‌ساز',
      text: 'هر کیف در کارگاه نیلگون و به‌صورت دست‌ساز دوخته و پرداخت می‌شود.',
    },
    {
      icon: 'fabric',
      title: 'پارچه‌های ویژه',
      text: 'انتخاب پارچه طرح‌دار سوزن‌دوزی هندی روی قالب خام، با رنگ‌بندی محدود.',
    },
    {
      icon: 'sparkle',
      title: 'جزئیات بی‌نقص',
      text: 'قاب‌ها، قفل‌ها و نگین‌ها پیش از مونتاژ، یکی‌یکی بازرسی می‌شوند.',
    },
    {
      icon: 'leaf',
      title: 'تیراژ محدود',
      text: 'از هر طرح تعداد محدودی ساخته می‌شود تا خاص بماند.',
    },
  ],

  footer: {
    newsletterTitle: 'عضویت در خبرنامه نیلگون',
    newsletterText: 'از مجموعه‌های جدید و طرح‌های محدود باخبر شوید.',
    newsletterCta: 'عضویت',
    newsletterPlaceholder: 'ایمیل شما',
    links: [
      { label: 'خانه', to: '/' },
      { label: 'محصولات', to: '/products' },
      { label: 'درباره ما', to: '/about' },
      { label: 'تماس با ما', to: '/contact' },
    ],
    legal: [
      { label: 'قوانین', to: '/page/terms' },
      { label: 'حریم خصوصی', to: '/page/privacy' },
      { label: 'شرایط خرید', to: '/page/purchase' },
    ],
    copyright: 'تمامی حقوق برای نیلگون گالری محفوظ است.',
  },

  about: {
    title: 'درباره نیلگون',
    lead: 'نیلگون گالری، گالری دیجیتال کیف‌های دست‌دوز زنانه.',
    sections: [
      {
        title: 'داستان برند',
        text: 'نیلگون گالری با هدف ساختن کیف‌هایی آغاز شد که هم ساده باشند و هم خاص. ما به جای تولید انبوه، روی تیراژ محدود و کیفیت پارچه تمرکز می‌کنیم.',
      },
      {
        title: 'فلسفه دست‌ساز',
        text: 'هر کیف از یک قالب خام شروع می‌شود و با پارچه طرح‌دار سوزن‌دوزی هندی روی آن، شکل نهایی را پیدا می‌کند. این مسیر را با دست طی می‌کنیم.',
      },
      {
        title: 'کیفیت',
        text: 'قاب‌های فلزی، دوخت‌ها و آسترها پیش از ارسال بازرسی می‌شوند. تنها کیف‌هایی که معیارهای ما را رد کنند، به فروشگاه راه پیدا می‌کنند.',
      },
      {
        title: 'مواد اولیه',
        text: 'پارچه طرح‌دار روی قالب خام، قاب فلزی صیقلی، قفل نگین‌دار و آستر ابریشمی؛ مواد اصلی همه کیف‌های نیلگون هستند.',
      },
      {
        title: 'توجه به جزئیات',
        text: 'از انتخاب نگین تا پرداخت نهایی قاب، هر مرحله با دقت انجام می‌شود؛ چون به باور ما زیبایی در جزئیات است.',
      },
      {
        title: 'ارزش‌های برند',
        text: 'صداقت در توضیح محصول، احترام به دست‌ساز بودن و تعهد به کیفیت، ارزش‌هایی است که در نیلگون به آن پایبندیم.',
      },
    ],
  },

  account: {
    loginTitle: 'ورود به حساب کاربری',
    loginText: 'برای مشاهده سفارش‌ها و علاقه‌مندی‌ها وارد شوید.',
    phoneLabel: 'شماره موبایل',
    loginCta: 'ورود',
    logout: 'خروج',
    menu: [
      { key: 'orders', label: 'سفارش‌های من', icon: 'bag' },
      { key: 'profile', label: 'اطلاعات حساب', icon: 'user' },
      { key: 'addresses', label: 'آدرس‌ها', icon: 'pin' },
      { key: 'wishlist', label: 'علاقه‌مندی‌ها', icon: 'heart' },
    ],
  },

  messages: {
    emptyCart: 'سبد خرید شما خالی است',
    browseProducts: 'مشاهده محصولات',
    emptyWishlist: 'هنوز محصولی به علاقه‌مندی‌ها اضافه نکرده‌اید',
    noResults: 'محصولی با این مشخصات پیدا نشد',
    searchPlaceholder: 'جستجو در محصولات نیلگون...',
  },
}

export default site
