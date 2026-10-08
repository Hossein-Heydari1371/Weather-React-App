import useHashRoute from './hooks/useHashRoute';
import Navbar from './components/Navbar';
import Loader from './components/Loader';
import ToastHost from './components/ToastHost';
import Home from './components/home/Home';
import ProductsPage from './pages/ProductsPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import './styles/global.css';

export default function App() {
  const { path, query } = useHashRoute();

  let page;
  if (path === '/') page = <Home />;
  else if (path === '/products') page = <ProductsPage query={query} />;
  else if (path === '/about') page = <AboutPage />;
  else if (path === '/contact') page = <ContactPage />;
  else page = (
    <div className="page">
      <div className="page-inner notfound">
        <h1>۴۰۴</h1>
        <p>صفحه‌ای که دنبال آن بودید پیدا نشد.</p>
        <p><a href="#/">بازگشت به گالری</a></p>
      </div>
    </div>
  );

  return (
    <>
      <Loader />
      <Navbar route={{ path }} />
      {page}
      <ToastHost />
    </>
  );
}
