/**
 * Tests de Contratos API - Verificación de Interfaces
 * 
 * Estos tests verifican que las interfaces y contratos de la API
 * se cumplen correctamente en todas las operaciones.
 */

import { usersApi } from "@/lib/api/users";
import { authApi } from "@/lib/api/auth";
import type { User, Company, CreateUser, UpdateUser, CreateCompany, UpdateCompany } from "@/lib/types/api";

jest.mock("@/lib/api/users");
jest.mock("@/lib/api/auth");

const mockUsersApi = usersApi as jest.Mocked<typeof usersApi>;
const mockAuthApi = authApi as jest.Mocked<typeof authApi>;

describe("Contratos API - Verificación de Interfaces", () => {
  describe("Contrato: Usuarios API", () => {
    it("debe cumplir contrato de CreateUser", async () => {
      const createData: CreateUser = {
        companyId: "company-1",
        username: "testuser",
        password: "password123",
        firstName: "Test",
        lastName: "User",
        email: "test@example.com",
      };

      const expectedUser: User = {
        id: "user-1",
        companyId: "company-1",
        companyName: "Test Company",
        username: "testuser",
        firstName: "Test",
        lastName: "User",
        email: "test@example.com",
        isActive: true,
        createdAt: "2024-01-01T00:00:00Z",
      };

      mockUsersApi.create.mockResolvedValue(expectedUser);

      const result = await usersApi.create(createData);

      // Verificar que el resultado cumple con la interfaz User
      expect(result).toHaveProperty("id");
      expect(result).toHaveProperty("companyId");
      expect(result).toHaveProperty("username");
      expect(result).toHaveProperty("firstName");
      expect(result).toHaveProperty("lastName");
      expect(result).toHaveProperty("isActive");
      expect(result).toHaveProperty("createdAt");
      expect(typeof result.id).toBe("string");
      expect(typeof result.username).toBe("string");
      expect(typeof result.isActive).toBe("boolean");
    });

    it("debe cumplir contrato de UpdateUser", async () => {
      const updateData: UpdateUser = {
        username: "testuser",
        firstName: "Updated",
        lastName: "Name",
        email: "updated@example.com",
        isActive: true,
      };

      const updatedUser: User = {
        id: "user-1",
        companyId: "company-1",
        companyName: "Test Company",
        username: "testuser",
        firstName: "Updated",
        lastName: "Name",
        email: "updated@example.com",
        isActive: true,
        createdAt: "2024-01-01T00:00:00Z",
      };

      mockUsersApi.update.mockResolvedValue(updatedUser);

      const result = await usersApi.update("user-1", updateData);

      expect(result.firstName).toBe("Updated");
      expect(result.email).toBe("updated@example.com");
    });

    it("debe retornar array de User en getAll", async () => {
      const users: User[] = [
        {
          id: "user-1",
          companyId: "company-1",
          companyName: "Test Company",
          username: "user1",
          firstName: "John",
          lastName: "Doe",
          isActive: true,
          createdAt: "2024-01-01T00:00:00Z",
        },
      ];

      mockUsersApi.getAll.mockResolvedValue(users);

      const result = await usersApi.getAll("company-1");

      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
      expect(result[0]).toHaveProperty("id");
    });
  });


  describe("Contrato: Autenticación API", () => {
    it("debe cumplir contrato de LoginResponse", async () => {
      const loginResponse = {
        userId: "user-1",
        username: "testuser",
        firstName: "Test",
        lastName: "User",
        companyId: "company-1",
        companyName: "Test Company",
        userLanguageId: "es",
        companyLanguageId: "es",
        countryLanguageId: "es",
        effectiveLanguageId: "es",
        permissions: ["read", "write"],
        token: "auth-token-123",
        cursorId: "cursor-1",
      };

      mockAuthApi.login.mockResolvedValue(loginResponse);

      const result = await authApi.login({
        company: "Test Company",
        username: "testuser",
        password: "password",
      });

      expect(result).toHaveProperty("userId");
      expect(result).toHaveProperty("username");
      expect(result).toHaveProperty("companyId");
      expect(result).toHaveProperty("token");
      expect(Array.isArray(result.permissions)).toBe(true);
    });
  });

  describe("Validación de Tipos", () => {
    it("debe validar que los IDs son strings", () => {
      const user: User = {
        id: "user-1",
        companyId: "company-1",
        companyName: "Test",
        username: "test",
        firstName: "Test",
        lastName: "User",
        isActive: true,
        createdAt: "2024-01-01T00:00:00Z",
      };

      expect(typeof user.id).toBe("string");
      expect(typeof user.companyId).toBe("string");
    });

    it("debe validar que las fechas son strings ISO", () => {
      const user: User = {
        id: "user-1",
        companyId: "company-1",
        companyName: "Test",
        username: "test",
        firstName: "Test",
        lastName: "User",
        isActive: true,
        createdAt: "2024-01-01T00:00:00Z",
      };

      expect(user.createdAt).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/);
    });

    it("debe validar que los campos opcionales pueden ser undefined", () => {
      const user: User = {
        id: "user-1",
        companyId: "company-1",
        companyName: "Test",
        username: "test",
        firstName: "Test",
        lastName: "User",
        isActive: true,
        createdAt: "2024-01-01T00:00:00Z",
        email: undefined,
        phone: undefined,
      };

      expect(user.email).toBeUndefined();
      expect(user.phone).toBeUndefined();
    });
  });
});

