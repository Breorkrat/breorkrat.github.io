function sleep(ms) {  return new Promise(resolve => setTimeout(resolve, ms)) }

		var sans = new Audio('sans.mp3')
		
        //var bt = window.document.getElementById('bt')
        var cx = document.getElementById('cx')
        var dv = document.getElementById('dv')
        var box = document.getElementById('hook')
        var webhook = "https://ptb.discord.com/api/webhooks/802012648223932416/0EzcblvVPBdoxIgQ6lxaK08U1vIp17nnp75XeHuwhzpTssH4_rzh5UDgx5UiCR982G46"
 
        let txt;
 
        cx.addEventListener('keypress',  async (verif) => {
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
