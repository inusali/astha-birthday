import com.sun.net.httpserver.HttpServer;
import com.sun.net.httpserver.HttpExchange;

import java.io.*;
import java.net.InetSocketAddress;
import java.nio.file.Files;

public class BirthdayServer {

    public static void main(String[] args) throws Exception {

        HttpServer server = HttpServer.create(new InetSocketAddress(9090), 0);

        server.createContext("/", BirthdayServer::handleRequest);

        server.start();
        System.out.println("🎂 Birthday site running at:");
        System.out.println("👉 http://localhost:9090");
    }

    private static void handleRequest(HttpExchange exchange) throws IOException {

        String path = exchange.getRequestURI().getPath();

        if (path.equals("/")) {
            path = "/index.html";
        }

        File file = new File("." + path);

        if (!file.exists() || file.isDirectory()) {
            exchange.sendResponseHeaders(404, -1);
            return;
        }

        String contentType = Files.probeContentType(file.toPath());
        if (contentType == null) {
            contentType = "application/octet-stream";
        }

        byte[] data = Files.readAllBytes(file.toPath());

        exchange.getResponseHeaders().set("Content-Type", contentType);
        exchange.sendResponseHeaders(200, data.length);

        OutputStream os = exchange.getResponseBody();
        os.write(data);
        os.close();
    }
}
