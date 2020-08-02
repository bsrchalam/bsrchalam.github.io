   

function loadAndFilterData(targetYear) {

  var promise =  Promise.all([
        d3.csv('data.csv'),
        d3.json('countries-50m.json')
    ]).then(([allData, countryData]) => {
        var data = allData.filter(function (row) { return row.Year === targetYear; });

        const rowByCode = data.reduce((accumulator, d) => {
            accumulator[d.code] = d;
            return accumulator;
        }, {});

        const rowByName = data.reduce((accumulator, d) => {
            accumulator[d.country] = d;
            return accumulator;
        }, {});

        const countries = topojson.feature(countryData, countryData.objects.countries);

        countries.features.forEach(d => {
            Object.assign(d.properties, rowByCode[d.id]);
            Object.assign(d.properties, rowByName[d.properties.name]);
        });

        return countries;
    });

    return promise;

}