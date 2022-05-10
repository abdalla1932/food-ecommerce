import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-ourproducts',
  templateUrl: './ourproducts.component.html',
  styleUrls: ['./ourproducts.component.css']
})
export class OurproductsComponent implements OnInit {

  allItems:any=[];
  quantity:any= 1;
  constructor(private _ServiceService:ServiceService) {
   
    this.getallFood()
   }

   getallFood()
   {
    this._ServiceService.getItems().subscribe((res)=>{
      this.allItems= res
      this.allItems.forEach((element:any) => {
        Object.assign(element,{quantity:1, price:element.price})
      });
    
    })
   }

   getCategory(term:string)
   {
     this._ServiceService.getItems().subscribe((res)=>{
       this.allItems= res;
       this.allItems.forEach((element:any) => {
        Object.assign(element,{quantity:this.quantity, price:element.price})
      });

       let type = this.allItems.filter(( word:{category:any} )=> word.category==`${term}`)
       this.allItems= type;
       console.log(this.allItems);
       
     })
   }

   addToCard(product:any)
   {
     this._ServiceService.addItem(product);
     console.log(product);
     
   }

  ngOnInit(): void {
  }

}
