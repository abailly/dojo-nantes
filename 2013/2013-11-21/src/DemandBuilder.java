public class DemandBuilder {
    private int start;
    private int end;
    private int price;

    public DemandBuilder setStart(int start) {
        this.start = start;
        return this;
    }

    public DemandBuilder setEnd(int end) {
        this.end = end;
        return this;
    }

    public DemandBuilder setPrice(int price) {
        this.price = price;
        return this;
    }

    public Demand createDemand() {
        return new Demand(start, end, price);
    }
}