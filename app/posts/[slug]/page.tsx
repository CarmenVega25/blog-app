import Link from 'next/link'
import { supabase } from '@/lib/supabase'

export default async function PostPage({ params }: { params: { slug: string } }) {
  const { data: post } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', params.slug)
    .single()

  if (!post) return <p className="p-8">Post not found.</p>

  return (
    <main className="max-w-2xl mx-auto p-8">
      <Link href="/" className="text-sm text-gray-500 hover:underline mb-8 block">← Back</Link>
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-500 text-sm mb-8">{post.created_at?.slice(0, 10)}</p>
      <div className="leading-relaxed whitespace-pre-wrap">{post.content}</div>
    </main>
  )
}