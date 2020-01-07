import {Injectable} from '@nestjs/common';

export interface TimeProvider {
    currentDate(): Date;
}
