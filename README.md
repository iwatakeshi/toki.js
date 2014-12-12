toki.js
=======

The most basic and hack-able calendar for the web. Uses pure javascript and is Bootstrap ready.


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

####Month()

@description: Sets the month with ranges from 0 - 11

@return: Returns the global month name in String

```js
Month([month Number])

```
####Day()

@description: Sets the day of the current month

@return: Returns global day

```js
Day([day Number])
```
####Year()

@description: Sets the year.

@return: Returns global year

```js
Year([year Number])
```

####Date()

@description: Sets the date.

@return: (not implemented)

```js
Date([month Number], [day Number], [year Number]);
```

####Reset()

@description: Resets the date.

```js
Reset();
```

####Locale()

@description: Set's the locale.

```js
Locale([lang String],[length String]);
//example of lang:
/*
  * en
  * ja
*/

//example of length
/*
  * long
  * short
  * min
*/

```


#####Static API

######isLeapYear()

@description: Checks if the given year is a leap year.

@return Returns a Boolean for a given year.

```js
isLeapYear([year Number]);
```

######weeksInMonth()

@description: see @return

@return Returns the number of weeks for a given month and year

```js
weeksInMonth([month Number], [year Number]);
```

######daysInMonth()

@description: see @return

@return Returns the number of days for a given month and year

```js
daysInMonth([month Number], [year Number]);
```

######firstDayOfMonth()

@description: see @return

@return Returns the first day (index of weekday) for a given month and year.

```js
firstDayOfMonth([month Number], [year Number]);
```
######lastDayOfMonth()

@description: see @return

@return Returns the last day (index of weekday) for a given month and year.

```js
lastDayOfMonth([month Number], [year Number]);
```
######weekOfMonth()

@description: see @return

@return Returns the current week for a given month, day, and year.

```js
weekOfMonth([month Number], [day Number], [year Number]);
```

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

.toki.year.now{
  /*...*/
}

.toki.weekday.now{
  /*...*/
}

.toki.week.now{
  /*...*/
}
```