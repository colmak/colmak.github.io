import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        <meta property="og:image" content="/images/background.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
      </Head>
      <body className="bg-ebony-clay-950">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
