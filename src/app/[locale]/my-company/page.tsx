"use client";

import { useState } from "react";
import { ProtectedRoute } from "@/components/auth/protected-route";
import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loading } from "@/components/ui/loading";
import { ErrorMessage } from "@/components/ui/error-message";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { CompanyForm } from "@/components/my-company/company-form";
import { useMyCompany } from "@/hooks/use-my-company";
import { useAuth } from "@/contexts/auth-context";
import { Edit, Building2 } from "lucide-react";
import { useTranslations } from "next-intl";
import type { CreateCompany, UpdateCompany } from "@/lib/types/api";

export default function MyCompanyPage() {
  const t = useTranslations("myCompany");
  const { updateUser } = useAuth();
  const { company, isLoading, error, updateCompany, isUpdating } = useMyCompany();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleUpdate = async (data: CreateCompany | UpdateCompany) => {
    try {
      const updated = await updateCompany(data as UpdateCompany);
      updateUser({ companyName: updated.name });
      setIsEditModalOpen(false);
    } catch (err) {
      console.error("Failed to update organization", err);
    }
  };

  return (
    <ProtectedRoute>
      <MainLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">{t("title")}</h1>
              <p className="text-muted-foreground">{t("subtitle")}</p>
            </div>
            {company && (
              <Button onClick={() => setIsEditModalOpen(true)}>
                <Edit className="h-4 w-4 mr-2" />
                {t("editDetails")}
              </Button>
            )}
          </div>

          {isLoading && (
            <div className="flex justify-center py-12">
              <Loading size="lg" text={t("loading")} />
            </div>
          )}

          {error && (
            <ErrorMessage
              message={
                error instanceof Error ? error.message : t("error")
              }
            />
          )}

          {!isLoading && !error && !company && (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Building2 className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground mb-4">
                  {t("emptyState")}
                </p>
                <Button onClick={() => setIsEditModalOpen(true)}>
                  <Edit className="h-4 w-4 mr-2" />
                  {t("editDetails")}
                </Button>
              </CardContent>
            </Card>
          )}

          {!isLoading && !error && company && (
            <Card>
              <CardHeader>
                <CardTitle>{company.name}</CardTitle>
                <CardDescription>
                  {company.isActive ? (
                    <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                      {t("table.active")}
                    </span>
                  ) : (
                    <span className="inline-flex items-center rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-800">
                      {t("table.inactive")}
                    </span>
                  )}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">
                      {t("table.taxId")}
                    </h3>
                    <p className="mt-1">{company.taxId || "-"}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">
                      {t("table.email")}
                    </h3>
                    <p className="mt-1">{company.email || "-"}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">
                      {t("table.phone")}
                    </h3>
                    <p className="mt-1">{company.phone || "-"}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">
                      {t("table.address")}
                    </h3>
                    <p className="mt-1">{company.address || "-"}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <Dialog
            open={isEditModalOpen}
            onOpenChange={setIsEditModalOpen}
          >
            <DialogContent>
              <DialogClose onClose={() => setIsEditModalOpen(false)} />
              <DialogHeader>
                <DialogTitle>{t("editDetails")}</DialogTitle>
                <DialogDescription>
                  {t("editDescription")}
                </DialogDescription>
              </DialogHeader>
              <CompanyForm
                company={company || undefined}
                onSubmit={handleUpdate}
                onCancel={() => setIsEditModalOpen(false)}
                isLoading={isUpdating}
              />
            </DialogContent>
          </Dialog>
        </div>
      </MainLayout>
    </ProtectedRoute>
  );
}
