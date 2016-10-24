/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$(document).ready(function() {
       
    var dataSource = new kendo.data.DataSource({
        data: [
            { ciacod: 1, cianit: "800001541", ciaraz: "  **** Base de datos Desarroll"},
            { ciacod: 2, cianit: "800001542", ciaraz: "ABC"}
        ],
        schema: {            
            model: {
                id: "ciacod",
                fields: {
                    ciacod: { type: "number" },
                    ciaraz: { type: "string" },
                    cianit: { type: "string" }                    
                }
            }
        }
    });
    
    $("#grid").kendoGrid({
        dataSource: dataSource,
        height: 430,
        sortable: true,
        pageable: true,
        columns: [
            {
                field: "ciaraz",
                title: "Nombre compañia"
                
            }
        ]
    });    
});