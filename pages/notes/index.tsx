import { compareDesc, format } from 'date-fns'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import { Layout } from '../../components/Layout'
import { PostListItem } from '../../components/PostListItem'
import { Tag, TagType } from '../../components/Tag'
import { NOTES_BASE_PATH } from '../../lib/constants'
import { getPostFilePaths } from '../../lib/getPostFilePaths'
import { parsePostFile } from '../../lib/parsePostFile'
import { slugifyPost } from '../../lib/slugifyPost'
import { PostFrontmatter } from '../../lib/types'

type NotePreview = Pick<PostFrontmatter, 'title' | 'tags'> & {
  date: string
  href: string
}

interface NotesListPageProps {
  notes: NotePreview[]
}

const NoteTag = ({ tag }) => <Tag tag={tag} type={TagType.TEXT} />

export const getStaticProps: GetStaticProps<NotesListPageProps> = async () => {
  const noteFiles = getPostFilePaths(NOTES_BASE_PATH)

  const notes = []
  for (const filePath of noteFiles) {
    try {
      const slug = slugifyPost(filePath)
      const { frontmatter } = parsePostFile(filePath, NOTES_BASE_PATH)

      const note = {
        ...frontmatter,
        href: `/notes/${slug}`,
      }

      notes.push(note)
    } catch (error) {
      console.error(`Error reading frontmatter of "${filePath}"`, error)
    }
  }

  const sortedNotes = notes
    .sort((a, b) => compareDesc(a.date, b.date))
    .map(p => ({ ...p, date: format(p.date, 'yyyy-MM-dd') }))

  return {
    props: {
      notes: sortedNotes,
    },
  }
}

const NotesListPage = ({ notes }: NotesListPageProps) => {
  return (
    <>
      <Layout title="Notes">
        <Head>
          <meta name="robots" content="noindex" />
        </Head>
        <main>
          <ul>
            <div className="space-y-2">
              {notes.map(note => {
                return (
                  <li key={note.href} className="w-full">
                    <PostListItem post={note} tagComponent={NoteTag} />
                  </li>
                )
              })}
            </div>
          </ul>
        </main>
      </Layout>
    </>
  )
}

export default NotesListPage
