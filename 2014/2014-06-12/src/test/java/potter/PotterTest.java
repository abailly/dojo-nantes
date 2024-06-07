package potter;

import org.junit.Ignore;
import org.junit.Test;
import org.junit.experimental.theories.DataPoints;
import org.junit.experimental.theories.Theories;
import org.junit.experimental.theories.Theory;
import org.junit.runner.RunWith;

import static org.assertj.core.api.Assertions.assertThat;


/**
 */
@RunWith(Theories.class)
public class PotterTest {

    private final Potter potter = new Potter();

    @Ignore
    @Test
    public void acceptance() throws Exception {
        assertThat(potter.bestPrice(1, 1, 2, 2, 3, 3, 4, 5)).isEqualTo(51.2);
    }

    /*
        - cas des remises simples -> 1,2,3,4,5 livres tous differents
        - cas des doublons -> diviser en series maximales -> glouton
        - explorer d'autres solutions 
     */

    @DataPoints
    public static Discount[] testCases() {
        double prixDuneSeriedeDeux = 8 * 2 * .95;
        double prixDuneSerieDeTrois = 8 * 3 * .9;
        double priceDuneSerieDeQuatre = 8 * 4 * .8;
        double priceDuneSerieDeCinq = 8 * 5 * .75;
        double priceDuneSerieDeUn = 8;
        return new Discount[]{
          new Discount(priceDuneSerieDeUn,                          1),
          new Discount(prixDuneSeriedeDeux,                         1, 2),
          new Discount(prixDuneSerieDeTrois,                        1, 2, 3),
          new Discount(priceDuneSerieDeQuatre,                      1, 2, 3, 4),
          new Discount(priceDuneSerieDeCinq,                        1, 2, 3, 4, 5),
          new Discount(priceDuneSerieDeUn * 2,                      1, 1),
          new Discount(priceDuneSerieDeUn + prixDuneSeriedeDeux,    1, 1 ,2),
          new Discount(priceDuneSerieDeUn + prixDuneSerieDeTrois,   1, 1 ,2, 3),
          new Discount(2*priceDuneSerieDeUn + prixDuneSerieDeTrois, 1, 1 ,1 ,2, 3),
          new Discount(priceDuneSerieDeUn + prixDuneSerieDeTrois,   1 ,2 ,2, 3),
          
        }; 
    }

    @Test
    @Theory
    public void discountForBooksIs(Discount discount) throws Exception {
        assertThat(potter.bestPrice(discount.books)).isEqualTo(discount.price);
    }

    private static class Discount {
        final double price;
        final int[] books;

        public Discount(double price, int ...books) {
            this.price = price;
            this.books = books;
        }
    }
}
