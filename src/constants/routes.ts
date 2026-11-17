import type { Href } from 'expo-router';

// Único lugar donde se definen las rutas de la app. Para apuntar un botón o link a otra pantalla,
// se cambia aquí y se actualiza en todos los componentes. Por ahora todas son '/' (provisionales).
export const ROUTES = {
  home: '/',
  login: '/',
  affiliate: '/',
  professionals: '/',
  plans: '/',
  contact: '/',
  services: '/',
  resources: '/',
  faqs: '/',
} as const satisfies Record<string, Href>;
