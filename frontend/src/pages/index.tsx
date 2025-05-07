// src/pages/index.tsx
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { signOut, getCurrentSession } from '../lib/cognito'

type Movie = {
  id: number
  title: string
  poster: string
}

export default function Home() {
  const router = useRouter()
  const [checking, setChecking] = useState(true)

  const sampleMovies: Movie[] = [
    { id: 1, title: 'Inception',       poster: '/posters/inception.jpg' },
    { id: 2, title: 'Interstellar',    poster: '/posters/interstellar.jpg' },
    { id: 3, title: 'The Dark Knight', poster: '/posters/dark-knight.jpg' },
    { id: 4, title: 'Tenet',           poster: '/posters/tenet.jpg' },
    { id: 5, title: 'Dunkirk',         poster: '/posters/dunkirk.jpg' },
  ]

  useEffect(() => {
    getCurrentSession().then(s => {
      if (!s) router.replace('/signin')
      else setChecking(false)
    })
  }, [router])

  if (checking) {
    return <p className="text-center mt-20 text-gray-400">Checking session…</p>
  }

  return (
    <div className="bg-[#141414] min-h-screen text-white">
      {/* HEADER */}
      <header className="fixed top-0 w-full bg-[#141414] flex items-center justify-between p-4 z-10">
        <nav className="space-x-4">
          <Link href="/" className="text-white hover:underline">Home</Link>
          <Link href="/profile" className="text-white hover:underline">Profile</Link>
        </nav>
        <button
          onClick={() => {
            signOut()
            router.push('/signin')
          }}
          className="bg-red-600 px-3 py-1 rounded hover:bg-red-700"
        >
          Sign Out
        </button>
      </header>

      {/* MAIN CONTENT */}
      <main className="pt-24 px-6">
        <h2 className="text-2xl mb-4">Trending Now</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {sampleMovies.map(movie => (
            <div
              key={movie.id}
              className="relative overflow-hidden rounded-lg shadow-lg h-64 cursor-pointer group"
              onClick={() => router.push(`/watch/${movie.id}`)}
            >
              <img
                src={movie.poster}
                alt={movie.title}
                className="w-full h-full object-cover transform group-hover:scale-105 transition duration-300"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-2 opacity-0 group-hover:opacity-100 transition">
                <p className="text-sm">{movie.title}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
