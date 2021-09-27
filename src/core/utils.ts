export function intToString (value:number, amount:number = 1) {
    if (value>=10000) {
        return nFormatter(value, 3);
    } else {
        return parseFloat(value.toString()).toFixed(amount);
    }
}

export function intToStringNegative(value:number, amount:number = 1) {
    let isPositive = 1;
    if(value < 0) {
        isPositive = -1;
        value *= -1;
    }
    if (value>=10000) {
        return (isPositive===1 ? "+" : "-") + nFormatter(value, 3);
    } else {
        return (isPositive===1 ? "+" : "-") + parseFloat(value.toString()).toFixed(amount);
    }
}

let si = [
    { value: 1E63, symbol: "V" },
    { value: 1E60, symbol: "Nd" },
    { value: 1E57, symbol: "Od" },
    { value: 1E54, symbol: "Sd" },
    { value: 1E51, symbol: "sd" },
    { value: 1E48, symbol: "Qd" },
    { value: 1E45, symbol: "qd" },
    { value: 1E42, symbol: "Td" },
    { value: 1E39, symbol: "Dd" },
    { value: 1E36, symbol: "Ud" },
    { value: 1E33, symbol: "Dc" },
    { value: 1E30, symbol: "N" },
    { value: 1E27, symbol: "O" },
    { value: 1E24, symbol: "Sp" },
    { value: 1E21, symbol: "Sx" },
    { value: 1E18, symbol: "Qi" },
    { value: 1E15, symbol: "Qa" },
    { value: 1E12, symbol: "T" },
    { value: 1E9,  symbol: "B" },
    { value: 1E6,  symbol: "M" },
    { value: 1E3,  symbol: "K" }
], rx = /\.0+$|(\.[0-9]*[1-9])0+$/;

function nFormatter(num:number, digits:number) {
    for (let i = 0; i < si.length; i++) {
        if ((num) >= si[i].value / 1.000501) { // /1.000501 to handle rounding
            return (num / si[i].value).toPrecision(digits).replace(rx, "$1") + si[i].symbol;
        }
    }
    return num.toPrecision(digits).replace(rx, "$1");
}

function round1(num:number) {
    return Math.floor(num*10 + .00000001)/10
}
function round2(num:number) {
    return Math.floor(num*100 + .00000001)/100
}
function round5(num:number) {
    return Math.floor(num*100000 + .00000001)/100000
}
function round7(num:number) {
    return Math.floor(num*10000000 + .00000001)/10000000
}

function precision2(num:number) {
    return Number(num.toPrecision(2));
}
function precision3(num:number) {
    return Number(num.toPrecision(3));
}
function precision4(num:number) {
    return Number(num.toPrecision(4));
}






function intToStringRound(value:number) {
    if (value>=10000) {
        return nFormatter(value, 3);
    } else {
        return round2(value);
    }
}


