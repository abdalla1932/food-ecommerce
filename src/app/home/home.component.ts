import { Component, OnInit } from '@angular/core'
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { ServiceService } from '../service.service';
;

declare var $:any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  allItems:any=[];
  quantity:any= 1;

  constructor(private _ServiceService:ServiceService) {

    this._ServiceService.getItems().subscribe((res)=>{
      this.allItems=res.splice(1,8);
      this.allItems.forEach((element:any) => { 
        Object.assign(element, {quantity: this.quantity , price:element.price})
      });
    })
   }

   addToCard(product:any)
   {
     this._ServiceService.addItem(product);
     console.log(product);
     
   }



  ngOnInit(): void {

  }
   
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }
  

   

}
