public class Demand {
    private final int start;
    private final int end;
    private int price;

    public Demand(int start, int end, int price) {
        this.start = start;
        this.end = end;
        this.price = price;
    }

    public int getPrice() {
        return price;
    }

    public int getEnd() {
        return end;
    }

    public int getStart() {
        return start;
    }

    public boolean isOverlaped(Demand demand1) {
        return getEnd() > demand1.getStart();
    }
}
