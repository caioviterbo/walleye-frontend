import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Dispositivo } from '../../../models/dispositivo';
import { DispositivoService } from '../../../services/dispositivo/dispositivo-service';
import { QRCodeComponent } from 'angularx-qrcode';
import { log } from 'console';

@Component({
  selector: 'app-add-device',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    QRCodeComponent
],
  templateUrl: './add-device.html',
  styleUrl: './add-device.scss'
})
export class AddDevice {
  deviceForm: FormGroup;
  qrData: string | null = null
  timeLeft: number = 120
  timeInterval: any

  constructor(private fb: FormBuilder, private dispositivoService: DispositivoService,
    private cdr: ChangeDetectorRef) {
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
      this.dispositivoService.adicionarDispositivo(dispositivo).subscribe((res: any) => {
        console.log(res)
        this.qrData = JSON.stringify({
          id: res.id,
          codigo_pareador: res.codigo_pareador
        })
        this.cdr.markForCheck()
        this.contagemExpiracao()
      })
    }
  }

  onCancel() {
    console.log('Ação cancelada');
  }

  contagemExpiracao() {
    this.timeLeft = 120
    clearInterval(this.timeInterval)
    this.timeInterval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.qrData = null;
        clearInterval(this.timeInterval);
      }
      this.cdr.markForCheck()
    }, 1000);
  }
}
