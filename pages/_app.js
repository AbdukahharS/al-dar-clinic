import { Provider } from 'react-redux'
import { Toaster } from 'react-hot-toast'
import { usePathname } from 'next/navigation'

import store from '../redux/store'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import '@/styles/globals.css'
import '@/styles/fonts.css'
import SideBar from '@/components/SideBar'

export default function App({ Component, pageProps }) {
  const path = usePathname()

  return (
    <Provider store={store}>
      <Toaster />
      <div className='min-h-screen flex flex-col'>
        {!path?.startsWith('/admin') && <Navbar />}
        <div className='overflow-hidden flex-1 bg-gradient-to-b from-[#f9f9f9] from-0% to-white to-20%'>
          {path?.startsWith('/profile') ? (
            <div className='w-full max-w-7xl mx-auto py-10 px-7 md:pt-16 flex flex-col md:flex-row md:items-start gap-8 md:gap-16'>
              <SideBar />
              <div className='flex-1'>
                <Component {...pageProps} />
              </div>
            </div>
          ) : (
            <Component {...pageProps} />
          )}
        </div>
        {!path?.startsWith('/auth') && !path?.startsWith('/admin') && (
          <Footer />
        )}
      </div>
    </Provider>
  )
}
