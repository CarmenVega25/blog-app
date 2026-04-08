export const dynamic = 'force-dynamic'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

export default async function Home() {
  const { data: posts } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <main className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">The Best Blog</h1>
      {!posts?.length && <p className="text-gray-500">No posts yet.</p>}
      {posts?.map(post => (
        <div key={post.id} className="mb-6 border-b pb-6">
          <Link href={`/posts/${post.slug}`}>
            <h2 className="text-xl font-semibold hover:underline">{post.title}</h2>
          </Link>
          <p className="text-gray-500 text-sm mt-1">{post.created_at?.slice(0, 10)}</p>
        </div>
      ))}
    </main>
  )
}