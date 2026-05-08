import "@/App.css";
import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "@/context/AppContext";
import HomePage from "@/pages/HomePage";
import AdminPage from "@/pages/AdminPage";
import OrderTrackingPage from "@/pages/OrderTrackingPage";
import { Toaster } from "@/components/ui/sonner";

// Remove any injected branding badges
function useBrandingGuard() {
  useEffect(() => {
    const cleanup = () => {
      document.body.childNodes.forEach((node) => {
        if (node.nodeType === 1 && node.id !== 'root' && node.tagName !== 'SCRIPT' && node.tagName !== 'STYLE' && node.tagName !== 'NOSCRIPT' && node.tagName !== 'LINK') {
          const text = (node.textContent || '').toLowerCase();
          const html = (node.innerHTML || '').toLowerCase();
          if (text.includes('emergent') || text.includes('made with') || html.includes('emergent') || html.includes('badge')) {
            node.remove();
          }
        }
      });
    };
    cleanup();
    const observer = new MutationObserver(cleanup);
    observer.observe(document.body, { childList: true, subtree: false });
    return () => observer.disconnect();
  }, []);
}

function App() {
  useBrandingGuard();

  return (
    <AppProvider>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/track/:orderId" element={<OrderTrackingPage />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </BrowserRouter>
        <Toaster position="top-center" richColors />
      </div>
    </AppProvider>
  );
}

export default App;
