const climate_daly_data = [
    {region: 'Low-and-middle-income countries of the African Region', deaths: .57},
    {region: 'Low-and-middle-income countries of the Americas', deaths: 2},
    {region: 'Low-and-middle-income countries of the Eastern Mediterranean Region', deaths: 20},
    {region: 'Low-and-middle-income countries of the European Region', deaths: .67},
    {region: 'Low-and-middle-income countries of the South-East Asia Region', deaths: 58},
    {region: 'Low-and-middle-income countries of the Western Pacific Region', deaths: 4},
    {region: 'High income countries', deaths: 23}
]

//1 - select DOM to bind data to
const divSelection = d3.select('div#viz')
divSelection.selectAll('div')
    //2 - bind daly data to selection (placeholder phase) {{the current divs are hypothetical placeholders, not actual DOM els}}
    .data(climate_daly_data)
    //3 - generate and append actual DOM elements to replace placeholder selection/ divs
    .enter()//checks the length, n, of our data array & returns it as an argument for append to generate n DOM els
    .append('div')
    //4 - style the bars
    .attr('class', 'bar')
    //5 - use data to customize width of bars
    .style(
        'width',
        d => `${d.deaths * 20}px`
    )

//5 - create legend list
const listSelection = d3.select('ol#legend')
listSelection.selectAll('li')
    .data(climate_daly_data)
    .enter()
    .append('li')
    //6 - add text to generate list items
    .text(d => `${d.region}: ${d.deaths}`)

//7 - select both the bar chart and the corresponding legend element with d3 by 
//accessing the nth child of both the #legend and #viz elements. 
//use the .classed() method to remove and apply the styles to the corresponding elements
const toggleClass = (i,toggle) => {
    d3.select('#viz div:nth-child('+ i +')').classed('highlightBar',toggle)
    d3.select('#legend li:nth-child('+ i +')').classed('highlightText',toggle)
}

// listSelection.on(
//     'mouseover',
//     (d, i) => toggleClass(i + 1, true)
// )
// listSelection.on(
//     'mouseout',
//     (d, i) => toggleClass(i + 1, false)
// )

//**** due to 'breaking change 'in the D3 library code for events, the above don't work so let's go old school on dat ass

//querySelector().children returns a HTMLCollection Object, NOT an Array, so indexOf doesn't work
//so copy data from the HTMLCollection Object to arrays
const listItems = [],
divItems = []
for(let item of document.querySelector('ol').children) listItems.push(item)
for(let div of document.querySelector('div#viz').children) divItems.push(div)

for(let item of listItems){
    item.addEventListener('mouseenter', () => {
        item.classList.add('highlightText')
        divItems[listItems.indexOf(item)].classList.add('highlightBar')
    })
    item.addEventListener('mouseleave', () => {
        item.classList.remove('highlightText')
        divItems[listItems.indexOf(item)].classList.remove('highlightBar') 
    })
}
