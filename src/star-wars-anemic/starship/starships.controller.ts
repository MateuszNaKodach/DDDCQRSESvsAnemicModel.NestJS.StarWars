import {Body, Controller, HttpCode, Param, Post} from '@nestjs/common';
import {Fraction} from '../../star-wars-event-sourcing/write/sharedkernel/domain/fraction.enum';
import {StarshipsService} from './starships.service';

@Controller('/anemic/starships')
export class StarshipsController {

    constructor(private starshipsService: StarshipsService) {
    }

    @Post()
    prepareNewStarship(
        @Body('fraction') fraction: Fraction,
    ) {
        return this.starshipsService.prepare(fraction);
    }

    @HttpCode(200)
    @Post(':id/battle')
    sendStarshipToBattle(
        @Param('id') id: string,
    ) {
        return this.starshipsService.sendToBattle(id);
    }

}
