define([
    'backbone',
    'jquery',
    'views/main',
    'views/login',
    'views/game',
    'views/scoreboard',
    'views/signup'
], function (Backbone, mainView, loginView, gameView, signupView, scoreboardView){

    var Router = Backbone.Router.extend({
        routes: {
            'scoreboard' : 'scoreboardAction',
            'game' : 'gameAction',
            'login' : 'loginAction',
            'signup' : 'signupAction', 
            '*default': 'defaultActions'
        },
   
        defaultAction: function () {
            mainView.show();
        },
        scoreboardAction: function () {
            scoreboardView.show();
        },
        gameAction: function () {
            gameView.show();
        },
        loginAction: function () {
            loginView.show();
        },
        signupAction: function() {
            signupView.show();
        }
    });

    return new Router();
});