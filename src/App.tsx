import './globals.css';
import {Route, Routes} from "react-router-dom";
import { Home, Layout } from './pages';
import { useAuth0 } from '@auth0/auth0-react';


const App = () => {
  const { isLoading } = useAuth0();
  if (isLoading) {
    return (
      <div className="page-layout">
        <span>Loading</span>
      </div>
    );
  }
  return (
    <main className='flex h-screen'>
    <Routes>
      <Route element={<Layout />}>
        <Route  index element={<Home />} />
      </Route>
    </Routes>
  </main>
  )
}

export default App