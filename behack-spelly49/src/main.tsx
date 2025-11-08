import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import React, { useState } from 'react'
import { Chat } from '@mui/icons-material'
import './index.css'
// import App from './App.tsx'
import '@fontsource/roboto/400.css'
import { createBrowserRouter, RouterProvider, Outlet, useOutletContext } from 'react-router-dom'

import HomePage from './pages/HomePage.tsx'
import Profile from './pages/Profile.tsx'
import GroceryList from './pages/GroceryList.tsx'
import InputIngredients from './pages/InputIngredients.tsx'
import AppBar from './components/AppBar.tsx'
// import Ingredients from './pages/Ingredients.tsx'
import Events from './pages/Events.tsx'
import Error from './pages/Error.tsx'
import CommunityChat from './pages/CommunityChat.tsx'

// import MealCard from './components/MealCard.tsx'

function AppLayout() {
  const [ingredientDocId, setIngredientDocId] = useState<string>("");
  return (
    <>
      <AppBar />
      {/* Context is passed to children via Outlet */}
      <Outlet context={{ ingredientDocId, setIngredientDocId }}/>
    </>
  )
}

// const [ingredientDocId, setIngredientDocId] = useState<string>('')

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
        // InputIngredients should use useOutletContext to access setIngredientDocId
        element: <InputIngredients />
      },
      // { 
      //   path: "/ingredients",
      //   element: <Ingredients />
      // },
      {
        path: "/grocery-list",
        element: (
          <GroceryListWrapper />
        )
      },
      { path: "/events", element: <Events /> },
      { path: "/chat", element: <CommunityChat /> },
      // { path: "/meal-card", element: <MealCard title="Sample Meal" image="/images/sample.jpg" time="30 min" date={2025} contributors={[]} /> },
    ],
  },
])

function GroceryListWrapper() {
  const { ingredientDocId } = useOutletContext<{ ingredientDocId: string }>();
  return <GroceryList ingredientDocId={ingredientDocId} />;
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
);


