let guardaNumeros = [];
let quantidadeLista = guardaNumeros.length;
let quantidadeNumeros = 100;
let numeroSecreto = geraNumeroAleatorio();
let tentativas = 1;

function geraNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * quantidadeNumeros + 1);
    let quantidadeNumerosEscolhidos = guardaNumeros.length;
    if(quantidadeNumerosEscolhidos == quantidadeNumeros) {
        guardaNumeros = [];
    }
    if (guardaNumeros.includes(numeroEscolhido)) {
       return geraNumeroAleatorio();
    } else {
        guardaNumeros.push(numeroEscolhido);
        console.log(guardaNumeros);
        return numeroEscolhido;
    }
}

function espaco(tag , texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
     if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.2; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
    //responsiveVoice.speak(texto , 'Brazilian Portuguese Female' , {rate: 1.2});
}

function escreveTextoInicial() {
    espaco("h1" , "Jogo do número Secreto");
    espaco("p" , `Escolha um número de 1 a ${quantidadeNumeros}`);
}
escreveTextoInicial();

function verificaChute() {
    let chute = parseInt(document.querySelector('input').value);

    if(chute == numeroSecreto) {
        espaco("h1" , "Párabens você acertou!");
        let tentado = tentativas > 1? "tentativas" : "tentativa";
        espaco("p" , `Com ${tentativas} ${tentado}`);
        document.getElementById("reiniciar").removeAttribute("disabled");
    } else {
        if(chute > numeroSecreto) {
            espaco("p" , "o número secreto é MENOR");
        } else {
            espaco("p" , "O número secreto é MAIOR");
        }
        limpaTexto();
    }
    tentativas++;
}

function limpaTexto() {
    chute = document.querySelector('input');
    chute.value = "";
}

function reiniciaJogo() {
    numeroSecreto = geraNumeroAleatorio();
    tentativas = 1;
    limpaTexto();
    escreveTextoInicial();
    document.getElementById("reiniciar").setAttribute("disabled" , true);
    console.log(numeroSecreto);
}
