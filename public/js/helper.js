const setCaptcha = () => {
    let $captchaImage = $('#captchaImage');
    let oldSrc = $captchaImage.attr('src');

    $captchaImage.css({ opacity: 0.5 });

    $.get('/refresh-captcha', function(data) {
        $('#captchaContainer').html(`<img id="captchaImage" class="me-1" src="${data.captcha}" alt="Captcha">`);
    }).fail(function() {
        $captchaImage.attr('src', oldSrc).css({ opacity: 1 });
    });
}

$('#captchaRefresh').click(function(e) {
    e.preventDefault();
    setCaptcha();
});

// coordinates format: [latitude, longitude]
const PROVINCE_RAW_DATA = [
    {
        name: 'Aceh',
        entryCountCoordinates: [4.365294678047632, 96.93968970778188],
        kyasCoordinates: [4.923755270027145, 96.00585183999868],
    },
    {
        name: 'Sumatera Utara',
        entryCountCoordinates: [2.290482504470063, 99.36200695229049],
        kyasCoordinates: [3.1574134381435885, 98.72479993662665],
    },
    {
        name: 'Sumatera Barat',
        entryCountCoordinates: [-1.1005421395220039, 100.89860641004611],
        kyasCoordinates: [0.07492724514187477, 100.06364551802234],
    },
    {
        name: 'Riau',
        entryCountCoordinates: [-0.26883200625108344, 102.38599175982883],
        kyasCoordinates: [1.104389603428367, 101.03467351698876],
    },
    {
        name: 'Jambi',
        entryCountCoordinates: [-1.159368074269233, 103.79691941889145],
        kyasCoordinates: [-1.906165769948547, 102.20939504366004],
    },
    {
        name: 'Sumatera Selatan',
        entryCountCoordinates: [-3.493870632685819, 104.30849665399842],
        kyasCoordinates: [-3.060621417944656, 103.38015189904819],
    },
    {
        name: 'Bengkulu',
        entryCountCoordinates: [-3.8780942233108493, 102.32483044524113],
        kyasCoordinates: [-3.8780942233108493, 102.32483044524113],
        kyasOffset: {
            offsetX: -17,
            offsetY: 18,
        },
    },
    {
        name: 'Lampung',
        entryCountCoordinates: [-4.818997992643988, 105.05552021113469],
        kyasCoordinates: [-4.818997992643988, 105.05552021113469],
        kyasOffset: {
            offsetX: -20,
            offsetY: 15,
        },
    },
    {
        name: 'Kepulauan Bangka Belitung',
        entryCountCoordinates: [-3.00661212710521, 106.6144322984596],
        kyasCoordinates: [-1.9144969528848572, 105.63115590120466],
    },
    {
        name: 'Kepulauan Riau',
        entryCountCoordinates: [-0.045901167156237044, 104.5568205877117],
        kyasCoordinates: [0.8983688429866472, 103.44610371307566],
    },
    {
        name: 'Banten',
        entryCountCoordinates: [-6.585078424711388, 105.7769980575453],
        kyasCoordinates: [-6.585078424711388, 105.7769980575453],
        kyasOffset: {
            offsetX: -20,
            offsetY: 15,
        },
    },
    {
        name: 'DKI Jakarta',
        entryCountCoordinates: [-6.338241533097112, 106.90091173479195],
        kyasCoordinates: [-6.338241533097112, 106.90091173479195],
        kyasOffset: {
            offsetX: 0,
            offsetY: -30,
        },
        countOffset: {
            offsetX: 25,
            offsetY: -10,
        }
    },
    {
        name: 'Jawa Barat',
        entryCountCoordinates: [-7.351169269001346, 107.42802688089404],
        kyasCoordinates: [-7.351169269001346, 107.42802688089404],
        kyasOffset: {
            offsetX: -15,
            offsetY: 18,
        },
    },
    {
        name: 'Jawa Tengah',
        entryCountCoordinates: [-7.223035862154509, 109.40256262201814],
        kyasCoordinates: [-7.223035862154509, 109.40256262201814],
        kyasOffset: {
            offsetX: -17,
            offsetY: 18,
        },
    },
    {
        name: 'Daerah Istimewa Yogyakarta',
        entryCountCoordinates: [-8.029328262498122, 110.56428569039869],
        kyasCoordinates: [-8.029328262498122, 110.56428569039869],
        kyasOffset: {
            offsetX: -17,
            offsetY: 18,
        },
    },
    {
        name: 'Jawa Timur',
        entryCountCoordinates: [-8.036123769948942, 113.16428104271732],
        kyasCoordinates: [-7.537760477233082, 112.12561195482266],
    },
    {
        name: 'Bali',
        entryCountCoordinates: [-8.343516723620679, 115.14816530681928],
        kyasCoordinates: [-8.343516723620679, 115.14816530681928],
        kyasOffset: {
            offsetX: 0,
            offsetY: -40,
        },
    },
    {
        name: 'Nusa Tenggara Barat',
        entryCountCoordinates: [-8.303504153382129, 118.89950761484396],
        kyasCoordinates: [-8.575091495089689, 117.18624734669724],
    },
    {
        name: 'Nusa Tenggara Timur',
        entryCountCoordinates: [-8.495220540769903, 122.64852797534544],
        kyasCoordinates: [-9.755306413270429, 120.04974441009374],
    },
    {
        name: 'Kalimantan Barat',
        entryCountCoordinates: [-0.08120829427667509, 111.53756785067625],
        kyasCoordinates: [0.4021868037601801, 110.08737260000235],
    },
    {
        name: 'Kalimantan Tengah',
        entryCountCoordinates: [-1.9538776219647123, 113.65810423143455],
        kyasCoordinates: [-1.5256093376516646, 112.47158082295708],
    },
    {
        name: 'Kalimantan Selatan',
        entryCountCoordinates: [-3.3387035605354685, 115.31107011978547],
        kyasCoordinates: [-2.3901978599826936, 115.43210995853966],
    },
    {
        name: 'Kalimantan Timur',
        entryCountCoordinates: [0.05127753204440388, 116.72985450447037],
        kyasCoordinates: [0.577414338547406, 115.65833513291791],
    },
    {
        name: 'Kalimantan Utara',
        entryCountCoordinates: [2.6575756890668703, 116.31156887977103],
        kyasCoordinates: [3.787359768732696, 115.86112944584957],
    },
    {
        name: 'Sulawesi Utara',
        entryCountCoordinates: [2.717324845743306, 125.38203199648997],
        kyasCoordinates: [1.0263946768506897, 124.44819412870679],
    },
    {
        name: 'Sulawesi Tengah',
        entryCountCoordinates: [-1.2883783306310834, 122.0632975661567],
        kyasCoordinates: [0.30865602459885233, 120.11847050009],
    },
    {
        name: 'Sulawesi Barat',
        entryCountCoordinates: [-2.9614210872388256, 119.23419842021335],
        kyasCoordinates: [-2.033968492975013, 119.36603435448863],
    },
    {
        name: 'Sulawesi Selatan',
        entryCountCoordinates: [-5.400645627313676, 119.87349066026749],
        kyasCoordinates: [-4.463194641889111, 119.91112847594417],
    },
    {
        name: 'Sulawesi Tenggara',
        entryCountCoordinates: [-5.0183264255305104, 122.65116147764292],
        kyasCoordinates: [-3.9977586300375734, 121.9661532198072],
    },
    {
        name: 'Gorontalo',
        entryCountCoordinates: [0.4758235668804318, 123.16291371383822],
        kyasCoordinates: [0.7614511465736011, 121.87202019072616],
    },
    {
        name: 'Maluku Utara',
        entryCountCoordinates: [0.5913427989748418, 127.94200216901335],
        kyasCoordinates: [1.4837608237076638, 127.7362789337574],
    },
    {
        name: 'Maluku',
        entryCountCoordinates: [-3.1316365232972485, 129.40966358206896],
        kyasCoordinates: [-3.2193921844210958, 127.78368705934061],
    },
    {
        name: 'Papua Barat Daya',
        entryCountCoordinates: [-1.369864943046066, 132.33225802848568],
        kyasCoordinates: [-0.8536064785752713, 131.33250219356484],
    },
    {
        name: 'Papua Barat',
        entryCountCoordinates: [-3.0683461586232172, 134.01002473647796],
        kyasCoordinates: [-2.047649309166852, 133.5046536550894],
    },
    {
        name: 'Papua Selatan',
        entryCountCoordinates: [-6.462940847359424, 139.883353040843],
        kyasCoordinates: [-5.621701055503442, 138.8616245502096],
    },
    {
        name: 'Papua Tengah',
        entryCountCoordinates: [-4.290282411354415, 136.77983866137978],
        kyasCoordinates: [-3.6436455325444683, 136.04375469500954],
    },
    {
        name: 'Papua',
        entryCountCoordinates: [-2.5185595993967356, 139.02844366437014],
        kyasCoordinates: [-1.9207178538431788, 137.71838750882773],
    },
    {
        name: 'Papua Pegunungan',
        entryCountCoordinates: [-4.5283341543036695, 140.03553758106924],
        kyasCoordinates: [-3.9695736402405033, 138.88197315616057],
    },
];

const getOffsetCoordinates = ([lng, lat], variant) => {
    if (variant !== 'image') return [lng, lat];
        return [lng + 0.35, lat + 0.35];
    };

    // coordinates format: [lng, lat]
    const getProvinceCoordinates = () => {
        function applyOffset(item, variant = 'image') {
        const result = {};

        if (
            variant === 'image' &&
            item.kyasOffset?.offsetX != null &&
            item.kyasOffset?.offsetY != null
        ) {
            result.offsetX = item.kyasOffset.offsetX;
            result.offsetY = item.kyasOffset.offsetY;
        }

        if (
            variant === 'count' &&
            item.countOffset?.offsetX != null &&
            item.countOffset?.offsetY != null
        ) {
            result.offsetX = item.countOffset.offsetX;
            result.offsetY = item.countOffset.offsetY;
        }

        return result;
    }

    return PROVINCE_RAW_DATA.flatMap(item => [
        {
            coordinates: [item.kyasCoordinates[1], item.kyasCoordinates[0]],
            ...applyOffset(item, 'image'),
            data: {
                name: item.name,
                variant: 'image',
            },
        },
        {
            coordinates: [item.entryCountCoordinates[1], item.entryCountCoordinates[0]],
            ...applyOffset(item, 'count'),
            data: {
                name: item.name,
                variant: 'count',
            },
        },
    ]);
};

const hiddenAnno = new Set(); // simpan nama provinsi yang perlu disembunyikan

function hideAnnotationByName(name) {
  if (!name) return;
  const $anno = $(`.annotation-container[data-province="${name}"]`);
  if ($anno.length) {
    $anno.parent().addClass('d-none persist-hidden');
  }
}

function getProvinceNameFromEventTarget(t) {
  if (t && typeof t.attribute === 'function') return t.attribute('PROVINSI') || '';
  if (t && t.data && t.data.name) return t.data.name;       // annotation target
  if (t && typeof t.name === 'string') return t.name;        // fallback
  return '';
}

const getBasicMapConfig = ({allProvinces,provinceCounts,colorMapping}) => {
    return {
        panningEnabled: false,
        zoomingEnabled: false,
        wheelEnabled: false,
        selectionMode: 'none',
        export: {
            enabled: false,
        },
        controlBar: {
            enabled: false
        },
        layers: {
            name: 'areas',
            dataSource: DevExpress.viz.map.sources.indonesia,
            hoverEnabled: true,
            hoveredColor: '#ADF3F0',
            label: {
                enabled: true,
                dataField: 'name',
            },
            customize(elements) {
                elements.forEach(element => {
                    const name = element.attribute('PROVINSI');
                    const color = colorMapping[name] || "#ffffff";
                    element.applySettings({
                        color: color
                    });
                });
            },
        },
        annotations: statesData,
        commonAnnotationSettings: {
            type: 'custom',
            cornerRadius: 15,
            arrowLength: 7,
            arrowWidth: 9,
            paddingLeftRight: 8,
            paddingTopBottom: 3,
            color: '#ffffff',
            opacity: 1,
            width: 20,
            font: {
                family: 'Inter',
                size: 10,
                weight: 500,
                color: '#000000',
            },
            template(annotation, container) {
                const { data } = annotation;
                const $container = $(container);

                if (hiddenAnno.has(data.name)) {
                    $container.parent().addClass('d-none');
                    return;
                }

                $container.addClass('annotation-container');
                $container.attr('data-province', data.name || '');

                const province = provinceCounts.find(a => a.name === data.name);
                const provCount = province?.count ?? 0;

                if (data.variant === 'image') {
                    $container.attr('data-osan-hide', data.name);
                    const provOsanCount = province?.count_osan ?? 0;

                    if (Number(provOsanCount) <= 0) {
                        $container.parent().addClass('d-none');
                        return;
                    }
                    $container.attr('data-osan-show', data.name);

                    const imageUrl = 'img/kyas.jpg';
                    const size = 28;
                    const clipId = `clip-${String(data.name).replace(/\s+/g, '-').toLowerCase()}`;

                    const content = $(`
                        <svg
                            class="annotation annotation-image"
                            xmlns="http://www.w3.org/2000/svg"
                            width="${size}"
                            height="${size}"
                            viewBox="0 0 ${size} ${size}"
                            style="display:block"
                        >
                            <defs>
                                <clipPath id="${clipId}">
                                    <circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}" />
                                </clipPath>
                            </defs>

                            <image
                                href="${imageUrl}"
                                x="0"
                                y="0"
                                width="${size}"
                                height="${size}"
                                clip-path="url(#${clipId})"
                                preserveAspectRatio="xMidYMid slice"
                            />
                        </svg>
                    `);

                    content.appendTo(container);
                    return;
                }

                const content = $(`
                    <svg class="annotation" xmlns="http://www.w3.org/2000/svg">
                        <rect class="border state" x="0" y="0" />
                        <text x="0" y="25" class="state ff-inter" font-size="8">${provCount}</text>
                    </svg>
                `);

                content.appendTo(container);
            },
            tooltipEnabled: false,
            customizeTooltip(e) {
                const name = e.data.name
                const province = provinceCounts.find(a => a.name === name);

                const provCount = province?.count ?? 0;
                const provOsanCount = province?.count_osan ?? 0;
                const osanEntryLabel = $('meta[name="osan-entry-label"]').attr('content') || 'Entri Sintesis';

                const node = $(`<div>
                                    <div class="ff-inter mb-0 fw-semibold">${name}</div>
                                    <div class='ff-inter'>Jumlah Entri: ${provCount}</div>
                                </div>`);

                return {
                    html: node.html(),
                }
            }
        },
        tooltip: {
            enabled: true,
            cornerRadius: 5,
            paddingLeftRight: 8,
            paddingTopBottom: 5,
            font: {
                family: 'Inter',
                color: '#000000',
            },
            contentTemplate(info, container) {
                const name = info.attribute('PROVINSI')
                const province = provinceCounts.find(a => a.name === name);
                const osanEntryLabel = $('meta[name="osan-entry-label"]').attr('content') || 'Entri Sintesis';
                const provCount = province?.count ?? 0;
                const provOsanCount = province?.count_osan ?? 0;
                let template = ``;

                if (Number(provOsanCount) > 0) {
                    // template += `<div class='ff-inter'>Jumlah ${osanEntryLabel}: ${provOsanCount}</div>`;
                }

                $(`<div>
                        <div class="ff-inter mb-0 fw-semibold">${name}</div>
                        <div class='ff-inter'>Jumlah Entri: ${provCount}</div>
                        ${template}
                    </div>`
                ).appendTo(container);
            }
        },
        bounds: [
            93.2436599707,
            -11.3021482815,
            142.8133804713,
            6.9315435648
        ],
        onClick: function (e) {
            const name = e.target.attribute('PROVINSI');
            const provId = allProvinces.find(a => a.etext === name)?.eval ?? 0;
            if (provId == 0) {
                return;
            }

            // Mark agar anotasi provinsi ini tetap disembunyikan
            hiddenAnno.add(name);
            // Kalau DOM sudah ada, sembunyikan sekarang juga
            hideAnnotationByName(name)
            // setTimeout(() => hideAnnotationByName(name), 1);

            const currentUrl = window.location.pathname;
             if (currentUrl.includes('/cari')) {
                // Create a URLSearchParams object to work with the query parameters
                const urlParams = new URLSearchParams(window.location.search);

                // Set or replace the 'provinsi' parameter
                urlParams.set('provinsi', provId);

                // Construct the new URL with the updated query parameters
                const newUrl = `${window.location.origin}${window.location.pathname}?${urlParams.toString()}`;

                // Redirect to the new URL
                window.location.href = newUrl;
            } else {
                let url = $('meta[name="search-prov-uri"]').attr('content');
                url = url.replace("%3Aid", provId);
                window.location.href = url;
            }
        },
        onTooltipShown: function (e) {
            let name = '';
            if (typeof e.target?.attribute === 'function') {
                name = e.target.attribute('PROVINSI');
            }
            $(`.annotation-container[data-province="${name}"]`).parent().addClass('d-none');
            $(`.annotation-container[data-osan-show="${name}"]`).parent().addClass('d-none');
        },
        customizeAnnotation(annotation) {
            if (annotation.data?.variant === 'image') {
                return {
                    width: 16,
                    height: 16,
                    borderWidth: 0,
                    paddingLeftRight: 0,
                    paddingTopBottom: 0,
                    color: 'white',
                };
            }

            return {};
        },
        onTooltipHidden: function(e) {
            let name = '';
            if (typeof e.target?.attribute === 'function') {
                name = e.target.attribute('PROVINSI');
            }

            const province = provinceCounts.find(a => a.name === name);
            const provOsanCount = province?.count_osan ?? 0;

            // reset default annotation (text)
            $(`.annotation-container[data-province="${name}"]`)
                .parent()
                .removeClass('d-none');

            // HANDLE IMAGE VARIANT
            const $osan = $(`.annotation-container[data-osan-show="${name}"], .annotation-container[data-osan-hide="${name}"]`).parent();

            if (Number(provOsanCount) > 0) {
                $osan.removeClass('d-none');
            } else {
                $osan.addClass('d-none');
            }
        },
        onDrawn: function () {
            // Pastikan semua yang ada di hiddenAnno kembali disembunyikan
            hiddenAnno.forEach((name) => hideAnnotationByName(name));
        },
    }
}

const getAdminBreadCrumb = () => {
    const generateBreadcrumb = () => {
        if (
            window.location.pathname.includes('/admin/pengguna/akunku') ||
            window.location.pathname.includes('/admin/sistem/doodle')
        ) {
            return;
        }

        const $breadcrumb = $('ol.breadcrumb');
        $breadcrumb.empty();

        const $active = $('.nav-link.active');
        if (!$active.length) return;

        const url = $active.attr('href')

        const levels = [];

        const cleanText = ($el) => {
            return $el.clone()
                .find('svg, span.nav-icon, use, .badge')
                .remove().end()
                .text().trim();
        };

        const $group = $active.closest('.nav-group');
        if ($group.length) {
            // Inside nav-group
            const groupText = cleanText($group.children('.nav-link.nav-group-toggle'));
            const itemText = cleanText($active);

            if (groupText) levels.push(groupText);
            if (itemText) levels.push(itemText);
        } else {
            // Flat menu
            const flatText = cleanText($active);
            if (flatText) levels.push(flatText);
        }

        // Final page title
        const pageText = $('.page-active').text().trim();
        
        if (pageText) levels.push(pageText);

        // Render levels
        levels.forEach((text, idx) => {
            const isLast = idx === levels.length - 1;
            $breadcrumb.append(`
                <li class="breadcrumb-item ${isLast ? 'active' : 'text-green-500'}">
                    ${url && ! isLast ? 
                        `<a class="text-green-500" href="${url}">${text}</a>` : 
                    `${text}`}
                </li>
            `);
        });
    };
    
    // Observe DOM changes to detect when sidebar gets .active
    const observer = new MutationObserver(() => {
        const $active = $('.nav-link.active');
        if ($active.length) {
            generateBreadcrumb();
            observer.disconnect(); // Only run once after load

            const parentGroup = $active.closest('.nav-group');
            parentGroup.addClass('show');
            parentGroup.find('.nav-group-toggle').removeClass('collapsed');
        }
    });
    
    observer.observe(document.querySelector('aside') || document.body, {
        subtree: true,
        attributes: true,
        attributeFilter: ['class']
    });
}

const initDaterangePicker = (selector = '.daterange', args = {}) => {
    moment.locale('id');
    let config = {
        autoUpdateInput: false,
        locale: {
            format: 'DD MMM YYYY',
            daysOfWeek: ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'],
            monthNames: [
                'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
                'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
            ],
            firstDay: 1
        },
        autoApply: true,
        alwaysShowCalendars: true,
        linkedCalendars: true,
        showDropdowns: true,
        ...args
    }
    
    $(selector).daterangepicker(config)
    .on('apply.daterangepicker', function(ev, picker) {
        $(this).val(picker.startDate.format('DD MMM YYYY') + ' - ' + picker.endDate.format('DD MMM YYYY'))

        // Force calendar view to jump to the end date
        picker.leftCalendar.month = picker.startDate.clone();
        picker.rightCalendar.month = picker.endDate.clone();
        picker.updateCalendars();
    })
    .on('cancel.daterangepicker', function(ev, picker) {
        $(this).val('');
    });
}

const initDatePicker = (selector = '.datepicker', args = {}) => {
    moment.locale('id');
    let config = {
        autoUpdateInput: true,
        singleDatePicker: true,
        locale: {
            format: 'DD/MM/YYYY',
            daysOfWeek: ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'],
            monthNames: [
                'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
                'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
            ],
            firstDay: 1
        },
        autoApply: true,
        alwaysShowCalendars: true,
        linkedCalendars: true,
        showDropdowns: true,
        ...args
    }

    $(selector).daterangepicker(config)
    .on('apply.daterangepicker', function(ev, picker) {
        console.log(config.locale.format);
        
        $(this).val(picker.startDate.format(config.locale.format))
        picker.updateCalendars();
    })
    .on('cancel.daterangepicker', function(ev, picker) {
        $(this).val('');
    }).on('show.daterangepicker', function (ev, picker) {
        const val = $(this).val()
        if (!val) return;

        picker.setStartDate(val);
        picker.setEndDate(val);
        
        // picker.updateCalendars();
    });
}

const listBulan = () => {
    return {
        1: 'Januari', 
        2: 'Februari', 
        3: 'Maret', 
        4: 'April', 
        5: 'Mei', 
        6: 'Juni', 
        7: 'Juli', 
        8: 'Agustus',
        9: 'September', 
        10: 'Oktober', 
        11: 'November', 
        12: 'Desember'
    }
}

const tglIndo = (sqlDateString) => {
    if (!sqlDateString) return '-'

    const [year, month, day] = sqlDateString.split('-').map(Number);
    return `${day} ${monthsIndo()[month]} ${year}`
}

const getDataTableCommonConfig = (options = {}) => {
    return {
        order: [],
        ajax: options.ajax || $('meta[name="datatables-uri"]').attr("content"),
        processing: true,
        searching: false,
        serverSide: true,
        dataSrc: 'data',
        language: {
            processing: "Sedang memuat...",
            emptyTable: "Tidak ada data",
            search: 'Cari: ',
            lengthMenu: "Tampilkan _MENU_ entri",
            info: "Menampilkan _START_ - _END_ dari _TOTAL_ entri",
            infoEmpty: "Menampilkan 0 - 0 dari 0 entri",
            infoFiltered: "(disaring dari _MAX_ total data)",
            paginate: {
            previous: `
                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
                <path d="M10.37 4.31027L5.70333 8.97693L10.37 13.6436" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            `,
            next: `
                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
                <path d="M6.63 4.31027L11.2967 8.97693L6.63 13.6436" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            `
            }
        },
        paginate: {
            previous: `
              <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
                <path d="M10.37 4.31027L5.70333 8.97693L10.37 13.6436" stroke="#141C25" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            `,
            next: `
              <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
                <path d="M6.63 4.31027L11.2967 8.97693L6.63 13.6436" stroke="#141C25" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            `
        }
    }
}

function showAlert(message, type = 'success') {
    let alertId = 'alert-' + new Date().getTime();
    let alertHtml = ''
    let background = ''
    let icon = ''
    let label = ''

    if (type == 'success') {
        label = 'Berhasil';
        icon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM17.5607 9.06066C17.8536 8.76777 17.8536 8.29289 17.5607 8C17.2678 7.70711 16.7929 7.70711 16.5 8L10.0303 14.4697L7.56066 12C7.26777 11.7071 6.79289 11.7071 6.5 12C6.20711 12.2929 6.20711 12.7678 6.5 13.0607L9.5 16.0607C9.79289 16.3536 10.2678 16.3536 10.5607 16.0607L17.5607 9.06066Z" fill="#10B978"/>
            </svg>`;
        background = `var(--Success-50, #ECFDF5)`;
    } else if (type == 'error') {
        label = 'Gagal';
        icon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM12.75 7C12.75 6.58579 12.4142 6.25 12 6.25C11.5858 6.25 11.25 6.58579 11.25 7V13C11.25 13.4142 11.5858 13.75 12 13.75C12.4142 13.75 12.75 13.4142 12.75 13V7ZM12.5675 17.5006C12.8446 17.1927 12.8196 16.7185 12.5117 16.4414C12.2038 16.1643 11.7296 16.1893 11.4525 16.4972L11.4425 16.5083C11.1654 16.8162 11.1904 17.2904 11.4983 17.5675C11.8062 17.8446 12.2804 17.8196 12.5575 17.5117L12.5675 17.5006Z" fill="#FF4D4D"/>
        </svg>`;

        background = `var(--Error-50, #FFE5E5)`;
    }

    alertHtml = 
        `<div id="${alertId}" class="d-flex gap-2 justify-content-start custom-alert alert alert-dismissible" role="alert"
            style="
                border: none;
                border-radius: var(--radius-l, 12px);
                background: ${background};
            ">
           ${icon}
    
            <div> 
                <h1 class="fz-16px fw-bold mb-1">${label}</h1>
                <p class="mb-0">${message}</p>
            </div>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>`;

    $('#alert-container').append(alertHtml);

    let alertElement = $('#' + alertId);

    alertElement.on('closed.bs.alert', function () {
        $(this).remove();
    });

    setTimeout(() => {
        alertElement.fadeOut(500, function () {
            $(this).remove();
        });
    }, 3000);
}

const entryTypeBadge = (label, colorKey) => {
    const colors = {
        orange: { hex: '#D35400', rgb: '211, 84, 0' },
        blue: { hex: '#3498DB', rgb: '52, 152, 219' },
        green: { hex: '#16A085', rgb: '22, 160, 133' },
        purple: { hex: '#8E44AD', rgb: '142, 68, 173' },
        yellow: { hex: '#F1C40F', rgb: '241, 196, 15' },
        red: { hex: '#E74C3C', rgb: '231, 76, 60' },
        dark: { hex: '#34495E', rgb: '52, 73, 94' }
      };
      
      const selected = colors[colorKey] || colors.orange;
      const background = `rgba(${selected.rgb}, 0.10)`;
      const fill = selected.hex;
 
      return `
        <span
                style="border-radius: var(--radius-xs, 6px); background: ${background}; padding: 2px 10px 2px 6px;"
                class="fz-14px d-inline-flex justify-items-center"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="19" viewBox="0 0 18 19" fill="none">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M12 9.90503C12 11.5619 10.6569 12.905 9 12.905C7.34315 12.905 6 11.5619 6 9.90503C6 8.24818 7.34315 6.90503 9 6.90503C10.6569 6.90503 12 8.24818 12 9.90503Z"
                        fill="${fill}" />
                </svg>
                <span class="text-nowrap">${label}</span>
            </span>

      `
}

const fireSwalConfirm = ({onConfirm, onCancel, heading, desc}) => {
    Swal.fire({
        html: `
            <div class="d-flex flex-column align-items-center gap-3">
                <div class="d-flex justify-content-center align-items-center bg-warning rounded-circle pb-20px" style="height: 48px; width: 48px;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                        <path d="M14 9.33333V14M14 18.6667H14.0117M24.5 14C24.5 19.799 19.799 24.5 14 24.5C8.20101 24.5 3.5 19.799 3.5 14C3.5 8.20101 8.20101 3.5 14 3.5C19.799 3.5 24.5 8.20101 24.5 14Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
                <div class="mt-2 text-center">
                    <p class="mb-2 fw-semibold">${heading}</p>
                    <p class="fz-14px">${desc}</p>
                </div>
                <div class="d-flex gap-2 w-100">
                    <a id="cancelBtn" href="javascript:void(0)" class="flex-fill btn btn-outline-primary rounded-10px py-10px px-sm-12px px-lg-20px">
                        Batal
                    </a>
                    <a id="confirmBtn" href="javascript:void(0)" class="flex-fill btn btn-primary rounded-10px py-10px px-sm-12px px-lg-20px">
                        Lanjut
                    </a>
                </div>
            </div>
        `,
        showConfirmButton: false,
        showCancelButton: false,
        customClass: {
            popup: 'p-4'
        },
        didOpen: () => {
            document.activeElement.blur();
            document.getElementById('confirmBtn').addEventListener('click', function () {
                Swal.close();
                if (onConfirm) {
                    onConfirm()
                }
            });
    
            document.getElementById('cancelBtn').addEventListener('click', function () {
                Swal.close();
                if (onCancel) {
                    onCancel()
                }
            });
        }
    });
}

const lineChartConfig = ({dataLabel, datasetData, canvasId}) => {
    let cv = document.getElementById(canvasId);
    let ctx = cv.getContext('2d');
    
    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, 'rgba(86, 171, 162, 0.3)');
    gradient.addColorStop(1, 'rgba(86, 171, 162, 0)');
    
    return {
        type: 'line',
        data: {
            labels: dataLabel,
            datasets: [{
                label: 'Total',
                backgroundColor: gradient,
                borderColor: '#56AB91',
                pointBackgroundColor: '#56AB91',
                pointBorderColor: '#fff',
                pointRadius: 4,
                pointBorderWidth: 1,
                borderWidth: 1,
                tension: 0.4,
                data: datasetData
            }]
        },
        options: {
            legend: {
                position: 'bottom',
                labels: {
                    usePointStyle: true,
                    fontSize: 12,
                    padding: 20
                }
            },
            maintainAspectRatio: false,
            responsive: true,
            bezierCurve : false,
            elements: {
                line: {
                    tension: 0
                }
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        callback: function(value) {
                            return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                        }
                    }
                }]
            },
            layout: {
                padding: {
                    bottom: 0
                }
            },
            events: ['mousemove', 'mouseout', 'click', 'touchstart', 'touchmove'],
            onClick: function (element, dataAtClick) {
                console.log(element, dataAtClick);
            }
        }
    }
}

const getFormSkeleton = (inputCount, textareaCount = 0) => {
    let formFields = '';

    for (let i = 0; i < inputCount; i++) {
        formFields += `
            <span class="placeholder rounded col-4 mb-2 d-block"></span>
            <span class="placeholder rounded col-12 form-control mb-3 d-block" style="height: 38px;"></span>
        `;
    }

    for (let i = 0; i < textareaCount; i++) {
        formFields += `
            <span class="placeholder rounded col-4 mb-2 d-block"></span>
            <span class="placeholder rounded col-12 form-control mb-3 d-block" style="height: 80px;"></span>
        `;
    }

    return `
        <form>
            <div class="form-group mb-2">
                ${formFields}
            </div>
            <div class="d-flex gap-2">
                <span class="placeholder rounded btn btn-primary disabled w-100"></span>
                <span class="placeholder rounded btn btn-primary disabled w-100"></span>
            </div>
        </form>
    `;
};

function togglePassword(inputSelector, iconWrapper) {
    const input = $(inputSelector);
    const icon = $(iconWrapper);

    if (input.attr('type') === 'password') {
        input.attr('type','text');
        icon.html(`
        <svg xmlns="http://www.w3.org/2000/svg" fill="none"  width="16px" height="16px" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
        </svg>`)
    } else {
        input.attr('type','password');
        icon.html(`
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="16px" height="16px" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
        <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        </svg>
        `);
    }
}

function normalizeReportUrl(rawUrl) {
    const currentOrigin = window.location.origin;

    try {
        // Kalau absolute URL
        const url = new URL(rawUrl);
        const slug = url.pathname.replace(/^\/+/, '');
        return `${currentOrigin}/${slug}`;
    } catch {
        // Kalau relative URL
        const slug = rawUrl.replace(/^\/+/, '');
        return `${currentOrigin}/${slug}`;
    }
}
