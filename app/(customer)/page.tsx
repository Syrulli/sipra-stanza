import DarkVeil from '@/components/animations/darkVeil'
export default function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 -z-10"><DarkVeil /></div>
      <main className="relative isolate px-6 pt-55 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-5xl font-semibold tracking-tight text-white sm:text-5xl">
            Let the rhythm move you.
          </h1>

          <p className="mt-8 text-md text-gray-400 sm:text-md">
            Don’t settle for ordinary, with Sipra Stanza, every beat and every lyrics comes to life. Our premium audio technology brings music closer than ever.
          </p>

          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="#"
              className="rounded-md bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white"
            >
              Shop now
            </a>
            <a
              href="#"
              className="inline-block px-4 py-2 text-sm font-semibold text-white border border-white rounded-md hover:bg-white hover:text-gray-900 transition duration-200"
            >
              Learn more
            </a>
          </div>
        </div>
      </main>
    </div>
  )
}