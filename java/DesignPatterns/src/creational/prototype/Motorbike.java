package creational.prototype;

class Motorbike implements Vehicle {
    private final String DESCRIPTION = "Motorbike: 2 wheels with engine";

    @Override
    public Vehicle clone() {
        return new Motorbike();
    }

    @Override
    public String toString() {
        return DESCRIPTION;
    }
}
