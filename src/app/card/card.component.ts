import { Component, OnInit } from '@angular/core';

import { ServiceService } from '../service.service';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  cartItems:any = [];
  total:Number= 0;
  constructor(private _ServiceService:ServiceService ) { }


  setCart(data:any)
  {
    localStorage.setItem('localCart',JSON.stringify(data));
    this.cartItems.next(this.getCart())
  }
  getCart()
  {
    let data:any = localStorage.getItem('localCart');
    return data = JSON.parse(data)
  } 

  incQuantity(quantity:any, id:any)
  {
    for (let i = 0; i < this.cartItems.length; i++) {
      if (this.cartItems[i].id == id) {
        this.cartItems[i].quantity = quantity + 1;
      }
      
    }
    this.calculateTotal();
      this.setCart(this.cartItems)
  }

  decQuantity(quantity:any, id:any)
  {
    for (let i = 0; i < this.cartItems.length; i++) {
      if (this.cartItems[i].id == id) {
        this.cartItems[i].quantity = quantity - 1;
      }if (this.cartItems[i].quantity ==0) {
        this.deleteItem(id)
      }
    }
      this.calculateTotal();
      this.setCart(this.cartItems)
  }

  deleteItem(id:any)
  {
    this.cartItems = this.getCart();
    for (let i = 0; i < this.cartItems.length; i++) {
      if (this.cartItems[i].id == id) {
        this.cartItems.splice(i,1);
      }
      if (this.cartItems.length == 0) {
        this.total== 0;
      }
      
    }
    this.calculateTotal()
    this._ServiceService.setCart(this.cartItems)
    
  }

  calculateTotal():any
  {
    for (let i = 0; i < this.cartItems.length; i++) {
      this.total = this.cartItems.reduce(function (acc:any, val:any) {
        return acc + (val.price * val.quantity)
      },0)
      console.log(JSON.stringify(this.total),'totaaaaaaaaaaaal');
      
    }
  }

  ngOnInit(): void {

    this._ServiceService.productItem.subscribe((res)=>{
      this.cartItems = res;
      let data:any = localStorage.getItem('localCart');
      this.cartItems = JSON.parse(data)
      console.log(this.cartItems);
      
      this.calculateTotal()
    })
 
  }

 


}
