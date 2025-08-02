async function getDogs() {
  const termo = document.getElementById("search").value.trim().toLowerCase();
  const listaRacas = document.getElementById("resultado");
  listaRacas.innerHTML = "Carregando...";

  try {
    const res = await fetch("https://api.thedogapi.com/v1/breeds");
    const racas = await res.json();

    let filtradas;
    if (termo) {
      filtradas = racas.filter((r) => r.name.toLowerCase().includes(termo));
    } else {
      filtradas = racas;
    }

    if (filtradas.length === 0) {
      listaRacas.innerHTML = "<p>Nenhuma raça encontrada.</p>";
      return;
    }

    listaRacas.innerHTML = "";

filtradas.forEach(function(raca) {
  const card = document.createElement("div");
  card.className = "card";

  card.innerHTML =
    "<h2>" + raca.name + "</h2>" +
    "<p><strong>Temperamento:</strong> " + (raca.temperament || "N/A") + "</p>" +
    "<p><strong>Origem:</strong> " + (raca.origin || "Desconhecida") + "</p>" +
    "<p><strong>Expectativa de vida:</strong> " + raca.life_span + "</p>";

  listaRacas.appendChild(card);
});
  } catch (err) {
    listaRacas.innerHTML = "<p>Erro ao buscar dados.</p>";
    console.error(err);
  }
}





