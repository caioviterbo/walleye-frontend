import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Input} from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Dispositivo } from '../../../models/dispositivo';
import { DispositivoService } from '../../../services/dispositivo/dispositivo-service';
import { QRCodeComponent } from 'angularx-qrcode';
import { environments } from '../../../environments/environments';
import { Router } from '@angular/router';
import { DispositivoDashboard } from '../../../models/dispositivo-dashboard';

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
  dispositivoSelecionado: any
  modoEdicao: any

  constructor(private readonly router: Router, private fb: FormBuilder, private dispositivoService: DispositivoService,
    private cdr: ChangeDetectorRef) {
      const nav = this.router.currentNavigation();
    this.dispositivoSelecionado = nav?.extras.state?.['dispositivo'];
    this.modoEdicao = !!this.dispositivoSelecionado;
    this.deviceForm = this.fb.group({
      nome: [this.dispositivoSelecionado?.nome ?? '', Validators.required],
      localizacao: [this.dispositivoSelecionado?.localizacao ?? '', Validators.required]
    });
  }

  adicionarDispositivo() {
    if (this.deviceForm.valid && this.modoEdicao === false) {
      const dispositivo = new Dispositivo(
        this.deviceForm.value.nome,
        this.deviceForm.value.localizacao
      );
      this.dispositivoService.adicionarDispositivo(dispositivo).subscribe((res: any) => {
        console.log(res)
        this.qrData = JSON.stringify({
          id: res.id,
          codigo_pareador: res.codigo_pareador,
          api_url: environments.api
        })
        this.cdr.markForCheck()
        this.contagemExpiracao()
        console.log(this.qrData)
      })
    }

    if (this.deviceForm.valid && this.modoEdicao === true) {
      const dispositivo = new Dispositivo(
        this.deviceForm.value.nome,
        this.deviceForm.value.localizacao
      );
      this.dispositivoService.editarDispositivo(this.dispositivoSelecionado.id, dispositivo)
      .subscribe((res) => {
        console.log(res);
      })
    }
  }

  removerDispositivo() {
    this.dispositivoService.removerDispositivo(this.dispositivoSelecionado.id)
    .subscribe()
    this.router.navigate(['/dashboard'])
  }

  cancelar() {
    this.router.navigate(['/dashboard']);
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
