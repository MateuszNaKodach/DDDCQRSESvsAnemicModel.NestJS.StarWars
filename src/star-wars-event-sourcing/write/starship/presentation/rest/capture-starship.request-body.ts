import {Fraction} from '../../../sharedkernel/domain/fraction.enum';

export class CaptureStarshipRequestBody {
    targetId: string;
    byFraction: Fraction;
}
