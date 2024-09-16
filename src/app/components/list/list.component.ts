import { Component, HostListener } from '@angular/core';
import { DataService } from '../../shared/services/data/data.service';
import { ApiService } from '../../shared/services/api/api.service';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { IPost } from '../../shared/interfaces/post';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [AsyncPipe, RouterLink,InfiniteScrollModule, SkeletonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  constructor(public dataService:DataService, private apiService: ApiService){
    dataService.loadPost()
  }
  onScrollDown(){
    this.dataService.count++;
    this.dataService.count <10 ? this.dataService.loadPost(): '';
  }
}
