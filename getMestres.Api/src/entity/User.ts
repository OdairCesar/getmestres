import { Entity, Column } from "typeorm"
import { BaseEntity } from "./baseEntity"

@Entity()
export class User extends BaseEntity{

    @Column({
        type: "varchar",
        length: 100
    })
    name: String

    @Column({
        type: "varchar",
        length: 100
    })
    photo: String

    @Column({
        type: "varchar",
        length: 100
    })
    email: String
    
    @Column({
        default: false,
    })
    isRoot: Boolean

    @Column({ 
        type: "varchar", 
        length: 100
    })
    password: String

}

