export interface Examination
{
    id: number;
    petId: number;
    petOwnerId: number;
    vetId: number;
    examinationDate: Date;
    description: string;
}