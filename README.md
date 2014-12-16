toki.js
=======

The most basic and hack-able calendar for the web. Uses pure javascript and is Bootstrap ready.

Toki also supports locales. The following are supported:

* en
* en-us
* ja
* af
* see Locales to add more!

Sample Express app @ https://tokijs.herokuapp.com

Note: The site is powered by an i18n library called [gengo.js](https://www.github.com/iwatakeshi/gengojs). Therefore, it will translate it into your language if available. If you want to translate it, simply fork the site [here](https://www.github.com/iwatakeshi/toki.js-site)

###Usage

1. Include toki into your project
  
  ```html
  <!-- ... -->
  <script src='.../toki.js'></script>
  
  ```
2. Add a div with id = 'toki'
  
  ```html
  <body>
    <div id='toki'></div>
  </body>
  ```
3. Initialize
  
  ```html
  <script>
    var t = toki('toki', {/*options*/})
  </script>
  ```

**Note:** toki.js can be initialize without any arguments. When done so, toki assumes that a div with an id='toki' will exist. It will also initialize with the default options.

###API
|Method   |Description  |Return   |Args |
|---------|-------------|---------|--------|
|`Month()`|Sets the month with ranges from 0-11|Returns the global month in Number.    |`(month:Number)` 
|`MonthName()`|         |Returns the name of the month given or the global month in String. |`(month:Number)`
|`MonthNames()`|        |Returns an array of months set to the global locale.| `(length:String)`
|`Day()`|Sets the day of the current month|Returns global day in Number.|`(day:Number)`
|`DayNames()`|          |Returns an array of days set to the global locale in String.| `(length:String)`
|`Year()`|Sets the year.|Returns the global year in Number.|`(year:Number)`
|`YearName()`|          |Returns the name of the given or the global year in String.| `(year:Number)`
|`WeekdayName`|         |Returns the name of the given weekday or the current month's weekday in String.|`(weekday:Number)`
|`WeekdayNames`|         |Returns an array of weekdays set to the global locale in String.|`(length:String)`
|`Date()`|Sets the date.|         |`(month:Number, day:Number, year:Number)`
|`Reset()`|Resets the date.|          |
|`Locale()`|Sets the locale.|          |`(lang:String,length:String)`
|`FirstDayOfWeek`|Sets the calendar to start from the given weekday in range 0-6.| Returns the current starting weekday in Number.| `(weekday:Number)`

###Static API
|Method   |Description  |Returns  |Args    |
|---------|-------------|---------|--------|
|`isLeapYear()`|Checks if the given year is a leap year.| Boolean | `(year:Number)`
|`weeksInMonth()`|      |Returns the number of weeks for a given month and year or the global date in Number| `(month:Number, year:Number)`
|`daysInMonth()`|       |Returns the number of days for a given month and year or the global date in Number.| `(month:Number, year:Number)`
|`firstDayOfMonth()`|         |Returns the first day (index of weekday) for a given month and year| `(month:Number, year:Number)`
|`weekOfMonth()`|         |Returns the current week for a given month, day, and year or the global date in Number| `(month:Number, day:Number, year:Number)`
|`defineLocale()`| Used to import locales. See Locales|       |`(lang:String, locale:Object)`

###Options

##### `fullHeading`: `Boolean` 

@description: Displays the month and year in a singe row or in it's own row.

@default: `false`

##### `bootstrap`: `Boolean`

@description: Enables to table to work with bootstrap by appending the necessary class names.

@default: `false`

##### `hover`: `Boolean`

@description: Enables the table to be hoverable when boostrap is enabled.

@default: `false`

##### `debug`: `Boolean`

@description: Enables developers to use the `debug` method for debugggin purposes.

@default: `false`

##### `locale`: `Object`

@description: Changes the language and/or the length of the displayed date.

@default:
  
```js
  {
    lang: 'en',
    length: 'long'
  }
```

###Locales

toki.js allows you to create your own locale plugin. See the [gist](https://gist.github.com/iwatakeshi/1ff6650aa3ee20106d85) for a template.

###CSS

toki.js is very hackable when it comes to css. Most of toki's rows and columns have ids and classes which makes it customizable all around.

toki.js follows the normal table creation standards, meaning the hierarchy looks like so:

```html
<div id="toki">
  <table id="toki-cal-root">
    <thead id="toki-cal-head">
      <!--if fullHeading:true -->
      <tr id="toki-cal-heading">
        <td id="toki-month"></td>
        <td id="toki-year"></td>
      </tr>
      <!--end if -->
      <!--if fullHeading: false -->
        <tr id="toki-heading-month">
          <td id="toki-month"></td>
        </tr>
        <tr id="toki-heading-year">
          <td id="toki-year"></td>
        </tr>
      <!--end if-->
    </thead>
    <tbody id="toki-cal-body">
      <tr id="toki-weekdays">
        <!--The weekdays go here in the following format:
          <td id="toki-weekday-[name of weekday]"></td>
          ...
         -->
      </tr>
      <!-- The weeks go here in the following format:
        <tr id="toki-week-[number of week (integer)]">
          The days go below in the following format:
          <td id="toki-day-[number of day (integer)]"></td>
          ...
        </tr>
        ...
      -->
    </tbody>
  </table>
</div>
```

If you would like to access the current 'time/date', the following classes are available:

```css

.toki.month.now{
  /*...*/
}

.toki.day.now{
  /*...*/
}

.toki.day.changed{
  /*...*/
}

.toki.year.now{
  /*...*/
}

.toki.weekday.now{
  /*...*/
}

.toki.week.now{
  /*...*/
}

.toki.week.changed{
  /*...*/
}
```