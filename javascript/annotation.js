

function annotation(selection, props) {
    const {        
        features,
        property
    } = props;


    let highest = getMax(features, property);
    let lowest = getMin(features, property);

    const backgroundRect = selection.selectAll('rect')
        .data([null]);

    let circleRadius = 8;

    backgroundRect.enter().append('rect')
        .merge(backgroundRect)
        .attr('x', -circleRadius * 2)
        .attr('y', -circleRadius * 2)
        .attr('rx', circleRadius * 2)
        .attr('width', 360)
        .attr('height', 50 )
        .attr('fill', 'white')
        .attr('opacity', 0.8);
    
    const annotGroups = selection.selectAll('.annot')
        .data([highest.properties.name + " has the highest percentage.", lowest.properties.name + " has the lowest percentage."]);


    const annotGroupsEnter = annotGroups
        .enter().append('g')
        .attr('class', 'annot');

    let spacing = 20;
    annotGroupsEnter
        .merge(annotGroups)
        .attr('transform', (d, i) =>
            `translate(0, ${i * spacing})`
    );

    annotGroups.exit().remove();

    let textOffset = 10;
    annotGroupsEnter.append('text')
        .merge(annotGroups.select('text'))
        .text(d => d)
        .attr('dy', '0.30em')
        .attr('x', textOffset);


}


function getMax(arr, prop) {
    var max;
    for (var i = 0; i < arr.length; i++) {             
        if (arr[i] !== undefined 
            && arr[i].properties !== undefined
            && arr[i].properties[prop] !== undefined
            && (max === undefined || parseFloat(arr[i].properties[prop]) > parseFloat(max.properties[prop]))) {
            max = arr[i];            
        }
    }
    
    return max;
}


function getMin(arr, prop) {
    var min;
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] !== undefined
            && arr[i].properties !== undefined
            && arr[i].properties[prop] !== undefined
            && (min === undefined || parseFloat(arr[i].properties[prop]) < parseFloat(min.properties[prop]))) {
            min = arr[i];
        }
    }

    return min;
}