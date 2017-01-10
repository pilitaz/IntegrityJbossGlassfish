/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$(document).ready(function() {
    $("#btAprobar").kendoButton({
    });
    
    $("#btCancelar").kendoButton({
    });
});


function aprobarPedido(){
   parent.closePopUpAprobacionPedido();
}


function btnCancelar(){
   parent.closePopUpAprobacionPedido();
}