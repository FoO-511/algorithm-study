import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

public class Knapsack {
	static BufferedReader bf = new BufferedReader(new InputStreamReader(System.in));
	static int[] weights;
	static int[] values;
	static int[][] memo;

	static void knapsack() {
		for (int i = 1; i < memo.length; i++) {
			for (int w = 1; w < memo[0].length; w++) {
				if (weights[i - 1] <= w) {
					memo[i][w] = Math.max(values[i - 1] + memo[i - 1][w - weights[i - 1]], memo[i - 1][w]);
				} else {
					memo[i][w] = memo[i - 1][w];
				}
			}
		}

	}

	static int[] get_inputs() {
		try {

			String a = bf.readLine();

			String[] arr = a.split(" ");
			int q = Integer.parseInt(arr[0]);
			values = new int[q];
			weights = new int[q];

			int k = Integer.parseInt(arr[1]);
			memo = new int[q + 1][k + 1]; // �⺻������ 0�� ��

			for (int i = 0; i < q; i++) {
				String pack = bf.readLine();
				String[] WV = pack.split(" ");

				weights[i] = Integer.parseInt(WV[0]);
				values[i] = Integer.parseInt(WV[1]);
			}
			return new int[] { q, k };

		} catch (IOException e) {
			System.out.println(e.toString());
			return new int[1];
		}
	}

	public static void main(String[] args) {

		int[] q_k = get_inputs();

		knapsack();

		System.out.println(memo[q_k[0]][q_k[1]]);

	}
}
