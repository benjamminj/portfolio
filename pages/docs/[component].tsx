import { textVariants, Text, TextVariantToken } from '../../src/components/Text'
import { jsx, InterpolationWithTheme } from '@emotion/core'
import { ReactNode } from 'react'
import { Link, Layout } from '../../src/components'
import { palette } from '../../src/styles/theme'
import { MarkdownWrapperStyles } from '../../src/components/Markdown'
/** @jsx jsx */ jsx

const SectionHeading = ({ children }: { children: ReactNode }) => {
  return (
    <div css={{ paddingTop: 32, paddingBottom: 8, borderBottom: '4px solid' }}>
      <Text variant="h3">{children}</Text>
    </div>
  )
}

const ComponentContainer = ({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) => {
  return (
    <div className={className} css={{ paddingTop: 32, paddingBottom: 32 }}>
      {children}
    </div>
  )
}

const ColorSwatch = ({ hex, name }) => {
  const checkerboardColor = `rgba(0,0,0,0.1)`

  return (
    <div>
      <div
        css={{
          backgroundImage: `linear-gradient(45deg, ${checkerboardColor} 25%, transparent 25%), linear-gradient(-45deg, ${checkerboardColor} 25%, transparent 25%), linear-gradient(45deg, transparent 75%, ${checkerboardColor} 75%), linear-gradient(-45deg, transparent 75%, ${checkerboardColor} 75%)`,
          backgroundSize: `20px 20px`,
          backgroundPosition: `0 0, 0 10px, 10px -10px, -10px 0px`,
          height: 128,
          borderRadius: 'var(--border-radius-l)',
        }}
      >
        <div
          css={{
            background: hex,
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'flex-end',
            padding: 8,
            height: '100%',
            width: '100%',
            boxShadow: '0 0 2px inset rgba(0,0,0,0.5)',
            borderRadius: 'var(--border-radius-l)',
          }}
        >
          <Text css={{ color: palette.white, backgroundColor: 'inherit' }}>
            Aa
          </Text>

          <Text
            css={{
              marginLeft: 8,
              color: palette.black,
              backgroundColor: 'inherit',
            }}
          >
            Bb
          </Text>
        </div>
      </div>

      <Text variant="caption">
        {name}: {hex || 'none'}
      </Text>
    </div>
  )
}

const SwatchRow = ({
  swatches,
  name,
}: {
  swatches: (keyof typeof palette)[]
  name: string
}) => {
  return (
    <div css={{ paddingTop: 16 }}>
      <div css={{ paddingTop: 16, paddingBottom: 16 }}>
        <Text variant="h5">{name}</Text>
      </div>

      <div
        css={{
          display: 'grid',
          gridGap: 8,
          gridTemplateColumns: `repeat(${Math.max(5, swatches.length)}, 1fr)`,
        }}
      >
        {swatches.map(swatch => (
          <ColorSwatch key={swatch} name={swatch} hex={palette[swatch]} />
        ))}
      </div>
    </div>
  )
}

const SwatchGroup = ({ name, prefix }: { name: string; prefix: string }) => {
  const swatchKeys = Object.keys(palette) as (keyof typeof palette)[]
  return (
    <SwatchRow
      name={name}
      swatches={swatchKeys.filter(key => key.includes(prefix))}
    />
  )
}

const DesignSystem = () => {
  return (
    <Layout>
      <div css={{ maxWidth: '80ch', margin: '0 auto' }}>
        <SectionHeading>Typography</SectionHeading>
        <ComponentContainer>
          {Object.keys(textVariants).map((variant: TextVariantToken) => (
            <div
              css={{
                padding: 32,
                border: '1px dashed black',
              }}
            >
              <Text variant={variant}>
                {variant}: The quick brown fox jumps over the lazy dog
              </Text>
            </div>
          ))}
        </ComponentContainer>

        <SectionHeading>Links</SectionHeading>

        <ComponentContainer>
          <div css={{ marginTop: 32 }}>
            <Link href="#">Sample link</Link>
          </div>
          <div css={{ marginTop: 32 }}>
            <Link external href="https://google.com">
              External link (google)
            </Link>
          </div>
          <div css={{ marginTop: 32 }}>
            <Text>
              And a{' '}
              <Link external href="https://google.com">
                link that is part
              </Link>{' '}
              of a sentance.
            </Text>
          </div>
        </ComponentContainer>

        <SectionHeading>Unordered lists</SectionHeading>
        <ComponentContainer>
          <MarkdownWrapperStyles>
            <ul>
              <li>
                this is the first item. <br /> it has two lines
              </li>
              <li>now this is the second item.</li>
              <li>finally, the third item.</li>
            </ul>
          </MarkdownWrapperStyles>
        </ComponentContainer>

        <SectionHeading>Ordered lists</SectionHeading>
        <ComponentContainer>
          <MarkdownWrapperStyles>
            <ol>
              <li>this is the first item.</li>
              <li>now this is the second item.</li>
              <li>finally, the third item.</li>
            </ol>
          </MarkdownWrapperStyles>
        </ComponentContainer>

        <SectionHeading>Colors</SectionHeading>
        <ComponentContainer>
          <SwatchRow swatches={['black', 'white']} name="top-level" />
          <SwatchGroup name="neutral" prefix="neutral_" />
          <SwatchGroup name="primary" prefix="primary_" />
          <SwatchGroup name="accent 1" prefix="accent1_" />
          <SwatchGroup name="success" prefix="success_" />
          <SwatchGroup name="warning" prefix="warning_" />
          <SwatchGroup name="error" prefix="error_" />
        </ComponentContainer>
      </div>
    </Layout>
  )
}

export const getStaticPaths = () => {
  const paths = []

  if (process.env.BUILD_DOCS === 'true') {
    paths.push({ params: { component: 'design-system' } })
  }

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps = () => {
  return {
    props: {},
  }
}

export default DesignSystem
