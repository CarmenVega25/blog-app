export const dynamic = 'force-dynamic'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

export default async function Home() {
  const { data: posts } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <main className="max-w-xl mx-auto px-8 py-12">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-4xl font-serif italic tracking-tight text-white">
            Carmen's Journal
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>
        <Link
          href="/admin"
          className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm px-4 py-2 rounded-full transition-colors duration-200"
        >
          + New Post
        </Link>
      </div>

      {/* Empty state */}
      {!posts?.length && (
        <p className="text-gray-600 italic">No entries yet. Write your first one.</p>
      )}

      {/* Post list */}
      {posts?.map(post => (
        <Link href={`/posts/${post.slug}`} key={post.id}>
          <div className="group py-6 border-b border-gray-800 hover:pl-3 transition-all duration-200">
            <h2 className="text-lg font-semibold text-white group-hover:text-indigo-400 transition-colors duration-200">
              {post.title}
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              {new Date(post.created_at).toLocaleDateString('en-US', {
                month: 'long', day: 'numeric', year: 'numeric'
              })}
            </p>
          </div>
        </Link>
      ))}
    </main>
  )
}