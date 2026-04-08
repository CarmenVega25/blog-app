import Link from 'next/link'
import { supabase } from '@/lib/supabase'

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const { data: post } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .single()

  if (!post) return (
    <main className="max-w-xl mx-auto px-8 py-12">
      <p className="text-gray-500 italic">Post not found.</p>
    </main>
  )

  return (
    <main className="max-w-xl mx-auto px-8 py-12">

      {/* Back link */}
      <Link href="/" className="text-sm text-gray-500 hover:text-indigo-400 transition-colors duration-200 mb-10 block">
        ← Back
      </Link>

      {/* Title */}
      <h1 className="font-serif italic text-4xl font-bold text-white mb-3 leading-tight">
        {post.title}
      </h1>

      {/* Date */}
      <p className="text-gray-500 text-sm mb-10">
        {new Date(post.created_at).toLocaleDateString('en-US', {
          weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'
        })}
      </p>

      {/* Divider */}
      <div className="border-t border-gray-800 mb-10" />

      {/* Body */}
      <div className="text-gray-300 leading-8 whitespace-pre-wrap text-[1.05rem]">
        {post.content}
      </div>

    </main>
  )
}