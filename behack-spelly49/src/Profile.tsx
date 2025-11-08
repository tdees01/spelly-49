import React, { useState } from 'react'
import { TextField, List, ListItem, ListItemText, Button, Box, Typography } from '@mui/material'
import { db } from "./config/firebase.ts"; // Import the db instance
import { collection, addDoc } from "firebase/firestore";

const Profile = () => {

    interface profileData {
      name: string;
      residence: string;
      school: string;
      dietaryRestrictions: string[];
    }

    const [profileData, setProfileData] = useState<profileData>({
      name: "",
      residence: "",
      school: "",
      dietaryRestrictions: [],
    });

    const [input, setInput] = useState("");
    const [items, setItems] = useState<string[]>([]);
    
    const handleAdd = () => {
      if (input.trim() === "") return;
      setProfileData((prevState) => ({
        ...prevState,
        dietaryRestrictions: [...prevState.dietaryRestrictions, input],
      }));
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
            const docRef = await addDoc(collection(db, "profile"), {
              name: profileData.name,
              residence: profileData.residence,
              school: profileData.school,
              dietaryRestrictions: profileData.dietaryRestrictions
            });
            console.log("Document written with ID: ", docRef)
            setProfileData({
              name: "",
              residence: "",
              school: "",
              dietaryRestrictions: [],
            });
        } catch (error) {
            console.log("Error adding document: ", error)
        }
    }
  return (
    <div>
      <Box
        sx={{ display: "flex", flexDirection: "column", marginBottom: "20px", alignItems: "flex-start" }}
      >
        <Typography>My Profile</Typography>
        <TextField
          sx={{ marginBottom: "30px" }}
          required
          variant="outlined"
          label="Name"
          name="name"
          value={profileData.name}
          onChange={handleChange}
        ></TextField>
        <TextField
          sx={{ marginBottom: "30px" }}
          required
          variant="outlined"
          label="School"
          name="school"
          value={profileData.school}
          onChange={handleChange}
        ></TextField>
        <TextField
          sx={{ marginBottom: "30px" }}
          required
          variant="outlined"
          label="Residence"
          name="residence"
          value={profileData.residence}
          onChange={handleChange}
        ></TextField>
        <TextField
          sx={{ marginBottom: "30px" }}
          variant="outlined"
          multiline
          label="Dietary Restrictions"
          name="dietaryRestrictions"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
        ></TextField>
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
      </Box>
    </div>
  );
}

export default Profile;