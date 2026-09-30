# 🧭 Brújula

Una frase para cada momento del día, solo para ti: versículos de la Biblia, estoicos, frases de películas de mafia y de cine para ver la vida desde otra perspectiva. Instalable como app en el móvil (PWA). Sin cuentas, sin servidor: todo vive en tu navegador.

**Stack:** Next.js 16 (App Router, exportación estática) + TypeScript + Tailwind · `localStorage` · GitHub Pages / Vercel.

## Qué hace

- Saluda por nombre: **Buenos días / Buenas tardes / Buenas noches, Hugo**.
- Una frase distinta a las **7:00**, **14:00** y **20:00**. Antes de las 7:00 sigue la de la noche anterior.
- **235 frases**: 80 Biblia, 56 estoicos, 36 mafia, 63 cine. Cada día mezcla tres categorías distintas y ninguna se repite en menos de 48 días.
- Botón **Otra frase** para una extra al azar, **Guardar** favoritas y **Compartir**.
- **Biblioteca** con búsqueda (ignora acentos) y filtros por categoría o favoritas.
- Avisos opcionales del navegador a las 7, 14 y 20 h.

## Límite importante: avisos

Al no haber servidor, no hay notificaciones push reales. El aviso solo se dispara si la app está abierta o el navegador la mantiene viva en segundo plano; el móvil puede cerrarla para ahorrar batería. La frase del momento siempre está esperando dentro de la app.

## Desarrollo

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # genera el sitio estático en out/
npm run preview    # sirve out/ en local
```

## Despliegue

- **GitHub Pages:** cada push a `main` ejecuta `.github/workflows/deploy.yml` (compila con `GITHUB_PAGES=true`, que añade el `basePath` `/brujula`).
- **Vercel:** importa el repo; detecta Next.js solo.

## Estructura

```
src/
  app/            # page.tsx (Hoy), biblioteca/, ajustes/, layout.tsx, manifest.ts
  components/     # QuoteCard, NotificationScheduler, nav/
  lib/
    quotes.ts       # el banco de frases (añade nuevas SIEMPRE al final de cada lista)
    schedule.ts     # franjas horarias y elección determinista de la frase
    useAppData.tsx  # estado + persistencia en localStorage
public/sw.js        # service worker: caché de la app y clic en notificaciones
```

## Notas sobre las frases

- Los versículos siguen el estilo de la Reina-Valera; el texto está escrito de memoria, así que puede haber pequeñas diferencias de redacción con tu edición.
- Las frases de películas son traducciones libres al español. Las de los estoicos son adaptaciones de las Meditaciones, las Cartas a Lucilio y el Enquiridión.
