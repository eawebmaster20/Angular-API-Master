import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiService } from './shared/services/api/api.service';
import { DataService } from './shared/services/data/data.service';
import { catchError, interval, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angularApiMaster';
  constructor(private dataService: DataService, apiService: ApiService){
    interval(30000).pipe(
      switchMap(() =>
        apiService.keepServerActive().pipe(
          catchError(err => {
            console.error('Error keeping server active', err);
            return of(null);  // Handle error and return a fallback observable
          })
        )
      )
    ).subscribe(data => {
      if (data) {
        console.log('Server is active');
      }
    });
}}
