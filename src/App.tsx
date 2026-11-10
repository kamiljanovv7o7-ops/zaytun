import React from 'react';
import { AppProvider } from './context/AppContext';
import { Header } from './components/Header';
import { DishTicker } from './components/DishTicker';
import { Hero } from './components/Hero';
import { MenuSection } from './components/MenuSection';
import { DeliverySection } from './components/DeliverySection';
import { GoogleMapSection } from './components/GoogleMapSection';
import { AboutSection } from './components/AboutSection';
import { Footer } from './components/Footer';
import { DishModal } from './components/DishModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { UserCabinet } from './components/UserCabinet';
import { OrderTrackingModal } from './components/OrderTrackingModal';
import { TableReservationModal } from './components/TableReservationModal';
import { StandaloneQRModal } from './components/StandaloneQRModal';
import { ZaytunRewardsModal } from './components/ZaytunRewardsModal';
import { ToastContainer } from './components/Toast';

export default function App() {
  const [quotaExceeded, setQuotaExceeded] = React.useState(false);

  React.useEffect(() => {
    const handleQuota = () => setQuotaExceeded(true);
    window.addEventListener('gmp-quota-exceeded', handleQuota);
    return () => window.removeEventListener('gmp-quota-exceeded', handleQuota);
  }, []);

  return (
    <AppProvider>
      <div className="min-h-screen bg-[#08120a] text-stone-100 flex flex-col font-sans selection:bg-amber-500 selection:text-stone-950">
        {/* Quota Exceeded In-App Warning Banner */}
        {quotaExceeded && (
          <div className="bg-amber-50 border-b border-amber-200 text-amber-900 px-4 py-2.5 text-xs md:text-sm text-center sticky top-0 z-50 shadow-sm">
            <span>
              Google Maps Platform quota reached. If you are the app owner, visit{' '}
              <a
                href="https://developers.google.com/maps/ai/ai-studio?utm_campaign=gmp_mcp_codeassist_v1_aistudio#quota_exceeded_errors"
                target="_blank"
                rel="noopener noreferrer"
                className="underline font-semibold text-amber-950 hover:text-amber-800"
              >
                maps developer site
              </a>{' '}
              for instructions to update your account.
            </span>
          </div>
        )}

        {/* Navigation Bar */}
        <Header />

        {/* Running Food Prices Marquee Ticker */}
        <DishTicker />

        {/* Main Content Sections */}
        <main className="flex-1">
          <Hero />
          {/* Google Maps Location - Manas street 247A, Uzgen */}
          <GoogleMapSection />
          <MenuSection />
          <DeliverySection />
          <AboutSection />
        </main>




        {/* Footer */}
        <Footer />

        {/* Interactive Modals & Slide-out Drawers */}
        <DishModal />
        <CartDrawer />
        <CheckoutModal />
        <UserCabinet />
        <OrderTrackingModal />
        <TableReservationModal />
        <StandaloneQRModal />
        <ZaytunRewardsModal />
        <ToastContainer />
      </div>
    </AppProvider>
  );
}

