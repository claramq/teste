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
            this.forca -= 30; // Perde 20 de força
        } else if (comoAtacar === "fraca") {
            this.forca -= 15; // Perde 10 de força
            this.vida -= 15; // Perde 10 de vida
        } else if (comoAtacar === "não atacar") {
            this.vida -= 30; // Perde 20 de vida
        }
        this.exibirStatus(); // Exibe status após a ação
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
        jogador.calcularDano(ataque);
        rodada++; // Avança para a próxima rodada
        setTimeout(jogarRodada, 100); // Passa para a próxima rodada
    } else {
        console.log("Opção inválida. Tente novamente.");
        perguntarComoAtacar(inimigo); // Pergunta novamente
    }
}
