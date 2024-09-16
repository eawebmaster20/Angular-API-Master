import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListComponent } from './list.component';
import { DataService } from '../../shared/services/data/data.service';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let dataService: jasmine.SpyObj<DataService>;

  beforeEach(async () => {
    const dataServiceSpy = jasmine.createSpyObj('DataService', ['loadPost'], { count: 0 });
    await TestBed.configureTestingModule({
      imports: [ListComponent],
      providers: [{ provide: DataService, useValue: dataServiceSpy }],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should increment count on scroll down', () => {
    dataService.count = 0;
    component.onScrollDown();
    expect(dataService.count).toBe(1);
  });

  it('should call loadPost if count is less than 10', () => {
    dataService.count = 9;
    component.onScrollDown();
    expect(dataService.loadPost).toHaveBeenCalled();
  });

  it('should not call loadPost if count is 10 or more', () => {
    dataService.count = 10;
    component.onScrollDown();
    expect(dataService.loadPost).not.toHaveBeenCalled();
  });
});
