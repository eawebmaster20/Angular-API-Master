import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DataService } from '../../shared/services/data/data.service';
import { ToastModule } from 'primeng/toast';
import {MessageService, PrimeNGConfig} from 'primeng/api';
import { ApiService } from '../../shared/services/api/api.service';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-post-details',
  standalone: true,
  imports: [ToastModule, RouterLink, CommonModule,ButtonModule],
  providers: [MessageService],
  templateUrl: './post-details.component.html',
  styleUrl: './post-details.component.scss'
})
export class PostDetailsComponent implements OnInit {
  id: string | null = null;
  comments:any = []
constructor(
  private route: ActivatedRoute, 
  public dataService: DataService,
  public apiService: ApiService,
  private messageService: MessageService,
  private primengConfig: PrimeNGConfig
){}
  ngOnInit(): void {
    this.primengConfig.ripple = true;
    if (localStorage.getItem('selectedPost') !==null) {
      this.dataService.selectedPost = JSON.parse(localStorage.getItem('selectedPost')!)
      this.apiService.getPostComments(`${this.dataService.selectedPost.id}`).subscribe(
        {
          next: (data: any) => {
            this.comments = data
          },
          error: (err: any) => console.error('Error retrieving comments', err)
        }
      )
    }
    else{
      this.route.paramMap.subscribe({
        next: params => {
          this.id = params.get('id');
          console.log(this.id);
          this.dataService.loadSelectedPost(Number(this.id))
          this.messageService.add({severity:'success', summary: 'Success', detail: 'Message Content'});
        },
        error: err => console.error('Error', err)
      });
    }
    
  }
  deleteIt(){
    this.dataService.deleteSelectedPost()
    this.messageService.add({severity:'success', summary: 'Success', detail: 'Message Content'});
  }
}
