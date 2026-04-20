/**
 * Normaliza el cuerpo enviado al PUT de «mi organización».
 * Cadenas vacías en campos opcionales Guid suelen romper el binder del API (.NET) y devolver 500.
 *
 * @see src/lib/validations/company.ts (updateCompanySchema — mismos campos)
 */
const OPTIONAL_GUID_KEYS = [
  "postalCodeId",
  "cityId",
  "stateId",
  "countryId",
  "languageId",
] as const;

export function sanitizeCompanyMutationBody(
  data: Record<string, unknown>
): Record<string, unknown> {
  const out: Record<string, unknown> = { ...data };

  for (const key of OPTIONAL_GUID_KEYS) {
    const v = out[key];
    if (v === "" || v === null || v === undefined) {
      delete out[key];
    }
  }

  return out;
}
