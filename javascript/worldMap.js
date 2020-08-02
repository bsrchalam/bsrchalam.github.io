
function worldMap(selection, pathGenerator, props) {
    const {
        features,
        colorScale,
        colorValue,
        selectedColorValue
    } = props;

    const gUpdate = selection.selectAll('g').data([null]);
    const gEnter = gUpdate.enter().append('g');
    const g = gUpdate.merge(gEnter);

    gEnter
        .append('path')
        .attr('class', 'sphere')
        .attr('d', pathGenerator({ type: 'Sphere' }))
        .merge(gUpdate.select('.sphere'))
        .attr('opacity', selectedColorValue ? 0.05 : 1);

    selection.call(d3.zoom().on('zoom', () => {
        g.attr('transform', event.transform);
    }));

    const countryPaths = g.selectAll('.country')
        .data(features);

    const countryPathsEnter = countryPaths
        .enter().append('path')
        .attr('class', 'country');

    countryPaths
        .merge(countryPathsEnter)
        .attr('d', pathGenerator)
        .attr('fill', function (d) { return d.properties["Working Population"] === undefined ? colorScale(0.2) : colorScale(d.properties["Working Population"]); })
        .attr('opacity', d =>
            (!selectedColorValue || selectedColorValue === colorValue(d))
                ? 1
                : 0.1
        )
        .classed('highlighted', d =>
            selectedColorValue && selectedColorValue === colorValue(d)
    )

    countryPathsEnter.append('title')
        .text(d => d.properties.name + " - "
            + (d.properties["Working Population"] === undefined ? 'Not Available' : new Intl.NumberFormat('en-US', { style: 'percent', minimumFractionDigits: 1 }).format(d.properties["Working Population"]))
        );



}