import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
// import {fr} from "../../../assets/"

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {

  bannerImgs=[
    {
      id:1,
      img:"../../../assets/slide-02.jpg"
    }
   
    ,{
      id:2,
      img:"../../../assets/2.jpg"

    },
    
    {
      id:3,
      img:"../../../assets/1.jpg"
    },{
      id:4,
      img:"../../../assets/hero.png",
      content:"Beautifully Crafted Modern Furniture",
      button:"EXPLORE-NOW"
     
    }
  ]

}

// {
//   id:2,
//   img:"../../../assets/slide-03.jpg"
// },

