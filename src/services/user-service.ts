import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { ApiService } from './api-service';

@Injectable()
export class UserService {

  constructor(public apiService: ApiService) {
  }

  public getProfile() {
    return this.apiService.get('/user/get-profile')
      .map(
      data => {
        return data;
      });
  }

  public getUser() {
    return this.apiService.get('/user/get-rol')
      .map(
      data => {
        return data;
      });
  }
  public getCategories(usrId) {
    return this.apiService.get('/user/getCategories?user='+ usrId)
      .map(
      data => {
        return data[0];
      });
  }
    public getActivities(catId) {
    return this.apiService.get('/user/getActivities'+ catId)
      .map(
      data => {
        return data[0];
      });
  }
    public addCategory(data: any) {
    return this.apiService.post('/user/addCategories', data)
      .map(
      data => {
        return data;
      });
  }   
   public addActivity(data: any) {
    return this.apiService.post('/user/addActivity', data)
      .map(
      data => {
        return data;
      });
  }
     public addNote(data: any) {
    return this.apiService.post('/user/addNote', data)
      .map(
      data => {
        return data;
      });
  }
      public getNotes(actId) {
    return this.apiService.get('/user/getNotes'+ actId)
      .map(
      data => {
        return data[0];
      });
  }
  public getReserveClient(history: string) {
    return this.apiService.get('/reserve/get-reserve-client?history=' + history)
      .map(
      data => {
        return data;
      });
  }

  public getListUsers() {
    return this.apiService.get('/user/get-users')
      .map(
      data => {
        return data;
      });
  }

  public getAllRols() {
    return this.apiService.get('/user/get-all-rols')
      .map(
      data => {
        return data;
      });
  }

  public changeStateUser(data: any) {
    return this.apiService.post('/user/change-state', data)
      .map(
      data => {
        return data;
      });
  }

  public changeRolsUser(data: any) {
    return this.apiService.post('/user/change-rols', data)
      .map(
      data => {
        return data;
      });
  }

  public getAllReserve(data: any) {
    return this.apiService.get('/reserve/get-all-reserve', data)
      .map(
      data => {
        return data;
      });
  }

}
