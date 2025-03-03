import { Routes } from '@angular/router';
import { SwimmingPoolComponent } from './swimming-pool/swimming-pool.component';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: SwimmingPoolComponent },
];
