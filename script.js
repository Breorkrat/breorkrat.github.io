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
function sleep(ms) {  return new Promise(resolve => setTimeout(resolve, ms)) }

        function Sans(nome, sprite, animação, song, fala){
            this.nome = nome
            this.sprite = sprite
            this.animação = animação
            this.song = new Audio(song)
            this.fala = new Audio(fala)
        }

        const sands = new Sans(
            "sans",
            "./assets/imagens/sans.png",
            "./assets/imagens/passinho.webp",
            "./assets/audio/song.mp3",
            "./assets/audio/er.mp3",
            )

        const fortenaite = new Sans(
            "fortenaite",
            null, //"./assets/imagens/sans.png",
            "./assets/imagens/passinhoforte.webp",
            "./assets/audio/default.mp3",
            "./assets/audio/er.mp3"
            )  

        const errorSans = new Sans(
            "error",
            "./assets/imagens/error.png",
            "./assets/imagens/errormandandoaquele.webp",
            "./assets/audio/errorlovania.mp3",
            "./assets/audio/er.mp3"
        )

        let select = new Audio('./assets/audio/select.mp3')
        let click = new Audio('./assets/audio/click.mp3')
        let locked = new Audio('./assets/audio/locked.mp3')
        let atual, padrão = sands;
        let sanses = document.getElementById('sans');
        var spare = document.getElementById('spare')
        var act = document.getElementById('act')
        var cx = document.getElementById('cx')
        var final = document.getElementById('final')
        var botão = document.getElementsByClassName('botão')
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
            "a",
            "Enter" 
        ]
        let input = []
        
        let txt;
        let para, falando = false;
        let onTouchDevice = ('ontouchstart' in document.documentElement);
        
        addEventListener("resize", screenSize);
        screenSize()

        let botões = document.querySelectorAll(".botão")
        for (let i = 0; i < botões.length; i++)
        {
            botões[i].addEventListener('click', () => {mclick(botões[i])})
            botões[i].addEventListener('mouseover', () => {menter(botões[i])})
            botões[i].addEventListener('mouseout', () => {mout(botões[i])})
        }

        window.addEventListener('keydown', async (tecla) => {
            //Konami code
            input.push(tecla.key)
            if(input.length > code.length)
            {
                input.shift()
            }

            if(input.toString() == code.toString())
            {
                alternarError()
            }
        })

        cx.addEventListener('keydown',  async (verif) => {
            atual = padrão
            if (Math.floor(Math.random()*10) == 0) 
            {
                atual = fortenaite
            }
            //Isso é um RegEx, onde ele procura por letras de A-Z em maiúsculo e minúsculo, e caracteres de "! à @" em unicode, o que inclui os números
            if (/^[A-Z-a-z!-@À-Üá-ü]*$/.test(verif.key) == false || verif.key == "Shift" || verif.key == "Control") return;
            if (verif.key != "Enter") tocarMúsica(atual)

            //Cancela a fala caso ele já esteja falando
            if (verif.key == "Enter") {
                if (falando == true) 
                {
                    para = true;
                    return;
                }            
                falar(txt, atual)
                /*if(box.checked == true){
                    enviarmsg(cx.value)
                }*/
            }
        })

        let tempo = 0;
        let looping = false;

        async function falar(txt, sans)
        {
            //Limpa o campo de fala
            final.innerHTML = ""
            txt = cx.value.split("")
            falando = true;
            for (let i = 0; i < txt.length; i++)
            {
                //Cancela caso receba um sinal para parar
                if (para == true)
                {
                    //Reinicia a parte da fala
                    falando, para = false
                    falar(txt, sans)
                    return;
                }
                //Escreve letra por letra tocando o áudio
                final.innerHTML += `${txt[i]}`
                let voz = !sans.fala ? padrão.fala : sans.fala              
                if(padrão.nome == "error")
                {
                    if (txt[i] !== " ") {
                        let clone = voz.cloneNode()
                        let pbr = Math.round(Math.random()*10 + 5)/10
                        clone.preservesPitch = false;
                        clone.playbackRate = pbr;
                        clone.play();
                    }
                }else 
                {
                    //Não fala nos espaços
                    if (txt[i] !== " ") {
                        voz.cloneNode().play();
                    }
                }
                //Não pausa nos espaços
                if(txt[i] != " "){
                await sleep(60)
                }
            }
            falando = false;
        }

        var x;
        async function tocarMúsica(sans)
        {
            tempo >= 5 ? tempo == 5 : tempo += 3
            if (looping) return;
            //Sansio do fortes
            spawn = Math.ceil(Math.random()*10)
            if(sans.song.paused == true) {
                sans.song.play()
                loopMúsica(sans)
                sanses.src = sans.animação
            }
        }

        async function loopMúsica(sans)
        {
            //Sinaliza que um looping começou, decrementa em tempo a cada 0.1 segundos
            looping = true;
            while (tempo > 0) {
                tempo--;
                await sleep(100)
            }
            looping = false;
            sans.song.pause()
            sanses.src = !sans.sprite ? padrão.sprite : sans.sprite
        }

        var currSize
        function screenSize()
        {
            if (falando) return;
            if(window.innerWidth < 577) {
            final.innerHTML = "É recomendado que você rotacione o dispositivo"
            }
            else {
                //Limpa a caixa de texto caso a tela tenha sido rotacionada pelo celular
                if (currSize < 577) final.innerHTML = "Yeah"
            }
            currSize = window.innerWidth
        }

        function alternarError(){
            if (padrão.nome == "sans") padrão = errorSans 
                else if(padrão.nome == "error") padrão = sands
                window.alert("What")
                sanses.src = padrão.sprite
        }

        function mclick(x){
            if (x.id == 'spare')
            {
                click.play();
                window.open("https://discord.gg/XXNQW7zdfc")
            }
            
            if (x.id == 'act')
            {
                if (onTouchDevice)
                {
                    click.play();
                    alternarError()
                }
                else 
                {
                    locked.cloneNode().play()
                    if(Math.floor(Math.random()*10) == 0)
                    {
                        final.innerHTML = 'Konami'
                    }
                }
            } 
        }

        function menter(x){
            x.style.backgroundImage = `url('./assets/imagens/botoes/${x.id}2.png`
            select.play()
        }

        function mout(x){
            x.style.backgroundImage = `url('./assets/imagens/botoes/${x.id}.png`
        }

