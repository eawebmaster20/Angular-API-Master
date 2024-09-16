import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostDetailsComponent } from './post-details.component';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DataService } from '../../shared/services/data/data.service';
import { of, throwError } from 'rxjs';

describe('PostDetailsComponent', () => {
  let component: PostDetailsComponent;
  let fixture: ComponentFixture<PostDetailsComponent>;
  let dataService: jasmine.SpyObj<DataService>;
  let messageService: jasmine.SpyObj<MessageService>;
  let route: ActivatedRoute;
  
  beforeEach(async () => {
    const dataServiceSpy = jasmine.createSpyObj('DataService', ['loadSelectedPost']);
    const messageServiceSpy = jasmine.createSpyObj('MessageService', ['add']);
    const mockRoute = {
      paramMap: of({
        get: (key: string) => '1', // Mock the 'id' parameter
      })}
    await TestBed.configureTestingModule({
      imports: [PostDetailsComponent],
      providers: [
        { provide: DataService, useValue: dataServiceSpy },
        { provide: MessageService, useValue: messageServiceSpy },
        { provide: ActivatedRoute, useValue: mockRoute },
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PostDetailsComponent);
    component = fixture.componentInstance;
    dataService = TestBed.inject(DataService) as jasmine.SpyObj<DataService>;
    messageService = TestBed.inject(MessageService) as jasmine.SpyObj<MessageService>;
    route = TestBed.inject(ActivatedRoute);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should extract id from route and call loadSelectedPost and messageService.add', () => {
    component.ngOnInit();
    expect(component.id).toBe('1');
    expect(dataService.loadSelectedPost).toHaveBeenCalledWith(1);
    expect(messageService.add).toHaveBeenCalledWith({
      severity: 'success',
      summary: 'Success',
      detail: 'Message Content',
    });
  });

  it('should handle error from route.paramMap subscription', () => {
    const errorRoute = {
      paramMap: throwError(() => new Error('Some error')),
    };
    TestBed.overrideProvider(ActivatedRoute, { useValue: errorRoute });
    spyOn(console, 'error');
    component.ngOnInit();
    expect(console.error).toHaveBeenCalledWith('Error', jasmine.any(Error));
  });
});
