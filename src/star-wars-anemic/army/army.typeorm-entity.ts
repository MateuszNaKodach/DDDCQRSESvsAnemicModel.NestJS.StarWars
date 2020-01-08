import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {Fraction} from '../../star-wars-event-sourcing/write/domain/fraction.enum';
import {Soldier} from './soldier.typeorm-entity';

@Entity({name: 'anemic_army'})
export class Army {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    fraction: Fraction;

    @OneToMany(
        type => Soldier,
        soldier => soldier.army,
        {cascade: true},
    )
    soldiers: Soldier[];
}
