# Guía de edición del portafolio

Esta guía explica, paso a paso y sin conocimientos de programación, cómo cambiar los textos, proyectos, publicaciones, la foto y los CV del sitio.

**Idea clave:** todo lo que se lee en el sitio vive en tres archivos de contenido, uno por idioma. Usted nunca necesita tocar el diseño.

| Idioma | Archivo |
| --- | --- |
| Inglés (idioma principal) | `src/data/en.json` |
| Español | `src/data/es.json` |
| Francés | `src/data/fr.json` |

Las imágenes y los PDF están en la carpeta `public/assets/`.

> **Antes de publicar:** el sitio viene con contenido de ejemplo (proyectos, cifras, publicaciones, patentes, instituciones y enlaces inventados). Una franja oscura en la parte superior lo advierte. Reemplace todo por información real y luego borre el aviso (ver sección 9).

---

## 1. Dos formas de editar

### Opción A — Pages CMS (recomendada)

Pages CMS es un editor visual gratuito: usted llena formularios y él guarda los cambios.

1. Entre a **https://app.pagescms.org**.
2. Pulse **Sign in with GitHub** e ingrese con la cuenta de GitHub que tiene acceso al repositorio.
3. La primera vez, autorice a Pages CMS a acceder al repositorio del portafolio.
4. Seleccione el repositorio y la rama `main`.
5. En el menú de la izquierda verá **English**, **Español**, **Français** y **Media** (fotos y PDF).
6. Abra un idioma, cambie lo que necesite y pulse **Save**.

Cada vez que guarda, el sitio se reconstruye y se publica solo. Tarda entre 1 y 3 minutos.

### Opción B — Directamente en GitHub

1. Abra el repositorio en github.com.
2. Navegue hasta el archivo, por ejemplo `src/data/es.json`.
3. Pulse el ícono del lápiz (**Edit this file**).
4. Haga el cambio y pulse **Commit changes**.

Si usa esta opción, lea la sección 10 sobre las reglas del formato JSON.

---

## 2. Regla de oro: los tres idiomas van juntos

Cuando **agregue o elimine** algo (un proyecto, una publicación, una competencia), hágalo **en los tres archivos**, en la misma posición. Si un idioma tiene 4 proyectos y otro 5, la publicación se detiene y el sitio conserva la versión anterior.

Hay datos que deben ser **idénticos** en los tres idiomas:

- identificadores (`id`, `category`, `track`),
- enlaces y nombres de archivo,
- años de experiencia y niveles (`years`, `level`),
- códigos de patente, iconos y la fecha `updated`.

Los textos descriptivos sí se traducen.

---

## 3. Cambiar un texto

1. Abra el idioma que quiere editar.
2. Busque la sección. Los nombres coinciden con las partes del sitio:

| Sección en el editor | Parte del sitio |
| --- | --- |
| Portada (`hero`) | Titular, resumen, botones, perfiles científicos, foto |
| Capacidades (`pillars`) | Las 4 tarjetas de capacidades |
| Cifras clave (`metrics`) | Números grandes e instituciones colaboradoras |
| Proyectos de I+D (`projects`) | Casos de estudio |
| Stack técnico (`stack`) | Competencias con años y nivel |
| Patentes (`ip`) | Tarjetas de patentes y activos |
| Publicaciones (`publications`) | Lista filtrable de artículos |
| Trayectoria (`career`) | Experiencia y formación |
| Perfil (`about`) | Biografía y bloque «Ahora» |
| Descarga de CV (`cv`) | Las dos tarjetas de CV |
| Contacto (`contact`) | Disponibilidad, correo y formulario |

3. Cambie el texto y guarde.
4. Repita en los otros dos idiomas.

**El titular de la portada** tiene dos partes: `headline` (en color oscuro) y `headlineAccent` (resaltada en verde).

---

## 4. Agregar un proyecto

En **Proyectos de I+D → Proyectos**, pulse **Add** y complete:

| Campo | Qué escribir |
| --- | --- |
| Identificador | Corto, en minúsculas y con guiones: `panel-metilacion`. Igual en los 3 idiomas. |
| Categoría | Uno de los identificadores de los filtros: `biomarkers`, `preclinical`, `bioinformatics`, `industry`. |
| Años | Por ejemplo `2023–2025`. |
| Título y resumen | El resumen debe caber en una línea. |
| Resumen gráfico | 4 pasos. En cada uno elija un dibujo y escriba 2 o 3 palabras. |
| Problema / Metodología / Mi rol / Impacto | Un párrafo corto cada uno. En Impacto, ponga cifras. |
| Cifras destacadas | Exactamente 3: valor y qué mide. |
| Etiquetas técnicas | Técnicas o herramientas (5 como máximo). |
| Enlaces | Dirección completa (`https://…`). Si no existe, deje el campo vacío: aparecerá atenuado. |

Dibujos disponibles para el resumen gráfico: `sample` (tubo de muestra), `dna` (ADN), `plate` (placa de pocillos), `chart` (gráfico), `cell` (célula), `molecule` (molécula), `network` (red), `target` (diana), `shield` (validación), `clinic` (clínica), `organoid` (organoide), `chip` (pipeline o código).

### Proyectos confidenciales (NDA)

Active la casilla **Proyecto bajo NDA**. El sitio mostrará la insignia de confidencialidad y una nota ética dentro del caso. En estos proyectos:

- no nombre al patrocinador, la diana ni el compuesto;
- use rangos en lugar de valores exactos (`<10 %`, `4–6 semanas`);
- deje todos los enlaces vacíos.

### Agregar una categoría nueva de filtro

En **Proyectos → Filtros**, agregue un elemento con un identificador (por ejemplo `diagnostics`) y su texto. Use ese mismo identificador en el campo Categoría de los proyectos.

---

## 5. Agregar una publicación

En **Publicaciones → Publicaciones**, pulse **Add**. Ponga las más recientes arriba.

| Campo | Qué escribir |
| --- | --- |
| Año | `2026` |
| Línea | `biomarkers`, `models` u `omics` (o una nueva que haya creado en «Líneas de investigación»). |
| Posición de autoría | «Primera autora», «Autora de correspondencia», «Coautora (3 de 9)». |
| Título, autores, revista | Tal como aparecen en el artículo. El título no se traduce. |
| Resumen ejecutivo | Dos frases sin jerga, pensadas para alguien de negocios: qué se encontró y para qué sirve. |
| Enlaces | PDF, código, datos y DOI. El DOI va completo: `https://doi.org/10.xxxx/xxxxx`. |

El filtro por año se crea solo a partir de los años que usted escriba.

### Agregar una patente

En **Patentes → Patentes / activos**: código, estado legal (texto libre), tipo de estado (`granted` concedida, `licensed` licenciada, `pending` en trámite), año, título y una nota de impacto comercial o clínico.

---

## 6. Cambiar la foto

1. Prepare una foto **vertical**, proporción 4:5 (ideal 800 × 1000 píxeles), en JPG y de menos de 300 KB.
2. Nómbrela `katherine-portrait.jpg`.
3. En Pages CMS abra **Media**, pulse **Upload** y súbala.
4. En cada idioma vaya a **Portada → Retrato → Foto** y seleccione la nueva imagen.
5. Actualice también la **Descripción de la foto** si hace falta. Sirve para personas que usan lector de pantalla.

En GitHub: suba el archivo a `public/assets/` y cambie en los tres JSON la línea
`"src": "assets/katherine-portrait.svg"` por `"src": "assets/katherine-portrait.jpg"`.

---

## 7. Actualizar los CV en PDF

La forma más sencilla es **reemplazar el archivo conservando el nombre exacto**. Así no hay que tocar nada más.

| Documento | Nombre del archivo |
| --- | --- |
| CV corporativo / industria (1–2 páginas) | `cv-industria-katherine-medina.pdf` |
| CV académico completo | `cv-academico-katherine-medina.pdf` |

1. Exporte su CV a PDF y póngale el nombre de la tabla.
2. En Pages CMS: **Media → Upload** (acepte reemplazar el existente).
   En GitHub: carpeta `public/assets/` → **Add file → Upload files** → **Commit changes**.

Si prefiere otro nombre de archivo, cámbielo en los tres idiomas en **Descarga de CV → Archivo PDF** y en **Portada → Botón secundario**.

---

## 8. Actualizar el bloque «Ahora»

En **Perfil → Bloque «Ahora»**:

1. Edite las actividades actuales (3 frases cortas funcionan bien).
2. Cambie la **Fecha de última actualización**. El formato interno es `AAAA-MM-DD` (por ejemplo `2027-02-15`); el sitio la muestra escrita en cada idioma.

Conviene revisarlo cada dos o tres meses: una fecha antigua da impresión de abandono.

---

## 9. Antes de publicar por primera vez

- [ ] Reemplace todo el contenido de ejemplo: proyectos, cifras, publicaciones, patentes, instituciones, trayectoria.
- [ ] Ponga sus enlaces reales en **Portada → Perfiles científicos** (ORCID, Google Scholar, PubMed, LinkedIn, GitHub).
- [ ] Cambie el correo en **Datos generales → Correo de contacto**.
- [ ] Suba la foto y los dos PDF.
- [ ] Active el formulario (ver abajo).
- [ ] Borre el texto de **Datos generales → Aviso de contenido de ejemplo** en los tres idiomas. Al dejarlo vacío, la franja superior desaparece.

### Activar el formulario de contacto

Mientras no se configure, el botón «Enviar» abre el programa de correo del visitante. Para recibir los mensajes directamente:

**Con Formspree**
1. Cree una cuenta en https://formspree.io y un formulario nuevo.
2. Copie la dirección que le dan, parecida a `https://formspree.io/f/abcdwxyz`.
3. Péguela en **Contacto → Formulario → Dirección del servicio**, en los tres idiomas.

**Con Web3Forms**
1. Obtenga una clave en https://web3forms.com.
2. En **Dirección del servicio** escriba `https://api.web3forms.com/submit`.
3. En **Clave de acceso** pegue su clave.

### Activar la publicación en GitHub Pages (una sola vez)

1. En el repositorio: **Settings → Pages**.
2. En **Source** elija **GitHub Actions**.
3. Desde ese momento, cada cambio en la rama `main` publica el sitio. Puede seguir el proceso en la pestaña **Actions**.

---

## 10. Si edita el JSON a mano

Un archivo JSON es una lista de pares `"nombre": "valor"`. Cuatro reglas evitan casi todos los errores:

1. **Cambie solo lo que está a la derecha de los dos puntos.**
   `"title": "Mi nuevo título"` — nunca modifique `"title"`.
2. **Los textos van entre comillas dobles** `"así"`. Los números y `true` / `false` van sin comillas.
3. **Coma entre elementos, nunca después del último.**
4. **Para usar comillas dentro de un texto**, escriba `\"` o use comillas angulares « ».

Ejemplo correcto:

```json
"metrics": [
  { "value": "0,93", "label": "AUC, validación externa" },
  { "value": "412", "label": "Muestras de plasma" }
]
```

---

## 11. Si algo sale mal

**Guardé y el sitio no cambió.**
Espere 3 minutos y recargue con `Ctrl + F5`. Si sigue igual, abra la pestaña **Actions** del repositorio: una ✗ roja indica que la publicación falló. El sitio en línea sigue mostrando la última versión correcta; nada se rompe para los visitantes.

**Actions muestra un error en «Check translations are in sync».**
Los tres idiomas no coinciden. El mensaje dice exactamente dónde, por ejemplo:
`[fr] projects.items: en has 5 items, fr has 4` → falta agregar el proyecto en francés.

**Actions muestra un error en «Build».**
Casi siempre es una coma o una comilla en un JSON. Abra el archivo que editó de último y revise el cambio, o deshágalo desde **History** en GitHub.

**Quiero deshacer un cambio.**
En GitHub, abra el archivo → **History** → elija la versión anterior → **⋯ → Revert**.

---

## 12. Para quien quiera verlo en su computador (opcional)

Requiere Node.js 22.23 o superior.

```bash
npm install          # solo la primera vez
npm run dev          # abre el sitio en http://localhost:4321
npm run check:i18n   # comprueba que los tres idiomas coincidan
npm run build        # genera el sitio final en la carpeta dist/
```
