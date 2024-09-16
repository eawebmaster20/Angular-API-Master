import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from './api.service'; 
import { IPost } from '../../interfaces/post';
import { IUser } from '../../interfaces/user';
import { environment } from '../../../../environments/environment.development';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService],
    });

    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch users with getUsers', () => {
    const dummyUsers: IUser[] = [{ id: 1, name: 'John Doe' }];

    service.getUsers().subscribe((users) => {
      expect(users).toEqual(dummyUsers);
    });

    const req = httpMock.expectOne(`${environment.BASE_API}/users`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyUsers);
  });

  it('should fetch a single user by id with getUser', () => {
    const dummyUsers: IUser[] = [{ id: 1, name: 'John Doe' }];

    service.getUser(1).subscribe((users) => {
      expect(users).toEqual(dummyUsers);
    });

    const req = httpMock.expectOne(`${environment.BASE_API}/users?postId=1`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyUsers);
  });

  it('should fetch posts with getPosts', () => {
    const dummyPosts: IPost[] = [{ id: 1, title: 'Post 1' }];

    service.getPosts(1).subscribe((posts) => {
      expect(posts).toEqual(dummyPosts);
    });

    const req = httpMock.expectOne(`${environment.BASE_API}/posts?_page=1&_limit=10`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyPosts);
  });

  it('should fetch a single post by id with getPost', () => {
    const dummyPost: IPost = { id: 1, title: 'Post 1' };

    service.getPost(1).subscribe((post) => {
      expect(post).toEqual(dummyPost);
    });

    const req = httpMock.expectOne(`${environment.BASE_API}/posts/1`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyPost);
  });

  it('should fetch post comments with getPostComments', () => {
    const dummyComments = [{ id: 1, body: 'Nice post' }];

    service.getPostComments('1').subscribe((comments) => {
      expect(comments).toEqual(dummyComments);
    });

    const req = httpMock.expectOne(`${environment.BASE_API}/comments?postId=1`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyComments);
  });

  it('should create a post with createPost', () => {
    const newPost = { title: 'New Post', body: 'Post body' };

    service.createPost(newPost).subscribe((response) => {
      expect(response).toEqual(newPost);
    });

    const req = httpMock.expectOne(`${environment.BASE_API}/posts`);
    expect(req.request.method).toBe('POST');
    req.flush(newPost);
  });

  it('should update a post with updatePost', () => {
    const updatedPost = { title: 'Updated Post' };

    service.updatePost(1, updatedPost).subscribe((response) => {
      expect(response).toEqual(updatedPost);
    });

    const req = httpMock.expectOne(`${environment.BASE_API}/posts/1`);
    expect(req.request.method).toBe('PATCH');
    req.flush(updatedPost);
  });

  it('should delete a post with deletePost', () => {
    service.deletePost(1).subscribe((response) => {
      expect(response).toEqual(null);
    });

    const req = httpMock.expectOne(`${environment.BASE_API}/posts/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});
