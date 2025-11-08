import { Typography, Button} from '@mui/material'

// components
import AppBar from './components/AppBar.tsx';

// functional component
import React, { useState } from 'react'
import GroceryList from './pages/GroceryList.tsx'
// import fetchToken from './KrogerToken'
// import fetchProducts from './KrogerProduct'
// import Test from './Test'
import './App.css'
import InputIngredients from './pages/InputIngredients.tsx'
// import KrogerProduct from './KrogerProduct'
import Profile from './pages/Profile.tsx'

function App() {
  const [ingredientDocId, setIngredientDocId] = useState<string>("");
  return (
    <>
      <AppBar />
      <Typography>Hello</Typography>
      {/* <Profile></Profile> */}
      <InputIngredients></InputIngredients>
      <GroceryList ingredientDocId={ingredientDocId}></GroceryList>
    </>
  );
}

export default App
