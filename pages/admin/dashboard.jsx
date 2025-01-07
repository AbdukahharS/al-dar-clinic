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

const Dashboard = () => {
  const router = useRouter()

  const data = [
    { name: 'Users', value: 45, icon: FaUser },
    { name: 'Appointments', value: 21, icon: FaCalendarCheck },
    { name: 'Orders', value: 12, icon: FaBagShopping },
    { name: 'Rental Orders', value: 16, icon: FaHourglassHalf },
    { name: 'Products', value: 23, icon: FaBox },
  ]
  const appointments = [
    { name: 'Doctors Consultation', value: 67 },
    { name: 'Counseling', value: 33 },
    { name: 'Pyhsiotherapy', value: 45 },
  ]
  const orders = [
    { name: 'Pending', value: 67 },
    { name: 'Delivered', value: 86 },
    { name: 'Cancelled', value: 45 },
  ]
  const rentals = [
    { name: 'Pending', value: 12 },
    { name: 'On Rent', value: 65 },
    { name: 'Returned', value: 3 },
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
      : outerRadius / 2
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)

    return (
      <text
        x={x}
        y={y}
        fill='white'
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline='central'
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    )
  }
  return (
    <div>
      <div className='bg-primary text-white px-8 md:px-20 py-8 flex justify-between items-center'>
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
                <p className='text-2xl font-semibold'>{el.value}</p>
              </div>
            </div>
          ))}
        </div>
        <div className='flex flex-col md:flex-row mt-9 gap-6 items-center'>
          <div className='flex-1 bg-gray-50 shadow-lg p-2 rounded-lg'>
            <h3 className='m-2'>Appointment Chart</h3>
            <ResponsiveContainer width='100%' height={200}>
              <PieChart width={190} height={190}>
                <Pie
                  data={appointments}
                  cx='50%'
                  cy='50%'
                  labelLine={false}
                  outerRadius={100}
                  dataKey='value'
                  label={renderCustomizedLabel}
                >
                  {appointments.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={`rgba(47, 136, 147, ${
                        index / appointments.length + 0.5
                      })`}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className='flex justify-center gap-4 my-5 flex-wrap'>
              {appointments.map((el, i) => (
                <div key={i} className='flex gap-2 items-center'>
                  <div
                    className={`w-4 h-4 rounded-sm `}
                    style={{
                      backgroundColor: `rgba(47, 136, 147, ${
                        i / appointments.length + 0.5
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
          <div className='flex-1 bg-gray-50 shadow-lg p-2 rounded-lg'>
            <h3 className='m-2'>Orders Chart</h3>
            <ResponsiveContainer width='100%' height={200}>
              <PieChart width={190} height={190}>
                <Pie
                  data={orders}
                  cx='50%'
                  cy='50%'
                  labelLine={false}
                  outerRadius={100}
                  innerRadius={50}
                  dataKey='value'
                  label={renderCustomizedLabel}
                >
                  {orders.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={`rgba(47, 136, 147, ${
                        index / orders.length + 0.5
                      })`}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className='flex justify-center gap-4 my-5 flex-wrap'>
              {orders.map((el, i) => (
                <div key={i} className='flex gap-2 items-center'>
                  <div
                    className={`w-4 h-4 rounded-sm `}
                    style={{
                      backgroundColor: `rgba(47, 136, 147, ${
                        i / orders.length + 0.5
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
          <div className='flex-1 bg-gray-50 shadow-lg p-2 rounded-lg'>
            <h3 className='m-2'>Rental Orders Chart</h3>
            <ResponsiveContainer width='100%' height={200}>
              <PieChart width={190} height={190}>
                <Pie
                  data={rentals}
                  cx='50%'
                  cy='50%'
                  labelLine={false}
                  outerRadius={100}
                  innerRadius={50}
                  dataKey='value'
                  label={renderCustomizedLabel}
                >
                  {rentals.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={`rgba(47, 136, 147, ${
                        index / rentals.length + 0.5
                      })`}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className='flex justify-center gap-4 my-5 flex-wrap'>
              {rentals.map((el, i) => (
                <div key={i} className='flex gap-2 items-center'>
                  <div
                    className={`w-4 h-4 rounded-sm `}
                    style={{
                      backgroundColor: `rgba(47, 136, 147, ${
                        i / rentals.length + 0.5
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
        </div>
      </div>
    </div>
  )
}

export default Dashboard
