import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'vacation-crud';
  token = sessionStorage.getItem('token');


 logout(){
   sessionStorage.removeItem("token");
   location.reload();
 }
}
