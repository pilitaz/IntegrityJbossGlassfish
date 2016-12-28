/**
 * Funcion para obtener la url y el json de entrada para la lista de Pedidos
 *  
 *  ejemplo
 *  var sir = new sirEjemplo();
 *  var url = sir.getUrlSir();
 *  var input = sir.getdataInputSir();
 */
function sirConsultaAsignarPedidos() {
    var mapData = "eegpd_ped_det";
    var urlSir = ipServicios + baseComercial + "SIRgpd_pdet_prov";
    var json = {
                        "dsSIRgpd_pdet_prov": {
                                "eeDatos": [{
                                        "picusrcod": "proveedor_800001541",//sessionStorage.getItem("usuario"),
                                        "picfiid": sessionStorage.getItem("picfiid"),
                                        "local_ip": sessionStorage.getItem("ipPrivada"),
                                        "remote_ip": sessionStorage.getItem("ipPublica")

                                }],
                                "eeSIRgpd_pdet_prov": [{
                                        "piitipo": 0,
                                        "pidfecha": ""
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

