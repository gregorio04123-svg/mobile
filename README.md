# Pilares

App web para el día a día: **rutina de gimnasio**, **agenda académica** y **libreticas de dinero**, en una sola pantalla de móvil.

Es un sitio **100 % estático**: HTML, CSS y JavaScript sin `npm install` y **sin paso de compilación**. Eso significa que en Vercel no hay build que pueda fallar. Los datos viven en **Supabase** (plan gratuito).

---

## 1. Qué incluye

```
pilares/
├── index.html              ← punto de entrada (DEBE quedar en la raíz del repo)
├── app.js                  ← lógica: rutinas, agenda, finanzas, amigos y chat
├── nube.js                 ← cuentas y guardado en Supabase
├── fluido.js               ← animaciones y gestos (estilo Apple)
├── orbe.js                 ← <pilares-orbe>: el indicador de "cargando"
├── orbes-motor.js          ← motor de las orbes (thinking-orbs, licencia MIT)
├── runtime.js              ← motor que interpreta la plantilla del diseño
├── styles.css              ← estilos base + marco de teléfono en escritorio
├── viewport.js             ← corrige el alto de pantalla en la PWA instalada
├── sw.js                   ← service worker: recibe las notificaciones push
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
- **Ejercicio**: plan semanal fijo por cuenta (base: lun Espalda, mar Pecho, mié Pierna, jue Hombro, vie Espalda, sáb Pecho, dom descanso). Marcar series, anotar pesos y descensos, cronómetro de descanso.
  - **Cambiar días**: mantener presionado un día de la tira semanal. Si se arrastra sobre otro, se intercambian; si se suelta sin mover, sale un menú con los grupos y *Descanso*. El cambio aplica a todas las semanas y se puede deshacer. Un día que ya tiene series anotadas nunca se pierde: ese cambia desde la semana siguiente.
  - **Tu rutina** (botón de la mancuerna, arriba a la izquierda): crear, renombrar, recolorear y borrar grupos; añadir, editar, reordenar y quitar ejercicios.
  - *Modo edición* sobre una tarjeta cambia el ejercicio en su grupo para siempre (los pesos siguen siendo de cada día).
- **Estudio**: calendario del mes con código de urgencia por color, crear/editar/eliminar actividades, cuadernos y archivos por materia. Un cuaderno abierto se cierra con la **X** de arriba a la izquierda.
  - **Tipos propios**: además de Quiz, Seguimiento, Parcial, Final y Tarea, cada quien crea los suyos (Cine, Salida a comer, Reunión…). Con *Modo edición* activo, en la fila Tipo de la ventana de actividad: *+ Nuevo tipo*, o tocar uno para renombrarlo, cambiar su urgencia o borrarlo (con *Deshacer*). "Con urgencia" se colorea según qué tan cerca está la fecha; "sin urgencia" va siempre en gris. Renombrar un tipo también cambia tus actividades de ese tipo; borrarlo no toca las que ya lo usan.
  - El cuaderno es opcional: *Sin cuaderno*.
- **Finanzas**: libreticas de quién debe a quién, marcar como saldada con el botón *Saldar*, historial y totales. Las saldadas pasan al historial, donde se pueden borrar.
- **Movimiento y gestos** (criterios de *Designing Fluid Interfaces* de Apple, en `fluido.js`): resortes que arrancan desde donde está cada cosa y heredan la velocidad del dedo; sin rebote salvo cuando se lanza algo con impulso.
  - La ventana de nueva actividad y el panel ⚙ suben desde abajo y se cierran arrastrando hacia abajo o tocando el área oscura.
  - En Ejercicio se desliza a los lados para pasar de día.
  - Jalar hacia abajo desde el tope actualiza con la nube. El indicador es una orbe naranja (el tono de la muestra de Libraries.dev, `#FFD28F`): gira con el dedo y crece; cuando ya se puede soltar arranca a girar sola, y así sigue hasta que termina. Los puntos de adelante van de ese tono claro y los de atrás de un naranja más hondo y tenue (el tinte propio del motor los oscurecía hasta verse café).
  - **Orbes de carga** (de [Libraries.dev](https://libraries.dev/orbs), `thinking-orbs` 0.3.2, licencia MIT, de Jakub Antalik): también en *Cargando tus datos*, *Cargando mensajes…* y *Cargando su rutina…*. La app no usa React, así que se usa solo su motor de dibujo (`orbes-motor.js`, copia sin cambios con su licencia) dentro de `orbe.js`. Se descarga aparte cuando el teléfono está libre, una sola animación sirve a todas, solo se mueve la que está en pantalla y con *Reducir movimiento* queda quieta.
  - Barra de pestañas y encabezados de vidrio translúcido; el contenido pasa difuminado por debajo. Respeta *Reducir movimiento* y *Reducir transparencia* del sistema.
- **Cuentas**: cada persona entra con **usuario y contraseña, sin correo**. La cuenta se crea desde la función `registro` de Supabase ya confirmada, así que nunca se envía un correo (no hay costo de dominio ni de envío). Sin correo no hay "olvidé mi contraseña": hay que guardarla bien.
- **Tres pilares y la ruedita**: abajo van *Ejercicio*, *Estudio* y *Finanzas*. Arriba a la derecha, la ruedita ⚙ abre *Tu panel*: la campanita, los últimos 3 avisos (*Ver todos* para el resto), tus amigos y chats, *Modo edición* y tu cuenta. Su número rojo suma avisos nuevos, mensajes sin leer y solicitudes de amistad.
- **Amigos** (en la ruedita, debajo de los avisos): cada cuenta tiene un código (ej. `ANDRE-4F2A`). *Agregar* muestra el tuyo y agrega a alguien con el suyo; al aceptar la solicitud aparece en la lista.
  - **Chat**: tocar a un amigo abre la conversación en pantalla completa, encima del pilar en que estés; la flecha de volver regresa a la ruedita (solo texto, sin confirmaciones de lectura). La lista va ordenada por el último mensaje y muestra cuántos no has leído; la pestaña lleva la suma. Al subir, los mensajes anteriores se cargan solos (una orbe arriba mientras llegan) y lo que estabas leyendo no se mueve. El **+** junto al campo de texto adjunta:
    - **Rutina**: tu semana o uno de tus grupos. Al amigo le llega como tarjeta en el chat con *Ver y aceptar*.
    - **Libretica**: *Me debe* o *Le debo*, monto y concepto. Se envía al instante y llega con el monto.
    - **Actividad**: abre la ventana de actividad ya dirigida a ese amigo.
  - Todo lo que se comparten (también desde Finanzas o Estudio) aparece como tarjeta en el chat, con un atajo a su sección. *···* arriba a la derecha muestra su código y permite quitarlo de tus amigos (el historial y las libreticas se conservan).
  - **Cómo le dices** (en *···* del chat): le pones a un amigo el nombre que quieras, como en los contactos del celular. Es privado: solo tú lo ves (la base no deja que nadie más lo lea) y tu amigo nunca se entera. Sale en toda tu app —lista de chats, chats y grupos, libreticas, actividades— y también en tus avisos y notificaciones; arriba en su chat queda su nombre de Pilares para no perderlo de vista. Bórralo y guarda para volver a su nombre. Lo que se guarda o se comparte (deudor y prestamista de una libretica, por ejemplo) sigue llevando el nombre de Pilares. Si dejan de ser amigos, el apodo se borra.
  - **Elegir amigo**: *Compartir con* (libreticas) y *Para* (actividades) son un botón que abre una hoja con tus amigos de la A a la Z y lo elegido marcado. Con más de 4 amigos trae buscador: encuentra por el apodo o por el nombre de Pilares, sin importar tildes ni mayúsculas ("pena" encuentra a "Peña"); con una sola coincidencia, *Buscar* en el teclado la elige.
  - **Agenda compartida**: al crear una actividad eliges *Para: Mí* o un amigo, y le aparece en su agenda marcada "DE …".
  - **Libreticas compartidas**: en la tarjeta eliges al amigo en *Compartir con*, escribes el monto y el *Concepto* y tocas **Enviar a …**. Hasta ese momento el amigo no la ve; al enviarla le llega el aviso con el monto y el concepto. Si cambias de amigo o la dejas en *Solo yo*, hay que volver a enviarla. Ya enviada, los dos la ven, los dos registran **abonos** y pueden marcarla saldada; solo quien la creó cambia el monto o la borra. Se salda sola cuando los abonos cubren el total.
  - **Rutinas compartidas**: por el **+** del chat, o en *Tu rutina*, *Compartir mi semana* o, dentro de un grupo, *Compartir este grupo*. Al amigo le llega una tarjeta en el chat; la ve y la acepta o la rechaza. Aceptar crea una **copia propia** (lo que el otro cambie después no la afecta); la semana además reemplaza el plan, con *Deshacer*. Si ya existe un grupo con ese nombre, la copia lleva el nombre de quien la envió (ej. "Pierna · Martín"). Solo viaja la rutina: grupos, ejercicios, series × repeticiones y descanso; nunca pesos.
- **Grupos** (ruedita → *Nuevo grupo*): un nombre y al menos un amigo. Aparecen en la misma lista de chats, con su chat de grupo (el nombre de quien escribe va sobre sus mensajes).
  - Cualquiera del grupo agrega a **sus** amigos (desde *···*). Nadie saca a nadie: cada quien sale cuando quiera. Quien entra después ve solo lo que se escriba desde que entró.
  - En *···* también se cambia el nombre del grupo y se ve quién está. Lo que pasa en el grupo (quién entró, quién salió, cambios de nombre) queda anotado en el chat.
  - El **+** del chat del grupo tiene lo mismo que el de un amigo, pero para todos:
    - **Rutina**: tu semana o uno de tus grupos. A cada uno le llega la invitación de siempre (la ve y la acepta si quiere) y en el chat queda una sola tarjeta.
    - **Actividad**: se agenda en la agenda de todos, también en la tuya. A cada uno le queda en su cuaderno con el mismo nombre que el tuyo (sin importar mayúsculas ni tildes); si no tiene uno así, queda sin cuaderno y la puede mover. Si tú, que la creaste, cambias la fecha, el tipo o los temas, cambia para todos, les llega un aviso y queda anotado en el chat. Los demás no pueden cambiar esos datos: solo moverla de cuaderno o quitarla de su agenda (a los otros les sigue apareciendo).
  - **Libretica de grupo** (el **+** del chat del grupo → *Libretica*): el total, el concepto y quiénes consumieron, con cuánto le toca a cada uno. La suma tiene que dar exactamente el total (nunca más ni menos); *Partes iguales* reparte por ti y los pesos que sobran de la división van de a uno a los primeros. Quien la crea no se incluye: el total es lo que le deben.
  - Llega al chat como tarjeta y a cada quien un aviso con su parte ("te toca $X de $Y"). Todos en el grupo ven el detalle: cuánto le tocó a cada uno y quién ya pagó.
  - **Solo quien debe registra lo que paga** (un abono o *Pagar lo que falta*), nunca más de lo que le falta; puede borrar un abono suyo si se equivocó. Quien la creó recibe un aviso con cada movimiento. Cuando todos pagan, queda saldada.
  - Salen también en **Finanzas** y suman en los totales: en las que creaste, lo que te falta cobrar; en las que debes, tu parte. Las saldadas pasan al historial. Solo quien la creó puede borrarla (a quienes aún debían les llega un aviso).
- **Persistencia**: todo se guarda en Supabase y además queda una copia en el teléfono, así abre al instante y funciona sin señal (lo pendiente se sube al volver la conexión). Seguridad por fila: nadie ve datos de otra cuenta salvo lo compartido.
- **Tiempo real**: lo que haga un amigo (mensaje, solicitud de amistad, actividad asignada, libretica compartida, abono, rutina enviada, lo que pasa en tus grupos) aparece en uno o dos segundos mientras la app está en pantalla. En segundo plano la conexión se suelta y al volver se lee lo que pasó. Plan gratis de Supabase: 200 conexiones simultáneas y 2 millones de mensajes al mes; un círculo de amigos queda muy por debajo.
- **Avisos y notificaciones**: el botón ⚙ muestra un número rojo con los avisos nuevos, y el panel los lista arriba (tocar uno lleva a su sección). El título es quién lo envía y abajo va de qué se trata (tipo, materia, día y temas; monto y concepto de la libretica; lo que queda por pagar o cobrar tras un abono). Avisan de:
  - **Estudio**: un amigo te asigna una actividad o la cambian en un grupo.
  - **Finanzas**: te comparten una libretica, alguien registra un abono en una compartida, o te toca una parte en una libretica de grupo (y a quien la creó, cada abono).
  - **Amigos**: un amigo te escribe (el título es su nombre y abajo el mensaje; tocarla abre el chat), te envía una rutina, te agregan a un grupo o escriben en uno ("Nombre · Grupo").
  - Para que lleguen al celular con la app cerrada: en la ruedita, la **campanita** junto a la ×. Naranja = prendidas en este celular; gris y tachada = apagadas (tocarla las prende o las apaga; si el sistema no lo permite, dice por qué). En iPhone primero hay que agregar Pilares a la pantalla de inicio (Safari → Compartir → *Agregar a inicio*) y abrirla desde el ícono; requiere iOS 16.4 o más reciente. Cada dispositivo se activa por separado; al cerrar sesión deja de recibirlas.
- **Respaldo**: panel ⚙ → *Exportar mis datos* → *Guardar respaldo*. Descarga un `.json` con todo lo tuyo (nombre y tipos de actividad, amigos con el apodo que les pusiste, cuadernos, actividades, todo el historial del gimnasio, libreticas, abonos, mensajes del chat, tus grupos, sus libreticas y sus mensajes). En iPhone se abre la hoja de compartir: elige *Guardar en Archivos*. El plan gratis no hace copias automáticas, así que conviene exportar de vez en cuando.
- **Datos de antes de las cuentas**: si en un teléfono ya usabas la app, en el panel ⚙ aparece *Importar datos de este dispositivo* (una sola vez por dispositivo).

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

En el HTML las rutas son `app.js`, `icon-192.png`, etc. Nunca uses `C:\Users\...`, `file:///...` ni rutas que empiecen por `/` si algún día mueves el sitio a un subdirectorio.

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

**Pantalla inicial, color de acento y modo edición** — final de `app.js`:

```js
props: {
  acento: 'Naranja',          // 'Naranja' | 'Menta'
  pantallaInicial: 'Home',    // 'Home' | 'Ejercicio' | 'Estudio' | 'Finanzas'
  modoEdicion: false,
  ocultarCompletados: true,
}
```

**Rutinas de gimnasio** — viven en Supabase: tabla `grupos` (cada grupo con sus ejercicios) y tabla `rutinas` (el plan de 7 días; índice 0 = domingo). La rutina base de las cuentas nuevas la crea la función `sembrar_rutina` de la base de datos. Los avisos los crean disparadores de la base de datos (tabla `avisos`); si la persona activó notificaciones, cada aviso sale como push por la función `enviar-push` (código en `supabase/functions/enviar-push`), que firma con claves VAPID guardadas en Vault. Todo dentro del plan gratis. Las rutinas enviadas entre amigos viven en `rutinas_compartidas` hasta que se aceptan o rechazan; solo se crean con la función `compartir_rutina` (que toma la foto en el servidor y exige amistad). El chat vive en la tabla `mensajes`: desde la app solo se insertan textos, a un amigo y a nombre propio; las tarjetas (rutina, libretica, actividad) las crean disparadores con una foto de lo enviado, y no se editan ni se borran. `mis_chats` arma la lista con lo no leído (según `chat_lecturas`), y cada texto sale como push por la misma función `enviar-push`. Los grupos viven en `grupos_amigos` y `grupo_miembros`; su chat en `mensajes_grupo` (la seguridad por fila deja ver solo desde que se entró) y las libreticas de grupo en `libretas_grupo`, `libretas_grupo_partes` y `abonos_grupo`. Todo lo que cambia un grupo pasa por funciones del servidor (`crear_grupo`, `agregar_a_grupo`, `salir_de_grupo`, `renombrar_grupo`, `crear_libreta_grupo`, `abonar_libreta_grupo`, `borrar_abono_grupo`, `borrar_libreta_grupo`, `crear_actividad_grupo`, `compartir_rutina_grupo`), que validan las reglas (solo amigos, suma exacta, solo quien debe abona, nunca más de lo que falta). Una actividad de grupo es una fila de `actividades` por persona unida por `lote` (`actividades_grupo`); un disparador lleva a todas las copias lo que cambie quien la creó, y `proteger_actividad` impide que los demás cambien fecha, tipo o temas. Cada persona la cambia desde la app. Para que un ejercicio nuevo tenga ícono propio, añade su trazado en `ICONS` (en `app.js`) con la misma clave del nombre; si no, usa una mancuerna genérica.

**Supabase** — la URL del proyecto y la clave pública están al inicio de `nube.js`. La clave pública (`sb_publishable_…`) está hecha para ir en el navegador; lo que protege los datos son las políticas de seguridad por fila de la base de datos. **Nunca** pongas en este repo la clave `service_role` / `secret`.

**Plan gratuito de Supabase** — si nadie usa la app durante 7 días seguidos, Supabase pausa el proyecto; se reactiva desde su panel (los datos no se pierden).

---

## 7. Instalarla en el teléfono

Abre la URL de Vercel en el móvil:

- **Android / Chrome**: menú ⋮ → *Instalar aplicación*.
- **iPhone / Safari**: botón Compartir → *Añadir a pantalla de inicio*.

Queda a pantalla completa, con su ícono. Cada persona entra con su propio usuario.
