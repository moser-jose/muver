function limita(str,limite) {
    let nova="";
    for(let i=0;i<limite;i++) {
       nova+=str.substr(i,1);
    }
    return nova;
 }


 export {limita}