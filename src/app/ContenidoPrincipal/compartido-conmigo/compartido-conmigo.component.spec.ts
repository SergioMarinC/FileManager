/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CompartidoConmigoComponent } from './compartido-conmigo.component';

describe('CompartidoConmigoComponent', () => {
  let component: CompartidoConmigoComponent;
  let fixture: ComponentFixture<CompartidoConmigoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompartidoConmigoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompartidoConmigoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
