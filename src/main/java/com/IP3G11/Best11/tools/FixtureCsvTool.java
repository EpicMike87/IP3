package com.IP3G11.Best11.tools;

import com.IP3G11.Best11.model.Fixture;
import com.IP3G11.Best11.model.Team;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;

import java.io.*;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.sql.Date;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

public class FixtureCsvTool {

    private static final int SEASON = 2223;
    //Relegated team
    private static final String IGNORE_TEAM = "Dundee";

    //Disabled at present, still need to add concat for seasons.
    public static void getCSV() throws IOException {

        //Get previous season string. Will combine previous and current season fixtures
        int year1 = (Integer.parseInt(Integer.toString(SEASON).substring(0, 2)) - 1);
        int year2 = (Integer.parseInt(Integer.toString(SEASON).substring(2, 4)) - 1);
        String previousSeason = "" + year1 + year2;

        String url = "https://www.football-data.co.uk/mmz4281/"+ SEASON + "/SC0.csv";

        InputStream input = new URL(url).openStream();
        Reader reader = new InputStreamReader(input, StandardCharsets.UTF_8);
        File file = new File("./fixturedata/seasonFixtures2.csv");
        FileWriter fileWriter = new FileWriter(file);
        int charVal;
        while ((charVal = reader.read()) != -1) {
            fileWriter.append((char) charVal);
        }

        fileWriter.close();
    }

    public static List<Fixture> getFixturesFromCsv(String path, List<Team> teams) throws IOException, ParseException {

        List<Fixture> fixtures = new ArrayList<>();
        FileReader reader = new FileReader(path);
        CSVParser csvParser = new CSVParser(reader, CSVFormat.DEFAULT.withHeader());
        SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy HH:mm");


        for (CSVRecord record : csvParser) {

            String homeTeamName = record.get("HomeTeam");
            String awayTeamName = record.get("AwayTeam");


            if(homeTeamName.equalsIgnoreCase("Dundee United")) homeTeamName = "Dundee Utd";
            if(awayTeamName.equalsIgnoreCase("Dundee United")) awayTeamName = "Dundee Utd";
            if(homeTeamName.equalsIgnoreCase("Hearts")) homeTeamName = "Heart OF Midlothian";
            if(awayTeamName.equalsIgnoreCase("Hearts")) awayTeamName = "Heart OF Midlothian";

            if (!homeTeamName.equalsIgnoreCase(IGNORE_TEAM) || !awayTeamName.equalsIgnoreCase(IGNORE_TEAM)) {
                Team home = null;
                Team away = null;

                for (Team t : teams) {
                    if (t.getTeamName().equalsIgnoreCase(homeTeamName)) home = t;
                    if (t.getTeamName().equalsIgnoreCase(awayTeamName)) away = t;
                }

                Fixture fixture = new Fixture();
                fixture.setDateTime(new Date(sdf.parse(record.get("Date") + " " + record.get("Time")).getTime()));
                try {
                    fixture.setHomeTeamName(home.getTeamName());
                    fixture.setAwayTeamName(away.getTeamName());
                    fixture.setHomeTeam(home);
                    fixture.setAwayTeam(away);
                }
                catch(NullPointerException e){
                    System.out.println("Missing team data.");
                }
                fixture.setFullTimeResult(record.get("FTR").toCharArray()[0]);
                fixture.setHomeTeamGoals(Integer.parseInt(record.get("FTHG")));
                fixture.setAwayTeamGoals(Integer.parseInt(record.get("FTAG")));
                if (fixture.getHomeTeam() != null && fixture.getAwayTeam() != null)
                    fixtures.add(fixture);
            }
        }
        return fixtures;
    }
}

