import { Injectable } from '@angular/core';
import { IPost } from '../../interfaces/post';
import { IUser } from '../../interfaces/user';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  users:IUser[] = [ ];
  posts:IPost[] =[]
  constructor(private apiService: ApiService) { }
  loadPost(){
    this.apiService.getPosts().subscribe(data =>this.posts = data)
  }
}
