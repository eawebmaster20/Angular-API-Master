import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'post-form', pathMatch: 'full' },
    { path: 'home', loadComponent: () =>import('./components/list/list.component').then((res) =>res.ListComponent)},
    { path: 'post/:id', loadComponent: () =>import('./components/post-details/post-details.component').then((res) =>res.PostDetailsComponent)},
    { path: 'post-form', loadComponent: () =>import('./components/post-form/post-form.component').then((res) =>res.PostFormComponent)},
    { path: 'update/:id', loadComponent: () =>import('./components/post-form/post-form.component').then((res) =>res.PostFormComponent)},
    { path: '**', redirectTo: 'post-form' }
];
