package creational.singleton;

/**
 * Created by Gabor_Fekete on 5/19/2017.
 */
public class ThreadSafeSingleton {
    private ThreadSafeSingleton() {}

    private static class SingletonHolder {
        private static final ThreadSafeSingleton INSTANCE = new ThreadSafeSingleton();
    }

    public static ThreadSafeSingleton getInstance() {
        return SingletonHolder.INSTANCE;
    }

    public void poke() {
        System.out.println("Hey there. How are you doing. Stop poking me :D");
    }
}