Ext.application({    
    name: 'test',
    appFolder: 'js/app',
    views: [
        'login',
        'mainmenu',
        'prodtab',
        'prodcard'
    ],
    models: ['Product'],
    controllers:['testcontroller'],
    stores:['products'],
    launch: function() {     
        Ext.create('Ext.container.Viewport',{
          items:[
            { xtype: "loginview"}
          ]
        }
    )},
});