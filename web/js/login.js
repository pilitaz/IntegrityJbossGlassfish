
var usuario;
var password;
var permitirIngreso;

function onLoad() {
    sessionStorage.clear();
    var url =   document.URL;
    sessionStorage.setItem("url", url);
    var y =   document.URL.split("/");
    var ipPuerto=document.URL.split("/")[2];
    var puerto =   y[2].split("/");
    sessionStorage.setItem("puerto", puerto[0]);

    $("#btnLogin").kendoButton({
    });

    presionaEnter();
}

/*
 * Metodo que consume el servicio de para el Login
 * 
 */
function login() {
    usuario = $("#usuario").val();
    password = $("#password").val();
    
    try {        
        var jSonData = new Object();
        jSonData.dslogin = new Object();
        jSonData.dslogin.ttdatauser = new Array();
        jSonData.dslogin.ttdatauser[0] = new Object();
        jSonData.dslogin.ttdatauser[0].picusrcod = usuario;
        jSonData.dslogin.ttdatauser[0].picusrpass = password;
        
        $.ajax({
            type: "POST",
            data: JSON.stringify(jSonData),
            url: ipServicios + baseServicio +"Login",
            dataType : "json",
            contentType: "application/json;",
            success: function (resp) {
                
                permitirIngreso = JSON.stringify(resp.dslogin.ttestado[0].pocestado);
                imgEmp = JSON.stringify();
                
                if(permitirIngreso=='"OK"'){                
                    console.log("Usuario con permiso de ingresar \n" + permitirIngreso);                    
                    sessionStorage.setItem("usrnom",resp.dslogin.eesicusuarios[0].usrnom);
                    sessionStorage.setItem("usuario",usuario);
                    sessionStorage.setItem("usrmail",resp.dslogin.eesicusuarios[0].usrmail);
                    sessionStorage.setItem("picfiid",resp.dslogin.ttdatauser[0].picfiid);                    
                    sessionStorage.setItem("poccargo",resp.dslogin.ttdatauser[0].poccargo);
                    sessionStorage.setItem("img",resp.dslogin.eesiccia[0].cialog);
                    sessionStorage.setItem("companyNIT",resp.dslogin.eesiccia[0].cianit);
                    sessionStorage.setItem("contra",resp.dslogin.eesicusuarios[0].clavprov);                    
                    sessionStorage.setItem('sesion', sessionStorage.getItem("picfiid"));
                    sessionStorage.setItem("loginintegrity","valido");
                    sessionStorage.setItem("hibrido",resp.dslogin.eesiccia[0].ciaserv);
                    sessionStorage.setItem("portLinux",resp.dslogin.eesiccia[0].ciapuerto);
                    window.location.assign("html/index.html");
                }else{                    
                    console.log("Usuario no puede ingresar \n" + permitirIngreso);                
                }
            },
                    error: function (e) {
                        alert("Error" + JSON.stringify(e));
            }
        });
        
    } catch (e) {
        alert("Function: consumeServAjaxSIR Error: " + e.message);
    }
    
}

/*
 *  Permite que los datos del fomulario sean enviando cuando el usuario oprime la tecla "Enter"
 */
function presionaEnter() {
    document.addEventListener('keyup', function (e) {
        e = e || window.event;
        var target = e.keyCode;
        if (target == 13) {
            login();
            document.getElementById("btnLogin").click();
        }
    }, false);
}
