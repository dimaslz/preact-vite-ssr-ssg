import { render } from 'preact-render-to-string';

import { MainRouter } from './router';

export const SSRRender = ({ path = "" }: { path: string }) => {
  return render(<MainRouter path={path} />)
}
