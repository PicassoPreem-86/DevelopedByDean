import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Navbar } from "./sections/Navbar";
import { Footer } from "./sections/Footer";
import { ChatWidget } from "./components/ChatWidget";
import { HomePage } from "./pages/HomePage";
import { UseCasesPage } from "./pages/UseCasesPage";
import { ResultsPage } from "./pages/ResultsPage";
import { ProcessPage } from "./pages/ProcessPage";
import { FAQPage } from "./pages/FAQPage";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function Layout() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/use-cases" element={<UseCasesPage />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="/process" element={<ProcessPage />} />
          <Route path="/faq" element={<FAQPage />} />
        </Routes>
      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}
