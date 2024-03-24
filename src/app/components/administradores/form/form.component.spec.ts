import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAdmComponent } from './form.component';

describe('FormAdmComponent', () => {
  let component: FormAdmComponent;
  let fixture: ComponentFixture<FormAdmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormAdmComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormAdmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
