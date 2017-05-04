/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RsAppComponent } from './rs-app.component';

describe('RsAppComponent', () => {
  let component: RsAppComponent;
  let fixture: ComponentFixture<RsAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RsAppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RsAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});