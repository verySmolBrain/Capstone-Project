import * as z from 'zod'

export const addCollectionCampaignSchema = z.object({
  name: z.string(),
})
