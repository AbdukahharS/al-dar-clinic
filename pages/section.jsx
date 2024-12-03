'use client'

import Image from 'next/image'
import Animated from '@/components/Animated'
import Recovery from '@/public/images/patient-recovery.webp'

const Section = () => {
  return (
    <div className='flex-1 bg-gradient-to-b from-[#f8f8f8] from-0% to-white to-100% py-10'>
      <div className='max-w-7xl mx-auto px-7'>
        <Animated animationType='fadeInUp'>
          <h1 className='font-medium text-xl md:text-3xl'>
            The Vital Role of Rehabilitation Equipment in Patient Recovery
          </h1>
        </Animated>

        <Animated animationType='fadeInLeft'>
          <div className='bg-primary h-[1px] w-full my-8'></div>
        </Animated>

        <Animated animationType='fadeInUp'>
          <div className='h-[240px] md:h-[400px] relative max-w-6xl mx-auto'>
            <Image
              src={Recovery}
              fill
              alt='A nurse helping the patient to use rehabilitation equipment'
              className='object-cover shadow-[0px_4px_10px_0px_rgba(0,0,0,0.15)] rounded-2xl object-[10%]'
            />
          </div>
        </Animated>

        <ul className='mt-8 text-lg md:text-2xl opacity-80 flex flex-col gap-6 list-disc'>
          <li className='ml-6'>
            <Animated animationType='fadeInUp'>
              <b>Empowering Your Recovery Journey</b>
            </Animated>
          </li>
          <Animated animationType='fadeInUp'>
            <p>
              At our rehabilitation clinic, we understand that the right
              equipment can make a significant difference in your recovery
              process. Whether you're receiving treatment at our facility or
              continuing your rehabilitation at home, access to proper equipment
              is crucial for achieving optimal results.
            </p>
          </Animated>

          <li className='ml-6'>
            <Animated animationType='fadeInUp'>
              <b>The Importance of Rehabilitation Equipment</b>
            </Animated>
          </li>
          <Animated animationType='fadeInUp'>
            <p>Rehabilitation equipment plays a vital role in:</p>
          </Animated>
          <Animated animationType='fadeInUp'>
            <ul className='list-disc ml-6'>
              <li>Accelerating recovery times</li>
              <li>Improving strength and flexibility</li>
              <li>Enhancing balance and coordination</li>
              <li>Reducing pain and discomfort</li>
              <li>Promoting independence in daily activities</li>
            </ul>
          </Animated>

          <li className='ml-6'>
            <Animated animationType='fadeInUp'>
              <b>Our Commitment to Your Success</b>
            </Animated>
          </li>
          <Animated animationType='fadeInUp'>
            <p>
              As part of our dedication to your recovery, we provide
              state-of-the-art rehabilitation equipment both in our clinic and
              for home use. Our experienced therapists will guide you in using
              these tools effectively, ensuring you get the most benefit from
              your treatment plan.
            </p>
          </Animated>

          <li className='ml-6'>
            <Animated animationType='fadeInUp'>
              <b>Equipment Options for Every Need</b>
            </Animated>
          </li>
          <Animated animationType='fadeInUp'>
            <p>We offer a wide range of rehabilitation equipment, including:</p>
          </Animated>
          <Animated animationType='fadeInUp'>
            <ul className='list-disc ml-6'>
              <li>Resistance bands and weights</li>
              <li>Balance boards and stability tools</li>
              <li>Mobility aids</li>
              <li>Specialized exercise machines</li>
              <li>Therapeutic ultrasound and electrical stimulation devices</li>
            </ul>
          </Animated>

          <li className='ml-6'>
            <Animated animationType='fadeInUp'>
              <b>Flexible Purchase and Rental Options</b>
            </Animated>
          </li>
          <Animated animationType='fadeInUp'>
            <p>
              We understand that every patient's journey is unique. That's why
              we offer flexible options to access the equipment you need:
            </p>
          </Animated>
          <Animated animationType='fadeInUp'>
            <ul className='list-disc ml-6'>
              <li>
                <strong>Purchase:</strong> Invest in your long-term health with
                our high-quality equipment available for purchase.
              </li>
              <li>
                <strong>Rent:</strong> Take advantage of our special rental
                rates for short-term use or to try before you buy.
              </li>
              <li>
                <strong>Special Pricing:</strong> As a valued patient, you'll
                have access to exclusive discounts on both purchases and
                rentals.
              </li>
            </ul>
          </Animated>

          <li className='ml-6'>
            <Animated animationType='fadeInUp'>
              <h2 className='font-bold'>Expert Guidance and Support</h2>
            </Animated>
          </li>
          <Animated animationType='fadeInUp'>
            <p>Our team is committed to your success. We provide:</p>
          </Animated>
          <Animated animationType='fadeInUp'>
            <ul className='list-disc ml-6'>
              <li>
                Personalized equipment recommendations based on your specific
                needs
              </li>
              <li>Thorough training on proper equipment use</li>
              <li>
                Ongoing support and adjustments to your home exercise program
              </li>
            </ul>
          </Animated>

          <Animated animationType='fadeInUp'>
            <p>
              At our clinic, we believe that providing access to the right
              rehabilitation equipment is an essential part of our care. It's
              not just about the tools; it's about empowering you to take an
              active role in your recovery and achieve the best possible
              outcomes.
            </p>
          </Animated>

          <Animated animationType='fadeInUp'>
            <p>
              Contact us today to learn more about our rehabilitation equipment
              options and how they can support your journey to better health and
              mobility.
            </p>
          </Animated>
        </ul>
      </div>
    </div>
  )
}

export default Section
