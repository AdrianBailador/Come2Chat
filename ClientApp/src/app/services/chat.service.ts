import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import { HubConnection } from '@microsoft/signalr';
import { HubConnectionBuilder } from '@microsoft/signalr/dist/esm/HubConnectionBuilder';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  myName: string = '';
  private chatConnection?: HubConnection;

  constructor(private httpClient: HttpClient) { }

  registerUser(user: User){
    return this.httpClient.post(`${environment.apiUrl}api/chat/register-user`,user,{responseType:'text'})
  }

  createChatConnection(){
    this.chatConnection = new HubConnectionBuilder().withUrl(`${environment.apiUrl}Hubs/chat`).withAutomaticReconnect().build();
    this.chatConnection?.stop().catch(error=>console.log(error));

    this.chatConnection.on('UserConnected', ()=> {
      this.addUserConnectionId();
    })
  }

  stopChatConnection(){
    this.chatConnection?.stop().catch(error=>console.log(error));
  }

  async addUserConnectionId(){
    return this.chatConnection?.invoke('AddUserConnectionId', this.myName)
    .catch(error=>console.log(error));
  }

}
