package edu.northeastern.ccs.im.user;

import edu.northeastern.ccs.im.database.MysqlCon;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.PreparedStatement;

public class SerializeUser {

    static final String WRITE_USER_SQL = "INSERT INTO users(id, username, first_name, last_name, email, created_on, " +
            "password) VALUES (?, ?, ?, ?, ?, ?, ?)";

    public int createUserInDB(User user, String password){

        Connection connection = null;
        int id = -1;
        try {
            MysqlCon mysql = MysqlCon.getInstance();
            connection = mysql.getRemoteConnection();
            PreparedStatement psUser = connection.prepareStatement(WRITE_USER_SQL);
            psUser.setInt(1, 1);
            psUser.setString(2, user.getuserName());
            psUser.setString(3, user.getFirstName());
            psUser.setString(4, user.getLastName());
            psUser.setString(5, user.getEmail());
            psUser.setTimestamp(6, user.getCreatedOn());
            psUser.setString(7, password);

            psUser.executeUpdate();

            ResultSet rs = psUser.getGeneratedKeys();
            if (rs.next())
                id = rs.getInt(1);
            System.out.println(id);
            rs.close();
            psUser.close();

        } catch (SQLException e) {
            e.printStackTrace();
            System.out.println(e.getMessage());
        }

        return id;
    }
}
