import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

    get isLocal() {
        if (localStorage.getItem('usuario') != null && localStorage.getItem('empresa') != null) {
            return true;
        } else {
            return false;
        }
    }

}
