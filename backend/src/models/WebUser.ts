import { Entity, Column, CreateDateColumn, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

import WebCompany from './WebCompany';

@Entity('web_user')
export default class WebUser {
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
    
    @CreateDateColumn({ name: "add_at" })
    add_at: Date;

    @ManyToOne(() => WebCompany, webCompany => webCompany.webUsers)
    @JoinColumn({ name: 'web_company_id' })
    webCompany: WebCompany
}