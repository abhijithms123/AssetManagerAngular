import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { of } from 'rxjs';
import { HardwareListService } from '../list-service/hardware-list.service';
import { HardwareAsset } from '../models/hardware-asset';

import { UserHardwareListComponent } from './user-hardware-list.component';

describe('UserHardwareListComponent', () => {
  let component: UserHardwareListComponent;
  let fixture: ComponentFixture<UserHardwareListComponent>;
  let mockHardwareServie: jasmine.SpyObj<HardwareListService>;
  let Router: Router;
  let ngxSmartModalService: NgxSmartModalService;
  beforeEach(async () => {
    
    mockHardwareServie = jasmine.createSpyObj('HardwareListService', ['getHardwareList', 'getOptionValues', 'filterhardwares', 'getSearchByHardware']);

    await TestBed.configureTestingModule({
      declarations: [ UserHardwareListComponent ],
      providers: [{provide: HardwareListService,
        useValue: mockHardwareServie},
      Router,
       NgxSmartModalService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserHardwareListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should return a page of hardwares',() => {
  //         // Arrange
          
        
  //         const pageNumber = 1;
  //         const hardwareAsset = {
  //           hardwareAvaliableList: [{ id: 1, hardareType: 'Laptop', manufacturingCompany: 'Dell',modelName: 'das',configuration:'8gb',assetType: 'Hardware', status: 'Unallocated' },],
  //           totalItems: 1,
  //           totalPages: 1,
  //         };
  //         const hardwares: HardwareAsset{} = {
  //           hardwareAvaliableList: [{ id: 1, hardareType: 'Laptop', manufacturingCompany: 'Dell',modelName: 'das',configuration:'8gb',assetType: 'Hardware', status: 'Unallocated' },],
  //         };

  //         mockHardwareServie.getHardwareList.and.returnValue(of(hardwares));

  //         // Act
  //         component['getHardwares'](pageNumber);

    
  //         // Assert
  //         expect(mockHardwareServie.getHardwareList).toHaveBeenCalledWith(pageNumber);
  //       //  expect(component.list).toEqual(hardwareAsset.hardwareAvaliableList);
  //       //  expect(component.count).toEqual(hardwareAsset.totalItems);

      
  })
  
  

// });
