import postsFiles from './read-posts-dir'

const blogs = postsFiles
  .keys()
  .map(path => {
    const postData = postsFiles(path)
    const id = path.slice(2).slice(0, -3)

    return {
      ...postData,
      id,
      path: path.slice(2), // remove the `./` at beginning of the path
      date: new Date(postData.date || Date.now())
    }
  })
  .sort((post1, post2) => post1.date > post2.date)

export default blogs
