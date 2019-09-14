import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../services/service.service';
import { ModalController } from '@ionic/angular';
import { SearchModalPage } from '../home/search-modal/search-modal.page';
import { AngularFireAuth } from '@angular/fire/auth';
import { Annonce } from '../module/annonce.module';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  results: Annonce[];
  searchWord = '';

  constructor(private service: ServiceService, public modalController: ModalController, private afAuth: AngularFireAuth) { }

  ngOnInit() {
    this.service.getAnnonces().subscribe(r => {
      console.log(r);
      this.results = r;
    }
    );

  }

  searchChanged() {

  }
  private dataFromModal: any;

  async chercher() {
    const modal = await this.modalController.create({
      component: SearchModalPage,
      componentProps: {
        //'searchWord': 'searchWord'
      }
    });
    modal.onWillDismiss().then((data) => {
      // This is going to be executed when the modal is closed, so
      // you can get the data here
      console.log(data.data.hasOwnProperty("searchWord"));
      if (data.data.hasOwnProperty("searchWord")) {
        this.dataFromModal = data;
      }
    });

    return await modal.present();
  }


}
