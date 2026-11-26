ï»¿# musicavideo-pub ê¢â¬â INEMA MUSICAVIDEO V2.x.x

<div align="center">
  <img src="capa/logo.svg" alt="Arckhé AI" height="48" />
  <p><strong>Arckhé AI</strong></p>
</div>


**ê°Å¸â¡Â§ê°Å¸â¡Â· [PortuguêÂªs](README.md) êÂ· ê°Å¸â¡Âºê°Å¸â¡Â¸ [English](README.en.md) êÂ· ê°Å¸â¡Âªê°Å¸â¡Â¸ [EspaêÂ±ol](README.es.md)**

A **vitrine** do acervo do [musicavideo](https://github.com/inematds/musicavideo):
os clipes, as faixas e as capas servidos do Hugging Face, o painel na Vercel.

## ê°Å¸ââ Guia de uso

Guia completo (landing + passo a passo): **https://inematds.github.io/musicavideo-pub/guia/**

NêÂ£o confundir com **o painel** ê¢â¬â esse êÂ© o local (`musicavideo painel`,
`INEMA MUSICAVIDEO V1.x.x`), onde se ouve, se compara, se manda para a lixeira e
onde se **aprova o que sobe para cêÂ¡**. Aqui êÂ© sêÂ³ leitura, com uma exceêÂ§êÂ£o: o
**like** do pêÂºblico.

## Como funciona

```
painel local  --aprova-->  publica-hf  -->  dataset no Hugging Face
                                                 |  manifest.json
                                                 v
                                          esta app (Vercel)
                                                 |  like
                                                 v
                                   musicavideo likes  -->  painel local
```

- **Arquivos:** dataset pêÂºblico `Inematds/musicavideo-acervo`. Os `<video>` e
  `<audio>` buscam direto lêÂ¡ ê¢â¬â o `resolve/main` do HF serve range request
  (verificado: HTTP 206 com `Content-Range` num mp4 de 101 MB), entêÂ£o a barra do
  vêÂ­deo navega sem proxy nenhum. Esta app nunca serve mêÂ­dia.
- **Metadados:** `manifest.json`, escrito pelo `musicavideo publica-hf` a partir
  do MESMO coletor que o painel local usa. Revalidado de hora em hora.
- **Identidade:** cada produêÂ§êÂ£o êÂ© um `MVD-000`, e êÂ© a URL da pêÂ¡gina (`/mvd-014`).

## O que NêÆO estêÂ¡ aqui

- **`fonte.mp4` das anêÂ¡lises.** êâ° vêÂ­deo de terceiros baixado do YouTube:
  re-hospedar seria redistribuiêÂ§êÂ£o. A aba de anêÂ¡lises mostra o TEXTO da anêÂ¡lise
  e o vêÂ­deo original pelo embed oficial.
- **`raw/`, pastas de teste, `clipe.mp4` duplicado.** Ficam na mêÂ¡quina.
- **Lixeira e aprovaêÂ§êÂ£o.** SêÂ£o gestos de trabalho ê¢â¬â vivem no painel local.

## O like

A êÂºnica escrita do pêÂºblico, e a razêÂ£o de a app nêÂ£o ser HTML estêÂ¡tico puro.
Guardado num Redis REST (Vercel KV / Upstash), onde `INCR` êÂ© atêÂ´mico. VariêÂ¡veis:

| variêÂ¡vel | para quêÂª |
|---|---|
| `KV_REST_API_URL` / `UPSTASH_REDIS_REST_URL` | endpoint do KV |
| `KV_REST_API_TOKEN` / `UPSTASH_REDIS_REST_TOKEN` | token |
| `HF_REPO` | dataset, se nêÂ£o for o padrêÂ£o |

**Sem essas variêÂ¡veis a app continua de pêÂ©** ê¢â¬â o contador some e o clique nêÂ£o
persiste. Vitrine sem contador êÂ© vitrine; vitrine que nêÂ£o abre nêÂ£o êÂ© nada. êâ°
assim que ela estêÂ¡ hoje: o like ficou para depois, de propêÂ³sito.

O caminho curto para ligar: no projeto da Vercel, **Storage ê¢â â Create Database ê¢â â
Upstash Redis**, conectar ao projeto e reimplantar. A Vercel injeta as duas
variêÂ¡veis sozinha ê¢â¬â nêÂ£o se digita nada. Criando direto na Upstash, os valores
estêÂ£o na aba **REST API** do banco (o token tem que ser o de escrita; o
read-only nêÂ£o serve, porque o like escreve).

As contagens voltam para o painel local com `musicavideo likes`
(`MUSICAVIDEO_PUB_URL` apontando para cêÂ¡), e viram um ê¢â¢Â¥ em cada card. Sem esse
retorno, o êÂºnico sinal de pêÂºblico que o projeto tem morreria aqui.

## Deploy

Importar **este repo** na Vercel com *Root Directory* `./` (o default). Depois
disso, publicar êÂ© `git push` ê¢â¬â o webhook faz o resto.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
```

---

<div align="center">
  <img src="capa/logo.svg" alt="Arckhé AI" height="32" />
  <p><strong>Arckhé AI</strong></p>
</div>