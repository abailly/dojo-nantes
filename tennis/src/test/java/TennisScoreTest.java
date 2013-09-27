import org.junit.Test;

import static junit.framework.Assert.assertEquals;

public class TennisScoreTest {

    private TennisScore score = new TennisScore();

    @Test
    public void au_debut_le_score_d_un_jeu_est_de_0_0() {
        assertEquals("0-0", score.score());
    }

    @Test
    public void au_debut_quand_a_marque_un_point_le_score_est_15_0() throws Exception {
        score.joueurAMarque();
        assertEquals("15-0", score.score());
    }

    @Test
    public void au_debut_quand_a_marque_deux_points_le_score_est_30_0() throws Exception {
        score.joueurAMarque()
                .joueurAMarque();
        assertEquals("30-0", score.score());
    }

    @Test
    public void au_debut_quand_a_marque_trois_points_le_score_est_40_0() throws Exception {
        score.joueurAMarque()
                .joueurAMarque()
                .joueurAMarque();
        assertEquals("40-0", score.score());
    }

    @Test
    public void joueurA_marque_2_fois_puis_joueurB_marque_le_score_est_30_15() throws Exception {
        score.joueurAMarque()
                .joueurAMarque()
                .joueurBMarque();
        assertEquals("30-15", score.score());
    }


}

