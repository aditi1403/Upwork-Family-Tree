let familyData = {
  name: "Parent",
  children: [],
  siblings: [],
  spouse: []
};

let selectedNode = null;

document.getElementById('add-member').addEventListener('click', addMember);

function addMember() {
  const name = document.getElementById('name').value;
  const relationship = document.getElementById('relationship').value;

  const newMember = {
      name: name,
      children: []
  };

  if (!selectedNode) {
      alert("Please select a node to add the new member.");
      return;
  }

  if (relationship === "child") {
      selectedNode.children.push(newMember);
  } else if (relationship === "sibling") {
      const parent = findParent(familyData, selectedNode);
      if (parent) {
          parent.children.push(newMember);
      }
  } else if (relationship === "spouse") {
      selectedNode.spouse = name;
  }

  updateTree();
  clearForm();
}

function clearForm() {
  document.getElementById('name').value = '';
  document.getElementById('photo').value = '';
  document.getElementById('relationship').value = '';
}

function updateTree() {
  d3.select("#family-tree-container").selectAll("*").remove();

  const container = d3.select("#family-tree-container");
  const width = container.node().clientWidth;
  const height = container.node().clientHeight;
  const margin = { top: 20, right: 90, bottom: 30, left: 90 };
  // const margin = { top: 20, right: 90, bottom: 30, left: 90 };
  // const innerWidth = width - margin.left - margin.right;
  // const innerHeight = height - margin.top - margin.bottom;
  
  const svg = container.append("svg")
      .attr("width", width)
      .attr("height", height)
      // .attr("viewBox", [-innerWidth / 2, -innerHeight / 2, width, height])
      .style("overflow", "auto");

  const root = d3.hierarchy(familyData);

  const treeLayout = d3.tree().size([innerHeight, innerWidth - 160]);

  treeLayout(root);

  const nodes = root.descendants();
  const links = root.links();

  const minX = d3.min(nodes, d => d.x) - margin.top;
  const maxX = d3.max(nodes, d => d.x) + margin.bottom;
  const minY = d3.min(nodes, d => d.y) - margin.left;
  const maxY = d3.max(nodes, d => d.y) + margin.right;

  const treeWidth = maxY - minY;
  const treeHeight = maxX - minX;

  svg.attr("viewBox", `${minY} ${minX} ${treeWidth} ${treeHeight}`);

  const g = svg.append("g")
      .attr("transform", `translate(${margin.left - minY},${margin.top - minX})`);

  g.selectAll('line')
      .data(links)
      .enter()
      .append('line')
      .attr('x1', d => d.source.y)
      .attr('y1', d => d.source.x)
      .attr('x2', d => d.target.y)
      .attr('y2', d => d.target.x)
      .attr('stroke', '#ccc');

  const nodeEnter = g.selectAll('g.node')
      .data(nodes)
      .enter()
      .append('g')
      .attr('class', 'node')
      .attr('transform', d => `translate(${d.y},${d.x})`)
      .on('click', (event, d) => {
          d3.selectAll('.node').classed('selected', false);
          d3.select(event.currentTarget).classed('selected', true);
          selectedNode = d.data;
      });

  nodeEnter.append('circle')
      .attr('r', 10)
      .attr('fill', '#fff')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 3);

  nodeEnter.append('text')
      .attr('dy', '.35em')
      .attr('text-anchor', d => d.children ? 'end' : 'start')
      .attr('dx', d => d.children ? -10 : 10)
      .text(d => d.data.name);

  nodeEnter.filter(d => d.data.spouse)
      .append('text')
      .attr('dy', '1.5em')
      .attr('x', 15)
      .attr('text-anchor', 'start')
      .attr('fill', 'red')
      .text(d => `Spouse: ${d.data.spouse}`);
}

function findParent(root, node) {
  if (!root.children) return null;
  for (const child of root.children) {
      if (child === node) {
          return root;
      }
      const parent = findParent(child, node);
      if (parent) return parent;
  }
  return null;
}

updateTree();
