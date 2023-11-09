'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2Icon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import * as React from 'react'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { toast } from '@/components/ui/use-toast'
import { Input } from '../input'
import Cropper, { Area } from 'react-easy-crop'
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
import { profilePictureUpdateSchema } from '@/lib/validation/update-details'
import NextImage from 'next/image'
import { Label } from '@radix-ui/react-label'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/lib/database.types'

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

  return canvas.toDataURL('image/png')
}

const MAX_IMAGE_SIZE = 500000 // 500kb
const ALLOWED_IMAGE_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/jpg',
  'image/svg+xml',
]

const FormSchema = z.object({
  name: z.string(),
  description: z.string(),
  image: z
    .custom<File>(
      (val) => val instanceof File,
      'Required to import at least one image'
    )
    .refine(
      (file) => Number(file.size) <= Number(MAX_IMAGE_SIZE),
      `File size should be less than 50kb`
    )
    .refine(
      (file) => ALLOWED_IMAGE_TYPES.includes(file.type),
      'Only these types are allowed .jpg, .jpeg, .png, .svg and .webp'
    ),
})

export function EditAchievemnetForm(props: {
  id: string
  setOpen: (a: boolean) => void
  mutate: () => void
}) {
  const [isLoading, setIsLoading] = React.useState(false)
  const [imageAvailable, setImageAvailable] = React.useState<boolean>(false)
  const [image, setImage] = React.useState<string>('')
  const [crop, setCrop] = React.useState({ x: 0, y: 0 })
  const [croppedAreaPixels, setCroppedAreaPixels] = React.useState<Area | null>(
    null
  )
  const [zoom, setZoom] = React.useState(1)
  const form = useForm<z.infer<typeof FormSchema>>({
    mode: 'onChange',
    resolver: zodResolver(FormSchema),
  })

  // image functions
  const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }
  async function onCropSubmit() {
    setIsLoading(true)

    const croppedImage = await getCroppedImg(image, croppedAreaPixels)
    console.log(croppedImage)
    setImage(croppedImage ?? '')

    setIsLoading(false)
  }

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true)
    const supabase = createClientComponentClient<Database>()
    const token = (await supabase.auth.getSession()).data.session?.access_token

    const createResult = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}/achievement/${props.id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          authorization: token!,
        },
        body: JSON.stringify({
          name: data.name,
          description: data.description,
          image: image,
        }),
      }
    )

    setIsLoading(false)

    if (!createResult?.ok) {
      return toast({
        title: 'Uh Oh! Something went wrong!',
        description: createResult?.statusText,
        variant: 'destructive',
      })
    }

    props.setOpen(false)
    return toast({
      title: 'Success!',
      description: 'The achievement was successfully updated!',
      variant: 'default',
    })
  }

  return (
    <div className="grid gap-6 w-fill overflow-y-auto max-h-[600px] no-scrollbar pl-3 pr-3">
      <Dialog>
        {image && (
          <div className="flex flex-col gap-2">
            <Label className="text-sm font-medium leading-none">Preview</Label>
            <div className="container rounded-2xl border pt-3 pb-3 flex justify-center">
              <NextImage
                src={image}
                className="rounded-2xl"
                alt="Collection image"
                width={300}
                height={100}
              />
            </div>
          </div>
        )}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8"
            id="createCampaignForm"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Achievement Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Catch 'Em All!" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Achievement Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Complete the Pokédex" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="image"
              render={({ field: { onChange } }) => (
                <>
                  <FormItem>
                    <FormLabel>Achievement Image</FormLabel>
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
                            const dataTransfer = new DataTransfer()
                            dataTransfer.items.add(e.target.files[0])

                            const file = dataTransfer.files[0]

                            if (file) {
                              const reader = new FileReader()

                              reader.onload = function () {
                                const base64Image =
                                  (reader.result as string) ?? ''
                                setImageAvailable(true)
                                setImage(base64Image)
                              }

                              reader.readAsDataURL(file)
                            }
                          }
                        }}
                      />
                    </FormControl>
                    <FormDescription>
                      Choose an image for the achievement.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                </>
              )}
            />
          </form>
        </Form>
        <div className="pt-4">
          {imageAvailable ? (
            <DialogTrigger asChild>
              <Button
                type="submit"
                className="w-auto justify-self-start transition-transform duration-300 transform active:translate-y-3"
              >
                {isLoading && (
                  <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                )}
                Crop Image
              </Button>
            </DialogTrigger>
          ) : (
            <Button
              type="submit"
              className="w-auto justify-self-start transition-transform duration-300 transform active:translate-y-3"
            >
              {isLoading && (
                <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
              )}
              Crop Image
            </Button>
          )}
        </div>
        <DialogClose asChild>
          <Button
            type="submit"
            form="createCampaignForm"
            disabled={isLoading}
            className="w-auto justify-self-end transition-transform duration-300 transform active:translate-y-3"
          >
            {isLoading && <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />}
            Submit
          </Button>
        </DialogClose>
        <DialogContent className="max-w-[350px] sm:max-w-[425px] md:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Crop Image</DialogTitle>
            <DialogDescription>
              Crop your achievement image here!
            </DialogDescription>
          </DialogHeader>
          <div className="min-h-[350px] sm:min-h-[425px] relative border-2">
            <Cropper
              image={image}
              crop={crop}
              zoom={zoom}
              aspect={150 / 55}
              onCropComplete={onCropComplete}
              onCropChange={setCrop}
              onZoomChange={setZoom}
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="submit" onClick={onCropSubmit}>
                {isLoading && (
                  <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                )}
                Save changes
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
