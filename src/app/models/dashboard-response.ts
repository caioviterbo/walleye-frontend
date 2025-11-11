import { AlertaDashboard } from "./alerta-dashboard";
import { DispositivoDashboard } from "./dispositivo-dashboard";

export interface DashboardResponse {
  totalDispositivos: number;
  online: number;
  offline: number;
  totalAlertas: number;
  ativos: number;
  dispositivos: DispositivoDashboard[];
  alertas: AlertaDashboard[];
}
