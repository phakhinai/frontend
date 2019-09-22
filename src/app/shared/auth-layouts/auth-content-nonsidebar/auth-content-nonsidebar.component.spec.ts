import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthContentNonsidebarComponent } from './auth-content-nonsidebar.component';

describe('AuthContentNonsidebarComponent', () => {
  let component: AuthContentNonsidebarComponent;
  let fixture: ComponentFixture<AuthContentNonsidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthContentNonsidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthContentNonsidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
