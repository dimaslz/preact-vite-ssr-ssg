import { FunctionalComponent } from "preact";

import { useState } from 'preact/hooks'
import preactLogo from '../assets/preact.svg'
import viteLogo from '/vite.svg'
import './home.css'
import { Link } from "preact-router/match";

const Home: FunctionalComponent = () => {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="flex w-full justify-center">
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://preactjs.com" target="_blank">
          <img src={preactLogo} className="logo preact" alt="Preact logo" />
        </a>
      </div>
      <h1>Vite + Preact + SSR</h1>
      <div className="card space-y-4">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/pages/Home.tsx</code> and save to test HMR
        </p>
      </div>
      <div>
        <Link href="/other">Go to /other page</Link>
      </div>
    </>
  )
}

export default Home;