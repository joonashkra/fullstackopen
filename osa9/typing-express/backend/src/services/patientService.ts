import data from '../../data/patientData';
import { NewPatient, NonSensitivePatientEntry, Patient } from '../types';
import { v1 as uuid } from 'uuid';


const patients: Patient[] = data;

const getEntries = (): Patient[] => {
    return patients;
};

const getEntryById = (id: string): Patient | null => {
    const patient = patients.find(patient => patient.id === id);
    console.log(patient);
    if(patient) return patient;
    else return null;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
        id, name, dateOfBirth, gender, occupation, entries
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
    getEntryById,
    getNonSensitiveEntries,
    addPatient
};