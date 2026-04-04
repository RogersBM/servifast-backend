package com.servifast.util;
import java.sql.*;

public class ConnectionFactory {
    public static Connection getConnection() {
        try {
            return DriverManager.getConnection("jdbc:mysql://localhost:3306/servifast","root","123456");
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}