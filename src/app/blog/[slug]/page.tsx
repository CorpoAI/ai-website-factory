import { getPost } from '@/lib/sanity'
import { urlForImage } from '@/lib/sanity'
import Link from 'next/link'

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug)

  if (!post) {
    return (
      <main className="max-w-3xl mx-auto px-8 py-16">
        <Link href="/blog" className="text-indigo-600 hover:underline mb-8 inline-block">
          ← Back to Blog
        </Link>
        <h1 className="text-4xl font-bold mb-8">Post not found</h1>
        <p className="text-gray-600">This post may have been removed or the URL is incorrect.</p>
      </main>
    )
  }

  return (
    <main className="max-w-3xl mx-auto px-8 py-16">
      <Link href="/blog" className="text-indigo-600 hover:underline mb-8 inline-block">
        ← Back to Blog
      </Link>
      
      {post.mainImage && (
        <div className="aspect-video bg-gray-200 rounded-lg mb-8 overflow-hidden">
          <img
            src={urlForImage(post.mainImage).width(800).height(450).url()}
            alt={post.title}
            className="object-cover w-full h-full"
          />
        </div>
      )}

      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      
      {post.publishedAt && (
        <p className="text-gray-500 mb-8">
          {new Date(post.publishedAt).toLocaleDateString('de-DE')}
          {post.author && ` · ${post.author}`}
        </p>
      )}

      {post.excerpt && (
        <p className="text-xl text-gray-600 mb-8">{post.excerpt}</p>
      )}

      {post.body && (
        <div className="prose prose-lg max-w-none">
          {post.body.map((block: any, i: number) => {
            if (block._type === 'block') {
              return (
                <p key={i}>
                  {block.children?.map((child: any) => child.text).join('')}
                </p>
              )
            }
            return null
          })}
        </div>
      )}

      {post.categories && post.categories.length > 0 && (
        <div className="mt-12 pt-8 border-t">
          <p className="text-gray-500">
            Categories: {post.categories.join(', ')}
          </p>
        </div>
      )}
    </main>
  )
}