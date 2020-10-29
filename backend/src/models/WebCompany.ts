import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('web_company')
export default class WebCompany {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    active: boolean;
}