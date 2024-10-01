class Personagem {
    constructor(nome) {
        this.nome = nome;
        this.vida = 100;
        this.forca = 100;
        this.felicidade = 100; // Recurso de felicidade
    }

    exibirStatus() {
        console.log(`Status de ${this.nome}: Vida = ${this.vida}, Força = ${this.forca}, Felicidade = ${this.felicidade}`);
    }

    enfrentarDesafio(rodada) {
        const inimigos = ["Alisson Zile", "Leonardo", "Danielle", "Arthur", "Jamerson"];
        const inimigo = inimigos[rodada - 1];
        console.log(`${this.nome} encontrou o inimigo: ${inimigo}!`);
        return inimigo;
    }

    mensagemInimigo(inimigo) {
        const mensagens = {
            "Alisson Zile": "Cuidado: não use chatgpt nos trabalhos!",
            "Leonardo": "Tome cuidado com o sorteio, principalmente se você for o número 34!",
            "Danielle": "Não coma nada dentro do laboratório!",
            "Arthur": "Se prepare para a recuperação!",
            "Jamerson": "Cuidado com a Comissão!"
        };
        return mensagens[inimigo] || "";
    }

    calcularDano(comoAtacar) {
        let perdaVida = 0;
        let perdaForca = 0;

        if (comoAtacar === "forte") {
            if (this.forca >= 35) {
                this.forca -= 35; // Perde 35 de força
                perdaForca = 35;
            } else {
                console.log("Força insuficiente para atacar com força forte.");
                return false; // Indica que o ataque falhou
            }
        } else if (comoAtacar === "fraco") {
            if (this.forca >= 15) {
                this.forca -= 15; // Perde 15 de força
                perdaForca = 15;
                this.vida -= 20; // Perde 20 de vida
                perdaVida = 20;
            } else {
                console.log("Força insuficiente para atacar com força fraco.");
                return false; // Indica que o ataque falhou
            }
        } else if (comoAtacar === "não atacar") {
            this.vida -= 35; // Perde 35 de vida
            perdaVida = 35;
        }

        this.felicidade -= 10; // Perde 10 de felicidade a cada ação
        this.exibirStatus(); // Exibe status após a ação
        
        // Informações sobre perdas
        console.log(`Você perdeu ${perdaForca} de Força, ${perdaVida} de Vida e 10 de Felicidade.`);
        return true; // Indica que o ataque foi bem-sucedido
    }

    estaVivo() {
        return this.vida > 0 && this.felicidade > 0; // O personagem deve estar vivo e feliz
    }
}

let rodada = 1;
const maxRodadas = 5; // Atualizado para 5 rodadas
const jogador = new Personagem("Aluno"); // Nome alterado para "Aluno"

function start() {
    console.log("O jogo começou!");
    console.log("Era uma vez um aluno feliz, esperançoso e sonhador, que desejava se tornar um técnico em informática. Mal sabia ele o que o esperava...");
    jogador.exibirStatus(); // Exibe os recursos iniciais
    jogarRodada();
}

function jogarRodada() {
    if (rodada <= maxRodadas && jogador.estaVivo()) {
        console.log(`\nRodada ${rodada}`);
        const inimigo = jogador.enfrentarDesafio(rodada);
        console.log(jogador.mensagemInimigo(inimigo)); // Exibe a mensagem do inimigo
        perguntarComoAtacar(inimigo);
    } else if (jogador.estaVivo()) {
        console.log("Parabéns! Você venceu o jogo!");
    } else {
        console.log("Você foi derrotado... Tente novamente!");
    }
}

function perguntarComoAtacar(inimigo) {
    const ataque = prompt(`Como você deseja atacar ${inimigo}? (fraco/forte/não atacar)`).toLowerCase();
    
    if (ataque === "fraco" || ataque === "forte" || ataque === "não atacar") {
        const sucesso = jogador.calcularDano(ataque);
        if (sucesso) {
            rodada++; // Avança para a próxima rodada se o ataque for bem-sucedido
            setTimeout(jogarRodada, 100); // Passa para a próxima rodada
        } else {
            perguntarComoAtacar(inimigo); // Pergunta novamente se o ataque falhou
        }
    } else {
        console.log("Opção inválida. Tente novamente.");
        perguntarComoAtacar(inimigo); // Pergunta novamente
    }
}

// Inicia o jogo
start();
