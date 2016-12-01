/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/**
 * Funcion para ajustar el alto de la grilla 
 */
$(window).resize(function () {
    var viewportHeight = $(window).height();
    $('#outerWrapper').height(viewportHeight - 30);
    $('.k-grid-content').height(viewportHeight - 100);
});

$(document).ready(function () {
    var inputs = [{
            id: "inputDescripcion",
            tipo: "string",
            read: "",
            nameServ: "tcont__des"
        }, {
            id: "inputManejaDiferidos",
            tipo: "logical",
            read: "",
            nameServ: "tcon_dif"
        }, {
            id: "inputConcepto",
            tipo: "string",
            read: "",
            nameServ: ""
        }, {
            id: "inputMonedaExtranjera",
            tipo: "logical",
            read: "",
            nameServ: "mnd__ext"
        }, {
            id: "inputTipoRegimen",
            tipo: "string",
            read: "",
            nameServ: "ter__reg"
        }, {
            id: "inputManejaPedido",
            tipo: "logical",
            read: "",
            nameServ: ""
        }, {
            id: "inputClaseDocumento",
            tipo: "string",
            read: "",
            nameServ: "clc__cod"
        }, {
            id: "inputFacturacion",
            tipo: "logical",
            read: "",
            nameServ: "tcont__fac"
        }];
    formatoInputs(inputs, sessionStorage.getItem("contaRow"));
});

function formatoInputs(inputs, serv) {
    for (var i = 0; i <= inputs.length; i++) {
        if (serv) {
            var contaU = JSON.parse(serv);
            var stringCmp = contaU[inputs[i].nameServ];
            if (inputs[i].tipo === "logical") {
                if (contaU[inputs[i].nameServ] === true) {
                    stringCmp = "si";
                } else {
                    stringCmp = "no";
                }
                
            }
            $("#" + inputs[i].id).val(stringCmp);
        }
        modTextboxPopupFl(inputs[i].id, inputs[i].tipo, inputs[i].read);

    }
}
