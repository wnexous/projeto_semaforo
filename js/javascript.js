function sleep(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

async function pick(p) {
    let res = await fetch("http://177.201.197.76:3069/state", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        }
    })
    res = await res.json()
    let tempId = 0;
    let totalTime = 0;
    res.forEach(tempData => {
        if (p == "p1" && tempData.player == "player1") {
            tempId = tempData.id
            totalTime += tempData.time
        }
        if (p == "p2" && tempData.player == "player2") {
            tempId = tempData.id
            totalTime += tempData.time
        }
    });
    return { "veiculos": tempId, "tempototal": totalTime, "media": totalTime / tempId }
}
async function state() {

    //requisição para alterar a cor dos semaforos
    fetch("http://177.201.197.76:3069/color")
        .then(res => res.json())
        .then(data => {
            console.log(data)

            //altera-se a cor dos semaforos 
            document.getElementById("state1").style.backgroundColor = data.p1
            document.getElementById("state2").style.backgroundColor = data.p2
            if (data.p1 == "yellow" || data.p2 == "yellow") {
                document.getElementById("easteregg1").style.color = 'yellow'
            } else {
                document.getElementById("easteregg1").style.color = 'white'

            }
            if (data.p1 == "red") {
                let statep1 = pick("p1")
                if (statep1.veiculos >= 1) {
                    //state1
                    alert("passou no sinal vermelho")
                    document.getElementById("state1").style.backgroundColor = 'black'

                }

            }
            if (data.p2 == "red") {
                let statep2 = pick("p2")
                if (statep2.veiculos >= 1) {
                    alert("passou no sinal vermelho")
                    //state1
                    document.getElementById("state2").style.backgroundColor = 'black'

                }

            }
        })


    fetch("http://177.201.197.76:3069/data")
        .then(res => res.json())
        .then(data => {
            document.getElementById("datap1").innerText = `
TEMPO: ${data.p1.time}
VEÍCULOS: ${data.p1.veiculos}`
            document.getElementById("datap2").innerText = `
TEMPO: ${data.p2.time}
VEÍCULOS: ${data.p2.veiculos}`

        })
    await sleep(500)
    state()
}




async function neurolight() {
    const titulo = "NEUROLIGHT"
    let tempTitle = ""
    for (x of titulo) {
        tempTitle += x
        document.getElementById("neurolighttitle").innerText = tempTitle + "|"
        await sleep(500)
    }
    for (i = 0; i < 6; i++) {
        document.getElementById("neurolighttitle").innerText = tempTitle
        await sleep(500)
        document.getElementById("neurolighttitle").innerText = tempTitle + "|"
        await sleep(500)
    }
    let str = titulo
    for (x of titulo) {
        str = str.substring(0, str.length - 1);
        document.getElementById("neurolighttitle").innerText = str + "|"
        await sleep(500)
    }
    await sleep(2000)
    await neurolight()

}

async function rainbow_titletext() {
    console.log("loudando coloracao de titulo")
    let xc = 255
    let yc = 0
    let zc = 0
    let hsl = 0
    //      1 0 0 - comeca assim
    //      1 1 0 - 1
    //      0 1 0 - 2
    //      0 1 1 - 3
    //      0 0 1 - 4
    //      1 0 1
    //      1 0 0

    for (hsl = 0; hsl <= 345; hsl++) {
        // 1 1 0 
        document.getElementById("rainbowline").style.backgroundColor = `hsl(${hsl}, 100%, 50%)`
        await sleep(100)
    }


    // for (yc = 0; yc <= 255; yc++) {
    //     // 1 1 0 
    //     document.getElementById("easteregg").style.color = `rgb(${zc}, ${yc}, ${xc})`
    //     await sleep(20)
    // }
    // for (xc = 0; xc >= 255; xc--) {
    //     // 0 1 0 
    //     document.getElementById("easteregg").style.color = `rgb(${zc}, ${yc}, ${xc})`
    //     await sleep(20)
    // }
    // for (zc = 0; zc <= 255; zc++) {
    //     // 0 1 1 
    //     document.getElementById("easteregg").style.color = `rgb(${zc}, ${yc}, ${xc})`
    //     await sleep(20)
    // }
    // for (yc = 0; yc >= 255; yc--) {
    //     // 0 0 1 
    //     document.getElementById("easteregg").style.color = `rgb(${zc}, ${yc}, ${xc})`
    //     await sleep(20)
    // }
    // for (xc = 0; xc <= 255; xc++) {
    //     // 1 0 1 
    //     document.getElementById("easteregg").style.color = `rgb(${zc}, ${yc}, ${xc})`
    //     await sleep(20)
    // }
    // for (zc = 0; zc >= 255; zc--) {
    //     // 1 0 0
    //     document.getElementById("easteregg").style.color = `rgb(${zc}, ${yc}, ${xc})`
    //     await sleep(20)
    // }



    rainbow_titletext()
}

(async () => {
    console.log('iniciando')
    neurolight()
    state()
    rainbow_titletext()
})();

