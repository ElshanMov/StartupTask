import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClientService } from '../services/common/http-client.service';
import { SharedService } from '../services/shared-service.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  postData: Array<any> = [];
  userData: Array<any> = [];
  user: any;
  constructor(private router: Router, private httpClientService: HttpClientService, private sharedService: SharedService) {

  }
  ngOnInit() {
    this.httpClientService.getPosts().subscribe((response) => {
      this.postData = response

    })
    this.httpClientService.getUsers().subscribe((response) => {
      this.userData = response
    })
  }
  loginForm = new FormGroup({
    userName: new FormControl('', [Validators.required, this.validateUsername.bind(this)])
  })
  validateUsername(control: any) {
    const username = control.value;
    this.user = this.userData.find(u => u.name === username);
    if (!this.user) {

      return { invalidUsername: true };
    }
    return null;
  }
  submitForm() {
    if (this.loginForm.valid) {
      localStorage.setItem('user', JSON.stringify(this.user))
      this.router.navigate(['']);
    }
  }
}
