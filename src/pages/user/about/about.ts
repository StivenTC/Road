import { Component } from '@angular/core';
import { ModalController, NavController, NavParams } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';
import { UserService } from '../../../services/user-service';
import { AlertController } from 'ionic-angular';
import { UtilProvider } from '../../../providers/util-provider';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class aboutPage {
  activity: any;
  notes: any;
  private loading: any;
  showSearchBar: boolean = false;
  
  //private currentUser: User;
  Credentials = {email: '', password: ''};

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
    this.activity = this.navParams.get('activity');
    this.getNotes();
    console.log(this.activity);
  }
  private getNotes(){
    this.userService.getNotes("?act="+ this.activity).subscribe(
        data => {
          console.log(data);
          this.notes = data;
        },
        error => {
          console.log(error);
        }
      );
  }
   addNotePrompt() {
    let prompt = this.alertCtrl.create({
      title: '¿Tienes una nueva idea?',
      message: "Guardala antes de que se te olvide.",
      inputs: [
        {
          name: 'title',
          placeholder: 'Título'
        },
        {
          name: 'content',
          placeholder: 'Contenido'
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
            data.act=this.activity;
            this.addNote(data);
            console.log(data);
          }
        }
      ]
    });
    prompt.present();
  }
  addNote(data: any) {
    console.log(data);
    this.loading = this.util.loading();
    this.userService.addNote(data).subscribe(response => {
      if(response){
          this.getNotes();        
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
}

