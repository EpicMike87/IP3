package com.IP3G11.Best11.tools;

import java.io.*;
import java.net.URL;

public class FixtureCSVDownloader {

    public static void getCSV(String url) throws IOException {

        InputStream input = new URL(url).openStream();
        Reader reader = new InputStreamReader(input, "UTF-8");
        File file = new File("./fixturedata/seasonFixtures.csv");
        FileWriter fileWriter = new FileWriter(file);
        int charVal;
        while ((charVal = reader.read()) != -1) {
            fileWriter.append((char) charVal);
        }

        fileWriter.close();
    }
}
