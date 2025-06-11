import data from '../../data/patientData';
import { Entry, NewEntry, NewPatient, NonSensitivePatientEntry, Patient } from '../types';
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

const addEntryToPatient = (patientId: string, entry: NewEntry): Patient => {
    const id = uuid();
    const newEntry: Entry = { id, ...entry }

    console.log("Patient Found", patients.find(patient => patient.id === patientId))

    const index = patients.findIndex(patient => patient.id === patientId)
    console.log("index;", index)

    if(index < 0) {
        throw new Error('Failed to add entry: Patient not found.')
    }

    patients[index].entries.push(newEntry)
    return patients[index]
};

export default {
    getEntries,
    getEntryById,
    getNonSensitiveEntries,
    addPatient,
    addEntryToPatient
};