const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const os = require("os");
const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(__dirname + '/public'));

// Lista de perguntas e respostas extraídas do PDF
const perguntasERespostas = [
  { pergunta: "Qual é a capital do Canadá?", resposta: "Ottawa" },
  { pergunta: "Quem escreveu \"Dom Quixote\"?", resposta: "Miguel de Cervantes" },
  { pergunta: "Qual é o maior oceano do mundo?", resposta: "Oceano Pacífico" },
  { pergunta: "Quantos planetas fazem parte do nosso Sistema Solar (considerando os classicamente reconhecidos)?", resposta: "Oito (Mercúrio, Vênus, Terra, Marte, Júpiter, Saturno, Urano e Netuno)" },
  { pergunta: "Qual é a montanha mais alta do mundo?", resposta: "Monte Everest" },
  { pergunta: "Em que ano a Proclamação da República do Brasil ocorreu?", resposta: "1889" },
  { pergunta: "Quem pintou a \"Mona Lisa\"?", resposta: "Leonardo da Vinci" },
  { pergunta: "Qual é o elemento químico mais abundante na crosta terrestre?", resposta: "Oxigênio" },
  { pergunta: "Qual é o rio mais longo do mundo?", resposta: "Rio Nilo (ou Rio Amazonas, dependendo da medição e critério adotado, mas o Nilo é tradicionalmente o mais aceito para comprimento)" },
  { pergunta: "Quem foi o primeiro homem a pisar na Lua?", resposta: "Neil Armstrong" },
  { pergunta: "Qual é o nome do bioma caracterizado por árvores que perdem suas folhas no outono?", resposta: "Floresta Temperada Decídua" },
  { pergunta: "Qual é a moeda oficial do Japão?", resposta: "Iene" },
  { pergunta: "Qual país é conhecido como a \"Terra do Sol Nascente\"?", resposta: "Japão" },
  { pergunta: "Quem formulou a Teoria da Relatividade?", resposta: "Albert Einstein" },
  { pergunta: "Qual é o menor país do mundo em área?", resposta: "Vaticano" },
  { pergunta: "Qual é o instrumento musical de cordas mais comum?", resposta: "Violão" },
  { pergunta: "Em que continente se localiza o Deserto do Saara?", resposta: "África" },
  { pergunta: "Qual é a capital da Austrália?", resposta: "Camberra" },
  { pergunta: "Quem é o autor da peça \"Romeu e Julieta\"?", resposta: "William Shakespeare" },
  { pergunta: "Qual é a glândula que produz insulina no corpo humano?", resposta: "Pâncreas" },
  { pergunta: "Qual é o esporte mais popular no mundo?", resposta: "Futebol" },
  { pergunta: "Quantos lados tem um hexágono?", resposta: "Seis" },
  { pergunta: "Qual é o nome do processo pelo qual as plantas produzem seu próprio alimento?", resposta: "Fotossíntese" },
  { pergunta: "Quem foi o primeiro presidente do Brasil?", resposta: "Marechal Deodoro da Fonseca" },
  { pergunta: "Qual é o maior mamífero terrestre?", resposta: "Elefante Africano" },
  { pergunta: "O que é justiça socioambiental?", resposta: "Equidade na distribuição de benefícios e ônus ambientais." },
  { pergunta: "Quais grupos sociais são mais afetados pela injustiça ambiental?", resposta: "Baixa renda, racializadas, indígenas, quilombolas." },
  { pergunta: "Como a distribuição de recursos naturais se relaciona com a justiça socioambiental?", resposta: "Desigualdade no acesso e uso causa injustiça." },
  { pergunta: "O que é racismo ambiental?", resposta: "Exposição desproporcional de grupos raciais a riscos ambientais." },
  { pergunta: "Qual o papel das comunidades tradicionais na justiça socioambiental?", resposta: "Conservam o ambiente e lutam por seus direitos." },
  { pergunta: "Como a poluição afeta populações de baixa renda?", resposta: "Vivem perto de fontes de poluição, sofrendo mais impactos." },
  { pergunta: "O que são \"zonas de sacrifício\"?", resposta: "Áreas com alta concentração de impactos ambientais negativos." },
  { pergunta: "Como a falta de saneamento básico se relaciona com a justiça socioambiental?", resposta: "Afeta principalmente comunidades carentes, gerando doenças." },
  { pergunta: "Qual a importância da participação popular nas decisões ambientais?", resposta: "Garante que as comunidades afetadas defendam seus direitos e influenciem decisões." },
  { pergunta: "Como as mudanças climáticas impactam desigualmente?", resposta: "Afetam mais populações vulneráveis, com menos capacidade de adaptação." },
  { pergunta: "O que é segurança alimentar em justiça socioambiental?", resposta: "Acesso garantido a alimentos, ameaçado pela degradação ambiental." },
  { pergunta: "Qual o significado de equidade ambiental?", resposta: "Distribuição justa dos benefícios e ônus ambientais para todos." },
  { pergunta: "Como grandes projetos de infraestrutura podem gerar injustiças?", resposta: "Deslocam populações e degradam o ambiente localmente." },
  { pergunta: "O que é desenvolvimento sustentável sob a ótica da justiça socioambiental?", resposta: "Desenvolvimento equitativo que atende às necessidades atuais e futuras sem comprometer grupos vulneráveis." },
  { pergunta: "Cite um movimento social por justiça socioambiental.", resposta: "Movimento dos Atingidos por Barragens (MAB)." },
  { pergunta: "Como a degradação ambiental afeta a saúde de populações vulneráveis?", resposta: "Causa doenças devido à poluição e falta de recursos." },
  { pergunta: "Qual o papel das políticas públicas na justiça socioambiental?", resposta: "Corrigem desigualdades, protegem o ambiente e garantem direitos." },
  { pergunta: "O que são crimes ambientais e como afetam comunidades?", resposta: "Ações ilegais que danificam o ambiente, prejudicando a saúde e subsistência das populações." },
  { pergunta: "Como a mineração pode gerar conflitos socioambientais?", resposta: "Contamina o ambiente, desmata e desloca comunidades." },
  { pergunta: "Qual a relação entre posse da terra e justiça socioambiental?", resposta: "Acesso e controle da terra são cruciais para a subsistência e direitos de comunidades." },
  { pergunta: "O que é ecologia profunda em relação à justiça socioambiental?", resposta: "Valoriza toda a vida e vê a exploração humana/ambiental como interligada." },
  { pergunta: "Como a educação ambiental contribui para a justiça socioambiental?", resposta: "Conscientiza, empodera e promove valores de equidade." },
  { pergunta: "Qual o impacto da urbanização desordenada na justiça socioambiental?", resposta: "Cria favelas, falta de saneamento e expõe populações a riscos ambientais." },
  { pergunta: "O que significa resiliência comunitária em justiça socioambiental?", resposta: "Capacidade da comunidade de resistir e se recuperar de impactos ambientais." },
  { pergunta: "Como o consumo excessivo e o lixo se relacionam com a injustiça ambiental?", resposta: "Lixo afeta mais comunidades próximas a lixões, que são as maiores geradoras de resíduos." },
];

let perguntasUsadas = [];
let perguntaAtual = null;
let respostaAtual = null;

io.on("connection", (socket) => {
  console.log("Novo cliente conectado");

  socket.on("sortearPergunta", () => {
    if (perguntasUsadas.length >= perguntasERespostas.length) {
      perguntasUsadas = [];
    }
    let idx;
    do {
      idx = Math.floor(Math.random() * perguntasERespostas.length);
    } while (perguntasUsadas.includes(idx));

    perguntasUsadas.push(idx);
    perguntaAtual = perguntasERespostas[idx].pergunta;
    respostaAtual = perguntasERespostas[idx].resposta;

    io.emit("perguntaAtual", perguntaAtual);
  });

  socket.on("mostrarResposta", () => {
    if (respostaAtual) {
      io.emit("respostaAtual", respostaAtual);
    }
  });

  socket.on("point", ({ team, color }) => {
    io.emit("point", { team, color });
  });

  socket.on("timer", (duration) => {
    io.emit("timer", duration);
  });

  socket.on("resetTelao", () => {
    perguntaAtual = null;
    respostaAtual = null;
    io.emit("resetTelao");
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  const interfaces = os.networkInterfaces();
  let localAddress = "http://localhost:" + PORT;

  for (const iface of Object.values(interfaces)) {
    for (const config of iface) {
      if (config.family === 'IPv4' && !config.internal) {
        localAddress = `http://${config.address}:${PORT}`;
        break;
      }
    }
  }

  console.log(`Servidor rodando em: ${localAddress}`);
});