/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ClotheItemRendererComponent } from './clothe-item-renderer.component';

describe('ClotheItemRendererComponent', () => {
  let component: ClotheItemRendererComponent;
  let fixture: ComponentFixture<ClotheItemRendererComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClotheItemRendererComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClotheItemRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
