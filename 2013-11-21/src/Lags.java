import java.util.ArrayList;
import java.util.List;

public class Lags {
    private int maximumPrice;
    
    private List<Demand> demands = new ArrayList<Demand>();

    public int maximumPrice() {
        int maximumPrice = 0;
        
        if(demands.size() == 2 &&
            demands.get(0).isOverlaped(demands.get(1))) {
            return Math.max(demands.get(0).getPrice(), demands.get(1).getPrice());
        }

        for (Demand demand : demands) {
            maximumPrice += demand.getPrice();
        }

        return maximumPrice;
    }

    public void add(Demand demand) {
       this.demands.add(demand);
    }
}
