import {Fraction} from '../../domain/fraction.enum';

export class CaptureStarshipRequestBody {
    targetId: string;
    byFraction: Fraction;
}
