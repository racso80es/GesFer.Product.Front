
"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ErrorMessage } from "@/components/ui/error-message";
import type { User, CreateUser, UpdateUser } from "@/lib/types/api";
import { createUserSchema, updateUserSchema } from "@/lib/validations/user";
import { useAuth } from "@/contexts/auth-context";
import { useTranslations, useLocale } from 'next-intl';

interface UserFormProps {
  user?: User;
  onSubmit: (data: CreateUser | UpdateUser) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

export function UserForm({
  user,
  onSubmit,
  onCancel,
  isLoading = false,
}: UserFormProps) {
  const { user: loggedUser } = useAuth();
  const t = useTranslations('users.form');
  const tCommon = useTranslations('common');
  const locale = useLocale();
  const isEditing = !!user;
  
  const [submitError, setSubmitError] = useState<string | null>(null);

  // La company siempre es la del usuario logueado
  const companyId = loggedUser?.companyId || "";

  // Opciones de idioma disponibles (mapeo de códigos a Guids según seed-data.sql)
  const languageOptions = [
    { value: "10000000-0000-0000-0000-000000000001", label: "Español", code: "es" },
    { value: "10000000-0000-0000-0000-000000000002", label: "English", code: "en" },
    { value: "10000000-0000-0000-0000-000000000003", label: "Català", code: "ca" },
  ];
  
  // Mapeo de nombres de idioma según el locale
  const languageNames: Record<string, Record<string, string>> = {
    es: { es: "Español", en: "English", ca: "Català" },
    en: { es: "Spanish", en: "English", ca: "Catalan" },
    ca: { es: "Espanyol", en: "Anglès", ca: "Català" },
  };
  
  const currentLanguageNames = languageNames[locale] || languageNames.es;
  
  // Función para obtener el Guid del idioma desde el código o mantener el Guid si ya lo es
  const getLanguageId = (value: string | undefined): string | undefined => {
    if (!value) return undefined;
    if (value.includes("-")) return value;
    const option = languageOptions.find(opt => opt.code === value);
    return option?.value || undefined;
  };

  const schema = isEditing ? updateUserSchema : createUserSchema;
  type FormValues = z.infer<typeof schema>;

  const defaultValues: FormValues = isEditing
    ? {
        username: user?.username || "",
        password: "",
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
        email: user?.email || "",
        phone: user?.phone || "",
        address: user?.address || "",
        postalCodeId: user?.postalCodeId || "",
        cityId: user?.cityId || "",
        stateId: user?.stateId || "",
        countryId: user?.countryId || "",
        languageId: user?.languageId || "",
        isActive: user?.isActive ?? true,
      } as z.infer<typeof updateUserSchema>
    : {
        companyId: companyId,
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        postalCodeId: "",
        cityId: "",
        stateId: "",
        countryId: "",
        languageId: "",
      } as z.infer<typeof createUserSchema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  useEffect(() => {
    if (!isEditing && loggedUser?.companyId) {
      form.setValue("companyId", loggedUser.companyId);
    }
  }, [loggedUser?.companyId, isEditing, form]);

  const handleSubmit = async (values: FormValues) => {
    try {
      setSubmitError(null);
      const dataToSubmit: Record<string, unknown> = { ...values };

      if (dataToSubmit.languageId) {
        dataToSubmit.languageId = getLanguageId(dataToSubmit.languageId as string);
      } else {
        delete dataToSubmit.languageId;
      }
      
      // Cleanup empty strings for optional Guid fields
      ['postalCodeId', 'cityId', 'stateId', 'countryId', 'email', 'phone', 'address'].forEach(key => {
        if (dataToSubmit[key] === "") {
          delete dataToSubmit[key];
        }
      });

      if (!isEditing && !dataToSubmit.password) {
        delete dataToSubmit.password;
      }

      await onSubmit(dataToSubmit as unknown as CreateUser | UpdateUser);
    } catch (err: unknown) {
      setSubmitError(
        err instanceof Error
          ? err.message
          : typeof err === 'string'
            ? err
            : t('errors.submitFailed')
      );
    }
  };

  return (
    <div className="space-y-6">
      {submitError && (
        <ErrorMessage

          message={submitError}
        />
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('fields.username.label')}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t('fields.username.placeholder')}
                      data-testid="user-form-username"
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {t('fields.password.label')}
                    {isEditing && (
                      <span className="text-muted-foreground ml-2 text-sm font-normal">
                        ({t('fields.password.optional')})
                      </span>
                    )}
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder={isEditing ? t('fields.password.placeholderEdit') : t('fields.password.placeholderNew')}
                      data-testid="user-form-password"
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('fields.firstName.label')}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t('fields.firstName.placeholder')}
                      data-testid="user-form-firstname"
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('fields.lastName.label')}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t('fields.lastName.placeholder')}
                      data-testid="user-form-lastname"
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('fields.email.label')}</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder={t('fields.email.placeholder')}
                      data-testid="user-form-email"
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('fields.phone.label')}</FormLabel>
                  <FormControl>
                    <Input
                      type="tel"
                      placeholder={t('fields.phone.placeholder')}
                      data-testid="user-form-phone"
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="md:col-span-2">
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('fields.address.label')}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t('fields.address.placeholder')}
                        data-testid="user-form-address"
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="languageId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('fields.language.label')}</FormLabel>
                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger data-testid="user-form-language">
                        <SelectValue placeholder={t('fields.language.placeholder')} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {languageOptions.map((lang) => (
                        <SelectItem key={lang.value} value={lang.value}>
                          {currentLanguageNames[lang.code] || lang.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {isEditing && (
              <FormField
                control={form.control}
                name="isActive"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-2 space-y-0 pt-8">
                    <FormControl>
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        data-testid="user-form-isactive"
                        disabled={isLoading}
                        checked={field.value as boolean}
                        onChange={(e) => field.onChange(e.target.checked)}
                      />
                    </FormControl>
                    <FormLabel className="font-normal cursor-pointer m-0">
                      {t('fields.isActive.label')}
                    </FormLabel>
                  </FormItem>
                )}
              />
            )}
          </div>

          <div className="flex justify-end gap-3 pt-6 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isLoading}
              data-testid="user-form-cancel"
            >
              {tCommon('actions.cancel')}
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              data-testid="user-form-submit"
            >
              {isLoading
                ? tCommon('states.saving')
                : isEditing
                ? t('actions.update')
                : t('actions.create')}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
