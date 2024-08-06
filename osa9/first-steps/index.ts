import express from 'express';
import { calculateBmi }  from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const weight = Number(req.query.weight);
    const height = Number(req.query.height);

    if((!weight || !height)) {
        return res.status(400).send({ error: 'missing parameters' });
    }

    if((isNaN(weight) || isNaN(height))) {
        return res.status(400).send({ error: 'malformatted parameters' });
    }

    return res.send({
        weight,
        height,
        bmi: calculateBmi(height, weight)
    });
});

app.post('/exercises', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const targetHours = req.body.target as number;
    
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const exerciseHours = req.body.daily_exercises as number[];

    if(!targetHours || !exerciseHours) {
        return res.status(400).send({ error: 'missing parameters' });
    }

    if(isNaN(targetHours) || !Array.isArray(exerciseHours) || exerciseHours.length < 1) {
        return res.status(400).send({ error: 'malformatted parameters' });
    }

    const result = calculateExercises(targetHours, exerciseHours);

    return res.send({ result });
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});