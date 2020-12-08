import { aboveDesktop, aboveTablet, darkMode } from '../styles/media'
import { fontSizes, palette, radius, spacing, weights } from '../styles/theme'

export const A = ({ href, children }) => (
  <a
    title={children}
    href={href}
    className={
      'px-0.5 font-medium text-gray-500 no-underline bg-transparent border-b-2 border-gray-200 rounded-sm border-b-solid hover:bg-gray-100 hover:text-gray-600 hover:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-800 dark:hover:bg-opacity-50 dark:hover:border-white'
    }
  >
    {children}
  </a>
)

export const P = ({ children }) => {
  return <p className="mb-6 text-base leading-7">{children}</p>
}

export const H2 = ({ children }) => {
  return <h2 className="mt-16 mb-6 text-3xl font-medium">{children}</h2>
}

export const H3 = ({ children }) => {
  return <h3 className="mt-12 mb-4 text-2xl font-medium">{children}</h3>
}

export const H4 = ({ children }) => {
  return <h4 className="mt-10 mb-4 text-xl font-medium">{children}</h4>
}

export const H5 = ({ children }) => {
  return <h5 className="mt-6 mb-4 text-lg font-medium">{children}</h5>
}

export const H6 = ({ children }) => {
  return <h6 className="mt-6 mb-4 text-base font-medium">{children}</h6>
}

export const Pre = ({ children }) => {
  return (
    <pre
      css={[
        {
          backgroundColor: palette.neutral_100,
          padding: spacing.l,
          marginTop: spacing.l,
          marginBottom: spacing.l,
          overflowX: 'auto',
          fontSize: fontSizes.m,

          // TODO: use gutter?
          // Or make gutter more "static" & "composable"?
          marginLeft: -1 * spacing.l,
          marginRight: -1 * spacing.l,
        },
        aboveTablet({
          borderRadius: radius.l,
          marginLeft: 0,
          marginRight: 0,
        }),
        aboveDesktop({
          marginLeft: -1 * spacing.l,
          marginRight: -1 * spacing.l,
        }),
        darkMode({
          backgroundColor: palette.neutral_900,
        }),
      ]}
    >
      {children}
    </pre>
  )
}

export const InlineCode = ({ children }) => {
  return (
    <code
      css={[
        {
          padding: spacing.xxs,
          borderRadius: radius.s,
          background: palette.neutral_100,
        },
        darkMode({
          backgroundColor: palette.neutral_900,
        }),
      ]}
    >
      {children}
    </code>
  )
}

export const Ol = ({ children }) => {
  return (
    <ol
      css={{
        counterReset: 'ol-count',
        paddingLeft: spacing.xl,
      }}
    >
      {children}
    </ol>
  )
}

export const Ul = ({ children }) => {
  return <ul css={{ paddingLeft: spacing.xl }}>{children}</ul>
}

export const Li = ({ children }) => {
  return (
    <li
      css={{
        position: 'relative',
        marginTop: spacing.m,
        marginBottom: spacing.m,
        paddingLeft: spacing.xs,
        fontSize: fontSizes.m,
        lineHeight: 1.7,

        ':before': {
          left: -1 * spacing.m,
          position: 'absolute',
        },

        'ol &': {
          ':before': {
            content: "counter(ol-count) '.'",
            counterIncrement: 'ol-count',
          },
        },

        'ul &': {
          ':before': {
            content: '"●"',
            fontSize: fontSizes.xs,
            lineHeight: `calc(${fontSizes.m} * 1.7)`,
          },
        },
      }}
    >
      {children}
    </li>
  )
}

export const Hr = () => {
  return (
    <hr
      css={[
        {
          marginTop: spacing['3xl'],
          marginBottom: spacing['3xl'],
          border: '1px solid',
          borderColor: palette.neutral_100,
        },
        darkMode({
          borderColor: palette.neutral_900,
        }),
      ]}
    />
  )
}
