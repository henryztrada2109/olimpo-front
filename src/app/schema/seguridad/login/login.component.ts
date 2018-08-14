import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {LoginService} from './login.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {

  usuarioHttp: any;
  validador: number;
  message = false;
  messageBlanks: boolean;

  constructor(private router: Router,
              private readonly service: LoginService) { }

  ngOnInit() {
    this.messageBlanks = false;
    this.message = false;
  }

  async login(form: NgForm) {
    if (form.value.usuario === '' || form.value.pass === '') {
      this.messageBlanks = true;
    } else {
      this.usuarioHttp = await this.service.validaUsuario(form.value.usuario, form.value.pass);
      this.validador = this.usuarioHttp.code;
      if (this.validador === 14) {
        this.message = false;
        localStorage.setItem('usuario', form.value.usuario);
        localStorage.setItem('tipoMenu', this.usuarioHttp.tipoMenu);
        localStorage.setItem('idUsuario', this.usuarioHttp.idUsuario);
        this.router.navigate(['/inicio']);
      } else {
        this.message = true;
      }
    }
  }

}
