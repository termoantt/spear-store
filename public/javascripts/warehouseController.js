(function ($, window, document) {
    $(document).ready(function () {
        $('#searchButton').on('click', function () {
            $('.title').html('Hello, World!');
            $.getJSON(`${window.apiRoute}/warehouse`)
                .done(function (data) {
                    console.log(data);
                });
        });
    });
})(jQuery, window, document)