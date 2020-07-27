Ext.define('test.view.mainmenu' ,{
    extend: 'Ext.panel.Panel',
    alias : 'widget.mainmenuview',
    title: 'Учет товаров',
    initComponent: function() {
        this.tbar=[{
            xtype: 'button',
            name: 'exit',
            text: 'Выход',
            listeners :{
                click: function(){
                    this.fireEvent('signout', this);
                }
            }
        },{
            xtype: 'button',
            name: 'products',
            text: 'Товары',
            listeners :{
                click: function(){
                    this.fireEvent('tabtap', this);
                }
            }
        }];
        this.items=[{
            xtype: 'tabpanel',
            width: '100%',
            tabBarPosition: 'top',
            items: [],
        }];
        this.callParent(arguments);     
    }
});