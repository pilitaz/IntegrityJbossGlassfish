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
    
    var pedido = JSON.parse(sessionStorage.getItem("regPedidos"));
    
    document.getElementById('lbPedido').innerHTML = 'Pedido Nº '+pedido.ped__num;    
    document.getElementById('lbCliente').innerHTML = pedido.ter__raz;
    document.getElementById('lbFecha').innerHTML = pedido.ped__fec;
    
    var verbo="POST";    
    var pedido = JSON.parse(sessionStorage.getItem("regPedidos"));
    var cartera;
                
    var obj = new SIRcon_anf_cli();
    var objJson = obj.getjson();
    var url = obj.getUrlSir();
    var mapData = obj.getMapData();
        
    var key1 = Object.keys(objJson)[0];
    var key2 = Object.keys(objJson[key1])[1];                                
    
    objJson[key1][key2][0].piicor__ano = 2017;
    objJson[key1][key2][0].picter__nit = pedido.ter__nit;
  debugger  
    try{
        $.ajax({
            type: verbo,
            data: JSON.stringify(objJson),
            url: url,
            dataType : "json",
            contentType: "application/json;",
            success: function (e) {                 
                cartera = e[key1][mapData][0];
                return e[key1][mapData];
            },
            error: function (e) {
                alertDialogs(" Error al consumir el servicio "+ e.status +" - "+ e.statusText);                
            }
        }).done(function(e){            
            if ((e[key1].eeEstados[0].Estado === "OK") || (e[key1].eeEstados[0].Estado === "")) {
                document.getElementById('lbCupoCre').innerHTML = cartera.cupocre;    
                document.getElementById('lbCupoVen').innerHTML = cartera.cupoven;
                document.getElementById('lbCarteraXVencer').innerHTML = cartera.cartxve; 
                document.getElementById('lbCarteraVencida').innerHTML = cartera.cartven;    
                document.getElementById('lbChequesDev').innerHTML = cartera.cheqdev;
                document.getElementById('lbValorNetoPedido').innerHTML = 0; 
                document.getElementById('lbPedidosTramite').innerHTML = cartera.peditra;    
                document.getElementById('lbCupoCreDisp').innerHTML = 0;
                document.getElementById('lbCupoVenDisp').innerHTML = 0;                 
            }else {
                alertDialogs("Error en el servicio" + e[key1].eeEstados[0].Estado);
            }
        });
    } catch (e) {
        alertDialogs("Function: consumeServAjaxSIR Error: " + e.message);
    }
    
});


function aprobarPedido(){
    var verbo="PUT";    
    var pedido = JSON.parse(sessionStorage.getItem("regPedidos"));
                
    var obj = new SICUDgpd_ped_apro();
    var objJson = obj.getjson();
    var url = obj.getUrlSir();
        
    var key1 = Object.keys(objJson)[0];
    var key2 = Object.keys(objJson[key1])[1];                                
    
    objJson[key1][key2][0].ciu__cod = pedido.ciu__cod;
    objJson[key1][key2][0].com__con = pedido.com__con;
    objJson[key1][key2][0].dpc__par = pedido.dpc__par;
    objJson[key1][key2][0].clc__cod = pedido.clc__cod;    
    objJson[key1][key2][0].mnd__cla = pedido.mnd__cla;
    objJson[key1][key2][0].pago__cod = pedido.pago__cod;
    objJson[key1][key2][0].ped__fec = pedido.ped__fec;
    objJson[key1][key2][0].ped__fec__ent = pedido.ped__fec__ent;
    objJson[key1][key2][0].ped__num = pedido.ped__num;
    objJson[key1][key2][0].obs__ped = pedido.obs__ped;
    objJson[key1][key2][0].ped__pqs = pedido.ped__pqs;
    objJson[key1][key2][0].suc__cod = pedido.suc__cod;
    objJson[key1][key2][0].ter__dir = pedido.ter__dir;
    objJson[key1][key2][0].ter__nit = pedido.ter__nit;
    objJson[key1][key2][0].ter__tel = pedido.ter__tel;
    objJson[key1][key2][0].ven__cod = pedido.ven__cod;    
    
    try{
        $.ajax({
            type: verbo,
            data: JSON.stringify(objJson),
            url: url,
            dataType : "json",
            contentType: "application/json;",
            success: function (e) {                 
                
            },
            error: function (e) {
                alertDialogs(" Error al consumir el servicio "+ e.status +" - "+ e.statusText);                
            }
        }).done(function(e){
            if ((e[key1].eeEstados[0].Estado === "OK") || (e[key1].eeEstados[0].Estado === "")) {
                sessionStorage.removeItem("regPedidos");
                parent.closePopUpAprobacionPedido();
            }else {
                alertDialogs("Error en el servicio" + e[key1].eeEstados[0].Estado);
            }
        });
    } catch (e) {
        alertDialogs("Function: consumeServAjaxSIR Error: " + e.message);
    }  
}


function btnCancelar(){
   parent.closePopUpAprobacionPedido();
}