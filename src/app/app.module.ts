import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ChatComponent } from './components/chat/chat.component'

//cuando quiero usar ngmodule en html
import { FormsModule } from '@angular/forms';

//services
import { ChatService } from './services/chat.service';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    FormsModule
    /*forma antigua de importar agular firemodule
    import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
    provideFirebaseApp(() => initializeApp({"projectId":"firechat-cec2a","appId":"1:383123253585:web:1648792813d118106fcb70","storageBucket":"firechat-cec2a.appspot.com","apiKey":"AIzaSyCWzQKJZ0mJ2_g3IhBFZZ8wr9Wd3a2-Yo4","authDomain":"firechat-cec2a.firebaseapp.com","messagingSenderId":"383123253585"})),
    provideFirestore(() => getFirestore())*/
  ],
  providers: [AngularFirestore, ChatService],
  bootstrap: [AppComponent]
})
export class AppModule { }
