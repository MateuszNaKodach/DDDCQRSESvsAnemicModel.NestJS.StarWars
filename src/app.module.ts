import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventsourcingStarshipsModule } from './eventsourcing-starships/eventsourcing-starships.module';
import { EventsourcingModule } from './eventsourcing/eventsourcing.module';

@Module({
  imports: [EventsourcingStarshipsModule, EventsourcingModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
