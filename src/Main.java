import java.sql.*;
public class Main {

    public static void main(String [] args) throws ClassNotFoundException, SQLException {
        try {
            Class.forName("com.mysql.jdbc.Driver");
            Connection con = DriverManager.getConnection(
                    "jdbc:mysql://localhost:3306/usersDB", "root", "root");
//here sonoo is database name, root is username and password
            Statement stmt = con.createStatement();
            ResultSet rs = stmt.executeQuery("select * from users");
            while (rs.next())
                System.out.println(rs.getString("password"));
            stmt.close();

        } catch (Exception e) {
            System.out.println(e);
        }


    }

}
