import { DispositivoDashboard } from "./dispositivo-dashboard";

export interface AlertaDashboard {
  id: string;
  severidade: string;
  mensagem: string;
  resolvido: boolean;
  data_deteccao: string;
  url_imagem: string;
  dispositivo: DispositivoDashboard;
}
