'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { CalendarIcon, Loader2Icon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import * as React from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { toast } from '@/components/ui/use-toast'
import { DateRange, isDateRange } from 'react-day-picker'
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
import { Tag, TagInput } from '../tags'
import { Switch } from '@/components/ui/switch'
import useSWR from 'swr'
import dayjs from 'dayjs'

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
  range: z
    .custom<DateRange>(isDateRange, 'Please select a valid date range')
    .default({
      from: new Date(),
      to: dayjs().add(14, 'day').toDate(),
    }),
  tags: z.array(
    z.object({
      id: z.string(),
      text: z.string(),
    })
  ),
  isActive: z.boolean().default(false).optional(),
})

export function EditCampaignForm(props: {
  name: string
  setOpen: (a: boolean) => void
  mutate: () => void
}) {
  const [campaign, setCampaign] = React.useState<Campaign>()
  const [isLoading, setIsLoading] = React.useState(false)
  const [tags, setTags] = React.useState<Tag[]>([])
  const [imageAvailable, setImageAvailable] = React.useState<boolean>(false)
  const [image, setImage] = React.useState<string>('')
  const [crop, setCrop] = React.useState({ x: 0, y: 0 })
  const [croppedAreaPixels, setCroppedAreaPixels] = React.useState<Area | null>(
    null
  )
  const [zoom, setZoom] = React.useState(1)

  const campaignTags: Tag[] = React.useMemo(() => {
    return campaign ? campaign?.tags.map((tag) => ({ id: tag, text: tag })) : []
  }, [campaign])

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
      `${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}/campaign/${props.name}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          authorization: token!,
        },
        body: JSON.stringify({
          image: image,
          startDate: data.range.from,
          endDate: data.range.to,
          tags: data.tags.map((tag) => tag.text),
          isActive: data.isActive,
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

    props.mutate()
    props.setOpen(false)
    return toast({
      title: 'Success!',
      description: 'The campaign was successfully updated!',
      variant: 'default',
    })
  }

  const fetcher = async (url: string) => {
    const supabase = createClientComponentClient<Database>()
    const session = (await supabase.auth.getSession()).data.session
    const token = session?.access_token

    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: token!,
      },
    })

    if (res?.ok) {
      return await res.json()
    }
  }
  const { data: campaignData } = useSWR(
    `${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}/campaign/${props.name}`,
    fetcher
  )

  React.useEffect(() => {
    if (campaignData) {
      setCampaign(campaignData)
    }
    if (!tags.length) {
      setTags(campaignTags)
    }
  }, [campaignData, campaignTags, tags.length])

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
              name="tags"
              render={({ field }) => (
                <FormItem className="flex flex-col items-start">
                  <FormLabel className="text-left">Tags</FormLabel>
                  <FormControl>
                    <TagInput
                      {...field}
                      placeholder="Enter a tag"
                      tags={tags}
                      className="w-full"
                      setTags={(newTags) => {
                        setTags(newTags)
                        form.setValue('tags', newTags as [Tag, ...Tag[]])
                      }}
                    />
                  </FormControl>
                  <FormDescription>
                    These are the keywords that will be used to categorize your
                    campaign. Try featured or popular!
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="range"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Campaign Duration</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          id="date"
                          variant={'outline'}
                          className={cn(
                            'w-[300px] justify-start text-left font-normal',
                            !field.value && 'text-muted-foreground'
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value?.from ? (
                            field.value?.to ? (
                              <>
                                {dayjs(field.value.from).format('MMM D, YYYY')}{' '}
                                - {dayjs(field.value.to).format('MMM D, YYYY')}
                              </>
                            ) : (
                              dayjs(field.value.from).format('MMM D, YYYY')
                            )
                          ) : (
                            <>
                              {dayjs().format('MMM D, YYYY')} -{' '}
                              {dayjs().add(7, 'days').format('MMM D, YYYY')}
                            </>
                          )}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={field.value?.from}
                        selected={field.value}
                        onSelect={field.onChange}
                        numberOfMonths={2}
                        disabled={(date) => date < new Date()}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>The length of the campaign.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isActive"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Start Campaign Now
                    </FormLabel>
                    <FormDescription>
                      Mark your campaign as ready to go now!
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="image"
              render={({ field: { onChange } }) => (
                <>
                  <FormItem>
                    <FormLabel>Campaign Image</FormLabel>
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
                      Choose an image for your campaign.
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
              Crop your campaign image here!
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
