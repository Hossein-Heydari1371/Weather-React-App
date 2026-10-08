import PageHeader from '../components/layout/PageHeader'
import Button from '../components/ui/Button'
import { useSeo } from '../hooks/useSeo'

const PAGES = {
  terms: {
    title: 'قوانین',
    text: 'متن کامل قوانین فروشگاه در این صفحه قرار می‌گیرد. در نسخه وردپرس، این صفحه از برگه‌های وردپرس خوانده می‌شود.',
  },
  privacy: {
    title: 'حریم خصوصی',
    text: 'سیاست حفظ حریم خصوصی کاربران در این صفحه منتشر می‌شود. در نسخه وردپرس، این صفحه از برگه‌های وردپرس خوانده می‌شود.',
  },
  purchase: {
    title: 'شرایط خرید',
    text: 'شرایط ثبت سفارش، پرداخت و ارسال در این صفحه منتشر می‌شود. در نسخه وردپرس، این صفحه از برگه‌های وردپرس خوانده می‌شود.',
  },
}

/** LegalPage — placeholder for WordPress pages (terms, privacy, purchase). */
export default function LegalPage({ slug }) {
  const page = PAGES[slug] || { title: 'صفحه', text: 'این صفحه هنوز محتوایی ندارد.' }

  useSeo({ title: page.title, description: page.text, canonical: `/page/${slug}` })

  return (
    <>
      <PageHeader title={page.title} crumbs={[{ label: page.title }]} />
      <section className="ng-section">
        <div className="ng-prose">
          <p>{page.text}</p>
          <Button to="/" variant="outline">
            بازگشت به خانه
          </Button>
        </div>
      </section>
    </>
  )
}
