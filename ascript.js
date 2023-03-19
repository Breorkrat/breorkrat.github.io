function sleep(ms) {  return new Promise(resolve => setTimeout(resolve, ms)) }

		var sans = new Audio('sans.mp3')
        var song = new Audio('song.mp3')
        let tempo = 0;
		
        //var bt = window.document.getElementById('bt')
        var cx = document.getElementById('cx')
        var dv = document.getElementById('dv')
        var box = document.getElementById('hook')
        var webhook = ""
 
        let txt;  
 
        cx.addEventListener('keypress',  async (verif) => {
            //tocarMúsica()
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

        async function tocarMúsica()
        {
            //Se a música estiver tocando, ignore
            if (song.paused == false)
            {
                tocarMúsica()
                return;
            }
            song.currentTime = tempo
            song.play()
            await sleep(200)
            tempo += 0.2
            song.pause()
        }
