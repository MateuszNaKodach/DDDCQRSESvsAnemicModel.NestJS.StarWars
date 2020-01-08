import {Army} from './army.aggregate-root';

export interface ArmyRepository {

    save(army: Army): Promise<void>;

    findById(id: Army['id']): Promise<Army | null>;

}
