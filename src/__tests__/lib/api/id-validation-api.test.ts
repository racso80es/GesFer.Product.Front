/**
 * Tests para verificar que las funciones de API validan IDs correctamente
 */

import { usersApi } from "@/lib/api/users";

// Mock del apiClient
jest.mock("@/lib/api/client", () => ({
  apiClient: {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  },
}));

import { apiClient } from "@/lib/api/client";

describe("Validación de IDs en APIs", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("usersApi", () => {
    it("debe validar ID antes de getById", async () => {
      let threw = false;
      try {
        await usersApi.getById("invalid-id");
      } catch (e: unknown) {
        threw = true;
        expect((e as Error).message).toContain("El ID de usuario no es válido");
      }
      expect(threw).toBe(true);
      expect(apiClient.get).not.toHaveBeenCalled();
    });

    it("debe validar ID antes de update", async () => {
      let threw = false;
      try {
        await usersApi.update("11.1111-111111111111:1", {
          username: "test",
          firstName: "Test",
          lastName: "User",
          isActive: true,
        });
      } catch (e: unknown) {
        threw = true;
        expect((e as Error).message).toContain("El ID de usuario no es válido");
      }
      expect(threw).toBe(true);
      expect(apiClient.put).not.toHaveBeenCalled();
    });

    it("debe validar ID antes de delete", async () => {
      let threw = false;
      try {
        await usersApi.delete("");
      } catch (e: unknown) {
        threw = true;
        expect((e as Error).message).toContain("El ID de usuario es requerido");
      }
      expect(threw).toBe(true);
      expect(apiClient.delete).not.toHaveBeenCalled();
    });

    it("debe validar companyId en getAll", async () => {
      let threw = false;
      try {
        await usersApi.getAll("invalid-company-id");
      } catch (e: unknown) {
        threw = true;
        expect((e as Error).message).toContain("El ID de company no es válido");
      }
      expect(threw).toBe(true);
      expect(apiClient.get).not.toHaveBeenCalled();
    });

    it("debe permitir operaciones con IDs válidos", async () => {
      const validId = "11111111-1111-1111-1111-111111111111";
      (apiClient.get as jest.Mock).mockResolvedValue([{ id: validId, username: "test" }]);
      (apiClient.put as jest.Mock).mockResolvedValue({ id: validId, username: "updated" });
      (apiClient.delete as jest.Mock).mockResolvedValue(undefined);

      await usersApi.getById(validId);
      expect(apiClient.get).toHaveBeenCalledWith(`/api/user/${validId}`);

      await usersApi.update(validId, { username: "updated", firstName: "Test", lastName: "User", isActive: true });
      expect(apiClient.put).toHaveBeenCalledWith(`/api/user/${validId}`, {
        username: "updated",
        firstName: "Test",
        lastName: "User",
        isActive: true,
      });

      await usersApi.delete(validId);
      expect(apiClient.delete).toHaveBeenCalledWith(`/api/user/${validId}`);
    });
  });
});
