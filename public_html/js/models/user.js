define([
    'backbone'
], function (Backbone){
    var User = Backbone.Model.extend({
        default:
        {
            name: '',
            score: 0
        },
        initialize: function(){
            console.log("New user");
        }
    });
    return User;
});