import express from 'express';
import patientService from '../services/patientService';
import toNewPatientEntry from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientService.getNonSensitiveEntries());
});

router.post('/', (req, res) => {
    const newPatientEntry = toNewPatientEntry(req.body);

    const newPatient = patientService.addPatient(newPatientEntry);

    res.json(newPatient);
});

router.get('/:id', (req, res) => {
    console.log("hello");
    const id = req.params.id;
    res.send(patientService.getEntryById(id));
});

export default router;