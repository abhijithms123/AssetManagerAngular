import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetFilteredListComponent } from './asset-filtered-list.component';

describe('AssetFilteredListComponent', () => {
  let component: AssetFilteredListComponent;
  let fixture: ComponentFixture<AssetFilteredListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssetFilteredListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssetFilteredListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
