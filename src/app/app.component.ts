import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ChatService } from './services/chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


  constructor(public _cs: ChatService){

    //this.
  }



  /*testeo de cargar los mensajes de firebase en el arreglo chats
  chats: Observable<any[]>;
  constructor(firestore: AngularFirestore){
    this.chats = firestore.collection('chats').valueChanges();
    console.log("Hola chatsitos",this.chats);
  }*/



  }






