import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetCategoryWidgetComponent } from './asset-category-widget.component';

describe('AssetCategoryWidgetComponent', () => {
  let component: AssetCategoryWidgetComponent;
  let fixture: ComponentFixture<AssetCategoryWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssetCategoryWidgetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssetCategoryWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
