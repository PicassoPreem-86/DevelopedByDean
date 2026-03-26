import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FinalCTA } from "../sections/FinalCTA";

describe("FinalCTA smoke", () => {
  it("submits the contact form to the api and shows success state", async () => {
    const user = userEvent.setup();
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue({ success: true }),
    });

    vi.stubGlobal("fetch", fetchMock);

    render(<FinalCTA />);

    await user.type(screen.getByLabelText(/^name$/i), "Dean");
    await user.type(screen.getByLabelText(/email/i), "dean@example.com");
    await user.type(
      screen.getByLabelText(/message/i),
      "I want help automating lead follow-up."
    );

    await user.click(
      screen.getByRole("button", { name: /schedule my call/i })
    );

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledWith(
        "/api/contact",
        expect.objectContaining({
          method: "POST",
        })
      );
    });

    expect(
      await screen.findByText(/request received/i)
    ).toBeInTheDocument();
  });
});
