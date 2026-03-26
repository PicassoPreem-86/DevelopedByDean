import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FoundingWallPage } from "../pages/FoundingWallPage";

describe("Founding Wall smoke", () => {
  it("submits a note for moderation", async () => {
    const user = userEvent.setup();
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue({ success: true }),
    });

    vi.stubGlobal("fetch", fetchMock);

    render(<FoundingWallPage />);

    await user.type(screen.getByLabelText(/first name/i), "Dean");
    await user.type(
      screen.getByLabelText(/note/i),
      "Proud to launch this new chapter."
    );

    await user.click(
      screen.getByRole("button", { name: /submit to founding wall/i })
    );

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledWith(
        "/api/founding-wall",
        expect.objectContaining({
          method: "POST",
        })
      );
    });

    expect(await screen.findByText(/note submitted/i)).toBeInTheDocument();
  });
});
