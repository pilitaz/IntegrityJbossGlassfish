/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function () {        
    $("#btBuscar").kendoButton({
        click: buscarPedidos
    });
});
function buscarPedidos() {
    
    if($("#ipRUC").val()!==""){        
        parent.grid($("#ipRUC").val(),"");
        parent.closePopUpFiltros();
    }else if($("#ipRazonSocial").val()!==""){
        parent.grid("", $("#ipRazonSocial").val());
        parent.closePopUpFiltros();
    }else{
        alertDialogs("Debe ingresar algún criterio de búsqueda");
        return
    }
}