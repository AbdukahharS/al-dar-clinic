import { Provider } from 'react-redux'

import store from '../redux/store'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import '@/styles/globals.css'
import '@/styles/fonts.css'
import '@/styles/custom-carousel.css'

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </Provider>
  )
}
