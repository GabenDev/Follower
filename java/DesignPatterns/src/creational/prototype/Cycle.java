package creational.prototype;

class Cycle implements Vehicle {
    private final String DESCRIPTION = "Bycicle: 2 wheels - no engine";

    @Override
    public Vehicle clone() {
        return new Cycle();
    }

    @Override
    public String toString() {
        return DESCRIPTION;
    }
}