function sleep(ms) {  return new Promise(resolve => setTimeout(resolve, ms)) }

		var er = new Audio('./assets/audio/er.mp3')
        var song = new Audio('assets/audio/song.mp3')
        let select = new Audio('assets/audio/select.mp3')
        let click = new Audio('assets/audio/click.mp3')
        let sans = document.getElementById('sans');

        //var bt = window.document.getElementById('bt')
        var cx = document.getElementById('cx')
        var dv = document.getElementById('dv')
        
        var footer = window.document.getElementById('footer')
        footer.addEventListener('mouseover', menter)
        footer.addEventListener('mouseout', mout)
        footer.addEventListener('click', mclick)

        var webhook = "https://ptb.discord.com/api/webhooks/1087122123048353923/AYU8aCh9zEoOXt-rNntapQRsiHP9n4F3Ql-fLu_ml4wNFyiWOI9XYlyvW5rgB1oG92gL"
        let txt;
 
        cx.addEventListener('keydown',  async (verif) => {

            //Isso é um RegEx, onde ele procura por letras de A-Z em maiúsculo e minúsculo, e caracteres de "! à @" em unicode, o que inclui os números
            if (/^[A-Za-z!-@À-Üá-ü]*$/.test(verif.key) == false) return;

            if (verif.key != "Enter" && verif.location == 0) tocarMúsica()
            if (verif.key == "Enter") {

                dv.innerHTML = ""
                txt = cx.value.split("")
                er.play();

                /*if(box.checked == true){
                    enviarmsg(cx.value)
                }*/

                for(let i = 0; i < txt.length; i++){
                    dv.innerHTML += `${txt[i]}`
                        if(txt[i] !== " ") {
                        er.pause();
                        er.currentTime = 0.001;
                        er.play();
                        }
                    
                    await sleep(35)
                }
            }
        })

        function enviarmsg() {
            if (cx.value.length <= 2000) {
                var msg = {
                    "content": cx.value
                }
                fetch(webhook, {
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
        }

        let tempo = 0;
        let looping = false;
        async function tocarMúsica()
        {
            //Coloca o limite de tempo em 2s
            tempo > 2 ? tempo == 2 : tempo += 2

            //Só começa a tocar caso a música esteja pausada
            if(song.paused == true) {
                song.play()
                sans.src = "./assets/imagens/passinho.webp"
            }

            //Não passa por cima do *while* caso ele já esteja em execução,
            //apenas o incrementa
            if (looping) return;

            //Sinaliza que um looping começou, decrementa em tempo a cada 0.1 segundos
            looping = true;
            while (tempo > 0)
            {
                tempo--;
                await sleep(100)
            }
            looping = false;
            song.pause()
            sans.src = "./assets/imagens/sans.png"
        }

        function mclick(){
            window.open("https://discord.gg/XXNQW7zdfc")
            click.play();
        }

        function menter(){
            footer.style.backgroundImage = "url('./assets/imagens/act2.png')"
            select.play()
        }

        function mout(){
            footer.style.backgroundImage = "url('./assets/imagens/act.png')"
        }
