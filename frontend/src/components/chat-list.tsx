'use client'

import * as React from 'react'

export function ChatList() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    const chats = async () => {
      try {
        const res = await fetch('/chats', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })

        console.log(res)
      } catch (error) {
        console.log('Error fetching data', error)
      }
    }
    chats();
  })
  console.log(data)

  if (!data) {
    return (
      <div className="flex flex-col gap-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          You&apos;ve noone to talk to 😔
        </h1>
        <p className="text-sm text-muted-foreground">
          Try looking around some campaigns
        </p>
      </div>
    )
  }

  return (
    <div>
      PLACEHOLDER
    </div>
  )
}