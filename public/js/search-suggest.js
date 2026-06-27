let typingTimer;
let doneTypingInterval = 600;

const setSuggestion = (type = 'web') => {
    let query = $('.search-query').val();
    let url = $('meta[name=search-suggest-url]').attr('content');
    let $searchSuggest = $('.dropdown-search-suggest')

    if (type == 'mobile') {
        query = $('.search-query-mobile').val();
        $searchSuggest = $('.dropdown-search-suggest-mobile')
    }
    
    clearTimeout(typingTimer);

    // Set a new timer
    typingTimer = setTimeout(function() {
        // Only make the request after the user has stopped typing
        if (query.length > 3) {
            $.get(`${url}?q=` + query, function(data) {
                $searchSuggest.addClass('show');
                $searchSuggest.empty();
                data.unshift(query);
                data.forEach(function(item, index) {
                    $searchSuggest.append(`
                        <li>
                            <a data-type="${type}" class="d-flex dropdown-item suggestion-value ${index === 0 ? 'fw-bold' : ''}" href="javascript:void(0);"><i class="mt-1 bx bx-search me-3" style="font-size: 12px;"></i>${item}</a>
                        </li>
                    `);
                });
            });
        }                
    }, doneTypingInterval);
}

const search = (query) => {
    window.location.href = "/cari?q=" + query;
}

$(document).ready(function(){
    $('input.search-query').on('keyup', function() {
        setSuggestion('web');
        $('input.search-query-mobile').val($(this).val())
    });
    
    $('input.search-query-mobile').on('keyup', function() {
        setSuggestion('mobile');
        $('input.search-query').val($(this).val())
    });
    
    $('input.search-query').on('blur', function() {
        setTimeout(function() {
            $('.dropdown-search-suggest').removeClass('show');
        }, 200);
    });
    
    $('input.search-query-mobile').on('blur', function() {
        setTimeout(function() {
            $('.dropdown-search-suggest-mobile').removeClass('show');
        }, 200);
    });
    
    $('body').on('click', '.suggestion-value', function() {
        let value = $(this).text();
 
        $('.search-query').val(value);
        $('.dropdown-search-suggest').removeClass('show');
        
        $('.search-query-mobile').val(value);
        $('.dropdown-search-suggest-mobile').removeClass('show');
    
        search(value);
    });

    $('input.search-query').on('focus', function() {
        setSuggestion();
    });
    $('input.search-query-mobile').on('focus', function() {
        setSuggestion('mobile');
    });
})
