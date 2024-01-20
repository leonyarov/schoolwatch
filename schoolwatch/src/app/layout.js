import Link from "next/link";
import 'bootstrap/dist/css/bootstrap.css'
import { BootstrapClient } from "./components/BootstrapClient"
import SessionProvider from "./components/SessionProvider"
import { getServerSession } from "next-auth"

export default async function RootLayout(props) {
  const session = await getServerSession()

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossOrigin="anonymous"></script>
      </head>
      <body>
        <SessionProvider session={session}>

          {props.children}
        </SessionProvider>

        <BootstrapClient />
      </body>
    </html>
  )
}

