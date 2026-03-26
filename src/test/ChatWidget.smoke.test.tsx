import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ChatWidget } from "../components/ChatWidget";

describe("ChatWidget smoke", () => {
  it("shows the fallback assistant message when chat api fails", async () => {
    const user = userEvent.setup();
    const fetchMock = vi.fn().mockRejectedValue(new Error("network"));

    vi.stubGlobal("fetch", fetchMock);

    render(<ChatWidget />);

    await user.click(screen.getByRole("button", { name: /open chat/i }));
    await user.type(screen.getByPlaceholderText(/type your message/i), "Hello");
    await user.click(screen.getByRole("button", { name: /send message/i }));

    expect(
      await screen.findByText(/having trouble connecting right now/i)
    ).toBeInTheDocument();
  });

  it("strips hidden lead markup and submits captured lead once", async () => {
    const user = userEvent.setup();
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce({
        ok: true,
        json: vi.fn().mockResolvedValue({
          message:
            'Awesome, I have what I need.<!--LEAD:{"name":"Jane","email":"jane@example.com","message":"Needs an AI receptionist"}-->',
        }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: vi.fn().mockResolvedValue({ success: true }),
      });

    vi.stubGlobal("fetch", fetchMock);

    render(<ChatWidget />);

    await user.click(screen.getByRole("button", { name: /open chat/i }));
    await user.type(screen.getByPlaceholderText(/type your message/i), "Pricing?");
    await user.click(screen.getByRole("button", { name: /send message/i }));

    expect(await screen.findByText(/awesome, i have what i need/i)).toBeInTheDocument();
    expect(screen.queryByText(/<!--LEAD:/i)).not.toBeInTheDocument();

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledTimes(1);
    });
  });
});
