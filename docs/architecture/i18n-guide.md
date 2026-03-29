# Guía de Internacionalización (i18n)

## Estructura de Páginas

**IMPORTANTE**: Todas las páginas nuevas deben crearse dentro de la carpeta `app/[locale]/` para que funcionen correctamente con el sistema de internacionalización.

### Estructura Correcta

```
app/
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
app/
  login/
    page.tsx            # ❌ NO crear aquí
  dashboard/
    page.tsx            # ❌ NO crear aquí
```

## Crear una Nueva Página

### 1. Crear el archivo en `app/[locale]/`

Ejemplo: Para crear una página de "productos", crear:
```
app/[locale]/productos/page.tsx
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

Edita los archivos en `messages/`:
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

## Detección de Idioma

El sistema detecta automáticamente el idioma del usuario basándose en:
1. `userLanguageId` (idioma del usuario)
2. `companyLanguageId` (idioma de la company)
3. `countryLanguageId` (idioma del país)
4. `effectiveLanguageId` (idioma efectivo)
5. **Español (por defecto)** si ninguno está configurado

## Idiomas Soportados

- `es` - Español (idioma por defecto)
- `en` - Inglés
- `ca` - Catalán

## Notas Importantes

1. **Siempre crear páginas en `app/[locale]/`** - No crear páginas directamente en `app/`
2. **Usar `useTranslations`** para todos los textos que se muestran al usuario
3. **Las rutas funcionan automáticamente** - No es necesario agregar el locale manualmente en las rutas
4. **El middleware maneja las redirecciones** - Se encarga de agregar el locale correcto a las URLs

## Ejemplo Completo

```tsx
"use client";

import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { ProtectedRoute } from '@/components/auth/protected-route';
import { MainLayout } from '@/components/layout/main-layout';

export default function ProductosPage() {
  const router = useRouter();
  const t = useTranslations('productos');
  const tCommon = useTranslations('common');

  return (
    <ProtectedRoute>
      <MainLayout>
        <div>
          <h1>{t('title')}</h1>
          <button onClick={() => router.push('/productos/nuevo')}>
            {tCommon('create')}
          </button>
        </div>
      </MainLayout>
    </ProtectedRoute>
  );
}
```








# Estado de la Implementación de i18n

## ✅ Tareas Completadas

### 1. Configuración Base
- ✅ Instalación de `next-intl`
- ✅ Configuración de `i18n.ts` con locales (es, en, ca)
- ✅ Configuración de `next.config.js` con plugin de next-intl
- ✅ Creación de archivos de mensajes (es.json, en.json, ca.json)

### 2. Middleware y Detección de Idioma
- ✅ Middleware configurado para detectar idioma del usuario
- ✅ Prioridad de detección: userLanguageId → companyLanguageId → countryLanguageId → effectiveLanguageId → español (por defecto)
- ✅ Guardado de usuario en cookies para acceso del middleware
- ✅ Redirección automática al idioma correcto

### 3. Estructura de Páginas
- ✅ Todas las páginas movidas a `app/[locale]/`
- ✅ Layout principal con soporte i18n
- ✅ Páginas actualizadas para usar traducciones

### 4. Componentes
- ✅ `MainLayout` - Navegación internacionalizada
- ✅ `ProtectedRoute` - Mensajes traducidos
- ✅ Páginas de login, dashboard, companies, usuarios, clientes - Traducidas

### 5. Navegación
- ✅ Links del menú funcionan correctamente con locale
- ✅ Detección de ruta activa considera el locale
- ✅ Rutas con `router.push()` funcionan automáticamente (el middleware las maneja)

## ✅ Funcionalidad Completa

La funcionalidad de idiomas está **completamente implementada y funcional**. El sistema:

1. **Detecta automáticamente** el idioma del usuario al iniciar sesión
2. **Redirige** al idioma correcto según la configuración del usuario/company/país
3. **Muestra** todas las traducciones en los componentes
4. **Mantiene** el idioma durante la navegación
5. **Usa español por defecto** si no hay idioma configurado

## 🔧 Mejoras Opcionales (No Requeridas)

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

### 2. Más Traducciones
Puedes agregar más traducciones a los archivos JSON según necesites. La estructura actual incluye:
- `common` - Mensajes comunes
- `auth` - Autenticación
- `navigation` - Navegación

### 3. Formateo de Fechas y Números
next-intl también soporta formateo de fechas y números según el locale. Puedes usar:
```tsx
import { useFormatter } from 'next-intl';

const format = useFormatter();
format.dateTime(new Date(), { dateStyle: 'long' });
```

## 📝 Notas Importantes

1. **Las rutas funcionan automáticamente** - No necesitas agregar el locale manualmente en `router.push()` o `Link`
2. **El middleware maneja todo** - Se encarga de agregar/quitar el locale de las URLs según corresponda
3. **Español es el default** - Si no hay idioma configurado, siempre usa español
4. **Todas las nuevas páginas** deben crearse en `app/[locale]/`

## 🧪 Pruebas Recomendadas

1. Iniciar sesión con un usuario que tenga `userLanguageId` configurado
2. Verificar que se redirige al idioma correcto
3. Navegar entre páginas y verificar que el idioma se mantiene
4. Verificar que los textos se muestran en el idioma correcto
5. Probar con usuarios sin idioma configurado (debe usar español)
