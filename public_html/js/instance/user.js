define([
    'backbone'
], function (Backbone){
    var User = Backbone.Model.extend({

        defaults: {
            email: "",
            password: ""
        },

        initialize: function(){
            //this.on('change:email', function(){
            //    alert('New email' + this.get('email'));
            //});
        }
    });
    return new User;

});
