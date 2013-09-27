public class TennisScore {

    private int scoreA = 0;
    private int scoreB = 0;

    public String score() {
        return scoreA + "-" + scoreB;
    }

    public TennisScore joueurAMarque() {
        if (scoreA < 30) {
            scoreA += 15;
        } else {
            scoreA = 40;
        }
        return this;
    }

    public void joueurBMarque() {
        scoreB += 15;
    }
}
