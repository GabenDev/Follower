package creational.singleton;

/**
 * Created by Gabor_Fekete on 5/19/2017.
 */
public class Main {

    public static void main(String[] args) {
        ThreadSafeSingleton.getInstance().poke();

        int hashCode = ThreadSafeSingleton.getInstance().hashCode();
        System.out.println(String.format("Hashcode euqality: %s [ %s ]", (hashCode == hashCode), hashCode));
        System.out.println("Instance equality: " + ThreadSafeSingleton.getInstance().equals(ThreadSafeSingleton.getInstance()));

    }

}
