import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;

class Queue {
	Queue prev = null;
	Queue next = null;
	int value;

	Queue(Queue prev, Queue next, int value) {
		this.prev = prev;
		this.next = next;
		this.value = value;
	}

	void setNext(Queue next) {
		next.prev = this;
		if (this.next != null) {
			next.next = this.next;
			this.next.prev = next;
		}
		this.next = next;
	}

	void setPrev(Queue prev) {
		prev.next = this;
		if (this.prev != null) {
			prev.prev = this.prev;
			this.prev.next = prev;
		}
		this.prev = prev;
	}
}

class Pointer {
	Queue Q;
	int index;

	Pointer(Queue Q) {
		this.Q = Q;
		this.index = 1;
	}
}

public class TimeOver {

	static BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
	static BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));

	static int getNum() {
		try {
			return Integer.parseInt(br.readLine());
		} catch (IOException e) {
			return 0;
		}
	}

	static void insertSmallerQueue(Queue current, Queue Q) {
		if (current.prev == null) {
			current.setPrev(Q);
			return;
		}
		current = current.prev;
		if (current.value < Q.value) {
			current.setNext(Q);
			return;
		}

		insertSmallerQueue(current, Q);
	}

	static void insertBiggerQueue(Queue current, Queue Q) {
		if (current.next == null) {
			current.setNext(Q);
			return;
		}
		current = current.next;
		if (current.value > Q.value) {
			current.setPrev(Q);
			return;
		}

		insertBiggerQueue(current, Q);
	}

	static void insertNewQueue(Queue current, Pointer center, int i) {
		int n = getNum();
		current = center.Q;
		Queue Q = new Queue(null, null, n);

		if (current.value > Q.value) {
			insertSmallerQueue(current, Q);
			center.index += 1;
			if (i % 2 == 0) {
				if (center.Q.value > center.Q.prev.value) {
					center.Q = center.Q.prev;
					center.index -= 1;
				}
			} else {
				if (i / 2 + 1 < center.index) {
					center.Q = center.Q.prev;
					center.index -= 1;
				}
			}
		} else {
			insertBiggerQueue(current, Q);
			if (i % 2 == 0) {
				if (center.Q.value > center.Q.next.value) {
					center.Q = center.Q.next;
					center.index += 1;
				}
			} else {
				if (i / 2 + 1 > center.index) {
					center.Q = center.Q.next;
					center.index += 1;
				}
			}
		}
	}

	public static void main(String[] args) {
		int q = getNum();

		int firstNum = getNum();
		Queue current = new Queue(null, null, firstNum);
		Pointer center = new Pointer(current);

		try {

			bw.write(center.Q.value + "\n");
			for (int i = 2; i < q + 2; i++) {
				insertNewQueue(current, center, i);
				bw.write(center.Q.value + "\n");
				bw.flush();
			}

			bw.close();
			br.close();
		} catch (IOException e) {

		}

	}
}
