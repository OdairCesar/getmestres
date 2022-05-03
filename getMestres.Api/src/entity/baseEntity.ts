import { Column, CreateDateColumn, PrimaryGeneratedColumn } from "typeorm"

export abstract class BaseEntity {

  @PrimaryGeneratedColumn('uuid')
  uid: String
  
  @Column({
    default: true,
  })
  active: Boolean;

  @Column({
    default: true,
  })
  deleted: Boolean;

  @CreateDateColumn({
    type: "timestamp"
  })
  createAt: Date;

  @CreateDateColumn({
    type: "timestamp"
  })
  updateAt: Date;
}
