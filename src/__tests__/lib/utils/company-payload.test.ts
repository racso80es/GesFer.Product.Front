import { sanitizeCompanyMutationBody } from "@/lib/utils/company-payload";

describe("sanitizeCompanyMutationBody", () => {
  it("elimina cadenas vacías en campos Guid opcionales", () => {
    const out = sanitizeCompanyMutationBody({
      name: "Acme",
      address: "Calle 1",
      isActive: true,
      postalCodeId: "",
      cityId: "",
      stateId: "",
      countryId: "",
      languageId: "",
    });
    expect(out).toEqual({
      name: "Acme",
      address: "Calle 1",
      isActive: true,
    });
  });

  it("conserva Guid válidos", () => {
    const guid = "10000000-0000-0000-0000-000000000001";
    const out = sanitizeCompanyMutationBody({
      name: "Acme",
      address: "Calle 1",
      languageId: guid,
    });
    expect(out.languageId).toBe(guid);
  });
});
