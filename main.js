class Personagem {
    constructor(nome) {
        this.nome = nome;
        this.vida = 100;
        this.forca = 100;
        this.felicidade = 100;
    }

    exibirStatus() {
        console.log(`Status de ${this.nome}: Vida = ${this.vida}, Força = ${this.forca}, Felicidade = ${this.felicidade}`);
    }

    enfrentarDesafio(rodada) {
        const inimigos = ["Alison Zille", "Leonardo", "Danielle", "Arthur", "Jamerson"];
        const inimigo = inimigos[rodada - 1];
        alert(`${this.nome} encontrou o inimigo: ${inimigo}!`);
        return inimigo;
    }

    mensagemInimigo(inimigo) {
        const mensagens = {
            "Alison Zille": "Cuidado: não use chatgpt nos trabalhos!",
            "Leonardo": "Tome cuidado com o sorteio, principalmente se você for o número 34!",
            "Danielle": "Não coma nada dentro do laboratório!",
            "Arthur": "Não se deixe enganar, nem tudo é HTML",
            "Jamerson": "Se prepare para a recuperação!"
        };
        return mensagens[inimigo] || "";
    }

    calcularDano(comoAtacar) {
        let perdaVida = 0;
        let perdaForca = 0;

        if (comoAtacar === "forte") {
            if (this.forca >= 35) {
                this.forca -= 35;
                perdaForca = 35;
            } else {
                alert("Força insuficiente para atacar com força forte.");
                return false;
            }
        } else if (comoAtacar === "fraco") {
            if (this.forca >= 15) {
                this.forca -= 15;
                perdaForca = 15;
                this.vida -= 20;
                perdaVida = 20;
            } else {
                alert("Força insuficiente para atacar com força fraco.");
                return false;
            }
        } else if (comoAtacar === "não atacar") {
            this.vida -= 35;
            perdaVida = 35;
        }

        this.felicidade -= 20;
        return true;
    }

    estaVivo() {
        return this.vida > 0;
    }

    perderVidaPorRodada() {
        this.vida -= 0;
    }
}

let rodada = 1;
const maxRodadas = 5;
const jogador = new Personagem("Aluno");

function start() {
    alert("Era uma vez um aluno feliz, esperançoso e sonhador, que desejava se tornar um técnico em informática. Mal sabia ele o que o esperava...");
    jogador.exibirStatus();
    jogarRodada();
}

function jogarRodada() {
    if (rodada <= maxRodadas && jogador.estaVivo()) {
        console.log(`Rodada ${rodada}`);
        const inimigo = jogador.enfrentarDesafio(rodada);
        alert(jogador.mensagemInimigo(inimigo));
        perguntarComoAtacar(inimigo);
    } else if (jogador.estaVivo()) {
        alert("Parabéns! Você venceu o jogo! Mas entrou em depressão, se pepare para a próxima fase: a terapia!");
    } else {
        alert("Você foi derrotado... Tente novamente!");
    }
}

function perguntarComoAtacar(inimigo) {
   
    const escolha = prompt(`Você encontrou ${inimigo}. Como você deseja atacar?\n1 - Atacar fraco\n2 - Atacar forte\n3 - Não atacar`);

    let ataque;
    if (escolha === "1") {
        ataque = "fraco";
    } else if (escolha === "2") {
        ataque = "forte";
    } else if (escolha === "3") {
        ataque = "não atacar";
    } else {
        alert("Opção inválida. Tente novamente.");
        perguntarComoAtacar(inimigo);
        return;
    }
    
    const sucesso = jogador.calcularDano(ataque);
    if (sucesso) {
        rodada++; 
        jogador.perderVidaPorRodada(); 
        console.log(`Status de ${jogador.nome} após a rodada: Vida = ${jogador.vida}, Força = ${jogador.forca}, Felicidade = ${jogador.felicidade}`);
        setTimeout(jogarRodada, 100);
    } else {
        perguntarComoAtacar(inimigo);
    }
}

