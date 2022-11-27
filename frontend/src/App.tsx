import { Routes, Route } from 'react-router-dom'

import loadable from '@loadable/component';

import { EyesContextProvider } from './contexts/EyesContext';

import Navbar from './components/navbar/Navbar';

const LoadableHome = loadable(() => import('./components/home/Home'));
const LoadableEyes = loadable(() => import('./components/eye/Eyes'));
const LoadableEye = loadable(() => import('./components/eye/Eye'));

const App = () => {
  return (
    <>
      <Navbar />

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
