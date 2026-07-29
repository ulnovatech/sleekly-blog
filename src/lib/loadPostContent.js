import matter from 'front-matter'

const postModules = import.meta.glob('../../content/posts/*.md', {
  query: '?raw',
  import: 'default',
})

function normalizeTags(raw) {
  if (!raw) return []
  if (Array.isArray(raw)) {
    return raw.map((tag) => String(tag).trim()).filter(Boolean)
  }
  if (typeof raw === 'string') {
    return raw.split(',').map((tag) => tag.trim()).filter(Boolean)
  }
  return []
}

function modulePathForSlug(slug) {
  return Object.keys(postModules).find((filePath) => filePath.endsWith(`/${slug}.md`))
}

export async function loadPostContent(slug) {
  const filePath = modulePathForSlug(slug)
  if (!filePath) return null

  const raw = await postModules[filePath]()
  const { attributes, body } = matter(raw)

  return {
    slug,
    frontmatter: {
      title: attributes.title || 'Untitled',
      description: attributes.description || 'No description available',
      date: attributes.date || '',
      author: attributes.author || 'SleeklyBuilt Team',
      tags: normalizeTags(attributes.tags),
      image: attributes.image || '',
    },
    content: body,
  }
}
