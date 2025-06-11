import { useEffect, useState } from 'react';
import patientService from '../../services/patients';
import { useParams } from 'react-router-dom';
import { Diagnosis, EntryType, Patient } from '../../types';
import EntryDetails from './EntryDetails';
import EntryForm from './EntryForm';
import { getEnumValues } from '../../utils';

const PatientPage = ({ diagnoses }: { diagnoses: Diagnosis[] }) => {
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient>();
  const [newEntryType, setNewEntryType] = useState<EntryType>(EntryType.HealthCheck);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const fetchPatient = async () => {
      if(id) {
        const patient = await patientService.getOne(id);
        setPatient(patient);
      }
    };
    fetchPatient();
  }, [id]);

  const findDiagnosis = (code: string) => {
    const diagnosis = diagnoses.find(diagnosis => diagnosis.code === code);
    if(diagnosis) return diagnosis.name;
  };


  if(!patient) return <>Loading...</>;

  return (
    <div>
      {errorMsg && <p style={{ width: '100%', backgroundColor: 'red', padding: '20px' }}>{ errorMsg }</p>}
      <h1>{patient.name}</h1>
      <p>Gender: {patient.gender}</p>
      <p>Occupation: {patient.occupation}</p>
      <p>SSN: {patient.ssn}</p>
      <p>DOB: {patient.dateOfBirth}</p>
      <h2>New entry</h2>
      <label htmlFor='entry-form-type-select'>Entry type: </label>
      <select name='entry-form-type-select' value={newEntryType} onChange={e => setNewEntryType(EntryType[e.target.value as keyof typeof EntryType])}>
        {getEnumValues(EntryType).map((key, index) => (
          <option key={index} value={EntryType[key]}>{ key }</option>
        ))}
      </select>
      <EntryForm type={newEntryType} patient={patient} setPatient={setPatient} setErrorMsg={setErrorMsg} />
      <hr/>
      <h2>Entries</h2>
      {patient.entries.map(entry => (
        <div key={entry.id}>
          <p style={{ fontWeight: "bold" }}>{entry.date}: {entry.type}</p>
          <p style={{ fontStyle: "italic" }}>{entry.description}</p>
          <ul>
            {entry.diagnosisCodes?.map((code, index) => (
              <li key={index}>
                <p>{code} {findDiagnosis(code)}</p>
              </li>
            ))}
          </ul>
          <EntryDetails entry={entry} />
          <p>Diagnose by {entry.specialist}</p>
          <hr/>
        </div>
      ))}
    </div>
  );
};

export default PatientPage;