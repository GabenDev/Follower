package composite;

/**
 * Created by Gabor_Fekete on 5/19/2017.
 */
abstract class Entity {
    protected static StringBuffer indent = new StringBuffer();
    protected static int level = 1;

    public abstract void traverse(int[] levels);

    protected boolean printThisLevel(int[] levels) {
        for (int value : levels) {
            if (level == value) {
                return true;
            }
        }
        return false;
    }
}