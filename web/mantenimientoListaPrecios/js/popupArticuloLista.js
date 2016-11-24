/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function agregarProducto(){}

function btnCancelar(){
    parent.closePopUp();
}

function agregarArticulo(){
    
//    var id=0;
//    
//    var dropdownlist = $("#ipConceptoDet").data("kendoDropDownList");
//    var codConceptoDet = dropdownlist.dataSource._data[dropdownlist.selectedIndex-1].cpto__cod;
//    var conceptoDet = dropdownlist.dataSource._data[dropdownlist.selectedIndex-1].cpto__des;
//    
//    var dropdownlist = $("#idClaseArticulo").data("kendoDropDownList");    
//    var codClaseArticulo = dropdownlist.dataSource._data[dropdownlist.selectedIndex-1].cla__cod;
//    var claseArticulo = dropdownlist.dataSource._data[dropdownlist.selectedIndex-1].cla__des;
//    
//    
//    var codArticulo = objArticulo.art__cod;
//    var nombreArticulo = objArticulo.art__des;
//    var descripcion = $("#idDescripcion").val();
//    var cantidad = $("#ipCantidad").val();
//    var descuento = $("#idDescuento").val();;
//    var iva = $("#idIVA").val();;
//    var valorUnitario = $("#idValorUnitario").val();
//    var valorTotal = $("#idValorTotal").val();
//    var codAmortizacion = $("#idCodigoAmortizacion").val();
//    var diasAmortizacion = $("#ipDiasAmortizacion").val();
//    var fechaAmortizacion = $("#ipFechaAmortizacion").val();
//
//    if(parent.dataGridDetalle && parent.dataGridDetalle.length===0){
//        id=1;
//    }else{
//       for(var i = 0; i<parent.dataGridDetalle.length; i++ ) {
//           id=parent.dataGridDetalle[i].ID+1;
//       }
//    }    
//    var obj = {
//        ID: id,
//        CodConceptoDet:codConceptoDet,
//        ConceptoDet: conceptoDet,
//        CodClaseArticulo: codClaseArticulo,
//        ClaseArticulo: claseArticulo,
//        Articulo: nombreArticulo,
//        ArticuloId: codArticulo,
//        Descripcion: descripcion,
//        Cantidad: parseInt(cantidad),                    
//        Descuento: descuento,
//        IVA: iva,
//        ValorUnitario: valorUnitario,
//        ValorTotal: valorTotal,
//        CodAmortizacion: codAmortizacion,
//        DiasAmortizacion: diasAmortizacion,
//        FechaAmortizacion: fechaAmortizacion            
//    };

    parent.dataGridDetalle.push(obj);
    parent.gridDetalle();   
    parent.closePopUp();
    
}

