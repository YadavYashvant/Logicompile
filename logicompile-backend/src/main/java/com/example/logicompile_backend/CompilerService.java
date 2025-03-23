package com.example.logicompile_backend;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.BufferedReader;

public class CompilerService {

    public String compileAndRun(String code) {
        StringBuilder output = new StringBuilder();
        try {
            // Create a temporary file for the C++ code
            File sourceFile = File.createTempFile("temp", ".cpp");
            try (FileWriter writer = new FileWriter(sourceFile)) {
                writer.write(code);
            }

            // Compile the C++ code
            Process compileProcess = Runtime.getRuntime().exec("g++ " + sourceFile.getAbsolutePath() + " -o temp");
            compileProcess.waitFor();

            // Run the compiled code
            Process runProcess = Runtime.getRuntime().exec("./temp");
            try (BufferedReader reader = new BufferedReader(new InputStreamReader(runProcess.getInputStream()))) {
                String line;
                while ((line = reader.readLine()) != null) {
                    output.append(line).append("\n");
                }
            }

            // Clean up temporary files
            sourceFile.delete();
            new File("temp").delete();

        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
            return "Error: " + e.getMessage();
        }
        return output.toString();
    }
} 