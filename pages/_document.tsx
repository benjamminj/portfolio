import Document, { Head, Html, Main, NextScript } from 'next/document'

const trackerId = process.env.NEXT_PUBLIC_GA_TRACKING_ID

/**
 * Custom server-side rendering logic.
 *
 * Mostly, this provides a few links to the `head` that are used on every page and
 * makes sure that the critical CSS for the first pageview is rendered to avoid a
 * flash of unstyled content.
 */
export default class CustomDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          {/* Google Analytics */}
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${trackerId}`}
          />

          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', '${trackerId}');
            `,
            }}
          />
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
