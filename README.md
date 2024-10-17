# Substantive Research Tech Test

## The task:    
Substantive Research’s clients provide payment information from their contracts and agreements with market data providers, such as index providers and ratings agencies. Substantive Research applies internal algorithms to these payments and returns price benchmarks for each client’s unique provider usage so they can see whether they are over-paying or under-paying for products.

Clients may have multiple products with a provider, sometimes in different currencies, and each product may span variable length yearly payments.
We have created a mock API to retrieve this data for one client and another API to return currency exchange rates. We explain both the structure of the APIs and how to retrieve them below.

## Approach:

- Using figma's figjam, I started out writing out the task and breaking it down into smaller tasks to make sure I understood what I had to do. I created a simple wire frame to help me figure out the structure of the website. This also showed what components would be needed which made it easier later on when creating the folder structure.   
- I also created a kanban board to help me manage and keep track of the tasks I had set.
- Research wise, I looked at how to use Chart.js to display the data in a line graph.

## Improvements:
- Have the Over budget change to a red text and Under budget to green as a clear visual indicator.
- Look for a better table option instead of html for better responsiveness.
- The figures in the table could be formatted a little clearer so that it reads x,xxx,xxx.xx
- Might be nice to have a table with the provider and a breakdown of all the products with their payments and benchmark figures.
- Have a better loading screen when waiting for data to be retrieved.
  

### Tech stack used:
- Javascript
- React
- css

## How to run project: 

Install dependencies:

### `npm install chart.js react-chart-js-2 `

In the project directory, you can run:

### `npm start`

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

