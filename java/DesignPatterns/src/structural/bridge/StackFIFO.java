package structural.bridge;

/**
 * Created by Gabor_Fekete on 5/19/2017.
 */
class StackFIFO extends StackArray {
    private StackArray stackArray = new StackArray();
    public int pop() {
        while (!isEmpty()) {
            stackArray.push(super.pop());
        }
        int ret = stackArray.pop();
        while (!stackArray.isEmpty()) {
            push(stackArray.pop());
        }
        return ret;
    }
}