import React, { useState } from "react";
import Header from "./components/Header";
import AIStudio from "./components/AIStudio";
import VoiceCataloger from "./components/VoiceCataloger";
import DynamicPricing from "./components/DynamicPricing";
import InventoryCatalog from "./components/InventoryCatalog";
import B2BMarketplace from "./components/B2BMarketplace";
import ArtisanHangtagModal from "./components/ArtisanHangtagModal";
import VoiceGuideModal from "./components/VoiceGuideModal";
import AuthScreen from "./components/AuthScreen";
import OnboardingSlides from "./components/OnboardingSlides";
import MobileBottomNav from "./components/MobileBottomNav";
import { SAMPLE_PRODUCTS } from "./data/sampleProducts";

export default function App() {
  // Onboarding Slides Flow State
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false);

  // Auth State
  const [userAuth, setUserAuth] = useState({
    isAuthenticated: false,
    userProfile: null
  });

  const [activeTab, setActiveTab] = useState("studio");
  const [selectedLang, setSelectedLang] = useState("en-IN");
  const [isMobileFrame, setIsMobileFrame] = useState(false);

  const [products, setProducts] = useState(SAMPLE_PRODUCTS);
  const [draftProduct, setDraftProduct] = useState(null);

  const [selectedHangtagProduct, setSelectedHangtagProduct] = useState(null);
  const [showVoiceGuideModal, setShowVoiceGuideModal] = useState(false);

  const handleLoginSuccess = (profile) => {
    setUserAuth({
      isAuthenticated: true,
      userProfile: profile
    });
  };

  const handleSignOut = () => {
    setUserAuth({
      isAuthenticated: false,
      userProfile: null
    });
  };

  const handleProceedFromStudioToCatalog = (enhancedImageSrc) => {
    setDraftProduct((prev) => ({
      ...prev,
      image: enhancedImageSrc,
      processedImage: enhancedImageSrc
    }));
    setActiveTab("cataloger");
  };

  const handleProceedFromCatalogToPricing = (catalogFields) => {
    setDraftProduct((prev) => ({
      ...prev,
      ...catalogFields
    }));
    setActiveTab("pricing");
  };

  const handleSaveToInventory = (finalProduct) => {
    const newProduct = {
      id: `hast-${Date.now()}`,
      status: "Live on GeM & ONDC",
      b2bInquiries: 0,
      dateAdded: new Date().toISOString().slice(0, 10),
      ...draftProduct,
      ...finalProduct
    };

    setProducts([newProduct, ...products]);
    setDraftProduct(null);
    setActiveTab("inventory");
  };

  // 1. Show Interactive Feature Tour Slides if user hasn't completed onboarding
  if (!hasSeenOnboarding) {
    return <OnboardingSlides onGetStarted={() => setHasSeenOnboarding(true)} />;
  }

  // 2. Show Sign In / Sign Up Auth Screen if user is not logged in
  if (!userAuth.isAuthenticated) {
    return <AuthScreen onLoginSuccess={handleLoginSuccess} />;
  }

  // 3. Render Main Application Interface
  const renderAppBody = () => (
    <div className="flex-1 pb-20 lg:pb-8">
      {activeTab === "studio" && (
        <AIStudio onProceedToCatalog={handleProceedFromStudioToCatalog} />
      )}

      {activeTab === "cataloger" && (
        <VoiceCataloger
          photoSrc={draftProduct?.processedImage || draftProduct?.image}
          onProceedToPricing={handleProceedFromCatalogToPricing}
        />
      )}

      {activeTab === "pricing" && (
        <DynamicPricing
          initialCatalogData={draftProduct}
          onSaveToInventory={handleSaveToInventory}
        />
      )}

      {activeTab === "inventory" && (
        <InventoryCatalog
          products={products}
          onSelectHangtag={(prod) => setSelectedHangtagProduct(prod)}
          onAddNewProduct={() => setActiveTab("studio")}
        />
      )}

      {activeTab === "b2b" && (
        <B2BMarketplace products={products} />
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0b0c10] text-white flex items-center justify-center p-0 sm:p-2 bg-inshot-dark">
      
      {isMobileFrame ? (
        <div className="w-full max-w-[430px] h-[92vh] max-h-[890px] bg-[#0d0e12] rounded-[48px] border-[12px] border-[#181920] shadow-2xl overflow-hidden flex flex-col relative border-inshot-glow">
          
          {/* Mobile Status Bar */}
          <div className="bg-[#08080a] text-white px-6 py-2 flex items-center justify-between text-[11px] font-bold z-50 border-b border-white/5">
            <span>9:41</span>
            <div className="w-20 h-4 bg-[#14151a] rounded-full border border-white/10" />
            <span className="text-[#ff3366] font-extrabold">5G PRO</span>
          </div>

          <Header
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            selectedLang={selectedLang}
            setSelectedLang={setSelectedLang}
            onTriggerVoiceGuide={() => setShowVoiceGuideModal(true)}
            userProfile={userAuth.userProfile}
            onSignOut={handleSignOut}
            isMobileFrame={isMobileFrame}
            setIsMobileFrame={setIsMobileFrame}
          />

          <div className="flex-1 overflow-y-auto">
            {renderAppBody()}
          </div>

          <MobileBottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
      ) : (
        <div className="w-full min-h-screen bg-[#0d0e12] flex flex-col font-sans relative">
          <Header
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            selectedLang={selectedLang}
            setSelectedLang={setSelectedLang}
            onTriggerVoiceGuide={() => setShowVoiceGuideModal(true)}
            userProfile={userAuth.userProfile}
            onSignOut={handleSignOut}
            isMobileFrame={isMobileFrame}
            setIsMobileFrame={setIsMobileFrame}
          />

          {renderAppBody()}

          <div className="lg:hidden">
            <MobileBottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>

          {selectedHangtagProduct && (
            <ArtisanHangtagModal
              product={selectedHangtagProduct}
              onClose={() => setSelectedHangtagProduct(null)}
            />
          )}

          {showVoiceGuideModal && (
            <VoiceGuideModal onClose={() => setShowVoiceGuideModal(false)} />
          )}

          <footer className="bg-[#08080a] text-slate-400 py-5 px-4 border-t border-white/10 text-center text-xs hidden lg:block">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
              <p>© 2026 Hastakala PRO AI • InShot Modern Studio Edition</p>
              <div className="flex items-center gap-4 text-[#ff3366] font-extrabold">
                <span>InShot Theme Certified</span>
                <span>•</span>
                <span>GeM & ONDC Ready</span>
              </div>
            </div>
          </footer>
        </div>
      )}

    </div>
  );
}
