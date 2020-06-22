import { Lodging } from 'src/app/data/lodging.model';
import { Rental } from 'src/app/data/rental.model';
import { Review } from 'src/app/data/review.model';
import { Location } from 'src/app/data/location.model';
import { Booking } from 'src/app/data/booking.model';
import { BookingSearchData } from './@types/booking-search-data';
import { FormControl, FormGroup } from '@angular/forms';
import { formatDate, getNewDateFromNowBy } from './utils/date-helpers';
import { RentalUnit } from 'src/app/data/rental-unit.model';

const locationsMock: Location[] = [
  {
    id: '0',
    address: {
      id: '0',
      city: 'Los Angeles',
      country: 'USA',
      postalCode: '90210',
      stateProvince: 'CA',
      street: '7421 Something Dr'
    },
    latitude: '34.0522',
    locale: 'N/A',
    longitude: '118.2437',
  },
  {
    id: '1',
    address: {
      id: '1',
      city: 'Austin',
      country: 'USA',
      postalCode: '90210',
      stateProvince: 'TX',
      street: '7421 Something Dr'
    },
    latitude: '30.2672',
    locale: 'N/A',
    longitude: '97.7431',
  }
];

const rentalUnitMock: RentalUnit = {
  id: 'id',
  name: 'rental unit',
  bathrooms: [],
  bedrooms: [],
  occupancy: 1,
  type: 'bungalow'
};

const rentalsMock: Rental[] = [
  {
    id: '0',
    name: 'Nice Place',
    rentalUnit: rentalUnitMock,
  },
  {
    id: '1',
    name: 'Nicer Place',
    rentalUnit: rentalUnitMock,
  },
];

const reviewsMock: Review[] = [
  { id: '0', accountId: '0', hotelId: '0', comment: '0', dateCreated: new Date(), rating: 4 },
];

const lodgingsMock: Lodging[] = [
  {
    id: '0',
    location: locationsMock[0],
    name: 'A Place',
    rentals: rentalsMock,
    reviews: reviewsMock,
  },
  {
    id: '1',
    location: locationsMock[1],
    name: 'The Lodging',
    rentals: rentalsMock,
    reviews: reviewsMock,
  },
];

const bookingsMock: Booking[] = [
  {
    id: '0',
    accountId: '0',
    lodgingId: '0',
    guests: [],
    rentals: [],
    stay: null,
    status: 'Valid',
  },
];

const bookingsSearchInputMock: BookingSearchData[] = [
  {
    guests: new FormControl(1),
    checkIn: new FormControl('2020-01-01'),
    checkOut: new FormControl('2020-02-01'),
    location: new FormControl('Los Angeles'),
  },
];

export { locationsMock, lodgingsMock, rentalsMock, reviewsMock, bookingsMock, bookingsSearchInputMock };
