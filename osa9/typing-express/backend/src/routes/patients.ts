import express from 'express';
import patientService from '../services/patientService';
import { toNewPatientEntry, toNewPatient } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientService.getNonSensitiveEntries());
});

router.post('/', (req, res) => {
    const newPatient = toNewPatient(req.body);
    res.send(patientService.addPatient(newPatient));
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    res.send(patientService.getEntryById(id));
});

router.post('/:id/entries', (req, res) => {
    const newEntry = toNewPatientEntry(req.body);
    const id = req.params.id;
    res.send(patientService.addEntryToPatient(id, newEntry));
});

export default router;