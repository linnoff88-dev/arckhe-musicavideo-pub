# musicavideo-pub — INEMA MUSICAVIDEO V2.x.x

**🇧🇷 [Português](README.md) · 🇺🇸 [English](README.en.md) · 🇪🇸 [Español](README.es.md)**

La **vitrina** del acervo de [musicavideo](https://github.com/inematds/musicavideo):
los clips, las pistas y las portadas servidos desde Hugging Face; el panel, en Vercel.

## 📖 Guía de uso

Guía completa (landing + paso a paso): **https://inematds.github.io/musicavideo-pub/guia/es/**

No confundir con **el panel** — ese es el local (`musicavideo painel`,
`INEMA MUSICAVIDEO V1.x.x`), donde se escucha, se compara, se envía a la papelera y
donde se **aprueba lo que se publica aquí**. Aquí solo se puede leer, con una excepción: el
**like** del público.

## Cómo funciona

```
painel local  --aprova-->  publica-hf  -->  dataset no Hugging Face
                                                 |  manifest.json
                                                 v
                                          esta app (Vercel)
                                                 |  like
                                                 v
                                   musicavideo likes  -->  painel local
```

- **Archivos:** dataset público `Inematds/musicavideo-acervo`. Los `<video>` y
  `<audio>` buscan directamente allí — el `resolve/main` de HF sirve solicitudes de rango
  (verificado: HTTP 206 con `Content-Range` en un mp4 de 101 MB), así que la barra del
  video permite navegar sin ningún proxy. Esta app nunca sirve contenido multimedia.
- **Metadatos:** `manifest.json`, escrito por `musicavideo publica-hf` a partir
  del MISMO colector que usa el panel local. Se revalida cada hora.
- **Identidad:** cada producción es un `MVD-000`, y la URL de la página es (`/mvd-014`).

## Qué NO está aquí

- **`fonte.mp4` de los análisis.** Es un video de terceros descargado de YouTube:
  volver a alojarlo sería redistribuirlo. La pestaña de análisis muestra el TEXTO del análisis
  y el video original mediante la inserción oficial.
- **`raw/`, carpetas de prueba, `clipe.mp4` duplicado.** Se quedan en la máquina.
- **Papelera y aprobación.** Son acciones de trabajo: están en el panel local.

## El like

La única escritura del público, y la razón por la que la app no es HTML estático puro.
Se guarda en un Redis REST (Vercel KV / Upstash), donde `INCR` es atómico. Variables:

| variable | para qué |
|---|---|
| `KV_REST_API_URL` / `UPSTASH_REDIS_REST_URL` | endpoint del KV |
| `KV_REST_API_TOKEN` / `UPSTASH_REDIS_REST_TOKEN` | token |
| `HF_REPO` | dataset, si no es el predeterminado |

**Sin estas variables la app sigue funcionando** — el contador desaparece y el clic no
se guarda. Una vitrina sin contador sigue siendo una vitrina; una vitrina que no abre no es nada. Así
está hoy: el like quedó para después, a propósito.

La forma rápida de activarlo: en el proyecto de Vercel, **Storage → Create Database →
Upstash Redis**, conectarlo al proyecto y volver a desplegar. Vercel inyecta las dos
variables automáticamente — no hay que escribir nada. Si se crea directamente en Upstash, los valores
están en la pestaña **REST API** de la base de datos (el token debe ser el de escritura; el
de solo lectura no sirve, porque el like escribe).

Los conteos vuelven al panel local con `musicavideo likes`
(`MUSICAVIDEO_PUB_URL` apuntando aquí), y se convierten en un ♥ en cada tarjeta. Sin ese
retorno, la única señal del público que tiene el proyecto desaparecería aquí.

## Deploy

Importar **este repo** en Vercel con *Root Directory* `./` (el valor predeterminado). Después
de eso, publicar es `git push` — el webhook hace el resto.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
