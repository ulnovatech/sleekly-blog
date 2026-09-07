import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import matter from 'front-matter'
import { glob } from 'glob'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const postsDir = path.resolve(__dirname, '../content/posts')
const outDir = path.resolve(__dirname, '../src/generated')
const outFile = path.join(outDir, 'posts-index.json')

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

const files = await glob('*.md', { cwd: postsDir })
const posts = []

for (const file of files) {
  const raw = fs.readFileSync(path.join(postsDir, file), 'utf8')
  const { attributes } = matter(raw)
  if (attributes.draft === true || attributes.published === false) continue
  const slug = file.replace(/\.md$/, '')

  posts.push({
    slug,
    frontmatter: {
      title: attributes.title || 'Untitled',
      description: attributes.description || 'No description available',
      date: attributes.date || '',
      author: attributes.author || 'ULN Team',
      tags: normalizeTags(attributes.tags),
      image: attributes.image || '',
    },
  })
}

posts.sort((a, b) => {
  const dateA = a.frontmatter.date ? new Date(a.frontmatter.date) : new Date(0)
  const dateB = b.frontmatter.date ? new Date(b.frontmatter.date) : new Date(0)
  return dateB - dateA
})

fs.mkdirSync(outDir, { recursive: true })
fs.writeFileSync(outFile, `${JSON.stringify(posts, null, 2)}\n`)
console.log(`Generated ${posts.length} post entries → src/generated/posts-index.json`)
