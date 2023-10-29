'use client'

import * as React from 'react'
import { Loader2Icon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, useForm } from 'react-hook-form'
import * as z from 'zod'
import { createCampaignSchema } from '@/lib/validation/campaign'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import type { Database } from '@/lib/database.types'

import { addDays, format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'
import { DateRange } from 'react-day-picker'

import { cn } from '@/lib/utils'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../form'

type FormData = z.infer<typeof createCampaignSchema>

export function CreateCampaignForm() {
  const [isLoading, setIsLoading] = React.useState(false)
  const [date] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 14),
  })

  const form = useForm<FormData>({
    resolver: zodResolver(createCampaignSchema),
  })

  async function onSubmit(data: FormData) {
    setIsLoading(true)
    const supabase = createClientComponentClient<Database>()
    const token = (await supabase.auth.getSession()).data.session?.access_token

    const createResult = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}/campaign`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: token!,
        },
        body: JSON.stringify(data),
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
    return toast({
      title: 'Success!',
      description: 'The campaign was successfully created!',
      variant: 'default',
    })
  }

  return (
    <div className="grid gap-6 w-fill">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-3">
            <div className="grid gap-2.5">
              <Label htmlFor="name">Campaign Name</Label>
              <Input
                id="name"
                type="name"
                placeholder="Pick something catchy!"
                className="w-full"
                autoCapitalize="none"
                autoCorrect="off"
                required
                disabled={isLoading}
                {...form.register('name')}
              />
            </div>

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
                            !date && 'text-muted-foreground'
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date?.from ? (
                            date.to ? (
                              <>
                                {format(date.from, 'LLL dd, y')} -{' '}
                                {format(date.to, 'LLL dd, y')}
                              </>
                            ) : (
                              format(date.from, 'LLL dd, y')
                            )
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={date?.from}
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

            <Button
              type="submit"
              disabled={isLoading}
              className="w-auto justify-self-end transition-transform duration-300 transform active:translate-y-3"
            >
              {isLoading && (
                <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
              )}
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
