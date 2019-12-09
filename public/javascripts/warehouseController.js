(function ($, window, document) {
    $(document).ready(function () {
        $('#changeRegion').hide();

        $('#searchButton').on('click', function () {

            // Get client IP data
            $.getJSON("https://api.ipify.org/?format=json", function (e) {
                $('#ip').text(e.ip);

                // Query: http://api.ipstack.com/95.175.104.124?access_key=2ddaade31b11528050e9d939946a9e23 --- ip should be changed
                var query = 'http://api.ipstack.com/' + $('#ip').text() + '?access_key=2ddaade31b11528050e9d939946a9e23';
                $.ajax({
                    url: query,
                    async: false,
                    type: 'GET',
                    success: function (result) {
                        // Prints result to console and continent to reqion element
                        //console.log(result);
                        $('#region').text(result.continent_name);
                    },
                    error: function (error) {
                        console.log('Error ${error}')
                    }
                });
               
                searchData();
                
            });
        });

        $('.btnChangeLocation').on('click', function () {
            $('#region').text($(this).text());
            searchData();
        });

        function searchData() {
            $('#lblAvailability').html('Guitars available on ' + $('#region').text() + ':');

            $.getJSON(`${window.apiRoute}/warehouse/` + $('#region').text()).done(function (data) {
                console.log(data);

                var html = '';
                $.each(data, function (key, value) {
                    if (key == 'data') {
                        $.each(value, function (id, content) {

                                    html += '<p class="divProduct">';
                                    html += '<label>Brand: ' + content.brand + ', Model: ' + content.model + ', Scale: ' + content.scale + ', Weight: ' + content.weight + ', Price: ' + content.price + ', Stock level: ' + content.stock_level + '</label>';
                                    html += '</p>';
                        });
                    }
                });

                $('.data').html(html);
            });
            $('#changeRegion').show();
        }
    });
})(jQuery, window, document)