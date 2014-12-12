/*jslint node: true, forin: true, jslint white: true, newcap: true*/
/*
 * toki
 * author : Takeshi Iwana
 * https://github.com/iwatakeshi
 * license : MIT
 * Code heavily borrowed from Adam Draper
 * https://github.com/adamwdraper
 */

(function() {

    var toki,
        version = '0.0.1',
        //global month, day, year
        global = {
            month: new Date().getMonth(),
            day: new Date().getDate(),
            year: new Date().getFullYear()
        },
        month_name,
        month_names = {
            'en': {
                long: 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
                short: 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sept_Oct_Nov_Dec'.split('_'),
                min: 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sept_Oct_Nov_Dec'.split('_')
            },
            'ja': {
                long: '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
                short: '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
                min: '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_')
            }
        },
        weekday_name,
        weekday_names = {
            'en': {
                long: 'Sunday_Monday_Tuesday_Wednsday_Thursday_Friday_Saturday'.split('_'),
                short: 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
                min: 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
            },
            'ja': {
                long: '日曜日_月曜日_火曜日_水曜日_木曜日_金曜日_土曜日'.split('_'),
                short: '日_月_火_水_木_金_土'.split('_'),
                min: '日_月_火_水_木_金_土'.split('_'),
            }
        },
        year_name,
        year_names = {
            'en': {
                format: '%s'
            },
            'ja': {
                format: '%s年'
            }
        },
        day_count = [0, 1, 2, 3, 4, 5, 6],
        defaults = {
            fullHeading: false,
            bootstrap: false,
            hover: false,
            debug: true,
            locale: {
                lang: 'en',
                length: 'long'
            }
        },
        opts,
        hasModule = (typeof module !== 'undefined' && module.exports);

    /*
        Helpers
     */
    function error(message, filename, linenumber) {
        if (message) {
            return new Error(message);
        }
        if (message && filename) {
            return new Error(message, filename)
        }
        if (message && filename && linenumber) {
            return new Error(message, filename, linenumber);
        }

    }

    function debug() {
        if (opts.debug) {
            console.log.apply(console, arguments);
        }
    }

    function find(node, id) {
        var parent = node;
        if (parent.childNodes.length >= 1) {
            for (var count = 0; count < parent.childNodes.length; count++) {
                if (parent.childNodes[count].id == id) {
                    return parent.childNodes[count];
                }
            }
        } else {
            return undefined;
        }

    }

    function locale(lang, length) {
        if (lang) {
            if (length) {
                month_name = month_names[lang][length];
                weekday_name = weekday_names[lang][length];
                year_name = year_names[lang].format;
            } else {
                month_name = month_names[lang][defaults.locale.length];
                weekday_name = weekday_names[lang][defaults.locale.length];
                year_name = year_names[lang].format;
            }
        }
    }

    function sprintf(format) {
        var arg = arguments;
        var i = 1;
        return format.replace(/%((%)|s)/g, function(m) {
            return m[2] || arg[i++]
        });
    }
    /*
        Constructor
     */
    function Toki(div, opt) {

        if (typeof div === String) {
            this.element = document.getElementById(div);
            opts = opt || defaults;
        } else {
            this.element = document.getElementById('toki');
            opts = div || defaults;
        }

        //check locale
        if (!opts.locale) {
            opts.locale = defaults.locale;
        }

        locale(opts.locale.lang, opts.locale.length);

        this.calendar = document.createElement('table');

        if (opts.bootstrap) {
            this.calendar.className = 'table table-responsive'
        }

        if (opts.hover) {
            this.calendar.className += ' table-hover';
        }

        //set id
        this.calendar.id = 'toki-cal-root';

        this.calendar.appendChild(calendar().thead);
        this.calendar.appendChild(calendar().tbody);
        this.element.appendChild(this.calendar);

    }

    /**
     * Main function
     * @type {String or Object} div or opt
     * @type {Object} opt
     */
    toki = function(div, opt) {
        return new Toki(div, opt);
    };

    /*
        Build Calendar
     */
    function calendar() {
        /*
         * Headings
         */
        var thead = document.createElement('thead');

        //set id
        thead.id = 'toki-cal-head'

        //apply heading
        if (opts.fullHeading) {
            //create heading for both Month and Year
            thead.tr = document.createElement('tr');

            thead.tr.td = {};

            thead.tr.td.month = document.createElement('td');
            thead.tr.td.year = document.createElement('td');

            //set id
            thead.tr.id = 'toki-heading';
            thead.tr.td.month.id = 'toki-month';
            thead.tr.td.year.id = 'toki-year';

            //set class for current year and month
            if (global.year === new Date().getFullYear()) {
                thead.tr.td.year.className = 'toki year now';
            }
            if (global.month === new Date().getMonth()) {
                thead.tr.td.month.className = 'toki month now';
            }

            //set heading
            thead.tr.td.month.appendChild(document.createTextNode(month_name[global.month]));
            thead.tr.td.year.appendChild(document.createTextNode(sprintf(year_name, global.year)));

            //append heading to tr
            thead.tr.appendChild(thead.tr.td.month);
            thead.tr.appendChild(thead.tr.td.year);

            //append to the head
            thead.appendChild(thead.tr);
        } else {

            //create heading for Month

            thead.tr = {
                month: document.createElement('tr'),
                year: document.createElement('tr')
            };

            thead.tr.month.td = document.createElement('td');
            thead.tr.year.td = document.createElement('td');

            //set id
            thead.tr.month.id = 'toki-heading-month';
            thead.tr.year.id = 'toki-heading-year';

            //set the class for the current year and month
            if (global.year === new Date().getFullYear()) {
                thead.tr.year.td.className = 'toki year now';
            }
            if (global.month === new Date().getMonth()) {
                thead.tr.month.td.className = 'toki month now';
            }

            //set id for all month and year
            thead.tr.month.td.id = 'toki-month';
            thead.tr.year.td.id = 'toki-year';

            thead.tr.month.td.appendChild(document.createTextNode(month_name[global.month]));
            thead.tr.year.td.appendChild(document.createTextNode(global.year));

            //append heading to tr
            thead.tr.month.appendChild(thead.tr.month.td);
            thead.tr.year.appendChild(thead.tr.year.td);

            //append to the head
            thead.appendChild(thead.tr.month);
            thead.appendChild(thead.tr.year);
        }

        /*
         * Body
         */
        var tbody = document.createElement('tbody');
        var tr = {
            weekdays: document.createElement('tr'),
            weeks: {},
            days: {}
        };

        //set id
        tbody.id = 'toki-cal-body';

        tr.weekdays.id = 'toki-weekdays';

        /*
            Set Weekdays
         */

        tr.weekdays.td = {};
        var weekdays = ['sunday', 'monday', 'tuesday', 'wednsday', 'thursday', 'friday', 'saturday'];
        day_count.forEach(function(weekday) {
            tr.weekdays.td[weekdays[weekday]] = document.createElement('td');
            if (weekday === day_count[new Date().getDay() - 1]) {
                tr.weekdays.td[weekdays[weekday]].className = 'toki weekday now';
            }
            tr.weekdays.td[weekdays[weekday]].id = 'toki-weekday-' + weekdays[weekday];
            tr.weekdays.td[weekdays[weekday]].appendChild(document.createTextNode(weekday_name[weekday]));
            tr.weekdays.appendChild(tr.weekdays.td[weekdays[weekday]]);
        });


        /*
            Set weeks
         */
        var weeks = [];
        for (var count = 1; count <= toki.weeksInMonth(global.month, global.year); count++) {
            tr.weeks['week_' + count] = document.createElement('tr');
            tr.weeks['week_' + count].id = 'toki-week-' + count;
            weeks.push(tr.weeks['week_' + count]);
        }

        /*
            Set days
         */

        //fill array from 1 to daysInMonth()
        var days = [];
        for (var count = 1; count <= toki.daysInMonth(global.month, global.year); count++) {
            days.push(count);
        }

        //fill the days
        var days_dom = [];
        for (var day = 1; day < days.length + 1; day++) {
            tr.days['day_' + day] = document.createElement('td');
            if (day === global.day) {
                tr.days['day_' + day].className = 'toki day now';
            }
            tr.days['day_' + day].id = 'toki-day-' + day;
            tr.days['day_' + day].appendChild(document.createTextNode(day));
            //store them into an array
            days_dom.push(tr.days['day_' + day]);
        }

        /*
            Construct the body
         */
        var week = 0;
        var day = 0;
        var weeksInMonth = toki.weeksInMonth(global.month, global.year);
        weeks.forEach(function(item, index) {
            var week = index + 1;

            if (week < weeksInMonth) {
                //first week
                if (index === 0) {
                    //seven days in a week
                    for (var count = 0; count < 6; count++) {
                        var firstDay = toki.firstDayOfMonth(global.month, global.year).getDate();
                        if (count < firstDay) {
                            item.appendChild(document.createElement('td'));
                        }

                        if (count === firstDay) {
                            while (day < count) {
                                item.appendChild(days_dom[day++]);
                            }
                        }

                        if (count > firstDay) {
                            while (day <= count) {
                                item.appendChild(days_dom[day++]);
                            }
                        }
                    }
                }
                //second week
                if (index === 1) {
                    while (day < (7 * week) - 1) {
                        item.appendChild(days_dom[day++]);
                    }
                }

                //third week
                if (index === 2) {
                    while (day < (7 * week) - 1) {
                        item.appendChild(days_dom[day++]);
                    }
                }
                //fourth week
                if (index === 3) {
                    while (day < (7 * week) - 1) {
                        item.appendChild(days_dom[day++]);
                    }
                }
            }

            if (week === weeksInMonth) {
                while (day < (7 * week) - 1) {
                    var finalDays = days_dom[day++];
                    if (finalDays !== undefined) {
                        item.appendChild(finalDays);
                    } else {
                        item.appendChild(document.createElement('td'))
                    }
                }
            }

            if (week == toki.weekOfMonth(global.year, global.month, global.day)) {
                item.className = 'toki week now';
            }
            week++;

        });

        tbody.appendChild(tr.weekdays);
        for (var key in tr.weeks) {
            if (tr.weeks.hasOwnProperty(key)) {
                tbody.appendChild(tr.weeks[key]);
            }
        }

        return {
            thead: thead,
            tbody: tbody
        };
    };

    Toki.prototype.Month = function(month) {

        //compare to undefined because '0' can be considered as default
        switch (month === undefined) {
            case false:
                global.month = month;
                this.Date();
                return month_name[global.month];
            default:
                return month_name[global.month];
        }
    };

    Toki.prototype.Day = function(day) {
        switch (!day) {
            case false:
                global.day = day;
                this.Date();
                return global.day;
            default:
                return global.day;
                break;
        }
    };

    Toki.prototype.Year = function(year) {

        switch (!year) {
            case false:
                global.year = year;
                this.Date();
                return global.year;
            default:
                return global.year;
        }
    };

    Toki.prototype.Date = function(month, day, year) {
        var cal = this.calendar;

        if(month){
            global.month = month;
        }

        if(day){
            global.day = day;
        }

        if(year){
            global.year = year;
        }

        //update
        if (opts.fullHeading) {
            var dom_month = ['toki-cal-head', 'toki-heading', 'toki-month'];
            var dom_year = ['toki-cal-head', 'toki-heading', 'toki-year'];
            //remove
            find(find(cal, dom_month[0]), dom_month[1]).removeChild(find(find(find(cal, dom_month[0]), dom_month[1]), dom_month[2]));
            find(find(cal, dom_year[0]), dom_year[1]).removeChild(find(find(find(cal, dom_year[0]), dom_year[1]), dom_year[2]));
            cal.removeChild(find(cal, 'toki-cal-body'));
            //append
            find(find(cal, dom_month[0]), dom_month[1]).appendChild(calendar().thead.tr.td.month);
            find(find(cal, dom_year[0]), dom_year[1]).appendChild(calendar().thead.tr.td.year);
            cal.appendChild(calendar().tbody);
        } else {

            var dom_month = ['toki-cal-head', 'toki-heading-month', 'toki-month'];
            var dom_year = ['toki-cal-head', 'toki-heading-year', 'toki-year'];

            //remove
            find(find(cal, dom_month[0]), dom_month[1]).removeChild(find(find(find(cal, dom_month[0]), dom_month[1]), dom_month[2]));
            find(find(cal, dom_year[0]), dom_year[1]).removeChild(find(find(find(cal, dom_year[0]), dom_year[1]), dom_year[2]));
            cal.removeChild(find(cal, 'toki-cal-body'));
            //append
            find(find(cal, dom_month[0]), dom_month[1]).appendChild(calendar().thead.tr.month.td);
            find(find(cal, dom_year[0]), dom_year[1]).appendChild(calendar().thead.tr.year.td);
            cal.appendChild(calendar().tbody);
        }

    };

    Toki.prototype.Reset = function() {
        this.Month(new Date().getMonth());
        this.Day(new Date().getDate());
        this.Year(new Date().getFullYear());
    };

    Toki.prototype.Locale = function(lang, length) {
        locale(lang, length);
        this.Date();
    };

    toki.isLeapYear = function(year) {
        switch (!year) {
            case false:
                return (year % 400) ? ((year % 100) ? ((year % 4) ? false : true) : false) : true;
            default:
                return (global.year % 400) ? ((global.year % 100) ? ((global.year % 4) ? false : true) : false) : true;

        }
    };

    toki.weeksInMonth = function(month, year) {
        var firstOfMonth = new Date(year, month, 1);
        var lastOfMonth = new Date(year, month, 0);

        var used = firstOfMonth.getDay() + lastOfMonth.getDate();

        return Math.ceil(used / 7);
    };

    toki.daysInMonth = function(month, year) {

        return [31, (toki.isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month]
    };

    toki.firstDayOfMonth = function(month, year) {
        return new Date(year, month, 1);
    };

    toki.lastDayOfMonth = function(month, year) {
        return new Date(year, month + 1, 0);
    };

    toki.weekOfMonth = function(month, day, year) {
        var date = new Date(year, month, day),
            _day = date.getDate();

        _day += (date.getDay() == 0 ? 0 : 7 - date.getDay());

        return Math.ceil(parseFloat(_day) / 7);
    };

    /************************************
      Exposing toki
  ************************************/

    // CommonJS module is defined
    if (hasModule) {
        module.exports = toki;
    }

    /*global ender:false */
    if (typeof ender === 'undefined') {
        // here, `this` means `window` in the browser, or `global` on the server
        // add `toki` as a global object via a string identifier,
        // for Closure Compiler 'advanced' mode
        this.toki = toki;
    }

    /*global define:false */
    if (typeof define === 'function' && define.amd) {
        define([], function() {
            return toki;
        });
    }
}).call(this);