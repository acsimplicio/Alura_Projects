const criaController = (jogo) => {

  const $entrada = $(".entrada");
  const $lacunas = $(".lacunas");

  // consulta jogo.getLacunas() e exibe para o usuário cada lacuna

    const exibeLacunas = () => {
       $lacunas.empty();
       const quantidadeLacunas = jogo.getLacunas();
       $.each(quantidadeLacunas, function (letra) {
          const lacuna = $("<li>").addClass("lacuna").text(quantidadeLacunas[letra]);
          $lacunas.append(lacuna);
       });
   };

   // muda o texto do placeHolder do campo de entrada
   const mudaPlaceHolder = (texto) => {
     $entrada.val("");
     $entrada.attr("placeholder", texto);
   };

   // passa para jogo.setPalavraSecreta() o valor digitado pelo jogador e chama o a função `exibeLacunas()` e `mudaPlaceHolder()` definidas no controller.

   const guardaPalavraSecreta = () => {

       jogo.setPalavraSecreta($entrada.val().trim());
       mudaPlaceHolder("Chutes");
   };

   const reinicia = () => {
     jogo.reinicia();
     $lacunas.empty();
     mudaPlaceHolder("Palavra secreta");
   }

   const leChute = () => {
     jogo.processaChute($entrada.val().trim().substr(0, 1));
     exibeLacunas();
     $entrada.val('');

     setTimeout( function () {
       if(jogo.ganhouOuPerdeu()){
         if(jogo.ganhou()){
           alert("Ganhou");
         }else if(jogo.perdeu()){
             alert("Perdeu");
         }
         reinicia();
       }
     }, 200);

   };

   // faz a associação do evento keypress para capturar a entrada do usuário toda vez que ele teclar ENTER
   const inicia = () => {

   $entrada.keypress( function (event) {
       if (event.which == 13) {
           switch (jogo.getEtapa()) {
               case 1:
                    guardaPalavraSecreta();
                    exibeLacunas();
                   break;
               case 2:
                    leChute();
                   break;
           }
     }
   });
}
// retorna um objeto com a propriedade inicia, que deve ser chamada assim que o controller for criado.
return { inicia };
};
