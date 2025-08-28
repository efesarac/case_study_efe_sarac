# ebebek Case Study

This repository contains my solution for the case study.  
The project is developed using **only JavaScript**, without any external libraries.  
The code runs inside Chrome DevTools console or as a Snippet.

## How to Run
1. Open [ebebek homepage](https://www.e-bebek.com/)  
2. Open Chrome DevTools → **Sources > Snippets**  
3. Create a new snippet file called `case_study.js`  
4. Copy-paste the code from this repo into the snippet  
5. Run the snippet 

## Features Implemented
- Runs only on ebebek homepage (`wrong page` guard)  
- Fetches product JSON on first run, then caches in `localStorage`  
- Builds HTML and CSS structure entirely with JavaScript  
- Displays a skeleton carousel section with styles  
- LocalStorage helper functions ready for favorites  
- Clear code structure, single JS file

## Missing / To-Do
- Product rendering (cards with image, title, price)  
- Favorite button toggle logic  
- Previous/Next buttons for navigation  
- Dots/pagination  
- Discount percentage badge  
- Pixel-perfect responsiveness and styling  

## Notes
- No 3rd party libraries used  
- Code is self-written and publicly available here  