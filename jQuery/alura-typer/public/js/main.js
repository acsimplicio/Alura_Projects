//Chama todas as funções presentes no código assim que a página é carregada
$(function() {
  attContadorFrase();
  initContadores();
  initCronometro();
  initComparadores();
  attPlacar();
  $("#reiniciar").click(reinitJogo);
});

var campo = $(".campo-digitacao");

//Conta quantas plavras existem na frase a ser digitada
function attContadorFrase() {
  var frase = $(".frase").text();
  var numPalavras = frase.split(" ").length;
  var tamanhoFrase = $("#tamanho-frase");
  tamanhoFrase.text(numPalavras);
}

function attTempoInit(tempo) {
  tempoInicial = tempo;
  $("#contador").text(tempo);
}

//Conta quantas palavras e caracteres foram digitados pelo user
function initContadores() {
  campo.on("input", function(){
    var conteudo = campo.val();
    var contadorCaracteres = $("#contador-caracteres")
    contadorCaracteres.text(conteudo.length);

    var qntPalavras = conteudo.split(/\S+/).length - 1;
    var contadorPalavras = $("#contador-palavras");
    contadorPalavras.text(qntPalavras);
  });
}

//Contador regressar, game over
function initCronometro(){
  campo.one("focus", function(){
    var tempo = $("#contador").text();
    var cronometro = setInterval(function(){
      tempo--;
      $("#contador").text(tempo);
      if(tempo < 1){
        campo.attr("disabled", true);
        clearInterval(cronometro);
        finalizaJogo();
      }
    },1000);
  });
}

//Finaliza o jogo
function finalizaJogo() {
  $("#reiniciar").attr("disabled", false);
  campo.toggleClass("tempo-acabado");
  insertPlacar();
}

//Compara a frase pronta com a digitda
function initComparadores(){
  campo.on("input", function(){
    var frase = $(".frase").text();
    var conteudoDigitado = campo.val();
    var comparavel = frase.substr(0,conteudoDigitado.length);
    if (conteudoDigitado == comparavel){
      campo.addClass("correto");
      campo.removeClass("errado");
    }else{
      campo.addClass("errado");
      campo.removeClass("correto");
    }
  });
}

var tempoInicial = $("#contador").text();

//Reinicia o jogo
function reinitJogo() {
  console.log(tempoInicial);
  campo.attr("disabled", false);
  campo.val("");
  $("#contador-palavras").text("0");
  $("#contador-caracteres").text("0");
  $("#contador").text(tempoInicial);
  initCronometro();
  $("#reiniciar").attr("disabled", true);
  campo.toggleClass("tempo-acabado");
  campo.removeClass("correto");
  campo.removeClass("errado");
}
