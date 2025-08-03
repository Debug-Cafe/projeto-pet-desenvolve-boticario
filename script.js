// Carrega raças populares ao iniciar
window.onload = function() {
  getDogs();
};

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
      filtradas = racas.slice(0, 4);
    }

    if (filtradas.length === 0) {
      listaRacas.innerHTML = "<p>Nenhuma raça encontrada.</p>";
      return;
    }

    listaRacas.innerHTML = "";
    
    // Adiciona título apenas se não há busca
    if (!termo) {
      const titulo = document.createElement("h3");
      titulo.textContent = "Algumas sugestões de raças";
      titulo.style.textAlign = "center";
      titulo.style.margin = "20px 0";
      titulo.style.width = "100%";
      listaRacas.appendChild(titulo);
    }
    
    for (const raca of filtradas) {
      try {
        const imageRes = await fetch(`https://api.thedogapi.com/v1/images/search?breed_ids=${raca.id}&limit=1`);
        const images = await imageRes.json();
        
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
          <h2>${raca.name}</h2>
          ${images[0] ? `<img src="${images[0].url}" alt="${raca.name}" />` : ""}
          <p><strong>Temperamento:</strong> ${raca.temperament || "N/A"}</p>
          <p><strong>Origem:</strong> ${raca.origin || "Desconhecida"}</p>
          <p><strong>Expectativa de vida:</strong> ${raca.life_span}</p>
        `;
        listaRacas.appendChild(card);
      } catch {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
          <h2>${raca.name}</h2>
          <p><strong>Temperamento:</strong> ${raca.temperament || "N/A"}</p>
          <p><strong>Origem:</strong> ${raca.origin || "Desconhecida"}</p>
          <p><strong>Expectativa de vida:</strong> ${raca.life_span}</p>
        `;
        listaRacas.appendChild(card);
      }
    }
  } catch (err) {
    listaRacas.innerHTML = "<p>Erro ao buscar dados.</p>";
    console.error(err);
  }
}