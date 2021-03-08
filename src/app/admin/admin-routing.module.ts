import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './dashboard/dashboard-components/products/products.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductFormComponent } from './dashboard/product-form/product-form.component';
import { FullComponent } from './layouts/full/full.component';
import { ProductViewComponent } from '../shared/product-view/product-view.component';
import { UsersComponent } from './dashboard/dashboard-components/users/users.component';


const routes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'products',
        component: ProductsComponent
      },
      {
        path: 'manage',
        component: ProductFormComponent
      },
      {
        path: 'users',
        component: UsersComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
