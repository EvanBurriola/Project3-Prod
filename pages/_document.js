import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html lang="en">
        <Head>
            {/* bootstrap 5.2 */}
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" integrity="sha256-IUOUHAPazai08QFs7W4MbzTlwEWFo7z/4zw8YmxEiko=" crossOrigin="anonymous" />
        </Head>
        <body>
            <Main />
            <NextScript />
        </body>
        </Html>
    )
}
