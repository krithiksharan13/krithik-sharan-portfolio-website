
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import { useVisitorTracking } from '@/hooks/useVisitorTracking';

const Layout = () => {
  useVisitorTracking();

  return (
    <div className="bg-background text-foreground flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow" style={{ paddingTop: '64px' }}>
        <Suspense fallback={<div className="flex justify-center items-center h-full">Loading...</div>}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
