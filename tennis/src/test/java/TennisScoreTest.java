import org.junit.Test;

import static junit.framework.Assert.assertEquals;

public class TennisScoreTest {
    
    @Test 
    public void au_debut_le_score_d_un_jeu_est_de_0_0(){
        TennisScore score = new TennisScore();
        assertEquals("0-0", score.score());
    }
    
}
