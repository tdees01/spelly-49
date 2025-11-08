import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.tsx'
import '@fontsource/roboto/400.css'
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'

import HomePage from './pages/HomePage.tsx'
import Profile from './pages/Profile.tsx'
import InputIngredients from './InputIngredients.tsx'
import AppBar from './components/AppBar.tsx'
import Ingredients from './pages/Ingredients.tsx'
import Events from './pages/Events.tsx'
import Blog from './pages/Blog.tsx'
import Error from './pages/Error.tsx'
// import MealCard from './components/MealCard.tsx'

function AppLayout() {
  return (
    <>
      <AppBar />
      <Outlet />
    </>
  )
}

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
    path:"/",
    element: <HomePage />
    },
  {
    path: "/profile",
    element: <Profile />
  },
  {
    path: "/input-ingredients",
    element: <InputIngredients />
  },
  { path: "/ingredients",
    element: <Ingredients />
  },
    { path: "/events", element: <Events /> },
    { path: "/blog", element: <Blog /> },
    // { path: "/meal-card", element: <MealCard title="Sample Meal" image="/images/sample.jpg" time="30 min" date={2025} contributors={[]} /> },
  ],
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
);
