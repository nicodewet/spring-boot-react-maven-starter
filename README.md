# Spring Boot React Maven Starter
 
A Spring Boot React Maven starter project without all the extra cruft and/or bulletproofing in source works, just the essence of what ties the applications together. 

It is assumed the Spring Boot part is not new to you, all you want is a sensible starting point for a simple
project that incorporates a React front-end with a Service Oriented Front-End Architecture (SOFEA).

So this project may help veteran Spring developers get their React jiggy on, with the intention being that
you would follow along with [this tutorial](https://developer.okta.com/blog/2017/12/06/bootiful-development-with-spring-boot-and-react) or just crack on with a new project.

* Multi-module Maven build in a specific order (build client, then server).
* React app in client directory.
* Boot app in server directory.
* Boot app configured to host client app.
* server build uses maven-resources-plugin to copy across client app.

Note a key intention here was *not* to use Thymeleaf to serve the front-end as has been done in the Spring
[React.js and Spring Data REST tutorial](https://spring.io/guides/tutorials/react-and-spring-data-rest/).

Source works:

* *The good-beers tutorial*. [Bootiful Development with Spring Boot and React](https://developer.okta.com/blog/2017/12/06/bootiful-development-with-spring-boot-and-react) & [Spring Boot API with React UI](https://github.com/oktadeveloper/spring-boot-react-example)
* [spring-boot-react-maven-starter](https://github.com/shekhargulati/spring-boot-react-maven-starter)

## Getting Started

### First Things First - Build & Run The Whole Thing

Use JDK 8 and Maven 3.

```
$ mvn clean install
$ java -jar server/target/server-0.0.1-SNAPSHOT.jar
```

Now open localhost:8080 in your browser.

### What Ties It All Together?

In short multi-module Maven, Spring Boot magic and in particular these two plugins:

* frontend-maven-plugin in the client module
* maven-resources-plugin in the server module

### Client Developer Hat On Mode

For an extremely quick start navigate to the client directory and execute the following:

```shell
$ yarn && yarn start
```

Having satisfied yourself that the client application runs, the next port of call would be getting 
familiar with the README.md in the client directory.

Note that rather than using TypeScript as was done in the good-beers tutorial we have used Javascript and 
adhere to the [Airbnb React/JSX Style Guide](https://github.com/airbnb/javascript/blob/master/react/README.md).

#### Create React App

The client app was generated using [Create React App](https://github.com/facebook/create-react-app) as follows.

```shell
$ npm install -g create-react-app@2.1.3
$ npx create-react-app client
```

#### Hypertext Application Language (HAL)

References:
* [React.js and Spring Data REST](https://spring.io/guides/tutorials/react-and-spring-data-rest/)

#### Javascript fetch JSON with ES7 Async Await

References:
* https://gist.github.com/msmfsd/fca50ab095b795eb39739e8c4357a808

#### JS Other 

* https://javascript.info/async-await
* https://javascript.info/custom-errors

### Server Developer Hat On Mode

Open the server directory in an IDE of your choice. This is a stock standard Spring Boot application.

In short the server-side exposes a good-beers endpoint that you can exercise as shown below, or you can just open 
localhost:8080/good-beers in your browser.

```shell
$ curl localhost:8080/good-beers
```

## Help

Please file an issue on GitHub.

## License

Apache 2.0, see [LICENSE](LICENSE).
