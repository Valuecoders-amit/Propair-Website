export interface IStudent {
    _id: string,
    firstName: string,
    lastName: string,
    email: string,
    year: number,
    class: number,
    createdAt:number
}

export interface IStudentData extends IStudent {
    value: boolean
}