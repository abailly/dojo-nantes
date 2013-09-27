public class TennisScore {

    private int scoreA = 0;
    private int scoreB = 0;

    private static String[] marques = new String[]{"0","15","30","40"};
    
    public String score() {
        if (scoreA == 4) {
            return "avantage A";
        } else {
            return marques[scoreA] + "-" + marques[scoreB];
        }
    }

    public TennisScore joueurAMarque() {
        scoreA++;
        return this;
    }

    public TennisScore joueurBMarque() {
        scoreB ++;
        return this;
    }
}
