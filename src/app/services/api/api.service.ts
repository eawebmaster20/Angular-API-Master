import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private  http:HttpClient) { }

  getPost(): Observable<any>{
    return this.http.get('https://jsonplaceholder.typicode.com/posts');
  }

  createPost(post:any): Observable<any>{
    return this.http.post('https://jsonplaceholder.typicode.com/comments',{});
  }

  getPostComments(postId:string): Observable<any>{
    return this.http.get('https://jsonplaceholder.typicode.com/posts/1/comments');
  }

  updatePost(postId:string): Observable<any>{
    return this.http.put('https://jsonplaceholder.typicode.com/users',{});
  }

}
