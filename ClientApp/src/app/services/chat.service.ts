import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private httpClient: HttpClient) { }

  registerUser(user: User){
    return this.httpClient.post(`${environment.apiUrl}api/chat/register-user`,user,{responseType:'text'})
  }
}
