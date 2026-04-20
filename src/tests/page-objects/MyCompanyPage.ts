import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class MyCompanyPage extends BasePage {
  readonly title: Locator;
  readonly nameInput: Locator;
  readonly taxIdInput: Locator;
  readonly emailInput: Locator;
  readonly addressInput: Locator;
  readonly phoneInput: Locator;
  readonly saveButton: Locator;

  constructor(page: Page) {
    super(page);

    this.title = page.getByRole('heading', { name: /mi organización|my organization|organització/i }).first();

    this.nameInput = page.locator('#name-form-item').or(page.getByTestId('my-company-form-name'));
    this.taxIdInput = page.locator('#taxId-form-item').or(page.getByTestId('my-company-form-taxId'));
    this.emailInput = page.locator('#email-form-item').or(page.getByTestId('my-company-form-email'));
    this.addressInput = page.getByTestId('my-company-form-address');
    this.phoneInput = page.getByTestId('my-company-form-phone');

    this.saveButton = page.getByRole('button', { name: /guardar|save|actualizar|update/i });
  }

  async goto() {
    await this.page.goto('/my-company');
    await this.waitForLoad();
  }

  async updateOrganization(data: {
    name?: string;
    taxId?: string;
    email?: string;
    address?: string;
    phone?: string;
  }) {
    const putResponse = this.page.waitForResponse(
      (r) =>
        r.url().includes("/api/my-company") && r.request().method() === "PUT",
      { timeout: 15000 }
    );

    if (data.name !== undefined) await this.nameInput.fill(data.name);
    if (data.taxId !== undefined) await this.taxIdInput.fill(data.taxId);
    if (data.email !== undefined) await this.emailInput.fill(data.email);
    if (data.address !== undefined) await this.addressInput.fill(data.address);
    if (data.phone !== undefined) await this.phoneInput.fill(data.phone);

    await this.saveButton.click();
    const resp = await putResponse;
    const body = await resp.text();
    if (!resp.ok()) {
      throw new Error(
        `PUT mi organización falló: ${resp.status} ${resp.statusText} — ${body}`
      );
    }
  }

  async verifySuccessMessage() {
    await expect(this.page.locator('text=/actualizada correctamente|success|updated successfully/i')).toBeVisible({ timeout: 5000 });
  }

  async verifyOrganizationData(data: {
    name?: string;
    taxId?: string;
    email?: string;
    address?: string;
    phone?: string;
  }) {
    if (data.name !== undefined) await expect(this.nameInput).toHaveValue(data.name);
    if (data.taxId !== undefined) await expect(this.taxIdInput).toHaveValue(data.taxId);
    if (data.email !== undefined) await expect(this.emailInput).toHaveValue(data.email);
    if (data.address !== undefined) await expect(this.addressInput).toHaveValue(data.address);
    if (data.phone !== undefined) await expect(this.phoneInput).toHaveValue(data.phone);
  }
}
