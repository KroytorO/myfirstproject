(function($){
$(document).ready(function(){
/*cookie*/
    function set_cookie(name, value, exp_y, exp_m, exp_d, path, domain, secure) {
        {
            var cookie_string = name + "=" + escape(value);

            if ( exp_y )
            {
                var expires = new Date ( exp_y, exp_m, exp_d );
                cookie_string += "; expires=" + expires.toGMTString();
            }

            if ( path )
                cookie_string += "; path=" + escape ( path );

            if ( domain )
                cookie_string += "; domain=" + escape ( domain );

            if ( secure )
                cookie_string += "; secure";

            document.cookie = cookie_string;
        }
    }


    function delete_cookie ( cookie_name )
    {
        var cookie_date = new Date ( );  // Текущая дата и время
        cookie_date.setTime ( cookie_date.getTime() - 1 );
        document.cookie = cookie_name += "=; expires=" + cookie_date.toGMTString();
    }

    function get_cookie ( cookie_name )
    {
        var results = document.cookie.match ( '(^|;) ?' + cookie_name + '=([^;]*)(;|$)' );

        if ( results )
            return ( unescape ( results[2] ) );
        else
            return null;
    }


    function cookies_discount() {
        var discount = document.cookie;
        if (discount == undefined || discount == 'spetipredlojenie=0' || discount == "") {
            set_cookie('spetipredlojenie', 0, 2100, 11, 1);
            if (document.cookie == "spetipredlojenie=0") {
                setTimeout(function () {
                    $('#cookies').fadeIn(1000);
                    set_cookie('spetipredlojenie', 1, 2100, 11, 1);
                }, 1000 * 13);
                $('#cookies').click(function () {
                    $('#cookies').fadeOut(1000);
                });
            }
            else if (document.cookie == 'spetipredlojenie=1') {
                    $('#cookies').css('display', 'none');
                }

        }
    }

    cookies_discount();


    /*-END cookie*/

    /*----Validation start----*/

    function validate() {
        var validar=/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/i;
        var userEmail = $("#email");

        if (!userEmail.val()) {
            userEmail.style.border = "2px solid red";
            return false;
        }
        else {
            if(userEmail.val().search(validar)==0){
                userEmail.style.border = "2px solid green";
                sendEmail();
            }
        else { userEmail.style.border = "2px solid red";} }


    }



    /*----END Validation----*/


    /*----Email----*/
    function sendEmail(){
        var fullUrl =  location.protocol+'//'+location.hostname+(location.port ? ':'+location.port: '');
        var userEmail = $("#email");
        var userName = $("#author");
        var userMessage = $("#text");
            var formData = $('#emailForm').serialize();
            $("#opov").text("Пожалуйста подождите...");

            $.ajax({
                url: fullUrl+'/send',
                type: 'POST',
                data: formData,
                success: function(result) {

                    event.preventDefault();
                    if (!userName.val()) {
                        userName.style.border = "2px solid red";
                        return false;
                    }
                    else  {userName.style.border = "2px solid green";}

                    if (!userMessage.val()) {
                        userMessage.style.border = "2px solid red";
                        return false;
                    }
                    else  {userMessage.style.border = "2px solid green";}


                    $("#opov").empty().text(result);
                    /*Очистка формы после отправки*/

                    userName.val("");
                    userEmail.val("");
                    userMessage.val("");
                    return true;
                },

                error: function(e) {
                    $("#opov").empty().text("При отправке сообщения,произошла ошибка: Error code:"+e.status +", Error message:"+e.statusText);
                },
                dataType: "html",
                timeout: 60000,

        });
    }

    /*----END Email----*/

    /*----History API----*/

    function Histori_Api(clickHand, placeLoad)
    {
        $(clickHand).on('click', function (e) {
            e.preventDefault();
            var url = $(this).attr('href');

            getContent(url, true);
        });

        window.addEventListener("popstate", function (e) {

            getContent(location.pathname, false);
        });

        function getContent(url, addEntry) {
            $.ajax({
                    url:url,
                beforeSend: function(){
                    $('#imgcode').fadeIn(300);
                    $(placeLoad).empty();
                },
                    dataType:"html",
                    success:function(data){
                        setTimeout(function () {
                            $('#imgcode').fadeOut(1);
                            $(placeLoad).html($(data).find(placeLoad).html());
                        },1000);

                    if(url == "contact"){
                        $(document).on("click", "#submit", function(event){
                        event.preventDefault();
                        validate();

                    });}

                        if (addEntry == true) {
                            history.pushState(null, null, url);
                        }
                },
                error:function () {
                alert("NOT Ok");
            }
            });
         }
    }
    Histori_Api(".historyAPI a", "#contentHolder");

    /*---- END HistoryAPI----*/

    });

})(jQuery);