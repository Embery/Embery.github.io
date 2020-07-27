Ext.define('test.controller.testcontroller', {
    extend : 'Ext.app.Controller',
    EMPTY_FW: {},
    fview: this.EMPTY_FW,
    init: function() {
      this.control({
        'loginview button': {
          signin: this.signinuser
        },
        'prodtab':{
            itemdblclick: this.showCard
        },
        'mainmenuview button[name=exit]': {
            signout: this.signoutuser
        },
        'mainmenuview button[name=products]': {
            tabtap: this.tabtapping
        },
        'prodtab textfield[name=namef]':{
            namefilter: this.namefiltering
        },
        'prodtab textfield[name=idf]':{
            idfilter: this.idfiltering
        },
        'prodcard button[name=cancel]':{
            close: this.closing
        },
        'prodcard button[name=save]':{
            save: this.saving
        }
      });
    },
    signinuser : function(button, username, password)
    {
        // здесь должен быть запрос на сервер, но его пока нет
        if(username!="admin"||password!="padmin"){
            alert("Неправильный логин или пароль!");
        } else {
            button.up("viewport").destroy();     
            Ext.create('Ext.container.Viewport',{
              items:[
                { xtype: "mainmenuview"}
              ]
            });
        }
    },
    signoutuser : function(button){
        button.up("viewport").destroy();     
        Ext.create('Ext.container.Viewport',{
            items:[
                { xtype: "loginview"}
            ]
        });
    },
    tabtapping: function(button){
        button.up("panel").down("tabpanel").add(Ext.create("test.view.prodtab")
        );
    },
    idfiltering: function(field,text){
        var curfilters = field.up("grid").store.getFilters();
        var lastfilter = field.up("grid").store.lastfilterID;
        if ( !!lastfilter ) {
            curfilters.remove(lastfilter);
        }
        function idMatching(item){
            return item.data.id==text;
        }
        if ( text != '' ) {
            curfilters.add(idMatching);
        }
        field.up("grid").store.lastfilterID = idMatching;
    },
    namefiltering: function(field,text){
        var curfilters = field.up("grid").store.getFilters();
        var lastfilter = field.up("grid").store.lastfilterName;
        if ( !!lastfilter ) {
            curfilters.remove(lastfilter);
        }
        function nameMatching(item){
            return item.data.name.indexOf(text)!=-1;
        }
        if ( text != '' ) {
            curfilters.add(nameMatching);
        }
        field.up("grid").store.lastfilterName = nameMatching;

    },
    showCard: function(grid, record) {
        if(!!this.fview&&this.fview!=this.EMPTY_FW){
            this.fview.destroy();
        }
        this.fview = Ext.create('widget.prodcard');
        grid.up("mainmenuview").add(this.fview);
        this.fview.loadRecord(record);
    },
    closing: function(button){
        button.up("prodcard").destroy();
        this.fview=this.EMPTY_FW;
    },
    saving: function(button){

        var objEq= function(obja,objb){
            var fl=true;
            for(var i in obja)
            {
                if(obja[i]!=objb[i]){
                    fl=false;
                }
            }
            return fl;
        };

        var curstore = button.up("mainmenuview").down("grid").store;
        var prodInd = curstore.find('id',this.fview.getForm().getFieldValues()['id']);
        var storeObj = curstore.getAt(prodInd).getData();
        var formObj = this.fview.getForm().getValues();
        formObj.id = this.fview.getForm().getFieldValues()['id']-0;
        formObj.descr = this.fview.getForm().getFieldValues()['descr'];
        formObj.price -= 0;
        formObj.amount -= 0;
        var updProd = Ext.create('test.model.Product',formObj);
        var fl = objEq(formObj, storeObj);
        if(!fl){
            console.log(Ext.data.validation);
            if(updProd.isValid()){
                Ext.Msg.alert('Оповещение', 'Сохраняем изменения');
                curstore.insert(prodInd,updProd);
            } else {
                var errors =updProd.validate();
                errors.each(function(error){
                    Ext.Msg.alert("Ошибка!","Цена и количество должна быть неотрицательными. Откат изменений");
                });
            }
        }
        button.up("prodcard").destroy();
        this.fview=this.EMPTY_FW;
    }
    });