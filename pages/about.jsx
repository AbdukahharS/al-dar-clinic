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

  const tags = ['Counseling', 'Spine', 'Geriatric', 'Pain', 'Neutro', 'Physio']

  return (
    <div className='flex-1 bg-gradient-to-b from-[#f8f8f8] from-0% to-white to-100% py-24'>
      <div className='flex flex-row items-center gap-12 w-full max-w-7xl mx-auto px-7'>
        <h2 className='font-medium text-4xl md:text-5xl'>ABOUT US</h2>
        <div className='bg-primary h-[1px] md:flex-1'></div>
      </div>
      <div className=' w-full max-w-7xl mx-auto px-7 mt-7 text-lg md:text-2xl opacity-80'>
        <p>
          At ADR clinic treatment typically involves a range of professional
          activities aimed at helping patients recover from injuries, manage
          chronic conditions, and improve their overall physical well-being.
          Here&apos;s a brief description of our physiotherapy clinic work:
        </p>
        <ul className='list-disc p-5'>
          <li>
            <strong>Patient Assessment:</strong> ADR Physiotherapists evaluate
            patients&apos; conditions, develop treatment plans, and perform
            hands-on therapy.
          </li>
          <li>
            <strong>Treatment of Various Conditions:</strong> Addressing a wide
            range of issues including musculoskeletal injuries, neurological
            disorders, cardiopulmonary problems, and post-surgical
            rehabilitation.
          </li>
          <li>
            <strong>Therapeutic Exercises:</strong> ADR Physiotherapists guide
            patients through exercises and use specialized equipment to aid in
            recovery and improve function.
          </li>
          <li>
            <strong>Progress Monitoring:</strong> Regular evaluations are
            conducted to assess patient progress, which may include a range of
            motion measurements, strength testing, and functional assessments.
          </li>
          <li>
            <strong>Patient Education:</strong> An important aspect of our work
            involves educating patients about their conditions, proper body
            mechanics, and strategies for injury prevention.
          </li>
          <li>
            <strong>Collaboration:</strong> ADR Physiotherapists often work as
            part of a multidisciplinary team, coordinating with other healthcare
            professionals to provide comprehensive care.
          </li>
        </ul>
        <p>
          Physiotherapy sessions typically last between 30 to 45 minutes,
          depending on the patient&apos;s needs and the clinic&apos;s schedule.
        </p>
      </div>
      <div className='mt-24 flex flex-col md:flex-row items-stretch gap-20 w-full max-w-7xl mx-auto md:px-7'>
        <div className='flex items-center justify-center px-7 md:px-0'>
          <Image src={ADR} alt='ADR' loading='lazy' width={470} />
        </div>
        <div className='w-full md:w-[1px] h-[1px] md:h-auto bg-primary'></div>
        <div className='flex gap-3 md:gap-4 flex-wrap items-center mx-7 md:mx-0'>
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
        </div>
      </div>
      <div className='flex flex-row items-center gap-12 w-full max-w-7xl mx-auto px-7 mt-16'>
        <h2 className='font-medium text-4xl md:text-5xl'>FACILITIES</h2>
        <div className='bg-primary h-[1px] md:flex-1'></div>
      </div>
      <div className=' w-full max-w-7xl mx-auto px-7 mt-16'>
        <div className='flex flex-col md:flex-row gap-16'>
          <div className='w-full md:w-[70%] h-[280px] relative'>
            <Image
              src={dubai}
              alt='Dubai branch'
              loading='lazy'
              fill
              className='rounded-2xl object-cover'
            />
          </div>
          <div className='flex-1'>
            <h5 className='text-lg font-bold leading-7 mb-1'>Dubai</h5>
            <div className='h-[1px] bg-primary w-full'></div>
            <p className='mt-4 text-sm'>
              <FaPhoneVolume className='mr-2 text-base inline' />
              00971567761277
            </p>
            <p className='mt-4 text-sm'>
              <FaRegEnvelope className='mr-2 text-base inline' />
              info@aldarrehabilitation.ae
            </p>
          </div>
        </div>
        <p className='text-lg md:text-2xl opacity-80 mt-10 mb-8'>
          Our inpatient, outpatient, and homecare programs have all received
          international CARF accreditation, recognizing high quality care.
        </p>
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
        <div className='w-full h-[1px] bg-primary mt-20'></div>
      </div>
      <div className=' w-full max-w-7xl mx-auto px-7 mt-16'>
        <div className='flex flex-col md:flex-row gap-16'>
          <div className='w-full md:w-[70%] h-[280px] relative'>
            <Image
              src={oman}
              alt='Oman branch'
              loading='lazy'
              fill
              className='rounded-2xl object-cover'
            />
          </div>
          <div className='flex-1'>
            <h5 className='text-lg font-bold leading-7 mb-1'>Oman</h5>
            <div className='h-[1px] bg-primary w-full'></div>
            <p className='mt-4 text-sm'>
              <FaPhoneVolume className='mr-2 text-base inline' />
              00968 9548 4273
            </p>
            <p className='mt-4 text-sm'>
              <FaRegEnvelope className='mr-2 text-base inline' />
              info@aldarrehabilitation.ae
            </p>
          </div>
        </div>
        <p className='text-lg md:text-2xl opacity-80 mt-10 mb-8'>
          Our inpatient, outpatient, and homecare programs have all received
          international CARF accreditation, recognizing high quality care.
        </p>
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
        <div className='w-full h-[1px] bg-primary mt-20'></div>
      </div>
      <div className=' w-full max-w-7xl mx-auto px-7 mt-16'>
        <div className='flex flex-col md:flex-row gap-16'>
          <div className='w-full md:w-[70%] h-[280px] relative'>
            <Image
              src={iraq}
              alt='Iraq branch'
              loading='lazy'
              fill
              className='rounded-2xl object-cover'
            />
          </div>
          <div className='flex-1'>
            <h5 className='text-lg font-bold leading-7 mb-1'>Iraq</h5>
            <div className='h-[1px] bg-primary w-full'></div>
            <p className='mt-4 text-sm'>
              <FaPhoneVolume className='mr-2 text-base inline' />
              00964 7757766919
            </p>
            <p className='mt-4 text-sm'>
              <FaRegEnvelope className='mr-2 text-base inline' />
              info@aldarrehabilitation.ae
            </p>
          </div>
        </div>
        <p className='text-lg md:text-2xl opacity-80 mt-10 mb-8'>
          Our inpatient, outpatient, and homecare programs have all received
          international CARF accreditation, recognizing high quality care.
        </p>
        <motion.div
          initial='closed'
          animate={isIraqOpen ? 'open' : 'closed'}
          variants={variants}
          className='flex flex-wrap md:flex-nowrap gap-5 justify-center items-center mt-10 py-10 overflow-hidden'
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
