import { Injectable, inject } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { mensaje } from '../interface/mensaje.interface';
import { map } from 'rxjs/operators';

//firebase
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Auth, User, user, authState  } from '@angular/fire/auth';



import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';




@Injectable({
  providedIn: 'root'
})


export class ChatService {

  private itemsCollection?: AngularFirestoreCollection<mensaje>;

  public chats: mensaje[] = [];
  public usuario: any = {};


  constructor(private afs :  AngularFirestore,
              public fAuth: AngularFireAuth,
              )

  {
    //nos escribimos al observable del estado de autenticacion (authState) angularfireauth
    //vamos recibir un usuario
    this.fAuth.authState.subscribe((user) => {


      console.log("Estado del usuario", user);
      if(!user){
        return;
      }
      this.usuario.nombre = user.displayName;
      this.usuario.uid = user.uid;
      this.usuario.photoURL = user.photoURL
/*
      if (user) {
        this.usuario = user;
        localStorage.setItem('user', JSON.stringify(this.usuario));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }*/


  });

  }


  cargarMensajes(){
    //con esto cargo los mensajes                             | aqui lo ordenare por fecha, ascendente y que aparezca maximo 5 msj
    this.itemsCollection = this.afs.collection<mensaje>('chats',ref => ref.orderBy('fecha','desc').limit(5));
    //retorno este observable el cual esta pendiente de cualquier cambio y del cual me voy a suscribir en otro lugar
    //un map trabaja con la respuesta de un observable, la transforma en algom a lo que nos podemos subscribir
    return this.itemsCollection.valueChanges().pipe(map((resp:mensaje[])=>{

                                  //console.log(resp);
                                  this.chats = [];
                                  for (let i of resp){
                                    //para insertarlo en la primer posicion siempre
                                    this.chats.unshift(i);
                                  }
                                }))
  }


  agregarMensaje(texto:string){

    // TODO falta el uid del usuario
    let mensaje: mensaje = {
        nombre: this.usuario.nombre,
        mensaje: texto,
        fecha: new Date().getTime(),
        uid: this.usuario.uid,
        photo: this.usuario.photoURL
    }

    //aqui se hace la insersion a firebase, me retorna una promesa
    //y la retorno para poder hacer el then y el catch en cualquier parte donde llame la funcion
    return this.itemsCollection?.add(mensaje);

  }

  login( proveedor: string ) {

    if(proveedor === "google"){

      this.fAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    }
    if(proveedor === "twitter"){
      this.fAuth.signInWithPopup(new firebase.auth.TwitterAuthProvider());
    }

  }

  logout() {
    //restablecemos los valores del usuario
    this.usuario = {}
    this.fAuth.signOut();
  }

}
