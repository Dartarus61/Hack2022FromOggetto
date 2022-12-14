import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript'
import { AnotherEmail } from './anotherEmail.model'
import { Case, EPublished } from './case.model'
import { Category } from './category.model'
import { Comments } from './comment.model'
import { Location } from './location.model'
import { Partner } from './partner.model'

@Table({ tableName: 'Company', timestamps: false, freezeTableName: true })
export class Company extends Model<Company> {
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number

    @Column({ type: DataType.STRING, allowNull: false, unique: true })
    company_name: string

    @Column({ type: DataType.STRING, allowNull: false })
    description: string

    @Column({ type: DataType.STRING, allowNull: false })
    about_company: string

    @Column({ type: DataType.STRING, allowNull: false })
    logo_dir: string

    @Column({ type: DataType.STRING, allowNull: false })
    mainIcon_dir: string

    @Column({ type: DataType.STRING, allowNull: false })
    login: string

    @Column({ type: DataType.STRING, allowNull: false })
    password: string

    @Column({ type: DataType.STRING, allowNull: false })
    email: string

    @Column({ type: DataType.STRING, allowNull: false })
    name: string

    @Column({ type: DataType.STRING, allowNull: false })
    surname: string

    @Column({ type: DataType.STRING, allowNull: false })
    lastName: string

    @Column({ type: DataType.INTEGER, allowNull: false, unique: true})
    INN: number

    @Column({ type: DataType.STRING, allowNull: false })
    legal_adress: string

    @Column({ type: DataType.STRING, allowNull: false })
    adress_of_prod: string

    @Column({ type: DataType.STRING, allowNull: false }) 
    location: string

    @Column({ type: DataType.BOOLEAN, allowNull: false })
    import_substitution: boolean

    @Column({ type: DataType.STRING, allowNull: false })
    phoneNumber: string

    @Column({ type: DataType.ENUM("YES",'NO','DENIED'), allowNull: false,defaultValue:'NO' })
    published: EPublished

    @HasMany(() => Partner)
    partners: Partner[]

    @HasMany(() => AnotherEmail)
    anotherEmail: AnotherEmail[]

    @HasMany(() => Comments)
    comment: Comments[]

    @HasMany(() => Location)
    locations: Location[]

    @HasMany(() => Category)
    category: Category[]

    @HasMany(() => Case)
    cases: Case[]
}   
