import Image from 'next/image'

import ADR from '@/public/images/ADR.webp'
import postAcute from '@/public/images/pos-acute.webp'
import longTerm from '@/public/images/long-term.webp'
import ventilated from '@/public/images/ventilated.webp'
import physio from '@/public/images/physio.webp'
import occupation from '@/public/images/carousel 1.webp'
import speech from '@/public/images/speech-and-swallow.webp'
import nursing from '@/public/images/nursing.webp'
import rehabilitative from '@/public/images/rehabilitative.webp'
import consultation from '@/public/images/consultation.webp'

const tags = ['Counseling', 'Spine', 'Geriatric', 'Pain', 'Neutro', 'Physio']

const services = {
  inPation: [
    {
      name: 'Post-Acute Inpatient Rehabilitation',
      img: postAcute,
      p: (
        <>
          <b>Al Dar&apos;s</b> mission To provide Post-acute rehabilitation is a
          critical phase in the continuum of care for individuals recovering
          from acute injuries, surgeries, or chronic conditions. <br />
          <br />
          Our expert team manages the functional improvements through intensive
          therapies to regain their independence and mobility and reduces
          possible complications and hospital readmissions to provide
          sustainable rehabilitative outcomes.
        </>
      ),
    },
    {
      name: 'Long Term Care',
      img: longTerm,
      p: (
        <>
          <b>Al Dar&apos;s</b> mission is to provide personalized care for
          patients who are chronically ill and require extensive care and
          ongoing support in a non-hospitalized environment. Our structured
          rehabilitation program helps meet both the medical and non-medical
          needs. <br />
          <br />
          Our patient-centered care focuses on relieving the distress of
          patients, using a holistic approach to rehabilitate them in an
          engaging environment, ensuring they receive the utmost care.
        </>
      ),
    },
    {
      name: 'Ventilated Patient Care',
      img: ventilated,
      p: (
        <>
          <b>Al Dar&apos;s</b> primary goal is to optimize respiratory function
          by providing mechanical ventilation support, facilitating weaning from
          the ventilator, and improving lung capacity. The focus is on helping
          patients improve their ability to breathe comfortably through
          education, medication, and transition to ventilator independence.{' '}
          <br />
          <br />
          The interdisciplinary team at Emirates Rehabilitation & Homecare works
          collaboratively to provide comprehensive care and support.
        </>
      ),
    },
  ],
  outPatient: [
    {
      name: 'Physiotherapy',
      img: physio,
      p: (
        <>
          <b>Al Dar&apos;s</b> mission is to provide services aimed at
          optimizing physical function, alleviating pain, and promoting
          mobility. <br />
          <br />
          Our experienced physiotherapists employ evidence-based techniques and
          modalities to facilitate the recovery process, helping patients regain
          strength, flexibility, and overall physical well-being.
        </>
      ),
    },
    {
      name: 'Occupational Therapy',
      img: occupation,
      p: (
        <>
          <b>Al Dar&apos;s</b> focus is on enhancing independence and autonomy
          in daily activities. <br />
          <br />
          Our dedicated occupational therapists work closely with patients to
          develop strategies and interventions that address barriers and promote
          functional independence, allowing individuals to engage in meaningful
          activities and improve their overall quality of life.
        </>
      ),
    },
    {
      name: 'Speech and Swallow Therapy',
      img: speech,
      p: (
        <>
          <b>Al Dar&apos;s</b> Speech and Swallow Therapy is a vital component
          of our rehabilitative offerings. Our specialized speech therapists are
          adept at addressing communication and swallowing disorders, tailoring
          treatment plans to each patient&apos;s unique needs. <br />
          <br />
          Through targeted interventions, we strive to enhance speech clarity,
          language skills, and swallowing function, ultimately improving
          communication and nutritional well-being.
        </>
      ),
    },
  ],
  home: [
    {
      name: 'Nursing Care',
      img: nursing,
      p: (
        <>
          <b>Al Dar&apos;s</b> home care nursing services are dedicated to
          providing exceptional and compassionate care, empowering patients to
          maintain their independence and enjoy the comfort of their own homes.
          <br />
          <br />
          Whether it is a part-time or full-time requirement, our highly trained
          professionals are available to cater to your specific needs.
        </>
      ),
    },
    {
      name: 'Rehabilitative therapies',
      img: rehabilitative,
      p: (
        <>
          <b>Al Dar&apos;s</b> homecare rehabilitation therapy services are
          specifically designed to assist homebound patients in regaining
          mobility, preventing falls, and improving overall strength. <br />
          <br />
          Our therapies include Physiotherapy, Occupational Therapy, and Speech
          & Swallow Therapy. Our therapists provide evaluation, treatment, and
          education for individuals and train family caregivers to help patients
          achieve a safe and independent lifestyle at home.
        </>
      ),
    },
    {
      name: "Doctor's Consultation",
      img: consultation,
      p: (
        <>
          <b>Al Dar</b> facilitates physician home visits and provides tailored
          medical services in the convenience of your own home, catering
          specifically to your unique needs. <br />
          Our esteemed doctors are equipped to diligently monitor, update, and
          ensure follow-up care without the need for patients to endure long
          journeys. <br />
          These services prove highly advantageous, particularly for individuals
          with mobility challenges.
        </>
      ),
    },
  ],
}

const Services = () => {
  return (
    <div className='flex-1 bg-gradient-to-b from-[#f8f8f8] from-0% to-white to-100% py-24'>
      <div className='flex flex-row items-center gap-12 w-full max-w-7xl mx-auto px-7'>
        <h2 className='font-medium text-4xl md:text-5xl'>SERVICES</h2>
        <div className='bg-primary h-[1px] md:flex-1'></div>
      </div>
      <p className='max-w-7xl w-full mx-auto px-7 md:text-2xl opacity-80 mt-9 md:mt-16'>
        <b>Al Dar Rehabilitation Clinic</b> opened its doors in 2006 and is
        prevalent as a dedicated post-acute inpatient rehabilitation facility,
        offering a wide range of rehabilitation and homecare services in the
        region for more than 16 years of quality care. With a primary focus on
        providing excellent patient and family-centered care, we provide the
        entire continuum of post-acute rehabilitation and nursing services.
      </p>
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
      <div className='flex flex-row items-center gap-12 w-full max-w-7xl mx-auto px-7 mt-16 md:mt-24'>
        <h2 className='font-medium text-3xl md:text-5xl'>
          IN PATIENT SERVICES
        </h2>
        <div className='bg-primary h-[1px] md:flex-1'></div>
      </div>
      <div className='w-full max-w-7xl mx-auto px-7'>
        {services.inPation.map((el, i) => (
          <div
            className={`flex flex-col items-stretch lg:items-center mt-20 gap-16 md:gap-24 ${
              i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
            }`}
            key={i}
          >
            <div className='w-full md:w-[45%] h-72 md:h-96 relative'>
              <Image
                src={el.img}
                alt={el.name}
                fill
                className='rounded-2xl object-cover'
                loading='lazy'
              />
            </div>
            <div className='inline-block w-full md:w-[55%]'>
              <h3 className='font-medium text-3xl'>{el.name}</h3>
              <div className='h-[1px] w-full bg-primary my-4 md:my-7'></div>
              <p className='text-lg'>{el.p}</p>
            </div>
          </div>
        ))}
      </div>
      <div className='flex flex-row items-center gap-12 w-full max-w-7xl mx-auto px-7 mt-16 md:mt-24'>
        <h2 className='font-medium text-3xl md:text-5xl'>
          OUT PATIENT SERVICES
        </h2>
        <div className='bg-primary h-[1px] md:flex-1'></div>
      </div>
      <div className='w-full max-w-7xl mx-auto px-7'>
        {services.outPatient.map((el, i) => (
          <div
            className={`flex flex-col items-stretch lg:items-center mt-20 gap-16 md:gap-24 ${
              i % 2 !== 0 ? 'md:flex-row' : 'md:flex-row-reverse'
            }`}
            key={i}
          >
            <div className='w-full md:w-[45%] h-72 md:h-96 relative'>
              <Image
                src={el.img}
                alt={el.name}
                fill
                className='rounded-2xl object-cover'
                loading='lazy'
              />
            </div>
            <div className='inline-block w-full md:w-[55%]'>
              <h3 className='font-medium text-3xl'>{el.name}</h3>
              <div className='h-[1px] w-full bg-primary my-4 md:my-7'></div>
              <p className='text-lg'>{el.p}</p>
            </div>
          </div>
        ))}
      </div>
      <div className='flex flex-row items-center gap-12 w-full max-w-7xl mx-auto px-7 mt-16 md:mt-24'>
        <h2 className='font-medium text-3xl md:text-5xl'>
          HOME HEALTH SERVICES
        </h2>
        <div className='bg-primary h-[1px] md:flex-1'></div>
      </div>
      <div className='w-full max-w-7xl mx-auto px-7'>
        {services.home.map((el, i) => (
          <div
            className={`flex flex-col items-stretch lg:items-center mt-20 gap-16 md:gap-24 ${
              i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
            }`}
            key={i}
          >
            <div className='w-full md:w-[45%] h-72 md:h-96 relative'>
              <Image
                src={el.img}
                alt={el.name}
                fill
                className='rounded-2xl object-cover object-top'
                loading='lazy'
              />
            </div>
            <div className='inline-block w-full md:w-[55%]'>
              <h3 className='font-medium text-3xl'>{el.name}</h3>
              <div className='h-[1px] w-full bg-primary my-4 md:my-7'></div>
              <p className='text-lg'>{el.p}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Services
