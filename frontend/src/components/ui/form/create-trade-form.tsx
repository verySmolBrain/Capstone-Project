'use client'

import * as React from 'react'
import { Loader2Icon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import useSWR from 'swr'
import { createTradeSchema } from '@/lib/validation/trade'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ScrollArea } from '@/components/ui/scroll-area'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import type { Database } from '@/lib/database.types'
import { Input } from '../input'

type FormData = z.infer<typeof createTradeSchema>

export function CreateTradeForm(props: {
  setOpen: (a: boolean) => void
  user?: Profile
}) {
  const [isLoading, setIsLoading] = React.useState(false)
  const [collectables, setCollectables] = React.useState<Collectable[]>()
  const [profiles, setProfiles] = React.useState<Profile[]>()
  const [sellOrBuy, setSellOrBuy] = React.useState<boolean>(false)
  const [ownProfile, setOwnProfile] = React.useState<Profile>()

  const form = useForm<FormData>({
    mode: 'onChange',
    resolver: zodResolver(createTradeSchema),
  })

  async function onSubmit(data: FormData) {
    setIsLoading(true)
    const supabase = createClientComponentClient<Database>()
    const token = (await supabase.auth.getSession()).data.session?.access_token

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}/trade`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: token!,
        },
        body: JSON.stringify({ ...data, sellOrBuy: sellOrBuy }),
      }
    )

    setIsLoading(false)

    if (!response?.ok) {
      console.log(response)
      return toast({
        title: 'Uh Oh! Something went wrong!',
        description: response?.statusText,
        variant: 'destructive',
      })
    }
    props.setOpen(false)

    return toast({
      title: 'Success!',
      description: `You have successfully created a trade!`,
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

  const { data: collectableData } = useSWR(
    `${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}/collectable`,
    fetcher
  )

  const { data: profilesData } = useSWR(
    `${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}/profile/role/USER`,
    fetcher
  )

  const { data: ownProfileData } = useSWR(
    `${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}/profile`,
    fetcher
  )

  React.useEffect(() => {
    if (collectableData) {
      setCollectables(collectableData)
    }
    if (ownProfileData) {
      setOwnProfile(ownProfileData)
    }
    if (profilesData && ownProfile) {
      const filteredProfiles = profilesData.filter(
        (profile: Profile) => profile.name !== ownProfile.name
      )

      setProfiles(filteredProfiles)
    }
  }, [collectableData, profilesData, ownProfileData, ownProfile])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} id="createTradeForm">
        <div className="grid gap-2 max-h-[600px]">
          <FormField
            control={form.control}
            name="collectableId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Collectable Name</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="">
                      <SelectValue placeholder="Select a collectable to trade" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="max-h-80">
                    <ScrollArea>
                      {collectables?.map((collectable) => (
                        <SelectItem
                          key={collectable.name}
                          value={collectable.name}
                        >
                          {collectable.name}
                        </SelectItem>
                      ))}
                    </ScrollArea>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="userId"
            defaultValue={props.user?.id}
            render={({ field }) => (
              <FormItem>
                <FormLabel>User</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="">
                      <SelectValue placeholder="Select a user to trade with" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="max-h-80">
                    <ScrollArea>
                      {profiles?.map((profile) => (
                        <SelectItem key={profile.id} value={profile.id}>
                          {profile.name}
                        </SelectItem>
                      ))}
                    </ScrollArea>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            defaultValue={1}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input
                    id="price"
                    type="number"
                    placeholder="Price"
                    className="w-full"
                    min="1"
                    step="any"
                    required
                    disabled={isLoading}
                    {...field}
                    {...form.register('price')}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-row gap-4 justify-center pt-4">
          <Button
            type="button"
            variant={sellOrBuy ? 'ghost' : 'secondary'}
            onClick={() => setSellOrBuy(false)}
          >
            Buy
          </Button>
          <Button
            type="button"
            variant={sellOrBuy ? 'secondary' : 'ghost'}
            onClick={() => setSellOrBuy(true)}
          >
            Sell
          </Button>
        </div>

        <Button
          type="submit"
          form="createTradeForm"
          disabled={isLoading}
          className="w-auto justify-self-end transition-transform duration-300 transform active:translate-y-3 mt-2"
        >
          {isLoading && <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />}
          Trade Now!
        </Button>
      </form>
    </Form>
  )
}
