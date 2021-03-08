import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './child_modules/material/material.module';
import { HomeComponent } from './components/home/home.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HeaderComponent } from './components/header/header.component';
import { HeaderInterceptorService } from './intercepters/header-interceptor.service';
import { EffectsModule } from '@ngrx/effects';
import { ProductService } from './service/product.service';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import {AuthModule} from './auth/auth.module'
import { ProductEffects } from './ngrx/products/products.effects';
import { productReducer } from './ngrx/products/products.reducer';
import { SharedModule } from './shared/shared.module';
import { CartEffects } from './ngrx/cart/cart.effects';
import { cartReducer } from './ngrx/cart/cart.reducer';
import { userReducer } from './ngrx/user/user.reducer';
import { SnackBarComponent } from './components/snack-bar/snack-bar.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    SnackBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    SharedModule,
    HttpClientModule,
    StoreModule.forRoot({
      productState: productReducer,
      cartState: cartReducer,
      userState: userReducer
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
    }),
    EffectsModule.forRoot([ProductEffects, CartEffects])
  ],
  providers: [
    ProductService,
    { provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
