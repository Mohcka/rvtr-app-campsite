import { BookingModule } from '../modules/booking/booking.module';
import { Booking } from './booking.model';
import { Lodging } from './lodging.model';

export interface AccountBooking extends Booking{
    lodging: Lodging;
}
