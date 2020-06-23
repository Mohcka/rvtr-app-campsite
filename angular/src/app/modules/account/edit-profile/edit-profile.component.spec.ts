import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EditProfileComponent } from './edit-profile.component';
import { AccountService } from 'src/app/services/account/account.service';
// import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { Profile } from '../../../data/profile.model';
import { initial } from 'lodash';

describe('EditProfileComponent', () => {
  let component: EditProfileComponent;
  let fixture: ComponentFixture<EditProfileComponent>;

  let accountServiceMock;
  let profileMock: Profile[];

  beforeEach(async(() => {
    accountServiceMock = jasmine.createSpyObj(['getProfile', 'getUserId', 'postProfile', 'deleteProfile', 'isNullOrWhitespace']);

    TestBed.configureTestingModule({
      declarations: [EditProfileComponent],
      providers: [
        { provide: AccountService, useValue: accountServiceMock }
      ],
      // imports: [FormsModule]
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
    it('should change hideProfile value to opposite', () => {
      const initialValue = component.hideProfile;
      component.toggleProfile();

      expect(component.hideProfile).not.toBe(initialValue);
      // Test the actual element
    });
  });

  describe('removeImage', () => {
    it('should remove the newProfileImage', () => {
      component.newProfile.image = 'bcuidsbcuidsbcuibds';

      component.removeImage();
      expect(component.newProfile.image).toBeFalsy();
      expect(component.isImageSaved).toBeFalse();
    });
  });

  describe('addProfile', () => {
    it('should add valid profile', () => {
      accountServiceMock.getProfile.and.returnValue(of(profileMock));
      accountServiceMock.getUserId.and.returnValue(of(1));
      accountServiceMock.postProfile.and.returnValue(of(true));
      accountServiceMock.isNullOrWhitespace.and.returnValue(false);
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
    it('should not add profile with empty name', () => {
      accountServiceMock.getProfile.and.returnValue(of(profileMock));
      accountServiceMock.getUserId.and.returnValue(of(1));
      accountServiceMock.postProfile.and.returnValue(of(false));
      accountServiceMock.isNullOrWhitespace.and.returnValue(true);
      const newProfile: Profile = {
        id: 1,
        accountId: 1,
        email: 'tom@tim.com',
        name: {
          id: 0,
          family: '',
          given: ''
        },
        phone: '5551234567',
        age: 'Adult',
        image: null
      };
      component.newProfile = newProfile;
      fixture.detectChanges();
      component.addProfile();

      expect(accountServiceMock.postProfile).not.toHaveBeenCalled();
    });
    // it('should not add profile with duplicate names', () => {
    //   accountServiceMock.getProfile.and.returnValue(of(profileMock));
    //   accountServiceMock.getUserId.and.returnValue(of(1));
    //   accountServiceMock.postProfile.and.returnValue(of(false));
    //   const newProfile: Profile = {
    //     id: 1,
    //     accountId: 1,
    //     email: 'tom@tim.com',
    //     name: {
    //       id: 0,
    //       family: 'Doe',
    //       given: 'John'
    //     },
    //     phone: '5551234567',
    //     age: 'Adult',
    //     image: null
    //   };
    //   component.newProfile = newProfile;
    //   fixture.detectChanges();
    //   component.addProfile();

    //   expect(accountServiceMock.postProfile).not.toHaveBeenCalled();
    // });
    // it('should not add profile with invalid phone number', () => {
    //   accountServiceMock.getProfile.and.returnValue(of(profileMock));
    //   accountServiceMock.getUserId.and.returnValue(of(1));
    //   accountServiceMock.postProfile.and.returnValue(of(false));
    //   const newProfile: Profile = {
    //     id: 1,
    //     accountId: 1,
    //     email: 'tom@tim.com',
    //     name: {
    //       id: 0,
    //       family: 'tim',
    //       given: 'tom'
    //     },
    //     phone: '5551234',
    //     age: 'Adult',
    //     image: null
    //   };
    //   component.newProfile = newProfile;
    //   fixture.detectChanges();
    //   component.addProfile();

    //   expect(accountServiceMock.postProfile).not.toHaveBeenCalled();
    // });
    // it('should not add profile with empty email', () => {
    //   accountServiceMock.getProfile.and.returnValue(of(profileMock));
    //   accountServiceMock.getUserId.and.returnValue(of(1));
    //   accountServiceMock.postProfile.and.returnValue(of(false));
    //   const newProfile: Profile = {
    //     id: 1,
    //     accountId: 1,
    //     email: '',
    //     name: {
    //       id: 0,
    //       family: 'tim',
    //       given: 'tom'
    //     },
    //     phone: '5551234567',
    //     age: 'Adult',
    //     image: null
    //   };
    //   component.newProfile = newProfile;
    //   fixture.detectChanges();
    //   component.addProfile();

    //   expect(accountServiceMock.postProfile).not.toHaveBeenCalled();
    // });
  });

  describe('removeProfile', () => {
    it('should remove profile', () => {
      accountServiceMock.getProfile.and.returnValue(of(profileMock));
      accountServiceMock.getUserId.and.returnValue(of(1));
      accountServiceMock.deleteProfile.and.returnValue(of(true));

      fixture.detectChanges();

      component.removeProfile(profileMock[0].id);

      expect(accountServiceMock.deleteProfile).toHaveBeenCalled();
    });
  });
});
