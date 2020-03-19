define([
    'jquery',
    'lodash',
    'methods',
    'modal',
    'feed',
    'admin',
    'bootstrap',
    'toggle'
], function ($, _, methods, modal, feed) {
    $("body").tooltip({
        selector: '[data-toggle=tooltip]'
    });
    $('.carousel').carousel('pause');
    methods.showToast();
    methods.hideWelcomeToast();
    // prevents form re-submission
    if (window.history.replaceState) {
        window.history.replaceState(null, null, window.location.href);
    }
    var username = methods.getUserName();
    var safelock = methods.getSafeLock();
    $(".search-me").on("keyup", methods.searchOnKeyUp);
    //Login page js, toggles new account creation mode
    if ($("#newaccount").length) {
        $('#newaccount').click(function () {
            $('#name-input').toggle();
        });
    };
    feed.moreNews(username, safelock);
    document.addEventListener('scroll',
        _.debounce(
            function () {
                feed.moreNews(username, safelock);
            }, 50, { immediate: true }
        )
    );
    $(document).ready(function () {
        feed.carouselPop();
    });
    modal.refreshSubscribed(username, safelock, 'topics');
    modal.refreshSubscribed(username, safelock, 'pages');
});