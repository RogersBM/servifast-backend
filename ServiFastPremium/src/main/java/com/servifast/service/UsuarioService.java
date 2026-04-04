package com.servifast.service;

import com.servifast.dao.UsuarioDAO;

public class UsuarioService {
    private UsuarioDAO dao = new UsuarioDAO();
    public boolean login(String email,String senha){
        return dao.login(email,senha);
    }
}