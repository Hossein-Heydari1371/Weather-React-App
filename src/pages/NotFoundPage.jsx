import PageHeader from '../components/layout/PageHeader'
import Button from '../components/ui/Button'
import { useSeo } from '../hooks/useSeo'

export default function NotFoundPage() {
  useSeo({ title: 'صفحه پیدا نشد', description: 'صفحه مورد نظر یافت نشد.' })

  return (
    <>
      <PageHeader title="صفحه پیدا نشد" crumbs={[{ label: 'خطای ۴۰۴' }]} />
      <section className="ng-section">
        <div className="ng-prose ng-prose--center">
          <p>متأسفیم، صفحه‌ای که به دنبال آن بودید وجود ندارد یا حذف شده است.</p>
          <div className="ng-prose__actions">
            <Button to="/products" variant="gold">
              مشاهده محصولات
            </Button>
            <Button to="/" variant="outline">
              بازگشت به خانه
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
