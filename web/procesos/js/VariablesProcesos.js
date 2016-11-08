
//-------------------------------------------------------------------------
function sirusuariobpm() {
    var urlSir =  ipBpm + baseUsrBpm + "SIRbpm_user";
    var json = {  
   "dsSIRbpm_user":{  
      "eeDatos":[  
         {  
            "picusrcod":sessionStorage.getItem("usuario"),
            "picfiid":sessionStorage.getItem("picfiid")
         }
      ],    
        "SIRbpm_user": [
          {
        "piccia__nit": sessionStorage.getItem("companyNIT"),
        "picusr__bmp" : sessionStorage.getItem("usuario")
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
    var urlSir =  ipBpm + baseUsrBpm + "SIRbpm_task";
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
