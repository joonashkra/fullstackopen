import data from '../../data/patientData';
import { NewPatient, NonSensitivePatientEntry, Patient } from '../types';
import { v1 as uuid } from 'uuid';


const patients: Patient[] = data;

const getEntries = () => {
    return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id, name, dateOfBirth, gender, occupation
    }));
};

const addPatient = (patient: NewPatient): Patient => {
    const id = uuid();

    const newPatient = {
        id,
        ...patient
    };

    patients.push(newPatient);
    return newPatient;
};

export default {
    getEntries,
    getNonSensitiveEntries,
    addPatient
};