import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';
import ProductType from '../types/product'

@Injectable({providedIn: 'root'})
export class ProductService {

  private readonly apiUrl = 'http://localhost:3000/api/v1/product'
  constructor(private http: HttpClient) { }

  getProducts(){
    return this.http.get<{arrayOfProducts}>('product.json').pipe(map(res => {
      return res.arrayOfProducts;
    }));
  }
  getFruits(){
    return this.http.get<{fruits}>('fruits.json').pipe(map(res =>{
      return res.fruits;
    }));
  }

  getAll() {
    return this.http.get<ProductType[]>(this.apiUrl).pipe(switchMap((products) => of(products)))
  }

  addProduct(formData: FormData) {
    return this.http.post(this.apiUrl, formData)
  }

  updateProduct(formData: FormData) {
    return this.http.put(this.apiUrl, formData)
  }

  deleteProduct(id, imagePath) {
    const params = new HttpParams().set('imagePath', imagePath)
    return this.http.
    delete(`${this.apiUrl}/${id}`, {params: new HttpParams().set('imagePath', imagePath)})
  }
}
