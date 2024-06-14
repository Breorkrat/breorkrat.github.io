/* cato
　　　　 　  　 ＿＿
　　　 　   ／＞　　フ
　　　 　　 | 　_　 _|
　 　　 　／` ミ＿xノ
　　 　 /　　　 　 |
　　　 /　 ヽ　　 ﾉ
　 　 │　　|　|　|
　／￣|　　 |　|　|
　| (￣ヽ＿_ヽ_)__)
　二つ
*/
function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)) }
preload()
var conteúdo, imagensAtivas;
fetch("./assets/Lista-de-Palavras.txt").then(x => x.text()).then(x => conteúdo = x.split("\n"))
const punsAmount = 12
var pum = []
for(let i = 0; i < punsAmount; i++){
    pum.push(new Audio(`./assets/audio/pum/${i}.wav`))
}
var piadas = []
fetch("./assets/herherher.txt").then(x => x.text()).then(x => {
    piadas = x.split("\r")[0].split("\n")
  }
)
var papiadas = [
    "NÃO INSISTA HUMANO!",
    "EU, O GRRANDE PAPYRUS, NÃO ME REBAIXAREI A ESTE NÍVEL!",
    "HUMANO, CALE-SE",
    "QUER PIADAS? CHAME O SANS, EU TÔ FORA"
]

function Sans(nome, sprite, animação, song, fala, íco, fonte) {
    if (nome) this.nome = nome
    if (sprite) this.sprite = sprite
    if (animação) this.animação = animação
    if (song) this.song = new Audio(song)
    if (fala) {
        this.fala = new Array()
        for (let i = 0; i < fala.length; i++) {
            this.fala.push(new Audio(fala[i]))
        }
    }
    if (íco) this.íco = íco
    if (fonte) this.fonte = fonte
    if (song) this.song.loop = true   
    this.Main = function(preservarFonte) {
        tempo = 0
        padrão = this
        sanses.src = this.sprite
        ícone.href = this.íco
        título.innerText = this.nome + "."
        if (!preservarFonte) final.style.fontFamily = this.fonte
        sanses.src = this.sprite
    }
    this.gerarFala = function(){
        let clone = this.fala[0].cloneNode();
        switch (nome) {
            case "error":
                let pbr = Math.round(Math.random() * 10 + 5) / 10
                clone.preservesPitch = false;
                clone.playbackRate = pbr;
                break;
            case "gaster":
                clone = this.fala[Math.floor(Math.random()*8)].cloneNode()
                break;
        }
        clone.volume = volumeGlobal;
        clone.play();
    }
}

const sands = new Sans(
    "sans",
    "./assets/imagens/sans/sprite.png",
    "./assets/imagens/sans/moves.webp",
    "./assets/audio/song.mp3",
    ["./assets/audio/er.mp3"],
    "./assets/imagens/icons/sans.png",
    "Comic Sans"
)

const fortenaite = new Sans(
    "fortenaite",
    null,
    "./assets/imagens/fort/moves.webp",
    "./assets/audio/default.mp3",
    null,
    null,
    null
)

const errorSans = new Sans(
    "error",
    "./assets/imagens/error/sprite.png",
    "./assets/imagens/error/moves.webp",
    "./assets/audio/errorlovania.mp3",
    ["./assets/audio/er.mp3"],
    "./assets/imagens/icons/error.png",
    "Comic Sans"
)

const papyrus = new Sans(
    "papyrus",
    "./assets/imagens/papyrus/sprite.png",
    "./assets/imagens/papyrus/moves.webp",
    "./assets/audio/bonestrousle.mp3",
    ["./assets/audio/papyrus.mp3"],
    "./assets/imagens/icons/papyrus.png",
    "Papyrus",
)

const gaster = new Sans(
    "gaster",
    "./assets/imagens/gaster/sprite.png",
    "./assets/imagens/gaster/moves.webp",
    "./assets/audio/noise.mp3",
    [
        "./assets/audio/gaster/Gaster-01.mp3",
        "./assets/audio/gaster/Gaster-02.mp3",
        "./assets/audio/gaster/Gaster-03.mp3",
        "./assets/audio/gaster/Gaster-04.mp3",
        "./assets/audio/gaster/Gaster-05.mp3",
        "./assets/audio/gaster/Gaster-06.mp3",
        "./assets/audio/gaster/Gaster-07.mp3",
        "./assets/audio/gaster/Gaster-08.mp3",
    ],
    "./assets/imagens/icons/gaster.png",   
    "Wingdings"
)

let select = new Audio('./assets/audio/select.mp3')
let click = new Audio('./assets/audio/click.mp3')
let locked = new Audio('./assets/audio/locked.mp3')
volumeGlobal = 0.4
let atual = padrão = sands;
let sanses = document.getElementById('sans');
var spare = document.getElementById('spare')
var act = document.getElementById('act')
var final = document.getElementById('final')
var botões = document.querySelectorAll('.botão')
var cx = document.querySelector('#cx')
var cushion = document.querySelector('#cushion')
var section = document.querySelector('#section')
var box = document.querySelectorAll('.box')
var ícone = document.querySelector('#ícone')
var título = document.querySelector('#title')
var nome = document.querySelector('#nome')
var hp = document.querySelector('#hp')
var vida = document.querySelector('#vida')
var dif = document.querySelector('#dif')

let code = [
    "ArrowUp",
    "ArrowUp",
    "ArrowDown",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowLeft",
    "ArrowRight",
    "b",
    "a"
]
let input = []
//Define todos os sons para o volume global
papyrus.song.volume = sands.song.volume = errorSans.song.volume = fortenaite.song.volume = locked.volume = click.volume = select.volume = volumeGlobal



let txt;
let para = falando = escolhendoNome = false;
var papyrusPiada = 0;
let onTouchDevice = ('ontouchstart' in document.documentElement);
addEventListener("resize", screenSize);
screenSize()

for (let i = 0; i < botões.length; i++) {
    botões[i].addEventListener('click', () => { mclick(botões[i]) })
    botões[i].addEventListener('mouseover', () => { menter(botões[i]) })
    botões[i].addEventListener('mouseout', () => { mout(botões[i]) })
}

window.addEventListener('keydown', async (tecla) => {
    //Konami code
    input.push(tecla.key)
    if (input.length > code.length) {
        input.shift()
    }
    if (input.toString() == code.toString()) {
        if (padrão == papyrus) {
            falar("não", padrão)
            return;
        }
        if (padrão != sands) return;
        errorSans.Main()
        window.alert("what")
    }
})

let interactable = true

// Tabela de itens
let tabela = false
const itens = [
    {
        img: "./assets/imagens/Whoopie_Cushion.png",
        id: "pum"
    },
    {
        img: "./assets/imagens/lol.png",
        id: "lol"
    },
    {
        img: './assets/imagens/xgaster.png',
        id: "xgaster"
    },
    {
        img: "./assets/imagens/osso.png",
        id: "osso"
    },
    {
        img: "./assets/imagens/you.png",
        id: "name"
    },
    {
        img: "./assets/imagens/vroom.png",
        id: "vroom"
    }
]

const forbidden = [
    "alphys",
    "asgore",
    "asriel",
    "flowey",
    "toriel",
    "undyne",
    "papyrus"
]

const tblItens = document.createElement("table");
criarTabela()

cx.addEventListener('keydown', async (verif) => {
    atual = padrão
    if (!escolhendoNome && Math.floor(Math.random() * 10) == 0) {
        atual = fortenaite
    }
   
    //Isso é um RegEx, onde ele procura por letras de A-Z em maiúsculo e minúsculo, e caracteres de "! à @" em unicode, o que inclui os números
    if (verif.key == "Shift" || verif.key == "Control") return;
    if (verif.key != "Enter" && !escolhendoNome) tocarMúsica(atual)

    //Cancela a fala caso ele já esteja falando
    if (verif.key == "Enter") {
        if (escolhendoNome) {
            if (cx.value.toLowerCase() == "sans") {
                falar("nope", sands)
                await sleep(10)
                cx.value = ""
                return;
            }

            if (forbidden.includes(cx.value.toLowerCase())) {
                await sleep(10)
                cx.value = ""
                cx.placeholder = "Escolha SEU nome"
                return;
            }

            if (cx.value.toLowerCase() == "gaster") {
                location.reload()
                return;
            }
            nome.innerText = cx.value
            escolhendoNome = false
            await sleep(5)
            cx.value = ""
            cx.placeholder = "Texto a ser escrito"
            cx.removeAttribute('maxLength')
            return
        }
        if (interactable) falar(cx.value, padrão)
    }
})

let tempo = 0;
let looping = false;
let bufferFonte = false;
let novoTexto

async function falar(txt, sans, piada, blazenaopegue) {
    if (bufferFonte && sans.nome == "sans") final.style.fontFamily = 'Comic Sans'
    if (falando == true) {
        novoTexto = txt
        para = true;
        return;
    }
    if (padrão.nome == "papyrus") {
        if (!piada) papyrusPiada = 0
        else papyrusPiada++ 
    }
    if (!blazenaopegue && Math.floor(Math.random()*20) == 0) txt = "joga na blaze ae"
    if (txt.toLowerCase() == "espaguete") {
        txt = "ESPAGUETE!!!"
        papyrus.Main()
        sans = papyrus
    }
    //Limpa o campo de fala
    final.innerHTML = ""
    falando = true;
    let playready = true;
    if (sans.nome == "papyrus") {
        txt = txt.toUpperCase()
        txt += "!!"
    }
    for (let i = 0; i < txt.length; i++) {
        //Cancela caso receba um sinal para parar
        if (para == true) {
            //Reinicia a parte da fala
            falando = para = false
            falar(novoTexto, sans, piada)
            return;
        }
        //Escreve letra por letra tocando o áudio
        final.innerHTML += `${txt[i]}`
        fala: {
            if (txt[i] == " ") {
                playready = true
                break fala;
            }
            if (playready) {
                sans.gerarFala()
                playready = false
            } else {
                playready = true
            }
        }
            await sleep(40)
    }
    falando = false;
}

var x;
async function tocarMúsica(sans, ignorartempo) {
    if (!ignorartempo) tempo >= 5 ? tempo == 5 : tempo += 3
    if (looping) return;
    //Sansio do fortes
    if (sans.song.paused == true) {
        sans.song.play()
        loopMúsica(sans)
        sanses.src = sans.animação
    }
}

async function loopMúsica(sans) {
    //Sinaliza que um looping começou, decrementa em tempo a cada 0.1 segundos
    sans.song.volume = volumeGlobal
    looping = true;
    while (tempo > 0) {
        tempo--;
        await sleep(100)
    }
    looping = false;
    sans.song.pause()
    sanses.src = padrão.sprite
}

var currSize
function screenSize() {
    if (falando) return;
    if (window.innerWidth < 577) {
        final.innerHTML = "É recomendado que você rotacione o dispositivo"
    }
    else {
        //Limpa a caixa de texto caso a tela tenha sido rotacionada pelo celular
        if (currSize < 577) final.innerHTML = "Yeah"
    }
    currSize = window.innerWidth
}

overwrite = overloop = false
async function interact(id) {
    section.removeChild(tblItens)
    box[0].style.display = ""
    box[1].style.display = ""
    itensUI = false
    switch(id){
        case "pum":
            pum[Math.floor(Math.random()*punsAmount)].play()
            sands.Main()
            break;

        case "lol":
            falar("aí não cara pelo amor de deus por favor né? vamo para já chega deu já mano saturou por favor", padrão)
            break;

        case "xgaster":
            overwrite ? overwrite = false : overwrite = true
            if (overwrite) botões[1].style.backgroundImage = "url('./assets/imagens/botoes/overwrite.png')"
            if (!overwrite) botões[1].style.backgroundImage = "url('./assets/imagens/botoes/act.png')"
            break;

        case "osso":
            let escolha = piadas[Math.floor(Math.random()*piadas.length)]
            if (padrão.nome == "error") falar("sua vida.", padrão) 
            if (padrão.nome == "sans") falar(escolha, padrão, true)
            if (padrão.nome == "papyrus") {
                falar(papiadas[papyrusPiada], padrão, true)
                if (papyrusPiada >= 4) {
                    sands.Main(true)
                    bufferFonte = true
                } 
            }
            break;

        case "name":
            cx.placeholder = "Escolha seu nome"
            escolhendoNome = true
            cx.maxLength = "6"
            cx.value = ""
            break;
        
        case "vroom":
            interactable = false
            falar("Prepare-se para digitar as palavras!", padrão)
            await sleep(2500)
            falar("3!", padrão)
            await sleep(1000)
            falar("2!", padrão)
            await sleep(1000)
            falar("1!", padrão)
            await sleep(1000)
            cx.focus()
            tempo = 9999999
            tocarMúsica(padrão, true)
            let score = 0
            do {
                click.play()
                let palavra = conteúdo[Math.floor(Math.random()*conteúdo.length)]
                dif.innerText = "TP " + String(Math.round(25 * (0.98 ** score) + (0.8 * palavra.length)))
                falar(palavra, padrão, false, true)
                for (let time = 100; time >= 0; time--){
                    vida.innerText = String(Math.ceil(time/100*92))
                    hp.style.width = String(time) + 'px'
                    await sleep(25 * (0.98 ** score) + (0.8 * palavra.length))
                }
                if (cx.value.toLowerCase().trim() == palavra.toLowerCase().trim()){
                    click.play()
                    cx.value = ""
                    score++
                } else {
                    vida.innerText = '92'
                    tempo = 0
                    locked.play()
                    hp.style.width = "100px"
                    falar(`Sua pontuação foi de ${String(score)} ${score==1?'ponto':'pontos'}, a palavra era ${palavra}`, padrão, false, true)
                    interactable = true
                    dif.innerText = "LV 19"
                    break;
                }
            } while (true)

 }
}

let itensUI = false
function mclick(x) {
    if (!interactable) {
        let clone = locked.cloneNode()
        clone.volume = volumeGlobal
        clone.play()
        return;
    }
    if (x.id == 'spare') {
        let clone = click.cloneNode()
        clone.volume = volumeGlobal
        clone.play();
        window.open("https://discord.gg/XXNQW7zdfc")
    }

    if (x.id == 'act') {
        if (overwrite) {
            if (padrão.nome == "error") {
                gaster.Main(true)
                return;
            }
            location.href = "./assets/old.html";
            return;
        } 
        if (onTouchDevice) {
            click.play();
            errorSans.Main()
        }
        else {
            let clone = locked.cloneNode()
            clone.volume = volumeGlobal
            clone.play();
            if (Math.floor(Math.random() * 10) == 0) {
                final.innerHTML = 'Konami'
            }
        }
    }

    if (x.id == 'item') {
        let clone = click.cloneNode()
        clone.volume = volumeGlobal
        clone.play();
        if (!itensUI){
            section.appendChild(tblItens)
            box[0].style.display = "none"
            box[1].style.display = "none"
            itensUI = true
        } else {
            section.removeChild(tblItens)
            box[0].style.display = ""
            box[1].style.display = ""
            itensUI = false
        }            
    }

    if (x.id == 'fight') {
        let clone = click.cloneNode()
        clone.volume = volumeGlobal
        clone.play();
        falar(conteúdo[Math.floor(Math.random() * conteúdo.length)], padrão)
    }
}

function menter(x) {
    if (x.id == "act" && overwrite) {
        overloop = true
        overwriteLoop()
        return;
    }
    x.style.backgroundImage = `url(./assets/imagens/botoes/a${x.id}.png)`
    select.play()
}

function mout(x) {
    if (x.id == "act" && overwrite) {
        overloop = false
        return;
    }
    x.style.backgroundImage = `url('./assets/imagens/botoes/${x.id}.png`
}

async function overwriteLoop() {
    if(!overloop) return;
    while(true){
        await sleep(100)
        botões[1].style.background = `url('./assets/imagens/botoes/aoverwrite${Math.ceil(Math.random()*6)}.png')`
        if (!overloop) break;
    }
    botões[1].style.background = `url('./assets/imagens/botoes/overwrite.png')`
}

async function preload(){
    imagensAtivas = [
        "aact",
        "afight",
        "aitem",
        "aspare",
        "overwrite",
        "aoverwrite1",
        "aoverwrite2",
        "aoverwrite3",
        "aoverwrite4",
        "aoverwrite5",
        "aoverwrite6"
    ]
    
    imagensAtivas.forEach((imagem) => {
        const cellImage = document.createElement("img")
        cellImage.src = `./assets/imagens/botoes/${imagem}.png`
    })
}

function criarTabela(){    
    tblItens.id = "tabela"
    const tblBody = document.createElement("tbody");
    let item = 0
    for (let i = 0; i < 2; i++) {
        const row = document.createElement("tr");
        for (let j = 0; j < 12; j++)  {
            const cell = document.createElement("td");
            const cellImage = document.createElement("img")
    
            if (itens[item] != null) {
                cellImage.src = itens[item].img
                cellImage.id = itens[item].id
                cellImage.addEventListener('click', () => { interact(cellImage.id) })
            }
            cellImage.style.display = "block"
            cellImage.style.width = "100%"
            cellImage.style.textAlign = "center"
    
            cell.appendChild(cellImage);
            row.appendChild(cell);
            item++
        }
        tblBody.appendChild(row);
    }
    tblItens.appendChild(tblBody);
}
