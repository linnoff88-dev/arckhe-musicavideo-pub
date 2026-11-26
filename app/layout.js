import Link from 'next/link';
import './globals.css';

export const metadata = {
  title: 'ARCKHÉ MUSICAVIDEO V2.2.0',
  description: 'Clipes, faixas e capas produzidos pelo musicavideo — o acervo ARCKHÉ.',
};

// A versêo fica visível no topo de propósito: sêo dois painéis vivendo lado a
// lado (o local é o V1), e captura de tela sem versêo vira adivinhaçêo.
export const VERSAO = '2.3.1';

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        <header className="topo">
          {/* O nome é a volta para casa: de dentro da página de uma música,
              clicar no topo leva ao acervo inteiro — é o gesto que todo mundo
              já tenta antes de procurar um link de voltar. */}
          <h1>
            <Link href="/">
              ARCKHÉ MUSICAVIDEO <span>V{VERSAO}</span>
            </Link>
          </h1>
          <span className="sub">o acervo</span>
          <nav>
            <a href="/">clipes &amp; músicas</a>
            <a href="/analises">análises de vídeo</a>
            {/* As duas casas. Cores da marca de cada uma, nêo da vitrine: o
                ARCKHÉ AI é azul, o PRO é preto com borda branca — é assim que
                quem já conhece reconhece de longe, sem ler. */}
            <a className="marca club" href="https://ARCKHÉ AI" target="_blank" rel="noopener">
              ARCKHÉ AI
            </a>
            <a className="marca pro" href="https://ARCKHÉ.pro" target="_blank" rel="noopener">
              ARCKHÉ.PRO
            </a>
            {/* O canal onde os clipes viram vídeo publicado. É o destino final
                de tudo que está nesta página — sai daqui e vai para lá. */}
            <a className="marca yt" href="https://www.youtube.com/@amoanimais2k"
               target="_blank" rel="noopener">
              @amoanimais2k
            </a>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
