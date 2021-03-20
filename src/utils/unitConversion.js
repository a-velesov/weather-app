export function kelvinToCelcius(num) {
  return Math.round(num - 273.15);
}

export function celciusToFahrenheit(c) {
  return Math.round(c * (9 / 5) + 32);
}

export function fahrenheitToCelcius(f) {
  return Math.round(((f - 32) * 5) / 9);
}

export function kmToMile(n) {
  return Math.round(n / 1.60934);
}

export function mileToKm(n) {
  return Math.round(n * 1.60934);
}

export function hPaToMMHg(hPa) {
  return Math.round(hPa * 0.75);
}

export function localeTime(time) {
  const date = time * 1000;
  return new Date(date).toLocaleTimeString('ru-RU', {
      hour: '2-digit',
      minute: '2-digit',
    });
}