import { useEffect } from 'react'
import { Provider } from 'react-redux'
import toast, { Toaster } from 'react-hot-toast'
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

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL
axios.defaults.headers['x-api-key'] = process.env.NEXT_PUBLIC_API_KEY

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

  const fetchStats = async () => {
    try {
      await axios.get('/stats')
    } catch (error) {
      if (error.status === 401) {
        router.push('/')
        toast.error('You are not authorized!')
      }
    }
  }

  useEffect(() => {
    if (
      axios.defaults.baseURL &&
      isAuthenticated &&
      axios.defaults.headers.common['Authorization'] &&
      path?.startsWith('/admin') &&
      !path?.startsWith('/admin/auth')
    ) {
      fetchStats()
    }
  }, [
    axios.defaults.baseURL,
    isAuthenticated,
    axios.defaults.headers.common['Authorization'],
    path,
  ])

  useEffect(() => {
    if (
      !isAuthenticated &&
      path?.startsWith('/admin') &&
      !path?.startsWith('/admin/auth') &&
      !loading?.user &&
      !(
        localStorage.getItem('userToken') || sessionStorage.getItem('userToken')
      )
    ) {
      router.push('/admin/auth/login')
    }

    if (path === '/admin/auth') router.push('/admin/auth/login')

    if (path === '/admin') router.push('/admin/dashboard')
  }, [path, isAuthenticated, loading?.user])

  return (
    <div className='min-h-screen flex flex-col'>
      {path?.startsWith('/admin') ? null : <Navbar />}
      <div className='overflow-hidden flex-1 bg-gradient-to-b max-w-[100vw] from-[#f9f9f9] from-0% to-white to-20%'>
        {path?.startsWith('/profile') ? (
          !loading.user &&
          isAuthenticated && (
            <div className='w-full lg:max-w-7xl mx-auto py-10 px-7 md:pt-16 flex flex-col md:flex-row md:items-start gap-8 md:gap-16'>
              <SideBar />
              <div className='w-full md:w-[calc(100%-288px-64px)]'>
                <Component {...pageProps} />
              </div>
            </div>
          )
        ) : path?.startsWith('/admin') && !path?.startsWith('/admin/auth') ? (
          !loading?.user && (
            <div className='flex flex-col md:flex-row w-[100vw]'>
              <AdminSidebar />
              <div className='flex-1 md:max-w-[calc(100vw-288px-12px)]'>
                <Component {...pageProps} />
              </div>
            </div>
          )
        ) : (
          <Component {...pageProps} />
        )}
      </div>
      {!(path?.startsWith('/auth') || path?.startsWith('/admin')) && <Footer />}
    </div>
  )
}
