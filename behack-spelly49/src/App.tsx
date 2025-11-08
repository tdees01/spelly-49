import { Typography} from '@mui/material'

// components
import AppBar from './components/AppBar.tsx';

// functional component
import React, { useState } from 'react'
import GroceryList from './pages/GroceryList.tsx'
// import fetchToken from './KrogerToken'
// import Test from './Test'
import './App.css'
import InputIngredients from './pages/InputIngredients.tsx'
// import KrogerProduct from './KrogerProduct'
import Profile from './Profile'

function App() {
  const [ingredientDocId, setIngredientDocId] = useState("");
  return (
    <>
      <AppBar />
      <Typography>Hello</Typography>
      <Profile></Profile>
      <InputIngredients
        setIngredientDocId={setIngredientDocId}
      ></InputIngredients>
      <GroceryList ingredientDocId={ingredientDocId}></GroceryList>
      {/* <Button onClick={() => fetchToken()}>Get Token</Button> */}
    </>
  );
}

export default App
