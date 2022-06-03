import { redirect } from '@remix-run/node'
import { WEEK_IN_SECONDS } from './.helpers'

export const loader = () => {
  return redirect('https://twitter.com/benjamminj', {
    headers: {
      'Cache-Control': `max-age=${WEEK_IN_SECONDS}, s-maxage=${WEEK_IN_SECONDS}, must-revalidate`,
    },
  })
}
