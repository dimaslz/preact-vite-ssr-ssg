import { FunctionalComponent } from "preact";
import { Link } from "preact-router/match";

const Other: FunctionalComponent = () => {
  return (
    <div className="space-y-4">
      <div>
        <h1>Other page</h1>
      </div>
      <div>
        <Link href="/">Go to Home page</Link>
      </div>
    </div>
  )
}

export default Other;