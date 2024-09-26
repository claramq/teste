class Personagem {
    constructor(nome) {
        this.nome = nome;
        this.vida = 100;
        this.forca = 100;
        this.recurso = 50; // Opcional, se desejar adicionar mais recursos
    }

    exibirStatus() {
        console.log(`Status de ${this.nome}: Vida = ${this.vida}, Força = ${this.forca}, Recurso = ${this.recurso}`);
    }

    enfrentarDesafio(rodada) {
        const inimigos = ["Alisson Zile", "Leonardo", "Danielle", "Arthur", "Jamerson"];
        const inimigo = inimigos[rodada - 1];
        console.log(`${this.nome} encontrou o inimigo: ${inimigo}!`);
        return inimigo;
    }

    calcularDano(comoAtacar) {
        if (comoAtacar === "forte") {
            if (this.forca >= 35) {
                this.forca -= 35; // Perde 30 de força
            } else {
                console.log("Força insuficiente para atacar com força forte.");
                return false; // Indica que o ataque falhou
            }
        } else if (comoAtacar === "fraca") {
            if (this.forca >= 15) {
                this.forca -= 15; // Perde 15 de força
                this.vida -= 20; // Perde 15 de vida
            } else {
                console.log("Força insuficiente para atacar com força fraca.");
                return false; // Indica que o ataque falhou
            }
        } else if (comoAtacar === "não atacar") {
            this.vida -= 35; // Perde 30 de vida
        }
        this.exibirStatus(); // Exibe status após a ação
        return true; // Indica que o ataque foi bem-sucedido
    }

    estaVivo() {
        return this.vida > 0;
    }
}

let rodada = 1;
const maxRodadas = 5; // Atualizado para 5 rodadas
const jogador = new Personagem("Heroi");

function start() {
    console.log("O jogo começou!");
    jogarRodada();
}

function jogarRodada() {
    if (rodada <= maxRodadas && jogador.estaVivo()) {
        console.log(`\nRodada ${rodada}`);
        const inimigo = jogador.enfrentarDesafio(rodada);
        perguntarComoAtacar(inimigo);
    } else if (jogador.estaVivo()) {
        console.log("Parabéns! Você venceu o jogo!");
    } else {
        console.log("Você foi derrotado... Tente novamente!");
    }
}

function perguntarComoAtacar(inimigo) {
    const ataque = prompt(`Como você deseja atacar ${inimigo}? (fraca/forte/não atacar)`).toLowerCase();
    
    if (ataque === "fraca" || ataque === "forte" || ataque === "não atacar") {
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
