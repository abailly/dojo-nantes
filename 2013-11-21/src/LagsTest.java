import org.junit.Test;

import static org.junit.Assert.assertEquals;

public class LagsTest {

    @Test
    public void le_prix_maximum_sans_aucune_demande_est_de_0() {
        assertEquals(0, new Lags().maximumPrice());
    }

    @Test
    public void le_prix_maximum_d_une_demande_est_le_prix_de_la_demande() {
        Lags lags = new Lags();
        int start = 5;
        int end = 7;
        int price = 10;
        lags.add(new DemandBuilder().setStart(start).setEnd(end).setPrice(price).createDemand());
        assertEquals(10, lags.maximumPrice());
    }

    @Test
    public void le_prix_maximum_de_deux_demandes_compatibles_est_la_somme_des_deux() {
        Lags lags = new Lags();
        lags.add(new DemandBuilder().setStart(5).setEnd(7).setPrice(10).createDemand());
        lags.add(new DemandBuilder().setStart(13).setEnd(15).setPrice(4).createDemand());

        assertEquals(14, lags.maximumPrice());
    }

    @Test
    public void le_prix_maximum_de_deux_demandes_incompatibles_est_le_prix_de_la_premiere() {
        Lags lags = new Lags();

        lags.add(new DemandBuilder().setStart(5).setEnd(14).setPrice(10).createDemand());
        lags.add(new DemandBuilder().setStart(13).setEnd(15).setPrice(4).createDemand());

        assertEquals(10, lags.maximumPrice());
    }

    @Test
    public void le_prix_maximum_de_deux_demandes_incompatibles_est_le_prix_de_la_seconde() {
        Lags lags = new Lags();

        lags.add(new DemandBuilder().setStart(5).setEnd(14).setPrice(4).createDemand());
        lags.add(new DemandBuilder().setStart(13).setEnd(15).setPrice(10).createDemand());

        assertEquals(10, lags.maximumPrice());
    }
    @Test
    public void trois_demandes_non_compatible_egal_la_somme_des_2_premieres() {
        Lags lags = new Lags();

        lags.add(new DemandBuilder().setStart(5).setEnd(10).setPrice(4).createDemand());
        lags.add(new DemandBuilder().setStart(11).setEnd(12).setPrice(10).createDemand());
        lags.add(new DemandBuilder().setStart(10).setEnd(14).setPrice(13).createDemand());

        assertEquals(14, lags.maximumPrice());
    }
    
}
