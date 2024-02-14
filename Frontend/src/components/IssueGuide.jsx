import React from 'react';
import { Typography, List, ListItem, Box, Button, Card, CardContent } from '@mui/material';

const StepByStepGuide = ({ steps, selectedTask, onContinue, onExit }) => {
    return (
        <Card >
            <CardContent style={{ textAlign: 'center' }} >
                <Typography variant="h4" gutterBottom>
                    מדריך {selectedTask}
                </Typography>
                <List style={{ textAlign: 'center' }}>
                    {steps.map((step, index) => {
                        const [title, description] = step.split(':');
                        const stepTitle = `${index + 1}. ${title}`;
                        return (
                            <ListItem key={index} >
                                <span style={{  textAlign: 'right' }}>
                                    <b>{stepTitle}:</b> {description}
                                </span>
                            </ListItem>
                        );
                    })}
                </List>
                <Box display="flex" justifyContent="space-between" mt={2}>
                    <Button onClick={onExit} variant="contained" color="secondary">
                        יציאה
                    </Button>
                    <Button onClick={onContinue} variant="contained" color="primary">
                        המשך
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
};

export default StepByStepGuide;
