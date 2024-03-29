import Head from "next/head"

export default function Unauthorized() {
    const style = {
        backgroundColor: "#000",
    }

    return (
        <>
            <Head>
                <title>Unauthorized Request</title>
            </Head>
            <div style={style} className={`d-flex w-100 h-100 justify-content-center align-items-center`}>
                <h1 className="next-error-h1">unauthorized</h1>
            </div>
        </>
    )
}
Unauthorized.noAuthRequired = true