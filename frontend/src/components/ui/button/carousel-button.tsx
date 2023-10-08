'use client'

import * as React from 'react'
import { EmblaCarouselType } from 'embla-carousel-react'
import { MoveLeftIcon, MoveRightIcon } from 'lucide-react'

type UsePrevNextButtonsType = {
  prevBtnDisabled: boolean
  nextBtnDisabled: boolean
  onPrevButtonClick: () => void
  onNextButtonClick: () => void
}

export const usePrevNextButtons = (
  emblaApi: EmblaCarouselType | undefined
): UsePrevNextButtonsType => {
  const [prevBtnDisabled, setPrevBtnDisabled] = React.useState(true)
  const [nextBtnDisabled, setNextBtnDisabled] = React.useState(true)

  const onPrevButtonClick = React.useCallback(() => {
    if (!emblaApi) return
    emblaApi.scrollPrev()
  }, [emblaApi])

  const onNextButtonClick = React.useCallback(() => {
    if (!emblaApi) return
    emblaApi.scrollNext()
  }, [emblaApi])

  const onSelect = React.useCallback((emblaApi: EmblaCarouselType) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev())
    setNextBtnDisabled(!emblaApi.canScrollNext())
  }, [])

  React.useEffect(() => {
    if (!emblaApi) return

    onSelect(emblaApi)
    emblaApi.on('reInit', onSelect)
    emblaApi.on('select', onSelect)
  }, [emblaApi, onSelect])

  return {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  }
}

type PropType = React.PropsWithChildren<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >
>

export function PrevButton(props: PropType) {
  return (
    <button
      className="flex flex-col align-middle justify-center pr-2 pl-2 border rounded-2xl hover:bg-primary-foreground transition-transform duration-300 transform active:-translate-x-3 disabled:invisible"
      {...props}
    >
      <MoveLeftIcon className="w-6 h-6" />
    </button>
  )
}

export function NextButton(props: PropType) {
  return (
    <button
      className="flex flex-col align-middle justify-center pl-2 pr-2 border rounded-2xl hover:bg-primary-foreground transition-transform duration-300 transform active:translate-x-3 disabled:invisible"
      {...props}
    >
      <MoveRightIcon className="w-6 h-6" />
    </button>
  )
}
