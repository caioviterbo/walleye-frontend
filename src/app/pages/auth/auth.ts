import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { Login } from '../../models/login';
import { Registro } from '../../models/registro';
import { AuthService } from '../../services/auth-service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-auth',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatTabsModule,
    MatIconModule
  ],
  templateUrl: './auth.html',
  styleUrl: './auth.scss'
})
export class Auth {

  selectedTab = 0;
  loginForm: FormGroup;
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.registerForm = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  login() {
    if (this.loginForm.valid) {
     const login = new Login(
        this.loginForm.value.email,
        this.loginForm.value.senha,
     );
     this.authService.logarUsuario(login).subscribe({
      next:(value) => {
        this.router.navigate(['/dashboard']);
      }, error(err) {
        alert('Email ou senha inválidos!');
      },
     }
     );
    }

  }

  registro() {
    if (this.registerForm.valid) {
      const registro = new Registro(
        this.registerForm.value.nome,
        this.registerForm.value.email,
        this.registerForm.value.senha,
      );
      this.authService.registrarUsuario(registro).subscribe();

    }
  }

  testeGet() {
    console.log("get")
    this.authService.testeGet().subscribe();
  }

}
