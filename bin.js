function addZero (n, acum=''){
    if(n===0) return acum;

    return addZero(n-1, acum+='0');
}

function parseByte (bin, acum = ""){
    const len = bin.length;

    if(len >= 8) acum = (len != 8 ? " " : "") + bin.slice(len - 8 , len) + acum;
    else return acum = addZero(8 - len) + bin + acum;
    
    return parseByte(bin.slice(0, len - 8), acum);
}
function power(coef, exp){
    if(exp === 0) return 1;

    return coef * power(coef, exp - 1);
}
function decimalToBin (dec, acum = ""){
    if (dec==0) return acum; 

    if ((dec % 2) == 1) acum = "1" + acum;
    else acum = "0" + acum;

    return decimalToBin(parseInt(dec / 2), acum);
}
function binToDecimal (bin, acum = 0, pos = 0){
    if (!bin) return acum;
    if (bin[bin.length - 1] == 1) acum += power(2,pos);

    return binToDecimal(bin.slice(0,bin.length - 1), acum, pos+1);
}

const code = "o".charCodeAt();

console.table({bin: parseByte(decimalToBin(code)), code})
// console.log(binToDecimal('1001'))