// gerar-json.js
const fs = require('fs');
const path = require('path');

// Caminho da pasta com os tutoriais
const tutorialsDir = path.join(__dirname, 'tutorials');

// Lê todos os arquivos HTML da pasta
const files = fs.readdirSync(tutorialsDir).filter(f => f.endsWith('.html'));

// Cria array de objetos tutorial
const tutorials = files.map(f => {
  // Gera título a partir do nome do arquivo
  const title = f.replace(/-/g, ' ').replace('.html','')
                 .replace(/\b\w/g, c => c.toUpperCase()); // Capitaliza cada palavra

  // Resumo automático
  const summary = `Tutorial sobre ${title}. Aprenda passo a passo com dicas práticas.`;

  // Categoria padrão (você pode ajustar conforme palavras-chave)
  let category = "Cozinha"; 
  if(title.toLowerCase().includes("coqueiro") || title.toLowerCase().includes("coco")) category = "Nordeste";
  if(title.toLowerCase().includes("tecnologia")) category = "Tecnologia";

  // Destaque automático opcional
  const highlight = false;

  return {
    title: title,
    category: category,
    url: `tutorials/${f}`,
    summary: summary,
    highlight: highlight
  };
});

// Cria pasta data se não existir
const dataDir = path.join(__dirname, 'assets', 'data');
if(!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

// Salva JSON
const outputPath = path.join(dataDir, 'tutorials.json');
fs.writeFileSync(outputPath, JSON.stringify(tutorials, null, 2));

console.log(`tutorials.json gerado com ${tutorials.length} tutoriais!`);