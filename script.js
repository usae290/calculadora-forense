function calcular() {
  const Ta = parseFloat(document.getElementById("Ta").value);
  const T1 = parseFloat(document.getElementById("T1").value);
  const T2 = parseFloat(document.getElementById("T2").value);
  const T0 = parseFloat(document.getElementById("T0").value);

  const h = parseInt(document.getElementById("h").value || 0);
  const m = parseInt(document.getElementById("m").value || 0);
  const t2 = h + m / 60;

  const hora = document.getElementById("hora").value;
  const pantalla = document.getElementById("pantalla");

  if (t2 <= 0 || !Ta || !T1 || !T2 || !T0) {
    pantalla.innerHTML = " DATOS INVÁLIDOS";
    return;
  }

  const C = T1 - Ta;
  const k = -Math.log((T2 - Ta) / C) / t2;
  const t0 = -Math.log((T0 - Ta) / C) / k;

  // Duración
  const min = Math.floor(t0 * 60);
  const absMin = Math.abs(min);
  const hh = Math.floor(absMin / 60);
  const mm = absMin % 60;

  let texto = `Tiempo transcurrido: ${hh} h ${mm} min`;

  // RESTA DE HORA CORRECTA
  if (hora) {
    const [H, M] = hora.split(":").map(Number);

    const minutosRestar = Math.floor(-t0 * 60);
    let total = H * 60 + M - minutosRestar; //  AQUÍ ESTABA EL ERROR
    total = (total + 1440) % 1440;

    texto += `<br>Hora estimada: ${String(Math.floor(total / 60)).padStart(2,"0")}:${String(total % 60).padStart(2,"0")}`;
  }

  pantalla.innerHTML = texto;
}
