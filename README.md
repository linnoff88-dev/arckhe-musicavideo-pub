# musicavideo-pub â€” INEMA MUSICAVIDEO V2.x.x

<div align="center">
  <img src="capa/logo.svg" alt="Arckhé AI" height="48" />
  <p><strong>Arckhé AI</strong></p>
</div>


**ðŸ‡§ðŸ‡· [PortuguÃªs](README.md) Â· ðŸ‡ºðŸ‡¸ [English](README.en.md) Â· ðŸ‡ªðŸ‡¸ [EspaÃ±ol](README.es.md)**

A **vitrine** do acervo do [musicavideo](https://github.com/inematds/musicavideo):
os clipes, as faixas e as capas servidos do Hugging Face, o painel na Vercel.

## ðŸ“– Guia de uso

Guia completo (landing + passo a passo): **https://inematds.github.io/musicavideo-pub/guia/**

NÃ£o confundir com **o painel** â€” esse Ã© o local (`musicavideo painel`,
`INEMA MUSICAVIDEO V1.x.x`), onde se ouve, se compara, se manda para a lixeira e
onde se **aprova o que sobe para cÃ¡**. Aqui Ã© sÃ³ leitura, com uma exceÃ§Ã£o: o
**like** do pÃºblico.

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

- **Arquivos:** dataset pÃºblico `Inematds/musicavideo-acervo`. Os `<video>` e
  `<audio>` buscam direto lÃ¡ â€” o `resolve/main` do HF serve range request
  (verificado: HTTP 206 com `Content-Range` num mp4 de 101 MB), entÃ£o a barra do
  vÃ­deo navega sem proxy nenhum. Esta app nunca serve mÃ­dia.
- **Metadados:** `manifest.json`, escrito pelo `musicavideo publica-hf` a partir
  do MESMO coletor que o painel local usa. Revalidado de hora em hora.
- **Identidade:** cada produÃ§Ã£o Ã© um `MVD-000`, e Ã© a URL da pÃ¡gina (`/mvd-014`).

## O que NÃƒO estÃ¡ aqui

- **`fonte.mp4` das anÃ¡lises.** Ã‰ vÃ­deo de terceiros baixado do YouTube:
  re-hospedar seria redistribuiÃ§Ã£o. A aba de anÃ¡lises mostra o TEXTO da anÃ¡lise
  e o vÃ­deo original pelo embed oficial.
- **`raw/`, pastas de teste, `clipe.mp4` duplicado.** Ficam na mÃ¡quina.
- **Lixeira e aprovaÃ§Ã£o.** SÃ£o gestos de trabalho â€” vivem no painel local.

## O like

A Ãºnica escrita do pÃºblico, e a razÃ£o de a app nÃ£o ser HTML estÃ¡tico puro.
Guardado num Redis REST (Vercel KV / Upstash), onde `INCR` Ã© atÃ´mico. VariÃ¡veis:

| variÃ¡vel | para quÃª |
|---|---|
| `KV_REST_API_URL` / `UPSTASH_REDIS_REST_URL` | endpoint do KV |
| `KV_REST_API_TOKEN` / `UPSTASH_REDIS_REST_TOKEN` | token |
| `HF_REPO` | dataset, se nÃ£o for o padrÃ£o |

**Sem essas variÃ¡veis a app continua de pÃ©** â€” o contador some e o clique nÃ£o
persiste. Vitrine sem contador Ã© vitrine; vitrine que nÃ£o abre nÃ£o Ã© nada. Ã‰
assim que ela estÃ¡ hoje: o like ficou para depois, de propÃ³sito.

O caminho curto para ligar: no projeto da Vercel, **Storage â†’ Create Database â†’
Upstash Redis**, conectar ao projeto e reimplantar. A Vercel injeta as duas
variÃ¡veis sozinha â€” nÃ£o se digita nada. Criando direto na Upstash, os valores
estÃ£o na aba **REST API** do banco (o token tem que ser o de escrita; o
read-only nÃ£o serve, porque o like escreve).

As contagens voltam para o painel local com `musicavideo likes`
(`MUSICAVIDEO_PUB_URL` apontando para cÃ¡), e viram um â™¥ em cada card. Sem esse
retorno, o Ãºnico sinal de pÃºblico que o projeto tem morreria aqui.

## Deploy

Importar **este repo** na Vercel com *Root Directory* `./` (o default). Depois
disso, publicar Ã© `git push` â€” o webhook faz o resto.

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