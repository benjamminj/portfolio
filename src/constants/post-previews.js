// @flow
type PostPreview = {
  publishDate: string,
  title: string,
  teaser: string,
  url: string,
}

// TODO -- find a way to make this site the source of truth so that most recent posts are automatically shown.
const postPreviews: Array<PostPreview> = [
  {
    title: 'Why Keeping a Code Journal Will Help You Become a Better Developer',
    publishDate: '10-24-2017',
    teaser: 'Over the past 3–4 months I’ve been keeping a code journal of my own, and I can personally vouch for the benefits that come from taking a couple',
    url: 'https://medium.com/@benjamin.d.johnson/why-keeping-a-code-journal-will-make-you-a-better-developer-8eb2093ea662'
  },
  {
    title: 'Learning a New Code Base: The Good, the Bad, and the Ugly',
    publishDate: '08-28-2017',
    teaser: 'At one point or another — whether you’re a seasoned pro or just getting started — you’re going to have to learn a new codebase. It’s always',
    url: 'https://medium.com/@benjamin.d.johnson/learning-a-new-codebase-the-good-the-bad-and-the-ugly-3617c044a873',
  },
  {
    title: '5 Myths About the Post-Bootcamp Job Search',
    publishDate: '08-14-2017',
    teaser: 'These days it seems like everybody is trying to break into tech. I was just there 2 months ago: and if you had told me that my job search',
    url: 'https://medium.com/@benjamin.d.johnson/5-myths-about-the-post-bootcamp-job-search-ffdcd51e6c17'
  }
]

export default postPreviews
