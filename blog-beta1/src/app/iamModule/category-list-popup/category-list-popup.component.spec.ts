import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryListPopupComponent } from './category-list-popup.component';

describe('CategoryListPopupComponent', () => {
  let component: CategoryListPopupComponent;
  let fixture: ComponentFixture<CategoryListPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryListPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryListPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
