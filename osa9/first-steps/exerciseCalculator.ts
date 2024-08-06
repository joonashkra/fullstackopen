export interface Result {
    periodLength: number,
    trainingDays: number,
    target: number,
    average: number,
    success: boolean,
    rating: 1 | 2 | 3,
    ratingDescription: string
};

export const calculateExercises = (target: number, exerciseHours: number[]): Result => {
    const totalHours = exerciseHours.reduce((a, b) => a + b, 0);
    const average = totalHours / exerciseHours.length;

    let trainingDays = 0;
    exerciseHours.forEach(hours => {
        if(hours > 0) trainingDays++;
    });

    let rating: 1 | 2 | 3;
    let ratingDescription: string;

    if (average < target/2) {
        rating = 1;
        ratingDescription = 'bad';
    } else if (average < target) {
        rating = 2;
        ratingDescription = 'not too bad but could be better';
    } else {
        rating = 3;
        ratingDescription = 'good';
    };

    return {
        periodLength: exerciseHours.length,
        trainingDays,
        success: average >= target ? true : false,
        rating,
        ratingDescription,
        target,
        average
    };
};

const targetHours = Number(process.argv[2]);
const exerciseHours = process.argv.slice(3).map(Number);

console.log(calculateExercises(targetHours, exerciseHours));