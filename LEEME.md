# Web de Reformas Hermanas Alvares SL

Web estática (HTML + CSS + JavaScript, sin servidor ni base de datos). Se ve bien en móvil y ordenador,
funciona sin conexión y se puede **instalar como app** desde el navegador del móvil ("Añadir a pantalla de inicio" / "Instalar app").
En móviles aparece una ventanita flotante "Instala la app" a los 8 segundos; se puede cerrar y no vuelve a salir en 30 días. No aparece en ordenador ni dentro de la app ya instalada.

## Qué hay en la carpeta

| Archivo / carpeta | Para qué sirve |
|---|---|
| `index.html` | La página (textos fijos: servicios, "Cómo trabajamos", etc.) |
| `site.js` | **Lo que cambiaréis más a menudo**: teléfono, correo, WhatsApp, zonas, opiniones, cifras y fotos de la galería |
| `fotos/` | Fotos de trabajos |
| `styles.css`, `app.js` | Diseño y funcionamiento (no hace falta tocarlos) |
| `manifest.webmanifest`, `sw.js`, `icons/` | App instalable y modo sin conexión |
| `og-image.jpg` | Imagen que sale al compartir el enlace por WhatsApp, redes, etc. |
| `.nojekyll` | Necesario para GitHub Pages. No lo borres |

## Publicar en GitHub Pages (gratis)

1. Crea una cuenta en https://github.com (si no la tenéis).
2. Arriba a la derecha: **+ > New repository**. Nombre, por ejemplo, `reformas-hermanas-alvares`. Déjalo en **Public** y pulsa **Create repository**.
3. Pulsa **uploading an existing file**. Descomprime el zip y arrastra **el contenido de la carpeta** (todos los archivos y las carpetas `fotos` e `icons`, no el zip). Espera a que terminen de subir y pulsa **Commit changes**.
4. Ve a **Settings > Pages**. En "Build and deployment" elige **Deploy from a branch**, rama **main**, carpeta **/ (root)** y pulsa **Save**.
5. En 1–2 minutos aparece arriba la dirección de la web: `https://TU-USUARIO.github.io/reformas-hermanas-alvares/`.

Para usar un dominio propio (por ejemplo `reformashermanasalvares.es`): Settings > Pages > Custom domain.

## Publicar en Vercel (alternativa)

Entra en https://vercel.com con la cuenta de GitHub, **Add New > Project**, elige el repositorio y pulsa **Deploy** (no hay que cambiar ningún ajuste).
Ojo: el plan gratuito de Vercel (Hobby) es solo para uso personal y no comercial; para una empresa hace falta un plan de pago.

## Cambiar contenido

- **Teléfono, correo, WhatsApp, zonas, opiniones, cifras**: abre `site.js` en GitHub, pulsa el lápiz, cambia el texto y pulsa **Commit changes**. Se actualiza solo en 1–2 minutos.
- **Añadir una foto**: en el repositorio, entra en `fotos`, **Add file > Upload files** y sube la foto (mejor JPG, de unos 1000 px de ancho). Después añade una línea en `site.js`, dentro de `media`, copiando una de las existentes.
- **Cambiar una foto manteniendo el nombre**: además abre `sw.js` y sube el número de `VERSION` (por ejemplo, `rha-v2`) para que los móviles que ya visitaron la web la actualicen.

## Pendiente recomendable

- **Aviso legal y política de privacidad**: al ser una empresa (SL), la ley (LSSI) pide mostrar razón social, CIF y domicilio. Conviene añadir esa página.
- **Imagen al compartir (`og-image.jpg`)**: una vez conozcáis la dirección definitiva, en `index.html` cambia `content="og-image.jpg"` por la dirección completa (`https://…/og-image.jpg`) para que WhatsApp y redes la muestren siempre.
- **Tipografías**: se cargan desde Google Fonts. Si se quiere evitar ese servicio externo, se pueden guardar dentro de la carpeta.
- La zona privada de "Panel" y los mensajes guardados de la versión de Claude **no existen aquí**: esta web es pública y los cambios se hacen editando `site.js`.
