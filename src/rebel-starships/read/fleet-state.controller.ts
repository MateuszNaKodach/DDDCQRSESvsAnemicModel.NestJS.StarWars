import {Controller, Get, Inject, Param} from '@nestjs/common';
import {FleetStateRepository} from './fleet-state.repository';
import {Fraction} from '../write/domain/fraction.enum';

@Controller('fleet-state')
export class FleetStateController {

    constructor(@Inject('FleetStateRepository') private fleetStateRepository: FleetStateRepository) {
    }

    @Get(':fraction')
    getFleetStateBy(@Param('fraction') fraction: Fraction) {
        return this.fleetStateRepository.findBy(fraction);
    }

}
