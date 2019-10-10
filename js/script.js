

$(document).ready(function () {

    // показ и скрытие header-menu

    $('.header-menu-sign').on('click', function () {

        $(this)
            .next()
            .not('.header-menu-dropdown_opened')
            .outerWidth($('body').outerWidth())
        ;

        $(this)
            .toggleClass('header-menu-sign_close')
            .next()
            .toggleClass('header-menu-dropdown_opened')
        ;
    });


    // аккордеон из pay-block-ов

    $('.pay-block-header-wrapper').on('click', function () {

        // аккордеон появляется при размере окна < 700px

        if ( $(window).width() < 700 ) {

            $(this)
                .next('.pay-block-content')
                .slideToggle()
                .closest('.pay-block')
                .toggleClass('pay-block_opened')
            ;

        }
        
    });



    // на мобильных устройствах onresize срабатывает в том числе при прокрутке. Чтобы этого избежать, запоминаем текущую ширину экрана (1) и сравниваем (2)

    var width = $(window).width(); // (1)


    // аккордеон не должен работать при размере окна >= 700px (это если пользователь будет кардинально менять размер окна после перезагрузки)

    $(window).resize(function () {

        var windowWidth = $(this).width();

        if(windowWidth !== width) { // (2)

            // если меняет размер окна, нужно показать все блоки аккордеона при ширине окна >= 700px

            if (windowWidth >= 700) {
                
                $('.pay-block-content')
                    .slideDown()
                    .closest('.pay-block')
                    .removeClass('pay-block_opened')
                ;

                // изменение ширины header-menu-dropdown (нужно придать прежний размер)

                $('.header-menu-dropdown')
                    .outerWidth(237)
                ;

                // если изменяется ширина с той, что меньше 700px на большую 700, открытое меню закрывается

                $('.header-menu-dropdown_opened')
                    .removeClass('header-menu-dropdown_opened')
                    .prev()
                    .removeClass('header-menu-sign_close')
                ;

            }

            // или скрыть все блоки аккордеона при ширине окна < 700px (если просто обновить страницу при размере окна < 700, будет, как в макете: открыт первый блок и закрыты остальные)

            else {

                $('.pay-block-content')
                    .slideUp()
                    .closest('.pay-block')
                    .removeClass('pay-block_opened')
                ;

                // изменение ширины header-menu-dropdown (нужно сравнять с шириной страницы без скролла)

                $('.header-menu-dropdown')
                    .outerWidth($('body').outerWidth())
                ;

            }

            // запоминаем текущую ширину экрана
            width = windowWidth;

        }

    });


    // по клику на кнопку "Войти" открывается модальное окно

    $('.btn-enter').on('click', function () {
        $('#enter-modal')
            .fadeIn()
        ;

        $('.body').addClass('modal-opened');
    });


    // по клику на крестик закрывается модальное окно, стираются данные в полях

    $('.modal-close').on('click', function () {
        $(this)
            .closest('.modal')
            .fadeOut()
            .find('.modal-field')
            .val('')
        ;

        $('.body').removeClass('modal-opened');
    });


    // открываем или закрываем блок Поделиться по клику на значок

    $('.share').on('click', function () {

        $(this).toggleClass('share_opened');

    });



    // плавная прокрутка к якорям

    var linkNav = $('[href^="#"]').not('[href="#"]'); 

    var V = 0.25;  // скорость, может иметь дробное значение через точку (чем меньше значение - тем больше скорость)

    for (var i = 0; i < linkNav.length; i++) {
        linkNav[i].addEventListener('click', function (e) { //по клику на ссылку
            e.preventDefault();

            var w = window.pageYOffset;  // производим прокрутку
            var hash = this.href.replace(/[^#]*(.*)/, '$1'); // к id элемента, к которому нужно перейти
            var t = document.querySelector(hash).getBoundingClientRect().top;  // отступ от окна браузера до id
            var start = null;

            requestAnimationFrame(step);

            function step(time) {
                if (start === null) start = time;

                var progress = time - start;
                var r = (t < 0 ? Math.max(w - progress / V, w + t) : Math.min(w + progress / V, w + t));

                window.scrollTo(0, r);

                if (r !== w + t) {
                    requestAnimationFrame(step);
                }
                else {
                    location.hash = hash; // URL с хэшем
                }
            }
        }, false);
    }

});

