Ext.define('test.view.prodcard' ,{
    extend: 'Ext.form.Panel',
    xtype: 'formpanel',
    alias : 'widget.prodcard',
    store: 'products',
    frame: false,
    //renderTo: Ext.getBody(),
    title: "Карточка товара",
 
    initComponent: function() {
        this.items = [{
            xtype: 'displayfield',
            fieldLabel: 'ID',
            value: 0,
            name: 'id',
            itemId: 'id',
            flex: 1,
        },{
            xtype: 'hiddenfield',
            value: '',
            name: 'name',
            itemId: 'name',
        },{
            xtype: 'displayfield',
            name: 'descr',
            itemId: 'descr',
            value: '',
            fieldLabel: 'Наименование',
            flex: 1
        },{
            xtype: 'numberfield',
            name : 'price',
            itemID: 'price',
            fieldLabel: 'Цена',
            value: 0,
            minValue: 0,
            flex: 1,
        },{
            xtype: 'numberfield',
            name : 'amount',
            itemID: 'amount',
            value: 0,
            fieldLabel: 'Количество',
            minValue: 0,
            flex: 1,
        }];
        this.bbar=[{
            xtype: 'button',
            name: 'save',
            text: 'Сохранить',
            listeners :{
                click: function(){
                    this.fireEvent('save', this);
                }
            }
        },{
            xtype: 'button',
            name: 'cancel',
            text: 'Отменить',
            listeners :{
                click: function(){
                    this.fireEvent('close', this);
                }
            }
        }];
        this.header = [{
            xtype: 'displayfield',
            fieldlabel: 'Карточка товара: ',
            value: this.items['name'],
            name: 'name',
            itemId: 'name',
        }];
        this.callParent(arguments);  
    }
});