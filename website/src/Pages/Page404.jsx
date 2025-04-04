import React from 'react'
import { Link } from 'react-router-dom'

function Page404() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-neutral-950 text-neutral-300 px-6">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-2xl mb-2">Page Not Found</p>
      <p className="text-base mb-6 text-neutral-400">
        Sorry, the page you’re looking for doesn’t exist or has been moved.
      </p>
      <Link
        to="/"
        className="px-5 py-2 bg-neutral-800 text-neutral-200 rounded-lg hover:bg-neutral-700 transition duration-300"
      >
        Go to Homepage
      </Link>
    </div>
  )
}

export default Page404
