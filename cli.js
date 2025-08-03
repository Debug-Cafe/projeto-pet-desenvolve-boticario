#!/usr/bin/env node

async function getDogs() {
  const termo = process.argv[2];
  
  if (!termo) {
    console.log('🐾 QueroDog CLI');
    console.log('Uso: node cli.js <nome-da-raca>');
    console.log('Exemplo: node cli.js golden');
    return;
  }

  console.log(`🔍 Buscando: ${termo}...\n`);

  try {
    const res = await fetch("https://api.thedogapi.com/v1/breeds");
    const racas = await res.json();

    const filtradas = racas.filter((r) => r.name.toLowerCase().includes(termo.toLowerCase()));

    if (filtradas.length === 0) {
      console.log("❌ Nenhuma raça encontrada.");
      return;
    }

    for (const raca of filtradas) {
      try {
        const imageRes = await fetch(`https://api.thedogapi.com/v1/images/search?breed_ids=${raca.id}&limit=1`);
        const images = await imageRes.json();
        
        console.log(`📋 ${raca.name}`);
        console.log(`🎭 Temperamento: ${raca.temperament || "N/A"}`);
        console.log(`🌍 Origem: ${raca.origin || "Desconhecida"}`);
        console.log(`⏰ Expectativa de vida: ${raca.life_span}`);
        if (images[0]) {
          console.log(`🖼️ Imagem: ${images[0].url}`);
        }
        console.log('---');
      } catch {
        console.log(`📋 ${raca.name} (sem imagem)`);
        console.log('---');
      }
    }
  } catch (err) {
    console.log("❌ Erro ao buscar dados.");
    console.error(err);
  }
}

getDogs();