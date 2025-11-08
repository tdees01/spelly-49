import React, { useState } from 'react'
import { useOutletContext } from "react-router-dom";
import { TextField, List, ListItem, ListItemText, Button, Box, Typography } from '@mui/material'
import { db } from "../config/firebase.ts"; // Import the db instance
import { collection, addDoc } from "firebase/firestore";

interface ingredientProp {
  setIngredientDocId: (id: string) => void;
}

const InputIngredients = () => {
  const { setIngredientDocId } = useOutletContext<{
    ingredientDocId: string;
    setIngredientDocId: (id: string) => void;
  }>();

  interface ingredientData {
    ingredients: string[];
  }

  const [ingredientData, setIngredientData] = useState<ingredientData>({
        ingredients: []
      });
  const [input, setInput] = useState("");
  const [items, setItems] = useState<string[]>([]);
  
  const handleAdd = () => {
  if (input.trim() === "") return;
  setItems([...items, input]);
  setInput("");
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
            console.log("Form data submitted:", items);
            try {
                const docRef = await addDoc(collection(db, "myingredients"), {
                  ingredients: items,
                });
                setIngredientDocId(docRef.id);
                console.log("Document written with ID: ", docRef.id)
                setItems([]);
                return docRef.id
                // setIngredientData({
                //     ingredients: [],
            } catch (error) {
                console.log("Error adding document: ", error)
            }
    }
  return(
    <div>
      <Typography>Input Your Ingredients</Typography>
      <TextField
        name="ingredients"
        label="Add Ingredient"
        variant="outlined"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleAdd()}
      />
      <Button
        sx={{ mt: 2 }}
        variant="contained"
        color="primary"
        onClick={handleAdd}
      >
        Add
      </Button>

      <List sx={{ mt: 2 }}>
        {items.map((item, index) => (
          <ListItem key={index}>
            <ListItemText primary={item} />
          </ListItem>
        ))}
      </List>
      <Button onClick={handleSubmit}>Submit</Button>
    </div>
  );
}

export default InputIngredients