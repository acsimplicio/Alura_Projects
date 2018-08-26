var botaoAdicionar = document.querySelector("#adicionar-paciente");

botaoAdicionar.addEventListener("click", function(event) {
    event.preventDefault();

    var form = document.querySelector("#form-adiciona");

    var paciente = extrairDadosFormulario(form);

    var erros = validaPaciente(paciente);

    if(erros.length > 0){
      exibeMensagensErro(erros);
      return;
    }

    adicionaPacientes(paciente);

    var ul = document.querySelector(".mensagens-erro");
    form.reset();

    ul.innerHTML = "";
});

function adicionaPacientes(paciente) {
    var pacienteTr = criarTr(paciente);
    var tabela = document.querySelector("#tabela-pacientes");
    tabela.appendChild(pacienteTr);
}

function extrairDadosFormulario(form) {

  var  paciente = {
      nome: form.nome.value,
      altura: form.altura.value,
      peso: form.peso.value,
      gordura: form.gordura.value,
      imc: calcularIMC(form.peso.value, form.altura.value)
  }
    return paciente;
}

function criarTd(dado, classe){
    var td = document.createElement("td");
    td.textContent = dado;
    td.classList.add(classe);

    return td;
}

function criarTr(paciente){
  var pacienteTr = document.createElement("tr");
  pacienteTr.classList.add("paciente");

  pacienteTr.appendChild(criarTd(paciente.nome, "info-nome"));
  pacienteTr.appendChild(criarTd(paciente.peso, "info-peso"));
  pacienteTr.appendChild(criarTd(paciente.altura, "info-altura"));
  pacienteTr.appendChild(criarTd(paciente.gordura, "info-gordura"));
  pacienteTr.appendChild(criarTd(paciente.imc, "info-imc"));

  return pacienteTr;
}

function validaPaciente(paciente){
  var erros = [];

  if(paciente.nome.length == 0){
    erros.push("O nome não pode possuir valor nulo!");
  }

  if(paciente.peso.length == 0){
    erros.push("O peso não pode possuir valor nulo!");
  }

  if(paciente.altura.length == 0){
    erros.push("A altura não pode possuir valor nulo!");
  }

  if(paciente.gordura.length == 0){
    erros.push("A gordura não pode possuir valor nulo!");
  }

  if(!validaPeso(paciente.peso)){
    erros.push("Peso inválido!")
  }

  if(!validaAltura(paciente.altura)){
    erros.push("Altura inválida!")
  }

  return erros;
}

function exibeMensagensErro(erros){

   var ul = document.querySelector(".mensagens-erro");
   ul.innerHTML = "";

   erros.forEach(function(erro) {
     var li = document.createElement("li");
     li.textContent = erro;
     ul.appendChild(li);
   });

}
