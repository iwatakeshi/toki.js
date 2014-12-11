toki.js
=======

The most basic and hack-able calendar for the web. Uses pure javascript and is bootstrap ready.


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

##Month

@Set Sets the month with ranges from 0 - 11

@Return Returns the global month name in String

```js
Month([month Number])

```
##Day

@Set Sets the day of the current month

@Return Returns global day

```js
Day([day Number])
```
##Year

@Set Sets the year.

@Return Returns global year

```js
Year([year Number])
```

##Date

@Set Sets the date.

@Returns (not implemented)

```js
Date([month Number], [day Number], [year Number]);
```

##Reset

@Call Resets the date.

```js
Reset();
```

##Locale

@Set Set's the locale.

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

###Other Methods

###
