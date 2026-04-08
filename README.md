# Carmen's Journal

A personal full stack journal app built with Next.js and Supabase.

## Tech Stack

- **Frontend**: Next.js 14, React Server Components, Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Font**: Lora (Google Fonts)

## Features

- View all journal entries on the home page
- Click into an entry to read the full post
- Write new entries via the admin page
- Entries are stored in Supabase and persist across sessions

## Getting Started

1. Clone the repo
2. Install dependencies
```bash
   npm install
```
3. Create a `.env.local` file with your Supabase credentials
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
4. Run the development server
```bash
   npm run dev
```
5. Open [http://localhost:3000](http://localhost:3000)

## Database Setup

Create a `posts` table in Supabase with the following columns:

| Column | Type |
|---|---|
| id | int8 (primary key) |
| title | text |
| content | text |
| slug | text |
| created_at | timestamptz |

## Project Structure
app/
├── page.tsx          # Home page — lists all entries
├── posts/
│   └── [slug]/
│       └── page.tsx  # Individual entry page
├── admin/
│   └── page.tsx      # New entry form
lib/
└── supabase.ts       # Supabase client

## Notes

This app is intended for local use only and is not deployed.
The `/admin` route is unprotected — authentication would be added before any public deployment.