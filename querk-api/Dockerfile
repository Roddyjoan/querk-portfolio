FROM eclipse-temurin:11-jdk-alpine as builder
RUN apk update
RUN apk add maven
WORKDIR /home/app
COPY . .
RUN mvn package -DskipTests -f pom.xml

FROM eclipse-temurin:11-jre-alpine

EXPOSE 8080/tcp
WORKDIR /home/app
# CHANGE: Copy the correct jar.
COPY --from=builder /home/app/target/querk-api-1.0-SNAPSHOT.jar app.jar
CMD ["java", "-jar", "./app.jar"]