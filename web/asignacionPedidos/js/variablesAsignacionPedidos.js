/**
 * Funcion para obtener la url y el json de entrada para la lista de Pedidos
 *  
 *  ejemplo
 *  var sir = new sirEjemplo();
 *  var url = sir.getUrlSir();
 *  var input = sir.getdataInputSir();
 */
function sirConsultaAsignarPedidos() {
    var mapData = "eegpd_ped";
    var urlSir = ipServicios + baseComercial + "SIRped_det_prov";
    var json = {
        "dsSIRped_det_prov": {
            "eeDatos":[
                {
                    "picusrcod": sessionStorage.getItem("usuario"),
                    "picfiid": sessionStorage.getItem("picfiid"),
                    "local_ip":sessionStorage.getItem("ipPrivada"),
                    "remote_ip":sessionStorage.getItem("ipPublica")
                }
            ],
            "eeSIRped_det_prov": [{
                    "piccia_nit": sessionStorage.getItem("companyNIT"),
                    "piitipo": 0
                    
                }]
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

};

