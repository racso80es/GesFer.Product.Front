"use client";

import { useState } from "react";
import { ProtectedRoute } from "@/components/auth/protected-route";
import { MainLayout } from "@/components/layout/main-layout";
import { AdaptiveDataCard } from "@/components/ui/adaptive-data-card";
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
          <div className="flex items-center justify-between pb-4 border-b border-border/50">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-foreground">{t("title")}</h1>
              <p className="text-sm text-muted-foreground mt-1">{t("subtitle")}</p>
            </div>
            {company && (
              <Button onClick={() => setIsEditModalOpen(true)} className="shadow-subtle">
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
            <AdaptiveDataCard>
              <div className="flex flex-col items-center justify-center py-12">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-border bg-secondary text-foreground mb-4 shadow-subtle">
                  <Building2 className="h-6 w-6 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground mb-6 font-medium text-sm">
                  {t("emptyState")}
                </p>
                <Button onClick={() => setIsEditModalOpen(true)} className="shadow-subtle">
                  <Edit className="h-4 w-4 mr-2" />
                  {t("editDetails")}
                </Button>
              </div>
            </AdaptiveDataCard>
          )}

          {!isLoading && !error && company && (
            <AdaptiveDataCard
              title={company.name}
              description="Información general de la empresa"
              headerAction={
                company.isActive ? (
                  <span className="inline-flex items-center rounded-md border border-border bg-background px-2.5 py-0.5 text-xs font-semibold text-foreground shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                    {t("table.active")}
                  </span>
                ) : (
                  <span className="inline-flex items-center rounded-md border border-border bg-background px-2.5 py-0.5 text-xs font-semibold text-foreground shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-red-500 mr-2"></span>
                    {t("table.inactive")}
                  </span>
                )
              }
            >
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <div className="flex flex-col space-y-1">
                  <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    {t("table.taxId")}
                  </h3>
                  <p className="text-sm font-medium text-foreground">{company.taxId || "-"}</p>
                </div>
                <div className="flex flex-col space-y-1">
                  <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    {t("table.email")}
                  </h3>
                  <p className="text-sm font-medium text-foreground">{company.email || "-"}</p>
                </div>
                <div className="flex flex-col space-y-1">
                  <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    {t("table.phone")}
                  </h3>
                  <p className="text-sm font-medium text-foreground">{company.phone || "-"}</p>
                </div>
                <div className="flex flex-col space-y-1">
                  <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    {t("table.address")}
                  </h3>
                  <p className="text-sm font-medium text-foreground">{company.address || "-"}</p>
                </div>
              </div>
            </AdaptiveDataCard>
          )}

          <Dialog
            open={isEditModalOpen}
            onOpenChange={setIsEditModalOpen}
          >
            <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden">
              <div className="p-6 pb-0">
                <DialogHeader>
                  <DialogTitle className="text-xl">{t("editDetails")}</DialogTitle>
                  <DialogDescription>
                    {t("editDescription")}
                  </DialogDescription>
                </DialogHeader>
              </div>
              <div className="p-6 pt-4">
                <CompanyForm
                  company={company || undefined}
                  onSubmit={handleUpdate}
                  onCancel={() => setIsEditModalOpen(false)}
                  isLoading={isUpdating}
                />
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </MainLayout>
    </ProtectedRoute>
  );
}
