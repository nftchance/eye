import { Routes, Route } from 'react-router-dom'

import loadable from '@loadable/component';

const LoadableHome = loadable(() => import('./components/home/Home'));
const LoadableEyes = loadable(() => import('./components/eye/Eyes'));
const LoadableEye = loadable(() => import('./components/eye/Eye'));

const App = () => {
  return (
    <>
      <Routes>
        <Route 
          path="/" 
          element={<LoadableHome />} />

        <Route 
          path="/eye" 
          element={<LoadableEyes />} />
        <Route 
          path="/eye/:eyeId" 
          element={<LoadableEye />} />
      </Routes>
    </>
  )
}

export default App
