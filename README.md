<br/>
<p align="center">
  <h3 align="center">Complete Developer Network</h3>

  <p align="center">
    An awesome web application to manage customer profile.
    <br/>
    <br/>
    <a href="https://github.com/zafry26/Webstring"><strong>Explore the docs »</strong></a>
    <br/>
    <br/>
    <a href="https://freeproject.azurewebsites.net">View Demo</a>
    .
    <br/>
    Below is an account to be use to login into application
    <br/>
    username: admin@gmail.com
    <br/>
    password: admin@123
  </p>
</p>



## Table Of Contents

* [About the Project](#about-the-project)
* [Built With](#built-with)
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
* [API Usage](#Api-Usage)
* [Roadmap](#roadmap)
* [License](#license)
* [Authors](#authors)

## About The Project
![Screenshot 2023-11-19 at 1 24 49 PM (2)](https://github.com/zafry26/WebString/assets/47439386/181ceaa2-5eea-4803-aff2-9151774b0a37)

Complete Developer Network is a web application focusing on managing profile for freelance developer. Profile information managed such as developer name, email, phone number, skillset and hobby,

## Built With

This project is SPA project developed by using
* ASP.NET CORE 3.1.27
* React 16

## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.

* nodejs 12/14, npm 6 with latest minor/patch version
* dotnet runtime 3.1 & dotnet sdk 3.1 with latest patch
* ef cli 3.1 with latest patch


### Installation

1. Clone the repo

```sh
git clone https://github.com/zafry26/WebString.git
```

2. Install NPM packages

```sh
npm i
```

3. Build Packages

```sh
npm run build:dev
```

4. Run Project
``` sh
dotnet run
```

## Api-Usage

Register API

* Request
```sh
curl -X POST https://freeproject.azurewebsites.net/api/account/register -H "Content-Type: application/json" -d '{
    "email": "string",
    "fullname": "string",
    "username": "string",
    "password": "string: 6}"
}' 
```

* Response
```sh
{
    "value": "string",
    "errors": []
}
```

Login API

* Request
```sh
curl -X POST https://freeproject.azurewebsites.net/api/account/login -H "Content-Type: application/json" -d '{
     "username":"string", 
     "password":"string: 6"
}' 
```

* Response
```sh
{
    "value": {
        "token": "string"
    },
    "errors": []
}
```

List of Developers API

* Request
```sh
curl https://freeproject.azurewebsites.net/api/developer/Search?term= -H "Content-Type: application/json" -H "Authorization: Bearer {token}"
```
* Response
```sh
{
    "value": [
        {
            "id": int,
            "username": "string",
            "email": "string",
            "phoneNumber": "string",
            "skillsets": "string",
            "hobby": "string",
            "createdAt": "string",
            "createdBy": int
        }
    ],
    "errors": []
}
```

Add Developer API

* Request
```sh
curl -X POST https://freeproject.azurewebsites.net/api/developer/add -H "Content-Type: application/json" -H "Authorization: Bearer {token}" -d '{
    "username": "string",
    "email": "string",
    "phoneNumber": "string",
    "skillsets": "string",
    "hobby": "string"
}' 
```

* Response
```sh
{
    "value": {
            "id": int,
            "username": "string",
            "email": "string",
            "phoneNumber": "string",
            "skillsets": "string",
            "hobby": "string",
            "createdAt": "string",
            "createdBy": int
        },
    "errors": []
}
```

Edit Developer API

* Request
```sh
curl -X PATCH https://freeproject.azurewebsites.net/api/developer/{id} -H "Content-Type: application/json" -H "Authorization: Bearer {token}" -d '{
    "id": int,
    "username": "string",
    "email": "string",
    "phoneNumber": "string",
    "skillsets": "string",
    "hobby": "string",
    "createdAt": "string",
    "createdBy": int
}' 
```

* Response
```sh
{
    "value": {
            "id": int,
            "username": "string",
            "email": "string",
            "phoneNumber": "string",
            "skillsets": "string",
            "hobby": "string",
            "createdAt": "string",
            "createdBy": int
        },
    "errors": []
}
```

Delete Developer API

* Request
```sh
curl -X DELETE https://freeproject.azurewebsites.net/api/developer/{id} -H "Content-Type: application/json" -H "Authorization: Bearer {token}"
```

* Response
```sh
{
    "value": "string"
    "errors": []
}
```

## Roadmap

See the [open issues](https://github.com/zafry26/Webstring/issues) for a list of proposed features (and known issues).


## License

Distributed under the MIT License. See [LICENSE](https://github.com/zafry26/Webstring/blob/main/LICENSE.md) for more information.

## Authors

* **Zahfi Zafry** - *Full Stack Web Developer* 
