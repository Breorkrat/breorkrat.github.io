function sleep(ms) {  return new Promise(resolve => setTimeout(resolve, ms)) }

		var sans = new Audio('sans.mp3')
		
        //var bt = window.document.getElementById('bt')
        var cx = window.document.getElementById('cx')
        var dv = window.document.getElementById('dv')
        let txt;
 
        cx.addEventListener('keypress',  async (verif) => {
            if (verif.key == "Enter") {

                dv.innerHTML = ""
                txt = cx.value.split("")
                sans.play();
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
