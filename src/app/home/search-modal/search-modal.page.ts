import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { Category } from 'src/app/module/category.module';
import { ServiceService } from 'src/app/services/service.service';


@Component({
  selector: 'app-search-modal',
  templateUrl: './search-modal.page.html',
  styleUrls: ['./search-modal.page.scss'],
})
export class SearchModalPage implements OnInit {

  searchWord ;
  category ;
  categories : Category[] ;
 // private backbuttonSubscription: Subscription;
  constructor( public modalController : ModalController , public navParams :NavParams ,private serviceService : ServiceService ) {

   // this.searchWord = this.navParams.get("searchWord");
   }
 
  ngOnInit() {

  /*  this.serviceService.getCategories().subscribe(r => {console.log(r);
      this.categories= r ;}
      );
*/
  }

  validate() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true,
      'searchWord' : this.searchWord,
    });

}
goBack() {
  // using the injected ModalController this page
  // can "dismiss" itself and optionally pass back data
  this.modalController.dismiss({
    'dismissed': true
  });

}

/*ngOnDestroy() {
  this.backbuttonSubscription.unsubscribe();
}*/
}