define([
    'backbone'
], function (Backbone){
    var Score = Backbone.Model.extend({
        
        defaults: {
            email: "default_email@mail.ru",
            score: 0
        },
        initialize: function(){
            //alert('New score' + this.get('email') + this.get('score'));
        }
    });
    return Score;
});