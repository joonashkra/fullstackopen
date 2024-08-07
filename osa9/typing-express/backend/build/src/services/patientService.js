"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patientData_1 = __importDefault(require("../../data/patientData"));
const uuid_1 = require("uuid");
const patients = patientData_1.default;
const getEntries = () => {
    return patients;
};
const getNonSensitiveEntries = () => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id, name, dateOfBirth, gender, occupation
    }));
};
const addPatient = (patient) => {
    const id = (0, uuid_1.v1)();
    const newPatient = Object.assign({ id }, patient);
    patients.push(newPatient);
    return newPatient;
};
exports.default = {
    getEntries,
    getNonSensitiveEntries,
    addPatient
};
