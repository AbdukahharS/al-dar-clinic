import { useEffect } from 'react'
import { Provider } from 'react-redux'
import { Toaster } from 'react-hot-toast'
import { usePathname, useRouter } from 'next/navigation'
import axios from 'axios'

import store from '../redux/store'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import '@/styles/globals.css'
import '@/styles/fonts.css'
import SideBar from '@/components/SideBar'
import useAuth from '@/hooks/useAuth'
import AdminSidebar from '@/components/layout/AdminSidebar'

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Toaster />
      <Layout Component={Component} pageProps={pageProps} />
    </Provider>
  )
}

const Layout = ({ Component, pageProps }) => {
  const path = usePathname()
  const { isAuthenticated, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_API_URL) {
      axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL
      axios.defaults.headers['x-api-key'] = process.env.NEXT_PUBLIC_API_KEY
    }
  }, [])

  useEffect(() => {
    if (
      !isAuthenticated &&
      path?.startsWith('/admin') &&
      !path?.startsWith('/admin/auth')
    ) {
      router.push('/admin/auth/login')
    }

    if (path === '/admin/auth') router.push('/admin/auth/login')

    if (path === '/admin') router.push('/admin/dashboard')
  }, [path, isAuthenticated])

  return (
    <div className='min-h-screen flex flex-col'>
      {path?.startsWith('/admin') ? null : <Navbar />}
      <div className='overflow-hidden flex-1 bg-gradient-to-b from-[#f9f9f9] from-0% to-white to-20%'>
        {path?.startsWith('/profile') ? (
          !loading.user &&
          isAuthenticated && (
            <div className='w-full max-w-7xl mx-auto py-10 px-7 md:pt-16 flex flex-col md:flex-row md:items-start gap-8 md:gap-16'>
              <SideBar />
              <div className='flex-1'>
                <Component {...pageProps} />
              </div>
            </div>
          )
        ) : path?.startsWith('/admin') && !path?.startsWith('/admin/auth') ? (
          <div className='w-full flex flex-col md:flex-row'>
            <AdminSidebar />
            <div className='flex-1'>
              <Component {...pageProps} />
            </div>
          </div>
        ) : (
          <Component {...pageProps} />
        )}
      </div>
      {!(path?.startsWith('/auth') || path?.startsWith('/admin')) && <Footer />}
    </div>
  )
}
