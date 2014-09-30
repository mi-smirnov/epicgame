define([
    'backbone',
    'tmpl/scoreboard'
], function(
    Backbone,
    tmpl
){
    var ScoreboardView = Backbone.View.extend({
        el: $("#page"),
        template: tmpl,
        
        render: function () {
            this.$el.html(this.template);
        },
        show: function () {
            this.render();
        }
    });
    return new ScoreboardView();

});