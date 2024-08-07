import { Gender, NewPatient } from "./types";

const isString = (text: unknown): text is string => {
    return typeof text === 'string';
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const isGender = (param: string): param is Gender => {
    return Object.values(Gender).map(v => v.toString()).includes(param);
};

const parseString = (key: string, value: unknown): string => {
    if(!isString(value)) {
        throw new Error(`Incorrect or missing ${key}`);
    }
    return value;
};

const parseDate = (date: unknown): string => {
    if (!isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
};

const parseGender = (gender: unknown): Gender => {
    if(!isString(gender) || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);
    }
    return gender;
};

const toNewPatientEntry = (object: unknown): NewPatient => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data');
    }

    if('name' in object && 'dateOfBirth' in object && 'gender' in object && 'occupation' in object) {
        const newEntry: NewPatient = {
            name: parseString('name', object.name),
            dateOfBirth: parseDate(object.dateOfBirth),
            gender: parseGender(object.gender),
            occupation: parseString('occupation', object.occupation)
        };

        return newEntry;
    }

    throw new Error('Incorrect data: some fields are missing');
};

export default toNewPatientEntry;