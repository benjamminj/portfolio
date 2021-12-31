import { useEffect, useState } from 'react'
import { useDebouncedValue } from './useDebouncedValue'

export const Component = () => {
  const [posts, setPosts] = useState([])
  const [search, setValue] = useState('')
  const debouncedValue = useDebouncedValue(search)

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts?search=${debouncedValue}`)
      .then(res => res.json())
      .then(posts => setPosts(posts))
      .catch(() => setPosts([]))
  }, [debouncedValue])

  return (
    <div>
      <label>
        Search
        <input
          name="search"
          value={search}
          onChange={ev => setValue(ev.target.value)}
        />
      </label>

      <div>{posts.length} posts found</div>
    </div>
  )
}
