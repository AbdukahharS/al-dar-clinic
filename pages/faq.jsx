import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FaPlus, FaMinus } from 'react-icons/fa6'
import { Poppins } from 'next/font/google'

import Animated from '@/components/Animated'
import data from './_faqdata'

const poppins = Poppins({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  display: 'swap',
})

const FAQ = () => {
  const [opened, setOpened] = useState([])

  const handleClick = (i) => {
    if (opened.includes(i)) {
      setOpened(opened.filter((el) => el !== i))
    } else {
      setOpened([...opened, i])
    }
  }

  return (
    <div className='py-10 w-full max-w-7xl mx-auto px-7'>
      <Animated
        animationType='fadeInLeft'
        className='flex flex-row items-center gap-12'
      >
        <h1 className='font-medium text-2xl md:text-4xl'>FAQ</h1>
        <div className='bg-primary h-[1px] md:flex-1'></div>
      </Animated>
      <Animated className={'mt-11 md:mt-16'}>
        {data.map((item, i) => (
          <div key={i}>
            <div
              onClick={() => handleClick(i)}
              className={`flex flex-row items-center cursor-pointer justify-between border px-3 py-4 md:px-14 md:py-5 text-lg md:text-2xl text-gray-700 font-semibold ${
                poppins.className
              } ${i === 0 && 'md:rounded-t-2xl'}`}
            >
              <h2>{item.question}</h2>
              <div className='text-3xl text-gray-500'>
                {opened?.includes(i) ? <FaMinus /> : <FaPlus />}
              </div>
            </div>
            <motion.div
              initial={{ height: 0 }}
              animate={opened?.includes(i) ? { height: 'auto' } : {}}
              transition={{ duration: 0.3 }}
              className={`overflow-hidden border-x border-black`}
            >
              <div
                className={`px-3 py-8 md:px-14 md:py-5 md:text-2xl text-gray-600 md:!leading-10 tracking-wide border-black ${
                  i === data.length - 1 ? 'border-b' : ''
                }`}
              >
                {item.answer.split('\n').map((line, index) => (
                  <React.Fragment key={index}>
                    {line}
                    <br />
                  </React.Fragment>
                ))}
              </div>
            </motion.div>
          </div>
        ))}
      </Animated>
    </div>
  )
}

export default FAQ
