public class TennisScore {

    private int scoreA = 0;
    private int scoreB = 0;

    public String score() {
        return scoreA + "-" + scoreB;
    }

    public void joueurAMarque() {
        scoreA += 15;
    }

    public void joueurBMarque() {
        scoreB += 15;
    }
}
