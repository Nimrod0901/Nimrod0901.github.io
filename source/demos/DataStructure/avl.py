class treeNode():
    def __init__(self, val):
        self.val = val
        self.height = 0
        self.left = None
        self.right = None

class AVLTree():
    def __init__(self, root):
        self.root = root
    
    def find(self, root, val):
        if not root:
            return None
        elif val < root.val:
            return self.find(root.left, val)
        elif val > root.val:
            return self.find(root.right, val)
        else:
            return root
    
    def insert(self, key, root):
        new_Node = 
        
