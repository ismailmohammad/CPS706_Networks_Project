import Image from 'next/image'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <form action="http://localhost:5000/acceptData" method="post">
          <label htmlFor="startNode">Starting Node:</label>
          <input type="text" id="startNode" name="startNode" />
          <label htmlFor="endNode">Ending Node:</label>
          <input type="text" id="endNode" name="endNode" />
          <button type="submit">Submit</button>
        </form>
      </div>
    </main>
  )
}
