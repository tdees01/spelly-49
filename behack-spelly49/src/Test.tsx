import React, { useState } from "react";
import { TextField, List, ListItem, ListItemText, Button } from "@mui/material";

export default function DynamicList() {
  const [input, setInput] = useState("");
  const [items, setItems] = useState<string[]>([]);

  const handleAdd = () => {
    if (input.trim() === "") return;
    setItems([...items, input]);
    setInput("");
  };

  return (
    <div style={{ width: 400, margin: "2rem auto" }}>
      <TextField
        fullWidth
        label="Add item"
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
      >Add</Button>

      <List sx={{ mt: 2 }}>
        {items.map((item, index) => (
          <ListItem key={index}>
            <ListItemText primary={item} />
          </ListItem>
        ))}
      </List>
    </div>
  );
}
