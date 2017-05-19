package creational.prototype;

import java.util.HashMap;
import java.util.Map;

class Factory {
    private static final Map<String, Vehicle> prototypes = new HashMap<>();

    static {
        prototypes.put("car", new Car());
        prototypes.put("motorbike", new Motorbike());
        prototypes.put("cycle", new Cycle());
    }

    public static Vehicle getPrototype(String type) {
        try {
            return prototypes.get(type).clone();
        } catch (NullPointerException ex) {
            System.out.println("Prototype with name: " + type + ", doesn't exist");
            return null;
        }
    }
}
