import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiService } from './shared/services/api/api.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angularApiMaster';
  constructor(private apiService: ApiService){
    // this.apiService.deletePost(1).subscribe(res=>{
    //   console.log(res)
    //   this.apiService.getPosts().subscribe(res=>console.log(res))
    // })
  }
}
