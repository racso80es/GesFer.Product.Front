# Guía de Internacionalización (i18n) y Estado

Esta guía describe cómo funciona el sistema de internacionalización (i18n) en GesFer Cliente usando `next-intl` y el estado actual de la implementación.

## ✅ Estado de la Implementación (Funcionalidad Completa)

La funcionalidad de idiomas está **completamente implementada y funcional**. El sistema:

1. **Detecta automáticamente** el idioma del usuario al iniciar sesión (Prioridad: `userLanguageId` → `companyLanguageId` → `countryLanguageId` → `effectiveLanguageId` → español por defecto).
2. **Guarda** el usuario en cookies para acceso del middleware.
3. **Redirige** al idioma correcto según la configuración.
4. **Muestra** todas las traducciones en los componentes.
5. **Mantiene** el idioma durante la navegación usando el middleware, el cual se encarga de agregar el locale a las URLs.
6. **Usa español por defecto** si no hay idioma configurado.

## Estructura de Páginas

**IMPORTANTE**: Todas las páginas nuevas deben crearse dentro de la carpeta `src/app/[locale]/` para que funcionen correctamente con el sistema de internacionalización.

### Estructura Correcta

```
src/app/
  [locale]/
    layout.tsx          # Layout principal con soporte i18n
    page.tsx            # Página raíz
    login/
      page.tsx          # Página de login
    dashboard/
      page.tsx          # Página de dashboard
    companies/
      page.tsx          # Lista de companies
      [id]/
        page.tsx        # Detalle de company
    # ... más páginas
```

### ❌ Estructura Incorrecta

```
src/app/
  login/
    page.tsx            # ❌ NO crear aquí
  dashboard/
    page.tsx            # ❌ NO crear aquí
```

## Crear una Nueva Página

### 1. Crear el archivo en `app/[locale]/`

Ejemplo: Para crear una página de "productos", crear:
```
src/app/[locale]/productos/page.tsx
```

### 2. Usar traducciones en componentes

#### En componentes cliente:

```tsx
"use client";

import { useTranslations } from 'next-intl';

export default function MiPagina() {
  const t = useTranslations('common'); // o el namespace que necesites
  
  return (
    <div>
      <h1>{t('welcome')}</h1>
      <button>{t('save')}</button>
    </div>
  );
}
```

#### En componentes servidor:

```tsx
import { useTranslations } from 'next-intl/server';

export default async function MiPagina() {
  const t = await useTranslations('common');
  
  return (
    <div>
      <h1>{t('welcome')}</h1>
    </div>
  );
}
```

### 3. Parámetros dinámicos

Si tu página tiene parámetros dinámicos (como `[id]`), asegúrate de incluir `locale` en el tipo:

```tsx
export default function MiPagina({
  params,
}: {
  params: Promise<{ id: string; locale: string }> | { id: string; locale: string };
}) {
  // Tu código aquí
}
```

### 4. Navegación

Las rutas funcionan automáticamente con el locale. El middleware se encarga de agregar el locale a la URL.

```tsx
import { useRouter } from "next/navigation";

const router = useRouter();
router.push("/dashboard"); // Funciona automáticamente con el locale actual
```

## Agregar Nuevas Traducciones

### 1. Editar los archivos de mensajes

Edita los archivos en `src/messages/`:
- `messages/es.json` - Español
- `messages/en.json` - Inglés
- `messages/ca.json` - Catalán

### 2. Estructura de mensajes

```json
{
  "common": {
    "welcome": "Bienvenido",
    "save": "Guardar"
  },
  "miModulo": {
    "titulo": "Mi Título",
    "descripcion": "Mi Descripción"
  }
}
```

### 3. Usar en componentes

```tsx
const t = useTranslations('miModulo');
t('titulo'); // "Mi Título"
```

## Idiomas Soportados

- `es` - Español (idioma por defecto)
- `en` - Inglés
- `ca` - Catalán

## Notas Importantes

1. **Siempre crear páginas en `app/[locale]/`** - No crear páginas directamente en `app/`
2. **Usar `useTranslations`** para todos los textos que se muestran al usuario
3. **Las rutas funcionan automáticamente** - No es necesario agregar el locale manualmente en las rutas (`router.push()` o `Link`)
4. **El middleware maneja las redirecciones** - Se encarga de agregar/quitar el locale correcto de las URLs

## Mejoras Opcionales

Estas mejoras son opcionales y no son necesarias para que la funcionalidad funcione:

### 1. Selector de Idioma Manual
Si quieres permitir que los usuarios cambien el idioma manualmente, podrías agregar un componente selector:

```tsx
// components/language-selector.tsx
"use client";
import { useRouter, usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';

export function LanguageSelector() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const changeLanguage = (newLocale: string) => {
    const segments = pathname.split('/');
    if (['es', 'en', 'ca'].includes(segments[1])) {
      segments[1] = newLocale;
    } else {
      segments.splice(1, 0, newLocale);
    }
    router.push(segments.join('/'));
  };

  return (
    <select value={locale} onChange={(e) => changeLanguage(e.target.value)}>
      <option value="es">Español</option>
      <option value="en">English</option>
      <option value="ca">Català</option>
    </select>
  );
}
```

### 2. Formateo de Fechas y Números
next-intl también soporta formateo de fechas y números según el locale. Puedes usar:
```tsx
import { useFormatter } from 'next-intl';

const format = useFormatter();
format.dateTime(new Date(), { dateStyle: 'long' });
```