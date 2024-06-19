import { Component } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent {

  constructor(private _cs: ChatService){}


  ingresar(proveedor: string){

    console.log(proveedor);
    this._cs.login(proveedor);

  }
}
