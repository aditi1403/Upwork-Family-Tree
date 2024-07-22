import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const FamilyTree = ({ data }) => {
  const ref = useRef();

  useEffect(() => {
    if (data.length === 0) return;

    const svg = d3.select(ref.current)
                  .attr('width', 800)
                  .attr('height', 600)
                  .style('background-color', '#f9f9f9')
                  .append('g')
                  .attr('transform', 'translate(50,50)');

    const treeLayout = d3.tree().size([700, 500]);

    const root = d3.stratify()
                    .id(d => d.name)
                    .parentId(d => d.parent)(data);

    treeLayout(root);

    const nodes = svg.append('g')
                      .selectAll('g')
                      .data(root.descendants())
                      .enter()
                      .append('g')
                      .attr('transform', d => `translate(${d.y},${d.x})`);

    nodes.append('circle').attr('r', 20);

    nodes.append('text')
         .attr('dy', -25)
         .attr('dx', -10)
         .text(d => d.data.name);

    nodes.append('image')
         .attr('xlink:href', d => d.data.photo)
         .attr('width', 40)
         .attr('height', 40)
         .attr('x', -20)
         .attr('y', -20);

    svg.append('g')
       .selectAll('line')
       .data(root.links())
       .enter()
       .append('line')
       .attr('x1', d => d.source.y)
       .attr('y1', d => d.source.x)
       .attr('x2', d => d.target.y)
       .attr('y2', d => d.target.x)
       .attr('stroke', '#ccc');
  }, [data]);

  return <svg ref={ref}></svg>;
};

export default FamilyTree;
