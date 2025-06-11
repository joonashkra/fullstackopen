import { Diagnosis, Entry, Gender, HealthCheckRating, NewEntry, NewPatient } from "./types";

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

const isEntry = (entry: object): entry is Entry => {
    return (
        typeof entry === 'object'
    );
};

const parseEntries = (entries: unknown): Entry[] => {
    if(!Array.isArray(entries) || !entries.every(isEntry)) {
        throw new Error('Incorrect or missing entries.');
    }
    return entries;
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> =>  {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnosis['code']>;
  }

  return object.diagnosisCodes as Array<Diagnosis['code']>;
};

const parseDischarge = (object: unknown): { date: string, criteria: string } => {
    if (!object || typeof object !== 'object' || !('date' in object) || !('criteria' in object) || !parseDate(object.date) || !isString(object.criteria)) {
        throw new Error('Incorrect or missing discharge.');
    }

    return object as { date: string, criteria: string }
}

const parseSickLeave = (object: unknown): { startDate: string, endDate: string } => {
    if (!object || typeof object !== 'object' || !('startDate' in object) || !('endDate' in object) || !parseDate(object.startDate) || !parseDate(object.endDate)) {
        throw new Error('Incorrect or missing sickleave.');
    }

    return object as { startDate: string, endDate: string }
}

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
    if(typeof rating !== 'number' || !Object.values(HealthCheckRating).includes(rating)) {
        throw new Error('Incorrect or missing healthcheck rating.')
    }

    return rating as HealthCheckRating
}

export const toNewPatient = (object: unknown): NewPatient => {
    console.log(object);
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data');
    }

    if('name' in object && 'dateOfBirth' in object && 'gender' in object && 'occupation' in object && 'ssn' in object && 'entries' in object) {
        const newEntry: NewPatient = {
            name: parseString('name', object.name),
            dateOfBirth: parseDate(object.dateOfBirth),
            gender: parseGender(object.gender),
            occupation: parseString('occupation', object.occupation),
            ssn: parseString('ssn', object.ssn),
            entries: parseEntries(object.entries)
        };

        return newEntry;
    }

    throw new Error('Incorrect data: some fields are missing');
};

export const toNewPatientEntry = (object: unknown): NewEntry => {
    console.log(object)
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data');
    }

    if('type' in object && 'description' in object && 'date' in object && 'specialist' in object) {
        const newBaseEntry = { 
            description: parseString('description', object.description), 
            date: parseDate(object.date), 
            specialist: parseString('specialist', object.specialist),
            diagnosisCodes: parseDiagnosisCodes( 'diagnosisCodes' in object && object.diagnosisCodes)
        }

        switch (object.type) {
            case 'Hospital':
                if('discharge' in object) {
                    const newHospitalEntry: NewEntry = { 
                        ...newBaseEntry, 
                        type: object.type, 
                        discharge: parseDischarge(object.discharge) 
                    }
                    return newHospitalEntry
                }
                break;
            case 'OccupationalHealthcare':
                if('employerName' in object) {
                    const newOccupationalHealthcareEntry: NewEntry = { 
                        ...newBaseEntry, 
                        type: object.type, 
                        employerName: parseString('employerName', object.employerName)
                    }
                    return 'sickLeave' in object ? { ...newOccupationalHealthcareEntry, sickLeave: parseSickLeave(object.sickLeave) } : newOccupationalHealthcareEntry
                }
                break;
            case 'HealthCheck':
                if('healthCheckRating' in object) {
                    const newHealthCheckEntry: NewEntry = {
                        ...newBaseEntry,
                        type: object.type,
                        healthCheckRating: parseHealthCheckRating(object.healthCheckRating) 
                    }
                    return newHealthCheckEntry
                }
                break;
            default:
                break;
        }
    }

    throw new Error('Incorrect data: some fields are missing');
}