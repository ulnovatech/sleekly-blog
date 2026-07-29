import { createContext, useMemo } from 'react'
import postsIndex from '../generated/posts-index.json'

export const BlogContext = createContext()

export function BlogProvider({ children }) {
  const value = useMemo(
    () => ({
      posts: postsIndex,
      loading: false,
    }),
    [],
  )

  return <BlogContext.Provider value={value}>{children}</BlogContext.Provider>
}
