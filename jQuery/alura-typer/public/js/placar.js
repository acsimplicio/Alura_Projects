$("#mostrar-placar").click(mostrarPlacar);
$(".botao-remover").click(removePlacar);
$("#botao-sync").click(sincPlacar);

//Insere no placar
function insertPlacar() {
  var tabela = $(".placar").find("tbody");
  var usuario = "Ana";
  var numeroPalavras = $("#contador-palavras").text();
  var linha = novaLinha(usuario, numeroPalavras);
  tabela.append(linha);

  $(".placar").slideDown(600);
  scrollPlacar();

  linha.find(".botao-remover").click(removePlacar);
}

function scrollPlacar() {
  var posPlacar = $(".placar").offset().top;
  $(".body").animate({
    scrollTop: posPlacar + 'px'
  },1000);
}

function novaLinha(usuario, numeroPalavras) {
  var linha = $("<tr>");
  var colUsuario = $("<td>").text(usuario);
  var colNum = $("<td>").text(numeroPalavras);
  var colRemove = $("<td>");
  var tagA = $("<a>").addClass("botao-remover").attr("href", "#");
  var tagI = $("<i>").addClass("small").addClass("material-icons").text("delete");
  tagA.append(tagI);
  colRemove.append(tagA);
  linha.append(colUsuario);
  linha.append(colNum);
  linha.append(colRemove);

  return(linha);
}

//Remove pessoas do Placar
function removePlacar() {
    event.preventDefault();
    $(this).parent().parent().fadeOut(400);
    setTimeout(function() {
      $(this).parent().parent().remove();
    }, 400);
}

function mostrarPlacar() {
  $(".placar").stop().slideToggle(600);
}

function sincPlacar() {
  var placar = [];
  var linhas = $("tbody > tr");
  linhas.each(function() {
    var usuario = $(this).find("td:nth-child(1)").text();
    var palavras = $(this).find("td:nth-child(2)").text();

    var score = {
      usuario: usuario,
      pontos: palavras,
    }
    placar.push(score);
  });
  var dados = {
    placar: placar
  }
  $.post("http://localhost:3000/placar", dados, function() {
    console.log("Dados salvos");
  })
}

function attPlacar() {
  $.get("http://localhost:3000/placar", function(data) {
    $(data).each(function() {
      var linha = novaLinha(this.usuario, this.pontos);
      linha.find(".botao-remover").click(removePlacar);
      $("tbody").append(linha);
    });
  })
}
