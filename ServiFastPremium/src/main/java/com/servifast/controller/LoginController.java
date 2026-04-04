package com.servifast.controller;

import com.servifast.service.UsuarioService;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Path("/login")
public class LoginController {

    private UsuarioService service = new UsuarioService();

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response login(UsuarioLoginDTO dto){

        if(service.login(dto.getEmail(), dto.getSenha())){
            return Response.ok("{\"token\":\"123456\"}").build();
        } else {
            return Response.status(401).entity("Erro").build();
        }
    }
}