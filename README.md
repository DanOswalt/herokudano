# 301portfolio

Refactoring notes for Class-09

1. Everything I had was in one JS file. I have separated out my ProjectModule, ViewHandler, and project objects into their own files.

2. I have been trying to treat my ViewHandler as the object that handles UI aspects, and keeping data manipulation in the ProjectModule object. I refactored some of the functionality where this wasn't quite true, where some things that updated what was on the page were moved to the ViewHandler from the ProjectModule.

3. Everything was already IIFE-wrapped, so that was good-to-go.

4. One more major thing I did was move my two handlebars templates into their own files, and grab them with an ajax call. This required more work than I had expected in order to get things called in the right order. 
