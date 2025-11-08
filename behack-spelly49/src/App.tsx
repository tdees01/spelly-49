import { Typography} from '@mui/material'

// components
import AppButton from './components/AppButton.tsx';
import AppBar from './components/AppBar.tsx';

// functional component
import { useState } from 'react'
import GroceryList from './GroceryList'
// import fetchToken from './KrogerToken'
// import Test from './Test'
import './App.css'
import InputIngredients from './InputIngredients'
// import KrogerProduct from './KrogerProduct'
import Profile from './Profile'

function App() {
  const [ingredientDocId, setIngredientDocId] = useState("");
  return (
    <>
      <AppBar />
      <AppButton></AppButton>
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
