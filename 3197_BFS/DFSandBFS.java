class StackNode {
	int data;
	StackNode link;
}

class LinkedStack {
	StackNode top;

	public boolean isEmpty() {
		return (top == null);
	}

	public void push(int item) {
		StackNode newNode = new StackNode();
		newNode.data = item;
		newNode.link = top;
		top = newNode;
	}

	public int pop() {
		if (isEmpty()) {
			System.out.println("Linked Stack is Empty.");
			return 0;
		} else {
			int item = top.data;
			top = top.link;
			return item;
		}
	}
}

class QNode {
	int data;
	QNode link;
}

class LinkedQueue {
	QNode front; // 첫노드
	QNode rear; // 끝노드

	public LinkedQueue() {
		front = null;
		rear = null;
	}

	public boolean isEmpty() {
		return (front == null);
	}

	public void enQueue(int item) {
		QNode newNode = new QNode();
		newNode.data = item;
		newNode.link = null;
		if (isEmpty()) {
			front = newNode;
			rear = newNode;
		} else {
			rear.link = newNode;
			rear = newNode;
		}
	}

	public int deQueue() {
		if (isEmpty()) {
			System.out.println("Linked Queue is Empty.");
			return 0;
		} else {
			int item = front.data;
			front = front.link;
			if (front == null)
				rear = null;
			return item;
		}
	}
}

class SearchAdjList extends AdjList {
	// DFS(Depth First Search):
	public void DFS(int v) {
		GraphNode w = new GraphNode();
		LinkedStack S = new LinkedStack();
		boolean visited[] = new boolean[10];

		S.push(v);

		visited[v] = true;
		System.out.printf(" %c", v + 65);

		while (S.top != null) {
			w = head[v];

			while (w != null) {
				if (visited[w.vertex] == false) {
					S.push(w.vertex);
					visited[w.vertex] = true;
					System.out.printf(" %c", w.vertex + 65);
					v = w.vertex;
					w = head[v];
				} else
					w = w.link;
			}
			v = S.pop();
		}
	}

	public void BFS(int v) {
		GraphNode w = new GraphNode();
		LinkedQueue Q = new LinkedQueue();
		boolean visited[] = new boolean[10];
		visited[v] = true;

		System.out.printf(" %c", v + 65);

		Q.enQueue(v);
		while (!Q.isEmpty()) {
			v = Q.deQueue();

			for (w = head[v]; w != null; w = w.link) {
				if (visited[w.vertex] == false) {
					visited[w.vertex] = true;
					System.out.printf(" %c", w.vertex + 65);
					Q.enQueue(w.vertex);
				}
			}
		}
	}
}

public class DFSandBFS {
	public static void main(String args[]) {
		SearchAdjList G = new SearchAdjList();

		for (int i = 0; i < 7; i++) {
			G.insertVertex(i);
		}

		G.insertEdge(0, 2);
		G.insertEdge(0, 1);
		G.insertEdge(1, 4);
		G.insertEdge(1, 3);

		G.insertEdge(1, 0);
		G.insertEdge(2, 4);
		G.insertEdge(2, 0);
		G.insertEdge(3, 6);
		G.insertEdge(3, 1);

		G.insertEdge(4, 6);
		G.insertEdge(4, 2);
		G.insertEdge(4, 1);

		G.insertEdge(5, 6);

		G.insertEdge(6, 5);
		G.insertEdge(6, 4);
		G.insertEdge(6, 3);

		G.printAdjList();

		System.out.println("\n\nDFS");
		G.DFS(0);

		System.out.println("\n\nBFS");
		G.BFS(0);
	}
}
