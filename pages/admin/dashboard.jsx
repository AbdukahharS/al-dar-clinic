'use client'

import {
  FaRotateRight,
  FaUser,
  FaCalendarCheck,
  FaBox,
  FaBagShopping,
  FaHourglassHalf,
} from 'react-icons/fa6'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'

import Button from '@/components/Button'
import axios from 'axios'
import { useEffect, useState } from 'react'
import useAuth from '@/hooks/useAuth'

const transformData = (data) => {
  const result = { total: {} }

  for (let category in data) {
    result.total[category] = data[category]['Total']
    result[category] = Object.entries(data[category])
      .map(([name, value]) => ({
        name: name,
        value: (value / data[category]['Total']) * 100,
      }))
      .filter((el) => el.name !== 'Total')
  }

  return result
}

const Dashboard = () => {
  const router = useRouter()
  const [stats, setStats] = useState({})
  const [charts, setCharts] = useState({})
  const { isAuthenticated } = useAuth()

  const data = [
    { name: 'Users', value: 'users', icon: FaUser },
    { name: 'Appointments', value: 'appointments', icon: FaCalendarCheck },
    { name: 'Orders', value: 'orders', icon: FaBagShopping },
    { name: 'Rental Orders', value: 'rentOrders', icon: FaHourglassHalf },
    { name: 'Products', value: 'products', icon: FaBox },
  ]

  const RADIAN = Math.PI / 180
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    const radius = innerRadius
      ? innerRadius + (outerRadius - innerRadius) * 0.3
      : outerRadius + 35
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)

    return (
      <text x={x} y={y} textAnchor='middle' dominantBaseline='central'>
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    )
  }

  const fetchStats = async () => {
    try {
      const res = await axios.get('/stats')

      setStats(res.data)
    } catch (error) {
      console.log(error)
    }
  }
  const fetchCharts = async () => {
    try {
      const res = await axios.get('/stats/chart')

      setCharts(transformData(res.data))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (
      axios.defaults.baseURL &&
      axios.defaults.headers.common['Authorization'] &&
      isAuthenticated
    ) {
      fetchStats()
      fetchCharts()
    }
  }, [
    axios.defaults.baseURL,
    axios.defaults.headers.common['Authorization'],
    isAuthenticated,
  ])
  return (
    <div>
      <div className='h-[96px]'></div>

      {/* Fixed header */}
      <div className='bg-primary text-white px-8 md:px-20 py-8 flex justify-between items-center fixed top-[155px] md:top-0 w-full md:w-[calc(100%-288px)] z-10 right-0'>
        <h1 className='text-2xl font-medium'>Dashboard</h1>
        <Button
          className='bg-white !text-primary rounded-lg flex items-center flex-row gap-2'
          onClick={() => router.refresh()}
        >
          <FaRotateRight />
          Refresh
        </Button>
      </div>
      <div className='px-8 xl:px-20 py-7 md:py-16'>
        <div className='flex flex-col md:flex-row gap-5'>
          {data.map((el, i) => (
            <div
              key={i}
              className='bg-slate-50 border-l-4 border-primary rounded-xl py-5 flex-1 shadow-lg flex flex-row justify-center items-center gap-4'
            >
              <el.icon className='text-2xl lg:text-4xl' />
              <div>
                <p>{el.name}</p>
                <p className='text-2xl font-semibold'>{stats[el.value]}</p>
              </div>
            </div>
          ))}
        </div>
        <div className='flex flex-col md:flex-row mt-9 gap-6 items-center'>
          {charts.total?.appointments ? (
            <div className='flex-1 bg-gray-50 shadow-lg p-2 rounded-lg'>
              <h3 className='m-2'>Appointment Chart</h3>
              <ResponsiveContainer width='100%' height={280}>
                <PieChart width={190} height={190}>
                  <Pie
                    data={charts.appointments}
                    cx='50%'
                    cy='50%'
                    labelLine
                    outerRadius={100}
                    dataKey='value'
                    label={renderCustomizedLabel}
                  >
                    {charts.appointments?.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={`rgba(47, 136, 147, ${
                          index / charts.appointments?.length + 0.5
                        })`}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className='flex justify-center gap-4 my-5 flex-wrap'>
                {charts.appointments?.map((el, i) => (
                  <div key={i} className='flex gap-1 items-center'>
                    <div
                      className={`w-4 h-4 rounded-sm `}
                      style={{
                        backgroundColor: `rgba(47, 136, 147, ${
                          i / charts.appointments.length + 0.5
                        })`,
                      }}
                    ></div>
                    -<p>{el.name}</p>
                  </div>
                ))}
              </div>
              <Link href='/admin/appointments'>
                <Button className='w-full rounded-sm'>View Appointments</Button>
              </Link>
            </div>
          ) : (
            ''
          )}
          {charts.total?.orders ? (
            <div className='flex-1 bg-gray-50 shadow-lg p-2 rounded-lg'>
              <h3 className='m-2'>Orders Chart</h3>
              <ResponsiveContainer width='100%' height={280}>
                <PieChart width={190} height={190}>
                  <Pie
                    data={charts.orders}
                    cx='50%'
                    cy='50%'
                    labelLine
                    outerRadius={100}
                    // innerRadius={50}
                    dataKey='value'
                    label={renderCustomizedLabel}
                  >
                    {charts.orders?.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={`rgba(47, 136, 147, ${
                          index / charts.orders.length + 0.5
                        })`}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className='flex justify-center gap-4 my-5 flex-wrap'>
                {charts.orders.map((el, i) => (
                  <div key={i} className='flex gap-1 items-center'>
                    <div
                      className={`w-4 h-4 rounded-sm `}
                      style={{
                        backgroundColor: `rgba(47, 136, 147, ${
                          i / charts.orders.length + 0.5
                        })`,
                      }}
                    ></div>
                    -<p>{el.name}</p>
                  </div>
                ))}
              </div>
              <Link href='/admin/orders'>
                <Button className='w-full rounded-sm'>View Orders</Button>
              </Link>
            </div>
          ) : (
            ''
          )}
          {charts.total?.rentOrders ? (
            <div className='flex-1 bg-gray-50 shadow-lg p-2 rounded-lg'>
              <h3 className='m-2'>Rental Orders Chart</h3>
              <ResponsiveContainer width='100%' height={280}>
                <PieChart width={200} height={200}>
                  <Pie
                    data={charts.rentOrders}
                    cx='50%'
                    cy='50%'
                    labelLine
                    outerRadius={100}
                    dataKey='value'
                    label={renderCustomizedLabel}
                  >
                    {charts.rentOrders?.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={`rgba(47, 136, 147, ${
                          index / charts.rentOrders.length + 0.5
                        })`}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className='flex justify-center gap-4 my-5 flex-wrap'>
                {charts.rentOrders?.map((el, i) => (
                  <div key={i} className='flex gap-1 items-center'>
                    <div
                      className={`w-4 h-4 rounded-sm `}
                      style={{
                        backgroundColor: `rgba(47, 136, 147, ${
                          i / charts.rentOrders?.length + 0.5
                        })`,
                      }}
                    ></div>
                    -<p>{el.name}</p>
                  </div>
                ))}
              </div>
              <Link href='/admin/rentals'>
                <Button className='w-full rounded-sm'>View Rent Orders</Button>
              </Link>
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
