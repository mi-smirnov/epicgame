define([
    'backbone'
], function (Backbone){
    var User = Backbone.Model.extend({

        defaults: {
            email: "qaz@mail.ru",
            password: ""
        },

        initialize: function(){
            console.log('New user is created');

            //this.on('change:email', function(){
            //    alert('New email' + this.get('email'));
            //});
        }
    });
    return User;

});
