package com.example.logicompile_backend;

import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

public class CompilerWebSocketHandler extends TextWebSocketHandler {

    private final CompilerService compilerService;

    public CompilerWebSocketHandler() {
        this.compilerService = new CompilerService();
    }

    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message) {
        String code = message.getPayload();
        String output = compilerService.compileAndRun(code);
        try {
            session.sendMessage(new TextMessage(output));
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
} 