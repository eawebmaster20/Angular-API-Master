import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { IPost } from '../../interfaces/post';
import { IUser } from '../../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private  http:HttpClient) { }

  getUsers(){
    return this.http.get<IUser[]>(`${environment.BASE_API}/users`);
  }

  getPosts(){
    return this.http.get<IPost[]>(`${environment.BASE_API}/posts`, {
      params: { _page: 1, _limit: 10 }
    });
  }
  
  getPostComments(postId:string): Observable<any>{
    return this.http.get(`${environment.BASE_API}/comments?postId=${postId}`);
  }
  
    createPost(post:any): Observable<any>{
      return this.http.post(`${environment.BASE_API}/posts`,post);
    }

  updatePost(postId:number, data:any): Observable<any>{
    return this.http.patch(`${environment.BASE_API}/posts/${postId}`,data);
  }

  deletePost(postId:number): Observable<any>{
    return this.http.delete(`${environment.BASE_API}/posts/${postId}`);
  }

}
