import { Entity, Column, CreateDateColumn, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm';

import WebUser from './WebUser';

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
    
    @CreateDateColumn({ name: "add_at" })
    add_at: Date;

    @OneToMany(() => WebUser, webUser => webUser.webCompany, {
        nullable: true,
        cascade: ['insert', 'update']
    })
    @JoinColumn({ name: 'web_company_id' })
    webUsers: WebUser[];
}