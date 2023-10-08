'use client'

import React from 'react'
import useEmblaCarousel, { EmblaOptionsType } from 'embla-carousel-react'
import { PropsWithChildren } from 'react'
import {
  usePrevNextButtons,
  NextButton,
  PrevButton,
} from './button/carousel-button'

// Define the props
type Props = PropsWithChildren & EmblaOptionsType

export const Carousel = ({ children, ...options }: Props) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    ...options,
    containScroll: 'trimSnaps',
  })

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi)

  return (
    <div className="container flex flex-row justify-between">
      <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">{children}</div>
      </div>
      <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
    </div>
  )
}
