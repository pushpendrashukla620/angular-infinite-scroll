import { Routes } from '@angular/router';
import { InfiniteScroll } from './infinite-scroll/infinite-scroll';

export const routes: Routes = [
    { path: '', 
    redirectTo: 'home', 
    pathMatch: 'full' },

    { path: 'home', component: InfiniteScroll },
];
