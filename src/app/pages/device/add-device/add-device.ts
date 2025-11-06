import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Dispositivo } from '../../../models/dispositivo';
import { DispositivoService } from '../../../services/dispositivo/dispositivo-service';

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

  constructor(private fb: FormBuilder, private dispositivoService: DispositivoService) {
    this.deviceForm = this.fb.group({
      nome: ['', Validators.required],
      localizacao: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.deviceForm.valid) {
      const dispositivo = new Dispositivo(
        this.deviceForm.value.nome,
        this.deviceForm.value.localizacao
      );
      this.dispositivoService.adicionarDispositivo(dispositivo).subscribe({
        next(value) {
            console.log(value)
        },
      })
    }
  }

  onCancel() {
    console.log('Ação cancelada');
  }
}
