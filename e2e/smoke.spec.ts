import { expect, test } from "@playwright/test";

test.describe("smoke flows", () => {
  test("home CTA submits through the contact endpoint", async ({ page }) => {
    let contactPayload: Record<string, string> | null = null;

    await page.route("**/api/contact", async (route) => {
      contactPayload = JSON.parse(route.request().postData() ?? "{}");
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ success: true }),
      });
    });

    await page.goto("/");
    await expect(
      page.getByRole("heading", { name: /i help businesses/i })
    ).toBeVisible();

    const contactSection = page.locator("#contact");
    await contactSection.scrollIntoViewIfNeeded();
    await contactSection.getByLabel("Name").fill("Dean");
    await contactSection.getByLabel("Email").fill("dean@example.com");
    await contactSection.getByLabel("Phone").fill("555-0100");
    await contactSection
      .getByLabel("Website")
      .fill("https://developedbydean.ai");
    await contactSection
      .getByLabel("What can I help with?")
      .fill("I want help automating lead follow-up.");
    await contactSection
      .getByRole("button", { name: /schedule my call/i })
      .click();

    await expect(contactSection.getByText(/request received/i)).toBeVisible();
    await expect
      .poll(() => contactPayload?.email ?? "")
      .toBe("dean@example.com");
    await expect
      .poll(
        () =>
          contactPayload?.message?.includes(
            "Website: https://developedbydean.ai"
          ) ?? false
      )
      .toBe(true);
  });

  test("assessment flow reaches results through the assessment endpoint", async ({
    page,
  }) => {
    let assessmentPayload: Record<string, unknown> | null = null;

    await page.route("**/api/assessment", async (route) => {
      assessmentPayload = JSON.parse(route.request().postData() ?? "{}");
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ success: true }),
      });
    });

    const steps = [
      {
        question: /what industry is your business in/i,
        option: /legal \/ law firm/i,
      },
      {
        question: /how many people work in your business/i,
        option: /2-5 people/i,
      },
      {
        question: /when a customer contacts you outside business hours/i,
        option: /auto-reply/i,
      },
      {
        question: /how much of your team's day is spent on repetitive, manual tasks/i,
        option: /a few hours every day/i,
      },
      {
        question: /how do you handle invoicing and billing/i,
        option: /basic software/i,
      },
      {
        question: /how do you handle contracts, proposals, or important documents/i,
        option: /use templates but fill them in manually/i,
      },
      {
        question: /how do customers book appointments or schedule time with you/i,
        option: /booking link/i,
      },
      {
        question: /where does your customer and business data live/i,
        option: /spreadsheets/i,
      },
      {
        question: /when you need to make a business decision/i,
        option: /pull numbers manually/i,
      },
      {
        question: /how confident are you in the accuracy of your business data/i,
        option: /okay but definitely has gaps/i,
      },
      {
        question: /does anyone on your team use ai tools/i,
        option: /dabble occasionally/i,
      },
      {
        question: /how does your team generally feel about adopting new technology/i,
        option: /interested/i,
      },
      {
        question: /which of these tools do you currently use/i,
        option: /crm/i,
      },
      {
        question: /do your current tools talk to each other/i,
        option: /a couple are connected/i,
      },
      {
        question: /what eats the most time in your business/i,
        option: /data entry, reporting, or admin work/i,
      },
      {
        question: /if ai could save your business 10\+ hours per week/i,
        option: /up to \$500\/month/i,
      },
      {
        question: /what's your biggest hesitation about using ai in your business/i,
        option: /i don't know where to start/i,
        nextLabel: /see my results/i,
      },
    ] as const;

    await page.goto("/assessment");

    for (const step of steps) {
      await expect(
        page.getByRole("heading", { name: step.question })
      ).toBeVisible();
      await page.getByRole("button", { name: step.option }).click();
      await page
        .getByRole("button", { name: step.nextLabel ?? /next/i })
        .click();
    }

    await expect(
      page.getByRole("heading", { name: /your results are ready/i })
    ).toBeVisible();

    await page.getByLabel(/first name/i).fill("Dean");
    await page.getByLabel(/work email/i).fill("dean@example.com");
    await page.getByLabel(/company name/i).fill("DevelopedByDean");
    await page.getByRole("button", { name: /see my results/i }).click();

    await expect(
      page.getByRole("heading", { name: /dean, here's where you stand/i })
    ).toBeVisible();
    await expect.poll(() => assessmentPayload?.email ?? "").toBe("dean@example.com");
    await expect
      .poll(() => typeof assessmentPayload?.overall_score)
      .toBe("number");
  });
});
