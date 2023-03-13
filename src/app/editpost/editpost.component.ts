import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClientService } from '../services/common/http-client.service';
import { SharedService } from '../services/shared-service.service';

@Component({
  selector: 'app-editpost',
  templateUrl: './editpost.component.html',
  styleUrls: ['./editpost.component.scss']
})
export class EditpostComponent implements OnInit {

  title: string = JSON.parse(localStorage.getItem('user')!.toString()).name
  id: string = JSON.parse(localStorage.getItem('user')!.toString()).id
  constructor(private router: Router, private httpClientService: HttpClientService, private sharedService: SharedService) {
  }

  postData: Array<any> = [];
  userData: Array<any> = [];
  editTitle: string = '';
  checkTitle: string = '';
  checkMessage: string = '';

  editMessage: string = '';
  postId: string = '';
  checked: boolean = false;
  ngOnInit(): void {
    this.sharedService.getSharedData().subscribe((data) => {
      this.postId = data;
    })
    this.httpClientService.getPosts().subscribe(response => {
      var data = response.find((p: { id: string; }) => p.id == this.postId);
      this.editMessage = data.body;
      this.editTitle = data.title;
      this.checkTitle = data.title;
      this.checkMessage = data.body;
    })
  }
  newPostForm = new FormGroup({
    postTitle: new FormControl('', [Validators.required, Validators.maxLength(200)]),
    postMessage: new FormControl('', [Validators.required, Validators.maxLength(2000)])
  })
  onInputChange(title: string, message: string) {
    if (this.checkTitle != title || this.checkMessage != message) {
      this.checked = true;
    }

  }
  submitForm() {
    if (this.newPostForm.valid) {
      this.httpClientService.editPost({ "id": this.postId, "userId": this.id, "body": this.editMessage, "title": this.editTitle })
      this.sharedService.setSharedData("edit")
      this.router.navigate(['']);
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

  deletePost() {
    let check = confirm("Are you sure you want to delete?")
    if (check) {
      this.httpClientService.deletePost(parseInt(this.postId))
      this.sharedService.setSharedData("delete")
      this.router.navigate(['']);
    }
  }


}
