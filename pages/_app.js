import '@/styles/main.css'
import Head from 'next/head'

const POSApp = ({ Component, pageProps }) => {
    return (
        <>
            <Head>
                <meta charset="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <Component {...pageProps} />
        </>
    )
}

export default POSApp
