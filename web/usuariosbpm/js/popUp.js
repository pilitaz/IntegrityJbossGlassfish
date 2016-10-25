$(document).ready(function () {
    
        var usr_name = sessionStorage.getItem("Userid_bpm");  
        document.getElementById("demo1").innerHTML = usr_name;
        
        var Jsonbpm=[];
        Jsonbpm = sessionStorage.getItem("Json_Usrbpm");                                           
        var Jsonbpm1  = JSON.parse(Jsonbpm);
        var Roles = Jsonbpm1.eebpm_rol;
        
        var Bpm_grp =sessionStorage.getItem("Bpm_grp");  
        var Bpm_id =sessionStorage.getItem("Bpm_id"); 
        
        
        var cbh = document.getElementById('roles'); 
        var i = 0;
        var j=1;
        for (i  in Roles ){
            
            crearDiv("divFiltr" + i, "K"+j+"-Container");
            crearImg("divFiltr" + i,Roles[i].rol__name+Roles[i].piiregrol );
            crearSpan("divFiltr" + i, Roles[i].rol__name);
            //crearLabel("label"+Roles[i].piiregrol, Roles[i].rol__name, "K"+j+"-Container");
            if (j == 3) {
                j = 1;
            } else {
                j++;
            }
        } 
        for (i  in Roles){debugger
            if(Roles[i].grp__name === Bpm_grp){
            if(Roles[i].proc__name === Bpm_id){
             $("#"+Roles[i].rol__name+Roles[i].piiregrol)
                     .removeClass(' k-sprite re_bullet1off').addClass('k-sprite po_bullet1');
        }
        }
            
        }
    
    
function  crearLabel(id, titulo, div, fuente, color, tipo) {
    var newlabel = document.createElement("Label");
    newlabel.id = id;
    newlabel.setAttribute("for", "text" + id);
    //en caso de que sea un label para editor le coloca este estilo para mostrarlo en la parte superior
    newlabel.style.textAlign = "bottom";
    
    newlabel.style.font = fuente;
    newlabel.innerHTML = titulo;
    document.getElementById(div).appendChild(newlabel);
}
        
        
        
        

  
});
function crearImg(div, id) {
    //var ope = /(Sum|Prom|Count)/i.exec(id);
    var x = document.createElement("SPAN");
    //x.setAttribute("src", "/Reporteador/images/espacio-95.png");
    x.setAttribute("class", " k-sprite re_bullet1off");
    x.setAttribute("id", id);
    x.setAttribute("estado", "off");
    x.setAttribute("onclick", "Click(\'" + id + "\')");
    document.getElementById(div).appendChild(x);
}

function crearSpan(div, titulo) {
    var x = document.createElement("SPAN");
    var t = document.createTextNode(titulo);
    x.appendChild(t);
    document.getElementById(div).appendChild(x);
}
function crearDiv(id, div, clase, align, style) {
    var newDiv = document.createElement("DIV");
    newDiv.setAttribute("align", align);
    newDiv.setAttribute("class", clase);
    newDiv.setAttribute("style", style);
    newDiv.id = id;
    document.getElementById(div).appendChild(newDiv);
}
function Click(e){debugger
    
    var estado = document.getElementById(e).getAttribute("estado");
    if(estado === "off"){
        
        $("#"+e).removeClass('k-sprite re_bullet1off').addClass('k-sprite po_bullet1');
        document.getElementById(e).setAttribute("estado", "on");
        
    }else{
        $("#"+e).removeClass(' k-sprite po_bullet1').addClass('k-sprite re_bullet1off');
        document.getElementById(e).setAttribute("estado", "off");
    }
//    $("#"+e).toggle(
//  function () {debugger
//     $(this).removeClass(' k-sprite po_bullet1').addClass('k-sprite re_bullet1off');
//  }, function () {debugger
//     $(this).removeClass('k-sprite re_bullet1off').addClass('k-sprite po_bullet1');
//  }
//);
           
    
    
}