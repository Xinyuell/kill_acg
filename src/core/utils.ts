export function stringFormat(str:string,...regs:string[]) {
  for (var i = 0; i <= regs.length -1; i++) {
    var reg = new RegExp("\\{" + i + "\\}", "gm");
    str = str.replace(reg, regs[i]);
  }
  return str;
}


export function intToString(value: number, amount: number = 1) {
  if (value >= 10000) {
    return nFormatter(value, 3);
  } else {
    return parseFloat(value.toString()).toFixed(amount);
  }
}

export function intToStringNegative(value: number, amount: number = 1) {
  let isPositive = 1;
  if (value < 0) {
    isPositive = -1;
    value *= -1;
  }
  if (value >= 10000) {
    return (isPositive === 1 ? "+" : "-") + nFormatter(value, 3);
  } else {
    return (
      (isPositive === 1 ? "+" : "-") +
      parseFloat(value.toString()).toFixed(amount)
    );
  }
}

let si = [
    { value: 1e63, symbol: "V" },
    { value: 1e60, symbol: "Nd" },
    { value: 1e57, symbol: "Od" },
    { value: 1e54, symbol: "Sd" },
    { value: 1e51, symbol: "sd" },
    { value: 1e48, symbol: "Qd" },
    { value: 1e45, symbol: "qd" },
    { value: 1e42, symbol: "Td" },
    { value: 1e39, symbol: "Dd" },
    { value: 1e36, symbol: "Ud" },
    { value: 1e33, symbol: "Dc" },
    { value: 1e30, symbol: "N" },
    { value: 1e27, symbol: "O" },
    { value: 1e24, symbol: "Sp" },
    { value: 1e21, symbol: "Sx" },
    { value: 1e18, symbol: "Qi" },
    { value: 1e15, symbol: "Qa" },
    { value: 1e12, symbol: "T" },
    { value: 1e9, symbol: "B" },
    { value: 1e6, symbol: "M" },
    { value: 1e3, symbol: "K" },
  ],
  rx = /\.0+$|(\.[0-9]*[1-9])0+$/;

function nFormatter(num: number, digits: number) {
  for (let i = 0; i < si.length; i++) {
    if (num >= si[i].value / 1.000501) {
      // /1.000501 to handle rounding
      return (
        (num / si[i].value).toPrecision(digits).replace(rx, "$1") + si[i].symbol
      );
    }
  }
  return num.toPrecision(digits).replace(rx, "$1");
}

function round1(num: number) {
  return Math.floor(num * 10 + 0.00000001) / 10;
}
function round2(num: number) {
  return Math.floor(num * 100 + 0.00000001) / 100;
}
function round5(num: number) {
  return Math.floor(num * 100000 + 0.00000001) / 100000;
}
function round7(num: number) {
  return Math.floor(num * 10000000 + 0.00000001) / 10000000;
}

function precision2(num: number) {
  return Number(num.toPrecision(2));
}
function precision3(num: number) {
  return Number(num.toPrecision(3));
}
function precision4(num: number) {
  return Number(num.toPrecision(4));
}

function intToStringRound(value: number) {
  if (value >= 10000) {
    return nFormatter(value, 3);
  } else {
    return round2(value);
  }
}
