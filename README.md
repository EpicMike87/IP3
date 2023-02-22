# IP3

Teams in SPL (to get Team IDs)

HttpRequest request = HttpRequest.newBuilder()
		.uri(URI.create("https://api-football-v1.p.rapidapi.com/v3/teams?league=179&season=2022"))
		.header("X-RapidAPI-Key", "9e3324bf83msh34dc07c79189889p1f8c13jsn975dfb9aa4c5")
		.header("X-RapidAPI-Host", "api-football-v1.p.rapidapi.com")
		.method("GET", HttpRequest.BodyPublishers.noBody())
		.build();
HttpResponse<String> response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());
System.out.println(response.body());


Players in Team by Season

HttpRequest request = HttpRequest.newBuilder()
		.uri(URI.create("https://api-football-v1.p.rapidapi.com/v3/players?team=33&season=2022"))
		.header("X-RapidAPI-Key", "9e3324bf83msh34dc07c79189889p1f8c13jsn975dfb9aa4c5")
		.header("X-RapidAPI-Host", "api-football-v1.p.rapidapi.com")
		.method("GET", HttpRequest.BodyPublishers.noBody())
		.build();
HttpResponse<String> response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());
System.out.println(response.body());


Player data when ID is known

HttpRequest request = HttpRequest.newBuilder()
		.uri(URI.create("https://api-football-v1.p.rapidapi.com/v3/players?id=276&season=2020"))
		.header("X-RapidAPI-Key", "9e3324bf83msh34dc07c79189889p1f8c13jsn975dfb9aa4c5")
		.header("X-RapidAPI-Host", "api-football-v1.p.rapidapi.com")
		.method("GET", HttpRequest.BodyPublishers.noBody())
		.build();
HttpResponse<String> response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());
System.out.println(response.body());
	
	
	Get Player by Name
	
	playerName will have to replace spaces in between first and last with %20
	playerName = playerName.replace(" ", "%20");
	
	HttpRequest request = HttpRequest.newBuilder()
		.uri(URI.create("https://api-football-v1.p.rapidapi.com/v3/players?league=179&season=2022&search=" + playerName))
		.header("X-RapidAPI-Key", "9e3324bf83msh34dc07c79189889p1f8c13jsn975dfb9aa4c5")
		.header("X-RapidAPI-Host", "api-football-v1.p.rapidapi.com")
		.method("GET", HttpRequest.BodyPublishers.noBody())
		.build();
HttpResponse<String> response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());
System.out.println(response.body());
