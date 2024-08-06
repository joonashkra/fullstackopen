export const calculateBmi = (height: number, weight: number): string => {
    const bmi = weight/Math.pow((height/100), 2);
    if(bmi < 16.0) return `Severely underweight: ${bmi}`;
    else if(bmi < 18.4) return `Underweight: ${bmi}`;
    else if(bmi < 24.9) return `Normal (healthy weight): ${bmi}`;
    else if(bmi < 29.9) return `Overweight: ${bmi}`;
    else if(bmi > 30.0) return `Obese: ${bmi}`;
    else return 'Invalid input';
};