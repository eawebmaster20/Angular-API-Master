import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-post-form',
  standalone: true,
  imports: [InputTextModule, InputTextareaModule, FormsModule, DropdownModule, ButtonModule],
  templateUrl: './post-form.component.html',
  styleUrl: './post-form.component.scss'
})
export class PostFormComponent implements OnInit {
  id: string | null = null;
  postData:Partial<IPost> = {}
  selectedUser:Partial<IUser> = {}
  constructor(
    public dataService: DataService, 
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ){}

  publish(){
    this.apiService.createPost(
      {...this.postData, userId: this.selectedUser.id}
    ).subscribe(
      res=>{
        console.log(res)
        this.router.navigate(['/home'])
    })
  }

  formValid():boolean{
    return !!this.postData.title && !!this.postData.body ;
  }

  ngOnInit(){
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      console.log(this.id); 
    });
  }
}
