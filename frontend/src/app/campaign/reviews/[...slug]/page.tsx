import React from 'react'
import { GeneralNavBar } from '@/components/ui/navbar/general-navbar'
import { TypographyH2 } from '@/components/ui/assets/typography-h2'
import { CampaignReviewList } from '@/components/ui/page/campaign-review-list'

export default function ReviewListPage({
  params,
}: {
  params: { slug: string }
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <GeneralNavBar />
      <section className="space pb-8 pt-6 md:pb-12 md:pt-10">
        <div className="container flex flex-col gap-4">
          <TypographyH2 text="Campaign Reviews" />
          <CampaignReviewList campaign={params.slug} />
        </div>
      </section>
    </div>
  )
}
