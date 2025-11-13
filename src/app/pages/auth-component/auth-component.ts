import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { Login } from '../../models/login';
import { Registro } from '../../models/registro';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth-service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


@Component({
  selector: 'app-auth-component',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './auth-component.html',
  styleUrl: './auth-component.scss'
})
export class AuthComponent implements OnInit {

  selectedTab = 0;
  loginForm: FormGroup;
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService,
    private readonly activeRouter: ActivatedRoute, private readonly router: Router) {
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

  ngOnInit() {
    this.activeRouter.queryParamMap.subscribe(params => {
      this.selectedTab = params.get('tab') === 'registro' ? 1 : 0
    });
  }

  login() {
    if (this.loginForm.valid) {
     const login = new Login(
        this.loginForm.value.email,
        this.loginForm.value.senha,
     );
     this.authService.logar(login).subscribe({
      next:(value) => {
        this.authService.saveToken(value.token)
        setTimeout(() => {
          this.router.navigate(['/dashboard']);
        }, 100);
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
      this.authService.registrar(registro).subscribe({
        next:(value) => {
          setTimeout(() => {
            this.router.navigate(['/dashboard']);
        }, 100);
        }, error(err) {
          alert('Erro ao se registrar!');
        },
      });

    }
  }

}
