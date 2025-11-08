import React, { useState } from 'react'
import { TextField, List, ListItem, ListItemText, Button, Box, Typography } from '@mui/material'
import { db } from "./config/firebase.ts"; // Import the db instance
import { collection, addDoc } from "firebase/firestore";

const InputIngredients = () => {

    interface profileData {
        name: string,
        residence: string,
        school: string,
        ingredients: string[]
    }

    const [profileData, setProfileData] = useState<profileData>({
        name: "",
        residence: "",
        school: "",
        ingredients: []
    });

    const [input, setInput] = useState("");
    const [items, setItems] = useState<string[]>([]);
    
    const handleAdd = () => {
    if (input.trim() === "") return;
    setItems([...items, input]);
    setInput("");
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setProfileData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form data submitted:', profileData);
        try {
            const docRef = await addDoc(collection(db, ""), {
              name: profileData.name,
              residence: profileData.residence,
              school: profileData.school,
              ingredients: profileData.ingredients
            });
            console.log("Document written with ID: ", docRef)
            setProfileData({
                name: "",
                residence: "",
                school: "",
                ingredients: [],
            });
        } catch (error) {
            console.log("Error adding document: ", error)
        }
    }
  return (
    <div>
      <Box>
        <Typography>My Profile</Typography>
        <TextField
          fullWidth
          variant="outlined"
          label="Name"
          name="name"
          value={profileData.name}
          onChange={handleChange}
        ></TextField>
        <TextField
          fullWidth
          variant="outlined"
          label="School"
          name="school"
          value={profileData.school}
          onChange={handleChange}
        ></TextField>
        <TextField
          fullWidth
          variant="outlined"
          label="Residence"
          name="residence"
          value={profileData.residence}
          onChange={handleChange}
        ></TextField>
        <TextField
          fullWidth
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
      </Box>
    </div>
  );
}

export default InputIngredients;