Ext.define('test.view.login' ,{
    extend: 'Ext.form.Panel',
    alias : 'widget.loginview',
    title : 'Авторизация',
    frame : false,
    items: [
    {
       xtype: 'textfield',
       fieldLabel: 'Логин',
       name: 'username',
       itemId: 'username',
       allowblank: false,
      },
      {
       xtype: 'textfield',
       fieldLabel: 'Пароль',
       name: 'password',
       itemId: 'password',
       allowblank: false,
       inputType: 'password',
      }
    ],
    buttons:[
      {
       text: 'Войти',
       listeners :{
        click: function(){
         var username = this.up('form').down('#username').getValue();
         var password = this.up('form').down('#password').getValue();
         this.fireEvent('signin', this, username, password);
        }
       }
      }
    ]
    });