import { Component, HostListener } from '@angular/core';
import { DataService } from '../../shared/services/data/data.service';
import { ApiService } from '../../shared/services/api/api.service';
import { AsyncPipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { IPost } from '../../shared/interfaces/post';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { SkeletonModule } from 'primeng/skeleton';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [AsyncPipe,ButtonModule,InfiniteScrollModule, SkeletonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  constructor(
    public dataService:DataService, 
    private apiService: ApiService,
    private router:Router
  ){
    
    dataService.loadPost()
  }
  onScrollDown(){
    this.dataService.count++;
    this.dataService.count <10 ? this.dataService.loadPost(true): '';
  }
  createNewPost(){
    localStorage.removeItem('selectedPost');
    this.dataService.selectedPost = {}
    this.router.navigate(['/post-form']);
  }
  readMore(post:IPost){
    localStorage.setItem('selectedPost', JSON.stringify(post));
    this.router.navigate(['/post/' + post.id]);
  }
}
