import { Injectable } from '@angular/core';
import { IDisplayedPost, IPost } from '../../interfaces/post';
import { IUser } from '../../interfaces/user';
import { ApiService } from '../api/api.service';
import { mergeMap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  users:IUser[] = [ ];
  posts:IPost[] =[]
  count:number =1;
  selectedPost: Partial<IDisplayedPost>={ }
  constructor(private apiService: ApiService, private router:Router) { }
  loadPost(){
   if (this.users.length>0) {
    return;
   }
   this.apiService.getPosts(this.count).subscribe(data =>this.posts=[...this.posts, ...data])
  }

  loadSelectedPost(id:number){
    let selected = this.posts.filter(post=>post.id === id)
    !!selected[0] 
    ? this.selectedPost = {...this.selectedPost, ...selected[0]} 
    : this.apiService.getPost(id).pipe(
      mergeMap(()=>this.apiService.getUser(id))
    ).subscribe(res=>console.log(res))
    console.log('selectedPost :',this.selectedPost)
    console.log('selected :',selected[0])
    console.log('id :',id)
  }

  deleteSelectedPost(){
    this.apiService.deletePost(this.selectedPost.id!).subscribe(
      {
        next: () => {
          console.log('Deleted post', this.selectedPost.id)
          this.posts = this.posts.filter(post=>post.id!== this.selectedPost.id)
          this.selectedPost = {} as IDisplayedPost
          this.router.navigate(['/home'])
        },
        error: err => console.error('Error', err)
      }
    )
  }
}
