import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  
total:any = 0;
count:any;
  constructor(private _ServiceService:ServiceService) {
    
   }

   cartCount()
   {
     if (localStorage.getItem('localCart')) {
        this.count = localStorage.getItem('localCart')
       this.count = JSON.parse(this.count);
       this.total = this.count.length;
       
       
     }
   }

  ngOnInit(): void {

    this._ServiceService.productItem.subscribe((res)=>{
      this.total = res.length;
      this.cartCount();
      console.log(this.total,'nav total');
    })
    
    
    
  }
}
