function scale(value, inMin, inMax, outMin, outMax) {
    return (value - inMin) / (inMax - inMin) * (outMax - outMin) + outMin;
}

function copyString(value) {
    let el = document.createElement("textarea");
    el.value = value;
    el.setAttribute("readonly", "");
    el.style = {position: "absolute", left: "-999999px"};
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
}

function genRandHex(size) {
    return [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join("");
}

export { scale , copyString, genRandHex };
