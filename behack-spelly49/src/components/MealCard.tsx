import React, { useState } from 'react';
import { Card, CardContent, CardActions, Typography, Button, Divider, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Box, } from '@mui/material';
import { motion } from 'framer-motion';

// Define type inside this file
export interface MealEvent {
  id: number;
  title: string;
  date: string;
  attendees: number;
  bringing: string[];
  needed: string[];
}

interface MealCardProps {
  event: MealEvent;
  hovered: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
}

const MealCard: React.FC<MealCardProps> = ({ event, hovered, onHoverStart, onHoverEnd }) => {
  const [open, setOpen] = useState(false);
  const [mealName, setMealName] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const handleSuggestMeal = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setMealName('');
    setSuggestions([]);
  };

  // Placeholder for AI-like recipe generation
  const handleGenerateRecipe = () => {
    if (mealName.trim() === '') return;

    // Temporary fake "AI" recipes
    const fakeSuggestions = [
      `${mealName} Stir Fry with Veggies`,
      `${mealName} Bowl with Rice & Beans`,
      `${mealName} Wraps with Salsa and Cheese`,
    ];
    setSuggestions(fakeSuggestions);
  };

  return (
    <>
      {/* Meal Card */}
      <motion.div
        whileHover={{ scale: 1.03 }}
        transition={{ type: 'spring', stiffness: 200 }}
        onMouseEnter={onHoverStart}
        onMouseLeave={onHoverEnd}
        style={{ flex: '1 1 250px', maxWidth: 300 }}
      >
        <Card
          sx={{
            minHeight: 180,
            borderRadius: 3,
            boxShadow: 3,
            cursor: 'pointer',
            p: 1,
            backgroundColor: hovered ? '#f8f9fa' : 'white',
          }}
        >
          {hovered ? (
            <CardContent>
              <Typography variant="subtitle1" fontWeight="bold">
                Ingredients Being Brought:
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {event.bringing.join(', ')}
              </Typography>

              <Divider sx={{ my: 1 }} />

              <Typography variant="subtitle1" fontWeight="bold">
                Ingredients Needed:
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {event.needed.join(', ')}
              </Typography>

              <CardActions sx={{ justifyContent: 'space-between', mt: 1 }}>
                <Button size="small" variant="outlined" onClick={handleSuggestMeal}>
                  Join Dinner
                </Button>
                <Button size="small" variant="contained" color="primary">
                  More Info
                </Button>
              </CardActions>
            </CardContent>
          ) : (
            <CardContent>
              <Typography variant="h6" fontWeight="bold" color="primary">
                {event.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {event.date}
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                👥 {event.attendees} attending
              </Typography>
            </CardContent>
          )}
        </Card>
      </motion.div>

      {/* Suggest Meal Popup */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
        <DialogTitle>Join Dinner 🍽️</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Type an ingredient you can bring to this meal.
          </Typography>

          <TextField
            fullWidth
            label="Ingredient Name"
            variant="outlined"
            value={mealName}
            onChange={(e) => setMealName(e.target.value)}
            sx={{ mb: 2 }}
          />

          <Button
            onClick={handleGenerateRecipe}
            variant="contained"
            color="primary"
            disabled={!mealName}
            fullWidth
          >
            Submit Ingredient
          </Button>

          {/* {suggestions.length > 0 && ( */}
             <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle1" fontWeight="bold">
                Suggested Recipes:
               </Typography>
              {suggestions.map((s, i) => (
                 <Typography key={i} variant="body2" color="text.secondary">
                   • {s}
                 </Typography>
               ))}
             </Box>
            {/* )} */}
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default MealCard;




// import React from 'react';
// import { Card, CardContent, CardActions, Typography, Button, Divider, Dialog, DialogActions, DialogContent, DialogTitle, Box, TextField } from '@mui/material';
// import { motion } from 'framer-motion';

// export interface MealEvent {
//   id: number;
//   title: string;
//   date: string;
//   attendees: number;
//   bringing: string[];
//   needed: string[];
// }

// interface MealCardProps {
//   event: MealEvent;
//   hovered: boolean;
//   onHoverStart: () => void;
//   onHoverEnd: () => void;
// }

// const MealCard: React.FC<MealCardProps> = ({ event, hovered, onHoverStart, onHoverEnd }) => {
//   return (
//     <motion.div
//       whileHover={{ scale: 1.03 }}
//       transition={{ type: 'spring', stiffness: 200 }}
//       onMouseEnter={onHoverStart}
//       onMouseLeave={onHoverEnd}
//       style={{ flex: '1 1 250px', maxWidth: 300 }}
//     >
//       <Card
//         sx={{
//           minHeight: 180,
//           borderRadius: 3,
//           boxShadow: 3,
//           cursor: 'pointer',
//           p: 1,
//           backgroundColor: hovered ? '#f8f9fa' : 'white',
//         }}
//       >
//         {hovered ? (
//           <CardContent>
//             <Typography variant="subtitle1" fontWeight="bold">
//               Ingredients Being Brought:
//             </Typography>
//             <Typography variant="body2" color="text.secondary">
//               {event.bringing.join(', ')}
//             </Typography>

//             <Divider sx={{ my: 1 }} />

//             <Typography variant="subtitle1" fontWeight="bold">
//               Ingredients Needed:
//             </Typography>
//             <Typography variant="body2" color="text.secondary">
//               {event.needed.join(', ')}
//             </Typography>

//             <CardActions sx={{ justifyContent: 'space-between', mt: 1 }}>
//               <Button size="small" variant="outlined">
//                 Suggest Meal
//               </Button>
//               <Button size="small" variant="contained" color="primary">
//                 Host Dinner
//               </Button>
//             </CardActions>
//           </CardContent>
//         ) : (
//           <CardContent>
//             <Typography variant="h6" fontWeight="bold" color="primary">
//               {event.title}
//             </Typography>
//             <Typography variant="body2" color="text.secondary">
//               {event.date}
//             </Typography>
//             <Typography variant="body2" sx={{ mt: 1 }}>
//               👥 {event.attendees} attending
//             </Typography>
//           </CardContent>
//         )}
//       </Card>
//     </motion.div>
  
//   );
// };

// export default MealCard;
