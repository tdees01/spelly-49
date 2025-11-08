import { GoogleGenAI } from "@google/genai";

import { useState, useEffect } from "react";
import { Typography, Button } from "@mui/material";
import "./App.css";

const GroceryList = () => {

  // const [msg, setMsg] = useState("AI Text will show up here")
  const [msg, setMsg] = useState("loading...");
  const [ingredients, setIngredients] = useState(["milk", "eggs", "ground beef", "celery", "peas", "shredded cheddar cheese"])
  const ai = new GoogleGenAI({
    apiKey: "AIzaSyApIcNaBuH1Dhxpf4guK8JIY1pHQ_vhc7M",
  });

  async function getGenerativeAI() {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: "you are a chef, using these ingredients" + ingredients + "tell me what meal I can make with 1-3 extra ingredients. Please only return the meal name and the extra ingredients all in one array and no extra information",
      });
      console.log(response.text);
      //this(response.text) might come back empty, OR statment needed to stop error
      setMsg(response.text || "No text generated");
    } catch (err){
      console.log('Error generating text', err);
      setMsg('Error generating text. Check console for details');
      return;
    }
  }

  function handleClick(){
    setMsg('Generating...')
    // getGenerativeAI();
  }
  
  //on page load or instantly it calls this function
  useEffect(() => {
    getGenerativeAI();
  }, []);
  //in bracket put dependencies or variables you want to listen for to trigger the re-rendering of the page

  return (
    <div>
      <Button variant='contained' color='primary' onClick={handleClick} sx={{ p: "10px", backgroundColor: "#d698fd"}}>Get Meal Idea</Button>
      <Typography>{msg}</Typography>
    </div>
  );
};

export default GroceryList;

