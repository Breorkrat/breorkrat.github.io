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

        function Sans(nome, sprite, animação, song, fala)
        {
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
            "./assets/audio/er.mp3"
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
        let select = new Audio('assets/audio/select.mp3')
        let click = new Audio('assets/audio/click.mp3')
        let atual, padrão = sands;

        let sanses = document.getElementById('sans');
        var footer = window.document.getElementById('footer')
        var cx = document.getElementById('cx')
        var dv = document.getElementById('dv')
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


        addEventListener("resize", screenSize);
        screenSize()
        footer.addEventListener('mouseover', menter)
        footer.addEventListener('mouseout', mout)
        footer.addEventListener('click', mclick)

        window.addEventListener('keydown', async (tecla) => {
            //Konami code
            input.push(tecla.key)
            if(input.length > code.length)
            {
                input.shift()
            }

            if(input.toString() == code.toString())
            {
                if (padrão.nome == "sans") padrão = errorSans 
                else if(padrão.nome == "error") padrão = sands
                window.alert("What")
                sanses.src = padrão.sprite
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

        /*function enviarmsg() {
            if (cx.value.length <= 2000) {
                var msg = {
                    "content": cx.value
                }
                fetch(webhook.link, {
                    body: JSON.stringify(msg),
                    headers: {
                      "Content-Type": "application/json",
                    },
                    method: "POST",
                  })
                    .then(function (res) {
                      console.log(res);
                    })
                    .catch(function (res) {
                      console.log(res);
                    });
            }
        }*/

        let tempo = 0;
        let looping = false;

        async function falar(txt, sans)
        {
            //Limpa o campo de fala
            dv.innerHTML = ""
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
                dv.innerHTML += `${txt[i]}`
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
                    if (txt[i] !== " ") {
                        const clone = voz.cloneNode()
                        clone.play();
                    }
                }
                
                //Não pausa nos espaços
                if(txt[i] != " "){
                await sleep(80)
                }
            }
            falando = false;
        }
        

        var x;
        async function tocarMúsica(sans)
        {
            //Coloca o limite de tempo em 2s
            tempo >= 5 ? tempo == 5 : tempo += 3

            //Só começa a tocar caso a música esteja pausada
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

        function screenSize()
        {
            if (falando) return;
            if(window.innerWidth < 577) {
            dv.innerHTML = "É recomendado que você rotacione o dispositivo"
            }
            else {
                dv.innerHTML = "Yeah"
            }
        }

        function mclick(){
            window.open("https://discord.gg/XXNQW7zdfc")
            click.play();
        }

        function menter(){
            footer.style.backgroundImage = "url('./assets/imagens/act2.png')"
            select.play()
            .catch(() => {})
        }

        function mout(){
            footer.style.backgroundImage = "url('./assets/imagens/act.png')"
        }

