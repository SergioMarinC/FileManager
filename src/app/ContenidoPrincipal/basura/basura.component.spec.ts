/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BasuraComponent } from './basura.component';

describe('BasuraComponent', () => {
  let component: BasuraComponent;
  let fixture: ComponentFixture<BasuraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasuraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasuraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
