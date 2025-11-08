import { Typography} from '@mui/material'

// components
import InputIngredients from './InputIngredients'
import GroceryList from './GroceryList'

import AppButton from './components/AppButton.tsx';
import AppBar from './components/AppBar.tsx';

// functional component

function App() {

  return (
    <>
      <AppBar />
      <Typography>Hello</Typography>
      <GroceryList></GroceryList>
      <InputIngredients></InputIngredients>
      <AppButton></AppButton>
    </>
  )
}

export default App
