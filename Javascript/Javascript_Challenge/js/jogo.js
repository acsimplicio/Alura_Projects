const criaJogo = (sprite) => {

  let palavraSecreta = '';
  let lacunas = [];
  let etapa = 1;
  //var letrasPalavra = [];
  //var certo = 0;
  //var errado = 0;

  const criaLacunas = () => {
    for(let i = 0 ; i < palavraSecreta.length ; i++){
      lacunas.push('');
    }
  };

  const proximaEtapa = () => etapa = 2;

  const setPalavraSecreta = (palavra) => {

    if(palavra.trim() != ""){
      palavraSecreta = palavra;
      criaLacunas();
      proximaEtapa();
    }else{
      alert("Digite uma palavra!!");
    }
  };

  const getLacunas = () => lacunas;

  const getEtapa = () => etapa;

  const processaChute = (chute) => {

    if(!chute.trim()) throw Error("Digite um chute!!");

    const exp = new RegExp(chute, 'gi')
     let resultado, acertou = false;
     while (resultado = exp.exec(palavraSecreta)) {
       acertou = lacunas[resultado.index] = chute;
    }

    if (!acertou) sprite.nextFrame();

    //letrasPalavra = palavraSecreta.split("");
    //for(var i = 0 ; i < letrasPalavra.length ; i++){
      //if(chute == letrasPalavra[i]){
        //lacunas.splice(i, 1, chute);
        //certo++;
      //}else{
        //errado++;
      //}
    }

    // if(errado == letrasPalavra.length){
    //   sprite.nextFrame();
    // }

  const ganhou = () => {
  return lacunas.length
        ? !lacunas.some((lacuna) => {
            return lacuna == '';
        })
        : false
  };

  const perdeu = () => sprite.isFinished();

  const ganhouOuPerdeu = () => ganhou() || perdeu();

  const reinicia = () => {
    palavraSecreta = "";
    lacunas = [];
    etapa = 1;
    sprite.reset();
    //letrasPalavra = [];
    //errado = 0;
    //certo = 0;
  };

    return {
      setPalavraSecreta,
      getLacunas,
      getEtapa,
      processaChute,
      ganhou,
      perdeu,
      ganhouOuPerdeu,
      reinicia
  };

};
