import { z } from 'zod'

export const ClippingSchema = z.object({
  url: z.string(),
  name: z.string(),
  tags: z.array(z.string()),
})

export type Clipping = z.infer<typeof ClippingSchema>
