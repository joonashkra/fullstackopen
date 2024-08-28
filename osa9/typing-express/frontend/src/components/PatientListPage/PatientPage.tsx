import { useEffect, useState } from 'react';
import patientService from '../../services/patients';
import { useParams } from 'react-router-dom';
import { Diagnosis, Patient } from '../../types';
import EntryDetails from './EntryDetails';

const PatientPage = ({ diagnoses }: { diagnoses: Diagnosis[] }) => {
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient>();

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
      <h1>{patient.name}</h1>
      <p>Gender: {patient.gender}</p>
      <p>Occupation: {patient.occupation}</p>
      <p>SSN: {patient.ssn}</p>
      <p>DOB: {patient.dateOfBirth}</p>
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