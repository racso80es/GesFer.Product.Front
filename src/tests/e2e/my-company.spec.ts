import { test, expect } from '@playwright/test';
import { LoginPage } from '../page-objects/LoginPage';
import { DashboardPage } from '../page-objects/DashboardPage';
import { MyCompanyPage } from '../page-objects/MyCompanyPage';
import { DEMO_COMPANY_NAME } from '../../lib/legacy-constants';

test.describe('My Company E2E Tests (Update Only)', () => {
  const originalName = DEMO_COMPANY_NAME;
  const updatedName = `${DEMO_COMPANY_NAME} Updated`;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(DEMO_COMPANY_NAME, 'admin', 'admin123');
    await loginPage.verifyLoginSuccess();
  });

  test.afterEach(async ({ page }) => {
    try {
      const myCompanyPage = new MyCompanyPage(page);
      await myCompanyPage.goto();
      await page.getByRole('button', { name: /editar datos|edit details|editar dades/i }).first().click();
      await myCompanyPage.updateOrganization({
          name: originalName,
          address: 'Calle Falsa 123',
          phone: '',
      });
    } catch (e) {
      console.log('Cleanup failed', e);
    }
  });

  test('debe llegar a Mi organización desde el dashboard', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.goto();
    await dashboardPage.goToMyCompany();
    await expect(page).toHaveURL(/\/my-company/);
    const myCompanyPage = new MyCompanyPage(page);
    await expect(myCompanyPage.title).toBeVisible();
  });

  test('debe cargar y actualizar los datos de mi organización', async ({ page }) => {
    const myCompanyPage = new MyCompanyPage(page);

    await myCompanyPage.goto();
    await expect(myCompanyPage.title).toBeVisible();

    await page.getByRole('button', { name: /editar datos|edit details|editar dades/i }).first().click();

    await expect(myCompanyPage.nameInput).toHaveValue(originalName, { timeout: 10000 });

    await myCompanyPage.updateOrganization({
        name: updatedName,
        address: 'Nueva Dirección 123'
    });

    await page.reload();
    await page.getByRole('button', { name: /editar datos|edit details|editar dades/i }).first().click();
    await expect(myCompanyPage.nameInput).toHaveValue(updatedName, { timeout: 10000 });
    await expect(myCompanyPage.addressInput).toHaveValue('Nueva Dirección 123');
  });

  test('debe actualizar el teléfono sin cambiar el nombre', async ({ page }) => {
    const myCompanyPage = new MyCompanyPage(page);
    const suffix = Date.now().toString().slice(-6);
    const newPhone = `96${suffix}`.slice(0, 11);

    await myCompanyPage.goto();
    await page.getByRole('button', { name: /editar datos|edit details|editar dades/i }).first().click();
    await expect(myCompanyPage.nameInput).toHaveValue(originalName, { timeout: 10000 });

    await myCompanyPage.updateOrganization({ phone: newPhone });

    await page.reload();
    await page.getByRole('button', { name: /editar datos|edit details|editar dades/i }).first().click();
    await expect(myCompanyPage.nameInput).toHaveValue(originalName, { timeout: 10000 });
    await expect(myCompanyPage.phoneInput).toHaveValue(newPhone);
  });
});
