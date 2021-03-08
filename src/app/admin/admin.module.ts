import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AccordionAnchorDirective, AccordionDirective, AccordionLinkDirective } from './shared/accordion';
import { AppHeaderComponent } from './layouts/full/header/header.component';
import { AppSidebarComponent } from './layouts/full/sidebar/sidebar.component';
import { FullComponent } from './layouts/full/full.component';
import { MaterialModule } from '../child_modules/material/material.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MenuItems } from './shared/menu-items/menu-items';
import { ProductsComponent } from './dashboard/dashboard-components/products/products.component';
import { SpinnerComponent } from './shared/spinner.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { ProductEffects } from '../ngrx/products/products.effects';
import { StoreModule } from '@ngrx/store';
import { ProductViewComponent } from '../shared/product-view/product-view.component';
import { DialogDirective } from '../shared/dialog.directive';
import { ProductFormComponent } from './dashboard/product-form/product-form.component';
import { SharedModule } from '../shared/shared.module';
import { AdminService } from './admin.service';
import { UsersComponent } from './dashboard/dashboard-components/users/users.component';

@NgModule({
  declarations: [
    SpinnerComponent,
    AccordionAnchorDirective,
    AccordionLinkDirective,
    AccordionDirective,
    FullComponent,
    AppSidebarComponent,
    AppHeaderComponent,

    DashboardComponent,

    ProductsComponent,

    ProductFormComponent,

    UsersComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [SpinnerComponent],
  providers: [MenuItems, AdminService]
})
export class AdminModule { }
