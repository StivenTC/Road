import { Component, ViewChild } from '@angular/core';
import { App, Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { VehicleListPage } from '../pages/vehicle/list/vehicle-list';
import { FavoritePage } from '../pages/vehicle/favorite/favorite';
import { MyReservationsPage } from '../pages/vehicle/my_reservations/my_reservations';
import { MenuService } from '../services/menu-service';
import { AuthService } from '../services/auth-service';
import { UserService } from '../services/user-service';
import { ListReservePage } from '../pages/user/list-reserve/list-reserve';
import { ReserveDetailPage } from '../pages/user/reserve-detail/reserve-detail';
import { aboutPage } from '../pages/user/about/about';

import { User } from '../models/user.model';

@Component({
  templateUrl: 'app.html'
})

export class Road {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = ReserveDetailPage;
  pages: Array <any>;

  constructor(
    public authService: AuthService,
    public userService: UserService,
    public platform: Platform,
    public menuService: MenuService,
    public appCtrl: App,
  ){
      this.initializeApp();
  }

  initializeApp() {
    this.authService.populate();
    //this.pages = this.menuService.getMenu();
    this.pages = [ {title: "Actividades", icon: "calendar", component: ListReservePage },
                    {title: "Categorias", icon: "attach", component: ReserveDetailPage },
                    {title: "Notas", icon: "bookmark", component: aboutPage }
    ];
    this.platform.ready().then(() => {
      StatusBar.overlaysWebView(true);
      StatusBar.styleLightContent();
      StatusBar.backgroundColorByHexString('#D32E2E');
      Splashscreen.hide();
    });
  }

  openPage(page) {
      this.appCtrl.getRootNav().setRoot(page.component).catch(err => {
        console.log(err);
      });
  }
}

