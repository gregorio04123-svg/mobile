# Pilares

App web para el día a día: **rutina de gimnasio**, **agenda académica** y **libreticas de dinero**, en una sola pantalla de móvil.

Es un sitio **100 % estático**: HTML, CSS y JavaScript sin dependencias, sin `npm install` y **sin paso de compilación**. Eso significa que en Vercel no hay build que pueda fallar.

---

## 1. Qué incluye

```
pilares-app/
├── index.html              ← punto de entrada (DEBE quedar en la raíz del repo)
├── assets/
│   ├── app.js              ← lógica: rutinas, agenda, finanzas, persistencia
│   ├── runtime.js          ← motor que interpreta la plantilla del diseño
│   ├── styles.css          ← estilos base + marco de teléfono en escritorio
│   └── viewport.js         ← corrige el alto de pantalla en la PWA instalada
├── icon.svg                ← ícono vectorial (favicon)
├── icon-192.png            ← ícono PWA / apple-touch-icon
├── icon-512.png            ← ícono PWA (incluye versión "maskable")
├── manifest.webmanifest    ← permite instalarla como app en el teléfono
├── vercel.json             ← cabeceras y URLs limpias (opcional pero recomendado)
├── .gitignore
├── .gitattributes          ← fuerza finales de línea LF en el repositorio
└── README.md
```

### Funciona de verdad, no es una maqueta

- **Resumen** (pantalla de inicio): lo próximo a entregar, contadores de pendientes / esta semana / cuadernos, las próximas entregas ordenadas por urgencia, la carga por semana y accesos directos a gimnasio y libreticas.
- **Ejercicio**: la semana se genera desde la fecha real del dispositivo; el ciclo de rutinas (espalda → pecho → pierna → hombro) queda anclado al calendario. Marcar series, anotar pesos y descensos, cronómetro de descanso, renombrar ejercicios y cambiar series/repeticiones desde *Modo edición*.
- **Estudio**: calendario del mes con código de urgencia por color, crear/editar/eliminar actividades, cuadernos y archivos por materia.
- **Finanzas**: libreticas de quién debe a quién, marcar como saldada, historial y totales.
- **Persistencia**: todo se guarda en `localStorage` del navegador. **No hay servidor ni base de datos**: los datos nunca salen del dispositivo. El historial de entrenamiento se conserva 120 días.

---

## 2. Probarla en tu computador

No abras `index.html` con doble clic (el protocolo `file://` bloquea el `manifest` y algunas rutas). Levanta un servidor local:

```bash
py -m http.server 8777
```

Y abre `http://127.0.0.1:8777`. Alternativa sin Python:

```bash
npx --yes serve .
```

---

## 3. Requisitos para subirlo a GitHub sin errores

Esta es la parte donde se rompen la mayoría de los despliegues. Revisa punto por punto.

### 3.1 `index.html` va en la **raíz** del repositorio

Debe verse así al entrar al repo en GitHub:

```
tu-repo/
├── index.html      ✅
├── assets/
└── ...
```

**No** así:

```
tu-repo/
└── pilares-app/    ❌ Vercel no encontrará index.html sin configurar "Root Directory"
    └── index.html
```

Es decir: sube **el contenido** de la carpeta `pilares-app`, no la carpeta envolviéndolo todo. Si ya lo subiste anidado, no hace falta rehacerlo: en Vercel puedes poner `pilares-app` en *Root Directory* (ver §4.3).

### 3.2 Mayúsculas y minúsculas **sí** importan

Windows no distingue `Assets/Styles.css` de `assets/styles.css`, pero **Vercel corre sobre Linux y sí distingue**. Este es el error nº 1: la app funciona en tu PC y sale en blanco al desplegar.

Regla: los nombres de archivo y carpeta deben coincidir **exactamente** con lo que dice el `index.html`. En este proyecto todo va en minúscula. No renombres nada a `Assets/`, `App.js` o `Index.html`.

### 3.3 Nombres de archivo limpios

- Solo `a-z`, `0-9`, guion `-` y guion bajo `_`.
- **Sin espacios**, sin tildes, sin `ñ`, sin `#`, `?`, `%`, `&`, `:`, `"`.
- Todo en minúscula.

Todos los archivos de este proyecto ya cumplen. Ojo si luego agregas imágenes: `Captura de pantalla 2026.png` romperá la URL; usa `captura-2026.png`.

### 3.4 Codificación UTF-8 sin BOM

El proyecto está lleno de tildes (`Análisis numérico`, `MIÉ`, `descenso`). Todos los archivos ya están guardados en **UTF-8 sin BOM** y `index.html` declara `<meta charset="utf-8">`.

Si editas algo, hazlo en VS Code y verifica abajo a la derecha que diga `UTF-8` (no `UTF-8 with BOM`, no `Windows-1252`). Con BOM, el navegador puede mostrar `Anï¿½lisis` o dejar una línea en blanco extraña arriba de la página.

### 3.5 Finales de línea LF

Git en Windows tiende a convertir a CRLF. El `.gitattributes` incluido fuerza `eol=lf` en el repositorio, así que no tienes que hacer nada — solo **no lo borres**.

### 3.6 Rutas siempre relativas

En el HTML las rutas son `assets/app.js`, `icon-192.png`, etc. Nunca uses `C:\Users\...`, `file:///...` ni rutas que empiecen por `/` si algún día mueves el sitio a un subdirectorio.

### 3.7 Qué **no** subir

- `node_modules/` (no existe aquí, pero por si acaso)
- `.env` o cualquier archivo con claves
- Archivos `.zip` del proyecto
- Archivos de más de **100 MB** (GitHub los rechaza; el aviso empieza a los 50 MB)

El `.gitignore` incluido ya cubre esto.

### 3.8 Los archivos que empiezan por punto

`.gitignore` y `.gitattributes` están ocultos en el Explorador de Windows. Si subes por la web de GitHub arrastrando archivos, **actívalos primero**: pestaña *Vista* → casilla *Elementos ocultos*. Si aun así no aparecen, el método de la línea de comandos (§3.9, opción B) los sube solo.

### 3.9 Dos formas de subirlo

**Opción A — desde la web (sin instalar nada)**

1. Entra a <https://github.com/new>, ponle nombre al repositorio (por ejemplo `pilares`), déjalo **Public**, y **no** marques "Add a README file" (ya hay uno).
2. En el repo vacío, haz clic en **uploading an existing file**.
3. Abre la carpeta `pilares-app`, selecciona **todo su contenido** (`Ctrl+A`) y arrástralo.
4. Escribe un mensaje de commit y pulsa **Commit changes**.
5. Verifica que en la portada del repo se vea `index.html` en el primer nivel **y una carpeta `assets`**.

> ⚠️ Dos trampas reales de este método, ambas vistas en la práctica:
> - **Aplana carpetas.** A veces sube `app.js`, `runtime.js` y `styles.css` sueltos en la raíz en vez de dentro de `assets/`. Si pasa, la página sale en blanco. Revisa la lista antes de hacer commit.
> - **Al renombrar, no dejes puntos de más.** Si escribes `assets/runtime.js.` (con punto final), el archivo queda con ese nombre y sigue dando 404.
>
> La Opción B evita las dos.

**Opción B — con Git instalado**

```bash
cd "ruta/a/pilares-app"
git init -b main
git add -A
git commit -m "Pilares: app de ejercicio, estudio y finanzas"
git remote add origin https://github.com/TU-USUARIO/pilares.git
git push -u origin main
```

Si Git te pide identificarte la primera vez:

```bash
git config --global user.name "Tu Nombre"
git config --global user.email "tu@correo.com"
```

---

## 4. Desplegar en Vercel

### 4.1 Importar

1. Entra a <https://vercel.com/new> e inicia sesión con GitHub.
2. Busca tu repositorio y pulsa **Import**. Si no aparece, usa *Adjust GitHub App Permissions* y dale acceso al repo.

### 4.2 Configuración del proyecto

| Campo | Valor |
|---|---|
| **Framework Preset** | `Other` |
| **Build Command** | vacío (deja el *Override* apagado) |
| **Output Directory** | vacío / por defecto |
| **Install Command** | vacío |
| **Root Directory** | `./` |

> Vercel detecta un sitio estático y sirve la raíz tal cual. **No** actives un Build Command: no hay nada que compilar y es la causa más común de despliegues fallidos en proyectos como este.

### 4.3 Si subiste la carpeta anidada

En *Root Directory* pulsa **Edit** y elige `pilares-app`. Con eso Vercel encuentra el `index.html`.

### 4.4 Desplegar

Pulsa **Deploy**. En menos de un minuto tendrás una URL tipo `https://pilares.vercel.app`.

A partir de ahí, **cada `git push` a `main` vuelve a desplegar automáticamente**.

### 4.5 Alternativa: desde la terminal

```bash
npx vercel --prod
```

---

## 5. Si algo sale mal

| Síntoma | Causa más probable | Solución |
|---|---|---|
| `404: NOT_FOUND` al abrir la URL | `index.html` no está en la raíz del repo | Mueve los archivos a la raíz o ajusta *Root Directory* (§4.3) |
| Página en blanco, sin estilos | Mayúsculas/minúsculas en las rutas | Revisa que la carpeta sea `assets` y los archivos `app.js`, `runtime.js`, `styles.css`, todo en minúscula |
| Error `No Output Directory named "public"` | Vercel detectó un framework que no es | Cambia *Framework Preset* a `Other` y deja *Output Directory* vacío |
| Se ven `Anï¿½lisis`, `MIÃ‰` | El archivo se guardó en ANSI o con BOM | Vuelve a guardarlo como UTF-8 sin BOM |
| El ícono no aparece al instalar en el móvil | Faltan los PNG | Confirma que `icon-192.png` e `icon-512.png` estén en el repo |
| Se despliega la versión vieja | El push no llegó | Revisa la pestaña *Deployments* en Vercel y el commit asociado |

Para ver el error exacto: en Vercel, pestaña **Deployments** → el despliegue → **Building** / **Runtime Logs**.

---

## 6. Personalizarla

**Pantalla inicial, color de acento y modo edición** — final de `assets/app.js`:

```js
props: {
  acento: 'Naranja',          // 'Naranja' | 'Menta'
  pantallaInicial: 'Home',    // 'Home' | 'Ejercicio' | 'Estudio' | 'Finanzas'
  modoEdicion: false,
  ocultarCompletados: true,
}
```

**Rutinas de gimnasio** — constante `ROUTINES` al inicio de `assets/app.js`. Cada ejercicio define `sets`, `reps`, `rest` (descanso) y `drops` (descensos). Si agregas un ejercicio nuevo y quieres que tenga ícono, añade su trazado en `ICONS` con la misma clave del nombre.

**Datos de ejemplo** (materias, actividades, libreticas, perfil) — constantes `SEED_*` en `assets/app.js`. Se usan **solo la primera vez**; después manda lo que haya en `localStorage`.

**Empezar de cero**: abre la consola del navegador (F12) y ejecuta

```js
localStorage.removeItem('pilares.v1'); location.reload();
```

---

## 7. Instalarla en el teléfono

Abre la URL de Vercel en el móvil:

- **Android / Chrome**: menú ⋮ → *Instalar aplicación*.
- **iPhone / Safari**: botón Compartir → *Añadir a pantalla de inicio*.

Queda a pantalla completa, con su ícono, y funciona igual porque todos los datos son locales.
