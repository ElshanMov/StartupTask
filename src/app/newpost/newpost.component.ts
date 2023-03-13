import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClientService } from '../services/common/http-client.service';
import { SharedService } from '../services/shared-service.service';

@Component({
  selector: 'app-newpost',
  templateUrl: './newpost.component.html',
  styleUrls: ['./newpost.component.scss']
})
export class NewpostComponent {
  title: string = JSON.parse(localStorage.getItem('user')!.toString()).name
  postId: string = '';
  checked: boolean = false;
  constructor(private router: Router, private httpClientService: HttpClientService, private sharedService: SharedService) {

  }

  newPostForm = new FormGroup({
    postTitle: new FormControl('', [Validators.required, Validators.maxLength(200)]),
    postMessage: new FormControl('', [Validators.required])
  })
  onInputChange(title: string, message: string) {
    if (title != '' || message != '') {
      this.checked = true;
    }
  }
  cancel() {
    if (this.checked) {
      let check = confirm("Are you sure you won't save changes?")
      if (check) {
        this.router.navigate(['']);
      }
    }
    else {
      this.router.navigate(['']);

    }
  }
  submitForm() {
    if (this.newPostForm.valid) {
      let currentUser = JSON.parse(localStorage.getItem('user')!.toString()).id
      this.sharedService.setSharedData("added")
      console.log(localStorage.getItem('cachedUsers'))
      this.httpClientService.addPost(currentUser, this.newPostForm.controls.postTitle.value, this.newPostForm.controls.postMessage.value)
      this.router.navigate(['']);
    }
  }
}


