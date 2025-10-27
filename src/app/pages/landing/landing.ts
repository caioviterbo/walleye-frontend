import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { Toolbar } from "../../shared/pages/toolbar/toolbar";

@Component({
  selector: 'app-landing',
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    Toolbar
],
  templateUrl: './landing.html',
  styleUrl: './landing.scss'
})
export class Landing {
  features = [
    {
      icon: 'monitor_heart',
      title: 'Monitoramento em Tempo Real',
      description: 'Acompanhe o status de todos os dispositivos e detecções instantaneamente através do dashboard intuitivo.'
    },
    {
      icon: 'notifications',
      title: 'Alertas Inteligentes',
      description: 'Receba notificações imediatas quando rachaduras forem detectadas, com níveis de severidade classificados.'
    },
    {
      icon: 'dns',
      title: 'Histórico Completo',
      description: 'Acesse todo o histórico de detecções e análises para tomada de decisões baseada em dados.'
    },
    {
      icon: 'security',
      title: 'Tecnologia de IA Avançada',
      description: 'Algoritmos de inteligência artificial treinados para identificar rachaduras com alta precisão.'
    }
  ];

  benefits = [
    'Prevenção de acidentes estruturais',
    'Redução de custos com manutenção',
    'Monitoramento 24/7 automatizado',
    'Relatórios detalhados e exportáveis',
    'Interface intuitiva e responsiva',
    'Suporte técnico especializado'
  ];

  onAccessSystem() {
    // redireciona para a página de login
    window.location.href = '/auth';
  }

  onDemo() {
    // redireciona para página de demonstração (ou modal futuro)
    alert('Demonstração em desenvolvimento!');
  }
}
