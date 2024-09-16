import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { DataService } from '../../shared/services/data/data.service';
import { ApiService } from '../../shared/services/api/api.service';
import { IUser } from '../../shared/interfaces/user';
import { ActivatedRoute, Router } from '@angular/router';
import { IPost } from '../../shared/interfaces/post';
import { Subscription } from 'rxjs';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-post-form',
  standalone: true,
  providers: [MessageService],
  imports: [ToastModule, InputTextModule, InputTextareaModule, FormsModule, DropdownModule, ButtonModule],
  templateUrl: './post-form.component.html',
  styleUrl: './post-form.component.scss'
})
export class PostFormComponent implements OnInit,OnDestroy {
  id: string | null = null;
  postData:Partial<IPost> = {}
  selectedUser:Partial<IUser> = {}
  btnLabel =  'Publish'
  routeSubscription!:Subscription
  constructor(
    private primengConfig: PrimeNGConfig,
    public dataService: DataService, 
    private apiService: ApiService,
    private router: Router,
    private messageService: MessageService,
    private route: ActivatedRoute
  ){
  }

  publish(){
    if (this.btnLabel === 'Publish') {
      this.apiService.createPost(
        {...this.postData, userId: this.selectedUser.id}
      ).subscribe(
        {
          next: res=>{
            console.log(res)
            this.messageService.add({severity:'success', summary: 'Success', detail: 'Posts created successfully'});
            let store = JSON.parse(localStorage.getItem('posts')!);
            store.push(res)
            localStorage.setItem('posts', JSON.stringify(store))
            this.router.navigate(['/new'])
          },
          error:err=>console.error(err)
        }
      )
    }
    else{
      let posts = JSON.parse(localStorage.getItem('posts')!)
      const index = posts.findIndex((item:IPost) => item.id === this.postData.id);
        if (index !== -1) {
          posts[index] = this.postData; 
          localStorage.setItem('posts', JSON.stringify(posts))
        }
      this.messageService.add({severity:'success', summary: 'Success', detail: 'Post updated successfully'});
      this.apiService.updatePost(
        this.postData.id! ,{...this.postData, userId: this.selectedUser.id}
      ).subscribe(
        res=>{
          console.log(res)
          this.router.navigate(['/home'])
      })
    }
  }

  formValid():boolean{
    return !!this.postData.title && !!this.postData.body;
  }

  ngOnInit(){
    this.primengConfig.ripple = true;
    this.routeSubscription = this.route.paramMap.subscribe(params => {
      if (params.get('id')) {
        this.id = params.get('id');
        this.postData = this.dataService.selectedPost;
        this.btnLabel = 'update'
        return;
      }
      this.btnLabel = 'Publish'
      console.log(this.id); 
    });
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe()
  }
}
