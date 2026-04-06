import { afterEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { EmailCapturePage } from "../pages/EmailCapturePage";
import { AssessmentResultsPage } from "../pages/AssessmentResultsPage";
import { useAssessment } from "../hooks/useAssessment";

afterEach(() => {
  useAssessment.getState().reset();
});

describe("EmailCapturePage smoke", () => {
  it("submits the assessment lead to the server endpoint and navigates to results", async () => {
    useAssessment.setState({
      currentStep: 0,
      answers: new Map(),
      industry: "legal",
      companySize: "",
      leadData: {},
      result: {
        overallScore: 67,
        band: "ready",
        bandLabel: "AI Ready",
        categoryScores: [
          { category: "operations", score: 70, label: "Operations & Workflows", weight: 0.25 },
          { category: "data", score: 60, label: "Data Readiness", weight: 0.2 },
        ],
        recommendations: [],
        quickWins: [],
        industryBenchmark: 38,
      },
    });

    const user = userEvent.setup();
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue({ success: true }),
    });

    vi.stubGlobal("fetch", fetchMock);

    render(
      <MemoryRouter initialEntries={["/assessment/capture"]}>
        <Routes>
          <Route path="/assessment/capture" element={<EmailCapturePage />} />
          <Route path="/assessment/results" element={<AssessmentResultsPage />} />
        </Routes>
      </MemoryRouter>
    );

    await user.type(screen.getByLabelText(/first name/i), "Dean");
    await user.type(screen.getByLabelText(/work email/i), "dean@example.com");
    await user.type(screen.getByLabelText(/company name/i), "DevelopedByDean");
    await user.click(screen.getByRole("button", { name: /see my results/i }));

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledWith(
        "/api/assessment",
        expect.objectContaining({
          method: "POST",
        })
      );
    });

    expect(
      await screen.findByRole("heading", { name: /dean, here's where you stand/i })
    ).toBeInTheDocument();
  });
});
