import React from 'react';
import { Typography, List, ListItem, Box, Button, Card, CardContent } from '@mui/material';

const StepByStepGuide = ({ steps = guideSteps, selectedTask, onContinue, onExit }) => {
    return (
        <Card>
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

const guideSteps = [
    "בטיחות תחילה: עצור למקום בטוח הרחק מהתנועה. הדליקו את אורות הסיכון והפעילו את בלם החניה.",
    "אספו כלים: ודא שיש לך את כל הכלים הדרושים ברכב שלך. זה כולל בדרך כלל צמיג רזרבי, ג'ק, מפתח ברגים, ואולי פנס וכפפות.",
    "הכן את הרכב: אם יש לך תיבת הילוכים ידנית, הכנס את המכונית להילוך ראשון או אחורי. עבור תיבות הילוכים אוטומטיות, שים אותו בחנייה. אם יש לך חוסמי גלגלים, הנח אותם מתחת לצמיגים מול הפנצ'ר כדי למנוע גלגול.",
];

export default StepByStepGuide;
