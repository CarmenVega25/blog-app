'use client'
import { useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

export default function AdminPage() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    const slug = title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
    const { error } = await supabase.from('posts').insert({ title, content, slug })
    if (error) {
      setError('Failed to save post. Try again.')
    } else {
      setTitle('')
      setContent('')
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    }
    setSubmitting(false)
  }

  return (
    <main className="max-w-2xl mx-auto p-8">
      <Link href="/" className="text-sm text-gray-500 hover:underline mb-8 block">← Back</Link>
      <h1 className="text-3xl font-bold mb-8">New Post</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          className="border rounded p-2"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
        <textarea
          className="border rounded p-2 h-64"
          placeholder="Write your post here..."
          value={content}
          onChange={e => setContent(e.target.value)}
          required
        />
        <button
          className="bg-black text-white rounded p-2 font-semibold disabled:opacity-50"
          type="submit"
          disabled={submitting}
        >
          {submitting ? 'Saving...' : 'Publish'}
        </button>
        {saved && <p className="text-green-600">Post saved!</p>}
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </main>
  )
}