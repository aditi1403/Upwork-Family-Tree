import cv2
import pytesseract
import networkx as nx
import matplotlib.pyplot as plt

# Load the image
image_path = 'family_tree.jpg'  # Replace with your image path
image = cv2.imread(image_path)

# Preprocess the image
gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
_, thresh = cv2.threshold(gray, 150, 255, cv2.THRESH_BINARY_INV)

# Use Tesseract to extract text
custom_config = r'--oem 3 --psm 6'
text = pytesseract.image_to_string(thresh, config=custom_config)

# Print extracted text (for debugging purposes)
print("Extracted Text:")
print(text)

family_tree = nx.DiGraph()

# Example text parsing (this should be adapted to your specific text format)
lines = text.split('\n')
for line in lines:
    if '->' in line:
        parent, children = line.split('->')
        parent = parent.strip()
        children = [child.strip() for child in children.split(',')]
        print(f"Parent: {parent}, Children: {children}")  
        for child in children:
            family_tree.add_edge(parent, child)

# Visualize the family tree
plt.figure(figsize=(12, 8))
pos = nx.spring_layout(family_tree)
nx.draw(family_tree, pos, with_labels=True, node_size=3000, node_color='skyblue', font_size=10, font_weight='bold', arrows=True)
plt.title('Digital Family Tree')
plt.show()

# Debug prints to verify graph population
print("Nodes:", family_tree.nodes())
print("Edges:", family_tree.edges())
