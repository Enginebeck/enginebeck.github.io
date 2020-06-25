var dataset = [];
for (var i = 0; i < 7; i++) {
    var newNumber = Math.floor(Math.random() * 100);
    dataset.push(newNumber);
}
const svg = d3.select('body')
    .append('svg')
    .attr('width', 500)
    .attr('height', 500);

function getColor() {
    return `rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})`;
}

const firstColor = getColor();
// top ellipse
const radialGradient = svg.append('defs')
    .append('radialGradient')
    .attr('id', 'grad')
    .attr('cx', '50%')
    .attr('cy', '50%')
    .attr('r', '50%')
    .attr('fx', '50%')
    .attr('fy', '50%');
radialGradient.append('stop')
    .attr('offset', '0%')
    .attr('style', 'stop-color:rgb(0,0,0)');

radialGradient.append('stop')
    .attr('offset', '100%')
    .attr('style', `stop-color:${firstColor}`);

svg.append('ellipse')
    .attr('cx', 250)
    .attr('cy', 50)
    .attr('rx', 200)
    .attr('ry', 25)
    .attr('background', 'radial-gradient(circle, white, lightblue)')
    .attr('fill', 'url(#grad)')
    .attr('stroke', '#333333');

// each level
const groups = svg.selectAll('g')
    .data(dataset)
    .enter()
    .append('g')
    .attr('class', 'path-group');

groups.append('path')
    .attr('d', (d, i) => {
        const leftStart = 50;
        const rightEnd = 450;
        const topStart = 50;
        const heightStep = 50;
        const widthStep = 40 - i * 3;
        const topWidthStep = (widthStep + 3) * i;
        const bottomWidthStep = widthStep * (i + 1);
        const topLeft = `${leftStart + topWidthStep},${topStart + heightStep * i}`;
        const topLeftCtrl = `${leftStart + topWidthStep} ${topStart + heightStep * (i + 0.5)}`;

        const topRight = `${rightEnd - topWidthStep} ${topStart + heightStep * i}`;
        const topRightCtrl = `${rightEnd - topWidthStep} ${topStart + heightStep * (i + 0.5)}`;

        const bottomRight = `${rightEnd - bottomWidthStep},${topStart + heightStep * (i + 1)}`;
        const bottomRightCtrl = `${rightEnd - bottomWidthStep} ${topStart + heightStep * (i + 1.5)}`;

        const bottomLeft = `${leftStart + bottomWidthStep} ${topStart + heightStep * (i + 1)}`;
        const bottomLeftCtrl = `${leftStart + bottomWidthStep} ${topStart + heightStep * (i + 1.5)}`;

        return `M${topLeft} 
                C${topLeftCtrl} ${topRightCtrl} ${topRight} 
                L${bottomRight}
                C${bottomRightCtrl} ${bottomLeftCtrl} ${bottomLeft} Z`;
    })
    .attr('fill', (d, i) => i ? `rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})` : firstColor)
    .attr('class', 'polygon');
