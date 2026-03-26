import { render, screen } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import App from "../App";

describe("App smoke", () => {
  it("renders the home route", async () => {
    window.history.pushState({}, "", "/");

    render(
      <HelmetProvider>
        <App />
      </HelmetProvider>
    );

    expect(
      await screen.findByRole("heading", { name: /i help businesses/i })
    ).toBeInTheDocument();
  });

  it("renders the faq route", async () => {
    window.history.pushState({}, "", "/faq");

    render(
      <HelmetProvider>
        <App />
      </HelmetProvider>
    );

    expect(
      await screen.findByRole("heading", { name: /everything you need to know/i })
    ).toBeInTheDocument();
  });

  it("renders a service landing page route", async () => {
    window.history.pushState({}, "", "/services/ai-voice-agents");

    render(
      <HelmetProvider>
        <App />
      </HelmetProvider>
    );

    expect(
      await screen.findByRole("heading", {
        name: /ai voice agents that answer, qualify, and book around the clock/i,
      })
    ).toBeInTheDocument();
  });

  it("renders the founding wall route", async () => {
    window.history.pushState({}, "", "/founding-wall");

    render(
      <HelmetProvider>
        <App />
      </HelmetProvider>
    );

    expect(
      await screen.findByRole("heading", { name: /sign the founding wall/i })
    ).toBeInTheDocument();
  });
});
