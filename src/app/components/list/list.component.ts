import { Component, HostListener } from '@angular/core';
import { DataService } from '../../shared/services/data/data.service';
import { ApiService } from '../../shared/services/api/api.service';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { IPost } from '../../shared/interfaces/post';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [AsyncPipe, RouterLink],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  constructor(public dataService:DataService, private apiService: ApiService){
    dataService.loadPost()
  }
  @HostListener('scroll', ['$event'])
  onScroll(event: any): void {
    // const pos = (document.documentElement.scrollTop || document.body.scrollTop) + window.innerHeight;
    // const max = document.documentElement.scrollHeight;
    // if (pos === max) {
    //   this.dataService.loadItems();
    // }
    console.log(event);
  }
}
