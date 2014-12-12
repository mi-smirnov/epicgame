define([
    'jquery',
    'backbone',
    'tmpl/game',
    'helpers/keycodes',
    'models/user',
    'instance/user'
], function (jquery, Backbone, tmpl, KeyCodes, UserModel, User){

    var gameView = Backbone.View.extend({

        initialize: function() {
            this.$page = $('#page');
            this.render();
            this.$el.hide();
            console.log(this.model);
        },

        template: tmpl,

        events: {
            'click #play' : 'startGame'
        },

        render: function() {
            this.$el.html(this.template);
            this.$page.append(this.$el);
        },

        show: function() {
            this.trigger('show', this);
            var user = User.get("email");
            console.log(user);
        },

        startGame: function() {
            
            var canvas;
            var context;
            var keyCode = '';
            var ws;
            var myEmail = '';
            var enemyEmail = '';
            var mapSize;
            var imgSize = 32;
            var step;

            createWebSocket();

            function createWebSocket(){
                myEmail = User.get("email");
                ws = new WebSocket("ws://localhost:8080/gameplay");
                console.log("create socket");

                ws.onopen = function (event) {
                    console.log("open socket");
                    document.getElementById('play').style.display = 'none';
                    document.getElementById("waiter").style.display = "block";
                    document.getElementById("myEmail").innerHTML = myEmail;
                };
                ws.onmessage = function (event) {
                    var key = window.event.keyCode;
                    canvas = document.getElementById('game__field');
                    context = canvas.getContext('2d');
                    var data = JSON.parse(event.data);
                    var field;
                    console.log("onmessage");

                    if(data.status == "start"){
                        field = data.field;
                        step = field.length;
                        mapSize = step * imgSize;
                        canvas.width = mapSize;
                        canvas.height = mapSize;
                        enemyEmail = data.enemy;
                        drawMap(field);
                        keyCode = key;
                        window.onkeydown = processKey;
                        document.getElementById("waiter").style.display = "none";
                        document.getElementById("gameplay").style.display = "block";
                        document.getElementById("enemyEmail").innerHTML = enemyEmail;
                        document.getElementById("Email").innerHTML = myEmail;
                    }

                    if(data.status == "finish"){
                        context.clearRect(0, 0, canvas.width, canvas.height);
                        document.getElementById("gameOver").style.display = "block";
                        document.getElementById("gameplay").style.display = "none";

                        if(data.win)
                            document.getElementById("win").innerHTML = " winner!";
                            //User.set({'bla', 'bla'});
                            //User.save();
                        else
                            document.getElementById("win").innerHTML = " loser!";
                    }

                    if(data.status == "increment" && data.email == myEmail){
                        document.getElementById("myScore").innerHTML = data.score;
                    }

                    if(data.status == "increment" && data.email == document.getElementById("enemyEmail").innerHTML){
                        document.getElementById("enemyScore").innerHTML = data.score;
                    }
                    if(data.status == "move"){
                        field = data.field;
                        drawMap(field);
                    }
                };

                ws.onclose = function (event) {
                    console.log("close socket");
                };
            }

            function sendMessage(message) {
                console.log("send message");
                console.log(message);
                ws.send(message);
            }

            function drawMap(field){
                console.time('render');
                context.fillRect(0, 0, mapSize, mapSize);
                var img;
                for(var i = 0; i < step; i++) {
                    for (var j = 0; j < step; j++) {
                        img = field[i][j];
                        switch (img) {
                            case 'FIRST_TANK':
                                var firstTank = document.getElementById('game__firstTank');
                                context.drawImage(firstTank, i * imgSize, j * imgSize);
                                break;
                            //case 'EMPTY_FIELD':  !!!!!!!!!МЕДЛЕННЕЕ!!!!!!
                            //    //var emptyField = document.getElementById('game__emptyField');
                            //    //context.drawImage(emptyField, i * imgSize, j * imgSize);
                            //    //context.fillRect(i * imgSize, j * imgSize, imgSize, imgSize);
                            //    break;
                            case 'SECOND_TANK':
                                var secondTank = document.getElementById('game__secondTank');
                                context.drawImage(secondTank, i * imgSize, j * imgSize);
                                break;
                            case 'WALL':
                                var wall = document.getElementById('game__wall');
                                context.drawImage(wall, i * imgSize, j * imgSize);
                                break;
                            default:
                                break;
                        }
                    }
                }
                console.timeEnd('render');
            }

            function processKey(event){

                var key = window.event.keyCode;
                keyCode = key;
                sendMessage(keyCode);
            }

            //function rotate(key){
            //    var angleToRotate;
            //    var imgTank = document.getElementById('game__tank');
            //    if(key == KeyCodes.KEY_CODE_ARROW_UP){
            //        $('#game__tank').css('transform', '-webkit-rotate(90deg)');
            //        //angleToRotate = 90;
            //        //context.clearRect(x, y, imgTank.width, imgTank.height);
            //        //var rad = angleToRotate * Math.PI / 180;
            //        //context.rotate(rad);
            //        //style:transform: -webkit-rotate(45deg);
            //    }
            //
            //    if(key == KeyCodes.KEY_CODE_ARROW_RIGHT){
            //        angleToRotate = 0;
            //        //context.clearRect(x, y, imgTank.width, imgTank.height);
            //        var rad = angleToRotate * Math.PI / 180;
            //        context.rotate(rad);
            //    }
            //
            //    if(key == KeyCodes.KEY_CODE_ARROW_LEFT){
            //        angleToRotate = 180;
            //        //context.clearRect(x, y, imgTank.width, imgTank.height);
            //        var rad = angleToRotate * Math.PI / 180;
            //        context.rotate(rad);
            //    }
            //
            //    if(key == KeyCodes.KEY_CODE_ARROW_DOWN){
            //        angleToRotate = 270;
            //        //context.clearRect(x, y, imgTank.width, imgTank.height);
            //        var rad = angleToRotate * Math.PI / 180;
            //        context.rotate(rad);
            //    }
            //}

            //function checkForCollision(key){
            //    //console.log(key);
            //    var imgDataOne = null;
            //    var imgDataTwo = null;
            //    if(key == KeyCodes.KEY_CODE_ARROW_RIGHT){
            //        console.log('key right');
            //        imgDataOne = context.getImageData(x+31, y, 1, 1);
            //        imgDataTwo = context.getImageData(x+31, y+31, 1, 1);
            //    }
            //    if(key == KeyCodes.KEY_CODE_ARROW_UP){
            //        console.log('key up');
            //        imgDataOne = context.getImageData(x, y, 1, 1);
            //        imgDataTwo = context.getImageData(x+31, y, 1, 1);
            //    }
            //    if(key == KeyCodes.KEY_CODE_ARROW_LEFT){
            //        console.log('key left');
            //        imgDataOne = context.getImageData(x, y, 1, 1);
            //        imgDataTwo = context.getImageData(x, y+31, 1, 1);
            //    }
            //    if(key == KeyCodes.KEY_CODE_ARROW_DOWN){
            //        console.log('key down');
            //        imgDataOne = context.getImageData(x, y+31, 1, 1);
            //        imgDataTwo = context.getImageData(x+31, y+31, 1, 1);
            //    }
            //    var pixelFirst = imgDataOne.data;
            //    var pixelSecond = imgDataTwo.data;
            //
            //    var red = pixelFirst[0];
            //    var green = pixelFirst[1];
            //    var blue = pixelFirst[2];
            //    var alpha = pixelFirst[3];
            //
            //    var red2 = pixelSecond[0];
            //    var green2 = pixelSecond[1];
            //    var blue2 = pixelSecond[2];
            //    var alpha2 = pixelSecond[3];
            //    console.log("R: " + red+", G: "+green + ", B: " + blue);
            //    if(((red + green + blue) / 3  <  30 )&&((red2 + green2 + blue2) / 3  <  30 )){
            //        return false;
            //    }
            //
            //    return true;
            //}
        }

    });

    return new gameView({model: UserModel});
});