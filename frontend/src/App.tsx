import { Routes, Route } from 'react-router-dom'

import loadable from '@loadable/component';

const LoadableHome = loadable(() => import('./components/home/Home'));
const LoadableOrganization = loadable(() => import('./components/organization/Organization'));

const App = () => {
  return (
    <>
      <Routes>
        <Route 
          path="/" 
          element={<LoadableHome />} />
        <Route 
          path="/organization" 
          element={<LoadableOrganization />} />
        <Route 
          path="/organization/:organizationId" 
          element={<LoadableOrganization />} />
      </Routes>
    </>
  )
}

export default App
