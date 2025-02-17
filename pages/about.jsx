import { useState } from 'react'
import Image from 'next/image'
import { FaPhoneVolume, FaRegEnvelope } from 'react-icons/fa6'
import { motion } from 'framer-motion'

import ADR from '@/public/images/ADR.webp'
import dubai from '@/public/images/dubai.webp'
import dubai1 from '@/public/images/dubai-1.webp'
import dubai2 from '@/public/images/dubai-2.webp'
import dubai3 from '@/public/images/dubai-3.webp'
import dubai4 from '@/public/images/dubai-4.webp'
import oman from '@/public/images/oman.webp'
import oman1 from '@/public/images/oman-1.webp'
import oman2 from '@/public/images/oman-2.webp'
import oman3 from '@/public/images/oman-3.webp'
import oman4 from '@/public/images/oman-4.webp'
import iraq from '@/public/images/iraq.webp'
import iraq1 from '@/public/images/iraq-1.webp'
import iraq2 from '@/public/images/iraq-2.webp'
import iraq3 from '@/public/images/iraq-3.webp'
import iraq4 from '@/public/images/iraq-4.webp'
import Button from '@/components/Button'
import Animated from '@/components/Animated'

const variants = {
  open: {
    height: 'auto',
    transition: { stiffness: 20 },
  },
  closed: {
    height: 400,
    transition: { stiffness: 20 },
  },
}

const About = () => {
  const [isDubaiOpen, setIsDubaiOpen] = useState(false)
  const [isOmanOpen, setIsOmanOpen] = useState(false)
  const [isIraqOpen, setIsIraqOpen] = useState(false)

  const tags = ['Counseling', 'Spine', 'Geriatric', 'Pain', 'Neuro', 'Physio']

  return (
    <div className='py-10'>
      <Animated
        animationType='fadeInLeft'
        className='flex flex-row items-center gap-12 w-full max-w-7xl mx-auto px-7'
      >
        <h2 className='font-medium text-2xl md:text-4xl'>ABOUT US</h2>
        <div className='bg-primary h-[1px] md:flex-1'></div>
      </Animated>
      <div className=' w-full max-w-7xl mx-auto px-7 mt-7 text-lg md:text-2xl opacity-80 flex flex-col gap-6'>
        <Animated>Welcome to Our Rehabilitation Physiotherapy Clinic</Animated>
        <Animated>
          At our state-of-the-art rehabilitation physiotherapy clinic, we are
          dedicated to providing comprehensive care and personalized treatment
          plans to help you regain optimal physical function and improve your
          quality of life. Our team of experienced physiotherapists utilizes
          evidence-based practices and cutting-edge technology to address a wide
          range of conditions and injuries.
        </Animated>
        <Animated>Our Approach</Animated>
        <Animated>
          We employ a holistic approach to physiotherapy, combining manual
          therapy techniques, exercise prescription, and patient education. Our
          treatments may include:
        </Animated>
        <Animated animationType='fadeInRight'>
          <ul className='list-disc px-6'>
            <li> Manual Therapy and Joint Mobilization</li>
            <li>Therapeutic Exercises and Stretching Programs</li>
            <li>Electrotherapy and Ultrasound Treatments</li>
            <li>Gait Analysis and Correction</li>
            <li> Postural Assessment and Correction</li>
            <li>Ergonomic Advice and Workplace Assessments</li>
          </ul>
        </Animated>
        <Animated>State-of-the-Art Equipment</Animated>
        <Animated>
          Our clinic is equipped with advanced rehabilitation technology to
          enhance your treatment experience:
        </Animated>
        <Animated animationType='fadeInLeft'>
          <ul className='list-disc px-6'>
            <li>Resistance Training Equipment</li>
            <li>Cardiovascular Machines</li>
            <li>Balance and Proprioception Tools</li>
            <li>Electrotherapy Devices</li>
            <li>Ultrasound Machines</li>
            <li>Specialized Rehabilitation Equipment</li>
          </ul>
        </Animated>
        <Animated>Products Available</Animated>
        <Animated>
          To support your rehabilitation journey, we offer a range of
          high-quality products:
        </Animated>
        <Animated animationType='fadeInRight'>
          <ul className='list-disc px-6'>
            <li>Therapeutic Exercise Bands and Balls</li>
            <li>Orthopedic Supports and Braces</li>
            <li>Hot and Cold Therapy Packs</li>
            <li>Posture Correction Devices</li>
            <li>Ergonomic Aids for Home and Work</li>
          </ul>
        </Animated>
        <Animated>
          Experience the difference of personalized, expert care at our
          rehabilitation physiotherapy clinic. Contact us today to schedule your
          assessment and take the first step towards improved health and
          mobility.
        </Animated>
      </div>
      <div className='mt-20 flex flex-col md:flex-row items-stretch gap-20 w-full max-w-7xl mx-auto md:px-7'>
        <Animated className='flex items-center justify-center px-7 md:px-0'>
          <Image src={ADR} alt='ADR' loading='lazy' width={470} />
        </Animated>
        <div className='w-full md:w-[1px] h-[1px] md:h-auto bg-primary'></div>
        <Animated
          animationType='fadeInRight'
          className='flex gap-3 md:gap-4 flex-wrap items-center mx-7 md:mx-0'
        >
          {tags.map((tag, ind) => (
            <span
              key={ind}
              className={`py-[6px] text-xs md:text-xl px-4 md:px-7 text-white rounded-full ${
                ind % 2 === 0 ? 'bg-primary' : 'bg-secondary'
              }`}
            >
              {tag}
            </span>
          ))}
        </Animated>
      </div>
      <Animated
        animationType='fadeInLeft'
        className='flex flex-row items-center gap-12 w-full max-w-7xl mx-auto px-7 mt-16'
      >
        <h2 className='font-medium text-2xl md:text-4xl'>FACILITIES</h2>
        <div className='bg-primary h-[1px] md:flex-1'></div>
      </Animated>
      <div className=' w-full max-w-7xl mx-auto px-7 mt-16'>
        <div className='flex flex-col md:flex-row gap-16'>
          <Animated className='w-full md:w-[70%] h-[280px] relative'>
            <Image
              src={dubai}
              alt='Dubai branch'
              loading='lazy'
              fill
              className='rounded-2xl object-cover'
            />
          </Animated>
          <Animated animationType='fadeInRight' className='flex-1'>
            <h5 className='text-lg font-bold leading-7 mb-1'>Dubai</h5>
            <div className='h-[1px] bg-primary w-full'></div>
            <p className='mt-4 text-sm'>
              <FaPhoneVolume className='mr-2 text-base inline' />
              00971 56 776 1277
            </p>
            <p className='mt-4 text-sm'>
              <FaRegEnvelope className='mr-2 text-base inline' />
              info@aldarinternational.com
            </p>
          </Animated>
        </div>
        <motion.div
          initial='closed'
          animate={isDubaiOpen ? 'open' : 'closed'}
          variants={variants}
          className='flex flex-wrap md:flex-nowrap gap-5 justify-center items-center mt-10 py-10 overflow-hidden'
        >
          {[dubai1, dubai2, dubai3, dubai4].map((img, i) => (
            <div key={i} className='w-full md:w-[23%] h-[277px] relative flex'>
              <Image
                src={img}
                alt={`Dubai facility ${i + 1}`}
                loading='lazy'
                fill
                className='object-cover rounded-2xl'
              />
            </div>
          ))}
        </motion.div>

        <Button
          onClick={() => setIsDubaiOpen(!isDubaiOpen)}
          size='lg'
          className='md:hidden mx-auto block mt-9'
        >
          Show {isDubaiOpen ? 'Less' : 'More'}
        </Button>
        <div className='w-full h-[1px] bg-primary mt-10'></div>
      </div>
      <div className=' w-full max-w-7xl mx-auto px-7 mt-16'>
        <div className='flex flex-col md:flex-row gap-16'>
          <Animated className='w-full md:w-[70%] h-[280px] relative'>
            <Image
              src={oman}
              alt='Oman branch'
              loading='lazy'
              fill
              className='rounded-2xl object-cover'
            />
          </Animated>
          <Animated animationType='fadeInRight' className='flex-1'>
            <h5 className='text-lg font-bold leading-7 mb-1'>Oman</h5>
            <div className='h-[1px] bg-primary w-full'></div>
            <p className='mt-4 text-sm'>
              <FaPhoneVolume className='mr-2 text-base inline' />
              +968 9199 2031, +968 7175 7380
            </p>
            <p className='mt-4 text-sm'>
              <FaRegEnvelope className='mr-2 text-base inline' />
              info@aldarinternational.com
            </p>
          </Animated>
        </div>
        <motion.div
          initial='closed'
          animate={isOmanOpen ? 'open' : 'closed'}
          variants={variants}
          className='flex flex-wrap md:flex-nowrap gap-5 justify-center items-center mt-10 py-10 overflow-hidden'
        >
          {[oman1, oman2, oman3, oman4].map((img, i) => (
            <div key={i} className='w-full md:w-[23%] h-[277px] relative flex'>
              <Image
                src={img}
                alt={`Oman facility ${i + 1}`}
                loading='lazy'
                fill
                className='object-cover rounded-2xl'
              />
            </div>
          ))}
        </motion.div>

        <Button
          onClick={() => setIsOmanOpen(!isOmanOpen)}
          size='lg'
          className='md:hidden block mx-auto mt-8'
        >
          Show {isOmanOpen ? 'Less' : 'More'}
        </Button>
        <div className='w-full h-[1px] bg-primary mt-10'></div>
      </div>
      <div className=' w-full max-w-7xl mx-auto px-7 mt-16'>
        <div className='flex flex-col md:flex-row gap-16'>
          <Animated className='w-full md:w-[70%] h-[280px] relative'>
            <Image
              src={iraq}
              alt='Iraq branch'
              loading='lazy'
              fill
              className='rounded-2xl object-cover'
            />
          </Animated>
          <Animated animationType='fadeInRight' className='flex-1'>
            <h5 className='text-lg font-bold leading-7 mb-1'>Iraq</h5>
            <div className='h-[1px] bg-primary w-full'></div>
            <p className='mt-4 text-sm'>
              <FaPhoneVolume className='mr-2 text-base inline' />
              00964 775 776 6919
            </p>
            <p className='mt-4 text-sm'>
              <FaRegEnvelope className='mr-2 text-base inline' />
              info@aldarinternational.com
            </p>
          </Animated>
        </div>
        <motion.div
          initial='closed'
          animate={isIraqOpen ? 'open' : 'closed'}
          variants={variants}
          className='flex flex-wrap md:flex-nowrap gap-5 justify-center items-center py-10 overflow-hidden'
        >
          {[iraq1, iraq2, iraq3, iraq4].map((img, i) => (
            <div key={i} className='w-full md:w-[23%] h-[277px] relative flex'>
              <Image
                src={img}
                alt={`Iraq facility ${i + 1}`}
                loading='lazy'
                fill
                className='object-cover rounded-2xl'
              />
            </div>
          ))}
        </motion.div>

        <Button
          onClick={() => setIsIraqOpen(!isIraqOpen)}
          size='lg'
          className='md:hidden block mx-auto mt-8'
        >
          Show {isIraqOpen ? 'Less' : 'More'}
        </Button>
      </div>
    </div>
  )
}

export default About
