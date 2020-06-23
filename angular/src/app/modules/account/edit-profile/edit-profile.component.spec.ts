import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EditProfileComponent } from './edit-profile.component';
import { AccountService } from 'src/app/services/account/account.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { Profile } from '../../../data/profile.model';

describe('EditProfileComponent', () => {
  let component: EditProfileComponent;
  let fixture: ComponentFixture<EditProfileComponent>;

  let accountServiceMock;
  let profileMock: Profile[];

  beforeEach(async(() => {
    accountServiceMock = jasmine.createSpyObj(['getProfile', 'getUserId', 'postProfile', 'deleteProfile']);

    TestBed.configureTestingModule({
      declarations: [EditProfileComponent],
      providers: [
        { provide: AccountService, useValue: accountServiceMock }
      ],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [FormsModule, RouterTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    profileMock = [
      {
        id: 1,
        email: 'JohnDoe@gmail.com',
        name: {
          id: 1,
          family: 'Doe',
          given: 'John'
        },
        phone: '1234567891',
        age: 'Adult',
        image: null
      },
      {
        id: 2,
        email: 'JohnDoe@gmail.com',
        name: {
          id: 1,
          family: 'Doe',
          given: 'John'
        },
        phone: '1234567891',
        age: 'Adult',
        image: null
      },
    ];
    fixture = TestBed.createComponent(EditProfileComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load profile on creation', () => {
    accountServiceMock.getProfile.and.returnValue(of(profileMock));
    accountServiceMock.getUserId.and.returnValue(of(1));
    fixture.detectChanges();

    expect(component.profiles).toBe(profileMock);
  });

  describe('toggleProfile', () => {

    it('should show profile after toggle', () => {
      component.toggleProfile();

      expect(component.hideProfile).toBeFalse();
      // Test the actual element
    });
  });

  describe('isNullOrWhitespace', () => {
    it('should return true on null string', () => {

      expect(component.isNullOrWhitespace(null)).toBeTrue();
    });
    it('should return true on empty string', () => {

      expect(component.isNullOrWhitespace('')).toBeTrue();
    });
    it('should return true on string of spaces string', () => {

      expect(component.isNullOrWhitespace('  ')).toBeTrue();
    });
    it('should return false on non null/emtpy string', () => {

      expect(component.isNullOrWhitespace('null')).toBeFalse();
    });
  });

  describe('addProfile', () => {
    it('should add valid profile', () => {
      accountServiceMock.getProfile.and.returnValue(of(profileMock));
      accountServiceMock.getUserId.and.returnValue(of(1));
      accountServiceMock.postProfile.and.returnValue(of(true));
      const newProfile: Profile = {
        id: 1,
        accountId: 1,
        email: 'tom@tim.com',
        name: {
          id: 0,
          family: 'tim',
          given: 'tom'
        },
        phone: '5551234567',
        age: 'Adult',
        image: null
      };
      component.newProfile = newProfile;
      profileMock.push(newProfile);
      fixture.detectChanges();
      component.addProfile();

      expect(component.profiles.length).toBe(3);
      expect(component.profiles[2].email).toBe('tom@tim.com');
    });
  });

  describe('removeProfile', () => {
    it('should remove correct profile', () => {
      accountServiceMock.getProfile.and.returnValue(of(profileMock));
      accountServiceMock.getUserId.and.returnValue(of(1));
      accountServiceMock.deleteProfile.and.returnValue(of(true));
      fixture.detectChanges();

      component.removeProfile(profileMock[0].id);
      profileMock.shift();

      expect(component.profiles.length).toBe(1);
      expect(component.profiles[0]).toBe(profileMock[0]);
    });
  });
});
