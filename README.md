#Angular Laravel Authentication <br>
in this project,authetication code is present with laravel <br>
in the authentication:-<br>
 1. first login api is hit which provides the access token whose lifetime is 30 minute <br>
 2. after 30 min, refresh token api is hit which gets the refresh token and in the headers of all  api except login inject the token using interceptor 
   
