import '@/styles/main.css'
import Head from 'next/head'
import store from '@/store'
import { Provider } from 'react-redux'

const POSApp = ({ Component, pageProps }) => {
    return (
        <Provider store={store}>
            <Head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <Component {...pageProps} />
        </Provider>
    )
}

export default POSApp
