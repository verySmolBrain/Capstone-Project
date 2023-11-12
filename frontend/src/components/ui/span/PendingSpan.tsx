'use client'

import * as React from 'react'
import { TypeAnimation } from 'react-type-animation'

export function PendingSpan() {
  return (
    <span className="inline-flex items-center justify-center border rounded-md ing-offset-background pr-2 pl-2">
      <TypeAnimation
        sequence={[
          'Pending',
          1000,
          'Pending.',
          1000,
          'Pending..',
          1000,
          'Pending...',
          1000,
        ]}
        wrapper="span"
        speed={50}
        className="text-sm font-medium "
        repeat={Infinity}
      />
    </span>
  )
}
