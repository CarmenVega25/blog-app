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
    <main className="max-w-xl mx-auto px-8 py-12">

      {/* Back link */}
      <Link href="/" className="text-sm text-gray-500 hover:text-indigo-400 transition-colors duration-200 mb-10 block">
        ← Back
      </Link>

      {/* Title */}
      <h1 className="font-serif italic text-4xl font-bold text-white mb-10">
        New Entry
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">

        {/* Title input */}
        <input
          className="bg-transparent border border-gray-700 focus:border-indigo-500 outline-none rounded-lg px-4 py-3 text-white placeholder-gray-600 transition-colors duration-200"
          placeholder="Entry title..."
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />

        {/* Content textarea */}
        <textarea
          className="bg-transparent border border-gray-700 focus:border-indigo-500 outline-none rounded-lg px-4 py-3 h-72 text-white placeholder-gray-600 leading-7 resize-none transition-colors duration-200"
          placeholder="Write your entry here..."
          value={content}
          onChange={e => setContent(e.target.value)}
          required
        />

        {/* Publish button */}
        <button
          className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white font-semibold py-3 rounded-full transition-colors duration-200"
          type="submit"
          disabled={submitting}
        >
          {submitting ? 'Saving...' : 'Publish Entry'}
        </button>

        {saved && (
          <p className="text-center text-indigo-400 text-sm">✓ Entry saved!</p>
        )}
        {error && (
          <p className="text-center text-red-400 text-sm">{error}</p>
        )}

      </form>
    </main>
  )
}