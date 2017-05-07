// Will need to move this into initial state when a better state management is set up
const webpackRequireContext = require.context(
  '!markdown-with-front-matter!_posts',
  false,
  /\.md$/
)

const blogs = webpackRequireContext
  .keys()
  .map(path => {
    const postData = webpackRequireContext(path)
    const id = postData.id || path.slice(2).slice(0, -3)

    console.log(id)

    return {
      ...postData,
      id,
      path: path.slice(1), // remove the `.` at beginning of the path
      date: new Date(postData.date || Date.now())
    }
  })
  .sort((post1, post2) => post1.date > post2.date)

export default blogs
