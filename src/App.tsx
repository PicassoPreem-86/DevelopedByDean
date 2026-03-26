import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import { Navbar } from "./sections/Navbar";
import { Footer } from "./sections/Footer";
import { StructuredData } from "./components/StructuredData";
import { HomePage } from "./pages/HomePage";
import { UseCasesPage } from "./pages/UseCasesPage";
import { ResultsPage } from "./pages/ResultsPage";
import { ProcessPage } from "./pages/ProcessPage";
import { FAQPage } from "./pages/FAQPage";
import { ServicesHubPage } from "./pages/ServicesHubPage";
import { IndustriesHubPage } from "./pages/IndustriesHubPage";
import { SeoLandingPage } from "./pages/SeoLandingPage";
import { FoundingWallPage } from "./pages/FoundingWallPage";
import { industryPages, servicePages } from "./data/seoPages";

const ChatWidget = lazy(() =>
  import("./components/ChatWidget").then((module) => ({
    default: module.ChatWidget,
  }))
);

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // Also scroll to top on initial page load / refresh
  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

  return null;
}

function Layout() {
  return (
    <>
      <ScrollToTop />
      <StructuredData />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesHubPage />} />
          <Route path="/industries" element={<IndustriesHubPage />} />
          <Route path="/use-cases" element={<UseCasesPage />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="/process" element={<ProcessPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/founding-wall" element={<FoundingWallPage />} />
          {servicePages.map((page) => (
            <Route
              key={page.path}
              path={page.path}
              element={<SeoLandingPage page={page} />}
            />
          ))}
          {industryPages.map((page) => (
            <Route
              key={page.path}
              path={page.path}
              element={<SeoLandingPage page={page} />}
            />
          ))}
        </Routes>
      </main>
      <Footer />
      <Suspense fallback={null}>
        <ChatWidget />
      </Suspense>
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
