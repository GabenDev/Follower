package proxy;

/**
 * Created by Gabor_Fekete on 5/19/2017.
 */
interface SocketInterface {
    String readLine();
    void  writeLine(String str);
    void  dispose();
}
