# Matcha

Backend 

Initialisation du projet <br>
Step 1 : npm run reset <br>
Step 2 : npm run setup <br>
Step 3 : npm run fakeProfiles 500 // Si on veut 500 profils <br>
<br>
Lancement des serveurs<br>
Step 1 : Launch the backend server npm start<br>

Front-end 

////////////////////

1. Start la VM Base : docker-machine start Base
2. Recuperer l' IP : docker-machine ip Base
3. Rendre active la machine: eval $(docker-machine env Base)

Lancer nginx
docker run --name matcha  -p 8080:80 -v ~/Documents/wwww:/usr/share/nginx/html:ro -d nginx

En cas de bug verifier la config de nginx
Dans etc/nginx/config.d le fichier de config doit avoir la ligne try files

location / {
  try_files $uri $uri/ /index.html;
}

Restart le serveur front: /etc/init.d/nginx restart
