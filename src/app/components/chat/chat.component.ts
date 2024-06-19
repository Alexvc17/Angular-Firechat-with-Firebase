import { Component } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: [
  ]
})
export class ChatComponent {

  mensaje:string = "";
  //para que la barra siempre este apuntando hacia abajo
  elemento:any;

  constructor(public chatService: ChatService ){
                                              //para que la barra siempre este al final
    this.chatService.cargarMensajes().
                      subscribe(()=>{

                        //para que al recargar la pagina este al final
                        setTimeout(() => {
                          //el tope de la barra va a ser igual a la altura del elementocuando lo creo
                          this.elemento.scrollTop = this.elemento.scrollHeight;

                        }, 20);
                      });
  }

  ngOnInit(): void {
    //para acomodar el scroll
    this.elemento = document.getElementById('app-mensajes');
  }


  enviar_mensaje(){
    if(this.mensaje.length == 0){
      return;
    }
    //envio el mensaje y le hago el then a la promesa que estoy recibiendo
    this.chatService.agregarMensaje(this.mensaje)
                ?.then(()=>this.mensaje = "")
                .catch((err)=>console.error('Error al enviar',err));

                console.log(this.mensaje);
  }


}
