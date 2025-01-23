import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

import Carousel from '@/components/carousels/HeroCarousel'
import Animated from '@/components/Animated'
import ServicesCarousel from '@/components/carousels/ServicesCarousel'
import ADR from '@/public/images/ADR.webp'
import Vision from '@/public/images/our-vision.webp'
import Mission from '@/public/images/our-mission.webp'
import Training from '@/public/images/training.webp'
import Connector from '@/public/icons/connector.svg'
import Recovery from '@/public/images/patient-recovery.webp'
import Button from '@/components/Button'
import GalleryCarousel from '@/components/carousels/GalleryCarousel'
import { useEffect, useState } from 'react'
import axios from 'axios'

const TeamCard = ({ item }) => {
  return (
    <Animated className='w-80 h-96 max-w-[calc(100vw-54px)] lg:h-[450px] shadow-[0px_4px_10px_0px_rgba(0,0,0,0.15)] rounded-2xl'>
      <Image
        src={item.image.original}
        alt={item.name}
        loading='lazy'
        height={320}
        width={320}
        className='shadow-[0px_4px_10px_0px_rgba(0,0,0,0.15)] bg-white rounded-2xl h-64 lg:h-[320px]'
      />
      <h4 className='font-medium text-2xl text-[#151515] text-center mt-5 mb-4'>
        {item.name}
      </h4>
      <p className='text-center opacity-70 font-medium'>{item.position}</p>
    </Animated>
  )
}

const variants = {
  open: {
    height: 'auto',
    transition: { stiffness: 20 },
  },
  closed: {
    height: 100,
    transition: { stiffness: 20 },
  },
}

export default function Home() {
  const [isOpen, setIsOpen] = useState(false)
  const [team, setTeam] = useState([])

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const response = await axios.get('/team-member/all')
        setTeam(response.data.data)
      } catch (error) {
        console.error('Error fetching team members:', error)
      }
    }

    if (axios.defaults.baseURL) {
      fetchTeamMembers()
    }
  }, [axios.defaults.baseURL])

  const tags = {
    en: ['Counseling', 'Spine', 'Geriatric', 'Pain', 'Neutro', 'Physio'],
    ar: [
      'الاستشارات الطبية',
      'العمود الفقري',
      'كبار السن',
      'الجهاز العصبي',
      'العلاج الطبيعي',
      'علاج الألم',
    ],
  }

  return (
    <main className='w-full'>
      <div className='w-full max-w-7xl px-0 md:px-12 mx-auto'>
        <Animated>
          <Carousel />
        </Animated>
        <div className='mt-20 flex flex-col md:flex-row items-stretch gap-12 md:gap-5'>
          <Animated className='hidden md:flex gap-4 flex-wrap items-center'>
            {tags.ar.map((tag, ind) => (
              <span
                key={ind}
                className={`py-[6px] px-7 text-white rounded-full ${
                  ind % 2 === 0 ? 'bg-primary' : 'bg-secondary'
                }`}
              >
                {tag}
              </span>
            ))}
          </Animated>
          <div className='w-full md:w-[1px] h-[1px] md:h-auto bg-primary hidden md:block'></div>
          <Animated className='flex items-center justify-center px-7 md:px-0'>
            <Image src={ADR} alt='ADR' loading='lazy' width={336} />
          </Animated>
          <div className='w-full md:w-[1px] h-[1px] md:h-auto bg-primary'></div>
          <Animated className='flex gap-3 md:gap-4 flex-wrap items-center mx-7 md:mx-0'>
            {tags.en.map((tag, ind) => (
              <span
                key={ind}
                className={`py-[6px] text-xs md:text-base px-4 md:px-7 text-white rounded-full ${
                  ind % 2 === 0 ? 'bg-primary' : 'bg-secondary'
                }`}
              >
                {tag}
              </span>
            ))}
          </Animated>
          <div className='w-full md:w-[1px] h-[1px] md:h-auto bg-primary block md:hidden'></div>
          <Animated className='flex md:hidden gap-3 flex-wrap items-center  mx-7'>
            {tags.ar.map((tag, ind) => (
              <span
                key={ind}
                className={`py-[6px] px-4 text-xs text-white rounded-full ${
                  ind % 2 === 0 ? 'bg-primary' : 'bg-secondary'
                }`}
              >
                {tag}
              </span>
            ))}
          </Animated>
        </div>
        <div className='mt-14 md:mt-20 px-7 md:px-0'>
          <h2 className='text-3xl font-medium mb-10 md:hidden'>AL-DAR</h2>
          <Animated className='flex flex-col-reverse md:flex-row md:items-stretch lg:items-center gap-6 md:gap-0'>
            <Animated
              animationType='fadeInLeft'
              className='inline-block w-full md:w-[45%] md:pr-20'
            >
              <h3 className='font-medium text-3xl'>Our Vision</h3>
              <div className='h-[1px] w-full bg-primary my-4'></div>
              <p className='text-lg'>
                <b>Al Dar&apos;s</b> vision is to become a local and
                international leader in the healthcare sector, setting the
                highest standards for excellence in rehabilitation services,
                Medical Services, and Home care.
              </p>
            </Animated>
            <div className='w-full md:w-[55%] aspect-[1.1/1] md:aspect-video relative'>
              <Image
                src={Vision}
                alt='Our Vision'
                fill
                style={{ objectFit: 'cover' }}
                className='rounded-2xl shadow-[0_5px_20px_0_rgba(0,0,0,0.12)] z-[1]'
                loading='lazy'
              />
            </div>
          </Animated>
          <Image
            src={Connector}
            alt='Connector'
            className='mx-[50%] -mt-[5px] z-0 relative hidden md:block'
            loading='lazy'
          />
          <Animated className='flex flex-col md:flex-row items-stretch lg:items-center mt-20 md:-mt-[5px] gap-6 md:gap-0'>
            <div className='w-full md:w-[55%] aspect-[1.1/1] md:aspect-video relative'>
              <Image
                src={Mission}
                alt='Our Mission'
                fill
                style={{ objectFit: 'cover' }}
                className='rounded-2xl shadow-[0_5px_20px_0_rgba(0,0,0,0.12)] z-[1]'
                loading='lazy'
              />
            </div>
            <Animated
              animationType='fadeInRight'
              className='inline-block w-full md:w-[45%] md:pl-20'
            >
              <h3 className='font-medium text-3xl'>Our Mission</h3>
              <div className='h-[1px] w-full bg-primary my-4'></div>
              <p className='text-lg'>
                <b>Al Dar&apos;s</b> mission To provide exceptional healthcare
                services, focusing on rehabilitation, to individuals of all
                ages. We are committed to delivering personalized and effective
                care that promotes overall well-being
              </p>
            </Animated>
          </Animated>
        </div>
        <div className='h-[1px] bg-primary w-full my-16 md:my-20'></div>
        <Animated className='flex flex-col md:flex-row gap-9 mx-7 md:mx-0 md:gap-24 items-center mb-16 md:mb-40'>
          <Image
            src={Recovery}
            alt='The Vital Role of Rehabilitation Equipment in Patient Recovery'
            width={426}
            height={326}
            className='rounded-2xl shadow-[0_4px_10px_0_rgba(0,0,0,0.15)]'
          />
          <Animated animationType='fadeInRight'>
            <h3 className='font-medium md:text-[26px] uppercase'>
              The Vital Role of Rehabilitation Equipment in Patient Recovery
            </h3>
            <div className='bg-primary h-[1px] w-full my-4 md:my-6'></div>
            <p className='text-lg opacity-90 indent-8 mb-4'>
              At <b>Al-Dar</b>, we understand that the right equipment can make
              a significant difference in your recovery process. Whether
              you&apos;re receiving treatment at our facility or continuing your
              rehabilitation at home, access to proper equipment is crucial for
              achieving optimal results.
            </p>
            <Link href='/section'>
              <Button className='ml-auto block'>Read More</Button>
            </Link>
          </Animated>
        </Animated>
        <div>
          <Animated
            animationType='fadeInLeft'
            className='flex flex-col-reverse md:flex-row items-center gap-12'
          >
            <h2 className='font-medium text-2xl md:text-4xl'>OUR SERVICES</h2>
            <div className='bg-primary h-[1px] w-full md:flex-1'></div>
          </Animated>
          <Animated>
            <ServicesCarousel />
          </Animated>
          <Link href='/services' className='mx-auto block w-fit mb-10 md:mb-24'>
            <Button size='lg'>Show More</Button>
          </Link>
        </div>
        <Animated className='flex flex-col-reverse md:flex-row gap-9 mx-7 md:mx-0 md:gap-24 items-center mb-16 md:mb-24'>
          <Animated animationType='fadeInLeft'>
            <h3 className='font-medium md:text-[26px] uppercase'>
              Continuous Medical Education and Training
            </h3>
            <div className='bg-primary h-[1px] w-full my-4 md:my-6'></div>
            <p className='text-lg opacity-90 indent-8'>
              At <b>Al-Dar</b>, we are committed to fostering a culture of
              continuous learning and professional growth among our staff.
              Through regular and ongoing education sessions, workshops, and
              training programs, we empower our team members to stay up-to-date
              with the latest advancements in healthcare.
              <br className='md:hidden' />
              <br className='md:hidden' />
              <span className='block indent-8 md:inline'>
                {' '}
                By investing in their development, we ensure that our staff are
                equipped with the knowledge and skills necessary to deliver
                exceptional medical services and provide the highest standard of
                care to our valued patients.
              </span>
            </p>
          </Animated>
          <Image
            src={Training}
            alt='Continuous Medical Education and Training'
            width={426}
            height={326}
            className='rounded-2xl shadow-[0_4px_10px_0_rgba(0,0,0,0.15)]'
          />
        </Animated>
        <div className='bg-primary h-[1px] w-full md:hidden mb-8'></div>
        <div>
          <Animated
            animationType='fadeInLeft'
            className='flex flex-row items-center gap-16 mb-12 md:mb-20'
          >
            <h3 className='text-2xl md:text-4xl font-medium tracking-wide pl-7'>
              MEET OUR TEAM
            </h3>
            <div className='bg-primary hidden md:block h-[1px] flex-1'></div>
          </Animated>
          <div className='flex flex-col items-center md:flex-row gap-20 md:gap-32 justify-center'>
            {team.slice(0, 2).map((item, ind) => (
              <TeamCard key={ind} item={item} />
            ))}
          </div>
          {team.length > 2 && (
            <>
              <motion.div
                initial='closed'
                animate={isOpen ? 'open' : 'closed'}
                variants={variants}
                className='flex flex-col md:!h-auto md:flex-row gap-20 md:gap-12 lg:gap-20 justify-between py-8 md:mt-14 items-center overflow-hidden px-7 md:px-2'
              >
                {team.slice(2).map((item, ind) => (
                  <TeamCard key={ind} item={item} />
                ))}
              </motion.div>
              <div className='flex justify-center mt-7'>
                <Button
                  onClick={() => setIsOpen(!isOpen)}
                  size='lg'
                  className='md:hidden'
                >
                  Show {isOpen ? 'Less' : 'More'}
                </Button>
              </div>
            </>
          )}
        </div>
        <div className='w-full mt-16 md:mt-20'>
          <Animated
            animationType='fadeInLeft'
            className='flex flex-col-reverse md:flex-row md:items-center gap-16 mb-14 md:mb-20'
          >
            <h3 className='text-2xl md:text-4xl font-medium tracking-wide px-7'>
              GALLERY
            </h3>
            <div className='bg-primary !h-[1px] md:flex-1 w-full'></div>
          </Animated>
          <Animated>
            <GalleryCarousel />
          </Animated>
        </div>
      </div>
    </main>
  )
}
