package com.servifast.dao;

import com.servifast.model.Usuario;
import com.servifast.util.ConnectionFactory;
import java.sql.*;

public class UsuarioDAO {

    public boolean login(String email, String senha){
        try(Connection con = ConnectionFactory.getConnection();
            PreparedStatement st = con.prepareStatement(
                "SELECT * FROM usuario WHERE email=? AND senha=?")){

            st.setString(1,email);
            st.setString(2,senha);

            ResultSet rs = st.executeQuery();
            return rs.next();

        } catch(Exception e){
            e.printStackTrace();
        }
        return false;
    }
}