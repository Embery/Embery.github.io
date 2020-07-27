Ext.create("data.validator.base",{
    type: 'price',
})

Ext.define('test.model.Product', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'name', type: 'string'},
        {name: 'descr',  type: 'string'},
        {name: 'price',   type: 'float'},
        {name: 'amount',  type: 'int'}
    ],
    idProperty: 'id',
    validators: [{
            type: 'presence',  
            field: 'name'
        },{
            type: 'range',
            field: 'price',
            min:0
        },{
            type: 'range',
            field: 'amount',
            min:0
        }]
});