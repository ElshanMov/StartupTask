import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HttpClientService } from '../services/common/http-client.service';
import { SharedService } from '../services/shared-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  postData: Array<any> = [];
  userData: Array<any> = [];
  sharedData: any;
  constructor(private httpClientService: HttpClientService, private sharedService: SharedService) {

  }
  onInputChange(id: any) {
    this.sharedService.setSharedData(id);
  }
  pageTitle: string = '';

  displayedUsers: Array<any> = [];
  currentPage = 1;
  pageSize = 6;
  totalPages = 0;
  status: string = '';
  loginUser: string | null = null;
  ngOnInit() {
    this.httpClientService.getPosts().subscribe((response) => {
      this.postData = response
      this.totalPages = Math.ceil(this.postData.length / this.pageSize);
      this.goToPage(this.currentPage);
    })
    this.httpClientService.getUsers().subscribe((response) => {
      this.userData = response
    })
    if (localStorage.getItem('user')) {
      this.loginUser = JSON.parse(localStorage.getItem('user')!.toString()).name
    }

    this.sharedService.getSharedData().subscribe(data => {
      this.status = data;
    })

  }


  goToPage(page: number) {
    this.currentPage = page;
    const startIndex = (page - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.displayedUsers = this.postData.slice(startIndex, endIndex);
  }
  logOut() {
    localStorage.removeItem('user');
    this.sharedService.setSharedData(null);
    this.loginUser = null;
  }

}




