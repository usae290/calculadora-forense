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
    pantalla.innerHTML = "❌ DATOS INVÁLIDOS";
    return;
  }

  const C = T1 - Ta;
  const k = -Math.log((T2 - Ta) / C) / t2;
  const t0 = -Math.log((T0 - Ta) / C) / k;

  const min = Math.abs(Math.round(t0 * 60));
  const hh = Math.floor(min / 60);
  const mm = min % 60;

  let texto = `${hh} h ${mm} min`;

  if (hora) {
    const [H, M] = hora.split(":").map(Number);
    let total = H * 60 + M - (t0 * 60);
    total = (total + 1440) % 1440;
    texto += `<br>${String(Math.floor(total / 60)).padStart(2,"0")}:${String(Math.round(total % 60)).padStart(2,"0")}`;
  }

  pantalla.innerHTML = texto;
}
