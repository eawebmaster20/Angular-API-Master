import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../shared/services/data/data.service';
import { ToastModule } from 'primeng/toast';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-post-details',
  standalone: true,
  imports: [ToastModule],
  providers: [MessageService],
  templateUrl: './post-details.component.html',
  styleUrl: './post-details.component.scss'
})
export class PostDetailsComponent implements OnInit {
  id: string | null = null;
constructor(
  private route: ActivatedRoute, 
  public dataService: DataService,
  private messageService: MessageService
){}
  ngOnInit(): void {
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
