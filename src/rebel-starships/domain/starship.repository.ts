import {Starship} from './starship.aggregate-root';

export interface StarshipRepository {

    save(starship: Starship): Promise<void>;

}
