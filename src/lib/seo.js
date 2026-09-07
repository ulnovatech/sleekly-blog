/** Absolute public URLs for the blog SPA (basename /blog). */

export const PUBLIC_SITE_URL = 'https://sleeklybuilt.pro'
export const DEFAULT_OG_IMAGE = `${PUBLIC_SITE_URL}/assets/img/sleeklybuilt-logo.png`

/** Router paths that must not be treated as post slugs. */
export const RESERVED_BLOG_SLUGS = [
  'about',
  'contact',
  'search',
  'tags',
  'optimizer',
  'blog',
  'admin',
  'dashboard',
  'manage-posts',
]

export function publicBlogUrl(pathname = '/') {
  const base = PUBLIC_SITE_URL.replace(/\/$/, '')
  if (!pathname || pathname === '/') return `${base}/blog/`
  const path = pathname.startsWith('/') ? pathname : `/${pathname}`
  if (path.startsWith('/blog')) return `${base}${path}`
  return `${base}/blog${path}`
}

export function absolutePublicUrl(maybePath) {
  if (!maybePath) return DEFAULT_OG_IMAGE
  const value = String(maybePath).trim()
  if (!value) return DEFAULT_OG_IMAGE
  if (/^https?:\/\//i.test(value)) return value
  const base = PUBLIC_SITE_URL.replace(/\/$/, '')
  return `${base}${value.startsWith('/') ? value : `/${value}`}`
}
