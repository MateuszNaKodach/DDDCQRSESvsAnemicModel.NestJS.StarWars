import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {NestEventSourcingModule} from './nest-event-sourcing/nest-event-sourcing.module';
import { NestTimeProviderModule } from './nest-time-provider/nest-time-provider.module';
import { RebelStarshipsModule } from './rebel-starships/rebel-starships.module';

@Module({
  imports: [NestEventSourcingModule, NestTimeProviderModule, RebelStarshipsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
