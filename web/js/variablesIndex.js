/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//////////////////////////////////////////////////////////////////////////////////////
/**
 * Funcion para obtener la url y el json de entrada para la lista de Precios
 *  
 *  ejemplo
 *  var sir = new sirEjemplo();
 *  var url = sir.getUrlSir();
 *  var input = sir.getdataInputSir();
 */
function POST_SIRlogged() {
    var mapData = "eeLogged";
    var urlSir = ipServicios + baseServicio + "POST_SIRlogged";
    var json = {
        "dsLogged": {
            "eeDatos": [
                {
                    "picusrcod": sessionStorage.getItem("usuario"),
                    "picfiid": sessionStorage.getItem("picfiid"),
                    "local_ip": sessionStorage.getItem("ipPrivada"),
                    "remote_ip": sessionStorage.getItem("ipPublica")
                }
            ],
            "eeLogged": [
                {
                    "piccianit": sessionStorage.getItem("companyNIT")
                }
            ]
        }
    };

    this.setUrlSir = function (newname) {
        if (newname) {
            urlSir = newname;
        }
    };
    this.getUrlSir = function () {
        return urlSir;
    };

    this.setjson = function (newname) {
        if (newname) {
            json = newname;
        }
    };
    this.getjson = function () {
        return json;
    };

    this.setMapData = function (newname) {
        if (newname) {
            mapData = newname;
        }
    };
    this.getMapData = function () {
        return mapData;
    };

}
;
