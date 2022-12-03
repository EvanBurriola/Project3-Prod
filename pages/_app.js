import '@/styles/main.css'
import Head from 'next/head'
import Script from 'next/script'
import store from '@/store'
import { Provider } from 'react-redux'
import { SessionProvider, useSession } from "next-auth/react"
import {useRouter} from 'next/router'


const POSApp = ({ Component, pageProps: { session, ...pageProps} }) => {
    return (
        <SessionProvider>
            <Provider store={store}>
                {/* fontawesome reference */}
                <Script src="https://kit.fontawesome.com/b2b606ab07.js" crossOrigin="anonymous"></Script>
                {/* jquery 3.6.1 */}
                <Script src="https://code.jquery.com/jquery-3.6.1.min.js" integrity="sha256-o88AwQnZB+VDvE9tvIXrMQaPlFFSUTR+nldQm1LuPXQ=" crossOrigin="anonymous"></Script>
                <Head>
                    <meta charSet="utf-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                </Head>
                {Component.noAuthRequired ? (
                    <Component {...pageProps} />
                ) : (                
                    <Auth>
                        <Component {...pageProps} />
                    </Auth>
                )}

                {/* bootstrap 5.2 js */}
                <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.min.js" integrity="sha256-h1OMS35Ij1pJ0S+Y1qBK/GHQDyankPMZVpeZrNQ062U=" crossOrigin="anonymous"></Script>
            </Provider>
        </SessionProvider>
    )
}
export default POSApp

function Auth({children}){
    const router = useRouter()
    const {status} = useSession({
        required: true,
        onUnauthenticated(){
            router.push('/login')
        },
    })

    if(status === "loading"){
        return <div>Loading...</div>
    }
    return children
}