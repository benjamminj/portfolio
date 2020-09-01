import { jsx } from '@emotion/core'
import { Link } from '../components'
import { Tag } from '../components/Tag'
import { Text } from '../components/Text'
import { palette } from '../styles/theme'
import { aboveTablet } from '../styles/media'
/** @jsx jsx */ jsx

interface PostListItemProps {
  href: string
  title: string
  tags?: string[]
  date: string
}

export const PostListItem = ({
  tags = [],
  title,
  href,
  date,
}: PostListItemProps) => {
  return (
    <div
      css={[
        {
          paddingTop: 12,
          paddingBottom: 12,
        },
        aboveTablet({
          display: 'grid',
          gridTemplateColumns: 'auto 1fr',
          gridTemplateRows: 'auto auto',
          gridColumnGap: 16,
        }),
      ]}
    >
      <div>
        <Text
          variant={['caption', 'body']}
          css={{
            fontVariantNumeric: 'tabular-nums',
            color: palette.neutral_700,
            verticalAlign: 'sub',
          }}
        >
          {date}
        </Text>
      </div>

      <h2>
        <Link
          href="/blog/[slug]"
          as={href}
          css={{
            textDecoration: 'none',
            padding: 8,
            margin: -8,
            ':hover, :focus': {
              textDecoration: 'underline',
            },
          }}
        >
          <Text variant="subtitle">{title}</Text>
        </Link>
      </h2>

      {tags.length > 0 && (
        <div css={{ gridRow: 2, gridColumn: 2 }}>
          {tags.map(tag => (
            <Tag key={tag} tag={tag} />
          ))}
        </div>
      )}
    </div>
  )
}
