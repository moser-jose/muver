const limita=(str,limite)=> {
    let nova="";
    for(let i=0;i<limite;i++) {
       nova+=str.substr(i,1);
    }
    return nova;
}
const getIdioma=idioma=> {
   let id="pt"
   if(idioma==="en-US"){
       id="en"
   }
   else if(idioma==="fr-FR"){
       id="fr"
   }
   return id
}
const getData=()=>{
    var data = new Date();
    var dia = String(data.getDate()).padStart(2, '0');
    var mes = String(data.getMonth() + 1).padStart(2, '0');
    var ano = data.getFullYear();
    var dataAtual =  ano+ '-' + mes + '-' + dia;
    return dataAtual;
}


 export {limita, getIdioma,getData }