
function crearPedido(){
  
    var widthPopUp = $("body").width();
    widthPopUp = widthPopUp * (80/100);
    var heightPopUp = $("body").height();
    heightPopUp = heightPopUp * (50/100);
    
    $("body").append("<div id='windowPedidoCabecera'></div>");
    var myWindow = $("#windowPedidoCabecera");
    var undo = $("#undo");
    
    function onCloseWindowItemFac() {
        document.getElementById("windowPedidoCabecera").remove();            
        undo.fadeIn();  
    }
    
    myWindow.kendoWindow({
        width: widthPopUp,
        height: heightPopUp,
        title: "Crear",
        content: sessionStorage.getItem("url")+ "/pedidos/html/pedidoCabecera.html",
        visible: false,
        modal: true,
        actions: [            
            "Close"
        ],
        close: onCloseWindowItemFac
    }).data("kendoWindow").center().open();    
}




