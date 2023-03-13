import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  private postUrl = "https://jsonplaceholder.typicode.com/posts";
  private userUrl = "https://jsonplaceholder.typicode.com/users";

  constructor(private httpClient: HttpClient) { }

  getPosts(): Observable<any> {
    const cachedPosts = localStorage.getItem('cachedPosts');
    if (cachedPosts) {
      return of(JSON.parse(cachedPosts));
    } else {
      return this.httpClient.get(this.postUrl).pipe(
        tap(response => {
          localStorage.setItem('cachedPosts', JSON.stringify(response));
        })
      );
    }
  }

  getUsers(): Observable<any> {
    const cachedUsers = localStorage.getItem('cachedUsers');
    if (cachedUsers) {
      return of(JSON.parse(cachedUsers));
    } else {
      return this.httpClient.get(this.userUrl).pipe(
        tap(response => {
          localStorage.setItem('cachedUsers', JSON.stringify(response));
        })
      );
    }
  }
  addPost(currentUser: number, title: string | null, body: string | null): void {
    let cachedPosts = JSON.parse(localStorage.getItem('cachedPosts') || '[]');

    cachedPosts.unshift({
      "userId": currentUser,
      "title": title,
      "body": body,
      "id": cachedPosts.length + 1
    });

    localStorage.setItem('cachedPosts', JSON.stringify(cachedPosts));
  }
  editPost(post: any): void {
    let cachedPosts = JSON.parse(localStorage.getItem('cachedPosts') || '[]');
    const cachedPostIndex = cachedPosts.findIndex((p: { id: any; }) => p.id === post.id);
    if (cachedPostIndex !== -1) {
      cachedPosts[cachedPostIndex] = post;
    }
    const localStorageData = JSON.parse(localStorage.getItem('cachedPosts') || '[]');
    const localStoragePostIndex = localStorageData.findIndex((p: any) => p.id === post.id);
    if (localStoragePostIndex !== -1) {
      localStorageData[localStoragePostIndex] = post;
      localStorage.setItem('cachedPosts', JSON.stringify(localStorageData));
    }
  }

  deletePost(id: number): void {
    debugger
    let cachedPosts = JSON.parse(localStorage.getItem('cachedPosts') || '[]');

    const index = cachedPosts.findIndex((post: { id: number; }) => post.id === id);
    if (index !== -1) {
      cachedPosts.splice(index, 1);
      localStorage.setItem('cachedPosts', JSON.stringify(cachedPosts));
    }
  }
}

