import { newHealthcheckEntrySchema, newHospitalEntrySchema, newOccupationalEntrySchema } from '../../schemas';
import { EntryType, NewEntry, HealthCheckRating, Patient } from '../../types'
import patientService from '../../services/patients';
import React from 'react';

interface EntryFormProps {
    type: keyof typeof EntryType;
    patient: Patient;
    setPatient: React.Dispatch<React.SetStateAction<Patient | undefined>>;
    setErrorMsg: React.Dispatch<React.SetStateAction<string>>;
}

export default function EntryForm({ type, patient, setPatient, setErrorMsg }: EntryFormProps) {

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setErrorMsg("");

        const formData = new FormData(e.currentTarget);
        const formValues = Object.fromEntries(formData);

        let parseEntry;

        const { healthCheckRating, diagnosisCodes, dischargeDate, dischargeCriteria, sickLeaveStart, sickLeaveEnd, ...baseProperties } = formValues
        const diagnosisCodesArray = diagnosisCodes.toString().split(", ")


        switch (type) {
            case EntryType.HealthCheck:
                parseEntry = newHealthcheckEntrySchema.safeParse({
                    ...baseProperties,
                    diagnosisCodes: diagnosisCodesArray,
                    healthCheckRating: Number(healthCheckRating) as HealthCheckRating
                });
                break;
            case EntryType.Hospital:
                parseEntry = newHospitalEntrySchema.safeParse({
                    ...baseProperties,
                    diagnosisCodes: diagnosisCodesArray,
                    discharge: { date: dischargeDate, criteria: dischargeCriteria }
                })
                break;
            case EntryType.OccupationalHealthcare:
                parseEntry = newOccupationalEntrySchema.safeParse({
                    ...baseProperties,
                    diagnosisCodes: diagnosisCodesArray,
                    sickLeave: { startDate: sickLeaveStart, endDate: sickLeaveEnd }
                })
                break;
            default:
                break;
        }

        if (parseEntry) {
            if(!parseEntry.success) {
                console.error(JSON.parse(parseEntry.error.message));
                const errors = JSON.parse(parseEntry.error.message);
                setErrorMsg(errors.map((error: { message: string; path: string[] }) => error.message + ` (${error.path[0]})`).join(", "))
                setTimeout(() => {
                    setErrorMsg('');
                }, 10000)
            } else {
                const parsedEntryData: NewEntry = { ...parseEntry.data, type: EntryType[type] }
                const updatedPatient = await patientService.addEntry(patient.id, parsedEntryData);
                console.log(updatedPatient)
                setPatient(updatedPatient)
            }
        }
    };

    const formInputsByType = () => {
        switch (type) {
            case EntryType.HealthCheck:
                return <>
                    <label htmlFor="healthCheckRating">Healthcheck rating</label>
                    <input type="number" name='healthCheckRating' placeholder='E.g. 1, 2, 3...' required />
                </>
            case EntryType.OccupationalHealthcare:
                return <>
                    <label htmlFor="employerName">Employer name</label>
                    <input type="text" name='employerName' placeholder='Employer name...' required />

                    <label htmlFor="sickLeaveStart">Sickleave start</label>
                    <input type="date" name='sickLeaveStart' required />

                    <label htmlFor="sickLeaveEnd">Sickleave end</label>
                    <input type="date" name='sickLeaveEnd' required />
                </>
            case EntryType.Hospital:
                return <>
                    <label htmlFor="employerName">Discharge date</label>
                    <input type="date" name='dischargeDate' required />

                    <label htmlFor="dischargeCriteria">Discharge criteria</label>
                    <input type="text" name='dischargeCriteria' required />
                </>
            default:
                return;
        }
    }
    
  return (
    <form onSubmit={handleSubmit} className='entry-form' style={{ display: 'flex', flexDirection: 'column', maxWidth: 'max-content' }}>
        <label htmlFor="description">Description</label>
        <input type="text" name='description' placeholder='Description for entry...' required />

        <label htmlFor="date">Date</label>
        <input type='date' name='date' required />

        <label htmlFor="specialist">Specialist</label>
        <input type='text' name='specialist' placeholder='Specialist name...' required />

        <label htmlFor="diagnosisCodes">Diagnosis codes</label>
        <input type='text' name='diagnosisCodes' placeholder='E.g. "Z57.1, N30.0"' />

        { formInputsByType() }

        <button type='submit'>Create</button>
    </form>
  )
}