import React from 'react';
import { Card, CardContent, CardActions, Typography, Button, Divider } from '@mui/material';
import { motion } from 'framer-motion';

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
  return (
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
              <Button size="small" variant="outlined">
                Suggest Meal
              </Button>
              <Button size="small" variant="contained" color="primary">
                Host Dinner
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
  );
};

export default MealCard;
