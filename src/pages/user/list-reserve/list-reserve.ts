import { Component } from '@angular/core';
import { ModalController, NavController, NavParams } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';
import { UserService } from '../../../services/user-service';
import { AlertController } from 'ionic-angular';
import { UtilProvider } from '../../../providers/util-provider';

import { aboutPage } from '../about/about';

@Component({
  selector: 'page-list-reserve',
  templateUrl: 'list-reserve.html',
})
export class ListReservePage {
  category: any;
  activities: any;
  private loading: any;
  showSearchBar: boolean = false;

  constructor(
    public nav: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    private util: UtilProvider,
    private userService: UserService,
    public alertCtrl: AlertController,
) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListReserve');
    this.category = this.navParams.get('category');
    console.log(this.category);
    this.getActivities();
    console.log(this.activities);
  }
  addActivityPrompt() {
    let prompt = this.alertCtrl.create({
      title: '¿Necesitas recordar algo?',
      message: "Agrega una nueva actividad y no olvides nada.",
      inputs: [
        {
          name: 'title',
          placeholder: 'Nombre de la actividad'
        },
        {
          name: 'description',
          placeholder: 'Descripción'
        },
        {
          name: 'img',
          placeholder: 'Id de la imagen'
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
            data.cat=this.category;
            this.addActivity(data);
            console.log(data);
          }
        }
      ]
    });
    prompt.present();
  }
  addActivity(data: any) {
    console.log(data);
    this.loading = this.util.loading();
    this.userService.addActivity(data).subscribe(response => {
      if(response){
          this.getActivities();        
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

  public goToProfile() {
    this.nav.push(ProfilePage);
  }
  private getActivities(){
    this.userService.getActivities("?cat="+this.category).subscribe(
        data => {
          console.log(data);
          this.activities = data;
        },
        error => {
          console.log(error);
        }
      );
  }
    public goToNotes(act: any) {
    this.nav.push(aboutPage, { activity: act })
  }

}
