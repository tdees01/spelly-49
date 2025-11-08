import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import testFunc from '../KrogerProduct'
import fetchToken from "../KrogerToken";
import fetchProducts from "../KrogerProduct";
import MealCard, { type MealEvent } from '../components/MealCard';

// Sample meal events
const mealEvents: MealEvent[] = [
  {
    id: 1,
    title: 'Taco Tuesday 🌮',
    date: 'Nov 12 · 6:00 PM',
    attendees: 5,
    bringing: ['Tortillas', 'Salsa', 'Avocados'],
    needed: ['Cheese', 'Drinks', 'Lettuce'],
  },
  {
    id: 2,
    title: 'Spaghetti Night 🍝',
    date: 'Nov 15 · 7:00 PM',
    attendees: 8,
    bringing: ['Pasta', 'Tomato Sauce', 'Bread'],
    needed: ['Parmesan', 'Drinks', 'Salad'],
  },
  {
    id: 3,
    title: 'Sushi Sunday 🍣',
    date: 'Nov 17 · 5:00 PM',
    attendees: 6,
    bringing: ['Rice', 'Seaweed', 'Salmon'],
    needed: ['Soy Sauce', 'Cucumber', 'Plates'],
  },
];

const HomePage: React.FC = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <Box sx={{ p: 2, pb: 10, backgroundColor: "#fffaf4", minHeight: "100vh" }}>
      {/* Header */}
      <Box sx={{ textAlign: "center", mb: 3 }}>
        <Typography variant="h4" fontWeight="bold" color="primary">
          Seat at the Table 🍽️
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          ’Cause it’s easier together.
        </Typography>
      </Box>

      {/* Upcoming Meal Events */}
      <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
        Upcoming Meal Events
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          justifyContent: { xs: "center", sm: "flex-start" },
        }}
      >
        {mealEvents.map((event) => (
          <MealCard
            key={event.id}
            event={event}
            hovered={hoveredCard === event.id}
            onHoverStart={() => setHoveredCard(event.id)}
            onHoverEnd={() => setHoveredCard(null)}
          />
        ))}
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <Button
          variant="contained"
          onClick={() => fetchProducts()}
          style={{ padding: "10px" }}
        >
          Get Products
        </Button>
      </Box>
      {/* Calendar Section Placeholder */}
      <Box sx={{ mt: 5 }}>
        <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
          This Month’s Events
        </Typography>
        <Box
          sx={{
            border: "1px solid #ddd",
            borderRadius: 2,
            p: 2,
            textAlign: "center",
            color: "text.secondary",
          }}
        >
          📅 Calendar Component Placeholder
          <Typography variant="body2" sx={{ mt: 1 }}>
            (Integrate MUI X Date Pickers or FullCalendar later)
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage;
