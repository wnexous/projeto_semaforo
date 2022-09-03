function changeColor() {
    let color1 = document.getElementById("buttonPlayer")
    color1.style.backgroundColor = "blue"
}

function sleep(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}
async function state(color1) {
    await sleep(50)
    color1.style.backgroundColor = "red"
    console.log("red")
    await sleep(50)
    color1.style.backgroundColor = "rgb(9, 255, 0)"
    console.log("blue")
    await sleep(50)
    color1.style.backgroundColor = "yellow"
    console.log("blue")
    state(color1)

};

(async () => {
    let color1 = document.getElementById("state1")
    state(color1)



})();