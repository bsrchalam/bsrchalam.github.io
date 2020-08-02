

function colorLegend (selection, props) {
    const {
        colorScale,
        circleRadius,
        spacing,
        textOffset,
        backgroundRectWidth,
        //onClick,
        //selectedColorValue,
        targetYear
    } = props;

    const backgroundRect = selection.selectAll('rect')
        .data([null]);

    const n = colorScale.domain().length;

    backgroundRect.enter().append('rect')
        .merge(backgroundRect)
        .attr('x', -circleRadius * 2)
        .attr('y', -circleRadius * 2)
        .attr('rx', circleRadius * 2)
        .attr('width', backgroundRectWidth)
        .attr('height', spacing * n + circleRadius * 2)
        .attr('fill', 'white')
        .attr('opacity', 0.8);

    
    const legendGroups = selection.selectAll('.tick')
        .data(colorScale.domain());

    const legendGroupsEnter = legendGroups
        .enter().append('g')
        .attr('class', 'tick');

    legendGroupsEnter
        .merge(legendGroups)
        .attr('transform', (d, i) =>
            `translate(0, ${i * spacing})`
        );
        //.attr('opacity', d => (!selectedColorValue || d === selectedColorValue) ? 1 : 0.2);
        //.on('click', d => onClick(d === selectedColorValue ? null : d, targetYear));

    legendGroups.exit().remove();

    legendGroupsEnter.append('circle')
        .merge(legendGroups.select('circle'))
        .attr('r', circleRadius)
        .attr('fill', colorScale);

    legendGroupsEnter.append('text')
        .merge(legendGroups.select('text'))
        .text(d => new Intl.NumberFormat('en-US', { style: 'percent', minimumFractionDigits: 0 }).format(d))
        .attr('dy', '0.32em')
        .attr('x', textOffset);
}
