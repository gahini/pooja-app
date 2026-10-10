import { useState } from 'react'
import type { MouseEvent } from 'react'
import { ArrowRight } from 'lucide-react'

type BlogsProps = {
  onNavigate: (path: string) => void
}

const blogPosts = [
  {
    category: 'Planning',
    title: 'Planning a puja at home',
    description: 'Start with the occasion, your preferred date, and where the ceremony will take place.',
    article: 'Share these details in your enquiry, along with any family preferences or questions. The ceremony, timing, and preparations can then be discussed for your specific needs.',
    image: 'photo-1754276747848-fed9fe91d806',
    tags: ['Planning', 'At home', 'Puja'],
  },
  {
    category: 'Choosing a service',
    title: 'Finding the right ceremony',
    description: 'Not sure which service fits your occasion? Begin by describing what you are celebrating.',
    article: 'You do not need to know every ritual detail before reaching out. Tell Acharya about the occasion and what guidance you need, and discuss which service may be suitable for your family.',
    image: 'photo-1587271636175-90d58cdad458',
    tags: ['Services', 'Guidance', 'Planning'],
  },
  {
    category: 'Ceremony day',
    title: 'Preparing for a calm start',
    description: 'A clear plan and a point of contact can make the day easier for everyone involved.',
    article: 'After the ceremony details are confirmed, keep the agreed timing and preparation notes handy. If anything changes at the venue, let your point of contact know as early as possible.',
    image: 'photo-1680491025190-269d21ac8326',
    tags: ['Preparation', 'Ceremony', 'Family'],
  },
]

const allTags = [...new Set(blogPosts.flatMap((post) => post.tags))]

const Blogs = ({ onNavigate }: BlogsProps) => {
  const [selectedCategory, setSelectedCategory] = useState('All topics')
  const [selectedTag, setSelectedTag] = useState('')

  const visiblePosts = blogPosts.filter((post) => {
    const categoryMatches = selectedCategory === 'All topics' || post.category === selectedCategory
    const tagMatches = !selectedTag || post.tags.includes(selectedTag)
    return categoryMatches && tagMatches
  })

  function clearFilters() {
    setSelectedCategory('All topics')
    setSelectedTag('')
  }

  return (
    <section className="blog-section" id="blogs" aria-labelledby="blogs-title">
      <div className="blog-heading">
        <div>
          <p className="eyebrow">THE PUJA JOURNAL</p>
          <h2 id="blogs-title">A little more <em>understanding.</em></h2>
        </div>
        <p>Practical notes to help your family feel prepared when planning a ceremony.</p>
      </div>

      <div className="blog-filter">
        <label htmlFor="blog-category-filter">Filter articles</label>
        <select
          id="blog-category-filter"
          value={selectedCategory}
          onChange={(event) => {
            setSelectedCategory(event.target.value)
            setSelectedTag('')
          }}
        >
          <option>All topics</option>
          {blogPosts.map((post) => (
            <option key={post.category}>{post.category}</option>
          ))}
        </select>
        {(selectedCategory !== 'All topics' || selectedTag) && (
          <button className="blog-clear-filter" type="button" onClick={clearFilters}>
            Clear filters
          </button>
        )}
      </div>

      <div className="blog-layout">
        <aside className="blog-sidebar" aria-label="Blog hashtags and keywords">
          <h3>Explore by keyword</h3>
          <div className="blog-tags">
            {allTags.map((tag) => (
              <button
                className={selectedTag === tag ? 'blog-tag is-selected' : 'blog-tag'}
                type="button"
                key={tag}
                aria-pressed={selectedTag === tag}
                onClick={() => {
                  setSelectedTag(selectedTag === tag ? '' : tag)
                  setSelectedCategory('All topics')
                }}
              >
                #{tag.replaceAll(' ', '')}
              </button>
            ))}
          </div>
        </aside>

        <div className="blog-grid" aria-live="polite">
          {visiblePosts.map((post) => (
            <article className="blog-entry" key={post.title}>
              <img
                className="blog-image"
                src={`https://images.unsplash.com/${post.image}?auto=format&fit=crop&w=720&q=80`}
                alt=""
                loading="lazy"
              />
              <div className="blog-entry-copy">
                <p className="blog-category">{post.category.toUpperCase()}</p>
                <h3>{post.title}</h3>
                <p className="blog-excerpt">{post.description}</p>
                <details>
                  <summary>Read article</summary>
                  <p>{post.article}</p>
                </details>
                <a
                  className="blog-read-button"
                  href="/contact"
                  onClick={(event) => {
                    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
                    event.preventDefault()
                    onNavigate('/contact')
                  }}
                >
                  Ask about a puja <ArrowRight size={15} aria-hidden="true" />
                </a>
              </div>
            </article>
          ))}
          {visiblePosts.length === 0 && (
            <p className="blog-empty" role="status">No articles match these filters. Try another keyword.</p>
          )}
        </div>
      </div>
    </section>
  )
}

export default Blogs
