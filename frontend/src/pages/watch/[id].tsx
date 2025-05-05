// src/pages/watch/[id].tsx
import React, { useEffect, useState } from 'react'
import { useRouter }           from 'next/router'
import { signOut, getCurrentSession } from '../../lib/cognito'
import { VideoPlayer }         from '../../components/VideoPlayer'

type Movie = {
  id: number
  title: string
  poster: string
  src: string
}

// same sampleMovies array, but with srcs
const sampleMovies: Movie[] = [
  {
    id: 1,
    title: 'Inception',
    poster: '/posters/inception.jpg',
    src: '/videos/inception.mp4',
  },
  {
    id: 2,
    title: 'Interstellar',
    poster: '/posters/interstellar.jpg',
    src: '/videos/interstellar.mp4',
  },
  {
    id: 3,
    title: 'The Dark Knight',
    poster: '/posters/dark-knight.jpg',
    src: '/videos/dark-knight.mp4',
  },
  {
    id: 4,
    title: 'Tenet',
    poster: '/posters/tenet.jpg',
    src: '/videos/tenet.mp4',
  },
  {
    id: 5,
    title: 'Dunkirk',
    poster: '/posters/dunkirk.jpg',
    src: '/videos/dunkirk.mp4',
  },
]

export default function WatchPage() {
  const router = useRouter()
  const { id } = router.query
  const [checking, setChecking] = useState(true)
  const [movie, setMovie]       = useState<Movie | null>(null)

  useEffect(() => {
    // 1) Auth guard
    getCurrentSession().then(s => {
      if (!s) router.replace('/signin')
      else setChecking(false)
    })
  }, [router])

  useEffect(() => {
    if (!checking && id) {
      const found = sampleMovies.find(m => m.id === Number(id))
      if (!found) {
        // invalid id → back to home
        router.replace('/')
      } else {
        setMovie(found)
      }
    }
  }, [checking, id, router])

  if (checking || !movie) {
    return <p className="text-center mt-20 text-gray-400">Loading…</p>
  }

  return (
    <div className="bg-[#141414] min-h-screen text-white flex flex-col">
      <header className="flex items-center justify-between p-4 bg-[#141414]">
        <button
          onClick={() => router.back()}
          className="text-gray-300 hover:text-white"
        >
          ← Back
        </button>
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

      <main className="p-6 flex-grow">
        <h2 className="text-3xl mb-4">{movie.title}</h2>
        <VideoPlayer src={movie.src} title={movie.title} />
      </main>
    </div>
  )
}
