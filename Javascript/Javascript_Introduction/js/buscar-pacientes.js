var botaoAdicionar = document.querySelector("#buscar-paciente");
botaoAdicionar.addEventListener("click", function(){
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "https://api-pacientes.herokuapp.com/pacientes");
  xhr.addEventListener("load", function(){
  var erro = document.querySelector("#erro");
    if( xhr.status == 200){
      var resposta = xhr.responseText;
      var pacientes = JSON.parse(resposta);

      pacientes.forEach(function(paciente){
        adicionaPacientes(paciente);
      });
      erro.classList.add("on");
    }else{
      erro.classList.remove("on");
    }
  });
  xhr.send();
});
