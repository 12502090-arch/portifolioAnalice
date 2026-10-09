var corpo = document.body;
var botaoTema = document.getElementById("botaoTema");

var temaSalvo = localStorage.getItem("tema");

if (temaSalvo == "claro") {
    corpo.classList.add("modo-claro");
}

botaoTema.onclick = function() {
    corpo.classList.toggle("modo-claro");

    var modoClaro = corpo.classList.contains("modo-claro");

    if (modoClaro) {
        localStorage.setItem("tema", "claro");
        botaoTema.setAttribute("aria-label", "Ativar modo escuro");
    } else {
        localStorage.setItem("tema", "escuro");
        botaoTema.setAttribute("aria-label", "Ativar modo claro");
    }
};

var botaoMenu = document.getElementById("botaoMenu");
var menu = document.getElementById("menu");

botaoMenu.onclick = function() {
    menu.classList.toggle("aberto");
};

var linksMenu = document.querySelectorAll(".menu a");

for (var i = 0; i < linksMenu.length; i++) {
    linksMenu[i].onclick = function() {
        menu.classList.remove("aberto");
    };
}

var elementos = document.querySelectorAll(".aparecer");

function rolagem() {
    for (var i = 0; i < elementos.length; i++) {
        var posicao = elementos[i].getBoundingClientRect().top;

        if (posicao < window.innerHeight - 100) {
            elementos[i].classList.add("visivel");
        } else {
            elementos[i].classList.remove("visivel");
        }
    }
}

window.onscroll = function() {
    rolagem();
};

rolagem(); // mostra o que já está na tela ao carregar

var tituloInicio = document.querySelector(".texto-inicio h2");
var textoDigitado = "Estudante de Desenvolvimento de Sistemas";
var numeroLetra = 0;

tituloInicio.textContent = "";

function escreverTexto() {
    if (numeroLetra < textoDigitado.length) {
        tituloInicio.textContent = tituloInicio.textContent + textoDigitado[numeroLetra];
        numeroLetra++;
        setTimeout(escreverTexto, 55);
    }
}

escreverTexto();

var janela = document.getElementById("janelaProjeto");
var fecharJanela = document.getElementById("fecharJanela");
var janelaTipo = document.getElementById("janelaTipo");
var janelaTitulo = document.getElementById("janelaTitulo");
var janelaTexto = document.getElementById("janelaTexto");

function abrirProjeto(tipo) {
    if (tipo == "portfolio") {
        janelaTipo.innerHTML = "DESENVOLVIMENTO WEB";
        janelaTitulo.innerHTML = "Portfólio Pessoal";
        janelaTexto.innerHTML = "Portfólio desenvolvido com HTML, CSS e JavaScript, seguindo o protótipo criado no Figma e utilizando responsividade, modo claro e escuro e interações em JavaScript.";
    }

    if (tipo == "breve") {
        janelaTipo.innerHTML = "EM DESENVOLVIMENTO";
        janelaTitulo.innerHTML = "Próximo projeto";
        janelaTexto.innerHTML = "Novo projeto que será desenvolvido para colocar em prática os conhecimentos adquiridos durante o curso.";
    }

    janela.classList.add("aberta");
}

fecharJanela.onclick = function() {
    janela.classList.remove("aberta");
};

janela.onclick = function(evento) {
    if (evento.target == janela) {
        janela.classList.remove("aberta");
    }
};

var telefone = document.getElementById("telefone");

telefone.oninput = function() {
    var tel = telefone.value;

    tel = tel.replace(/\D/g, "");
    tel = tel.slice(0, 11);

    if (tel.length <= 10) {
        if (tel.length >= 2) {
            tel = "(" + tel.slice(0, 2) + ")" + tel.slice(2);
        }

        if (tel.length >= 9) {
            tel = tel.slice(0, 8) + "-" + tel.slice(8);
        }
    } else {
        tel = "(" + tel.slice(0, 2) + ")" + tel.slice(2);
        tel = tel.slice(0, 9) + "-" + tel.slice(9);
    }

    telefone.value = tel;
};

var formulario = document.getElementById("formularioContato");
var aviso = document.getElementById("aviso");

formulario.onsubmit = function(evento) {
    evento.preventDefault();

    var nome = document.getElementById("nome").value;
    var email = document.getElementById("email").value;
    var mensagem = document.getElementById("mensagem").value;

    if (nome.length < 3) {
        alert("Digite um nome válido.");
        return;
    }

    if (email.indexOf("@") == -1) {
        alert("Digite um e-mail válido.");
        return;
    }

    if (mensagem.length < 5) {
        alert("Digite uma mensagem.");
        return;
    }

    aviso.classList.add("mostrar");
    formulario.reset();

    setTimeout(function() {
        aviso.classList.remove("mostrar");
    }, 3000);
};

/* ========== PARTÍCULAS INTERATIVAS ========== */

var canvas = document.createElement("canvas");
canvas.id = "particulas";
document.body.prepend(canvas);

var ctx = canvas.getContext("2d");
var particulas = [];
var mouse = { x: null, y: null };
var larguraTela = 0;
var alturaTela = 0;

var distanciaLigacao = 120;
var distanciaMouse = 150;

var movimentoReduzido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function criarParticulas() {
    particulas = [];

    var quantidade = Math.floor((larguraTela * alturaTela) / 15000);
    quantidade = Math.max(35, Math.min(quantidade, 100));

    for (var i = 0; i < quantidade; i++) {
        particulas.push({
            x: Math.random() * larguraTela,
            y: Math.random() * alturaTela,
            vx: (Math.random() - 0.5) * 0.4,
            vy: (Math.random() - 0.5) * 0.4,
            raio: Math.random() * 1.5 + 1
        });
    }
}

function ajustarCanvas() {
    var escala = window.devicePixelRatio || 1;
    var novaLargura = window.innerWidth;

    // no celular, a barra do navegador muda a altura ao rolar:
    // só recria as partículas se a largura mudou de verdade
    var recriar = (novaLargura != larguraTela);

    larguraTela = novaLargura;
    alturaTela = window.innerHeight;

    canvas.width = larguraTela * escala;
    canvas.height = alturaTela * escala;
    ctx.setTransform(escala, 0, 0, escala, 0, 0);

    if (recriar || particulas.length == 0) {
        criarParticulas();
    }

    if (movimentoReduzido) {
        desenhar();
    }
}

function corAtual() {
    if (corpo.classList.contains("modo-claro")) {
        return "85, 113, 238";
    }
    return "70, 95, 200";
}

function atualizar() {
    for (var i = 0; i < particulas.length; i++) {
        var p = particulas[i];

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > larguraTela) {
            p.vx = p.vx * -1;
        }

        if (p.y < 0 || p.y > alturaTela) {
            p.vy = p.vy * -1;
        }

        // o mouse atrai as partículas próximas, de leve
        if (mouse.x !== null) {
            var dx = mouse.x - p.x;
            var dy = mouse.y - p.y;
            var dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < distanciaMouse && dist > 50) {
                var forca = (1 - dist / distanciaMouse) * 0.6;
                p.x += (dx / dist) * forca;
                p.y += (dy / dist) * forca;
            }
        }
    }
}

function desenhar() {
    ctx.clearRect(0, 0, larguraTela, alturaTela);

    var cor = corAtual();

    for (var i = 0; i < particulas.length; i++) {
        var p = particulas[i];

        // ponto
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.raio, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(" + cor + ", 0.7)";
        ctx.fill();

        // linhas entre partículas próximas
        for (var j = i + 1; j < particulas.length; j++) {
            var q = particulas[j];
            var dx = p.x - q.x;
            var dy = p.y - q.y;
            var dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < distanciaLigacao) {
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(q.x, q.y);
                ctx.strokeStyle = "rgba(" + cor + "," + ((1 - dist / distanciaLigacao) * 0.8) + ")";
                ctx.lineWidth = 1;
                ctx.stroke();
            }
        }

        // linhas ligando as partículas ao mouse
        if (mouse.x !== null) {
            var mx = p.x - mouse.x;
            var my = p.y - mouse.y;
            var distMouse = Math.sqrt(mx * mx + my * my);

            if (distMouse < distanciaMouse) {
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(mouse.x, mouse.y);
                ctx.strokeStyle = "rgba(" + cor + "," + ((1 - distMouse / distanciaMouse) * 0.6) + ")";
                ctx.lineWidth = 1;
                ctx.stroke();
            }
        }
    }
}

function animar() {
    atualizar();
    desenhar();
    requestAnimationFrame(animar);
}

window.addEventListener("mousemove", function(evento) {
    mouse.x = evento.clientX;
    mouse.y = evento.clientY;
});

document.addEventListener("mouseleave", function() {
    mouse.x = null;
    mouse.y = null;
});

window.addEventListener("touchmove", function(evento) {
    mouse.x = evento.touches[0].clientX;
    mouse.y = evento.touches[0].clientY;
}, { passive: true });

window.addEventListener("touchend", function() {
    mouse.x = null;
    mouse.y = null;
});

window.addEventListener("resize", ajustarCanvas);

ajustarCanvas();

if (!movimentoReduzido) {
    animar();
}