
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;

class PQ {
	private int heapSize;
	private int[] itemHeap;

	public PQ(int n) {
		heapSize = 0;
		itemHeap = new int[n + 1];
	}

	boolean compare(int a, int b) {
		return a > b ? true : false;
	}

	public void add(int item) {
		int i = ++heapSize;
		while ((i != 1) && compare(item, itemHeap[i / 2])) {
			itemHeap[i] = itemHeap[i / 2]; 
			i /= 2; 
		}
		itemHeap[i] = item;
	}

	public Integer peek() {
		if (heapSize != 0)
			return itemHeap[1];
		return null;
	}

	public Integer poll() {
		if (heapSize == 0)
			return null;
		int parent, child, item, temp;
		item = itemHeap[1]; 
		temp = itemHeap[heapSize--];
		parent = 1; 
		child = 2; 

		while (child <= heapSize) {
			if ((child < heapSize) && compare(itemHeap[child + 1], itemHeap[child]))
				child++; 

			if (compare(temp, itemHeap[child]))
				break;

			itemHeap[parent] = itemHeap[child]; 
			parent = child;
			child *= 2; 
		}

		itemHeap[parent] = temp;

		return item;
	}

	public boolean isEmpty() {
		if (heapSize == 0)
			return true;
		return false;
	}

	public int size() {
		return heapSize;
	}

}

class MinPQ extends PQ {
	MinPQ(int n) {
		super(n);
	}

	@Override
	boolean compare(int a, int b) {
		return a < b ? true : false;
	}
}

public class CustomQueue {
	public static void main(String[] args) throws IOException {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));

		int N = Integer.parseInt(br.readLine());
		PQ maxPQ = new PQ(N);
		MinPQ minPQ = new MinPQ(N);

		for (int i = 0; i < N; i++) {
			int a = Integer.parseInt(br.readLine());

			if (maxPQ.size() == minPQ.size()) {
				maxPQ.add(a);

				if (!minPQ.isEmpty() && maxPQ.peek() > minPQ.peek()) {
					minPQ.add(maxPQ.poll());
					maxPQ.add(minPQ.poll());
				}
			} else {
				minPQ.add(a);

				if (maxPQ.peek() > minPQ.peek()) {
					minPQ.add(maxPQ.poll());
					maxPQ.add(minPQ.poll());
				}
			}
			bw.write(maxPQ.peek() + "\n");
		}

		bw.flush();
		bw.close();
		br.close();
	}
}
