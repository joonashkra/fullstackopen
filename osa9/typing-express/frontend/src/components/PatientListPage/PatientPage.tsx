import { useEffect, useState } from 'react';
import patientService from '../../services/patients';
import { useParams } from 'react-router-dom';
import { Diagnosis, Patient } from '../../types';

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
      <p>{patient.name}</p>
      <p>{patient.gender}</p>
      <p>{patient.occupation}</p>
      <p>{patient.dateOfBirth}</p>
      <p>{patient.ssn}</p>
      <p>Entries</p>
      {patient.entries.map(entry => (
        <div key={entry.id}>
          <p>{entry.description}</p>
          <p>{entry.date}</p>
          <ul>
            {entry.diagnosisCodes?.map((code, index) => (
              <li key={index}>
                <p>{code} {findDiagnosis(code)}</p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default PatientPage;