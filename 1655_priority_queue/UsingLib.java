import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.util.Comparator;
import java.util.PriorityQueue;

public class UsingLib {
	public static void main(String[] args) throws IOException {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));

		int N = Integer.parseInt(br.readLine());
		PriorityQueue<Integer> maxPQ = new PriorityQueue<>(Comparator.reverseOrder());
		PriorityQueue<Integer> minPQ = new PriorityQueue<>();

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
