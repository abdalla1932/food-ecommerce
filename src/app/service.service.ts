import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  productItem= new BehaviorSubject([]);
  exist:any;
  cart:any=[];

  constructor(private _HttpClient:HttpClient , private toastr:ToastrService) { 
  let data = this.getCart()
  
  }

  getItems():Observable<any>
  {
   return this._HttpClient.get(`https://run.mocky.io/v3/219fc12a-4359-4921-9775-33849c8d9d97`)
  }

  addItem(product:any)
  {
    let data = this.getCart();
    if (data) 
      this.exist= data.find((item:any)=>{
        return item.id == product.id
      })
      console.log(this.exist,"existttttt");

    if (this.exist) {
      this.exist.quantity++;
      this.setCart(data);
      this.showSuccess();
    }
    else{
      if (data) {
        let newData =[...data,product];
        this.setCart(newData);
        console.log(newData,"nnnnnnew data");
        let maDta = this.getCart();
        this.productItem.next(JSON.parse(maDta)) 
        console.log(this.productItem );
      }
      
      this.cart.push(product);
      this.setCart(this.cart);
    }
    
  }

  setCart(data:any)
  {
    localStorage.setItem('localCart',JSON.stringify(data));
    this.productItem.next(this.getCart())
  }

  getCart()
  {
    let data:any = localStorage.getItem('localCart');
    return data = JSON.parse(data);
    
  }

  showSuccess() {
    this.toastr.success(`Your Quantity = ${this.exist.quantity}`, ` ${this.exist.title}`);
  }

  
}
