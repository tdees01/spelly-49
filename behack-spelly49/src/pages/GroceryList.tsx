import { GoogleGenAI } from "@google/genai";
import krogerConfig from '../config/kroger';
import { db } from "../config/firebase.ts";
import { doc, getDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { Typography, Button } from "@mui/material";
import "./App.css";

interface GroceryListProps {
    ingredientDocId: string;
}

const GroceryList = ({ ingredientDocId }: GroceryListProps) => {
  const [msg, setMsg] = useState("loading...");
  const [ingredients, setIngredients] = useState([]);
  const ai = new GoogleGenAI({
    apiKey: krogerConfig.API_KEY,
  });

  async function getGenerativeAI(ingredientsArr: string[]) {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `you are a chef, using these ingredients: ${ingredientsArr.join(
          ", "
        )}. Tell me what meal I can make with 1-3 extra ingredients. Please only return the meal name and the extra ingredients all in one array and no extra information.`,
      });
      console.log(response.text);
      setMsg(response.text || "No text generated");
      return response.text
    } catch (err) {
      console.log("Error generating text", err);
      setMsg("Error generating text. Check console for details");
    }
  }

  function handleClick() {
    setMsg("Generating...");
    getGenerativeAI(ingredients);
  }

  useEffect(() => {
    if (!ingredientDocId) return;
    const docRef = doc(db, "myingredients", ingredientDocId);
    getDoc(docRef).then((docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setIngredients(data.ingredients || []);
        getGenerativeAI(data.ingredients || []);
        console.log("Document data:", data);
      } else {
        setMsg("No such document");
      }
    });
  }, [ingredientDocId]);

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={handleClick}
        sx={{ p: "10px", backgroundColor: "#d698fd" }}
      >
        Get Meal Idea
      </Button>
      <Typography>{msg}</Typography>
    </div>
  );
};

export default GroceryList;
