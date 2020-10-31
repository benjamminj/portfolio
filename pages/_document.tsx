import Document, { Head, Html, Main, NextScript } from 'next/document'
import { extractCritical } from 'emotion-server'

const trackerId = process.env.NEXT_PUBLIC_GA_TRACKING_ID

/**
 * Custom server-side rendering logic.
 *
 * Mostly, this provides a few links to the `head` that are used on every page and
 * makes sure that the critical CSS for the first pageview is rendered to avoid a
 * flash of unstyled content.
 */
export default class CustomDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)

    // Pull out the critical path CSS from the rendered HTML
    const styles = extractCritical(initialProps.html)

    return {
      ...initialProps,
      styles: (
        <>
          {initialProps.styles}
          {/** And then we add the critical CSS into the head of the document */}
          <style
            data-emotion-css={styles.ids.join(' ')}
            dangerouslySetInnerHTML={{ __html: styles.css }}
          />
        </>
      ),
    }
  }

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
