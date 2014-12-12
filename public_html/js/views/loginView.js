define([
    'jquery',
    'backbone',
    'tmpl/login',
    'models/user',
    'instance/user'
], function (jquery, Backbone, tmpl, UserModel, User){

    var loginView = Backbone.View.extend({

        initialize: function() {
            this.$page = $('#page');
            this.render();
            this.$el.hide();
        },

        template: tmpl,

        render: function () {
            this.$el.html(this.template());
            this.$page.append(this.$el);
            this.$error = $('.alert');
        },

        show: function() {
            this.trigger('show', this);
        },
        
        events: {
            'submit form' : 'login',
            'input input' : 'validate'
        },
        
        login: function(event) {
            event.preventDefault();
            var email = $('.form__input_login-email').val();
            var password = $('.form__input_login-password').val();
            if(password.match(/.+/i) && email.match(/.+?@(.+?\.)+.+/i)){
                var form = this.$el.find('form'),
                    data = form.serialize(),
                    url = form.attr('action'),
                    that = this;
                console.log(data);

                $.ajax({
                    url: url,
                    type: "post",
                    data: data,

                    success: function(){
                        window.location.href = '#game';
                        console.log(User);
                        User.set({email: email});
                    },
                    error: function() {
                        $(function(){
                            $(".form__input_login-email").addClass('form__input_error');
                            $(".form__input_login-password").addClass('form__input_error');
                        });
                        $('.alert').css('display', 'block');
                        that.renderError("Incorrect Email or Password");
                    }
                });
            }
            else {
                $('.form__button_submit-login').attr('disabled', 'true');
                $('.form__input_login-email').addClass('form__input_error');
                $('.form__input_login-password').addClass('form__input_error');
                $('.alert').css('display', 'block');
                this.renderError("All fields must be filled!");
            }
        },

        validate: function() {
            var email = $('.form__input_login-email').val();
            $('.form__input_login-email').blur(function(){
                if (!email.match(/.+?@(.+?\.)+.+/i)) {
                    if (!$('.form__div_error-email')[0]) {
                        $('.form__input_login-email').addClass('form__input_error').after('<div class=\'form__div_error-email\'>Enter valid email, example: admin@mail.ru</div>');
                    }
                }
                else{
                    $('.form__input_login-email').removeClass('form__input_error');
                    $('.form__div_error-email').remove();
                    $('.alert').css('display', 'none');
                }
            });

            var password = $('.form__input_login-password').val();
            $('.form__input_login-password').keyup(function(){
                if (!password.match(/.+/i)) {
                    if (!$('.form__div_error-password')[0]) {
                        $('.form__input_login-password').addClass('form__input_error').after('<div class=\'form__div_error-password\'>Enter your password!</div>');
                    }
                }
                else{
                    $('.form__input_login-password').removeClass('form__input_error');
                    $('.form__div_error-password').remove();
                    $('.alert').css('display', 'none');
                }
            });

            if((!password.match(/.+/i)) || (!email.match(/.+?@(.+?\.)+.+/i))){
                $('.form__button_submit-login').attr('disabled', 'true');
            }
            else{
                $('.form__button_submit-login').removeAttr('disabled');
            }
        },

        renderError: function(msg) {
            this.$error.text(msg);
        }
    });

    return new loginView();
});