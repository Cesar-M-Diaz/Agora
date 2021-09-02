import { v4 as uuidv4 } from 'uuid' 

export const categories=[
    { _id:uuidv4(), subject: "math", focus: "math", profession: "chemical engineer", tutorId:"" },
    { _id:uuidv4(), subject: "chemistry", focus: "chemistry", profession: "civil engineer", tutorId:"" },
    { _id:uuidv4(), subject: "biology", focus: "biology", profession: "electrical engineer", tutorId:"" },
    { _id:uuidv4(), subject: "physics", focus: "physics", profession: "mechanical engineer", tutorId:"" },
]