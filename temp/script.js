const tree = document.getElementById('tree');
const addNodeModal = document.getElementById('add-node-modal');
const addNodeBtn = document.getElementById('add-node-btn');
const nodeImageInput = document.getElementById('node-image');
const nodeTitleInput = document.getElementById('node-title');

let nodes = [
  {
    title: "Grandfather",
    image: "grandfather.jpg"
  },
  {
    title: "Grandmother",
    image: "grandmother.jpg"
  },
  {
    title: "Father",
    image: "father.jpg"
  },
  {
    title: "Mother",
    image: "mother.jpg"
  },
  {
    title: "Brother",
    image: "brother.jpg"
  },
  {
    title: "Sister",
    image: "sister.jpg"
  }
];

addNodeBtn.addEventListener('click', () => {
  const newNode = {
    title: nodeTitleInput.value,
    image: nodeImageInput.files[0],
  };

  nodes.push(newNode);
  renderTree();
  addNodeModal.style.display = 'none';
  nodeImageInput.value = '';
  nodeTitleInput.value = '';
});

function renderTree() {
  tree.innerHTML = '';
  nodes.forEach((node, index) => {
    const nodeElement = document.createElement('li');
    nodeElement.innerHTML = `
      <img src="${URL.createObjectURL(node.image)}" alt="${node.title}" />
      <span>${node.title}</span>
    `;
    tree.appendChild(nodeElement);
  });

  // realign the tree
  const treeHeight = tree.offsetHeight;
  const treeWidth = tree.offsetWidth;
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  tree.style.top = `${centerY - treeHeight / 2}px`;
  tree.style.left = `${centerX - treeWidth / 2}px`;
}

// open the modal when clicking on the tree
tree.addEventListener('click', () => {
  addNodeModal.style.display = 'block';
});