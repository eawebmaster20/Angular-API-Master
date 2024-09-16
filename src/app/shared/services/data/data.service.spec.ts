import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { DataService } from './data.service'; // Update the path if needed
import { ApiService } from '../api/api.service';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { IPost } from '../../interfaces/post';
import { IUser } from '../../interfaces/user';

describe('DataService', () => {
  let service: DataService;
  let apiService: jasmine.SpyObj<ApiService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const apiServiceSpy = jasmine.createSpyObj('ApiService', ['getPosts', 'getPost', 'getUser', 'deletePost']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        DataService,
        { provide: ApiService, useValue: apiServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    });

    service = TestBed.inject(DataService);
    apiService = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should load posts and append them to existing posts', () => {
    const mockPosts: IPost[] = [{ id: 1, title: 'Post 1' }, { id: 2, title: 'Post 2' }];
    apiService.getPosts.and.returnValue(of(mockPosts));

    service.loadPost();

    expect(apiService.getPosts).toHaveBeenCalledWith(service.count);
    expect(service.posts.length).toBe(2);
    expect(service.posts).toEqual(mockPosts);
  });

  it('should not load posts if users are already available', () => {
    service.users = [{ id: 1, name: 'John Doe' }];
    service.loadPost();
    expect(apiService.getPosts).not.toHaveBeenCalled();
  });

  it('should load selected post if it exists in posts array', () => {
    service.posts = [{ id: 1, title: 'Post 1' }];
    service.loadSelectedPost(1);

    expect(service.selectedPost.id).toBe(1);
    expect(apiService.getPost).not.toHaveBeenCalled();
  });

  it('should make API calls to load post and user if post is not found in posts array', () => {
    const mockPost = { id: 1, title: 'Post 1' };
    const mockUser = [{ id: 1, name: 'John Doe' }];

    apiService.getPost.and.returnValue(of(mockPost as any));
    apiService.getUser.and.returnValue(of(mockUser));

    service.loadSelectedPost(1);

    expect(apiService.getPost).toHaveBeenCalledWith(1);
    expect(apiService.getUser).toHaveBeenCalledWith(1);
    expect(service.selectedPost).toEqual({});
  });

  it('should delete selected post and navigate to home', () => {
    service.selectedPost = { id: 1, title: 'Post 1' };
    service.posts = [{ id: 1, title: 'Post 1' }, { id: 2, title: 'Post 2' }];

    apiService.deletePost.and.returnValue(of(null));

    service.deleteSelectedPost();

    expect(apiService.deletePost).toHaveBeenCalledWith(1);
    expect(service.posts.length).toBe(1);
    expect(service.selectedPost).toEqual({});
    expect(router.navigate).toHaveBeenCalledWith(['/home']);
  });

  it('should handle error when deleting selected post', () => {
    const error = new Error('Delete failed');
    service.selectedPost = { id: 1, title: 'Post 1' };

    apiService.deletePost.and.returnValue(of(null));
    spyOn(console, 'error');

    service.deleteSelectedPost();

    expect(console.error).toHaveBeenCalledWith('Error', jasmine.anything());
  });
});
