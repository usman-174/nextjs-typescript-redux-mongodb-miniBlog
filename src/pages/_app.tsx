import Axios from "axios"
import { AppProps } from "next/app"
import { Provider as ReduxProvider } from "react-redux"
import "../styles/globals.css"
// import { Provider } from 'next-auth/client'
import { store } from "../redux/index"
const fetcher = async (url: string) => {
  try {
    const { data } = await Axios.get(url)
    return data
  } catch (error) {
    throw error.response.data
  }
}

function App({ Component, pageProps }: AppProps) {
  return (
    // <Provider  session={pageProps.session}>
    <ReduxProvider store={store}>
      <Component {...pageProps} />
    </ReduxProvider>
    //  </Provider> 
  )
}

export default App
