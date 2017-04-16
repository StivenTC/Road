import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading } from 'ionic-angular';
import { AuthService } from '../../../providers/auth-service';
import { ProfilePage } from '../profile/profile';
import { VehicleListPage } from '../../vehicle/list/vehicle-list';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignUpPage {
  loading: Loading;
  User = { empresa_id: 1, nombres: '', apellidos: '', email: '', password: ''};

constructor(
  private nav: NavController, 
  private authService: AuthService,  
  private alertCtrl: AlertController, 
  private loadingCtrl: LoadingController
  ) {}

  public signUp(){     
    this.showLoading()
    this.authService.signUp(this.User).subscribe(response => { 
      if(response.token){
        console.log(response); 
        setTimeout(() => {
          this.loading.dismiss();
          this.nav.setRoot(VehicleListPage)
        });  
      } else{
          this.showError(response);
      }  
    },
    error => {
      this.showError(error);
    });
  }
 
  /** Esto debe trasladarse a una directiva */

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Por favor espere...'
    });
    this.loading.present();
  }

 /** Esto debe trasladarse a un servicio */

  showError(text) {
    setTimeout(() => {
      this.loading.dismiss();
    });
 
    let alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: text,
      buttons: ['OK']
    });

    alert.present(prompt);
  }
}
