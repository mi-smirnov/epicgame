define([
    'backbone',
    'models/score',
    'apiSync'
], function (Backbone, ScoreModel, ApiSync) {
    var ScoreCollection = Backbone.Collection.extend({
        model: ScoreModel,
        url: '/scores',
        //sync: ApiSync,

        initialize: function() {
            this.fetch({reset: true});
        }
    });
    return new ScoreCollection();
});
