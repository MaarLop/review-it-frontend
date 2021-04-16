export function restarDias(fecha: Date, diasARestar: number): Date {
  if (diasARestar < 0) {
    return fecha;
  }
  const date = new Date(fecha);
  date.setDate(date.getDate() - diasARestar);
  return date;
}

export function restarDiasDelActual(diasARestar: number): Date {
  return restarDias(new Date(), diasARestar);
}

export function formatearFechaYYYYmmdd(fecha: Date): string {
  return fecha.toISOString().split('T')[0];
}

export function quitarDesfasajeHorarioUTC(fecha: Date): Date {
  return new Date(fecha.getTime() - fecha.getTimezoneOffset() * 60000);
}

export function diasEnMilisegundos(cantDias: number): number {
  if (cantDias < 0) {
    return undefined;
  }
  return cantDias * 24 * 60 * 60 * 1000;
}
