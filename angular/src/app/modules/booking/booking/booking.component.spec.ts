import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BookingComponent } from './booking.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BookingModalComponent } from '../booking-modal/booking-modal.component';

fdescribe('BookingComponent', () => {
  let component: BookingComponent;
  let fixture: ComponentFixture<BookingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BookingComponent, BookingModalComponent],
      providers: [FormBuilder],
      imports: [HttpClientTestingModule, ReactiveFormsModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain "Guests"', () => {
    const bookingEl: HTMLElement = fixture.nativeElement;
    
    expect(bookingEl.textContent).toContain('Guest');
  });

  it('should ')
});
