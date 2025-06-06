# 📋 Quiz

Este projeto é um sistema completo de quiz com servidor e interface web para o host controlar perguntas, respostas, tempo e pontuação das equipes em tempo real usando Socket.IO.

---

## 🚀 Começando

### 1. Clonar o repositório

No terminal, execute:

```bash
git clone https:/github.com/hen-rikLab/gincana.git
cd seu-repositorio
```

### 2. Instalar dependências

Este projeto usa Node.js para o servidor. Se ainda não tem Node.js instalado, baixe em: https://nodejs.org/ (recomendamos a versão LTS).

Após instalar o Node.js, no terminal dentro da pasta do projeto, rode:

```
npm install
```

Isso vai instalar todas as dependências necessárias (ex: express, socket.io).

ou use
```
npm install express socket.io
```

### 3. Rodar o servidor

Após instalar as dependências, inicie o servidor com:

```
node server.js
```

ou, se usar nodemon para desenvolvimento:

```
npx nodemon server.js
```

O servidor estará rodando e aguardando conexões na porta configurada (geralmente http://localhost:3000).

### 4. Abrir a tela do Host

No navegador, abra a URL:
```
http://localhost:3000/host.html
```

Você verá a tela do host, que solicitará uma senha para acesso.
## 🔑 Senha de acesso

    Senha padrão: quiz123 (pode ser alterada no arquivo host.html, variável correctPassword).

## 🧩 Como usar a interface do Host

### Após entrar com a senha correta, você terá os seguintes controles:
#### Botão - Campo	Função

#### Sortear Pergunta -- Envia uma nova pergunta para o telão, selecionada aleatoriamente pelo servidor.

#### Mostrar Resposta -- Exibe a resposta correta da pergunta atual no telão.

#### Campo de tempo (seg) -- Define o tempo para o cronômetro, usado ao clicar em "Iniciar Timer".

#### Iniciar Timer -- Inicia a contagem regressiva do tempo para a pergunta, exibindo no telão.

#### Resetar Telão -- Limpa perguntas, respostas e timer do telão, reiniciando a tela.

#### Reiniciar Perguntas -- Reseta a lista de perguntas para que possam ser sorteadas novamente desde o início.

#### Botões +1 e -1 -- Atualizam a pontuação de cada equipe, aumentando ou diminuindo 1 ponto (não permite < 0).