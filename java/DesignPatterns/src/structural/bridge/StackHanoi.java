package structural.bridge;

/**
 * Created by Gabor_Fekete on 5/19/2017.
 */
class StackHanoi extends StackArray {
    private int totalRejected = 0;
    public int reportRejected() {
        return totalRejected;
    }
    public void push(int in) {
        if (!isEmpty() && in > top()) {
            totalRejected++;
        } else {
            super.push(in);
        }
    }
}
