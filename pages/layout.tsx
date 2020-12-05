import { Box } from '../components/Box'
import { Container } from '../components/Container'
import { Header } from '../components/Header'
import { Layout } from '../components/Layout'
import { Stack } from '../components/Stack'
import { darkMode } from '../styles/media'
import {
  colors,
  fonts,
  fontSizes,
  palette,
  spacing,
  weights,
} from '../styles/theme'
import { textMaxWidth } from '../styles/variables'

const PageWrapper = ({ children }) => {
  return (
    <div
      css={[
        {
          minHeight: '100vh',
          backgroundColor: palette.white,
        },
        darkMode({
          color: palette.white,
          backgroundColor: palette.neutral_800,
        }),
      ]}
    >
      {children}
    </div>
  )
}

const bgLight = palette.primary_100
const bgDark = palette.primary_700

const LayoutPage = () => {
  return (
    <Layout header={null} containerComponent={PageWrapper}>
      <div css={{ position: 'relative' }}>
        <div css={{ position: 'absolute', top: 0, left: 0, right: 0 }}>
          <Header />
        </div>

        <Box
          paddingTop="8xl"
          paddingBottom="xl"
          display="flex"
          minHeight={spacing['6xl']}
          alignItems="flex-end"
          css={[
            { backgroundColor: bgLight },
            darkMode({
              backgroundColor: bgDark,
            }),
          ]}
        >
          <div
            css={{
              width: textMaxWidth,
              margin: '0 auto',
              padding: spacing.gutter,
            }}
          >
            <Stack>
              <h1
                css={{
                  fontSize: fontSizes['3xl'],
                  fontFamily: fonts.primary,
                  fontWeight: weights.bold,
                }}
              >
                This is the normal title
              </h1>

              <h2
                css={[
                  {
                    textTransform: 'lowercase',
                    fontSize: fontSizes['xl'],
                    fontWeight: weights.normal,
                    color: palette.neutral_700,
                  },
                  darkMode({
                    color: palette.neutral_200,
                  }),
                ]}
              >
                ...and a subtitle!
              </h2>
            </Stack>
          </div>
        </Box>
      </div>

      <Box>
        <div
          css={{
            maxWidth: textMaxWidth,
            margin: '0 auto',
            padding: spacing.gutter,
          }}
        >
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
            officiis deleniti maxime eius doloribus vero exercitationem quod
            voluptatibus aperiam ab fuga ducimus, eum dolorem voluptatem
            perspiciatis fugiat maiores in totam!
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
            officiis deleniti maxime eius doloribus vero exercitationem quod
            voluptatibus aperiam ab fuga ducimus, eum dolorem voluptatem
            perspiciatis fugiat maiores in totam!
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
            officiis deleniti maxime eius doloribus vero exercitationem quod
            voluptatibus aperiam ab fuga ducimus, eum dolorem voluptatem
            perspiciatis fugiat maiores in totam!
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
            officiis deleniti maxime eius doloribus vero exercitationem quod
            voluptatibus aperiam ab fuga ducimus, eum dolorem voluptatem
            perspiciatis fugiat maiores in totam!
          </p>
          <div css={{ marginTop: spacing.xxl }}>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Reiciendis officiis deleniti maxime eius doloribus vero
              exercitationem quod voluptatibus aperiam ab fuga ducimus, eum
              dolorem voluptatem perspiciatis fugiat maiores in totam!
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Reiciendis officiis deleniti maxime eius doloribus vero
              exercitationem quod voluptatibus aperiam ab fuga ducimus, eum
              dolorem voluptatem perspiciatis fugiat maiores in totam!
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Reiciendis officiis deleniti maxime eius doloribus vero
              exercitationem quod voluptatibus aperiam ab fuga ducimus, eum
              dolorem voluptatem perspiciatis fugiat maiores in totam!
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Reiciendis officiis deleniti maxime eius doloribus vero
              exercitationem quod voluptatibus aperiam ab fuga ducimus, eum
              dolorem voluptatem perspiciatis fugiat maiores in totam!
            </p>
          </div>
        </div>
      </Box>
    </Layout>
  )
}

export default LayoutPage
