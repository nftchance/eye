import { Link, Routes, Route } from 'react-router-dom'

import loadable from '@loadable/component';

import { EyesContextProvider } from './components/contexts/EyesContext';

const LoadableHome = loadable(() => import('./components/home/Home'));
const LoadableEyes = loadable(() => import('./components/eye/Eyes'));
const LoadableEye = loadable(() => import('./components/eye/Eye'));

const App = () => {
  return (
    <>
      <Link to="">Home</Link>
      <Link to="eye">Eyes</Link>

      <EyesContextProvider>
        <Routes>
          <Route
            index
            element={<LoadableHome />} />

          <Route path="eye">
            <Route path="" element={<LoadableEyes />} />
            <Route path=":eyeId" element={<LoadableEye />} />
          </Route>
        </Routes>
      </EyesContextProvider>
    </>
  )
}

export default App
