const climate_daly_data = [
    {region: 'Low-and-middle-income countries of the African Region', deaths: .57},
    {region: 'Low-and-middle-income countries of the Americas', deaths: 2},
    {region: 'Low-and-middle-income countries of the Eastern Mediterranean Region', deaths: 20},
    {region: 'Low-and-middle-income countries of the European Region', deaths: .67},
    {region: 'Low-and-middle-income countries of the South-East Asia Region', deaths: 58},
    {region: 'Low-and-middle-income countries of the Western Pacific Region', deaths: 4},
    {region: 'High income countries', deaths: 23}
]


const toggleClass = (i,toggle) => {
    d3.select('#viz div:nth-child('+ i +')').classed('highlightBar',toggle);
    d3.select('#legend li:nth-child('+ i +')').classed('highlightText',toggle);
};

//1 - select DOM to bind data to
const divSelection = d3.select('#viz')
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
        d => `${d.deaths * 25}px`
    )



