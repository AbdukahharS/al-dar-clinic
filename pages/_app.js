import { Provider } from 'react-redux'
import { Toaster } from 'react-hot-toast'
import { usePathname } from 'next/navigation'

import store from '../redux/store'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import '@/styles/globals.css'
import '@/styles/fonts.css'

export default function App({ Component, pageProps }) {
  const path = usePathname()

  return (
    <Provider store={store}>
      <Toaster />
      <div className='min-h-screen flex flex-col'>
        <Navbar />
        <div className='overflow-hidden flex-1 bg-gradient-to-b from-[#f9f9f9] from-0% to-white to-20%'>
          <Component {...pageProps} />
        </div>
        {path?.split('/')[1] !== 'auth' && <Footer />}
      </div>
    </Provider>
  )
}
