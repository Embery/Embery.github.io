Ext.define('test.store.products', {
    extend: 'Ext.data.Store',
    model: 'test.model.Product',
    alias: 'store.products',
    storeId: 'products',
    autoload: true,
    data: [
        {id:'1',name:"Товар 1",descr:"Ололо",price:"100.5",amount:'5'},
        {id:'2',name:"Товарищ 2",descr:"Я водитель нло",price:"200.5",amount:'3'},
        {id:'3',name:"Товар 3",descr:"Жесть какая-то",price:"500",amount:'0'}
    ]
});