import Link from 'next/link'
import { client, urlForImage } from '@/lib/sanity'

interface Post {
  _id: string
  title: string
  slug: { current: string }
  publishedAt: string
  excerpt: string
  mainImage: any
}

async function getPosts() {
  return client.fetch(
    `*[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      publishedAt,
      excerpt,
      mainImage
    }`
  )
}

export default async function BlogPage() {
  const posts: Post[] = await getPosts()

  if (posts.length === 0) {
    return (
      <main className="max-w-5xl mx-auto px-8 py-16">
        <h1 className="text-4xl font-bold mb-8">Blog</h1>
        <p className="text-gray-600">No posts yet. Add posts in Sanity Studio.</p>
      </main>
    )
  }

  return (
    <main className="max-w-5xl mx-auto px-8 py-16">
      <h1 className="text-4xl font-bold mb-12">Blog</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <Link key={post._id} href={`/blog/${post.slug.current}`} className="group">
            <article className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              {post.mainImage && (
                <div className="aspect-video bg-gray-200 relative">
                  <img
                    src={urlForImage(post.mainImage).width(400).height(300).url()}
                    alt={post.title}
                    className="object-cover w-full h-full"
                  />
                </div>
              )}
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2 group-hover:text-indigo-600 transition-colors">
                  {post.title}
                </h2>
                {post.publishedAt && (
                  <p className="text-sm text-gray-500 mb-3">
                    {new Date(post.publishedAt).toLocaleDateString('de-DE')}
                  </p>
                )}
                {post.excerpt && (
                  <p className="text-gray-600 line-clamp-3">{post.excerpt}</p>
                )}
              </div>
            </article>
          </Link>
        ))}
      </div>
    </main>
  )
}