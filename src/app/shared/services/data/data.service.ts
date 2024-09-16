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
  //  if (JSON.parse(localStorage.getItem('posts')!).length>0) {
  //   return;
  //  }
   this.apiService.getPosts(this.count)
   .subscribe(data =>{
    if (localStorage.getItem('posts')) {
      this.posts=[...JSON.parse(localStorage.getItem('posts')!), ...data]
      localStorage.setItem('posts', JSON.stringify(this.posts));
    }
    else {
      localStorage.setItem('posts', JSON.stringify(data));
      this.posts=data;
    }
  })
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
