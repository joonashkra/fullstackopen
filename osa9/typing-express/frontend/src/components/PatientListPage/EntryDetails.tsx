import { Entry } from "../../types";
import { assertNever } from "../../utils";

const EntryDetails = ({ entry }: { entry: Entry }) => {
        switch (entry.type) {
            case "Hospital":
                return entry.discharge ? <p>Discharge: {entry.discharge.date}, {entry.discharge.criteria}</p> : null;

            case "OccupationalHealthcare":
                return (
                    <div>
                        <p>Employer: {entry.employerName}</p>
                        {entry.sickLeave ? <p>Sick leave from {entry.sickLeave.startDate} to {entry.sickLeave.endDate}</p> : null}
                    </div>    
                );
                
            case "HealthCheck":
                return <p>Health Rating: {entry.healthCheckRating}</p>;
    
            default:
                return assertNever(entry);
        }
};

export default EntryDetails;