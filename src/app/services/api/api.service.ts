import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private  http:HttpClient) { }

  getPost(): Observable<any>{
    return this.http.get(`${environment.BASE_API}/posts`);
  }

  createPost(post:any): Observable<any>{
    return this.http.post(`${environment.BASE_API}/posts`,post);
  }

  getPostComments(postId:string): Observable<any>{
    return this.http.get(`${environment.BASE_API}/comments?postId=1`);
  }

  updatePost(postId:string, data:any): Observable<any>{
    return this.http.patch(`${environment.BASE_API}/posts/${postId}`,data);
  }

}
