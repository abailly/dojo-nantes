package potter;

import java.util.Arrays;

/**
 */
public class Potter {
    public double bestPrice(int... books) {
        if (books.length > 1 && books[0] == books[1]) {
            return
              bestPrice(Arrays.copyOf(books,1)) +
              bestPrice(Arrays.copyOfRange(books,1,books.length));
        }

        if (books.length > 1 && books[1] == books[2]) {
            return
              bestPrice(Arrays.copyOfRange(books,1,2)) +
              bestPrice(Arrays.copyOfRange(books,1,books.length));
        }

        return priceOfASeries(books);
    }

    private static final double[] discounts = new double[]{1, .95, .9, .8, .75};

    /**
     * @param books une serie de livres sans doublons
     * @return
     */
    private double priceOfASeries(int[] books) {
        return 8 * books.length * discounts[books.length - 1];
    }
}
