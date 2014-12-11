toki.js
=======

The most basic and hack-able calendar for the web. Uses pure javascript and is Bootstrap ready.


#Usage

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
#API

##Month()

@description: Sets the month with ranges from 0 - 11

@return: Returns the global month name in String

```js
Month([month Number])

```
##Day()

@description: Sets the day of the current month

@return: Returns global day

```js
Day([day Number])
```
##Year()

@description: Sets the year.

@return: Returns global year

```js
Year([year Number])
```

##Date()

@description: Sets the date.

@return: (not implemented)

```js
Date([month Number], [day Number], [year Number]);
```

##Reset()

@description: Resets the date.

```js
Reset();
```

##Locale()

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


###Static API

####isLeapYear()

@description: Checks if the given year is a leap year.

@return Returns a Boolean for a given year.

```js
isLeapYear([year Number]);
```

####weeksInMonth()

@description: see @return

@return Returns the number of weeks for a given month and year

```js
weeksInMonth([month Number], [year Number]);
```

####daysInMonth()

@description: see @return

@return Returns the number of days for a given month and year

```js
daysInMonth([month Number], [year Number]);
```

####firstDayOfMonth()

@description: see @return

@return Returns the first day (index of weekday) for a given month and year.

```js
firstDayOfMonth([month Number], [year Number]);
```
####lastDayOfMonth()

@description: see @return

@return Returns the last day (index of weekday) for a given month and year.

```js
lastDayOfMonth([month Number], [year Number]);
```
####weekOfMonth()

@description: see @return

@return Returns the current week for a given month, day, and year.

```js
weekOfMonth([month Number], [day Number], [year Number]);
```
