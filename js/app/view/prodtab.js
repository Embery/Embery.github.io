Ext.define('test.view.prodtab' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.prodtab',
    title: 'Товары',
    store: 'products',
    initComponent: function() {
        this.columns=[
            {header: 'id',  dataIndex: 'id',  flex: 1},
            {header: 'Название',  dataIndex: 'name',  flex: 1},
            {header: 'Описание',  dataIndex: 'descr',  flex: 1},
            {header: 'Цена', dataIndex: 'price', flex: 1},
            {header: 'Количество', dataIndex: 'amount', flex: 1, 
                renderer: function(value,meta){
                {
                    if(!value){
                        meta.style='background:red'
                    }
                    ;return value
                };
            }}
        ],
        this.bbar=Ext.create('Ext.PagingToolbar', {
            store: "products",
        },
        this.tbar=[{
            xtype:"textfield",
            fieldLabel: 'ID',
            maskRe:/[1-9]/i,
            name: 'idf',
            width: '100%',
            flex: 1,
            enableKeyEvents: true,
            listeners: {
                keypress : function(textfield,eo){
                    if (eo.getCharCode() == Ext.EventObject.ENTER) {
                        this.fireEvent('idfilter', this, textfield.getValue());
                    }
                }
            }
        },{
            xtype:"textfield",
            fieldLabel: 'Название',
            name: 'namef',
            width: '100%',
            flex: 1,
            enableKeyEvents: true,
            listeners: {
                keypress : function(textfield,eo){
                    if (eo.getCharCode() == Ext.EventObject.ENTER) {
                        this.fireEvent('namefilter', this, textfield.getValue());
                    }
                }
            }
        }])
        this.callParent(arguments);     
    }
});