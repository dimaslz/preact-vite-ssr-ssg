import "./index.css";

import { hydrate } from 'preact'

import { MainRouter } from './router'

hydrate(<MainRouter path={location.pathname} />, document.getElementById('app') as HTMLElement)
