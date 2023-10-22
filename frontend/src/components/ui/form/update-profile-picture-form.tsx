'use client'

import * as React from 'react'
import { Loader2Icon } from 'lucide-react'
import { toast } from '@/components/ui/use-toast'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog'

import { zodResolver } from '@hookform/resolvers/zod'
import { profilePictureUpdateSchema } from '@/lib/validation/update-details'
import { useForm } from 'react-hook-form'
import Cropper, { Area } from 'react-easy-crop'
import * as z from 'zod'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import type { Database } from '@/lib/database.types'

type FormData = z.infer<typeof profilePictureUpdateSchema>

export const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image()
    image.addEventListener('load', () => resolve(image))
    image.addEventListener('error', (error) => reject(error))
    image.src = url
  })

export default async function getCroppedImg(
  imageSrc: string,
  pixelCrop: Area | null
) {
  const image = await createImage(imageSrc)
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  if (!ctx || !pixelCrop) {
    return null
  }

  const { x, y, width, height } = pixelCrop

  canvas.width = width
  canvas.height = height

  ctx.drawImage(image, x, y, width, height, 0, 0, width, height)

  return new Promise<string | null>((resolve) => {
    canvas.toBlob((file) => {
      if (file) {
        resolve(URL.createObjectURL(file))
      } else {
        resolve(null)
      }
    }, 'image/png')
  })
}

export function UpdateProfilePictureForm() {
  const [isLoading, setIsLoading] = React.useState(false)
  const [imageAvailable, setImageAvailable] = React.useState<boolean>(false)
  const [image, setImage] = React.useState<string>('')
  const [crop, setCrop] = React.useState({ x: 0, y: 0 })
  const [croppedAreaPixels, setCroppedAreaPixels] = React.useState<Area | null>(
    null
  )
  const [zoom, setZoom] = React.useState(1)
  const [croppedImage, setCroppedImage] = React.useState<string | null>(null)

  const form = useForm<FormData>({
    mode: 'onChange',
    resolver: zodResolver(profilePictureUpdateSchema),
  })

  const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }

  async function onFormSubmit(data: FormData) {
    setIsLoading(true)

    const dataTransfer = new DataTransfer()
    dataTransfer.items.add(data.image)
    const file = URL.createObjectURL(dataTransfer.files[0])
    setImage(file)

    // const updateResult = await fetch(
    //   `${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}/profile/image`,
    //   {
    //     method: 'PUT',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'update-type': 'picture',
    //       authorization: token!,
    //     },
    //     body: JSON.stringify(data),
    //   }
    // )

    // setIsLoading(false)

    // if (!updateResult?.ok) {
    //   return toast({
    //     title: 'Uh Oh! Something went wrong!',
    //     description: updateResult?.statusText,
    //     variant: 'destructive',
    //   })
    // }

    // return toast({
    //   title: 'Success!',
    //   description: 'Your profile picture has been updated!',
    //   variant: 'default',
    // })
  }

  async function onCropSubmit() {
    const croppedImage = await getCroppedImg(image, croppedAreaPixels)
    setCroppedImage(croppedImage)
  }

  return (
    <Dialog>
      <Form {...form}>
        <form className="space-y-8" onSubmit={form.handleSubmit(onFormSubmit)}>
          <FormField
            control={form.control}
            name="image"
            render={({ field: { onChange } }) => (
              <>
                <FormItem>
                  <FormLabel>Profile Picture</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      disabled={form?.formState?.isSubmitting}
                      onChange={(e) => {
                        if (e.target.files) {
                          onChange(e.target.files[0])
                        }

                        if (
                          e.target.files &&
                          profilePictureUpdateSchema.safeParse({
                            image: e.target.files[0],
                          }).success
                        ) {
                          setImageAvailable(true)
                        }
                      }}
                    />
                  </FormControl>
                  <FormDescription>
                    Choose a profile picture. Make it cute!
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              </>
            )}
          />
          {imageAvailable ? (
            <DialogTrigger asChild>
              <Button type="submit">Upload</Button>
            </DialogTrigger>
          ) : (
            <Button type="submit">Upload</Button>
          )}
        </form>
      </Form>

      <DialogContent className="xs:max-w-[350px] sm:max-w-[425px] md:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Crop Image</DialogTitle>
          <DialogDescription>Crop your profile picture here!</DialogDescription>
        </DialogHeader>
        <div className="min-h-[350px] sm:min-h-[425px] relative border-2">
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            aspect={1 / 1}
            onCropComplete={onCropComplete}
            onCropChange={setCrop}
            onZoomChange={setZoom}
          />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="submit" onClick={onCropSubmit}>
              Save changes
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
