import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-add-device',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule
  ],
  templateUrl: './add-device.html',
  styleUrl: './add-device.scss'
})
export class AddDevice {
  deviceForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.deviceForm = this.fb.group({
      name: ['', Validators.required],
      location: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.deviceForm.valid) {
      console.log('Novo dispositivo:', this.deviceForm.value);
      // Aqui você pode enviar para a API / backend
    }
  }

  onCancel() {
    console.log('Ação cancelada');
    // Pode redirecionar para o dashboard ou outra página
  }
}
