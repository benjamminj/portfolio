import { redirect } from '@remix-run/node'

const WEEK_IN_SECONDS = 604800

export const loader = () => {
  return redirect('mailto:benjamin.d.johnson@icloud.com', {
    headers: {
      'Cache-Control': `max-age=${WEEK_IN_SECONDS}, s-maxage=${WEEK_IN_SECONDS}, must-revalidate`,
    },
  })
}
