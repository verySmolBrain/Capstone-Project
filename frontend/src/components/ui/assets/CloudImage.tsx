'use client'

import { CldImage, CldImageProps } from 'next-cloudinary';

export function CloudImage(props: CldImageProps) {
  return <CldImage {...props} />;
}