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

* [Bootiful Development with Spring Boot and React](https://developer.okta.com/blog/2017/12/06/bootiful-development-with-spring-boot-and-react) & [Spring Boot API with React UI](https://github.com/oktadeveloper/spring-boot-react-example)
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

TODO.

### Server Developer Hat On Mode

TODO.

## Help

Please file an issue on GitHub.

## License

Apache 2.0, see [LICENSE](LICENSE).
