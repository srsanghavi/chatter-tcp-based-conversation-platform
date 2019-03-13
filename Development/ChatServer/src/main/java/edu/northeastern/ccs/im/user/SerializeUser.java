package edu.northeastern.ccs.im.user;

import edu.northeastern.ccs.im.database.MysqlCon;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.PreparedStatement;

public class SerializeUser {

    static final String WRITE_USER_SQL = "INSERT INTO users(username, first_name, last_name, email, created_on, " +
            "password) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

    public int createUserInDB(User user, String password){

        MysqlCon mysql = new MysqlCon();
        Connection connection = mysql.getRemoteConnection("admin","shashwat");
        int id = -1;
        try {
            PreparedStatement psUser = connection.prepareStatement(WRITE_USER_SQL);
            psUser.setString(1, user.getuserName());
            psUser.setString(2, user.getFirstName());
            psUser.setString(3, user.getLastName());
            psUser.setString(4, user.getEmail());
            psUser.setTimestamp(5, user.getCreatedOn());
            psUser.setString(6, password);

            psUser.executeUpdate();

            ResultSet rs = psUser.getGeneratedKeys();
            if (rs.next())
                id = rs.getInt(1);
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return id;
    }
}
