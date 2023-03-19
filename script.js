
function sleep(ms) {  return new Promise(resolve => setTimeout(resolve, ms)) }

		var sans = new Audio('sans.mp3')
        var song = new Audio('song.mp3')
        
		
        //var bt = window.document.getElementById('bt')
        var cx = document.getElementById('cx')
        var dv = document.getElementById('dv')
        var box = document.getElementById('hook')
        var webhook = "https://ptb.discord.com/api/webhooks/1086837764231811264/z9hsAHYPg1cuzMCTGz3d5eYjI5TH6PJ279DmO46D7pBaWFkbDXv-OdMPqGgiZcCe0LPG"
 
        let txt;
 
        cx.addEventListener('keypress',  async (verif) => {
            if (verif.key != "Enter") tocarMúsica()
            if (verif.key == "Enter") {

                dv.innerHTML = ""
                txt = cx.value.split("")
                sans.play();

                if(box.checked == true){
                    enviarmsg(cx.value)
                }

                for(let i = 0; i < txt.length; i++){
                    dv.innerHTML += `${txt[i]}`
                        if(txt[i] !== " ") {
                        sans.pause();
                        sans.currentTime = 0.001;
                        sans.play();
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
                fetch(webhook + "?wait=true",
                {
                    "method": "POST",
                    "headers": { "content-type": "application/json" },
                    "body": JSON.stringify(msg)
                })
                .then(a => a.json()).then(console.log)
            }
        }

        let tempo = 0;
        let looping = false;
        async function tocarMúsica()
        {
            //Coloca o limite de tempo em 3
            tempo > 3 ? tempo == 3 : tempo += 3

            //Só começa a tocar caso a música esteja pausada
            if(song.paused == true) song.play()

            //Não passa por cima do *while* caso ele já esteja em execução,
            //apenas o incrementa
            if (looping) return;

            //Sinaliza que um looping começou, decrementa em tempo a cada 0.2 segundos
            looping = true;
            while (tempo > 0)
            {
                tempo--;
                await sleep(200)
            }
            looping = false;
            song.pause()
        }
