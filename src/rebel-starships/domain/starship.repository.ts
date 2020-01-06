import {Starship} from './starship.aggregate-root';

export interface StarshipRepository {

    save(starship: Starship): Promise<void>;

    findById(id: Starship['id']): Promise<Starship>;

}
