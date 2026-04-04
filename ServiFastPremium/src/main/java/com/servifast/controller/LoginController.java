package com.servifast.controller;

import com.servifast.service.UsuarioService;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;

@Path("/login")
public class LoginController {

    private UsuarioService service = new UsuarioService();

    @POST
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    @Produces(MediaType.TEXT_PLAIN)
    public String login(@FormParam("email") String email,
                        @FormParam("senha") String senha){
        if(service.login(email,senha)){
            return "OK";
        } else {
            return "ERRO";
        }
    }
}