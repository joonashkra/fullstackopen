import data from "../../data/diagnoseData";
import { Diagnosis } from "../types";

const diagnoses: Diagnosis[] = data;

const getEntries = (): Diagnosis[] => {
    return diagnoses;
};

export default {
    getEntries
};