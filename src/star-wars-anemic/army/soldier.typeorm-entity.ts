import {Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {Starship} from '../starship/starship.typeorm-entity';
import {Army} from './army.typeorm-entity';

@Entity({name: 'anemic_soldier'})
export class Soldier {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(type => Starship)
    starship: Starship;

    @ManyToOne(
        type => Army,
        army => army.soldiers,
    )
    army: Army;
}
