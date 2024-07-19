import tkinter as tk
from tkinter import filedialog
from PIL import Image, ImageTk

class Node:
    def __init__(self, name, photo_path=None, family_title=None):
        self.name = name
        self.photo_path = photo_path
        self.family_title = family_title
        self.children = []
        self.siblings = []
        self.parent = None

    def add_child(self, child):
        self.children.append(child)
        child.parent = self

    def add_sibling(self, sibling):
        self.siblings.append(sibling)

class FamilyTree:
    def __init__(self, head_node):
        self.head_node = head_node
        self.root = tk.Tk()
        self.root.title("Family Tree")
        self.canvas = tk.Canvas(self.root, width=800, height=600)
        self.canvas.pack()
        self.draw_tree(self.head_node, 400, 50)

    def draw_tree(self, node, x, y):
        self.canvas.delete("all")
        self.draw_node(node, x, y)
        for child in node.children:
            self.draw_tree(child, x - 100, y + 50)
        for sibling in node.siblings:
            self.draw_tree(sibling, x + 100, y)

    def draw_node(self, node, x, y):
        node_frame = tk.Frame(self.canvas, bg="white", highlightbackground="black", highlightthickness=1)
        node_frame.place(x=x, y=y, width=200, height=150)

        # Photo display
        if node.photo_path:
            image = Image.open(node.photo_path)
            image = image.resize((50, 50), Image.Resampling.BICUBIC)
            photo = ImageTk.PhotoImage(image)
            photo_label = tk.Label(node_frame, image=photo)
            photo_label.image = photo
            photo_label.pack(side=tk.TOP, padx=5, pady=5)

        # Photo input box
        photo_label = tk.Label(node_frame, text="Photo:")
        photo_label.pack(side=tk.TOP, padx=5)
        photo_entry = tk.Entry(node_frame, width=20)
        photo_entry.pack(side=tk.TOP, padx=5)
        photo_browse_button = tk.Button(node_frame, text="Browse", command=lambda: self.browse_photo(photo_entry, node))
        photo_browse_button.pack(side=tk.TOP, padx=5)
        photo_capture_button = tk.Button(node_frame, text="Capture", command=lambda: self.capture_photo(photo_entry, node))
        photo_capture_button.pack(side=tk.TOP, padx=5)

        # Family title input box
        family_title_label = tk.Label(node_frame, text="Family Title:")
        family_title_label.pack(side=tk.TOP, padx=5)
        family_title_entry = tk.Entry(node_frame, width=20)
        family_title_entry.pack(side=tk.TOP, padx=5)

        # Add child button
        add_child_button = tk.Button(node_frame, text="Add Child", command=lambda: self.add_child_node(node))
        add_child_button.pack(side=tk.TOP, padx=5)

        # Add sibling button
        add_sibling_button = tk.Button(node_frame, text="Add Sibling", command=lambda: self.add_sibling_node(node))
        add_sibling_button.pack(side=tk.TOP, padx=5)

        # Show details button
        show_details_button = tk.Button(node_frame, text="Show Details", command=lambda: self.show_node_details(node))
        show_details_button.pack(side=tk.TOP, padx=5)

    def browse_photo(self, photo_entry, node):
        photo_path = filedialog.askopenfilename()
        photo_entry.delete(0, tk.END)
        photo_entry.insert(0, photo_path)
        node.photo_path = photo_path

    def capture_photo(self, photo_entry, node):
        # Implement photo capture functionality here
        pass

    def add_child_node(self, parent_node):
        new_node = Node("New Child")
        parent_node.add_child(new_node)
        self.draw_tree(self.head_node, 400, 50)

    def add_sibling_node(self, node):
        new_node = Node("New Sibling")
        node.add_sibling(new_node)
        self.draw_tree(self.head_node, 400, 50)

    def show_node_details(self, node):
        details_window = tk.Toplevel(self.root)
        details_window.title("Node Details")

        # Name label
        name_label = tk.Label(details_window, text="Name:")
        name_label.pack(side=tk.TOP, padx=5)
        name_entry = tk.Entry(details_window, width=20)
        name_entry.pack(side=tk.TOP, padx=5)
        name_entry.insert(0, node.name)

        # Photo label
        photo_label = tk.Label(details_window, text="Photo:")
        photo_label.pack(side=tk.TOP, padx=5)
        photo_entry = tk.Entry(details_window, width=20)
        photo_entry.pack(side=tk.TOP, padx=5)  # Complete the pack method
        photo_entry.insert(0, node.photo_path)

        # Family title label
        family_title_label = tk.Label(details_window, text="Family Title:")
        family_title_label.pack(side=tk.TOP, padx=5)
        family_title_entry = tk.Entry(details_window, width=20)
        family_title_entry.pack(side=tk.TOP, padx=5)
        family_title_entry.insert(0, node.family_title)

        # Save button
        save_button = tk.Button(details_window, text="Save", command=lambda: self.save_node_details(node, name_entry, photo_entry, family_title_entry))
        save_button.pack(side=tk.TOP, padx=5)

    def save_node_details(self, node, name_entry, photo_entry, family_title_entry):
        node.name = name_entry.get()
        node.photo_path = photo_entry.get()
        node.family_title = family_title_entry.get()

    def run(self):
        self.root.mainloop()

# Create a sample family tree
head_node = Node("Grandfather")
child1 = Node("Father")
child2 = Node("Uncle")
head_node.add_child(child1)
head_node.add_child(child2)
grandchild1 = Node("Me")
grandchild2 = Node("Cousin")
child1.add_child(grandchild1)
child1.add_child(grandchild2)

# Create the family tree GUI
family_tree = FamilyTree(head_node)
family_tree.run()