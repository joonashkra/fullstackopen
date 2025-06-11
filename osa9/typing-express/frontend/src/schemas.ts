import { z } from "zod/v4";

const newBaseEntrySchema = z.object({
    description: z.string().nonempty(),
    date: z.iso.date(),
    specialist: z.string().nonempty(),
    diagnosisCodes: z.array(z.string()).optional()
})

export const newHospitalEntrySchema = newBaseEntrySchema.extend({
    discharge: z.object({
        date: z.iso.date(),
        criteria: z.string().nonempty()
    })
})

export const newHealthcheckEntrySchema = newBaseEntrySchema.extend({
    healthCheckRating: z.number()
})

export const newOccupationalEntrySchema = newBaseEntrySchema.extend({
    employerName: z.string().nonempty(),
    sickLeave: z.object({
        startDate: z.iso.date(),
        endDate: z.iso.date()
    })
})