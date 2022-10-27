import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html lang="en">
        <Head>
            {/* bootstrap 5.2 */}
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" integrity="sha256-IUOUHAPazai08QFs7W4MbzTlwEWFo7z/4zw8YmxEiko=" crossOrigin="anonymous" />
            {/* fontawesome reference */}
            <script src="https://kit.fontawesome.com/b2b606ab07.js" crossOrigin="anonymous"></script>
            {/* jquery 3.6.1 */}
            <script src="https://code.jquery.com/jquery-3.6.1.min.js" integrity="sha256-o88AwQnZB+VDvE9tvIXrMQaPlFFSUTR+nldQm1LuPXQ=" crossOrigin="anonymous"></script>
        </Head>
        <body>
            <Main />
            <NextScript />
            {/* bootstrap 5.2 js */}
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.min.js" integrity="sha256-h1OMS35Ij1pJ0S+Y1qBK/GHQDyankPMZVpeZrNQ062U=" crossOrigin="anonymous"></script>
        </body>
        </Html>
    )
}
