//////////////////////////////////////////////////////////////////////////////////////
/**
 * Funcion para obtener la url y el json de entrada
 *  
 *  ejemplo
 *  var sir = new sirEjemplo();
 *  var url = sir.getUrlSir();
 *  var input = sir.getdataInputSir();
 */
function sirpedidos() {
   var urlSir = ipServicios + baseComercial +"SIRgpd_est";
    var json = {  
   "dsSIRgpd_est":{  
      "eeDatos":[  
         {  
            "picusrcod":"reita_800001541",
            "picfiid":"46563924305606215",
            "local_ip":"172.21.24.105",
            "remote_ip":"190.144.16.114"
         }
      ],
      "SIRgpd_est":[  
         {  
          "picgpd__des":"*",
          "piigpd__est":0
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
    
};
//------------------------------------------------------------
function CreaEstadoPedido() {
   var urlSir = ipServicios + baseComercial +"SICUDgpd_est";
    var json = {  
   "dsSICUDgpd_est":{  
      "eeDatos":[  
         {  
            "picusrcod":"reita_800001541",
            "picfiid":"46563924305606215",
            "local_ip":"172.21.24.105",
            "remote_ip":"190.144.16.114"
         }
      ],
      "eegpd_est":[  
         {  
          "gpd__des":"",
          "gpd__est":0
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
    
};

///////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////
function sirCliente() {
   var urlSir = ipServicios + baseComercial +"SIRgpd_cli_est";
    var json = {  
   "dsSIRgpd_cli_est":{  
      "eeDatos":[  
         {  
            "picusrcod":"reita_800001541",
            "picfiid":"46563924305606215",
            "local_ip":"172.21.24.105",
            "remote_ip":"190.144.16.114"
         }
      ],
      "SIRgpd_cli_est":[  
         {  
          "picgpd__cli__des":"*",
          "piigpd__cli__est":0
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
    
};

////////////////////////////////////////////////////////////////////////////////
function cudCliente() {
   var urlSir = ipServicios + baseComercial +"SICUDgpd_cli_est";
    var json = {  
   "dsSICUDgpd_cli_est":{  
      "eeDatos":[  
         {  
            "picusrcod":"reita_800001541",
            "picfiid":"46563924305606215",
            "local_ip":"172.21.24.105",
            "remote_ip":"190.144.16.114"
         }
      ],
      "eegpd_cli_est":[  
         {  
          "gpd__cli__est":0,
          "gpd__cli__des":""
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
    
};
////////////////////////////////////////////////////////////////////////////////
function sirPresupuesto() {
   var urlSir = ipServicios + baseComercial +"SIRgpd_pre_est";
    var json = {  
   "dsSIRgpd_pre_est":{  
      "eeDatos":[  
         {  
            "picusrcod":"reita_800001541",
            "picfiid":"46563924305606215",
            "local_ip":"172.21.24.105",
            "remote_ip":"190.144.16.114"
         }
      ],
      "SIRgpd_pre_est":[  
         {  
          "picgpd__pre__des":"*",
          "piigpd__pre__est":0
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
    
};
//////////////////////////////////////////////////////////////
function cudPresupuesto() {
   var urlSir = ipServicios + baseComercial +"SICUDgpd_pre_est";
    var json = {  
   "dsSICUDgpd_pre_est":{  
      "eeDatos":[  
         {  
            "picusrcod":"reita_800001541",
            "picfiid":"46563924305606215",
            "local_ip":"172.21.24.105",
            "remote_ip":"190.144.16.114"
         }
      ],
      "eegpd_pre_est":[  
         {  
          "gpd__pre__est":0,
          "gpd__pre__des":""
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
    
};
///////////////////////////////////////////////////////////////
function sirTerritorios() {
   var urlSir = ipServicios + baseComercial +"SIRgpd_sre";
    var json = {  
   "dsSIRgpd_sre":{  
      "eeDatos":[  
         {  
            "picusrcod":"reita_800001541",
            "picfiid":"46563924305606215",
            "local_ip":"172.21.24.105",
            "remote_ip":"190.144.16.114"
         }
      ],
      "SIRgpd_sre":[  
         {  
          "piirgeo__cod":0,
          "piisre__cod":0,
          "picter__nit":"*"
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
    
};
///////////////////////////////////////////////////////////////
function cudTerritorios() {
   var urlSir = ipServicios + baseComercial +"SICUDgpd_sre";
    var json = {  
   "dsSICUDgpd_sre":{  
      "eeDatos":[  
         {  
            "picusrcod":"reita_800001541",
            "picfiid":"46563924305606215",
            "local_ip":"172.21.24.105",
            "remote_ip":"190.144.16.114"
         }
      ],
      "eegpd_sre":[  
         {  
          "sre__cod":0,
          "ter__nit":"",
          "rgeo__cod":0,
          "sre__est":0
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
    
};
///////////////////////////////////////////////////////////////
function sirSupArea() {
   var urlSir = ipServicios + baseComercial +"SIRgpd_sar";
    var json = {  
   "dsSIRgpd_sar":{  
      "eeDatos":[  
         {  
            "picusrcod":"reita_800001541",
            "picfiid":"46563924305606215",
            "local_ip":"172.21.24.105",
            "remote_ip":"190.144.16.114"
         }
      ],
      "SIRgpd_sar":[  
         {  
          "piisar__cod":0,
          "picter__nit":"*",
          "piiageo__cod":0,
          "picpai__cod":"*"
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
    
};
///////////////////////////////////////////////////////////////
function cudSupArea() {
   var urlSir = ipServicios + baseComercial +"SICUDgpd_sar";
    var json = {  
   "dsSICUDgpd_sar":{  
      "eeDatos":[  
         {  
            "picusrcod":"reita_800001541",
            "picfiid":"46563924305606215",
            "local_ip":"172.21.24.105",
            "remote_ip":"190.144.16.114"
         }
      ],
      "eegpd_sar":[  
         {  
          "sar__cod":0,
          "ter__nit":"",
          "ageo__cod":0,
          "pai__cod":"",
          "sar__est":0,
          "ter__raz":""
         }
      ]      
   }
}
;
    
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
    
};
///////////////////////////////////////////////////////////////
function sirTerritorio() {
   var urlSir = ipServicios + baseComercial +"SIRgpd_trr";
    var json = {  
   "dsSIRgpd_trr":{  
      "eeDatos":[  
         {  
            "picusrcod":"reita_800001541",
            "picfiid":"46563924305606215",
            "local_ip":"172.21.24.105",
            "remote_ip":"190.144.16.114"
         }
      ],
      "SIRgpd_trr":[  
         {  
          "piitrr__cod":0,
          "piirgeo__cod":0,
          "pictrr__nom":"*"
         }
      ]      
   }
}
;
    
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
    
};
///////////////////////////////////////////////////////////////
function cudTerritorio() {
   var urlSir = ipServicios + baseComercial +"SICUDgpd_trr";
    var json = {  
   "dsSICUDgpd_trr":{  
      "eeDatos":[  
         {  
            "picusrcod":"reita_800001541",
            "picfiid":"46563924305606215",
            "local_ip":"172.21.24.105",
            "remote_ip":"190.144.16.114"
         }
      ],
      "eegpd_trr":[  
         {  
          "trr__cod":0,
          "trr__nom":"",
          "rgeo__cod":0,
          "rgeo__nom":"",
          "trr__est":0
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
    
};
///////////////////////////////////////////////////////////////
function sirSupTerritorio() {
   var urlSir = ipServicios + baseComercial +"SIRgpd_str";
    var json = {  
   "dsSIRgpd_str":{  
      "eeDatos":[  
         {  
            "picusrcod":"reita_800001541",
            "picfiid":"46563924305606215",
            "local_ip":"172.21.24.105",
            "remote_ip":"190.144.16.114"
         }
      ],
      "SIRgpd_str":[  
         {  
          "piistr__cod":0,
          "picter__nit":"*",
          "piitrr__cod":0
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
    
};
///////////////////////////////////////////////////////////////
function cudSupTerritorio() {
   var urlSir = ipServicios + baseComercial +"SIRgpd_str";
    var json = {  
   "dsSIRgpd_str":{  
      "eeDatos":[  
         {  
            "picusrcod":"reita_800001541",
            "picfiid":"46563924305606215",
            "local_ip":"172.21.24.105",
            "remote_ip":"190.144.16.114"
         }
      ],
      "SIRgpd_str":[  
         {  
          "piistr__cod":0,
          "picter__nit":"*",
          "piitrr__cod":0
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
    
};
///////////////////////////////////////////////////////////////
function sirAnulaPedido() {
   var urlSir = ipServicios + baseComercial +"SIRgpd_anu";
    var json = {  
   "dsSIRgpd_anu":{  
      "eeDatos":[  
         {  
            "picusrcod":"reita_800001541",
            "picfiid":"46563924305606215",
            "local_ip":"172.21.24.105",
            "remote_ip":"190.144.16.114"
         }
      ],
      "SIRgpd_anu":[  
         {  
          "piianu__cod":0,
          "picanu__des":"*"
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
    
};
///////////////////////////////////////////////////////////////
function cudAnulaPedido() {
   var urlSir = ipServicios + baseComercial +"SICUDgpd_anu";
    var json = {  
   "dsSICUDgpd_anu":{  
      "eeDatos":[  
         {  
            "picusrcod":"reita_800001541",
            "picfiid":"46563924305606215",
            "local_ip":"172.21.24.105",
            "remote_ip":"190.144.16.114"
         }
      ],
      "eegpd_anu":[  
         {  
          "anu__cod":0,
          "anu__des":"",
          "gpd__est":0
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
    
};
///////////////////////////////////////////////////////////////
function sirCobradores() {
   var urlSir = ipServicios + baseComercial +"SIRgpd_cbr";
    var json = {  
   "dsSIRgpd_cbr":{  
      "eeDatos":[  
         {  
            "picusrcod":"reita_800001541",
            "picfiid":"46563924305606215",
            "local_ip":"172.21.24.105",
            "remote_ip":"190.144.16.114"
         }
      ],
      "SIRgpd_cbr":[  
         {  
          "piicbr__cod":0,
          "picter__nit":"*"
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
    
};
///////////////////////////////////////////////////////////////
function cudCobradores() {
   var urlSir = ipServicios + baseComercial +"SICUDgpd_cbr";
    var json = {  
   "dsSICUDgpd_cbr":{  
      "eeDatos":[  
         {  
            "picusrcod":"reita_800001541",
            "picfiid":"46563924305606215",
            "local_ip":"172.21.24.105",
            "remote_ip":"190.144.16.114"
         }
      ],
      "eegpd_cbr":[  
         {  
          "cbr__cod":0,
          "ter__nit":"",
          "cbr__est":0
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
    
};
///////////////////////////////////////////////////////////////
function sirPrioridades() {
   var urlSir = ipServicios + baseComercial +"SIRgpd_pri";
    var json = {  
   "dsSIRgpd_pri":{  
      "eeDatos":[  
         {  
            "picusrcod":"reita_800001541",
            "picfiid":"46563924305606215",
            "local_ip":"172.21.24.105",
            "remote_ip":"190.144.16.114"
         }
      ],
      "SIRgpd_pri":[  
         {  
          "piipri__cod":0,
          "picpri__des":"*"
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
    
};
///////////////////////////////////////////////////////////////
function cudPrioridades() {
   var urlSir = ipServicios + baseComercial +"SICUDgpd_pri";
    var json = {  
   "dsSICUDgpd_pri":{  
      "eeDatos":[  
         {  
            "picusrcod":"reita_800001541",
            "picfiid":"46563924305606215",
            "local_ip":"172.21.24.105",
            "remote_ip":"190.144.16.114"
         }
      ],
      "eegpd_pri":[  
         {  
          "pri__cod":0,
          "pri__des":""
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
    
};

///////////////////////////////////////////////////////////////
function sirRegionGeografica() {
   var urlSir = ipServicios + baseComercial +"SIRgpr_rgeo";
   var json =
            { 
                "dsSIRgpr_rgeo":{ 
                    "eeDatos":[ 
                { 
            "picusrcod":"reita_800001541",
            "picfiid":"46563924305606215",
            "local_ip":"172.21.24.105",
            "remote_ip":"190.144.16.114"
                    
                }
            ], 
            "eeSIRgpr_rgeo": [
                {
                    "piirgeo__cod": 0,
                    "picusuario": "*"
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
    
};
///////////////////////////////////////////////////////////////
function cudRegionGeografica() {
   var urlSir = ipServicios + baseComercial +"SIRgpr_rgeo";
   var json =
            { 
                "dsSIRgpr_rgeo":{ 
                    "eeDatos":[ 
                { 
            "picusrcod":"reita_800001541",
            "picfiid":"46563924305606215",
            "local_ip":"172.21.24.105",
            "remote_ip":"190.144.16.114"
                    
                }
            ], 
            "eeSIRgpr_rgeo": [
                {
                    "piirgeo__cod": 0,
                    "picusuario": "*"
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
    
};
///////////////////////////////////////////////////////////////
function sirBarrios() {
   var urlSir = ipServicios + baseComercial +"SIRgpd_bar";
   var json ={  
   "dsSIRgpd_bar":{  
      "eeDatos":[  
         {  
            "picusrcod":"reita_800001541",
            "picfiid":"46563924305606215",
            "local_ip":"172.21.24.105",
            "remote_ip":"190.144.16.114"
         }
      ],
      "SIRgpd_bar":[  
         {  
          "picciu__cod":"*",
          "piibar__cod":0,
          "picbar__dsc":"*"
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
    
};