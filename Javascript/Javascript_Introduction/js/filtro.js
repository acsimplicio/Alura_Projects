var campoPesquisa = document.querySelector(".pesquisa-pacientes");

campoPesquisa.addEventListener("input", function(){
  var pacientes =  document.querySelectorAll(".paciente");
  if(this.value.length > 0){
    for( var i = 0; i < pacientes.length ; i++){
      var paciente = pacientes[i];
      var tdNome = paciente.querySelector(".info-nome");
      var nome = tdNome.textContent;
      var expressao = new RegExp(this.value, "i");
      if(expressao.test(nome)){
        paciente.classList.remove("on");
      }else{
        paciente.classList.add("on");
      }
    }
  }else{
    for( var i = 0; i < pacientes.length ;  i++){
      var paciente = pacientes[i];
      paciente.classList.remove("on");
    }
  }
});
