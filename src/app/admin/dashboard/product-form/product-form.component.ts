import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Form, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { deleteProduct, updateProduct } from 'src/app/ngrx/products/products.actions';
import { AppState } from 'src/app/ngrx/types';
import { ProductService } from 'src/app/service/product.service';
import Product from '../../../types/product'

@Component({
  selector: 'pm-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {

  constructor(
    private fb: FormBuilder, private router: Router,
    private productService: ProductService,
    private store: Store<AppState>
  ) {
    const state = this.router.getCurrentNavigation().extras.state
    if(state && state.mode) {
      this.mode = state.mode
      this.productFormData = state.product
    }
  }
  private readonly serverUrl = 'http://localhost:3000/image/'
  mode: string = 'add'

  @Output() productSubmit = new EventEmitter<{product: FormData, mode: string}>();

  productForm = this.fb.group({
    name: ['', Validators.required],
    price: ['', Validators.required],
    description: [''],
    available: [true],
    productImages: ['', Validators.required]
  })

  imageURL: string;
  private updateProdInfo = { id: -1, prevImageURL: '' }

  set productFormData(product: Product) {
    this.imageURL = this.serverUrl + product.image_path
    this.updateProdInfo.id = product.id
    this.updateProdInfo.prevImageURL = product.image_path
    this.productForm.patchValue({
      name: product.name,
      price: product.price,
      description: product.description,
      available: product.available,
    })
  }

  ngOnInit(): void {
    if(this.mode=='manage') {
      this.productForm.get('productImages').clearValidators()
      this.productForm.updateValueAndValidity()
    }
  }

  handleDelete() {
    this.store.dispatch(deleteProduct({ id: this.updateProdInfo.id, imagePath: this.updateProdInfo.prevImageURL }))
  }

  handleSubmit() {
    if(this.productForm.invalid) {
      return
    }
    let formData: any;
    const prodValue = this.productForm.value

    formData = new FormData();

    for(const [key, value] of Object.entries(prodValue)) {
      if (prodValue[key] !== '') {
        formData.append(key, value as any)
      }
    }

    if(this.mode === 'add') {
      this.productSubmit.emit({product: formData, mode: this.mode})

    } else {
      const prev_image_path = this.imageURL.includes(this.serverUrl) ?
      this.imageURL.slice(this.serverUrl.length) : this.updateProdInfo.prevImageURL;
      formData.append('prev_image_path', prev_image_path)
      formData.append('id', this.updateProdInfo.id)
      this.store.dispatch(updateProduct({ product: formData }))
    }
  }

  private showImage() {
    const element: HTMLElement =document.getElementById('nameIn') as HTMLElement
    element.click()
  }
    // Image Preview
    showPreview(event) {
      this.imageURL = ''
      const file = (event.target as HTMLInputElement).files[0];
      this.productForm.patchValue({
        productImages: file
      });
      this.productForm.get('productImages').updateValueAndValidity()

      // File Preview
      const reader = new FileReader();
      reader.onload = () => {
        this.imageURL = reader.result as string;
        this.showImage()
      }
      reader.readAsDataURL(file)

    }

}
