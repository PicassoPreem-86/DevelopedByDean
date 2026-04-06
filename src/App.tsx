import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import { Navbar } from "./sections/Navbar";
import { Footer } from "./sections/Footer";
import { StructuredData } from "./components/StructuredData";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { HomePage } from "./pages/HomePage";
import { industryPages, servicePages } from "./data/seoPages";

const UseCasesPage = lazy(() =>
  import("./pages/UseCasesPage").then((module) => ({
    default: module.UseCasesPage,
  }))
);

const ResultsPage = lazy(() =>
  import("./pages/ResultsPage").then((module) => ({
    default: module.ResultsPage,
  }))
);

const FAQPage = lazy(() =>
  import("./pages/FAQPage").then((module) => ({
    default: module.FAQPage,
  }))
);

const ServicesHubPage = lazy(() =>
  import("./pages/ServicesHubPage").then((module) => ({
    default: module.ServicesHubPage,
  }))
);

const IndustriesHubPage = lazy(() =>
  import("./pages/IndustriesHubPage").then((module) => ({
    default: module.IndustriesHubPage,
  }))
);

const SeoLandingPage = lazy(() =>
  import("./pages/SeoLandingPage").then((module) => ({
    default: module.SeoLandingPage,
  }))
);

const AssessmentPage = lazy(() =>
  import("./pages/AssessmentPage").then((module) => ({
    default: module.AssessmentPage,
  }))
);

const EmailCapturePage = lazy(() =>
  import("./pages/EmailCapturePage").then((module) => ({
    default: module.EmailCapturePage,
  }))
);

const AssessmentResultsPage = lazy(() =>
  import("./pages/AssessmentResultsPage").then((module) => ({
    default: module.AssessmentResultsPage,
  }))
);

const FoundingWallPage = lazy(() =>
  import("./pages/FoundingWallPage").then((module) => ({
    default: module.FoundingWallPage,
  }))
);

const NotFoundPage = lazy(() =>
  import("./pages/NotFoundPage").then((module) => ({
    default: module.NotFoundPage,
  }))
);

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
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<ServicesHubPage />} />
            <Route path="/industries" element={<IndustriesHubPage />} />
            <Route path="/use-cases" element={<UseCasesPage />} />
            <Route path="/results" element={<ResultsPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/assessment" element={<AssessmentPage />} />
            <Route path="/assessment/capture" element={<EmailCapturePage />} />
            <Route path="/assessment/results" element={<AssessmentResultsPage />} />
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
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
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
    <ErrorBoundary>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </ErrorBoundary>
  );
}
