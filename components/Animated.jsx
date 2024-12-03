'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const Animated = ({ className = '', children, animationType = 'fadeInUp' }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.25 })

  const animations = {
    fadeInUp: {
      initial: { opacity: 0, y: 50 },
      animate: { opacity: isInView ? 1 : 0, y: isInView ? 0 : 50 },
    },
    fadeInLeft: {
      initial: { opacity: 0, x: -50 },
      animate: { opacity: isInView ? 1 : 0, x: isInView ? 0 : -50 },
    },
    fadeInRight: {
      initial: { opacity: 0, x: 50 },
      animate: { opacity: isInView ? 1 : 0, x: isInView ? 0 : 50 },
    },
    fadeIn: {
      initial: { opacity: 0 },
      animate: { opacity: isInView ? 1 : 0 },
    },
  }

  return (
    <motion.div
      className={className}
      ref={ref}
      initial='initial'
      animate='animate'
      exit='initial'
      variants={animations[animationType]}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  )
}

export default Animated
