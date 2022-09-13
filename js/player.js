let timeClick
let nofclicks = 0   

function sleep(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

async function add_request(player, time) {
    console.log(time)
    fetch("http://177.201.197.76:3069/state", {
        method: "POST",
        body: JSON.stringify({
            "player": player,
            "time": time
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json())
        .then(data => {
            nofclicks += 1
            document.getElementById("myclicks").innerText = `MEUS VEÍCULOS: ${nofclicks}`
            document.getElementById("delay").innerText = `DELAY: ${data.time}`

        })
}
async function delete_all_post(player) {
    nofclicks = 0
    fetch("http://177.201.197.76:3069/state", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json())
        .then(data => {
            document.getElementById("clicks").innerText = `VEÍCULOS: 0`
            data.forEach(tempDel => {
                if (player == tempDel.player) {
                    fetch("http://177.201.197.76:3069/state/" + tempDel.id, {
                        method: "DELETE",
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                }

            });

        })

}
function mouseState(state) {
    if (state == "send") {
        timeClick = new Date().getTime()
        return timeClick

    }
    if (state == "pick") {
        if (new Date().getTime() - timeClick <= 100) {
            return (new Date().getTime() - timeClick) + 100

        } else {
            return (new Date().getTime() - timeClick)

        }

    }
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
    console.log(p)
    res.forEach(tempData => {
        if (p == "player1_picker" && tempData.player == "player1") {
            tempId += 1
            console.log(tempData)
        }
        if (p == "player2_picker" && tempData.player == "player2") {
            tempId += 1
        }
    });
    console.log("TOTAL:", tempId)
    document.getElementById("clicks").innerText = `TODOS OS VEÍCULOS: ${tempId}`
    document.getElementById("myclicks").innerText = `MEUS VEÍCULOS: ${nofclicks}`
    console.log(`VEÍCULOS: ${nofclicks}`)
    await (sleep(1000))
    pick(p)
}

(async () => {
    pick(document.title + "_picker")
})();