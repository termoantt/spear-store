(function ($, window, document) {
    $(document).ready(function () {
        let region = 'Europe';
        let regionFetched = false;

        $('.change-region-container').hide();

        $.getJSON("https://api.ipify.org/?format=json")
            .done(function (data) {
                $.getJSON(`http://api.ipstack.com/${data.ip}?access_key=2ddaade31b11528050e9d939946a9e23`)
                    .done(function (data) {
                        region = data.continent_name;
                        regionFetched = true;
                        console.log('ready');
                    });
            });

        function getGuitars(searchRegion) {
            $.getJSON(`${window.apiRoute}/warehouse/${searchRegion}`)
                .done(function (data) {
                    var html = '';

                    $.each(data, function (key, value) {
                        if (key == 'data') {
                            $.each(value, function (id, content) {
                                html += '<p class="divProduct"><button ' + (!!content.stock_level ? '' : 'disabled') + ' id="buy-button" data-id="' + content.product_id + '" data-quantity="' + content.stock_level + '">Buy</button>';
                                html += '<label>Brand: ' + content.brand + ', Model: ' + content.model + ', Scale: ' + content.scale + ', Weight: ' + content.weight + ', Price: ' + content.price + ', Stock level: ' + content.stock_level + '</label>';
                                html += '</p>';
                            });
                        }
                    });

                    $('#data').html(html);
                });

            $('.subtitle').html(`Guitars available on ${region}:`);
            $('.change-region-container').show();
        }

        function buyGuitar(buyRegion, id, quantity) {
            $.post(`${window.apiRoute}/warehouse/${buyRegion}/buy`, {
                product_id: id,
                quantity: parseInt(quantity - 1),
                user_id: 1
            })
                .done(function (data) {
                    console.log(data);
                });
        }

        $('#search-button').on('click', function () {
            getGuitars(region);
        });

        $('.change-region-button').on('click', function () {
            region = $(this).data('region');
            getGuitars(region);
        });

        $('#data').on('click', '#buy-button', function () {
            buyGuitar(region, $(this).data('id'), $(this).data('quantity'));
        });
    });
})(jQuery, window, document)