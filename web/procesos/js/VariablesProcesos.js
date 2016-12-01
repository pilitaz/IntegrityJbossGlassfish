
//-------------------------------------------------------------------------
function sirusuariobpm() {
    var urlSir =  ipServicios + baseUsrBpm + "SIRbpm_proc_own_task";
    var json ={  
   "dsSIRbpm_proc":{  
      "eeDatos":[  
         {  
            "picusrcod":sessionStorage.getItem("usuario"),
            "picfiid":sessionStorage.getItem("picfiid"),
            "local_ip":sessionStorage.getItem("ipPrivada"),
            "remote_ip":sessionStorage.getItem("ipPublica")
         }
      ],
      "SIRbpm_proc":[  
         {  
            "piccia__nit":"*",
            "picproc__name":"*",
            "picusuario":"*"
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
//-----------------------------------------

//-------------------------------------------------------------------------
function usrtask() {
    var urlSir =  ipServicios + baseUsrBpm + "SIRbpm_task";
    var json = {  
   "dsSIRbpm_task":{  
      "eeDatos":[  
         {  
            "picusrcod":sessionStorage.getItem("usuario"),
            "picfiid":sessionStorage.getItem("picfiid")
         }
      ],    
        "SIRbpm_task": [
         {
        "picusr__bmp": sessionStorage.getItem("usuario")+"_"+sessionStorage.getItem("companyNIT"),
        "pictask__name": "*",
        "picproc__name": "*"
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
//-----------------------------------------
function sirtask_proces() {
    var urlSir =  ipServicios + baseUsrBpm + "SIRbpm_task_proc";
    var json = {  
   "dsSIRbpm_task_proc":{  
      "eeDatos":[  
         {  
            "picusrcod":sessionStorage.getItem("usuario"),
            "picfiid":sessionStorage.getItem("picfiid")
         }
      ],    
        "SIRbpm_task_proc": [
          {
        "picproc__name": "*"
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
//-----------------------------------------------------------------------
 function sirconsulta() {
    var urlSir = ipServicios + baseUsrBpm +"SIRbpm_userFromPortal";
    var json = {  
   "dsUserBPM":{  
      "eeDatos":[  
         {  
            "picusrcod":sessionStorage.getItem("usuario"),
            "picfiid":sessionStorage.getItem("picfiid"),
            "local_ip":sessionStorage.getItem("ipPrivada"),
            "remote_ip":sessionStorage.getItem("ipPublica")
         }
      ],
      "SirUserBPM":[  
         {  
            "picia__nit": sessionStorage.getItem("companyNIT"),
            "picproc__name":"*",
            "pictask__name":"*"
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
//---------------------------------------------------------------------------
function serviRoles() {
    var urlSir = ipServicios + baseServicio +"SirCargos2";
    var json = {  
   "SIResic_car":{  
      "eeDatos":[  
         {  
            "picusrcod":sessionStorage.getItem("usuario"),
            "picfiid":sessionStorage.getItem("picfiid"),
            "local_ip":sessionStorage.getItem("ipPrivada"),
            "remote_ip":sessionStorage.getItem("ipPublica")
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
////------------------------------------
function siractores() {
   var urlSir = ipServicios + baseActores +"SIRsic_actor";
    var json = {  
   "dssic_actor":{  
      "eeDatos":[  
         {  
            "picusrcod":sessionStorage.getItem("usuario"),
            "picfiid":sessionStorage.getItem("picfiid"),
            "local_ip":sessionStorage.getItem("ipPrivada"),
            "remote_ip":sessionStorage.getItem("ipPublica")
         }
      ],
      "SIRsic_actor":[  
         {  
            "picactor__cod":"*"
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
//--------------------------------------------------------------
function cudTareasXusr() {
    var urlSir = ipServicios + baseUsrBpm +"SICUDbpm_own_task";
    var json = {  
   "dsbpm_own_task":{  
      "eeDatos":[  
         {  
            "picusrcod":sessionStorage.getItem("usuario"),
            "picfiid":sessionStorage.getItem("picfiid"),
            "local_ip":sessionStorage.getItem("ipPrivada"),
            "remote_ip":sessionStorage.getItem("ipPublica")
         }
      ],
      "TTparam":[  
         {  
            "piccia_nit": sessionStorage.getItem("companyNIT"),
            "picproc_name":"*"
         }
      ],
      "eebpm_own_task":[  
         {  

         
         },
                  {  
            "cia__nit":"800001541",
            "proc__name":"LoanApp_V3",
            "task__name":"BookLoan123",
            "task__type":"App",
            "usr__cod":"aduarte"
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

//--------------------------------------------------------------
function sirtask() {
    var urlSir = ipServicios + baseUsrBpm +"SIRbpm_task";
    var json = {  
   "dsSIRbpm_task":{  
      "eeDatos":[  
         {  
            "picusrcod":sessionStorage.getItem("usuario"),
            "picfiid":sessionStorage.getItem("picfiid"),
            "local_ip":sessionStorage.getItem("ipPrivada"),
            "remote_ip":sessionStorage.getItem("ipPublica")
         }
      ],
      "SIRbpm_task":[  
         {  
            "pictask__name":"*",
            "picproc__name":"*",
            "piccia__nit":"800001541"
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