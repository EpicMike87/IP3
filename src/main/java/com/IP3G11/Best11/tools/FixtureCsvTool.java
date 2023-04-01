package com.IP3G11.Best11.tools;

import com.IP3G11.Best11.model.Fixture;
import com.IP3G11.Best11.model.Team;
//import com.groupdocs.merger.Merger;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;

import java.io.*;
import java.net.MalformedURLException;
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
    public static void getCSV() throws Exception {
        //Get previous season string. Will combine previous and current season fixtures
        int year1 = (Integer.parseInt(Integer.toString(SEASON).substring(0, 2)) - 1);
        int year2 = (Integer.parseInt(Integer.toString(SEASON).substring(2, 4)) - 1);
        String previousSeason = "" + year1 + year2;

        String urlCurrentSeason = "https://www.football-data.co.uk/mmz4281/"+ SEASON + "/SC0.csv";
        String urlPreviousSeason = "https://www.football-data.co.uk/mmz4281/"+ previousSeason + "/SC0.csv";

        String filePathPrevious = writeCsv(urlPreviousSeason, previousSeason) + ".csv";
        String filePathCurrent = writeCsv(urlCurrentSeason, String.valueOf(SEASON)) + ".csv";

        String[] fileNames = new String[2];
        fileNames[0] = filePathPrevious;
        fileNames[1] = filePathCurrent;

        File file = new File("./fixturedata/fixture-data.csv");
        PrintWriter fileWriter = new PrintWriter(file);

        for (int i = 0; i < fileNames.length; i++) {
            System.out.println("Reading from " + fileNames[i]);

            File f = new File(fileNames[i]);

            BufferedReader br = new BufferedReader(new FileReader(f));

            String line = br.readLine();
            if (i > 0)
                line = br.readLine(); //just skip the first line

            while (line != null) {
                fileWriter.println(line);
                line = br.readLine();
            }

            fileWriter.flush();
        }

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

    private static String writeCsv(String url, String season) throws IOException {
        InputStream input = new URL(url).openStream();
        Reader reader = new InputStreamReader(input, StandardCharsets.UTF_8);
        File file = new File("./fixturedata/seasonFixtures" + season + ".csv");
        FileWriter fileWriter = new FileWriter(file);
        int charVal;
        while ((charVal = reader.read()) != -1) {
            fileWriter.append((char) charVal);
        }

        fileWriter.close();
        return "./fixturedata/seasonFixtures" + season;
    }
}

