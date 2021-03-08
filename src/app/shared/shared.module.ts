import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductViewComponent } from './product-view/product-view.component';
import { MaterialModule } from '../child_modules/material/material.module';
import { DialogDirective } from './dialog.directive';




@NgModule({
  declarations: [
    ProductViewComponent,
    DialogDirective
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [MaterialModule, ProductViewComponent]
})
export class SharedModule { }
