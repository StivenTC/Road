import { Component, Input } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UserService } from '../../../services/user-service';
import { AlertController } from 'ionic-angular';
import { UtilProvider } from '../../../providers/util-provider';

import { ListReservePage } from '../list-reserve/list-reserve';

@Component({
  selector: 'reserve-detail',
  templateUrl: 'reserve.html'
})
export class ReserveDetailPage {

	public reserve : any = undefined;
	public categories : any;
  private loading: any;
  showSearchBar: boolean = false;

  constructor(
      private nav: NavController,
      private userService: UserService,
      public navParams: NavParams,
      private util: UtilProvider,
      public alertCtrl: AlertController,

  ) {
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad ListReserve');
    this.getCategor();
  }
  
    btnSearch() {
    this.showSearchBar = !this.showSearchBar;
  }

  private getCategor(){
    this.userService.getCategories(1).subscribe(
        data => {
          console.log(data);
          this.categories = data;
        },
        error => {
          console.log(error);
        }
      );
  }

  addCategoryPrompt() {
    let prompt = this.alertCtrl.create({
      title: 'Organiza tus ideas',
      message: "Agrega una nueva categoria para ordenar tus actividades y notas.",
      inputs: [
        {
          name: 'varCat',
          placeholder: 'Nombre de categoria'
        },
        {
          name: 'varImg',
          placeholder: 'ID de la Imagen'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            console.log('Saved clicked');
            data.varUsr=1;
            this.addCategory(data);
          }
        }
      ]
    });
    prompt.present();
  }
  addCategory(data: any) {
    console.log(data);
    this.loading = this.util.loading();
    this.userService.addCategory(data).subscribe(response => {
      if(response){
          this.getCategor();        
      }else {  
        this.util.presentToast(response);
      }
      this.loading.dismiss();
    },
    error => {
      this.util.presentToast(this.util.strings.error_connection);
      this.loading.dismiss();
    });
  }
    public goToActivities(cat: any) {
    this.nav.push(ListReservePage, { category: cat })
  }
}


