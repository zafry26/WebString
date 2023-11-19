# Compliment For This Awesome Repo

Special thanks to NickMaev : https://github.com/NickMaev/react-core-boilerplate/
for this repo project.

# Installation

    0. Install of the latest stable Node.js: https://nodejs.org/en/
    1. At the first run you must close the project if it runs in Visual Studio or another IDE.
    Open project's folder in console and run command `npm install`.
    2. Type `npm run build:dev` for development, it will compile the main and vendor bundles.
    3. Build and run the project.

# Modify WebPack vendor config

    If you modify the WebPack vendor config, you must manually recompile the vendor bundle.
    Type `npm run build:dev` to do this.

# Known issues

    * WebPack Hot Module Replacement [HMR] doesn't work with IIS
    Will be fixed. Use Kestrel for development instead.
    * HTTP Error 500
    Probably you don't have the latest version of Node.js.
    * HTTP Error 502.5
    You must install the latest ".NET Core SDK" and ".NET Core Runtime"
    using this link: https://dotnet.microsoft.com/download
    * HTTP error 500 when hosted in Azure
    Set the "WEBSITE_NODE_DEFAULT_VERSION" to 6.11.2 in the "app settings" in Azure.

# Other issues

    If you will have any issue with project starting, you can see errors in logs ("/logs" directory).

# READ ME FOR FIRST INSTALLATION FROM THIS PROJECT

    * VSCODE EDITOR EXTENSION-----not tested in visual studio
    (Mandatory)
    C# extension ~1.24 (use 1.24 version with latest patch (if require) to be able use omnisharp with .net core sdk)
    (Optional)
    Intellicode
    Prettier
    Html, CSS, JavaScript extension and snippet
    ESLint

    * ENV DEPENDENCIES-----not tested with latest version of dependencies
    nodejs 12/14, npm 6 with latest minor/patch version
    dotnet runtime 3.1 & dotnet sdk 3.1 with latest patch
    ef cli 3.1 with latest patch (optional - if want to use migrations db tools(personnaly use this tools))

# STEP TO START PROJECT

    * Node and npm
    npm install ---for every change in npm module and first time install

    * DEVELOPEMENT Build & Run command
    npm run build:dev (building the frontend project and install all dependencies)
    dotnet build (building the backend project and install all dependencies)
    dotnet run (to run the project. Use debugging mode for faster development)

    * PRODUCTION Build & Run command
    npm run build:prod
    dotnet run --launch-profile Production

    * PUBLISH COMMAND
    dotnet build "ARMS.JavaScript.csproj" -c Release -o ./bin/build-release
    dotnet publish "ARMS.JavaScript.csproj" -c Release -o ./bin/publish-release

    * SSH to database
    {personnaly used aws db. without key, cannot use this link.}
    ssh -i "Core_key.pem" -f -N -L 3308:database1.clvxquce6wgh.ap-southeast-1.rds.amazonaws.com:3306 ubuntu@ec2-54-255-154-204.ap-southeast-1.compute.amazonaws.com

    * SSH to ec2 (bastion server)
    {personnaly used aws vm. without key, cannot use this link.}
    ssh -i "Core_key.pem" ubuntu@ec2-54-255-154-204.ap-southeast-1.compute.amazonaws.com

    * EF-command to add, update, delete table
    {Make sure EF Cli is installed in computer}
    dotnet ef migrations add name
    dotnet ef database update

    *Setup SSL for development
    dotnet dev-certs https --clean
    dotnet dev-certs https -ep ${HOME}/.aspnet/https/aspnetapp.pfx -p SECRETPASSWORD
    dotnet dev-certs https --trust

    * Run as Docker Container (must use kestrel url specified in hosting production)
    docker build --no-cache -t main:latest .
    docker run -p 7000:7000 -p 7001:7001 main:latest 

    * Run with SSL
    docker run --rm -it -p 7000:7000 -p 7001:7001 -e ASPNETCORE_URLS="https://+;http://+" -e ASPNETCORE_Kestrel__Certificates__Default__Password="SECRETPASSWORD" -e ASPNETCORE_Kestrel__Certificates__Default__Path=/https/aspnetapp.pfx -v ${HOME}/.aspnet/https:/https/ main:latest
