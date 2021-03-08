import { ComponentType } from '@angular/cdk/portal';
import { Component, ComponentFactoryResolver, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CartProduct } from 'src/app/ngrx/cart/cart';
import { deleteProduct } from 'src/app/ngrx/products/products.actions';
import { PaymentService } from 'src/app/service/payment.service';
import Product from '../../types/product'

@Component({
  selector: 'pm-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss']
})
export class ProductViewComponent  {

  constructor(private router: Router, private store: Store,
    private paymentService: PaymentService) { }

  private readonly serverUrl = 'http://localhost:3000/image/'

  @Input() view: string = 'admin'
  @Input() products: Product[];

  @Output() addToCart = new EventEmitter<Product>()


  selectedProduct: Product

  getImageUrl(imagePath) {
    return this.serverUrl + imagePath
  }

  click(type, product) {
    switch(type) {
      // admin options
      case 'dialog': this.selectedProduct = product
      break;
      case 'manage': this.router.navigateByUrl('admin/manage', { state: {mode: 'manage', product} })
      break;
      case 'remove': this.store.dispatch(deleteProduct({ id: product.id,  imagePath: product.image_path}))
      break;

      // cutomer optiond
      case 'addToCart': this.addToCart.emit(product)
      break;
      case 'buy': this.buyProduct(product)
      break;
    }
  }

  buyProduct(product) {
    const prod = {product: {...product}, quantity: 1}
    this.paymentService.orders = [prod]
    this.paymentService.total = product.price
    this.router.navigate(['payment'])
  }

}
