package creational.prototype;

class Car implements Vehicle {
    private final String DESCRIPTION = "Car: 4 wheels PLUS engine";

    @Override
    public Vehicle clone() {
        return new Car();
    }

    @Override
    public String toString() {
        return DESCRIPTION;
    }
}