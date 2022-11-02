import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

export default function Document() {
    return (
        <Html lang="en">
        <Head>
            {/* bootstrap 5.2 */}
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" integrity="sha256-IUOUHAPazai08QFs7W4MbzTlwEWFo7z/4zw8YmxEiko=" crossOrigin="anonymous" />
            {/* fontawesome reference */}
            <Script src="https://kit.fontawesome.com/b2b606ab07.js" crossOrigin="anonymous"></Script>
            {/* jquery 3.6.1 */}
            <Script src="https://code.jquery.com/jquery-3.6.1.min.js" integrity="sha256-o88AwQnZB+VDvE9tvIXrMQaPlFFSUTR+nldQm1LuPXQ=" crossOrigin="anonymous"></Script>
        </Head>
        <body>
            <Main />
            <NextScript />
            {/* bootstrap 5.2 js */}
            <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.min.js" integrity="sha256-h1OMS35Ij1pJ0S+Y1qBK/GHQDyankPMZVpeZrNQ062U=" crossOrigin="anonymous"></Script>
        </body>
        </Html>
    )
}
